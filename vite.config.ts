import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { blogPosts } from './src/data/blog'

// PLACEHOLDER — keep in sync with SITE_URL in src/components/layout/SEO.tsx
// until the real production domain is confirmed.
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

// Regenerates public/sitemap.xml from the current route list + blog data on
// every build, so it never drifts out of sync when a page or post is added.
function sitemapPlugin(): Plugin {
  return {
    name: 'generate-sitemap',
    buildStart() {
      const urls = [
        ...staticRoutes,
        ...blogPosts.map((post) => `/blog/${post.slug}`),
      ]
      const body = urls
        .map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`)
        .join('\n')
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
      writeFileSync(resolve(__dirname, 'public/sitemap.xml'), xml)
    },
  }
}

export default defineConfig({
  plugins: [react(), sitemapPlugin()],
})
