import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StepProcess from '../components/ui/StepProcess';

// PLACEHOLDER — all copy on this page is demo content. Replace with verified content before launch.

const procedureSteps = [
  {
    number: '01',
    title: 'Consultation',
    description: 'A thorough discussion of your goals, a 3D assessment of your facial anatomy, and an honest explanation of what is achievable. No pressure, no upselling.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Procedure',
    description: 'Performed under general anaesthesia. Using open or closed approach depending on your case, Dr. Khatri reshapes the cartilage and bone with structural precision — not just surface shaving.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Recovery',
    description: 'Splint for 7–10 days. Swelling peaks at 2–3 weeks and gradually resolves. Most patients return to social activities within 3–4 weeks. Final results visible at 12 months.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

const candidacyItems = [
  'You are bothered by the size, shape, or projection of your nose',
  'Your nose has a dorsal hump, drooping tip, or asymmetry',
  'You breathe poorly due to a deviated septum or narrow nostrils',
  'You are at least 18 years old (nasal growth complete)',
  'You are in good general health with realistic expectations',
  'You want natural results, not an obviously "done" look',
];

export default function Rhinoplasty() {
  return (
    <div className="pt-20">
      {/* ── PAGE HERO ── */}
      <section className="py-20 md:py-28 bg-charcoal relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold/10 blur-3xl pointer-events-none"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-12 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label">
            The Procedure
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-3 mb-4"
          >
            Rhinoplasty in Karachi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          >
            {/* PLACEHOLDER — intro for demo */}
            Using structural Turkish technique adapted for South Asian anatomy — results that look natural
            because they are built to last.
          </motion.p>
        </div>
      </section>

      {/* ── APPROACH EXPLAINER ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">The Approach</span>
              <h2 className="section-title mt-2 mb-6">
                Structure First. <br />
                <span className="gradient-text">Aesthetics Follow.</span>
              </h2>
              {/* PLACEHOLDER — approach copy for demo */}
              <div className="flex flex-col gap-4 font-sans text-muted leading-relaxed">
                <p>
                  Many rhinoplasty approaches focus on removing tissue — shaving a hump, trimming a tip.
                  The Turkish structural approach does the opposite: it focuses on building a strong
                  cartilage framework that supports the nose in its new shape, preventing the collapse
                  and distortion that makes old-style rhinoplasty results look "operated."
                </p>
                <p>
                  Dr. Khatri uses cartilage grafts — typically from the septum, occasionally the ear —
                  to reinforce, project, and define. The result is a nose that holds its shape as you
                  age, not one that changes unpredictably over time.
                </p>
                <p>
                  For South Asian patients specifically, this approach is critical. Thicker skin
                  requires more defined underlying structure to show the refinement. Surface techniques
                  alone often produce underwhelming or unstable results in this skin type.
                </p>
              </div>
            </motion.div>

            {/* Visual card grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: '🔬', title: 'Open Rhinoplasty', note: 'Used for complex reshaping and revision cases' }, // PLACEHOLDER
                { icon: '🪡', title: 'Closed Rhinoplasty', note: 'Minimal incisions, faster recovery for select cases' }, // PLACEHOLDER
                { icon: '🧩', title: 'Cartilage Grafting', note: 'Structural support for lasting, natural results' }, // PLACEHOLDER
                { icon: '💨', title: 'Septoplasty', note: 'Functional correction combined when needed' }, // PLACEHOLDER
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="card p-5 flex flex-col gap-3"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="font-serif text-base font-semibold text-charcoal">{item.title}</h3>
                  <p className="font-sans text-xs text-muted leading-relaxed">{item.note}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CANDIDACY ── */}
      <section className="py-24 bg-ivory">
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <span className="section-label">Is It Right for You?</span>
            <h2 className="section-title mt-2">Good Candidates</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {candidacyItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-card"
              >
                <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg viewBox="0 0 20 20" fill="none" stroke="#C9A96E" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                    <path d="M4 10l4 4 8-8" />
                  </svg>
                </div>
                <p className="font-sans text-sm text-charcoal leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS STEPS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center mb-14">
            <span className="section-label">The Journey</span>
            <h2 className="section-title mt-2">Your Process</h2>
          </div>
          <StepProcess steps={procedureSteps} />
        </div>
      </section>

      {/* ── REVISION RHINOPLASTY ── */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A96E 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-label">Revision</span>
              <h2 className="font-serif text-3xl md:text-4xl text-white mt-2 mb-6">
                Revision Rhinoplasty
              </h2>
              {/* PLACEHOLDER — revision rhinoplasty copy for demo */}
              <div className="flex flex-col gap-4 font-sans text-white/60 leading-relaxed text-sm">
                <p>
                  Not all rhinoplasty results live up to expectations — whether from a previous
                  surgeon's approach, unpredictable healing, or simply a change in what the patient
                  wants. Revision rhinoplasty is one of the most technically demanding procedures
                  in facial plastic surgery.
                </p>
                <p>
                  Dr. Khatri has extensive experience correcting prior surgeries — addressing asymmetry,
                  over-resection, collapse, and breathing difficulties caused by previous procedures.
                  He takes on revision cases with the same structural approach, rebuilding the
                  cartilage framework as needed.
                </p>
                <p>
                  Every revision consultation begins with a thorough assessment of what was done
                  previously and an honest conversation about what can realistically be improved.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-5"
            >
              {/* PLACEHOLDER — revision bullet points for demo */}
              {[
                'Asymmetry & shape correction',
                'Over-resection & tip collapse repair',
                'Breathing function restoration',
                'Skin thickening & contraction correction',
                'Multiple prior procedures welcome',
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                  <p className="font-sans text-sm text-white/70">{point}</p>
                </div>
              ))}

              <div className="pt-4">
                <Link to="/booking" className="btn-primary">
                  Book Revision Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ / CTA ── */}
      <section className="py-20 bg-ivory">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="section-title mb-5">Have Questions?</h2>
          <p className="section-subtitle mb-8">
            {/* PLACEHOLDER — CTA note for demo */}
            Every face is different. The best way to understand your options is a personal consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/booking" className="btn-primary">Book a Consultation</Link>
            <Link to="/gallery" className="btn-secondary">View Results</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
