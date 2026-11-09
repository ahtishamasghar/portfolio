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
  *{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#f8f8f6;color:#23262d;font-family:Manrope,sans-serif;padding:54px 70px;position:relative;overflow:hidden;isolation:isolate}
  .label{display:flex;gap:11px;align-items:center;font-size:11px;letter-spacing:1.7px;color:#606b7e;margin:0 0 37px}.label:before{content:'';width:7px;height:7px;border-radius:50%;background:#4566d5;box-shadow:0 0 0 5px #4566d50b}
  .name{font-size:76px;line-height:1.07;letter-spacing:-4px;margin:0;font-weight:650;width:590px;position:relative;z-index:1}.first{display:block;font-size:35px;color:#606671;font-weight:400;letter-spacing:-1px;margin-bottom:16px}.last{display:block;max-width:470px;color:#262a33}.role{font-size:18px;color:#46516a;margin-top:27px;letter-spacing:-.3px}
  .art-panel{position:absolute;right:60px;top:62px;width:450px;height:450px;border:1px solid #fff;border-radius:30px;background:radial-gradient(ellipse at 50% 45%,#ffffff,#f1f3f8 52%,#e9edf5);box-shadow:0 30px 70px #262a330b;z-index:-1;overflow:hidden}
  .grid{position:absolute;inset:0;background-image:linear-gradient(#4566d508 1px,transparent 1px),linear-gradient(90deg,#4566d508 1px,transparent 1px);background-size:30px 30px;mask-image:radial-gradient(ellipse,black,transparent 75%)}
  .art{position:absolute;inset:0}svg{width:100%;height:100%}.art-note{position:absolute;bottom:28px;left:0;right:0;text-align:center;color:#52607b;letter-spacing:2px;font-size:9px}
  .footer{position:absolute;bottom:36px;left:70px;right:70px;border-top:1px solid #23262d14;padding-top:20px;display:flex;justify-content:space-between;font-size:10px;color:#566780;letter-spacing:1.3px}.footer strong{font-weight:600;color:#4566d5}
  </style></head><body><p class="label">PERSONAL PORTFOLIO</p><h1 class="name"><span class="first">${escape(portfolio.firstName)}</span><span class="last">${escape(portfolio.displayName)}</span></h1><p class="role">${escape(portfolio.headline)}</p><div class="art-panel"><div class="grid"></div><div class="art">${securityArtwork}</div><div class="art-note">SECURITY · SYSTEMS · CODE</div></div><div class="footer"><span>CURIOUS ABOUT TECHNOLOGY. THOUGHTFUL ABOUT SECURITY.</span><strong>${escape(portfolio.githubHandle)}</strong></div></body></html>`)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: new URL('../public/og-image.png', import.meta.url).pathname })
  console.log('Generated public/og-image.png (1200 × 630).')
} finally {
  await browser.close()
}
