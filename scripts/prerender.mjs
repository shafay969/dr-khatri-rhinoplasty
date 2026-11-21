// Serve identical route HTML to people and crawlers. No bot detection.
import { chromium } from 'playwright';
import { preview } from 'vite';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const origin = 'https://drvijaykhatri.com';
const sitemap = await readFile(resolve(dist, 'sitemap.xml'), 'utf8');
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
  const url = new URL(match[1]);
  if (url.origin !== origin || url.search || url.hash) throw new Error('Invalid sitemap URL');
  return url.pathname;
});
if (!routes.length || new Set(routes).size !== routes.length) throw new Error('Invalid route inventory');

let server;
let browser;
try {
  server = await preview({ root, preview: { host: '127.0.0.1', port: 4173, strictPort: true } });
  browser = await chromium.launch();
  const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 1000 } });
  // Build rendering never transmits page content or patient images to third parties.
  await context.route('**/*', (route) => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
  for (const path of [...routes, '/404']) {
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`http://127.0.0.1:4173${path}`, { waitUntil: 'networkidle' });
    await page.locator('#root[data-app-ready="true"]').waitFor();
    await page.locator('main h1').waitFor();
    await page.waitForTimeout(800);
    // Complete viewport animations so content remains visible without JavaScript.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight) {
        window.scrollTo(0, y);
        await new Promise((done) => setTimeout(done, 80));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(800);
    // Some responsive variants never intersect this desktop viewport and
    // staggered FAQ reveals can outlast a scroll. Only the saved snapshot is
    // normalized; interactive visitors retain the existing motion code.
    await page.evaluate(() => {
      document.querySelectorAll('main [style]').forEach((element) => {
        if (element instanceof HTMLElement && element.style.opacity === '0' && element.textContent?.trim()) {
          element.style.opacity = '1';
          element.style.transform = 'none';
        }
      });
    });
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    if (canonical !== `${origin}${path}` || errors.length) throw new Error(`Prerender failed ${path}: ${canonical}; ${errors.join('; ')}`);
    // Discover the route's actual emitted modules during rendering. Fetching
    // them from the initial HTML removes an extra request round-trip when the
    // interactive entry point later imports the current route.
    await page.evaluate(() => {
      const present = new Set([...document.querySelectorAll('script[src], link[rel="modulepreload"]')]
        .map((element) => element.src || element.href));
      performance.getEntriesByType('resource').forEach((entry) => {
        const url = new URL(entry.name);
        if (entry.initiatorType !== 'script' || url.origin !== location.origin || !url.pathname.startsWith('/assets/') || !url.pathname.endsWith('.js') || present.has(url.href)) return;
        const link = document.createElement('link');
        link.rel = 'modulepreload';
        link.crossOrigin = '';
        link.href = url.pathname;
        document.head.appendChild(link);
        present.add(url.href);
      });
    });
    await page.evaluate(() => document.getElementById('root')?.removeAttribute('data-app-ready'));
    const html = await page.content();
    // Flat HTML leaves keep existing slashless URLs under Netlify Pretty URLs.
    // A route/index.html layout would normalize /route to /route/ instead.
    const destination = path === '/' ? resolve(dist, 'index.html') : resolve(dist, `.${path}.html`);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, html);
    console.log(`prerendered ${path}`);
    await page.close();
  }
  await writeFile(resolve(dist, '_redirects'), 'https://drvijaykhatri.netlify.app/* https://drvijaykhatri.com/:splat 301!\n/* /404.html 404\n');
  await writeFile(resolve(dist, 'build-info.json'), JSON.stringify({
    commit: /^[a-f0-9]{40}$/.test(process.env.COMMIT_REF || '') ? process.env.COMMIT_REF : null,
    builtAt: new Date().toISOString(),
  }) + '\n');
  if (['deploy-preview', 'branch-deploy'].includes(process.env.CONTEXT)) {
    await writeFile(resolve(dist, '_headers'), '/*\n  X-Robots-Tag: noindex, nofollow\n');
  }
} finally {
  await browser?.close();
  if (server) await new Promise((done, reject) => server.httpServer.close((error) => error ? reject(error) : done()));
}
