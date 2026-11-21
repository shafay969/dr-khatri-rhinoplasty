import { motion } from 'framer-motion';
import TestimonialCard from '../components/ui/TestimonialCard';
import { testimonials } from '../data/testimonials';
import { Link } from 'react-router-dom';
import SEO from '../components/layout/SEO';

// Retain the existing client-provided record; do not imply a practice-wide rating.

export default function Testimonials() {
  return (
    <div className="pt-20">
      <SEO
        title="Patient Reviews & Testimonials | Dr. Vijay Khatri Rhinoplasty Karachi"
        description="Read a patient experience from Dr. Vijay Khatri's Karachi practice. Individual experiences vary; contact the clinic with your consultation questions."
        path="/testimonials"
      />
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
            A patient shares their experience. Individual experiences vary; this story does
            not predict your own results.
          </motion.p>
        </div>
      </section>

      {/* ── TESTIMONIAL GRID ── */}
      <section className="py-20 bg-paper">
        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
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
            Individual experiences vary. Contact the clinic for advice about your circumstances.
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
