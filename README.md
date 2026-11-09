# Muhammad Ahtisham Asghar — Personal Portfolio

A complete, light-first portfolio for a **Cybersecurity & Technology Enthusiast**, built with React, TypeScript, Vite, Tailwind CSS, Motion for React, and Lucide React. The editorial design combines warm paper tones, ink typography, mint and indigo accents, and a visibly rotating wire sculpture in responsive layouts. No backend, API keys, analytics, or paid services are required.

The content accurately represents an ongoing BS in Cybersecurity at the University of Sargodha. Learning areas are not presented as professional proficiency. Google certification is in progress; Cisco completion remains unconfirmed. The projects collection is intentionally empty, and LinkedIn is an explicit, non-clickable placeholder.

**Production site:** https://ahtishamasghar.github.io/portfolio/. The existing GitHub Pages workflow is configured and has deployed previous releases. New changes are validated and deployed from `main`; see [PROGRESS.md](PROGRESS.md) for the latest verified revision and any outstanding checks.

## Local development

Use **Node.js 24 LTS** (pinned in `.nvmrc`) and npm. If you use nvm, run `nvm use` first.

```sh
npm ci
npm run dev
```

Vite prints the local development address. Stop with Ctrl+C. Dependency versions are recorded in `package-lock.json`; commit the lockfile when intentionally updating them.

To build and serve the production output:

```sh
npm run build
npm run preview
```

The production files are in `dist/`. That directory is generated and is not committed. The Vite preview server is for local verification, not production hosting.

## Commands and validation

| Command                | Purpose                                                       |
| ---------------------- | ------------------------------------------------------------- |
| `npm run dev`          | Start Vite with hot reload                                    |
| `npm run lint`         | Run ESLint; warnings fail the command                         |
| `npm run typecheck`    | Check app, configuration, and test TypeScript                 |
| `npm run build`        | Type check and create optimized production output             |
| `npm run check`        | Lint, type check, and build                                   |
| `npm run test:e2e`     | Test the existing production build in desktop/mobile Chromium |
| `npm run format`       | Format source and documentation with Prettier                 |
| `npm run format:check` | Check formatting without modifying files                      |
| `npm run social:image` | Regenerate the committed Open Graph PNG                       |

For the browser checks, install Chromium once, then build before running the suite:

```sh
npx playwright install chromium
npm run check
npm run test:e2e
```

On a Linux CI runner needing browser system libraries, use `npx playwright install --with-deps chromium`. In this cloud environment, a system Chromium is already available:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e -- --workers=2
```

Playwright starts and stops the production preview server on port 4173. Reports go to ignored `playwright-report/` and `test-results/` directories. Tests cover real rendered content, local assets, internal/external link configuration, keyboard navigation, mobile menu behavior, direct-anchor reloads, skill-card disclosure and clipping, clipboard success/failure, reduced/normal motion, responsive overflow, SEO metadata, no-JavaScript contact information, and axe accessibility checks.

Automated accessibility testing does not replace assistive-technology testing. Real Safari/Firefox, a screen reader, and public GitHub Pages behavior still need to be checked when those environments are available.

## Project structure

```text
.github/workflows/portfolio.yml  Validation and official GitHub Pages deployment
public/
  favicon.svg                   Original vector monogram
  og-image.png                  1200 × 630 social preview
  licenses/                     Locally distributed font licenses
scripts/generate-social-image.mjs
src/
  content/portfolio.ts          Identity, copy, skills, education, certificates, projects
  components/                  Sections, animation controls, and procedural sculpture
  motion/                      Shared pause/resume and reduced-motion preferences
  App.tsx                       Page composition and Motion settings
  main.tsx                      React entry point
  styles.css                    Tailwind import, font faces, and base layout
  hero-refresh.css              Editorial hero, navigation, and motion styling
  sections-refresh.css          Lower-section visual styling
  useInitialAnchor.ts           Reliable initial fragment navigation
index.html                      HTML shell; Vite inserts SEO and no-JS content
vite.config.ts                  Base path, metadata, robots.txt and sitemap.xml
playwright.config.ts            Desktop/mobile production-browser tests
tests/portfolio.spec.ts          Behavioral and accessibility checks
PROGRESS.md                     Milestones, blockers, and exact continuation steps
```

`dist/robots.txt` and `dist/sitemap.xml` are generated using the same canonical URL as the page metadata. All fonts and artwork are local; visitors do not need to contact a third-party font or image service.

## Edit your portfolio

Start with **`src/content/portfolio.ts`**. This is the source of truth for personal information, the main headline, contact links, introductory copy, skills, education, certifications, and projects.

- `name`, `firstName`, `displayName`, `shortName`, and `initials` control identity placement.
- `email`, `github`, and `githubHandle` control contact details.
- Keep `linkedin: null` until you have an actual profile URL. The UI displays “Profile link coming soon” without a fabricated link. Set it to your real `https://www.linkedin.com/...` URL to enable the link.
- `hero`, `about`, and `contact` hold personal copy.
- `skills` holds learning areas, descriptions, categories, and icon keys. Available icon keys are `terminal`, `code`, `network`, `braces`, `shield`, `database`, and `git`.
- `education` and `certifications` hold the exact public learning statuses.
- `seo` holds the title and description; `siteUrl` is the default canonical site URL.

Section titles and visual labels live in their respective `src/components` files. Layout, colors, focus indicators, and breakpoints live in `src/styles.css` and the two refresh stylesheets. Keep the contrast and reduced-motion behavior when changing the theme.

### Motion and visual styling

The base theme is in `src/styles.css`, with the current editorial styling in `src/hero-refresh.css` and `src/sections-refresh.css`. `SignalSculpture.tsx` renders the original wire sculpture in Canvas 2D without WebGL, image downloads, or additional runtime dependencies. It is capped at 24 fps and 1.5× pixel density, stops when off-screen or the tab is hidden, and responds subtly to mouse movement.

The visible **Motion on / Motion paused** control stops decorative animation and disables entrance transitions and smooth scrolling. System reduced-motion preferences take priority. The graphic is decorative and does not carry essential content. `MotionProvider` supplies the shared preference to the sculpture, reveal effects, and scroll progress.

After editing the name or headline, regenerate the social image and commit it:

```sh
npm run social:image
# Or with the cloud environment's installed browser:
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run social:image
```

The generator uses the centralized identity and the local font. No external image service is involved. Both fonts use the SIL Open Font License; copies are in `public/licenses/`.

## Add a real project

`portfolio.projects` is an empty, typed `Project[]`. While empty, the page shows an honest “Projects in Progress” panel. Add an entry only when there is actual work to describe. The layout automatically renders project cards when entries exist.

Each entry accepts:

| Field           | Required | Content                                                 |
| --------------- | -------- | ------------------------------------------------------- |
| `id`            | Yes      | Stable unique slug                                      |
| `title`         | Yes      | Actual project name                                     |
| `description`   | Yes      | What the project does and what you actually contributed |
| `status`        | Yes      | `In progress` or `Completed`                            |
| `technologies`  | Yes      | Array of technologies genuinely used                    |
| `repositoryUrl` | No       | Real public HTTPS repository URL                        |
| `demoUrl`       | No       | Real public HTTPS demo URL                              |

Omit unavailable links; buttons will not be rendered. Do not put sample or placeholder URLs into the live content. Update the projects heading/introduction in `Projects.tsx` and `portfolio.projectsIntro` if the collection later changes from work in progress to completed work. Run the checks after adding content to catch layout or link configuration errors.

## Add or update a certification

Edit the `certifications` array in `src/content/portfolio.ts`. Each `Certification` has `name`, `provider`, `status`, `description`, and an optional `verificationUrl`.

Allowed statuses are `In Progress`, `Completion status to be confirmed`, and `Completed`. Only use `Completed` when confirmed. Add a genuine `https://...` verification URL only when available; otherwise omit the field. The component creates a verification link only for a supplied URL. Do not invent identifiers, dates, credentials, or achievements.

## GitHub Pages deployment

The active repository is **`AHTISHAMASGHAR/portfolio`**, deployed as a project site at `https://ahtishamasghar.github.io/portfolio/`. The original user-site target was `AHTISHAMASGHAR/AHTISHAMASGHAR.github.io`; the configuration still supports it if the repository is renamed later.

The workflow reads the actual configured Pages URL and base path, so both repository layouts are supported. Local development uses `/`; production receives `/portfolio/` from GitHub Pages.

1. Make sure the source exists in the intended GitHub repository. For the user-site address, the repository must be named `AHTISHAMASGHAR.github.io`; you can rename the source repository in GitHub settings or transfer the reviewed code into that repository.
2. Open **Settings → Pages → Build and deployment → Source**, and choose **GitHub Actions**. Do not choose deployment from a source branch for this Vite application.
3. Review and merge the feature branch into `main`. The workflow validates every push and pull request; only a successful run on `main` is eligible to deploy. You can also manually run it on `main` from the Actions tab.
4. Check the **Validate and deploy portfolio** workflow. Its validation job runs a frozen dependency install, lint/type checks, production build, and desktop/mobile browser and accessibility tests.
5. The Pages build uses official `actions/configure-pages`, reads its `base_path` and `base_url`, then builds with the matching Vite base and canonical URL. `actions/upload-pages-artifact` uploads `dist/`, and `actions/deploy-pages` deploys that artifact to the `github-pages` environment.
6. Follow the verified deployment URL from the workflow's deployment result. Check that the homepage, styling, section links, favicon, and social image load. A pushed commit alone is not proof of deployment.

Actions are pinned to verified commit SHAs. Validation has `contents: read`; the Pages build has `contents: read` and `pages: read`; only the deployment job has `pages: write` and `id-token: write`. GitHub supplies the workflow token and OIDC identity automatically. No personal access token or repository secret is required for the workflow. Environment protection may require a repository owner to approve a deployment.

### Base paths, custom domains, and SPA behavior

This is a single-page site using fragment links such as `/#projects`. There is no client-side path router, so GitHub Pages does not need an SPA redirect workaround or a copied `404.html`. Direct section links are restored after rendering, including on mobile. If you introduce path-based routing later, prefer hash routing on GitHub Pages or explicitly implement and test a fallback.

For a manual project-site build, use both public environment variables together:

```sh
VITE_BASE_PATH=/portfolio/ VITE_SITE_URL=https://ahtishamasghar.github.io/portfolio npm run build
```

For local environment configuration, copy `.env.example` to `.env.local` and set the relevant values. `VITE_*` variables are public and must never contain secrets. For a custom domain, configure GitHub Pages and DNS first; the deployment workflow then takes the canonical origin from Pages. Do not add an invented custom domain or `CNAME` file.

## Troubleshooting

- **Blank site or missing assets:** confirm Pages uses GitHub Actions, the workflow deployed `dist/`, and the base path matches the repository. An ordinary `portfolio` project repository requires `/portfolio/`; a user-site repository uses `/`.
- **Pages configuration fails:** enable GitHub Actions as the source in Settings → Pages. `configure-pages` deliberately does not try to create or enable the site with an elevated personal token.
- **Workflow permissions or deployment approval failure:** review repository Actions permissions and the `github-pages` environment protection rules. Only `main` deploys by default.
- **Repository not found:** confirm the exact repository name and the connected account's access. Existing Git access to one repository does not imply access to another.
- **No browser executable:** run `npx playwright install chromium`, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to a compatible existing Chromium binary. CI installs the version expected by the lockfile.
- **Port 4173 already in use:** stop the conflicting preview process before tests. The runner intentionally does not reuse an unknown server.
- **Clipboard unavailable:** browsers can deny clipboard access or require HTTPS. The site exposes a focused, selectable email field and keeps the normal email link available.
- **npm cache permission error in Codex Cloud:** use `npm_config_cache=/tmp/portfolio-npm-cache npm ci`; do not change repository dependencies or disable verification to work around permissions.
- **Old social preview:** regenerate and commit `public/og-image.png`, confirm the canonical URL, and allow social platforms to refresh their cached preview.
- **Interrupted Codex session:** read `PROGRESS.md`, inspect Git history/status, and continue from the recorded next step. Do not reset, restart, or overwrite completed work.
