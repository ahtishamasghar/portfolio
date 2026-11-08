import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { portfolio } from './src/content/portfolio.ts'

function metadata(siteUrl: string): Plugin {
  const canonical = `${siteUrl.replace(/\/$/, '')}/`
  const escape = (value: string) =>
    value.replace(
      /[&<>"']/g,
      (character) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        })[character]!,
    )
  return {
    name: 'portfolio-metadata',
    transformIndexHtml(html) {
      const fallback = `<main style="max-width:48rem;margin:4rem auto;padding:1rem;font-family:system-ui"><h1>${escape(portfolio.name)}</h1><p>${escape(portfolio.headline)}</p><p>${escape(portfolio.education.degree)} at ${escape(portfolio.education.institution)} — ${escape(portfolio.education.status)}.</p><p>This interactive portfolio needs JavaScript. You can still <a href="mailto:${escape(portfolio.email)}">email ${escape(portfolio.email)}</a> or visit <a href="${escape(portfolio.github)}">my GitHub profile</a>.</p></main>`
      return {
        html: html.replace('__PORTFOLIO_NOSCRIPT__', fallback),
        tags: [
          { tag: 'title', children: portfolio.seo.title },
          { tag: 'meta', attrs: { name: 'description', content: portfolio.seo.description } },
          { tag: 'meta', attrs: { name: 'author', content: portfolio.name } },
          { tag: 'link', attrs: { rel: 'canonical', href: canonical } },
          ...Object.entries({
            'og:type': 'website',
            'og:locale': 'en_US',
            'og:site_name': portfolio.name,
            'og:title': portfolio.seo.title,
            'og:description': portfolio.seo.description,
            'og:url': canonical,
            'og:image': `${canonical}og-image.png`,
            'og:image:width': '1200',
            'og:image:height': '630',
            'og:image:alt': `${portfolio.name} — ${portfolio.headline}`,
          }).map(([property, content]) => ({ tag: 'meta', attrs: { property, content } })),
          ...Object.entries({
            'twitter:card': 'summary_large_image',
            'twitter:title': portfolio.seo.title,
            'twitter:description': portfolio.seo.description,
            'twitter:image': `${canonical}og-image.png`,
            'twitter:image:alt': `${portfolio.name} — ${portfolio.headline}`,
          }).map(([name, content]) => ({ tag: 'meta', attrs: { name, content } })),
        ],
      }
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\nSitemap: ${canonical}sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${canonical}</loc></url></urlset>\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const base = env.VITE_BASE_PATH
    ? `/${env.VITE_BASE_PATH.replace(/^\/+|\/+$/g, '')}/`.replace('//', '/')
    : '/'
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
