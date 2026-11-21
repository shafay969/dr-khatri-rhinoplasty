// Validate built output and real browser behavior without contacting patients.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat, readdir, mkdir } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const origin = 'https://drvijaykhatri.com';
const xml = await readFile(resolve(dist, 'sitemap.xml'), 'utf8');
const routes = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]));
assert.equal(routes.length, new Set(routes.map(String)).size);
assert.ok(routes.length >= 9);
const titles = new Set();
const descriptions = new Set();
for (const url of routes) {
  assert.equal(url.origin, origin);
  assert.equal(url.search + url.hash, '');
  const html = await readFile(url.pathname === '/' ? resolve(dist, 'index.html') : resolve(dist, `.${url.pathname}.html`), 'utf8');
  const title = html.match(/<title[^>]*>(.*?)<\/title>/s)?.[1];
  const desc = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/)?.[1];
  assert.ok(title && desc, `Missing metadata: ${url}`);
  assert.ok(!titles.has(title), `Duplicate title: ${url}`);
  assert.ok(!descriptions.has(desc), `Duplicate description: ${url}`);
  titles.add(title); descriptions.add(desc);
  assert.equal((html.match(/<title[\s>]/g) || []).length, 1, `Duplicate title tags: ${url}`);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `Heading: ${url}`);
  assert.ok(html.includes(`rel="canonical" href="${url}"`), `Canonical: ${url}`);
  assert.ok(!/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/.test(html), `Accidental noindex: ${url}`);
  assert.ok(!html.includes('Loading page…'), `Unresolved route: ${url}`);
  for (const preload of html.matchAll(/<link[^>]*rel="modulepreload"[^>]*href="([^"]+)"/g)) {
    assert.ok(preload[1].startsWith('/assets/'), `Unexpected module origin: ${url}`);
    await stat(resolve(dist, `.${preload[1]}`));
  }
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) {
    assert.ok(JSON.parse(m[1]), `Invalid JSON-LD: ${url}`);
  }
}
const errorHTML = await readFile(resolve(dist, '404.html'), 'utf8');
assert.match(errorHTML, /noindex/);
assert.match(await readFile(resolve(dist, '_redirects'), 'utf8'), /\/\* \/404\.html 404/);
assert.match(await readFile(resolve(dist, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/drvijaykhatri\.com\/sitemap\.xml/);
for (const forbidden of ['docs', '.agents', '.seo-private', 'scripts', 'AGENTS.md']) {
  assert.ok(!(await readdir(dist)).includes(forbidden), `Internal files in deployment: ${forbidden}`);
}

// This server models static file shadowing and the checked-in 404 rule; the
// actual Netlify preview must also be checked before production approval.
const server = createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = resolve(dist, `.${path}`);
    if (!file.startsWith(dist + '/') && file !== dist) { res.writeHead(403).end(); return; }
    let code = 200;
    try { if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html'); await stat(file); }
    catch {
      try { file = resolve(dist, `.${path}.html`); await stat(file); }
      catch { file = resolve(dist, '404.html'); code = 404; }
    }
    const types = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp','.xml':'application/xml'};
    res.writeHead(code, {'Content-Type': types[extname(file)] || 'application/octet-stream'});
    res.end(await readFile(file));
  } catch { res.writeHead(500).end(); }
});
await new Promise((done) => server.listen(0, '127.0.0.1', done));
const base = `http://127.0.0.1:${server.address().port}`;
let browser;
try {
  browser = await chromium.launch();
  const raw = await browser.newContext({ javaScriptEnabled: false, viewport:{width:390,height:844} });
  for (const path of ['/', '/about', '/faq', '/rhinoplasty', '/booking', '/blog/rhinoplasty-cost-in-karachi-what-drives-the-price']) {
    const page = await raw.newPage();
    await page.goto(base + path);
    assert.ok((await page.locator('main').innerText()).length > 150, `Missing static content: ${path}`);
    await page.locator('main h1').waitFor({state:'visible'});
    const hiddenHeadings = await page.locator('main h1, main h2, main h3').evaluateAll((headings) => headings.filter((heading) => {
      if (!heading.getClientRects().length) return false; // Intentional responsive display:none.
      for (let node = heading; node; node = node.parentElement) {
        const style = getComputedStyle(node);
        if (Number(style.opacity) === 0 || style.visibility === 'hidden') return true;
      }
      return false;
    }).map((heading) => heading.textContent));
    assert.deepEqual(hiddenHeadings, [], `Invisible static headings: ${path}`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, `Mobile overflow: ${path}`);
    await page.close();
  }
  const context = await browser.newContext({ viewport:{width:390,height:844}, reducedMotion:'reduce' });
  await context.route('**/*', (route) => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const url of routes) {
    assert.equal((await page.goto(base + url.pathname)).status(), 200);
    await page.locator('#root[data-app-ready="true"]').waitFor();
    await page.locator('main h1').waitFor();
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), String(url));
    const internal = await page.locator('a[href^="/"]').evaluateAll((links) => links.map((a) => new URL(a.href).pathname));
    const known = new Set(routes.map((item) => item.pathname));
    for (const link of internal) assert.ok(known.has(link) || extname(link), `Unknown internal link ${link} on ${url}`);
    for (const href of await page.locator('a[href*="wa.me"]').evaluateAll((links) => links.map((a) => a.href))) {
      const link = new URL(href);
      assert.match(link.pathname, /^\/\d+$/);
      assert.equal(link.searchParams.get('text'), "Hi, I'd like to arrange a consultation.");
    }
  }
  await page.goto(base + '/booking');
  await page.locator('#root[data-app-ready="true"]').waitFor();
  assert.equal(await page.locator('input,textarea').count(), 0, 'No sensitive appointment fields');
  assert.equal(await page.locator('#booking-call-now').getAttribute('href'), 'tel:+923332572052');
  assert.equal(await page.locator('#booking-submit-btn').getAttribute('target'), '_blank');
  assert.match(await page.locator('main').innerText(), /does not send a message or\s+confirm an appointment/);
  assert.equal(await page.locator('#newsletter-email').count(), 0);
  await page.locator('#mobile-menu-toggle').click();
  assert.equal(await page.locator('#mobile-menu-toggle').getAttribute('aria-expanded'), 'true');
  await page.locator('#mobile-navigation').getByRole('link', {name:'Contact', exact:true}).click();
  await page.locator('link[rel="canonical"][href="https://drvijaykhatri.com/contact"]').waitFor({state:'attached'});
  assert.equal(await page.locator('#mobile-menu-toggle').getAttribute('aria-expanded'), 'false');
  // Inspect destinations without navigating to WhatsApp or placing a call.
  assert.equal((await page.goto(base + '/not-a-real-page-seo-test')).status(), 404);
  await page.locator('#root[data-app-ready="true"]').waitFor();
  await page.locator('main h1').waitFor();
  assert.match(await page.locator('main h1').innerText(), /not found/i);
  assert.equal((await page.goto(base + '/blog/not-a-real-post-seo-test')).status(), 404);
  await page.locator('#root[data-app-ready="true"]').waitFor();
  await page.locator('main h1').waitFor();
  assert.match(await page.locator('main h1').innerText(), /not found/i);
  assert.deepEqual(errors, []);
  // A slow initial route chunk must leave the full static page in place.
  // This catches the measured startup fallback/footer layout-shift regression.
  const slowContext = await browser.newContext({viewport:{width:390,height:844}, reducedMotion:'reduce'});
  await slowContext.route('**/*', (route) => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
  await slowContext.route('**/assets/Booking-*.js', async (route) => {
    await new Promise((done) => setTimeout(done, 900));
    await route.continue();
  });
  const slowPage = await slowContext.newPage();
  await slowPage.goto(base + '/booking', {waitUntil:'domcontentloaded'});
  await slowPage.waitForTimeout(100);
  assert.equal(await slowPage.locator('main h1').innerText(), 'Book a Consultation');
  assert.equal(await slowPage.getByRole('status').count(), 0, 'No initial loading placeholder may replace the static page');
  const footerBefore = await slowPage.locator('footer').boundingBox();
  await slowPage.locator('#root[data-app-ready="true"]').waitFor();
  const footerAfter = await slowPage.locator('footer').boundingBox();
  assert.ok(Math.abs(footerBefore.y - footerAfter.y) < 2, 'Initial route startup must not move the footer');
  await slowContext.close();
  await mkdir(resolve(root,'.seo-private/screenshots'), {recursive:true});
  await page.goto(base + '/booking');
  await page.locator('#root[data-app-ready="true"]').waitFor();
  await page.screenshot({path:resolve(root,'.seo-private/screenshots/booking-mobile.png'),fullPage:true});
  console.log(`PASS: ${routes.length} prerendered routes, metadata, JSON-LD, crawlable links, no-JS/mobile content, private output boundaries, consultation privacy, mobile navigation, stable slow-chunk startup and 404 behavior.`);
} finally {
  await browser?.close();
  await new Promise((done) => server.close(done));
}
