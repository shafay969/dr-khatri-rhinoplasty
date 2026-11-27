import { useState } from 'react';

const live = import.meta.env.VITE_APPOINTMENT_REQUESTS_ENABLED === 'true';
const timeOptions = ['18:00', '18:30', '19:00'];
const pad = (n: number) => String(n).padStart(2, '0');

export default function ConsultationPreview() {
  const [month, setMonth] = useState(new Date(2026, 11, 1));
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<'idle'|'sending'|'done'|'error'>('idle');
  const [requestId, setRequestId] = useState('');
  const monthLabel = month.toLocaleDateString('en-GB', {month:'long',year:'numeric'});
  const days = new Date(month.getFullYear(),month.getMonth()+1,0).getDate();
  const offset = new Date(month.getFullYear(),month.getMonth(),1).getDay();
  const reset = () => {setDay('');setTime('');setName('');setPhone('');setConsent(false);setState('idle');setRequestId('');};
  const request = async () => {
    if (!day || !time || !name.trim() || !/^[+\d ()-]{7,24}$/.test(phone) || !consent) return;
    const id=requestId || crypto.randomUUID();setRequestId(id);
    if (!live) {setState('done');return;}
    setState('sending');
    try {
      const response=await fetch('/.netlify/functions/appointment-request',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({requestId:id,name:name.trim(),phone,date:day,time,consent,website:''})});
      const result=await response.json();
      if (!response.ok || result.status!=='received') throw new Error('not received');
      setState('done');
    } catch {setState('error');}
  };
  const ready=day && time && name.trim() && /^[+\d ()-]{7,24}$/.test(phone) && consent;
  return (
    <section aria-labelledby="booking-preview-title" data-booking-demo={!live || undefined} className="mb-12 border-y border-charcoal/15 py-8 md:py-10">
      {!live && <p className="font-sans text-sm font-semibold text-charcoal mb-3">Pitch demonstration · Fictional details only</p>}
      <h2 id="booking-preview-title" className="font-serif text-2xl md:text-3xl text-charcoal mb-3">Request an Online Appointment</h2>
      <p className="font-sans text-sm text-charcoal/80 leading-relaxed max-w-2xl mb-7">Choose a preferred date and time. Your request needs confirmation before an appointment is booked. {!live && 'These times are illustrative. This local demo does not send email or update the Sheet automatically.'}</p>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <button type="button" aria-label="Previous month" onClick={()=>{setMonth(new Date(month.getFullYear(),month.getMonth()-1,1));setDay('');}} className="p-3 rounded-xl border border-charcoal/20 text-charcoal hover:bg-charcoal/5">←</button>
            <h3 className="font-serif text-xl text-charcoal" aria-live="polite">{monthLabel}</h3>
            <button type="button" aria-label="Next month" onClick={()=>{setMonth(new Date(month.getFullYear(),month.getMonth()+1,1));setDay('');}} className="p-3 rounded-xl border border-charcoal/20 text-charcoal hover:bg-charcoal/5">→</button>
          </div>
          <div className="grid grid-cols-7 text-center font-sans text-xs text-charcoal/80 mb-2" aria-hidden="true">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=><span key={d}>{d}</span>)}</div>
          <div role="group" aria-label="Preferred appointment date" className="grid grid-cols-7 gap-1">
            {Array.from({length:offset},(_,i)=><span key={'empty'+i}/>)}
            {Array.from({length:days},(_,i)=>{
              const n=i+1,date=`${month.getFullYear()}-${pad(month.getMonth()+1)}-${pad(n)}`;
              return <button key={date} type="button" aria-label={`${n} ${monthLabel}`} aria-pressed={day===date} disabled={state==='done'||state==='sending'} onClick={()=>setDay(date)} className={`min-h-11 rounded-lg font-sans text-sm border transition-colors ${day===date?'bg-charcoal text-white border-charcoal':'bg-white text-charcoal border-transparent hover:border-charcoal/30'} disabled:opacity-60`}>{n}</button>;
            })}
          </div>
          <label htmlFor="appointment-time" className="block font-sans text-sm font-semibold text-charcoal mt-6 mb-2">Preferred time · Pakistan (UTC+5)</label>
          <select id="appointment-time" value={time} onChange={e=>setTime(e.target.value)} disabled={state==='done'||state==='sending'} className="w-full p-3 rounded-xl border border-charcoal/25 bg-white font-sans text-sm text-charcoal">
            <option value="">Choose a time</option>{timeOptions.map(t=><option key={t} value={t}>{t==='18:00'?'6:00 PM':t==='18:30'?'6:30 PM':'7:00 PM'}{!live?' — sample':''}</option>)}
          </select>
          <p className="font-sans text-xs text-charcoal/80 mt-3">Online consultation. Duration, fee and meeting method will be confirmed directly. Surgery takes place only at MidCiti Hospital.</p>
        </div>
        <div>
          <label htmlFor="appointment-name" className="block font-sans text-sm font-semibold text-charcoal mb-2">Full name</label>
          <input id="appointment-name" value={name} onChange={e=>setName(e.target.value)} maxLength={100} autoComplete={live?'name':'off'} disabled={state==='done'||state==='sending'} className="w-full p-3 rounded-xl border border-charcoal/25 bg-white font-sans text-sm text-charcoal mb-5" />
          <label htmlFor="appointment-phone" className="block font-sans text-sm font-semibold text-charcoal mb-2">Phone / WhatsApp number</label>
          <input id="appointment-phone" type="tel" value={phone} onChange={e=>setPhone(e.target.value)} maxLength={24} autoComplete={live?'tel':'off'} aria-describedby="appointment-help" disabled={state==='done'||state==='sending'} className="w-full p-3 rounded-xl border border-charcoal/25 bg-white font-sans text-sm text-charcoal" />
          <p id="appointment-help" className="font-sans text-xs text-charcoal/80 mt-2 mb-5">Include your country code for a real request. For this pitch use Demo Patient and 00000000000. Do not enter medical details.</p>
          <label className="flex gap-3 items-start font-sans text-sm text-charcoal leading-relaxed mb-6"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} disabled={state==='done'||state==='sending'} className="mt-1 w-4 h-4 shrink-0" />I agree to be contacted about this appointment request.</label>
          <button type="button" disabled={!ready||state==='sending'||state==='done'} onClick={request} id="request-appointment" className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed">{state==='sending'?'Sending request…':'Request Appointment'}</button>
          <div role="status" aria-live="polite" className="mt-5 font-sans text-sm text-charcoal leading-relaxed">
            {state==='done' && <><p className="font-semibold">{live?'Appointment request received.':'Demo request prepared.'}</p><p className="mt-2">{day} at {time}, Pakistan time. No appointment has been confirmed. {!live && 'Nothing was sent. The matching demo email and Sheet example are separate pitch artifacts.'}</p></>}
            {state==='error' && <p>We could not confirm receipt. Please contact the team by phone or WhatsApp before trying again.</p>}
          </div>
          <button type="button" onClick={reset} disabled={state==='sending'} className="mt-4 font-sans text-sm text-charcoal underline underline-offset-4">Start Again</button>
        </div>
      </div>
    </section>
  );
}
