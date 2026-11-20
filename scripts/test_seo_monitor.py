#!/usr/bin/env python3
"""Offline tests for monitoring correctness, bounded crawling and URL isolation."""

import io
import json
import unittest
from unittest.mock import patch, Mock
from urllib.error import HTTPError

import seo_monitor as monitor


def html(url=monitor.ORIGIN + "/", robots="index,follow", json_ld='{"@type":"WebPage"}'):
    return f'''<!doctype html><html><head><title>Page {url}</title>
    <meta name="description" content="Description {url}">
    <meta name="robots" content="{robots}"><link rel="canonical" href="{url}">
    <script type="application/ld+json">{json_ld}</script></head><body>
    <h1>Consultation information</h1><p>{"Public information. " * 20}</p>
    <a href="/contact">Contact</a><a href="tel:+923001234567">Phone</a>
    <a href="https://wa.me/923001234567">WhatsApp</a></body></html>'''


def fetched(url, body=None, status=200, content_type="text/html"):
    return {"url": url, "status": status, "body": html(url) if body is None else body,
            "headers": {"content-type": content_type, "x-content-type-options": "nosniff"},
            "redirects": [], "error": None, "elapsed_ms": 15}


def sitemap(urls):
    return '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + ''.join('<url><loc>' + u + '</loc></url>' for u in urls) + '</urlset>'


class URLSafetyTests(unittest.TestCase):
    def test_only_exact_https_production_origin_can_be_requested(self):
        self.assertEqual(monitor.allowed_url(monitor.ORIGIN), monitor.ORIGIN + "/")
        for value in ["http://drvijaykhatri.com/", "https://www.drvijaykhatri.com/", "https://localhost/",
                      "https://127.0.0.1/", "https://169.254.169.254/latest/meta-data", "https://drvijaykhatri.com.evil.test/",
                      "https://user:password@drvijaykhatri.com/", "https://drvijaykhatri.com@evil.test/",
                      "https://drvijaykhatri.com:8443/", monitor.ORIGIN + "/?token=secret",
                      monitor.ORIGIN + "/#fragment", monitor.ORIGIN + "/\nheader", monitor.ORIGIN + "\\@evil.test/"]:
            with self.subTest(value=value), self.assertRaises(monitor.UnsafeURL): monitor.allowed_url(value)

    def test_relative_links_are_resolved_but_external_or_query_links_are_not_requested(self):
        base = monitor.ORIGIN + "/blog/post"
        self.assertEqual(monitor.internal_link(base, "../guide#steps"), monitor.ORIGIN + "/guide")
        self.assertEqual(monitor.internal_link(base, "/contact#map"), monitor.ORIGIN + "/contact")
        for value in ["#steps", "mailto:test@example.com", "tel:+923001234567", "https://example.com/",
                      "//127.0.0.1/", "/booking?email=patient@example.com", "https://x:y@drvijaykhatri.com/contact"]:
            self.assertIsNone(monitor.internal_link(base, value))

    @patch("seo_monitor.socket.getaddrinfo")
    def test_private_dns_address_is_rejected(self, lookup):
        lookup.return_value = [(2, 1, 6, "", ("127.0.0.1", 443))]
        with self.assertRaises(monitor.UnsafeURL): monitor.public_dns()

    @patch("seo_monitor.public_dns")
    def test_offsite_redirect_is_blocked_before_second_request(self, _dns):
        fetcher = monitor.Fetcher(delay=0, retries=0)
        response = HTTPError(monitor.ORIGIN, 302, "redirect", {"Location": "https://secret:password@169.254.169.254/"}, io.BytesIO(b""))
        fetcher.opener = Mock()
        fetcher.opener.open.side_effect = response
        result = fetcher.get(monitor.ORIGIN + "/")
        self.assertIn("Redirect blocked", result["error"])
        self.assertNotIn("password", json.dumps(result))
        self.assertEqual(fetcher.opener.open.call_count, 1)

    def test_http_request_budget_is_enforced(self):
        fetcher = monitor.Fetcher(delay=0, budget=0)
        fetcher.opener = Mock()
        result = fetcher.get(monitor.ORIGIN + "/")
        self.assertIn("budget exhausted", result["error"])
        fetcher.opener.open.assert_not_called()


class SitemapTests(unittest.TestCase):
    def test_valid_namespace_and_urls(self):
        self.assertEqual(monitor.parse_sitemap(sitemap([monitor.ORIGIN + "/"])), ("urlset", [monitor.ORIGIN + "/"]))

    def test_invalid_xml_empty_duplicates_and_external_urls_are_rejected(self):
        for body in ["<urlset>", "<html>not XML sitemap</html>", '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>',
                     sitemap([monitor.ORIGIN + "/", monitor.ORIGIN + "/"]), sitemap(["https://example.com/"]),
                     sitemap(["https://user:password@drvijaykhatri.com/"]),
                     '<!DOCTYPE urlset [<!ENTITY x "expanded">]><urlset>&x;</urlset>']:
            with self.subTest(body=body), self.assertRaises(ValueError): monitor.parse_sitemap(body)


class HTMLTests(unittest.TestCase):
    def test_good_page(self):
        result = monitor.page_analysis(monitor.ORIGIN + "/", fetched(monitor.ORIGIN + "/"))
        self.assertEqual(result["issues"], [])
        self.assertEqual(result["raw_json_ld_count"], 1)
        self.assertEqual(result["consultation"]["malformed"], 0)

    def test_noindex_from_meta_or_response_header_is_detected(self):
        page = fetched(monitor.ORIGIN + "/", html(robots="noindex, follow"))
        self.assertIn("NOINDEX directive detected", monitor.page_analysis(monitor.ORIGIN + "/", page)["issues"])
        page = fetched(monitor.ORIGIN + "/")
        page["headers"]["x-robots-tag"] = "googlebot: noindex"
        self.assertIn("NOINDEX directive detected", monitor.page_analysis(monitor.ORIGIN + "/", page)["issues"])

    def test_malformed_json_ld_is_not_silently_accepted(self):
        page = fetched(monitor.ORIGIN + "/", html(json_ld="{bad json}"))
        self.assertEqual(monitor.page_analysis(monitor.ORIGIN + "/", page)["json_ld_syntax_errors"], 1)

    def test_csr_is_reported_as_raw_html_limit_not_proof_of_absent_schema(self):
        page = fetched(monitor.ORIGIN + "/", '<html><head><title>App</title></head><body><div id="root"></div></body></html>')
        result = monitor.page_analysis(monitor.ORIGIN + "/", page)
        self.assertIn("browser rendering inspection required", " ".join(result["issues"]))
        self.assertIn("do not prove absence", result["structured_data_limit"])

    def test_network_failure_does_not_invent_missing_metadata_or_website_downtime(self):
        page = fetched(monitor.ORIGIN + "/", "", status=None)
        page["error"] = "DNS policy blocked this measurement"
        result = monitor.page_analysis(monitor.ORIGIN + "/", page)
        self.assertFalse(result["http_measurement_complete"])
        self.assertEqual(len(result["issues"]), 1)
        self.assertIn("Measurement incomplete", result["issues"][0])

    def test_consultation_validation_does_not_make_external_requests(self):
        result = monitor.consultation_links(["https://wa.me/+923001234567", "https://wa.me/923001234567", "tel:invalid"])
        self.assertEqual(result["malformed"], 2)
        self.assertEqual(result["whatsapp_links"], 2)
        self.assertIn("no messages", result["live_delivery"])

    def test_redirects_to_other_routes_and_multiple_hops_are_reported(self):
        page = fetched(monitor.ORIGIN + "/")
        page["redirects"] = [{"status": 301, "url": monitor.ORIGIN + "/contact"}]
        self.assertIn("Unexpected redirect to a different route", monitor.page_analysis(monitor.ORIGIN + "/", page)["issues"])
        page["redirects"].append({"status": 302, "url": monitor.ORIGIN + "/about"})
        self.assertIn("Redirect chain has more than one hop", monitor.page_analysis(monitor.ORIGIN + "/", page)["issues"])


class FakeFetcher:
    def __init__(self): self.calls = 0
    def get(self, url):
        self.calls += 1
        monitor.allowed_url(url)
        if url.endswith("robots.txt"):
            return fetched(url, "User-agent: *\nAllow: /\nSitemap: " + monitor.ORIGIN + "/sitemap.xml\n", content_type="text/plain")
        if url.endswith("sitemap.xml"):
            return fetched(url, sitemap([monitor.ORIGIN + p for p in monitor.IMPORTANT_PATHS]), content_type="application/xml")
        if url.endswith("/__seo-monitor-not-found__"): return fetched(url, "Not found", status=404)
        if url.endswith("build-info.json"): return fetched(url, json.dumps({"commit": "a" * 40}), content_type="application/json")
        return fetched(url)


class EndToEndFixtureTests(unittest.TestCase):
    @patch("seo_monitor.Fetcher", FakeFetcher)
    @patch("seo_monitor.tls_check", return_value={"verified": True, "days_remaining": 60})
    def test_report_uses_verified_marker_and_never_invents_search_or_web_vitals_data(self, _tls):
        report = monitor.run_monitor()
        self.assertEqual(report["summary"]["issue_count"], 0)
        self.assertEqual(report["production_commit"], "a" * 40)
        self.assertEqual(report["summary"]["pages_checked"], 9)
        self.assertNotIn("clicks", report)
        self.assertNotIn("lcp", report)
        self.assertIn("Actual Google indexing", monitor.markdown_report(report))

    @patch("seo_monitor.Fetcher", FakeFetcher)
    @patch("seo_monitor.tls_check", return_value={"verified": True, "days_remaining": 60})
    def test_low_page_limit_labels_measurement_incomplete(self, _tls):
        report = monitor.run_monitor(max_urls=1)
        self.assertEqual(len(report["pages"]), 1)
        self.assertTrue(any("truncated" in i["message"] for i in report["issues"]))
        self.assertFalse(report["measurement_complete"])

    @patch("seo_monitor.tls_check", return_value={"verified": False, "measurement_complete": False, "error": "TLS measurement unavailable"})
    def test_blocked_environment_is_not_a_confirmed_production_outage(self, _tls):
        class BlockedFetcher:
            def __init__(self): self.calls = 0; self.cache = {}
            def get(self, url):
                result = fetched(url, "", status=None)
                result["error"] = "DNS policy blocked this measurement"
                self.cache[url] = result
                return result
        with patch("seo_monitor.Fetcher", BlockedFetcher): report = monitor.run_monitor()
        self.assertFalse(report["measurement_complete"])
        self.assertEqual(report["summary"]["pages_checked"], 0)
        self.assertFalse(any(i["priority"] == "P0" for i in report["issues"]))
        self.assertTrue(all(v is None for v in report["security_headers_present"].values()))


if __name__ == "__main__":
    unittest.main()
