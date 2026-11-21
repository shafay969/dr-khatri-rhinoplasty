# Dr Vijay Khatri website

This repository serves https://drvijaykhatri.com, a medical practice website focused on rhinoplasty consultations in Karachi. For SEO execution or maintenance, use `.agents/skills/autonomous-medical-seo/SKILL.md` and `docs/seo/README.md`.

## Working agreements

- Inspect Git status and remotes before editing. Preserve unrelated changes and work in an isolated `codex/` branch or worktree. GitHub is the source of truth; do not force-push or rewrite important history.
- Source changes, tests, commits, pull requests and deployment previews are authorized within the SEO remit. Production merges, production publishing, DNS/security changes, public listing changes, purchases and paid services require explicit approval. A push to `main` can trigger Netlify production publishing.
- Preserve the established design, existing URLs and consultation flows. Use the existing React/TypeScript/Vite architecture; avoid a framework migration without evidence.
- Clinical claims and professional facts need appropriate evidence. Do not invent credentials, training, patient proof, ratings, procedure counts, prices or outcomes. Substantive clinical publication requires surgeon approval; patient media needs authenticity and consent confirmation.
- Never buy backlinks, fabricate reviews, promise rankings or introduce sensitive patient tracking. Do not test forms by sending false appointments or contacting patients.
- Keep confidential state, reporting configuration and reports in git-excluded `.seo-private/`, never `public/` or `dist/`. This repository is public. No credentials, recipient details, patient data or private operational findings belong in commits, PR text or public logs.

## Verification

Run the checks relevant to changes: `npm run build`, `npm run test:seo`, and `python3 -m unittest discover -s scripts -p 'test_*.py'`. Use `npm run monitor:seo` for read-only live health checks. Record evidence privately; a passing build is not a deployment or confirmed Google indexing.
