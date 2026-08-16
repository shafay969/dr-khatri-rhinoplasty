import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider';
import { galleryPairs, GalleryPair } from '../data/gallery';

// PLACEHOLDER — all gallery images are placeholder paths. Drop real before/after images
// into /public/gallery/ following the naming convention in src/data/gallery.ts before launch.

type Category = 'all' | 'rhinoplasty' | 'full-face';

const tabs: { id: Category; label: string }[] = [
  { id: 'all', label: 'All Results' },
  { id: 'rhinoplasty', label: 'Rhinoplasty' },
];

function LightboxModal({ src, label, onClose }: { src: string; label: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center lightbox-overlay bg-charcoal/90 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative max-w-lg w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={src}
            alt={label}
            className="w-full rounded-2xl shadow-card-hover"
            onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${src}/600/800`; }}
          />
          {label && (
            <div className="mt-3 text-center">
              <span className="font-sans text-xs tracking-widest uppercase text-white/50">{label}</span>
            </div>
          )}
          <button
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-charcoal border border-white/20 flex items-center justify-center text-white hover:bg-clay hover:text-charcoal transition-colors duration-200"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<Category>('all');
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

  const filtered = activeTab === 'all'
    ? galleryPairs
    : galleryPairs.filter((p) => p.category === activeTab);

  const openLightbox = useCallback((src: string, label: string) => {
    setLightbox({ src, label });
  }, []);

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
            Real Results
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-3 mb-4"
          >
            Before &amp; After Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-white/50 text-sm max-w-lg mx-auto leading-relaxed"
          >
            {/* PLACEHOLDER — gallery intro for demo */}
            Drag the slider on each image to compare. Results shown are representative — individual
            outcomes vary.
          </motion.p>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <section className="py-12 bg-paper">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          {/* Tab bar */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                id={`gallery-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`relative font-sans text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-charcoal'
                    : 'text-muted hover:text-charcoal'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="gallery-tab-indicator"
                    className="absolute inset-0 bg-clay rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((pair, i) => (
                <motion.div
                  key={pair.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <BeforeAfterSlider
                    before={pair.before}
                    after={pair.after}
                    label={pair.label}
                    onOpenLightbox={(src) => openLightbox(src, pair.label)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-sans text-muted">No results in this category yet.</p>
            </div>
          )}

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-sans text-xs text-muted text-center mt-12 max-w-xl mx-auto leading-relaxed"
          >
            {/* PLACEHOLDER — replace with proper medical disclaimer before launch */}
            All before/after photos are for demonstration purposes only. Actual patient results
            will be displayed after launch with appropriate consent.
          </motion.p>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <LightboxModal
          src={lightbox.src}
          label={lightbox.label}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
