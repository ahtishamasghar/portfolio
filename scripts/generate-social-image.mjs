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
// Static vector counterpart to the live procedural sculpture.
const point = (u, v) => {
  const radius = 1.25 + 0.48 * Math.cos(v)
  const x = radius * Math.cos(u),
    y = radius * Math.sin(u),
    z = 0.48 * Math.sin(v)
  const py = y * Math.cos(0.56) - z * Math.sin(0.56)
  const pz = y * Math.sin(0.56) + z * Math.cos(0.56)
  const px = x * Math.cos(-0.48) - py * Math.sin(-0.48)
  const ry = x * Math.sin(-0.48) + py * Math.cos(-0.48)
  const perspective = 4.8 / (4.8 - pz)
  return `${(260 + px * 116 * perspective).toFixed(2)},${(260 + ry * 116 * perspective).toFixed(2)}`
}
const rings = Array.from(
  { length: 34 },
  (_, ring) =>
    `<polyline points="${Array.from({ length: 101 }, (_, step) => point((step / 100) * Math.PI * 2, (ring / 34) * Math.PI * 2)).join(' ')}"/>`,
).join('')
const segments = Array.from(
  { length: 60 },
  (_, ring) =>
    `<polyline points="${Array.from({ length: 41 }, (_, step) => point((ring / 60) * Math.PI * 2, (step / 40) * Math.PI * 2)).join(' ')}"/>`,
).join('')
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
  *{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#101114;color:#f0f1f6;font-family:Manrope,sans-serif;padding:55px 70px;position:relative;overflow:hidden}.label{font-size:11px;letter-spacing:2px;color:#a7b8ed;margin-bottom:34px}.label:before{content:'';display:inline-block;width:6px;height:6px;border-radius:50%;background:#96acff;margin-right:12px}.name{font-size:76px;line-height:1.05;letter-spacing:-4px;margin:0;font-weight:600;width:590px}.first{display:block;font-size:38px;color:#a3aabc;font-weight:400;letter-spacing:-1.5px;margin-bottom:14px}.last{display:block;max-width:430px}.role{font-size:18px;color:#b4c1e5;margin-top:28px}.art{position:absolute;right:-6px;top:50px;width:590px;height:520px;background:radial-gradient(ellipse,#35468216,transparent 65%);z-index:-1}svg{width:100%;height:100%}.footer{position:absolute;bottom:37px;left:70px;right:70px;border-top:1px solid #ffffff1a;padding-top:20px;display:flex;justify-content:space-between;font-size:10px;color:#96a3c2;letter-spacing:1.5px}.content{isolation:isolate}
  </style></head><body class="content"><p class="label">CURIOSITY, WITH DIRECTION.</p><h1 class="name"><span class="first">${escape(portfolio.firstName)}</span><span class="last">${escape(portfolio.displayName)}</span></h1><p class="role">${escape(portfolio.headline)}</p><div class="art"><svg viewBox="0 0 520 520" fill="none" stroke="#829bef" stroke-width=".65" stroke-opacity=".5">${rings}${segments}</svg></div><div class="footer"><span>${escape(portfolio.name.toUpperCase())}</span><span>PERSONAL PORTFOLIO</span></div></body></html>`)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: new URL('../public/og-image.png', import.meta.url).pathname })
  console.log('Generated public/og-image.png (1200 × 630).')
} finally {
  await browser.close()
}
