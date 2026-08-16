import { motion } from 'framer-motion';
import TestimonialCard from '../components/ui/TestimonialCard';
import { testimonials } from '../data/testimonials';
import { Link } from 'react-router-dom';

// PLACEHOLDER — all testimonials are demo content. Replace with verified patient reviews before launch.

export default function Testimonials() {
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
            Patient Stories
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-3 mb-4"
          >
            What Patients Say
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-white/50 text-sm max-w-md mx-auto leading-relaxed"
          >
            {/* PLACEHOLDER — intro for demo */}
            Real experiences from real patients. Testimonials are for demo purposes and will be
            replaced with verified reviews before launch.
          </motion.p>
        </div>
      </section>

      {/* ── TESTIMONIAL GRID ── */}
      <section className="py-20 bg-paper">
        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
          {/* Overall rating banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-charcoal rounded-2xl p-8 md:p-10 mb-12 flex flex-col md:flex-row items-center gap-6 md:gap-12 text-center md:text-left"
          >
            <div className="flex-shrink-0">
              {/* PLACEHOLDER — aggregate rating for demo */}
              <p className="font-serif text-6xl font-bold text-clay">5.0</p>
              <div className="flex gap-1 justify-center md:justify-start mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" fill="#B06A76" className="w-5 h-5">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div>
              <p className="font-serif text-2xl text-white font-semibold mb-2">
                {/* PLACEHOLDER */}
                98% Patient Satisfaction
              </p>
              <p className="font-sans text-white/50 text-sm leading-relaxed max-w-md">
                {/* PLACEHOLDER — satisfaction copy for demo */}
                Based on post-procedure follow-ups. Dr. Khatri's results speak for themselves —
                natural, lasting, and tailored to each individual.
              </p>
            </div>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} delay={i * 0.1} />
            ))}
          </div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-sans text-xs text-muted text-center mt-12 max-w-xl mx-auto leading-relaxed"
          >
            {/* PLACEHOLDER — replace with proper disclaimer before launch */}
            Testimonials shown are for demonstration purposes and have been created as representative
            examples. Patient-verified reviews will be added before launch.
          </motion.p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="section-title mb-5">Ready to Write Your Own Story?</h2>
          <p className="section-subtitle mb-8">
            {/* PLACEHOLDER — CTA copy for demo */}
            Take the first step. Book a consultation and let Dr. Khatri show you what's possible
            for your face.
          </p>
          <Link to="/booking" className="btn-primary text-base px-8 py-4">Book a Consultation</Link>
        </div>
      </section>
    </div>
  );
}
