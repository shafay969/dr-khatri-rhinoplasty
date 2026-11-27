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
 await p.unroute('**/gallery/*');
 await p.goto(base+'/booking');await p.locator('#root[data-app-ready=true]').waitFor();
 await p.locator('#appointment-name').fill('Aleksandra Wiśniewska-Kowalczyk');
 await p.locator('#appointment-phone').fill('+000 000 000 000');
 await p.setViewportSize({width:768,height:900});await p.addStyleTag({content:'html{font-size:32px}'});
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Large text overflow');
 await p.goto(base+'/');await p.locator('#root[data-app-ready=true]').waitFor();
 assert.equal(await p.locator('.home-hero').evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.effect?.getTiming().iterations===Infinity).length),0);
 assert.equal(await p.locator('#floating-whatsapp-btn').evaluate(el=>el.getAnimations({subtree:true}).length),0);
 await p.setViewportSize({width:1440,height:1000});
 await p.evaluate(()=>document.fonts.ready);
 assert.ok(await p.locator('h1').evaluate(el=>getComputedStyle(el).fontFamily.includes('DM Serif Display')));
 assert.ok(await p.locator('body').evaluate(el=>getComputedStyle(el).fontFamily.includes('DM Sans')));
 // Exercise navigation from the motion-free homepage into an animated lazy route.
 await p.getByRole('navigation',{name:'Main navigation',exact:true}).getByRole('link',{name:'Gallery',exact:true}).click();
 await p.getByRole('slider').first().waitFor();
 const dragSlider=p.getByRole('slider').first();
 await dragSlider.scrollIntoViewIfNeeded();
 const handle=await dragSlider.boundingBox(),container=await dragSlider.locator('..').boundingBox();
 await p.mouse.move(handle.x+handle.width/2,handle.y+handle.height/2);await p.mouse.down();
 await p.mouse.move(container.x+container.width*.8,container.y+container.height/2,{steps:4});await p.mouse.up();
 assert.ok(Number(await dragSlider.getAttribute('aria-valuenow'))>=75,'Pointer drag survives animation-engine split');
 await p.getByRole('navigation',{name:'Main navigation',exact:true}).getByRole('link',{name:'FAQs',exact:true}).click();
 await p.locator('main h1').waitFor();
 await p.goto(base+'/blog/questions-to-ask-before-rhinoplasty-consultation');
 await p.locator('#root[data-app-ready=true]').waitFor();
 assert.equal(await p.locator('main h1').evaluate(el=>getComputedStyle(el).opacity),'1','Article title must not wait for an entrance animation');
 assert.equal(await p.locator('article p').first().evaluate(el=>getComputedStyle(el).opacity),'1','Article text is immediately readable');
 // Missing fonts must leave readable fallback text and usable layout.
 const fallback=await browser.newContext({viewport:{width:320,height:844}});
 await fallback.route('**/*',r=>new URL(r.request().url()).origin!==base || r.request().url().includes('/fonts/') ? r.abort() : r.continue());
 const fp=await fallback.newPage();await fp.goto(base+'/');await fp.locator('#root[data-app-ready=true]').waitFor();
 assert.ok((await fp.locator('main h1').innerText()).includes('Your Natural Nose'));
 assert.equal(await fp.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await fallback.close();
 const template=await readFile(new URL('../index.html',import.meta.url),'utf8');assert.equal(template.includes('fonts.googleapis.com'),false);
 for(const file of ['dm-sans-latin.woff2','dm-serif-display-latin.woff2'])assert.equal((await p.request.get(base+'/fonts/'+file)).status(),200);
 console.log('PASS: responsive routes, skip link, keyboard/escape/inert navigation, gallery keyboard/error fallback, long names, large text, reduced motion and local fonts.');
}finally {await browser.close();await new Promise(resolve=>server.httpServer.close(resolve));}
