// UI regression checks; all network requests stay on localhost. No appointments are submitted.
import assert from 'node:assert/strict';
import {preview} from 'vite';
import {chromium} from 'playwright';
import {readFile} from 'node:fs/promises';
const server=await preview({preview:{host:'127.0.0.1',port:4180,strictPort:true}});
const browser=await chromium.launch();const base='http://127.0.0.1:4180';
try {
 const context=await browser.newContext({reducedMotion:'reduce'});
 await context.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.abort());
 const p=await context.newPage();
 for(const width of [320,390,768,1440]) {
  await p.setViewportSize({width,height:900});
  for(const path of ['/','/booking','/rhinoplasty','/gallery','/blog/questions-to-ask-before-rhinoplasty-consultation']) {
   await p.goto(base+path);await p.locator('#root[data-app-ready=true]').waitFor();
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${width} ${path} overflow`);
   assert.equal(await p.locator('main h1').count(),1);
  }
 }
 await p.setViewportSize({width:390,height:844});await p.goto(base+'/');
 await p.keyboard.press('Tab');assert.equal(await p.locator('.skip-link').evaluate(el=>el===document.activeElement),true);
 await p.keyboard.press('Enter');assert.equal(await p.locator('#main-content').evaluate(el=>el===document.activeElement),true);
 await p.locator('#mobile-menu-toggle').click();assert.equal(await p.locator('main').evaluate(el=>el.inert),true);
 assert.equal(await p.evaluate(()=>document.body.style.overflow),'hidden');
 for(let i=0;i<14;i++){await p.keyboard.press('Tab');assert.equal(await p.evaluate(()=>document.activeElement.closest('#mobile-navigation')!==null || document.activeElement.id==='mobile-menu-toggle'),true);}
 await p.keyboard.press('Escape');assert.equal(await p.locator('#mobile-menu-toggle').getAttribute('aria-expanded'),'false');
 assert.equal(await p.locator('main').evaluate(el=>el.inert),false);assert.equal(await p.locator('#mobile-menu-toggle').evaluate(el=>el===document.activeElement),true);
 await p.goto(base+'/gallery');await p.locator('#root[data-app-ready=true]').waitFor();
 const slider=p.getByRole('slider').first();await slider.focus();const before=Number(await slider.getAttribute('aria-valuenow'));await p.keyboard.press('ArrowRight');assert.equal(Number(await slider.getAttribute('aria-valuenow')),before+5);await p.keyboard.press('Home');assert.equal(await slider.getAttribute('aria-valuenow'),'2');
 await p.route('**/gallery/*',r=>r.fulfill({status:404,body:''}));await p.reload();await p.locator('#root[data-app-ready=true]').waitFor();await p.locator('main img').first().scrollIntoViewIfNeeded();await p.getByText('Comparison images are unavailable.',{exact:true}).first().waitFor();
 await p.goto(base+'/booking');await p.locator('#root[data-app-ready=true]').waitFor();
 await p.locator('#appointment-name').fill('Aleksandra Wiśniewska-Kowalczyk');
 await p.locator('#appointment-phone').fill('+000 000 000 000');
 await p.setViewportSize({width:768,height:900});await p.addStyleTag({content:'html{font-size:32px}'});
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Large text overflow');
 await p.goto(base+'/');await p.locator('#root[data-app-ready=true]').waitFor();
 assert.equal(await p.locator('.home-hero').evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.effect?.getTiming().iterations===Infinity).length),0);
 assert.equal(await p.locator('#floating-whatsapp-btn').evaluate(el=>el.getAnimations({subtree:true}).length),0);
 const template=await readFile(new URL('../index.html',import.meta.url),'utf8');assert.equal(template.includes('fonts.googleapis.com'),false);
 for(const file of ['inter-latin.woff2','playfair-display-latin.woff2'])assert.equal((await p.request.get(base+'/fonts/'+file)).status(),200);
 console.log('PASS: responsive routes, skip link, keyboard/escape/inert navigation, gallery keyboard/error fallback, long names, large text, reduced motion and local fonts.');
}finally {await browser.close();await new Promise(resolve=>server.httpServer.close(resolve));}
