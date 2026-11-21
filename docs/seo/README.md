# SEO operations guide

This directory contains public, reusable operating guidance for the Dr Vijay Khatri website. It is not a record of completed implementation or proof of account access. Confidential task state, reports, recipient configuration, approval evidence and detailed findings live in git-excluded `.seo-private/` or approved secure storage.

Read [project context](PROJECT_CONTEXT.md), [the master plan](SEO_MASTER_PLAN.md) and [medical review requirements](MEDICAL_REVIEW.md). The project skill is [autonomous-medical-seo](../../.agents/skills/autonomous-medical-seo/SKILL.md).

## Resume work

Start Codex in this repository/worktree and ask: “Use $autonomous-medical-seo to read the current private task state and complete the highest-impact unblocked task.” Repository skills use `.agents/skills/<name>/SKILL.md`; Codex reads name/description before loading the instructions. If the new skill is not visible, restart Codex in this worktree and invoke it again. [Official skill guidance](https://learn.chatgpt.com/docs/build-skills).

Check Git status before editing. Private state missing from a new clone must be restored through an authorized channel; do not assume an empty clone means earlier work was never done.

## Development checks

Run from the repository root with the configured Node/npm environment and installed dependencies. Browser-based prerendering requires the compatible Playwright Chromium browser; follow the reviewed package/build configuration for installation.

```sh
npm run build
npm run test:seo
python3 -m unittest discover -s scripts -p 'test_*.py'
```

`npm run build` type-checks, builds and prerenders the site. `npm run test:seo` checks generated route/SEO behavior. The Python suite tests monitoring logic. Use `npm run monitor:seo` for a read-only live-site check; inspect the script’s options for artifact destinations. Record observed output and the tested commit, not merely the intended commands.

Also inspect mobile and desktop navigation, rendering, gallery controls and consultation links in a browser. Do not submit appointments or contact real patients during QA. Check unknown routes at the hosting layer for an actual 404. Syntactically valid schema is not proof of medical accuracy or eligibility for a particular Google result.

## Release and rollback

1. Commit relevant changes on an isolated branch. Create a reviewable PR; use a Netlify Deploy Preview if available. Redact private findings from public PR text.
2. Present build, functional and SEO evidence, clinical approval status, material risks and a rollback plan. Obtain explicit production approval. Do not push to `main`, merge, or publish a production deployment beforehand.
3. After an authorized release, inspect the connected Netlify deploy record and the live deployment marker/content to establish what commit is serving. Verify representative routes, statuses, canonical domain, sitemap, robots, consultation links and preview/production indexing settings.
4. If rollback is needed, identify the last verified good production deploy and its commit. Obtain production approval to restore that deploy through Netlify, or prepare a normal revert PR. Preserve history; never force-push. Verify the live result after the approved rollback.

Netlify must publish only `dist/`. Do not copy `docs/`, `.agents/` or `.seo-private/` into the publish output. Check generated files before release. Neither Git exclusion nor a robots rule is an access-control boundary; sensitive content must never enter the deployment artifact.

## Monitoring and reporting

The private automation record owns activation status, report recipient and delivery evidence. One authoritative reporting pipeline runs daily at 21:00 Asia/Shanghai (13:00 UTC); delivery delays must be recorded rather than hidden. Monitoring and intelligent maintenance must not automatically modify production or publish medical content. Healthy sites do not require daily code changes. A schedule definition alone does not prove a run occurred or an email arrived.
