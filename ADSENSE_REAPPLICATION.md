# AdSense remediation and publication checks

## Implemented October 18, 2026

- Read Search Console's three-month page and query report before changing index policy. Existing landing pages have search activity, including loader pages and the former guide merge candidates. Retain every existing landing URL, title and self-canonical. No bulk redirects or noindex were applied.
- `scripts/seo-baseline.json` locks the 108 existing exported landing pages. `npm run check:indexing` checks title/canonical preservation, indexability, sitemap inclusion, release evidence, shader evidence disclosures and exact typo redirects.
- Review 16 official DH release records from the Modrinth API. `src/data/releaseEvidence.json` stores the exact release IDs, loaders, dates and declared dependencies. Every installation path links to its actual release record. Do not infer tested compatibility from file availability.
- Correct the Minecraft 1.21.11 homepage example to DH 3.3.3; Minecraft 26.3 separately has DH 3.3.4. Do not treat one example as the latest build for every Minecraft version.
- Replace unsupported shader compatibility, minimum-version, performance-tier and old test-date labels with explicit author-source scope and unknown exact combinations. Keep all 20 detail URLs. Photon and Solas explicitly mention DH in their descriptions; a complete working version matrix remains untested.
- Expand shader detail pages with pack-specific source notes, separate baseline comparisons, failure interpretation and reproducible-report fields. IterationT and FLAVOR project provenance could not be verified; do not provide their old links as trusted downloads.
- Expand guide templates with cause-specific diagnostic comparisons and scoped source links. Retain separate generation, CPU, heap, GC and dimension pages because they have distinct user questions and search activity. Restore their links in the guide index.
- Rewrite FAQ answers that contradicted the installation or shader guidance. Do not automatically prescribe Fabric API, Indium or a legacy Oculus stack.
- Replace the settings tool's undisclosed preset map with visible editorial starting rules. Preview and output share the same calculation. No FPS, GPU equivalence, in-game test or automatic hardware detection is claimed.
- Sitemap includes only exported, indexable, self-canonical pages. Substantively updated pages use the review date; unchanged trust pages retain their prior date. The old unimplemented merge/allow lists were removed.
- Add only exact typo redirects observed in Search Console, never redirect an existing exported landing page. Unknown arbitrary paths retain the static site's 404 behavior.

## Refreshing release evidence

Run `node scripts/refresh-release-evidence.mjs --checked-at=YYYY-MM-DD` with the actual review date, inspect the diff, update the scoped homepage example if necessary, then run the checks below. The script stops if declared dependencies change instead of publishing an unsupported dependency recipe.

`src/data/versions.json` is historical input retained for reference; runtime installation data now comes exclusively from `releaseEvidence.json` through `versionCatalog.ts`.

## Publication validation

1. Run `npm run lint`, `npm run build`, `npm run check:home-seo`, and `npm run check:indexing`.
2. Check the settings preview/output and shader search in a browser. Confirm source disclosures are readable, normal internal navigation works, and existing search landing pages retain their canonical.
3. Verify the production deployment points at the intended commit, then fetch representative live pages, robots, ads.txt and sitemap. Check the exact typo redirects on the deployed host; a local Python static server does not apply Cloudflare `_redirects`.
4. Keep raw Search Console exports and screenshots private; they are not site content.

## Account-side requirements before reapplying

Ownership evidence remains the existing AdSense account meta tag and `ads.txt`. The Auto ads script remains disabled.

- Confirm the applicable Google-certified advertising consent message in AdSense before enabling ads. The analytics consent control does not substitute for an advertising CMP.
- Exclude non-content/trust/error pages from Auto ads when ads are enabled; test placements without clicking live ads.
- Wait for material published changes to be crawled before requesting another review. No fixed waiting period or approval guarantee is implied.
- Source corrections improve reliability but cannot substitute for future real test records. Do not invent gameplay screenshots, hardware benchmarks, author identities or success stories.

## Host checks

The prior note that `www` redirected to a broken `.app` hostname is stale. On October 18, 2026, live checks showed `https://www.distanthorizonsguide.com/robots.txt` redirecting to the correct apex URL (301), followed by 200. Apex robots also returned 200. No hostname configuration change is needed based on that check.
