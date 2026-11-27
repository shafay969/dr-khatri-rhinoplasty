// No recipient, spreadsheet ID or credentials belong in browser code.
export function validateRequest(body) {
  if (!body || typeof body !== 'object' || body.website || body.consent !== true) return false;
  if (typeof body.requestId !== 'string' || !/^[a-f0-9-]{36}$/i.test(body.requestId)) return false;
  if (typeof body.name !== 'string' || body.name.trim().length < 2 || body.name.length > 100 || /[\x00-\x1f]/.test(body.name)) return false;
  if (typeof body.phone !== 'string' || !/^[+\d ()-]{7,24}$/.test(body.phone) || body.phone.replace(/\D/g,'').length < 7) return false;
  if (typeof body.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(body.date)) return false;
  const date=new Date(body.date+'T12:00:00Z');
  if (isNaN(date.getTime()) || date.toISOString().slice(0,10)!==body.date) return false;
  const today=new Date(Date.now()+5*3600000).toISOString().slice(0,10);
  const latest=new Date(Date.now()+180*86400000).toISOString().slice(0,10);
  return body.date>=today && body.date<=latest && typeof body.time==='string' && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(body.time);
}
export async function handler(event) {
  const reply=(statusCode,data)=>({statusCode,headers:{'Content-Type':'application/json','Cache-Control':'no-store'},body:JSON.stringify(data)});
  if (event.httpMethod!=='POST') return reply(405,{error:'Method not allowed'});
  if (process.env.BOOKING_ENABLED!=='true') return reply(503,{error:'Appointment requests are not enabled'});
  const origin=event.headers?.origin;
  if (origin!==process.env.BOOKING_SITE_ORIGIN) return reply(403,{error:'Request not allowed'});
  if (!event.headers?.['content-type']?.startsWith('application/json') || event.isBase64Encoded || (event.body||'').length>4096) return reply(400,{error:'Invalid request'});
  let input;try {input=JSON.parse(event.body);} catch {return reply(400,{error:'Invalid request'});}
  if (!validateRequest(input)) return reply(400,{error:'Check the name, phone, preferred date and time'});
  const url=process.env.BOOKING_APPS_SCRIPT_URL,secret=process.env.BOOKING_SHARED_SECRET;
  if (!url || !/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(url) || !secret || secret.length<32) return reply(503,{error:'Appointment requests are not configured'});
  try {
    const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret,requestId:input.requestId,name:input.name.trim(),phone:input.phone,date:input.date,time:input.time,consent:true}),signal:AbortSignal.timeout(15000)});
    const text=await response.text();if(text.length>2048) throw new Error('Invalid response');const result=JSON.parse(text);
    if (!response.ok || result.status!=='received' || result.requestId!==input.requestId) throw new Error('Unconfirmed');
    return reply(200,{status:'received',requestId:input.requestId});
  } catch {return reply(503,{error:'Receipt could not be confirmed. Contact the team before resubmitting.'});}
}
