import { useState } from 'react';

// Pitch prototype only. No calendar, backend, storage or analytics integration.
const sampleDays = ['Monday 7 December', 'Tuesday 8 December', 'Wednesday 9 December'];
const sampleTimes = ['6:00 PM', '6:30 PM', '7:00 PM'];

export default function ConsultationPreview() {
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [question, setQuestion] = useState('');
  const [previewed, setPreviewed] = useState(false);
  const reset = () => { setDay(''); setTime(''); setQuestion(''); setPreviewed(false); };

  return (
    <section aria-labelledby="booking-preview-title" data-booking-demo className="mb-12 border-y border-charcoal/15 py-8 md:py-10">
      <p className="font-sans text-sm font-semibold text-charcoal mb-3">Demonstration only · Sample availability</p>
      <h2 id="booking-preview-title" className="font-serif text-2xl md:text-3xl text-charcoal mb-3">Preview Your Online Appointment</h2>
      <p className="font-sans text-sm text-charcoal/80 leading-relaxed max-w-2xl mb-7">
        Explore a sample booking flow. These dates and times are illustrative, not Dr. Khatri’s
        availability. Nothing here is sent or booked. Use fictional questions only.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <fieldset disabled={previewed}>
            <legend className="font-sans text-sm font-semibold text-charcoal mb-3">Choose a sample date · December 2026</legend>
            <div className="flex flex-col gap-2">
              {sampleDays.map((value) => (
                <button key={value} type="button" aria-pressed={day === value} onClick={() => { setDay(value); setTime(''); }}
                  className={`text-left rounded-xl px-4 py-3 border font-sans text-sm transition-colors ${day === value ? 'border-charcoal bg-charcoal text-white' : 'border-charcoal/20 bg-white text-charcoal hover:bg-charcoal/5'} disabled:opacity-70`}>
                  {value}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset disabled={!day || previewed} className="mt-6">
            <legend className="font-sans text-sm font-semibold text-charcoal mb-3">Choose a sample time · Pakistan time (UTC+5)</legend>
            <div className="flex flex-wrap gap-2">
              {sampleTimes.map((value) => (
                <button key={value} type="button" aria-pressed={time === value} onClick={() => setTime(value)}
                  className={`rounded-xl px-4 py-3 border font-sans text-sm transition-colors ${time === value ? 'border-charcoal bg-charcoal text-white' : 'border-charcoal/20 bg-white text-charcoal hover:bg-charcoal/5'} disabled:opacity-50`}>
                  {value}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
        <div>
          <p className="font-serif text-xl text-charcoal mb-3">Online consultation with Dr. Vijay Khatri</p>
          <p className="font-sans text-sm text-charcoal/80 leading-relaxed mb-5">
            Duration, fees and meeting method will be confirmed before real bookings open.
            Surgery takes place only at MidCiti Hospital, Karachi.
          </p>
          <label htmlFor="demo-booking-question" className="block font-sans text-sm font-semibold text-charcoal mb-2">Sample booking question (optional)</label>
          <textarea id="demo-booking-question" value={question} onChange={(e) => setQuestion(e.target.value)} maxLength={300} disabled={previewed}
            aria-describedby="demo-question-help" rows={3} className="w-full rounded-xl border border-charcoal/25 bg-white px-4 py-3 font-sans text-sm text-charcoal disabled:opacity-70" />
          <p id="demo-question-help" className="font-sans text-xs text-charcoal/80 mt-2 mb-6">For example: “How will I join the call?” Do not enter personal or medical details. This demo does not save or send your question.</p>
          <button type="button" disabled={!day || !time || previewed} onClick={() => setPreviewed(true)} id="preview-appointment-request"
            className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed">Preview Appointment Request</button>
          <div role="status" aria-live="polite" className="mt-5 font-sans text-sm text-charcoal leading-relaxed">
            {previewed && <><p className="font-semibold">Preview complete. No appointment has been booked.</p><p className="mt-2">Sample selection: {day} 2026 at {time}, Pakistan time. Your question has not been sent. Real appointments require confirmation.</p></>}
          </div>
          <button type="button" onClick={reset} className="mt-4 font-sans text-sm text-charcoal underline underline-offset-4">Reset Demo</button>
        </div>
      </div>
    </section>
  );
}
