import test from 'node:test';
import assert from 'node:assert/strict';
import {handler,validateRequest} from '../netlify/functions/appointment-request.mjs';
const valid={requestId:'12345678-1234-1234-1234-123456789abc',name:'Demo Patient',phone:'+920000000000',date:new Date(Date.now()+86400000).toISOString().slice(0,10),time:'18:30',consent:true,website:''};
test('valid request and invalid data boundaries',()=>{assert.equal(validateRequest(valid),true);for (const bad of [{consent:false},{website:'bot'},{phone:'abcdefg'},{date:'2026-02-30'},{time:'99:99'},{name:'Demo\nHeader'},{requestId:'bad'}]) assert.equal(validateRequest({...valid,...bad}),false);});
test('disabled endpoint never forwards data',async()=>{const previous=process.env.BOOKING_ENABLED;delete process.env.BOOKING_ENABLED;try {const r=await handler({httpMethod:'POST',body:JSON.stringify(valid)});assert.equal(r.statusCode,503);}finally{if(previous===undefined)delete process.env.BOOKING_ENABLED;else process.env.BOOKING_ENABLED=previous;}});
test('non POST rejected',async()=>assert.equal((await handler({httpMethod:'GET'})).statusCode,405));
test('configured forwarding keeps the shared secret server-side and verifies receipt',async()=>{
 const keys=['BOOKING_ENABLED','BOOKING_SITE_ORIGIN','BOOKING_APPS_SCRIPT_URL','BOOKING_SHARED_SECRET'];const prior=Object.fromEntries(keys.map(k=>[k,process.env[k]]));const originalFetch=globalThis.fetch;
 Object.assign(process.env,{BOOKING_ENABLED:'true',BOOKING_SITE_ORIGIN:'https://example.test',BOOKING_APPS_SCRIPT_URL:'https://script.google.com/macros/s/TEST/exec',BOOKING_SHARED_SECRET:'a'.repeat(32)});
 let calls=0;globalThis.fetch=async(url,options)=>{calls++;const sent=JSON.parse(options.body);assert.equal(sent.secret,'a'.repeat(32));assert.equal(sent.name,'Demo Patient');return {ok:true,text:async()=>JSON.stringify({status:'received',requestId:valid.requestId})};};
 try{
  const event={httpMethod:'POST',headers:{origin:'https://example.test','content-type':'application/json'},body:JSON.stringify(valid)};
  assert.equal((await handler({...event,headers:{...event.headers,origin:'https://other.test'}})).statusCode,403);assert.equal(calls,0);
  const response=await handler(event);assert.equal(response.statusCode,200);assert.equal(calls,1);assert.equal(response.body.includes('secret'),false);
  globalThis.fetch=async()=>({ok:true,text:async()=>JSON.stringify({status:'received',requestId:'wrong-id'})});assert.equal((await handler(event)).statusCode,503);
 }finally{globalThis.fetch=originalFetch;for(const k of keys){if(prior[k]===undefined)delete process.env[k];else process.env[k]=prior[k];}}
});
