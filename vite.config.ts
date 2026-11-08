import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { portfolio } from './src/content/portfolio.ts'

function metadata(siteUrl: string): Plugin {
  const canonical = `${siteUrl.replace(/\/$/, '')}/`
  return {
    name: 'portfolio-metadata',
    transformIndexHtml() {
      return [
        { tag: 'title', children: portfolio.seo.title },
        { tag: 'meta', attrs: { name: 'description', content: portfolio.seo.description } },
        { tag: 'meta', attrs: { name: 'author', content: portfolio.name } },
        { tag: 'link', attrs: { rel: 'canonical', href: canonical } },
        ...Object.entries({
          'og:type': 'website', 'og:locale': 'en_US', 'og:site_name': portfolio.name,
          'og:title': portfolio.seo.title, 'og:description': portfolio.seo.description,
          'og:url': canonical, 'og:image': `${canonical}og-image.png`,
          'og:image:width': '1200', 'og:image:height': '630',
          'og:image:alt': `${portfolio.name} — ${portfolio.headline}`,
        }).map(([property, content]) => ({ tag: 'meta', attrs: { property, content } })),
        ...Object.entries({
          'twitter:card': 'summary_large_image', 'twitter:title': portfolio.seo.title,
          'twitter:description': portfolio.seo.description, 'twitter:image': `${canonical}og-image.png`,
          'twitter:image:alt': `${portfolio.name} — ${portfolio.headline}`,
        }).map(([name, content]) => ({ tag: 'meta', attrs: { name, content } })),
      ]
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\nSitemap: ${canonical}sitemap.xml\n` })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${canonical}</loc></url></urlset>\n` })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const base = env.VITE_BASE_PATH ? `/${env.VITE_BASE_PATH.replace(/^\/+|\/+$/g, '')}/`.replace('//', '/') : '/'
  const siteUrl = env.VITE_SITE_URL || portfolio.siteUrl
  // These are public deployment settings, never secrets.
  if (!/^https:\/\/[a-zA-Z0-9.-]+(?::\d+)?(?:\/[a-zA-Z0-9._/-]*)?$/.test(siteUrl)) {
    throw new Error('VITE_SITE_URL must be an absolute HTTPS site URL without a query or fragment.')
  }
  return {
    base,
    plugins: [react(), tailwindcss(), metadata(siteUrl)],
    build: { target: 'es2022' },
  }
})
