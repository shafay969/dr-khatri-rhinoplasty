// Build-time static prerendering.
//
// Runs *after* `vite build`. Serves the already-built dist/ with `vite
// preview`, visits every known route in a real headless browser, and
// writes the fully-rendered HTML (with react-helmet-async's per-route
// title/description/OG/canonical/JSON-LD already baked in) to a static
// index.html per route. This is NOT user-agent-based "dynamic rendering"
// (which Google discourages) — every visitor and every crawler gets the
// exact same static file. It only supplements, never replaces, the
// existing client-side app: the prerendered HTML still loads the same JS
// bundle and hydrates into the normal interactive SPA.
//
// Adding a route: add it to STATIC_ROUTES below, or it's picked up
// automatically if it's a blog post (see BLOG_ROUTES).

import { chromium } from 'playwright';
import { preview } from 'vite';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { blogPosts } from '../src/data/blog.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');
const PORT = 4173;

const STATIC_ROUTES = [
  '/',
  '/about',
  '/rhinoplasty',
  '/gallery',
  '/testimonials',
  '/blog',
  '/faq',
  '/booking',
  '/contact',
];
const BLOG_ROUTES = blogPosts.map((post) => `/blog/${post.slug}`);
const ROUTES = [...STATIC_ROUTES, ...BLOG_ROUTES];

async function main() {
  const server = await preview({ preview: { port: PORT, strictPort: true } });
  const baseUrl = `http://localhost:${PORT}`;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const route of ROUTES) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
    // Let framer-motion's mount animations settle so prerendered HTML
    // reflects the final, visible state rather than an opacity:0 frame.
    await page.waitForTimeout(400);
    const html = await page.content();

    const outDir = route === '/' ? DIST_DIR : join(DIST_DIR, route);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html);
    console.log(`prerendered ${route}`);
  }

  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
