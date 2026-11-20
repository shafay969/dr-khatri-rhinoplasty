import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { blogPosts } from './src/data/blog'

// Confirmed custom production domain. Keep in sync with SEO.tsx.
const SITE_URL = 'https://drvijaykhatri.com'

const staticRoutes = [
  '/',
  '/about',
  '/rhinoplasty',
  '/gallery',
  '/testimonials',
  '/blog',
  '/faq',
  '/booking',
  '/contact',
]

// Emit the sitemap into dist without rewriting source files during a build.
function sitemapPlugin(): Plugin {
  return {
    name: 'generate-sitemap',
    generateBundle() {
      const urls = [
        ...staticRoutes,
        ...blogPosts.map((post) => `/blog/${post.slug}`),
      ]
      const body = urls
        .map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`)
        .join('\n')
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
    },
  }
}

export default defineConfig({
  plugins: [react(), sitemapPlugin()],
})
