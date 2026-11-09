# Portfolio implementation progress

_Last updated: 2026-11-09 (Asia/Karachi). This document supersedes the original Codex Cloud milestones and the outdated deployment notes._

## Current status — deployed and under active development

- **Canonical repository:** [ahtishamasghar/portfolio](https://github.com/ahtishamasghar/portfolio)
- **Production branch:** `main`; the user has requested recent design and animation changes directly on `main`.
- **GitHub Pages URL:** https://ahtishamasghar.github.io/portfolio/
- **Deployment method:** GitHub Actions builds the Vite site for the `/portfolio/` base path and deploys the generated `dist/` artifact when the validated `main` branch changes.
- **Latest verified source commit before this documentation update:** `c7cd49279e068c8fbf713711716dac5eb7fc0130` — `Improve small-label contrast for accessible editorial theme`.
- **Latest verified deployment:** [GitHub Actions run #42519464660](https://github.com/ahtishamasghar/portfolio/actions/runs/42519464660), **success**. Validation, Pages artifact build, and Pages deployment all succeeded. The associated Playwright suite reported **28 passed**.
- **Public browser verification:** GitHub confirms successful publication. A separate manual visual check of the live public site across browsers/devices is still recommended; do not equate a successful workflow with independent visual approval.
- **Current visual identity:** **ATELIER / 04**, light porcelain/white canvas with ink/navy typography, cobalt accents, responsive editorial sections, and a dark animated hero illustration. This is the active stylesheet, not the older violet, green SIGNAL, or earlier editorial concept.

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

### 5. ATELIER / 04 current design and accessibility refinement

- After the animation release, a further Obsidian dark variant was developed, then replaced by the current **ATELIER / 04** light-first editorial system.
- Active stylesheet: **`src/atelier.css`**, imported last from `src/main.tsx` so it can override earlier design layers (`styles.css`, `editorial.css`, `motion.css`).
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

## Current cautions and next maintenance tasks

1. **README is stale:** its introduction still describes the original dark/violet palette and says Pages deployment is unverified. Bring it into alignment with the current ATELIER / 04 design and verified deployment in a separate documentation update.
2. Older stylesheets and design artifacts remain in source. `src/atelier.css` is the final override, so changing earlier CSS without inspecting the cascade may have no visible effect. If consolidating, make it a dedicated refactor with regression checks.
3. Preserve motion accessibility; test with reduced motion, keyboard navigation, and lower-end mobile devices. Avoid introducing UI that depends on continuous motion to convey essential information.
4. `npm run check`, desktop/mobile Playwright, automated accessibility, and `/portfolio/` smoke tests are CI-covered. Real Safari/Firefox, screen readers, and hands-on cross-device visual review should still be performed.
5. The public site has been deployed according to GitHub Actions, but visual quality remains a user-facing judgment and may require further iteration.
6. Never commit credentials, fabricate professional qualifications, or mark unfinished projects/certificates as completed.

**State at this update:** repository on `main`; latest source baseline `c7cd492...` successfully tested and deployed, with this `PROGRESS.md` update being a subsequent documentation-only commit.
