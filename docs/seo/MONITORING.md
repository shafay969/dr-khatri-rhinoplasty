# Public SEO monitoring

## Activation status

Prepared on 2026-11-21. The workflow files and local tests do not establish that cloud scheduling is active. GitHub scheduled workflows run from the default branch, `main`; merging there can also deploy this Netlify site and requires the user's production approval. Do not merge or enable production changes as part of monitoring setup.

After an approved merge, an authorized maintainer must verify Actions are enabled, review the repository's actual Actions quota/billing settings, manually dispatch **Public SEO monitoring**, inspect its completed artifacts, and subsequently verify a scheduled run. Record the run URLs and actual start times in private operational state. Until those checks pass, describe cloud monitoring as prepared, not active. A public repository is not sufficient proof of account-specific runner availability or unlimited free usage.

The daily schedule is 12:30 UTC (20:30 Asia/Shanghai). It starts measurements before the separate 13:00 UTC / 21:00 Asia/Shanghai consolidated report. GitHub may delay scheduled execution. Never invent a fresh measurement when a run is missing or delayed.

In public repositories, GitHub can disable scheduled workflows after 60 days without repository activity. Weekly maintenance must check the workflow state and latest completed run, and report required reactivation. Do not create artificial commits or change production merely to keep a schedule alive. See [GitHub's schedule limitations](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).

This workflow sends no email. A single separate Codex/Gmail reporting pipeline owns delivery, the recipient and date-based email deduplication. Keep the recipient and delivery state out of this public repository. A local Codex reporting task depends on its documented host/app availability; GitHub health measurements can run without that Mac once activated.

## Run locally

From the project worktree:

```sh
python3 scripts/test_seo_monitor.py
python3 scripts/seo_monitor.py --output-dir .seo-private/monitoring --max-urls 30
```

To use a prior technical report for metadata comparison:

```sh
python3 scripts/seo_monitor.py --output-dir .seo-private/monitoring --previous /absolute/path/prior-report.json
```

`--fail-on-high` exits with status 1 for P0/P1 findings after writing the JSON and Markdown reports. Without it, findings are recorded and the command exits successfully. A zero exit status without this flag is not a clean bill of health. Measurement failures appear explicitly in the report.

Reports use Asia/Shanghai calendar dates in identifiers and include both UTC and UTC+8 measurement timestamps. Repeated local measurements on the same date replace that date's local technical report; this is not email delivery state. GitHub artifacts use unique run IDs and retain each cloud run separately for seven days. Do not commit `.seo-private/` output or place reports in `public/`, `dist/` or `src/`; the script rejects those three output destinations. Output contains only public technical metadata, never HTML archives, submitted form data, screenshots, patient photos, credentials or email addresses. Treat GitHub artifacts in a public repository as potentially public and keep private operational commentary out of them.

## Checks and bounds

- HTTPS certificate validation and expiry for `drvijaykhatri.com`, using the system trust store.
- HTTP availability, redirects, content types, sitemap XML syntax/namespace, duplicate and off-origin sitemap URLs, robots.txt and Googlebot crawl directives.
- Up to 30 important/sitemap pages: raw HTML titles, descriptions, canonical URLs, noindex directives, H1 count, meaningful body text, image alt attribute counts and JSON-LD syntax.
- Up to 40 unique internal links, using cached page responses where possible; no external-link requests.
- Telephone and WhatsApp link syntax only; no calls, messages, false bookings, form submissions or patient interactions.
- A known nonexistent route must return an actual HTTP 404, detecting blanket SPA fallbacks.
- Presence of selected security headers; the script does not change security settings.
- Optional metadata comparison against a supplied prior report and the site's declared `build-info.json` commit, when a valid 40-character commit value is present. A null, absent or malformed marker remains unknown; it is never replaced with local Git HEAD.

Network policy permits only the exact production HTTPS hostname, with no credentials, query parameters or fragments. Redirects are checked before following; even a redirect to `www` is intentionally blocked for manual review rather than broadening the allowlist silently. Each request checks that DNS resolves to public addresses, verifies TLS, disables inherited proxies and accepts at most 2 MiB of response data. Defaults: 12-second request timeout, one retry for transient failures, at least 250 ms between requests, at most 70 HTTP attempts and five redirects. Sitemap indexes are limited to five children and one level. Truncation, failed requests or exceeded limits are recorded as incomplete measurements. No arbitrary URL command-line argument is accepted.

These bounds protect the monitor against injected off-origin/credential URLs and keep load low. DNS validation is followed by the ordinary verified HTTPS connection to this fixed trusted hostname; the monitor is not a general-purpose untrusted-host crawler.

## What these results do not establish

Raw HTML is inspected separately from the browser-rendered regression tests. An absent raw JSON-LD block does not prove that client-side JavaScript never adds one. Sparse raw content is a rendering investigation, not proof that Google has deindexed a page. Valid JSON syntax is not Schema.org type validation or Google rich-result eligibility. Check appropriate official validators and current support separately.

HTTP elapsed times are diagnostic timings, not Lighthouse, LCP, INP, CLS, CrUX or other real-user field data. The monitor does not fabricate those metrics. It does not access Google Search Console, Analytics, Business Profile or Keyword Planner. Actual indexing, clicks, impressions, rankings and consultations remain unavailable until properly authorized integrations supply them. A public build marker is a declared serving commit, not independent deployment-provider attestation.

No report is automatically emailed, no branch is modified, no deployment is triggered, and no DNS, business profile, tracking pixel or security setting is changed by these workflows.

## CI permissions and supply chain

Both workflows request `contents: read` only and disable persisted checkout credentials. They use official GitHub Actions pinned to commit SHAs, resolved from their official repositories on 2026-11-21:

| Action | Tag reviewed | Immutable commit |
|---|---|---|
| actions/checkout | v4 | `11d5960a326750d5838078e36cf38b85af677262` |
| actions/setup-node | v4 | `49933ea5288caeca8642d1e84afbd3f7d6820020` |
| actions/setup-python | v5 | `a26af69be951a213d495a4c3e4e4022e16d87065` |
| actions/upload-artifact | v4 | `ea165f8d65b6e75b540449e92b4886f43607fa02` |

The Python monitor has no third-party packages. Build CI installs the project's npm lockfile and its locked Playwright package/browser, uses Node.js 24.14.0, and runs meaningful route/metadata/404/consultation regression checks. It does not impose a Lighthouse score gate. No secrets are needed for public monitoring; authenticated analytics or email require a separately approved design, not a credential pasted into a workflow.

The monitoring concurrency group covers this one production target and cancels an overlapping monitor run. Pull-request checks are independent and do not cancel production measurements. The monitor retains public technical artifacts for seven days and publishes no GitHub Pages output.

## Offline regression tests

Fixtures exercise malformed XML, entity declarations, duplicate sitemap URLs, unsafe origins, private DNS answers, credentials in URLs, query leakage, blocked offsite redirects, request-budget exhaustion, valid relative links, noindex in meta/HTTP headers, malformed JSON-LD, CSR uncertainty, malformed consultation links, a valid declared build marker and explicit incomplete crawl limits. Tests never contact an external service or send an appointment.
