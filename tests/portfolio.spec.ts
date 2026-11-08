import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { portfolio, type Certification } from '../src/content/portfolio'

test('renders the real identity and truthful learning states without broken assets', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`)
  })
  await page.goto('/')
  await expect(page).toHaveTitle(portfolio.seo.title)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(portfolio.name)
  await expect(page.getByText(portfolio.headline, { exact: true })).toBeVisible()
  await expect(
    page.getByRole('heading', { name: portfolio.education.degree, exact: true }),
  ).toBeVisible()
  for (const certification of portfolio.certifications) {
    await expect(
      page
        .locator('.certificate')
        .filter({ has: page.getByRole('heading', { name: certification.name, exact: true }) })
        .getByText(certification.status, { exact: true }),
    ).toBeVisible()
  }
  if (!portfolio.linkedin)
    await expect(
      page.getByText(portfolio.contact.linkedinPlaceholder, { exact: true }),
    ).toBeVisible()
  await expect(page.locator('.project-card')).toHaveCount(portfolio.projects.length)
  if (!portfolio.projects.length) await expect(page.locator('.projects-empty')).toBeVisible()
  await page.evaluate(() => document.fonts.ready)
  expect(errors).toEqual([])
})

test('keeps navigation, email and social links valid', async ({ page }) => {
  await page.goto('/')
  const externalUrls = new Set(
    [
      portfolio.github,
      portfolio.linkedin,
      ...portfolio.projects.flatMap((project) => [project.demoUrl, project.repositoryUrl]),
      ...portfolio.certifications.map(
        (certification: Certification) => certification.verificationUrl,
      ),
    ].filter(Boolean),
  )
  const links = await page.locator('a').evaluateAll((anchors) =>
    anchors.map((element) => {
      const anchor = element as HTMLAnchorElement
      return {
        href: anchor.getAttribute('href') || '',
        target: anchor.target,
        rel: anchor.rel,
        targetExists: !anchor.hash || !!document.getElementById(anchor.hash.slice(1)),
      }
    }),
  )
  for (const link of links) {
    expect(link.href).not.toBe('#')
    expect(link.href).not.toBe('')
    expect(link.targetExists).toBe(true)
    if (link.href.startsWith('https://')) {
      expect(externalUrls.has(link.href)).toBe(true)
      expect(link.target).toBe('_blank')
      expect(link.rel).toContain('noopener')
    }
    if (link.href.startsWith('mailto:')) expect(link.href).toBe(`mailto:${portfolio.email}`)
  }
  if (!portfolio.linkedin) await expect(page.locator('a[href*="linkedin.com"]')).toHaveCount(0)
  await page.goto('/#projects')
  await page.reload()
  await expect(page.locator('#projects')).toBeInViewport()
  await page.getByRole('link', { name: 'Back to top', exact: true }).click()
  await expect(page).toHaveURL(/#home$/)
  await expect(page.locator('#home')).toBeFocused()
})

test('supports keyboard skip navigation and responsive menu behavior', async ({
  page,
  isMobile,
}) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  if (isMobile) {
    const open = page.getByRole('button', { name: 'Open menu' })
    await open.focus()
    await page.keyboard.press('Enter')
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(open).toBeFocused()
    await expect(open).toHaveAttribute('aria-expanded', 'false')
    await open.click()
    await page
      .getByRole('navigation', { name: 'Mobile navigation' })
      .getByRole('link', { name: 'Skills' })
      .click()
    await expect(open).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('#skills')).toBeFocused()
  } else {
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeHidden()
    await page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Skills' })
      .click()
  }
  await expect(page).toHaveURL(/#skills$/)
  const box = await page.locator('#skills').boundingBox()
  const header = await page.locator('header').boundingBox()
  expect(box!.y).toBeGreaterThanOrEqual(header!.height)
})

test('skill cards disclose useful details by keyboard', async ({ page }) => {
  await page.goto('/#skills')
  await expect(page.locator('.skill-card')).toHaveCount(7)
  const card = page
    .locator('.skill-card')
    .filter({ has: page.getByRole('heading', { name: 'Linux', exact: true }) })
  const summary = card.locator('summary')
  await summary.focus()
  await page.keyboard.press('Enter')
  await expect(card).toHaveAttribute('open', '')
  await expect(card.locator('.skill-description')).toBeVisible()
  const cardBounds = await card.boundingBox()
  const descriptionBounds = await card.locator('.skill-description').boundingBox()
  expect(descriptionBounds!.y + descriptionBounds!.height).toBeLessThanOrEqual(
    cardBounds!.y + cardBounds!.height,
  )
  await page.keyboard.press('Space')
  await expect(card).not.toHaveAttribute('open')
  await expect(card.locator('.skill-description')).toBeHidden()
})

test('copies the real email and announces success', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/#contact')
  await page.getByRole('button', { name: 'Copy email' }).click()
  await expect(page.getByRole('status')).toHaveText('Email address copied to clipboard.')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(portfolio.email)
})

test('offers a selected manual-copy field when clipboard access fails', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.reject(new DOMException('Denied', 'NotAllowedError')) },
    })
  })
  await page.goto('/#contact')
  await page.getByRole('button', { name: 'Copy email' }).click()
  const input = page.getByLabel('Select and copy this address:')
  await expect(input).toBeFocused()
  await expect(input).toHaveValue(portfolio.email)
  expect(
    await input.evaluate(
      (element: HTMLInputElement) => element.selectionEnd! - element.selectionStart!,
    ),
  ).toBe(portfolio.email.length)
})

test('respects reduced motion without hiding content', async ({ page }) => {
  await page.goto('/')
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  )
  for (const section of await page.locator('main > section').all()) {
    await section.scrollIntoViewIfNeeded()
    await expect(section.getByRole('heading').first()).toBeVisible()
  }
  expect(
    await page.evaluate(
      () =>
        document.getAnimations().filter((animation) => animation.playState === 'running').length,
    ),
  ).toBe(0)
})

test('has no horizontal overflow at narrow, tablet and desktop widths', async ({ page }) => {
  await page.goto('/')
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      `overflow at ${width}px`,
    ).toBe(true)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  }
})

test('serves canonical metadata and real social/crawler assets', async ({ page, request }) => {
  await page.goto('/')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    `${portfolio.siteUrl}/`,
  )
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    `${portfolio.siteUrl}/og-image.png`,
  )
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    portfolio.seo.description,
  )
  for (const asset of ['/og-image.png', '/favicon.svg', '/robots.txt', '/sitemap.xml']) {
    const response = await request.get(asset)
    expect(response.status(), asset).toBe(200)
    if (asset === '/og-image.png') expect(response.headers()['content-type']).toContain('image/png')
  }
  expect(await (await request.get('/robots.txt')).text()).toContain(
    `${portfolio.siteUrl}/sitemap.xml`,
  )
})

test('passes automated WCAG A/AA accessibility checks', async ({ page, isMobile }) => {
  await page.goto('/')
  for (const section of await page.locator('main > section').all())
    await section.scrollIntoViewIfNeeded()
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze()
  expect(results.violations).toEqual([])
  if (isMobile) {
    await page.getByRole('button', { name: 'Open menu' }).click()
    const menuResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze()
    expect(menuResults.violations).toEqual([])
  }
})

test('reveals sections with normal motion enabled', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  for (const section of await page.locator('main > section').all()) {
    await section.scrollIntoViewIfNeeded()
    await expect(
      section
        .locator(':scope > div')
        .filter({ has: page.getByRole('heading') })
        .first(),
    ).toHaveCSS('opacity', '1')
  }
})

test('provides useful contact information without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:4173/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(portfolio.name)
  await expect(page.getByRole('link', { name: `email ${portfolio.email}` })).toHaveAttribute(
    'href',
    `mailto:${portfolio.email}`,
  )
  await context.close()
})

test('kinetic effects remain decorative and respect reduced-motion preferences', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.motion-ticker')).toHaveAttribute('aria-hidden', 'true')
  await expect(page.locator('.scroll-progress')).toHaveAttribute('aria-hidden', 'true')
  await expect(page.locator('.art-spark')).toHaveCount(8)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  expect(
    await page.locator('.motion-ticker-track').evaluate((element) =>
      getComputedStyle(element).animationName,
    ),
  ).toBe('none')
})
