/* global document */
import { chromium } from '@playwright/test'
import { readFile } from 'node:fs/promises'
import { portfolio } from '../src/content/portfolio.ts'

const escape = (text) => text.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])
const font = (await readFile(new URL('../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2', import.meta.url))).toString('base64')
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined })
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  await page.setContent(`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Portfolio social image</title><style>
    @font-face{font-family:Manrope;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:200 800}
    *{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#080b12;color:#f0edf9;font-family:Manrope,sans-serif;padding:65px 80px;position:relative;overflow:hidden}
    .eyebrow{color:#b6a5df;font-size:13px;letter-spacing:3px;margin-bottom:65px}.name{font-size:67px;line-height:1.17;letter-spacing:-3px;margin:0;font-weight:650}.name span{display:block;color:#baabf3}.headline{font-size:23px;color:#aeb3ca;margin-top:30px}.foot{position:absolute;bottom:52px;left:80px;right:80px;border-top:1px solid #ffffff16;padding-top:23px;color:#9299b1;font-size:12px;letter-spacing:2px}.art{position:absolute;right:-30px;top:75px;width:400px;height:400px;border:1px solid #a99ee12b;border-radius:50%;background:radial-gradient(ellipse,#6753af30,transparent 70%)}.art:before,.art:after{content:'';position:absolute;border:1px solid #ab95ea55;inset:67px;transform:rotate(30deg);background:linear-gradient(140deg,#a293e114,#586bb708)}.art:after{transform:rotate(60deg);inset:95px}.mark{font-size:20px;position:absolute;right:80px;top:65px;color:#c5b7ff}
    </style></head><body><div class="art"></div><div class="mark">MA.</div><p class="eyebrow">CURIOSITY. TECHNOLOGY. POSSIBILITY.</p><h1 class="name">${escape(portfolio.firstName)}<span>${escape(portfolio.displayName)}</span></h1><p class="headline">${escape(portfolio.headline)}</p><div class="foot">PERSONAL PORTFOLIO &nbsp; / &nbsp; ALWAYS LEARNING</div></body></html>`)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: new URL('../public/og-image.png', import.meta.url).pathname })
  console.log('Generated public/og-image.png (1200 × 630).')
} finally { await browser.close() }
