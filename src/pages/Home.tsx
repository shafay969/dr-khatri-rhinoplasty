import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StatCounter from '../components/ui/StatCounter';
import TestimonialCard from '../components/ui/TestimonialCard';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider';
import InstagramPhoneMockup from '../components/ui/InstagramPhoneMockup';
import { stats } from '../data/stats';
import { testimonials } from '../data/testimonials';
import { teaserPairs } from '../data/gallery';

// PLACEHOLDER — hero background gradient simulates a clinic/luxury aesthetic until real photo is available
// Replace the gradient with an actual hero image: /public/doctor/hero.jpg

const WHATSAPP_NUMBER = '+923332572052';
const WHATSAPP_MSG = encodeURIComponent("Hi, I'd like to book a rhinoplasty consultation.");

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const wordReveal = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const turkishCards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: 'Structural Precision',
    // PLACEHOLDER — copy for demo only
    body: 'Turkish rhinoplasty is defined by its focus on structural cartilage grafting — reshaping the nose from within so results hold their form naturally for decades, not just years.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    title: 'South Asian Harmony',
    // PLACEHOLDER — copy for demo only
    body: 'Dr. Khatri adapts these techniques to South Asian facial anatomy — thicker skin, different cartilage structure, different aesthetic ideals — a nuance many surgeons overlook.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M3.5 8.5C5 5 8.5 3 12 3s7 2 8.5 5.5" />
        <path d="M12 3v18M5 12h14" />
      </svg>
    ),
    title: 'Functional + Aesthetic',
    // PLACEHOLDER — copy for demo only
    body: 'Every procedure considers both appearance and airway function. Patients don\'t just look better — they breathe better, sleep better, feel better.',
  },
];

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center" aria-label="Hero">
        {/* Background — animated gradient until real photo */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F0D0B] via-[#17140F] to-[#2E1710] overflow-hidden">
          {/* Animated orbs */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-clay/20 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.16, 0.08] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-clay/10 blur-3xl"
          />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(#B8562F 1px, transparent 1px), linear-gradient(90deg, #B8562F 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-32 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column - Headline & CTAs */}
            <div className="lg:col-span-7">
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-8 h-px bg-clay" />
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-clay">
                  {/* PLACEHOLDER — tagline for demo */}
                  Turkish Technique · Karachi Practice
                </span>
              </motion.div>

              {/* Headline — staggered word reveal */}
              <motion.h1
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="font-serif text-4xl md:text-6xl lg:text-7xl text-white display-type mb-6 text-balance"
              >
                {['Your', 'Natural', 'Nose,'].map((word, i) => (
                  <motion.span key={i} variants={wordReveal} className="inline-block mr-4">
                    {word}
                  </motion.span>
                ))}
                <br />
                {['Refined', 'by', 'Expertise.'].map((word, i) => (
                  <motion.span key={i} variants={wordReveal} className={`inline-block mr-4 ${i === 0 ? 'gradient-text' : ''}`}>
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Subhead */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="font-sans text-white/60 text-base md:text-lg leading-relaxed max-w-xl mb-10"
              >
                {/* PLACEHOLDER — description for demo */}
                Dr. Vijay Khatri brings Turkish rhinoplasty's structural artistry to Karachi — results
                that look like they were always meant to be there.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.05 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/booking" id="hero-book-cta" className="btn-primary text-sm px-8 py-4">
                  Book a Consultation
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link to="/gallery" id="hero-gallery-cta" className="btn-ghost-white">
                  View Gallery
                </Link>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-12 lg:mt-16 flex items-center gap-3"
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1"
                >
                  <div className="w-1 h-2 bg-clay/60 rounded-full" />
                </motion.div>
                <span className="font-sans text-xs tracking-widest uppercase text-white/30">Scroll</span>
              </motion.div>
            </div>

            {/* Right Column - Premium Golden Ratio Silhouette Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:col-span-5 relative w-full flex justify-center"
            >
              {/* Glassmorphic Art Card */}
              <div className="relative w-full max-w-sm aspect-[4/5] bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md overflow-hidden flex flex-col justify-between shadow-2xl group">
                {/* Background Shimmer & Pulse */}
                <div className="absolute inset-0 bg-gradient-to-tr from-clay/10 via-transparent to-transparent pointer-events-none group-hover:opacity-100 transition-opacity duration-500 opacity-50" />
                
                {/* Corner details */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-clay/40" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-clay/40" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-clay/40" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-clay/40" />

                {/* Animated Golden Ratio Facial Profile Contour Line-Art */}
                <div className="absolute inset-0 flex items-center justify-center p-8 opacity-90">
                  <svg viewBox="0 0 200 250" fill="none" className="w-full h-full text-clay">
                    {/* Golden circles/ratio markers */}
                    <motion.circle 
                      cx="110" cy="115" r="45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3"
                      initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: 1 }}
                    />
                    <motion.circle 
                      cx="110" cy="115" r="72" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.15"
                      initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} transition={{ delay: 1.2 }}
                    />
                    {/* Angle lines */}
                    <motion.line 
                      x1="30" y1="125" x2="180" y2="125" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.25"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
                    />
                    <motion.line 
                      x1="93" y1="40" x2="93" y2="210" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.25"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.7 }}
                    />
                    {/* Nasofaxial angle ray */}
                    <motion.line 
                      x1="93" y1="110" x2="140" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.4"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.5 }}
                    />
                    <motion.text 
                      x="145" y="58" fill="currentColor" fontSize="6" fontFamily="sans-serif" letterSpacing="1" opacity="0.6"
                      initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 2 }}
                    >
                      115°
                    </motion.text>
                    
                    {/* Facial profile outline */}
                    <motion.path
                      d="M60,20 Q85,50 90,85 Q93,100 93,110 L108,125 L93,128 Q95,145 90,165 Q85,185 80,210"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2.2, ease: "easeInOut", delay: 0.8 }}
                    />
                  </svg>
                </div>

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between text-white/50 text-[9px] tracking-[0.2em] font-sans uppercase">
                  <span>Aesthetic Harmony</span>
                  <span className="text-clay">Active Grid</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="relative z-10 flex flex-col gap-1.5 mt-auto">
                  <div className="inline-flex self-start bg-clay/10 text-clay border border-clay/30 rounded-full px-2.5 py-0.5 text-[9px] tracking-widest uppercase font-semibold">
                    Istanbul Training
                  </div>
                  <h4 className="font-serif text-lg text-white font-medium tracking-tight">
                    Turkish Technique Architecture
                  </h4>
                  <p className="font-sans text-[11px] text-white/40 leading-relaxed">
                    Cartilage reconstruction &amp; tip projection engineered for South Asian anatomy.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-paper to-transparent pointer-events-none" />
      </section>

      {/* ── STATS ── */}
      <section className="py-20 bg-paper" aria-label="Statistics">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat, i) => (
              <StatCounter
                key={stat.id}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                duration={1.8}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY TURKISH TECHNIQUE ── */}
      <section className="py-24 bg-white" aria-label="Why the Turkish Technique">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="section-label"
            >
              The Difference
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="section-title mt-3 mb-4"
            >
              Why the Turkish Technique?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="section-subtitle max-w-lg mx-auto"
            >
              {/* PLACEHOLDER — intro copy for demo */}
              Turkey leads the world in rhinoplasty volume and innovation. Here is what sets
              the technique apart — and why Dr. Khatri trained there.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {turkishCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="card p-8 flex flex-col gap-5 group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-clay/10 flex items-center justify-center text-clay group-hover:bg-clay/20 transition-colors duration-300">
                  {card.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold text-charcoal">{card.title}</h3>
                <p className="font-sans text-muted text-sm leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/rhinoplasty" className="btn-primary">
              Learn About the Procedure
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── BEFORE / AFTER TEASER ── */}
      <section className="py-24 bg-paper" aria-label="Before and After Gallery Teaser">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="section-label">Results</span>
              <h2 className="section-title mt-2">Before &amp; After</h2>
            </div>
            <Link to="/gallery" className="btn-secondary flex-shrink-0">
              View Full Gallery →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {teaserPairs.map((pair, i) => (
              <motion.div
                key={pair.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <BeforeAfterSlider
                  before={pair.before}
                  after={pair.after}
                  label={pair.label}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL TEASER ── */}
      <section className="py-24 bg-charcoal" aria-label="Patient Testimonials Teaser">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <span className="section-label">Patients</span>
            <h2 className="font-serif text-3xl md:text-4xl text-white mt-2">What They Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col gap-4"
              >
                <div className="text-clay/30 font-serif text-5xl leading-none">&ldquo;</div>
                <p className="font-sans text-white/70 text-sm leading-relaxed flex-1">
                  {/* PLACEHOLDER — demo testimonial */}
                  {t.text}
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full bg-clay/20 flex items-center justify-center">
                    <span className="font-serif text-sm font-semibold text-clay">{t.initials}</span>
                  </div>
                  <div>
                    <p className="font-sans text-sm text-white font-medium">{t.name}</p>
                    <p className="font-sans text-xs text-white/40">{t.procedure}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/testimonials" className="btn-ghost-white">
              Read All Testimonials
            </Link>
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM ── */}
      <section className="py-24 bg-paper overflow-hidden" aria-label="Instagram">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Copy */}
            <div className="lg:col-span-6 lg:order-1 order-2 text-center lg:text-left">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="section-label"
              >
                Follow Along
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="section-title mt-3 mb-5"
              >
                See the Work Before You Ever Book
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="section-subtitle max-w-md mx-auto lg:mx-0 mb-8"
              >
                Dr. Khatri posts real case walkthroughs, recovery breakdowns, and behind-the-scenes
                footage from the OR on Instagram — not just polished after-photos. It's the most
                honest look at his work you'll find before stepping into a consultation.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              >
                <a
                  href="https://instagram.com/vijay.k.khatri"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="home-instagram-follow-cta"
                  className="btn-primary text-sm px-7 py-3.5"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" />
                    <circle cx="12" cy="12" r="4.2" />
                    <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
                  </svg>
                  Follow @vijay.k.khatri
                </a>
                <span className="font-sans text-xs text-muted">10.6K followers · verified account</span>
              </motion.div>
            </div>

            {/* Phone mockup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.7 }}
              className="lg:col-span-6 order-1 lg:order-2"
            >
              <InstagramPhoneMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 bg-white" aria-label="Call to Action">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-label"
          >
            Ready?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mt-3 mb-5"
          >
            Start with a Conversation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mb-8"
          >
            {/* PLACEHOLDER — CTA description for demo */}
            Consultations are relaxed, no-pressure, and focused entirely on what you want.
            Book yours today — in-clinic or via WhatsApp.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/booking" className="btn-primary">Book Online</Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
