import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { chromium } from '@playwright/test'

const site = 'https://ahtishamasghar.github.io/portfolio'
const origin = 'http://127.0.0.1:4174'
const base = `${origin}/portfolio/`
const server = spawn(
  process.execPath,
  ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4174', '--strictPort'],
  {
    env: { ...process.env, VITE_BASE_PATH: '/portfolio/', VITE_SITE_URL: site },
    stdio: 'inherit',
  },
)

let browser
try {
  let ready = false
  for (let attempt = 0; attempt < 60; attempt++) {
    if (server.exitCode !== null) throw new Error('Preview server exited before becoming ready')
    try {
      const response = await fetch(base)
      if (response.ok) {
        ready = true
        break
      }
    } catch {
      // The preview server may still be starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  assert.ok(ready, 'The /portfolio/ preview endpoint never became ready')

  browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('response', (response) => {
    if (response.url().startsWith(origin) && response.status() >= 400) {
      errors.push(`${response.status()} ${response.url()}`)
    }
  })

  const response = await page.goto(base, { waitUntil: 'networkidle' })
  assert.equal(response?.status(), 200)
  assert.equal((await page.locator('h1').innerText()).replace(/\s+/g, ' ').trim(), 'Muhammad Ahtisham Asghar')
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `${site}/`)
  assert.equal(await page.locator('meta[property="og:image"]').getAttribute('content'), `${site}/og-image.png`)

  const assets = await page.locator('script[src], link[rel="stylesheet"][href], link[rel="icon"][href]').evaluateAll(
    (nodes) => nodes.map((node) => node.getAttribute('src') || node.getAttribute('href')),
  )
  assert.ok(assets.some((value) => value?.startsWith('/portfolio/assets/')), 'Missing base-prefixed bundle')
  assert.ok(assets.every((value) => value?.startsWith('/portfolio/')), 'Root-relative asset escapes /portfolio/')

  for (const resource of ['favicon.svg', 'og-image.png', 'robots.txt', 'sitemap.xml']) {
    const result = await page.request.get(`${base}${resource}`)
    assert.equal(result.status(), 200, `Missing ${resource}`)
    if (resource === 'robots.txt' || resource === 'sitemap.xml') {
      assert.ok((await result.text()).includes(site), `Wrong ${resource} site URL`)
    }
  }

  await page.locator('nav[aria-label="Main navigation"] a[href="#skills"]').click()
  await page.waitForURL('**/portfolio/#skills')
  assert.equal(new URL(page.url()).pathname, '/portfolio/')
  assert.deepEqual(errors, [], 'Browser errors or failed requests')
  console.log('PASS: /portfolio/ browser smoke test, asset URLs, metadata, and navigation')
} finally {
  await browser?.close()
  server.kill('SIGTERM')
}
