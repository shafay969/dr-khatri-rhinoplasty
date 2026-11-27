// Deploy only after official owner authorization. No credentials or patient data in source.
// Script properties: BOOKING_SHARED_SECRET (32+chars), BOOKING_SHEET_ID, BOOKING_NOTIFY_EMAIL.
// Destination tab: Requests. Backend shared-secret requests only; never call from browser.
function doPost(e) {
  const output = value => ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
  const props = PropertiesService.getScriptProperties();
  let data;try { if (!e.postData || e.postData.contents.length>4096) throw new Error();data=JSON.parse(e.postData.contents); } catch (_) {return output({error:'Invalid request'});}
  const secret=props.getProperty('BOOKING_SHARED_SECRET');
  if (!secret || secret.length<32 || data.secret!==secret) return output({error:'Unauthorized'});
  if (!/^[a-f0-9-]{36}$/i.test(data.requestId||'') || data.consent!==true || typeof data.name!=='string' || data.name.length<2 || data.name.length>100 || /[\x00-\x1f]/.test(data.name) || !/^[+\d ()-]{7,24}$/.test(data.phone||'') || !/^\d{4}-\d{2}-\d{2}$/.test(data.date||'') || !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(data.time||'')) return output({error:'Invalid request'});
  const notify=props.getProperty('BOOKING_NOTIFY_EMAIL'),id=props.getProperty('BOOKING_SHEET_ID');
  if (!notify || !id) return output({error:'Not configured'});
  const lock=LockService.getScriptLock();if (!lock.tryLock(10000)) return output({error:'Busy'});
  try {
    const sheet=SpreadsheetApp.openById(id).getSheetByName('Requests');
    if (!sheet || sheet.getRange(1,1).getValue()!=='Request ID') return output({error:'Destination not prepared'});
    const n=sheet.getLastRow();if (n>6000) return output({error:'Register needs review'});
    const rows=n>1?sheet.getRange(2,1,n-1,10).getValues():[];
    // Repeated IDs return the existing result without duplicate rows or emails.
    if (rows.some(row=>row[0]===data.requestId)) return output({status:'received',requestId:data.requestId});
    const today=Utilities.formatDate(new Date(),'Asia/Karachi','yyyy-MM-dd');
    const latest=Utilities.formatDate(new Date(Date.now()+180*86400000),'Asia/Karachi','yyyy-MM-dd');
    const parsed=new Date(data.date+'T12:00:00Z');
    if (isNaN(parsed.getTime()) || Utilities.formatDate(parsed,'UTC','yyyy-MM-dd')!==data.date || data.date<today || data.date>latest) return output({error:'Invalid date'});
    const utcToday=new Date().toISOString().slice(0,10);
    if (rows.filter(row=>String(row[1]).slice(0,10)===utcToday).length>=20) return output({error:'Daily request limit reached'});
    const text=value=>"'"+String(value); // Keep phone zeros and prevent Sheets formula injection.
    sheet.appendRow([data.requestId,new Date().toISOString(),text(data.name),text(data.phone),text(data.date),text(data.time),'Asia/Karachi','Pending confirmation','Website','Pending']);
    const row=sheet.getLastRow();
    try {
      MailApp.sendEmail({to:notify,subject:'New online consultation request — pending confirmation',body:'A new appointment request is ready for review. No appointment has been confirmed.\n\nRequest: '+data.requestId+'\nName: '+data.name+'\nPhone: '+data.phone+'\nPreferred: '+data.date+' '+data.time+' Asia/Karachi\n\nPrivate register: https://docs.google.com/spreadsheets/d/'+id+'/edit'});
      sheet.getRange(row,10).setValue('Sent');
    } catch (_) {sheet.getRange(row,10).setValue('Needs review — email not confirmed');}
    return output({status:'received',requestId:data.requestId});
  } catch (_) {return output({error:'Receipt not confirmed'});} finally {lock.releaseLock();}
}
