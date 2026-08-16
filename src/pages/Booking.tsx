import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

// PLACEHOLDER — replace phone number with verified client contact before launch
const WHATSAPP_NUMBER = '+923332572052';

interface FormData {
  name: string;
  phone: string;
  date: string;
  procedure: string;
  message: string;
}

const procedureOptions = [
  'Rhinoplasty',
  'Revision Rhinoplasty',
  'Consultation Only',
];

export default function Booking() {
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    date: '',
    procedure: 'Rhinoplasty',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Build WhatsApp message from form data
    // PLACEHOLDER — this message template is for demo; adjust phrasing before launch
    const message = [
      `Hi Dr. Khatri, I'd like to book a consultation.`,
      ``,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Preferred Date: ${form.date || 'Flexible'}`,
      `Procedure: ${form.procedure}`,
      form.message ? `Message: ${form.message}` : '',
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const WHATSAPP_MSG_DIRECT = encodeURIComponent("Hi, I'd like to book a rhinoplasty consultation.");

  return (
    <div className="pt-20">
      {/* ── PAGE HERO ── */}
      <section className="py-20 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #B06A76 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-12 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label">
            Get Started
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-3 mb-4"
          >
            Book a Consultation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-white/50 text-sm max-w-md mx-auto leading-relaxed"
          >
            {/* PLACEHOLDER — intro for demo */}
            Fill in the form below and we'll reach out via WhatsApp to confirm your preferred time.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-paper">
        <div className="max-w-4xl mx-auto px-5 md:px-8 lg:px-12">
          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
          >
            <a
              href="tel:+923332572052"
              id="booking-call-now"
              className="flex items-center gap-4 bg-charcoal text-white rounded-2xl p-5 hover:bg-charcoal/80 transition-colors duration-200 group"
            >
              <div className="w-11 h-11 rounded-full bg-clay/20 flex items-center justify-center group-hover:bg-clay/30 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="#B06A76" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .96h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.75a16 16 0 006.29 6.29l1.15-1.15a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div>
                {/* PLACEHOLDER — replace with verified number before launch */}
                <p className="font-sans text-xs text-white/50 uppercase tracking-wider">Call Now</p>
                <p className="font-serif text-base font-semibold text-white">+92 333 2572052</p>
              </div>
            </a>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG_DIRECT}`}
              target="_blank"
              rel="noopener noreferrer"
              id="booking-whatsapp-direct"
              className="flex items-center gap-4 bg-[#25D366] text-white rounded-2xl p-5 hover:bg-[#1da851] transition-colors duration-200 group"
            >
              <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </div>
              <div>
                <p className="font-sans text-xs text-white/70 uppercase tracking-wider">WhatsApp</p>
                <p className="font-serif text-base font-semibold">Book Directly via Chat</p>
              </div>
            </a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="card p-8 md:p-10"
          >
            <h2 className="font-serif text-2xl text-charcoal mb-2">Send us a Message</h2>
            <p className="font-sans text-sm text-muted mb-8">
              {/* PLACEHOLDER — form intro for demo */}
              Fill in your details and we'll send your information via WhatsApp so we can confirm
              a convenient time.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 rounded-full bg-clay/20 flex items-center justify-center mx-auto mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#B06A76" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-2">WhatsApp Opened!</h3>
                <p className="font-sans text-sm text-muted">
                  Your information has been pre-filled. Complete the message in WhatsApp to send it.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary mt-6"
                >
                  Submit Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="booking-name" className="font-sans text-xs font-semibold tracking-widest uppercase text-charcoal/60">
                      Full Name *
                    </label>
                    <input
                      id="booking-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-charcoal placeholder-gray-300 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/20 transition-all duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="booking-phone" className="font-sans text-xs font-semibold tracking-widest uppercase text-charcoal/60">
                      Phone / WhatsApp *
                    </label>
                    <input
                      id="booking-phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+92 3XX XXXXXXX"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-charcoal placeholder-gray-300 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/20 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="booking-date" className="font-sans text-xs font-semibold tracking-widest uppercase text-charcoal/60">
                      Preferred Date
                    </label>
                    <input
                      id="booking-date"
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-charcoal focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/20 transition-all duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="booking-procedure" className="font-sans text-xs font-semibold tracking-widest uppercase text-charcoal/60">
                      Procedure of Interest
                    </label>
                    <select
                      id="booking-procedure"
                      name="procedure"
                      value={form.procedure}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-charcoal focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/20 transition-all duration-200 bg-white"
                    >
                      {procedureOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="booking-message" className="font-sans text-xs font-semibold tracking-widest uppercase text-charcoal/60">
                    Additional Message
                  </label>
                  <textarea
                    id="booking-message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your concerns or what you'd like to change (optional)"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-charcoal placeholder-gray-300 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/20 transition-all duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="booking-submit-btn"
                  className="btn-primary w-full justify-center text-sm py-4 mt-2"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  Send via WhatsApp
                </button>

                <p className="font-sans text-xs text-muted text-center">
                  {/* PLACEHOLDER — privacy note for demo */}
                  Your information is sent directly to Dr. Khatri's WhatsApp. We do not store form data.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
