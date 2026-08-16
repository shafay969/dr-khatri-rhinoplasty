import { motion } from 'framer-motion';

// PLACEHOLDER — all contact details below are placeholder values. Replace with verified clinic info before launch.
const WHATSAPP_NUMBER = '+923332572052';
const WHATSAPP_MSG = encodeURIComponent("Hi, I'd like to book a rhinoplasty consultation.");
const INSTAGRAM = 'https://instagram.com/vijay.k.khatri';

// PLACEHOLDER — Clifton, Karachi placeholder pin. Replace iframe src with real clinic Google Maps embed URL before launch.
const MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14467.688538234786!2d67.01659!3d24.80943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33ddd6f37f97d%3A0x4d56d2b40d57c789!2sClifton%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890';

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300 group">
      <div className="w-10 h-10 rounded-full bg-clay/10 flex items-center justify-center flex-shrink-0 group-hover:bg-clay/20 transition-colors duration-200">
        <div className="text-clay w-5 h-5">{icon}</div>
      </div>
      <div>
        <p className="font-sans text-[10px] tracking-widest uppercase text-muted mb-0.5">{label}</p>
        <p className="font-sans text-sm text-charcoal font-medium">{value}</p>
      </div>
    </div>
  );

  return href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{content}</a> : <div>{content}</div>;
}

export default function Contact() {
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
            Find Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-3 mb-4"
          >
            Contact &amp; Location
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-white/50 text-sm max-w-md mx-auto"
          >
            {/* PLACEHOLDER — intro for demo */}
            We're based in Clifton, Karachi. Reach us via WhatsApp, phone, or email — or drop by the clinic.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-paper">
        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              <h2 className="section-title mb-2">Get in Touch</h2>
              <p className="section-subtitle mb-6">
                {/* PLACEHOLDER — contact intro for demo */}
                The fastest way to reach us is WhatsApp. Consultations can be arranged
                within the week in most cases.
              </p>

              <ContactRow
                icon={
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                }
                label="WhatsApp"
                value="+92 333 2572052" // PLACEHOLDER
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              />

              <ContactRow
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .96h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.75a16 16 0 006.29 6.29l1.15-1.15a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                }
                label="Phone" // PLACEHOLDER
                value="+92 333 2572052"
                href="tel:+923332572052"
              />

              <ContactRow
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                }
                label="Email" // PLACEHOLDER
                value="info@drkhatri.pk"
                href="mailto:info@drkhatri.pk"
              />

              <ContactRow
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4.5" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                  </svg>
                }
                label="Instagram"
                value="@vijay.k.khatri"
                href={INSTAGRAM}
              />

              <ContactRow
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
                label="Clinic Address" // PLACEHOLDER
                value="Clinic Address Placeholder, Clifton, Karachi"
              />

              {/* Hours */}
              <div className="mt-2 p-5 bg-white rounded-xl shadow-card">
                <p className="font-sans text-[10px] tracking-widest uppercase text-muted mb-3">Clinic Hours</p>
                {/* PLACEHOLDER — replace with verified clinic hours before launch */}
                <div className="flex flex-col gap-1.5">
                  {[
                    { day: 'Monday – Friday', hours: '10:00 AM – 6:00 PM' },
                    { day: 'Saturday', hours: '10:00 AM – 2:00 PM' },
                    { day: 'Sunday', hours: 'By Appointment Only' },
                  ].map((row) => (
                    <div key={row.day} className="flex justify-between text-sm font-sans">
                      <span className="text-muted">{row.day}</span>
                      <span className="text-charcoal font-medium">{row.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <div className="rounded-2xl overflow-hidden shadow-card-hover h-80 lg:h-full min-h-[360px] bg-charcoal/10">
                {/* PLACEHOLDER — replace src with verified clinic Google Maps embed URL before launch */}
                <iframe
                  title="Dr. Khatri Clinic Location — Karachi"
                  src={MAPS_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '360px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <motion.a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-whatsapp-cta"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 bg-charcoal text-white rounded-xl py-4 font-sans text-sm font-semibold hover:bg-charcoal/80 transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="#25D366" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Chat with Us on WhatsApp
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
