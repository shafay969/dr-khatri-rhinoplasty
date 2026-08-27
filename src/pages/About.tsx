import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO, { SITE_URL } from '../components/layout/SEO';
import Timeline from '../components/ui/Timeline';
import { credentials } from '../data/stats';
import { business } from '../data/business';

// PLACEHOLDER — all bio content, numbers, and credential items below are demo placeholders
// Replace with verified client information before launch

export default function About() {
  return (
    <div className="pt-20">
      <SEO
        title="About Dr. Vijay Khatri | Rhinoplasty Surgeon Karachi"
        description="Meet Dr. Vijay Khatri — FCPS (CPSP) & MRCS (UK) certified, 14+ years in practice, specializing in Piezo (Harmonic) Rhinoplasty at MidCiti Hospital, Karachi."
        path="/about"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Physician',
          name: business.legalName,
          honorificPrefix: 'Dr.',
          url: `${SITE_URL}/about`,
          medicalSpecialty: 'Otolaryngologic',
          knowsAbout: ['Rhinoplasty', 'Piezo (Harmonic) Rhinoplasty', 'Facial Plastic Surgery'],
          hasCredential: business.credentials.map((name) => ({
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'certification',
            name,
          })),
          worksFor: {
            '@type': 'Hospital',
            name: business.hospital.name,
            address: {
              '@type': 'PostalAddress',
              addressLocality: business.hospital.addressLocality,
              addressRegion: business.hospital.addressRegion,
              addressCountry: 'PK',
            },
          },
          sameAs: ['https://instagram.com/vijay.k.khatri'],
        }}
      />
      {/* ── PAGE HERO ── */}
      <section className="py-20 md:py-28 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #B06A76 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-12 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="section-label"
          >
            Meet the Surgeon
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-3"
          >
            Dr. Vijay Khatri
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="font-sans text-white/50 mt-3 tracking-widest text-xs uppercase"
          >
            Facial Plastic &amp; Reconstructive Surgeon · Karachi
          </motion.p>
        </div>
      </section>

      {/* ── BIO SECTION ── */}
      <section className="py-20 md:py-28 bg-paper">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            {/* Doctor photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-charcoal/10 shadow-card-hover relative">
                <img
                  src="/doctor/portrait.webp"
                  alt="Dr. Vijay Khatri — Rhinoplasty Surgeon, Karachi"
                  className="w-full h-full object-cover"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.photo-placeholder')) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'photo-placeholder absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-charcoal via-charcoal/90 to-[#0A121C]';
                      placeholder.innerHTML = '<div class="w-20 h-20 rounded-full bg-clay/20 flex items-center justify-center"><svg viewBox="0 0 24 24" fill="none" stroke="#B06A76" stroke-width="1.5" class="w-10 h-10"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg></div><p class="font-sans text-white/40 text-xs tracking-widest uppercase text-center px-6">Doctor photo<br/>place here</p>';
                      parent.appendChild(placeholder);
                    }
                  }}
                />
              </div>

              {/* Gold accent card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="absolute -bottom-6 -right-6 bg-clay text-charcoal rounded-2xl p-5 shadow-clay hidden md:block"
              >
                {/* PLACEHOLDER — stat for demo */}
                <p className="font-serif text-3xl font-bold">500+</p>
                <p className="font-sans text-xs font-semibold mt-0.5 opacity-70 uppercase tracking-wide">Procedures</p>
              </motion.div>
            </motion.div>

            {/* Bio text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <div>
                <span className="section-label">Background</span>
                <h2 className="section-title mt-2 mb-6">
                  Precision. Artistry. <span className="gradient-text">South Asian Expertise.</span>
                </h2>
              </div>

              {/* Bio — verbatim from brief */}
              {/* PLACEHOLDER — bio copy provided by client for demo. Replace/verify before launch */}
              <div className="flex flex-col gap-5 font-sans text-muted leading-relaxed">
                <p>
                  Dr. Vijay Khatri is a Karachi-based facial plastic and reconstructive surgeon
                  specializing in rhinoplasty using techniques refined through training in Turkey —
                  home to some of the world's most respected rhinoplasty practices. With a foundation
                  in ear, nose, and throat (ENT) surgery, Dr. Khatri brings a rare combination of
                  functional surgical precision and aesthetic artistry to every procedure, so patients
                  don't just love how they look — they breathe and feel better too.
                </p>
                <p>
                  Over 14+ years of practice, Dr. Khatri has performed hundreds of primary and revision
                  rhinoplasty procedures, building a reputation for natural-looking results that respect
                  each patient's own facial harmony rather than forcing a single "ideal" template onto
                  every face. His approach blends the structural techniques popularized by leading
                  Turkish surgeons with a close understanding of South Asian facial anatomy — a
                  combination not commonly found among surgeons practicing in Pakistan.
                </p>
                <p>
                  Dr. Khatri's philosophy is simple: every nose is different, and a good result should
                  look like it was always meant to be there. Patients who travel to Turkey for
                  rhinoplasty do so for technique and artistry — Dr. Khatri brings that same standard
                  home to Karachi, without the cost, travel, or recovery logistics of an international
                  trip.
                </p>
              </div>

              {/* Philosophy highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {[
                  { icon: '🎯', label: 'Precision', note: 'Structural technique' }, // PLACEHOLDER
                  { icon: '🌿', label: 'Natural', note: 'Harmony-first results' }, // PLACEHOLDER
                  { icon: '🫁', label: 'Functional', note: 'Form + airway' }, // PLACEHOLDER
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center text-center gap-2 p-4 bg-white rounded-xl shadow-card">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="font-serif text-sm font-semibold text-charcoal">{item.label}</p>
                    <p className="font-sans text-xs text-muted">{item.note}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/booking" className="btn-primary">Book a Consultation</Link>
                <Link to="/rhinoplasty" className="btn-secondary">Learn the Technique</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center mb-16">
            <span className="section-label">Journey</span>
            <h2 className="section-title mt-2">
              {/* PLACEHOLDER */}
              Credentials &amp; Milestones
            </h2>
            <p className="section-subtitle mt-4 max-w-md mx-auto">
              {/* PLACEHOLDER — copy for demo only */}
              A surgical career built on precision training, continuous learning, and a commitment
              to bringing world-class technique to Karachi.
            </p>
          </div>

          <Timeline items={credentials} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-paper">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="section-title mb-5">Ready to Take the First Step?</h2>
          <p className="section-subtitle mb-8">
            {/* PLACEHOLDER — CTA copy for demo */}
            Book a consultation with Dr. Khatri and discover what's possible.
          </p>
          <Link to="/booking" className="btn-primary text-base px-8 py-4">Book Your Consultation</Link>
        </div>
      </section>
    </div>
  );
}
