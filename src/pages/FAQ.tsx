import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { faqs } from '../data/faqs';

function FAQItem({ faq, isOpen, onToggle }: { faq: (typeof faqs)[number]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 text-left px-6 md:px-8 py-6 active:scale-[0.99] transition-transform duration-100"
      >
        <span className="font-serif text-lg md:text-xl text-charcoal font-medium">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
          className="shrink-0 w-8 h-8 rounded-full bg-clay/10 flex items-center justify-center text-clay"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v5.5h5.5a.75.75 0 010 1.5h-5.5v5.5a.75.75 0 01-1.5 0v-5.5h-5.5a.75.75 0 010-1.5h5.5v-5.5A.75.75 0 0110 3z" clipRule="evenodd" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="overflow-hidden"
          >
            <p className="font-sans text-charcoal/75 text-sm md:text-base leading-relaxed px-6 md:px-8 pb-7">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="pt-20">
      {/* ── PAGE HERO ── */}
      <section className="py-20 bg-charcoal relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #B8562F 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-12 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label">
            Common Questions
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-3 mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-white/50 text-sm max-w-md mx-auto leading-relaxed"
          >
            Honest answers to the questions patients actually ask — not the sanitized version.
          </motion.p>
        </div>
      </section>

      {/* ── ACCORDION ── */}
      <section className="py-16 md:py-20 bg-paper">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', bounce: 0, duration: 0.5, delay: i * 0.06 }}
              >
                <FAQItem
                  faq={faq}
                  isOpen={openId === faq.id}
                  onToggle={() => setOpenId((current) => (current === faq.id ? null : faq.id))}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="section-title mb-5">Didn't Find Your Question?</h2>
          <p className="section-subtitle mb-8">
            Ask it directly — a real conversation beats a FAQ page every time.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary text-base px-8 py-4">Ask Us Directly</Link>
            <Link to="/blog" className="btn-secondary text-base px-8 py-4">Read the Journal</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
