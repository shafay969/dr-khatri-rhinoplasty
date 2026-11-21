#!/usr/bin/env python3
"""Read-only, bounded monitoring of this production website; Python stdlib only."""

from __future__ import annotations

import argparse
from collections import Counter
from datetime import datetime, timedelta, timezone
from html.parser import HTMLParser
import ipaddress
import json
from pathlib import Path
import re
import socket
import ssl
import time
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlsplit, urlunsplit, parse_qs, quote
from urllib.request import HTTPRedirectHandler, HTTPSHandler, ProxyHandler, Request, build_opener
import xml.etree.ElementTree as ET

ORIGIN = "https://drvijaykhatri.com"
HOST = "drvijaykhatri.com"
LOCAL_TZ = timezone(timedelta(hours=8))
SITEMAP_NS = "http://www.sitemaps.org/schemas/sitemap/0.9"
MAX_BODY = 2 * 1024 * 1024
IMPORTANT_PATHS = ("/", "/about", "/rhinoplasty", "/gallery", "/testimonials", "/blog", "/faq", "/booking", "/contact")
REDIRECTS = {301, 302, 303, 307, 308}


class UnsafeURL(ValueError):
    pass


def allowed_url(url: str) -> str:
    """Reject credentials, queries, control characters, ports and off-origin URLs."""
    if not isinstance(url, str) or re.search(r"[\s\x00-\x1f\x7f\\]", url):
        raise UnsafeURL("URL contains whitespace, control characters or backslashes")
    try:
        p = urlsplit(url)
        valid = (p.scheme == "https" and p.hostname == HOST and p.port in (None, 443)
                 and p.username is None and p.password is None and not p.query and not p.fragment)
    except ValueError as exc:
        raise UnsafeURL("Malformed URL") from exc
    if not valid:
        raise UnsafeURL("Only credential-free production HTTPS URLs without query/fragment are allowed")
    return urlunsplit(("https", HOST, p.path or "/", "", ""))


def internal_link(base: str, href: str) -> str | None:
    """A fragment is local navigation; query values are never requested or logged."""
    if not href or href.startswith("#"):
        return None
    try:
        p = urlsplit(urljoin(base, href))
        if p.hostname != HOST or p.scheme != "https" or p.query:
            return None
        return allowed_url(urlunsplit((p.scheme, p.netloc, p.path, "", "")))
    except (ValueError, UnsafeURL):
        return None


def public_dns(host: str = HOST) -> None:
    if host != HOST:
        raise UnsafeURL("Unexpected hostname")
    addresses = socket.getaddrinfo(host, 443, type=socket.SOCK_STREAM)
    if not addresses or any(not ipaddress.ip_address(a[4][0]).is_global for a in addresses):
        raise UnsafeURL("Production hostname did not resolve exclusively to public IP addresses")


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


class Fetcher:
    def __init__(self, timeout: float = 12, retries: int = 1, delay: float = 0.25, budget: int = 70):
        self.timeout, self.retries, self.delay, self.budget = timeout, retries, delay, budget
        self.calls = 0
        self.cache: dict[str, dict] = {}
        # Do not inherit proxy settings or cookies; certificate verification stays enabled.
        self.opener = build_opener(ProxyHandler({}), HTTPSHandler(context=ssl.create_default_context()), NoRedirect())

    def get(self, url: str) -> dict:
        url = allowed_url(url)
        if url in self.cache:
            return self.cache[url]
        result = {"url": url, "status": None, "redirects": [], "headers": {}, "body": "", "error": None}
        current = url
        start = time.monotonic()
        try:
            for _ in range(6):
                response = None
                for attempt in range(self.retries + 1):
                    if self.calls >= self.budget:
                        raise RuntimeError("HTTP request budget exhausted; measurement incomplete")
                    public_dns()
                    self.calls += 1
                    time.sleep(self.delay)
                    req = Request(current, headers={"User-Agent": "DrKhatriSEOHealth/1.0 (+https://drvijaykhatri.com)", "Accept": "text/html,application/xml,text/plain;q=0.9"})
                    try:
                        response = self.opener.open(req, timeout=self.timeout)
                    except HTTPError as exc:
                        response = exc
                    except (URLError, TimeoutError, OSError):
                        if attempt == self.retries:
                            raise
                        time.sleep(attempt + 1)
                        continue
                    if response.code in {429, 500, 502, 503, 504} and attempt < self.retries:
                        response.close()
                        time.sleep(attempt + 1)
                        continue
                    break
                if response is None:
                    raise RuntimeError("No HTTP response")
                with response:
                    result["status"] = response.code
                    result["headers"] = {k.lower(): v for k, v in response.headers.items() if k.lower() in {
                        "content-type", "x-robots-tag", "strict-transport-security", "content-security-policy",
                        "x-content-type-options", "referrer-policy", "server", "etag", "last-modified"}}
                    if response.code in REDIRECTS:
                        location = response.headers.get("Location", "")
                        try:
                            target = allowed_url(urljoin(current, location))
                        except UnsafeURL as exc:
                            raise UnsafeURL("Redirect blocked by production URL policy; destination omitted") from exc
                        result["redirects"].append({"status": response.code, "url": target})
                        current = target
                        continue
                    body = response.read(MAX_BODY + 1)
                    if len(body) > MAX_BODY:
                        raise ValueError("Response exceeds 2 MiB limit; measurement incomplete")
                    result["body"] = body.decode(response.headers.get_content_charset() or "utf-8", errors="replace")
                    result["final_url"] = current
                    break
            else:
                raise ValueError("More than five redirects; measurement incomplete")
        except (UnsafeURL, ValueError, RuntimeError, URLError, TimeoutError, OSError) as exc:
            # Exception messages may embed a credential-bearing redirect or request URL.
            result["error"] = str(exc) if isinstance(exc, (UnsafeURL, ValueError, RuntimeError)) else type(exc).__name__ + ": network/TLS request failed"
        result["elapsed_ms"] = round((time.monotonic() - start) * 1000)
        self.cache[url] = result
        return result


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.titles, self.descriptions, self.canonicals, self.robots, self.links = [], [], [], [], []
        self.json_ld, self.h1s = [], []
        self._title = self._h1 = self._json = None
        self._script = self._style = self._body = self._head = False
        self.body_text_chars = self.images = self.images_without_alt = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "head": self._head = True
        if tag == "body": self._body = True; self._head = False
        if tag == "title" and self._head: self._title = ""
        if tag == "h1": self._h1 = ""
        if tag == "style": self._style = True
        if tag == "script":
            self._script = True
            if a.get("type", "").lower() == "application/ld+json": self._json = ""
        if tag == "meta":
            name = a.get("name", "").lower()
            if name == "description": self.descriptions.append(a.get("content", ""))
            if name in {"robots", "googlebot", "bingbot"}: self.robots.append(a.get("content", ""))
        if tag == "link" and "canonical" in a.get("rel", "").lower().split(): self.canonicals.append(a.get("href", ""))
        if tag == "a": self.links.append(a.get("href", ""))
        if tag == "img":
            self.images += 1
            self.images_without_alt += "alt" not in a

    def handle_data(self, data):
        if self._title is not None: self._title += data
        if self._h1 is not None: self._h1 += data
        if self._json is not None: self._json += data
        if self._body and not self._script and not self._style: self.body_text_chars += len(data.strip())

    def handle_endtag(self, tag):
        if tag == "title" and self._title is not None:
            self.titles.append(self._title.strip()); self._title = None
        if tag == "h1" and self._h1 is not None:
            self.h1s.append(self._h1.strip()); self._h1 = None
        if tag == "script":
            self._script = False
            if self._json is not None: self.json_ld.append(self._json); self._json = None
        if tag == "style": self._style = False
        if tag == "head": self._head = False
        if tag == "body": self._body = False


def robots_octets(value: str) -> str:
    """Normalize UTF-8 and escaped octets without decoding reserved URL characters."""
    encoded = quote(value, safe="/!$&'()*+,-.:;=?@_%")
    def normalize(match):
        char = chr(int(match.group(1), 16))
        return char if re.fullmatch(r"[A-Za-z0-9._~-]", char) else "%" + match.group(1).upper()
    return re.sub(r"%([0-9a-fA-F]{2})", normalize, encoded)


def robots_path_match(rule: str, path: str) -> bool:
    """Match only REP's '*' and terminal '$', avoiding untrusted regex backtracking."""
    terminal = rule.endswith("$")
    pattern = rule[:-1] if terminal else rule
    pattern_index = path_index = 0
    star_index = -1
    retry_index = 0
    while path_index < len(path):
        if pattern_index < len(pattern) and pattern[pattern_index] == "*":
            star_index = pattern_index
            pattern_index += 1
            retry_index = path_index
        elif pattern_index < len(pattern) and pattern[pattern_index] == path[path_index]:
            pattern_index += 1
            path_index += 1
        elif pattern_index == len(pattern) and not terminal:
            return True
        elif star_index >= 0:
            pattern_index = star_index + 1
            retry_index += 1
            path_index = retry_index
        else:
            return False
    while pattern_index < len(pattern) and pattern[pattern_index] == "*":
        pattern_index += 1
    return pattern_index == len(pattern)


class GoogleRobotsRules:
    """Google-relevant group selection and longest matching path, with Allow ties.

    Implements the documented path/group rules used by this monitor, not Google's
    fetching/cache behavior. Reference: developers.google.com/crawling/docs/robots-txt/robots-txt-spec.
    """
    def __init__(self, lines):
        self.groups = []
        self.sitemaps = []
        agents, rules, saw_rule = [], [], False
        for line in lines:
            line = line.lstrip("\ufeff").split("#", 1)[0].strip()
            if ":" not in line: continue
            field, value = (part.strip() for part in line.split(":", 1))
            field = field.lower()
            if field == "sitemap":
                if value: self.sitemaps.append(value)
                continue
            if field == "user-agent":
                if not value: continue
                if saw_rule:
                    self.groups.append((agents, rules))
                    agents, rules, saw_rule = [], [], False
                # Google ignores a UA version or trailing wildcard, not purpose suffixes.
                token = re.split(r"[/\s*]", value.lower(), maxsplit=1)[0]
                agents.append(token if token else "*")
            elif field in {"allow", "disallow"} and agents:
                saw_rule = True
                if value.startswith("/"):
                    path = robots_octets(value)
                    # A trailing wildcard does not make a prefix more specific.
                    if not path.endswith("$"): path = path.rstrip("*")
                    rules.append((len(path.encode("utf-8")), field == "allow", path))
        if agents: self.groups.append((agents, rules))

    def site_maps(self):
        return self.sitemaps

    def can_fetch(self, user_agent: str, url: str) -> bool:
        agent = user_agent.lower().split("/", 1)[0]
        selected, best_agent_length = [], -1
        for agents, rules in self.groups:
            matching = [0 if token == "*" else len(token) for token in agents if token == "*" or agent.startswith(token)]
            if not matching: continue
            length = max(matching)
            if length > best_agent_length:
                selected, best_agent_length = list(rules), length
            elif length == best_agent_length:
                selected.extend(rules)
        parsed = urlsplit(url)
        path = robots_octets((parsed.path or "/") + ("?" + parsed.query if parsed.query else ""))
        matches = [(length, allow) for length, allow, pattern in selected if robots_path_match(pattern, path)]
        # Tuple ordering prefers the longest rule, then True (Allow) on equal length.
        return max(matches)[1] if matches else True


def parse_sitemap(body: str) -> tuple[str, list[str]]:
    if re.search(r"<!\s*(DOCTYPE|ENTITY)", body, re.I):
        raise ValueError("DTD/entity declarations are not accepted")
    try:
        root = ET.fromstring(body)
    except ET.ParseError as exc:
        raise ValueError("Sitemap is not well-formed XML") from exc
    if root.tag not in {f"{{{SITEMAP_NS}}}urlset", f"{{{SITEMAP_NS}}}sitemapindex"}:
        raise ValueError("Sitemap root/namespace is invalid")
    kind = root.tag.rsplit("}", 1)[-1]
    child = "url" if kind == "urlset" else "sitemap"
    nodes = root.findall(f"{{{SITEMAP_NS}}}{child}")
    if not nodes: raise ValueError("Sitemap contains no entries")
    urls = []
    for node in nodes:
        loc = node.find(f"{{{SITEMAP_NS}}}loc")
        if loc is None or not loc.text: raise ValueError("Sitemap entry is missing loc")
        urls.append(allowed_url(loc.text.strip()))
    if len(urls) != len(set(urls)): raise ValueError("Sitemap contains duplicate URLs")
    return kind, urls


def consultation_links(hrefs: list[str]) -> dict:
    result = {"phone_links": 0, "whatsapp_links": 0, "malformed": 0, "live_delivery": "not tested; no messages or calls sent"}
    for href in hrefs:
        if href.startswith("tel:"):
            result["phone_links"] += 1
            result["malformed"] += not bool(re.fullmatch(r"\+?[0-9 ()-]{7,22}", href[4:]))
        else:
            try: p = urlsplit(href)
            except ValueError: continue
            if p.hostname in {"wa.me", "api.whatsapp.com"}:
                result["whatsapp_links"] += 1
                phone = p.path.strip("/") if p.hostname == "wa.me" else parse_qs(p.query).get("phone", [""])[0]
                result["malformed"] += not (p.scheme == "https" and p.username is None and p.password is None and bool(re.fullmatch(r"[1-9][0-9]{7,14}", phone)))
    return result


def page_analysis(url: str, fetched: dict) -> dict:
    p = PageParser(); p.feed(fetched.get("body", ""))
    errors = []
    measured = not fetched.get("error") and fetched.get("status") is not None
    if not measured:
        errors.append("Measurement incomplete: " + (fetched.get("error") or "No HTTP response"))
    elif fetched.get("status") != 200:
        errors.append("Expected HTTP 200; observed " + str(fetched["status"]))
    else:
        redirects = fetched.get("redirects", [])
        if len(redirects) > 1:
            errors.append("Redirect chain has more than one hop")
        elif redirects and urlsplit(redirects[0]["url"]).path.rstrip("/") != urlsplit(url).path.rstrip("/"):
            errors.append("Unexpected redirect to a different route")
        if "text/html" not in fetched.get("headers", {}).get("content-type", ""): errors.append("Expected HTML content type")
        if len(p.titles) != 1 or not p.titles[0]: errors.append("Expected one nonempty raw HTML title")
        if len(p.descriptions) != 1 or not p.descriptions[0]: errors.append("Expected one nonempty raw HTML meta description")
        if p.canonicals != [url]: errors.append("Expected exactly one self-referencing production canonical in raw HTML")
        directives = ",".join(p.robots + [fetched.get("headers", {}).get("x-robots-tag", "")]).lower()
        if re.search(r"(?:^|[\s,:])(?:noindex|none)(?:$|[\s,;])", directives): errors.append("NOINDEX directive detected")
        if p.body_text_chars < 100: errors.append("Essential raw HTML content is sparse; browser rendering inspection required")
        if len(p.h1s) != 1: errors.append("Expected one H1 in raw HTML")
    json_errors = 0
    for block in p.json_ld:
        try: json.loads(block)
        except (ValueError, TypeError): json_errors += 1
    if json_errors: errors.append("Malformed raw HTML JSON-LD")
    links = sorted({u for href in p.links if (u := internal_link(url, href))})
    consult = consultation_links(p.links)
    if consult["malformed"]: errors.append("Malformed telephone/WhatsApp consultation link")
    if measured and fetched.get("status") == 200 and urlsplit(url).path.rstrip("/") in {"", "/booking", "/contact"} and not (consult["phone_links"] or consult["whatsapp_links"]):
        errors.append("No telephone/WhatsApp consultation links found in raw HTML on a key consultation route; verify rendered navigation")
    return {"url": url, "status": fetched.get("status"), "http_measurement_complete": measured, "elapsed_ms": fetched.get("elapsed_ms"),
            "redirects": fetched.get("redirects", []), "title": p.titles[0] if p.titles else None,
            "description": p.descriptions[0] if p.descriptions else None, "canonicals": p.canonicals,
            "raw_h1_count": len(p.h1s), "raw_text_chars": p.body_text_chars,
            "raw_json_ld_count": len(p.json_ld), "json_ld_syntax_errors": json_errors,
            "structured_data_limit": "Raw HTML only; absent blocks do not prove absence after JavaScript rendering. Syntax is not Google eligibility.",
            "images_without_alt": p.images_without_alt, "internal_links": links, "consultation": consult, "issues": errors}


def tls_check() -> dict:
    result = {"verified": False, "measurement_complete": False, "expires_utc": None, "days_remaining": None}
    try:
        public_dns()
        with socket.create_connection((HOST, 443), timeout=12) as sock:
            with ssl.create_default_context().wrap_socket(sock, server_hostname=HOST) as secure:
                expiry = datetime.fromtimestamp(ssl.cert_time_to_seconds(secure.getpeercert()["notAfter"]), timezone.utc)
                result.update(verified=True, measurement_complete=True, expires_utc=expiry.isoformat(), days_remaining=(expiry - datetime.now(timezone.utc)).days)
    except ssl.SSLCertVerificationError:
        result.update(measurement_complete=True, error="TLS certificate verification failed")
    except (OSError, ValueError, UnsafeURL): result["error"] = "Certificate measurement unavailable: connection/DNS policy or network restriction"
    return result


def run_monitor(max_urls: int = 30, previous: dict | None = None) -> dict:
    now = datetime.now(timezone.utc)
    report = {"report_id": "dr-khatri-seo-" + now.astimezone(LOCAL_TZ).date().isoformat(),
              "measured_at_utc": now.isoformat(), "measured_at_asia_shanghai": now.astimezone(LOCAL_TZ).isoformat(),
              "origin": ORIGIN, "scope": "Read-only public HTTP and raw HTML; no browser, appointments, patient data, email or deployment actions",
              "issues": [], "pages": [], "limitations": ["Actual Google indexing/Search Console/GA4 metrics unavailable without authorized APIs.",
              "No Core Web Vitals or Lighthouse score measured; HTTP elapsed time is not LCP/INP/CLS.",
              "Phone/WhatsApp checks are syntax only; no external service request, call or message is sent.",
              "Unknown production commit; repository HEAD is not deployment proof."]}
    def issue(priority, message): report["issues"].append({"priority": priority, "message": message})
    fetcher = Fetcher()
    tls = report["tls"] = tls_check()
    if not tls["verified"]: issue("P0" if tls.get("measurement_complete") else "P1", tls.get("error", "TLS measurement incomplete"))
    elif tls["days_remaining"] < 21: issue("P1", "TLS certificate expires in fewer than 21 days")
    robots = fetcher.get(ORIGIN + "/robots.txt")
    robots_valid = robots["status"] == 200 and not robots["error"] and not re.match(r"\s*<(?:!doctype|html)", robots["body"], re.I)
    robot_parser = GoogleRobotsRules(robots["body"].splitlines() if robots_valid else [])
    safe_sitemaps = []
    rejected_sitemaps = 0
    for entry in robot_parser.site_maps() or []:
        try: safe_sitemaps.append(allowed_url(entry))
        except UnsafeURL: rejected_sitemaps += 1
    report["robots"] = {"status": robots["status"], "valid": bool(robots_valid), "error": robots["error"], "sitemaps": safe_sitemaps, "rejected_sitemap_count": rejected_sitemaps}
    if robots["status"] != 200 or robots["error"]: issue("P1", "robots.txt unavailable or incomplete measurement")
    elif not robots_valid: issue("P1", "robots.txt returned HTML instead of robots directives")
    if rejected_sitemaps: issue("P1", "robots.txt contains sitemap URLs outside the monitor's safe production policy; destinations omitted")
    if robots_valid and ORIGIN + "/sitemap.xml" not in report["robots"]["sitemaps"]: issue("P2", "Production sitemap not declared in robots.txt")
    sitemap = fetcher.get(ORIGIN + "/sitemap.xml")
    urls = []
    report["sitemap"] = {"status": sitemap["status"], "valid": False, "error": sitemap["error"]}
    try:
        if sitemap["status"] != 200 or sitemap["error"]: raise ValueError("Sitemap request failed")
        kind, entries = parse_sitemap(sitemap["body"])
        if kind == "sitemapindex":
            if len(entries) > 5: raise ValueError("Sitemap index exceeds five-child bound; incomplete measurement")
            for entry in entries:
                child = fetcher.get(entry)
                if child["status"] != 200 or child["error"]: raise ValueError("Child sitemap request failed")
                child_kind, child_urls = parse_sitemap(child["body"])
                if child_kind != "urlset": raise ValueError("Nested sitemap indexes exceed monitoring scope")
                urls.extend(child_urls)
        else: urls = entries
        if len(urls) != len(set(urls)): raise ValueError("Duplicate URLs across sitemaps")
        report["sitemap"].update(valid=True, url_count=len(urls))
    except (ValueError, UnsafeURL) as exc:
        report["sitemap"]["error"] = str(exc)
        issue("P1", ("Sitemap measurement incomplete: " if sitemap["error"] or sitemap["status"] is None else "Invalid/unavailable sitemap: ") + str(exc))
    candidates = list(dict.fromkeys([ORIGIN + p for p in IMPORTANT_PATHS] + urls))
    if len(candidates) > max_urls:
        issue("P2", "Crawl truncated at configured page limit; measurement incomplete")
    for url in candidates[:max_urls]:
        page = page_analysis(url, fetcher.get(url))
        page["robots_allows_googlebot"] = robot_parser.can_fetch("Googlebot", url) if robots_valid else None
        if page["robots_allows_googlebot"] is False: page["issues"].append("Googlebot blocked by robots.txt")
        report["pages"].append(page)
        for message in page["issues"]:
            issue("P0" if "NOINDEX" in message or "Googlebot blocked" in message else "P1", url + ": " + message)
    title_counts = Counter(p["title"] for p in report["pages"] if p["title"])
    description_counts = Counter(p["description"] for p in report["pages"] if p["description"])
    if any(n > 1 for n in title_counts.values()): issue("P1", "Duplicate raw HTML titles across monitored routes")
    if any(n > 1 for n in description_counts.values()): issue("P1", "Duplicate raw HTML descriptions across monitored routes")
    links = sorted({u for p in report["pages"] for u in p["internal_links"]})
    report["internal_links"] = {"observed": len(links), "checked": 0, "broken": [], "incomplete": len(links) > 40}
    for url in links[:40]:
        linked = fetcher.get(url)
        report["internal_links"]["checked"] += 1
        if linked["error"] or linked["status"] is None or linked["status"] >= 400:
            report["internal_links"]["broken"].append({"url": url, "status": linked["status"], "error": linked["error"]})
    if report["internal_links"]["broken"]: issue("P1", "Broken internal links or incomplete HTTP checks detected")
    if report["internal_links"]["incomplete"]: issue("P2", "Internal link sample truncated at 40 unique URLs")
    missing = fetcher.get(ORIGIN + "/__seo-monitor-not-found__")
    report["not_found_probe"] = {"status": missing["status"], "error": missing["error"]}
    if missing["error"] or missing["status"] is None: issue("P1", "Nonexistent-route HTTP check incomplete; status unknown")
    elif missing["status"] != 404: issue("P1", "Nonexistent route returned HTTP " + str(missing["status"]) + " instead of 404 (possible SPA soft 404)")
    homepage = fetcher.get(ORIGIN + "/")
    home_headers = homepage["headers"]
    home_measured = homepage["status"] == 200 and not homepage["error"]
    report["security_headers_present"] = {h: (h in home_headers if home_measured else None) for h in ("strict-transport-security", "x-content-type-options", "referrer-policy", "content-security-policy")}
    if home_measured and not report["security_headers_present"]["x-content-type-options"]: issue("P2", "Homepage lacks X-Content-Type-Options header")
    if homepage["status"] is not None and not homepage["error"] and homepage["status"] >= 500: issue("P0", "Homepage returned server error HTTP " + str(homepage["status"]))
    report["http_requests"] = fetcher.calls
    marker = fetcher.get(ORIGIN + "/build-info.json")
    report["production_commit"] = None
    report["build_marker"] = {"status": marker["status"], "verified_format": False}
    if marker["status"] == 200 and not marker["error"]:
        try:
            data = json.loads(marker["body"])
            if isinstance(data, dict) and isinstance(data.get("commit"), str) and re.fullmatch(r"[a-f0-9]{40}", data["commit"]):
                report["production_commit"] = data["commit"]
                report["build_marker"]["verified_format"] = True
                report["limitations"][3] = "Production commit is the site's declared build marker, not independent GitHub deployment verification."
        except (ValueError, TypeError):
            pass
    if previous and previous.get("origin") == ORIGIN:
        old = {p["url"]: p for p in previous.get("pages", [])}
        report["metadata_changes"] = [{"url": p["url"], "fields": [k for k in ("title", "description", "canonicals", "status") if p.get(k) != old[p["url"]].get(k)]} for p in report["pages"] if p["url"] in old]
        report["metadata_changes"] = [p for p in report["metadata_changes"] if p["fields"]]
    requests_complete = all(not r["error"] for r in fetcher.cache.values()) if hasattr(fetcher, "cache") else all(p["http_measurement_complete"] for p in report["pages"])
    report["measurement_complete"] = bool(tls.get("measurement_complete", tls["verified"])) and requests_complete and not any("truncated" in i["message"].lower() for i in report["issues"])
    report["summary"] = {"pages_attempted": len(report["pages"]), "pages_checked": sum(p["http_measurement_complete"] for p in report["pages"]), "issue_count": len(report["issues"]), "priorities": dict(Counter(i["priority"] for i in report["issues"]))}
    return report


def markdown_report(report: dict) -> str:
    summary = report["summary"]
    lines = ["# Dr. Vijay Khatri — public SEO health", "", f"Report ID: {report['report_id']}", f"Measured: {report['measured_at_asia_shanghai']} (UTC+8)", "", f"Pages checked: {summary['pages_checked']}; issues: {summary['issue_count']}", "", "## Findings", ""]
    lines.extend(f"- **{i['priority']}** {i['message']}" for i in report["issues"])
    if not report["issues"]: lines.append("No issues found by these bounded checks.")
    lines += ["", "## Measurement limits", ""] + ["- " + s for s in report["limitations"]]
    lines += ["- Structured data checks parse raw HTML only. Missing JSON-LD requires rendered inspection; syntax does not establish rich-result eligibility.", "- A scheduled workflow file is not evidence of activation or a successful cloud run.", ""]
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output-dir", default=".seo-private/monitoring")
    parser.add_argument("--previous", type=Path)
    parser.add_argument("--max-urls", type=int, default=30, choices=range(1, 31), metavar="1..30")
    parser.add_argument("--fail-on-high", action="store_true", help="Exit 1 for P0/P1 findings; reports are still written")
    args = parser.parse_args()
    output = Path(args.output_dir).resolve()
    project = Path(__file__).resolve().parents[1]
    for unsafe in (project / "public", project / "dist", project / "src"):
        if output == unsafe or unsafe in output.parents:
            parser.error("Reports must remain outside public, dist and src")
    previous = json.loads(args.previous.read_text()) if args.previous else None
    report = run_monitor(args.max_urls, previous)
    output.mkdir(parents=True, exist_ok=True)
    filename = report["report_id"]
    (output / (filename + ".json")).write_text(json.dumps(report, indent=2) + "\n")
    (output / (filename + ".md")).write_text(markdown_report(report))
    print(json.dumps({"report_id": filename, "output_dir": str(output), **report["summary"]}))
    return int(args.fail_on_high and any(i["priority"] in {"P0", "P1"} for i in report["issues"]))


if __name__ == "__main__":
    raise SystemExit(main())
