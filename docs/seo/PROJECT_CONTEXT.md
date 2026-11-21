# Project context

## Identity and objectives

Production website: https://drvijaykhatri.com. The practice is Dr Vijay Khatri’s medical website, focused on rhinoplasty consultations in Karachi, Pakistan, with Pakistan as a secondary market. The primary outcome is qualified patient consultation requests. Improve technical access, patient information, verified professional credibility and local discoverability; never guarantee search positions or timelines.

The authorized program is an initial five-day optimization sprint followed by continuous monitoring and evidence-led maintenance until explicitly disabled. Runtime capability, scheduling and delivery status must be verified independently. A single chat is not an indefinitely running service.

## Infrastructure

| Component | Project arrangement |
|---|---|
| Source | [GitHub repository](https://github.com/shafay969/dr-khatri-rhinoplasty), public |
| Production branch | `main`; a connected push/merge may publish automatically |
| App | React 18, TypeScript, Vite 5, React Router 6, Tailwind CSS, Helmet, Framer Motion; inspect package/lock files for current resolved versions |
| Rendering | Browser application with build-time snapshots through `scripts/prerender.mjs`; validate actual generated content and every supported route |
| Build | `npm run build`; Netlify browser prerequisites/runtime are defined by current hosting/build configuration |
| Publish output | `dist/` only |
| Hosting | GitHub-connected Netlify; deployment records and live evidence establish the serving commit |
| Domain | Custom production domain registered through Cloudflare; discover actual authoritative DNS before proposing changes |
| SEO operations | Public procedures in `docs/seo/`; confidential execution state in git-excluded `.seo-private/` |

Do not infer that the current Git HEAD is serving production, that public discoverability proves Google inclusion, or that a connected Google plugin grants access to Search Console/Analytics/Business Profile. Reuse existing client-owned properties and delegated access where available.

## Facts and provenance

`src/data/business.ts` is the existing provenance boundary for professional facts supplied by the client. Its comments record the confirmation date and remaining gaps. Retain that distinction: prior client confirmation is not a new PMDC lookup or a clinician’s approval of all surrounding copy. Verify current registered specialty, exact credential titles, technique/training descriptions, practice affiliation, schedule and contact details before changing them or expanding structured data.

Keep the doctor, any practice entity and the hospital distinct. A visiting-consultant relationship does not establish hospital ownership. Do not infer outcomes or research credentials from unrelated people with the same name. Do not publish patient proof without authenticity and consent confirmation.

## Keyword ownership

The homepage primarily serves branded identity and navigation. `/rhinoplasty` owns generic commercial rhinoplasty/nose-surgery intent in Karachi; `/booking` and `/contact` support consultation and local navigation. Existing educational pages cover cost factors, revision, recovery, male rhinoplasty, nasal injury, tip concerns and technique comparisons. Maintain the detailed page-keyword map privately and avoid competing pages for minor query variations.

Turkish, Piezo and ultrasonic phrasing is a research/positioning candidate only to the extent the practice’s actual services and training support it. Do not create new service pages or clinical promises from keyword demand alone. Urdu and Roman Urdu candidates need language review and actual query evidence; unknown volume/ranking/difficulty remains unknown.

## Authorization boundaries

Reversible relevant source changes, safe tests, documentation, commits, PRs and deployment previews are within the SEO remit. Explicit approval is required for production merge/publishing, DNS or Cloudflare security changes, external listing changes, purchases, paid services, sensitive patient tracking and irreversible/high-risk actions. Surgeon approval is required before publishing substantive new or changed clinical claims. See [medical review](MEDICAL_REVIEW.md).

The additional service budget is zero without separate authorization. Never buy backlinks. Reporting recipient and credentials belong in private configuration, not public version control. The approved reporting time is 21:00 Asia/Shanghai daily; read actual delivery and activation status from private operational evidence.
