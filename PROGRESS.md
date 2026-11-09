# Portfolio implementation progress

_Updated for the light redesign on 2026-11-09. This document supersedes older visual/deployment notes._

## Current status — light redesign deployed and verified

- **Canonical repository:** [ahtishamasghar/portfolio](https://github.com/ahtishamasghar/portfolio)
- **Production branch:** `main`; the user has requested recent design and animation changes directly on `main`.
- **GitHub Pages URL:** https://ahtishamasghar.github.io/portfolio/
- **Deployment method:** GitHub Actions builds the Vite site for the `/portfolio/` base path and deploys the generated `dist/` artifact when the validated `main` branch changes.
- **Latest verified source commit before this documentation update:** `375c533` — `Redesign portfolio with light surfaces and cobalt accents`.
- **Latest verified deployment:** [GitHub Actions run #42581422928](https://github.com/ahtishamasghar/portfolio/actions/runs/42581422928), **success** for exact source `375c533`. Validation, Pages artifact build, and Pages deployment all succeeded. The corresponding local Playwright suite reported **30 passed**.
- **Public browser verification:** GitHub confirms successful publication. A separate manual visual check of the live public site across browsers/devices is still recommended; do not equate a successful workflow with independent visual approval.
- **Current implementation:** light ivory/navy design with cobalt accents, pastel cards, a blue/lavender animated hero, a cobalt contact panel, and updated social image/favicon. The nearly-black design is historical; this light revision passed local and CI validation and deployed successfully.

## Resume instructions

1. Read `PROGRESS.md`, the latest commits (`git log -8 --oneline`), `git status`, and current user requirements before making changes. **Do not resume the old `feat/premium-cybersecurity-portfolio` branch** or restart the project.
2. Work in the existing `ahtishamasghar/portfolio` repository. For tasks where the user explicitly requests direct changes, target `main`; otherwise follow the user's branch/PR preference. Do not silently merge or overwrite concurrent edits.
3. Preserve truthful portfolio details from `src/content/portfolio.ts`, existing functional behavior, responsive design, accessibility, and GitHub Pages `/portfolio/` compatibility.
4. Implement requested changes, run appropriate checks, review the resulting GitHub Actions run and its failures, and update this file when a material milestone is completed.
5. A push to `main` triggers **production deployment**; do not describe unverified workflow jobs as completed.

## Completed milestones

### 1. Portfolio application and content foundation

- React 19, TypeScript, Vite, Tailwind CSS, Motion for React, Lucide React, locally bundled fonts, and locked npm dependencies.
- Responsive header/navigation, hero, about, seven skill disclosures, education, certifications, projects section, contact, and footer.
- Centralized content in `src/content/portfolio.ts`. Current identity: **Muhammad Ahtisham Asghar**, **Cybersecurity & Technology Enthusiast**.
- BS Cybersecurity at the University of Sargodha is **in progress**. Google Cybersecurity Professional Certificate is **in progress**; Cisco completion status is **unconfirmed**. Projects collection intentionally remains empty until real project details are added. LinkedIn remains an unlinked placeholder.
- Email contact/copy fallback, keyboard-accessible navigation, skip navigation, direct-hash navigation, reduced-motion support, and accurate SEO metadata/structured site assets.
- No invented employment, achievements, verified credentials, or project deliverables.

### 2. Testing and GitHub Pages deployment

- GitHub Actions workflow: `.github/workflows/portfolio.yml`. It validates pushes/PRs and deploys to Pages only from `main` after validation.
- `scripts/verify-project-path.mjs` performs a Chromium smoke test for `/portfolio/` production output: HTML, bundle paths, favicon, social image, canonical metadata, crawler files, and in-page navigation.
- Playwright desktop/mobile browser tests include keyboard and pointer behavior, responsive overflow, content truthfulness, assets, reduced-motion behavior, no-JavaScript contact fallback, and automated axe WCAG A/AA checks.
- **PR #1:** [Premium portfolio deployment](https://github.com/ahtishamasghar/portfolio/pull/1) — merged into `main` on 2026-11-08; original Pages deployment successful.
- The old statement that deployment is incomplete or no PR exists is **obsolete**.

### 3. SIGNAL / 01 visual redesign

- Implemented custom graphite, mint, and citron visual identity with a network/systems-map hero, stronger layout treatments and card styling.
- Accessibility contrast issue identified and fixed; associated CI validation passed.
- **PR #2:** [SIGNAL / 01 redesign](https://github.com/ahtishamasghar/portfolio/pull/2) — merged on 2026-11-08. This design is **historical**, not the currently active visual theme.

### 4. Editorial visual redesign and extensive motion

- Reworked the hero with larger editorial typography, cobalt treatment, original vector artwork, and lighter section layouts.
- Added extensive effects: staggered entrance/reveal animation, animated illustration and particles, subtle moving backgrounds, scroll-progress indicator, infinitely moving keyword ticker, interactive cards/icons/buttons, and contact animations.
- The motion system is implemented in `src/motion.css`, `src/components/MotionEffects.tsx`, and `src/components/Reveal.tsx`. Decorative animations honor `prefers-reduced-motion: reduce`; a Playwright assertion checks this behavior.
- Motion feature commit: `f2d6edcc9f7df0ea7e7c64590ee0afd27d4c59ad`; [successful deployment run](https://github.com/ahtishamasghar/portfolio/actions/runs/42516160432).

### 5. ATELIER / 04 historical design and accessibility refinement

- After the animation release, a further Obsidian dark variant was developed, then replaced by the current **ATELIER / 04** light-first editorial system.
- That historical release used `src/atelier.css` as the final override. Milestone 6 replaces the layered cascade with `src/styles.css`.
- Current hero includes pointer-reactive lighting, animated artwork, telemetry accents, spectrum animation, and a refined mobile layout.
- Changes include mobile layout corrections and an additional small-label contrast fix.
- The intermediate visual commit `e80ee213...` failed CI; the follow-up `c7cd492...` passed. **Use the latest successful run**, not the failed intermediate result, as the verified baseline.
- [Latest verified run #42519464660](https://github.com/ahtishamasghar/portfolio/actions/runs/42519464660): **28 Playwright tests passed** and all three workflow jobs succeeded.

## How to develop and validate

Use Node.js per `.nvmrc` with the existing npm lockfile:

```bash
npm ci
npm run dev
```

Before pushing substantive changes:

```bash
npm run check
npx playwright install chromium
npm run test:e2e
```

For the **project-site** production build:

```bash
VITE_BASE_PATH=/portfolio/ VITE_SITE_URL=https://ahtishamasghar.github.io/portfolio npm run build
```

GitHub Actions also verifies this base path and runs `scripts/verify-project-path.mjs`. See `README.md` for more local workflow details, but note the documentation issue below.

## Milestone 6 — professional redesign, first checkpoint

The user rejected the previous visual design and delegated the new direction, requesting professional presentation and animation. The stale local checkout was synced to `origin/main` at `2754334` before integrating the redesign. Existing deployed fixes and project-path checks were retained.

Completed:

- Rebuilt hero/navigation with larger editorial typography, a charcoal/cobalt palette, and an original animated three-dimensional wire sculpture.
- Sculpture motion is capped at 24 fps and 1.5× pixel density, stops off-screen/in hidden tabs, responds gently to mouse movement, and remains decorative.
- Added a visible global pause/resume control and OS reduced-motion support. Reveal animations and scroll progress honor the shared preference.
- Reworked About into a readable editorial layout, simplified skill rows, improved contact styling, and retained all truthful personal content and existing interactions.
- Consolidated the active theme into `src/styles.css`; removed obsolete `atelier.css`, `editorial.css`, `signal.css`, and `motion.css`. They remain recoverable in Git history.
- Retained the 64px mobile header and natural-height expanded skill layouts from the latest main branch.
- Formatting, lint, type checking, production build: passed.
- Desktop/mobile Playwright: **30 passed**, including zero axe violations, real animation pause/resume, reduced motion, keyboard navigation, and clipboard fallback.
- `/portfolio/` production build and browser smoke test: passed. Default build restored afterward.

## Milestone 7 — final polish and handoff

- Refined section headings and contact copy for clear, direct presentation.
- Regenerated the 1200×630 Open Graph image with matching typography and the wire sculpture. Updated the favicon to match the new identity.
- Corrected README deployment status, theme architecture, and motion controls; retained full local-development, content-editing, project, certification, and Pages instructions.
- Inspected desktop, tablet, and mobile screenshots. Mobile remains a single-column layout with readable type and a compact header.
- Formatting, lint, type check, production build, and **30 desktop/mobile Playwright tests passed** after these changes; accessibility scans report zero violations.
- The previous redesign checkpoint (`35ad742`) is independently confirmed successful by the GitHub Actions web page: run `42546375876`, including Pages deployment.

## Milestone 8 — light visual redesign

The user rejected the nearly-black theme and requested a professional modern appearance. This update continues the existing implementation and preserves truthful content, navigation, and accessibility.

Completed:

- Replaced charcoal backgrounds with ivory surfaces, navy typography, cobalt accents, and lavender/mint/cream cards.
- Reworked the hero into a clear split layout with a rounded blue/lavender sculpture panel and an accurate education callout. Updated canvas colours for the lighter background.
- Added a pill navigation treatment, clear buttons/focus outlines, a desktop bento skill grid, distinct education/project panels, and a cobalt contact section.
- Preserved entrance animation, pointer response, scroll progress, global pause/resume, reduced-motion support, and off-screen animation suspension.
- Updated the favicon, browser theme colour, 1200×630 social image, and README design description.
- Corrected small-label contrast and mobile label overlap during visual/accessibility review.
- Updated the reveal test to scroll the actual heading container into view; centring a tall mobile section can leave its heading outside the viewport.
- Formatting, linting, type checking, production build, and **30 desktop/mobile Playwright tests passed**. Desktop/mobile axe scans report zero violations.
- Visually reviewed desktop, tablet, and mobile screenshots; checked the floating hero card fits at 320px, 768px, and 1440px.
- Verified the `/portfolio/` production build and browser smoke check; restored the default build afterward.

Publication:

- Committed and pushed to `main` as `375c533`.
- Verified the exact source commit and successful validation, artifact build, and Pages deployment in [run #42581422928](https://github.com/ahtishamasghar/portfolio/actions/runs/42581422928).
- No implementation or deployment work remains pending. Public-site visual inspection and the additional browser/device checks below remain unavailable in this environment.

## Exact next steps and verification limits

1. Continue from `main` and this progress log. Read Git history/status, fetch and inspect concurrent changes before editing or pushing; never force-push or restart the project.
2. This light release is complete and successfully deployed. Continue from source `375c533` and the follow-up progress documentation; preserve completed work.
3. This documentation-only verification commit uses `[skip ci]` to avoid deploying unchanged site files. Future implementation changes should run the documented checks before push.
4. `api.github.com` and the live Pages domain are denied by the current cloud network policy. Git and GitHub web pages work. Verify Actions via its web run; independent live-site visual inspection remains unavailable. Local desktop/tablet/mobile screenshots have been inspected.
5. A temporary stash named “Professional redesign draft before syncing latest main” preserves an earlier draft. It is already integrated; do not reapply it. The old feature branch is historical.
6. Use `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium` for local browser checks and `scripts/verify-project-path.mjs`; CI installs the matching browser itself.
7. Real Safari/Firefox, screen readers, and hands-on device testing remain outside the executed Chromium/axe checks. No known functional issues remain in the executed checks.
8. Never invent credentials, employment, completed projects, certification achievements, or LinkedIn links.
