/* global document */
import { chromium } from '@playwright/test'
import { readFile } from 'node:fs/promises'
import { portfolio } from '../src/content/portfolio.ts'

const escape = (text) =>
  text.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character],
  )
const font = (
  await readFile(
    new URL(
      '../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',
      import.meta.url,
    ),
  )
).toString('base64')
// Reuse the same local security artwork as the live hero.
const securityArtwork = await readFile(
  new URL('../src/assets/security-network.svg', import.meta.url),
  'utf8',
)
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
})
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  })
  await page.setContent(`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Portfolio social image</title><style>
  @font-face{font-family:Manrope;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:200 800}
  *{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#080c14;color:#f8fafc;font-family:Manrope,sans-serif;padding:54px 70px;position:relative;overflow:hidden;isolation:isolate}
  .label{display:flex;gap:11px;align-items:center;font-size:11px;letter-spacing:2px;color:#38bdf8;margin:0 0 37px;font-weight:700}.label:before{content:'';width:8px;height:8px;border-radius:50%;background:#00d4ff;box-shadow:0 0 12px #00d4ff}
  .name{font-size:74px;line-height:1.05;letter-spacing:-3.5px;margin:0;font-weight:750;width:590px;position:relative;z-index:1}.first{display:block;font-size:30px;color:#38bdf8;font-weight:600;letter-spacing:3px;margin-bottom:14px;text-transform:uppercase}.last{display:block;max-width:540px;color:#f8fafc}.role{font-size:19px;color:#94a3b8;margin-top:24px;letter-spacing:-.3px;font-weight:500}
  .art-panel{position:absolute;right:60px;top:62px;width:450px;height:450px;border:1px solid rgba(56,189,248,0.25);border-radius:30px;background:radial-gradient(ellipse at 50% 45%,#111a2e,#090d16 75%);box-shadow:0 30px 70px rgba(0,0,0,0.8),0 0 40px rgba(0,212,255,0.15);z-index:-1;overflow:hidden}
  .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(56,189,248,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.08) 1px,transparent 1px);background-size:30px 30px;mask-image:radial-gradient(ellipse,black,transparent 75%)}
  .art{position:absolute;inset:0}svg{width:100%;height:100%}.art-note{position:absolute;bottom:26px;left:0;right:0;text-align:center;color:#38bdf8;letter-spacing:2.5px;font-size:10px;font-weight:700}
  .footer{position:absolute;bottom:36px;left:70px;right:70px;border-top:1px solid rgba(148,163,184,0.15);padding-top:20px;display:flex;justify-content:space-between;font-size:11px;color:#94a3b8;letter-spacing:1.5px}.footer strong{font-weight:700;color:#00d4ff}
  </style></head><body><p class="label">PORTFOLIO // CYBER DEFENSE</p><h1 class="name"><span class="first">${escape(portfolio.firstName)}</span><span class="last">${escape(portfolio.displayName)}</span></h1><p class="role">${escape(portfolio.headline)}</p><div class="art-panel"><div class="grid"></div><div class="art">${securityArtwork}</div><div class="art-note">SECURITY · SYSTEMS · CODE</div></div><div class="footer"><span>CURIOUS ABOUT TECHNOLOGY. THOUGHTFUL ABOUT SECURITY.</span><strong>${escape(portfolio.githubHandle)}</strong></div></body></html>`)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: new URL('../public/og-image.png', import.meta.url).pathname })
  console.log('Generated public/og-image.png (1200 × 630).')
} finally {
  await browser.close()
}
