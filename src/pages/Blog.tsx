import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/layout/SEO';
import { blogPosts } from '../data/blog';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export default function Blog() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="pt-20">
      <SEO
        title="The Journal — Rhinoplasty Insights | Dr. Vijay Khatri"
        description="Honest, in-depth writing on rhinoplasty technique, recovery, and what to actually expect — from Dr. Vijay Khatri's Karachi practice."
        path="/blog"
      />
      {/* ── PAGE HERO ── */}
      <section className="py-20 bg-charcoal relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #B06A76 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-12 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label">
            The Journal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-3 mb-4"
          >
            Notes on Rhinoplasty
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-white/50 text-sm max-w-md mx-auto leading-relaxed"
          >
            Straight answers on technique, recovery, and what to actually expect — written by
            Dr. Khatri's practice, not a content mill.
          </motion.p>
        </div>
      </section>

      {/* ── FEATURED POST ── */}
      <section className="py-16 md:py-20 bg-paper">
        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', bounce: 0, duration: 0.6 }}
          >
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-white shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              <div className={`relative aspect-[4/3] md:aspect-auto bg-gradient-to-br ${featured.coverGradient} overflow-hidden`}>
                <img
                  src={featured.cover}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-charcoal/70 backdrop-blur-sm px-3 py-1 rounded-full">
                  <p className="font-sans text-[10px] tracking-widest uppercase text-white/80">Featured</p>
                </div>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-sans text-[11px] tracking-[0.15em] uppercase text-clay font-semibold">
                    {featured.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-muted/40" />
                  <span className="font-sans text-xs text-muted">{featured.readTime}</span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal leading-snug mb-4 group-hover:text-clay transition-colors duration-300">
                  {featured.title}
                </h2>
                <p className="font-sans text-muted text-sm leading-relaxed mb-5">
                  {featured.excerpt}
                </p>
                <span className="font-sans text-sm font-semibold text-clay inline-flex items-center gap-2">
                  Read the piece
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── POST GRID ── */}
      <section className="pb-20 md:pb-24 bg-paper">
        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', bounce: 0, duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white shadow-card hover:shadow-card-hover transition-shadow duration-300"
                >
                  <div className={`relative aspect-[16/9] bg-gradient-to-br ${post.coverGradient} overflow-hidden`}>
                    <img
                      src={post.cover}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-clay font-semibold">
                        {post.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-muted/40" />
                      <span className="font-sans text-xs text-muted">{post.readTime}</span>
                    </div>
                    <h3 className="font-serif text-lg md:text-xl text-charcoal leading-snug mb-3 group-hover:text-clay transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="font-sans text-muted text-sm leading-relaxed mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <p className="font-sans text-xs text-muted/70">{formatDate(post.date)}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="section-title mb-5">Still Have Questions?</h2>
          <p className="section-subtitle mb-8">
            The blog covers the general ground — a consultation covers your nose specifically.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/booking" className="btn-primary text-base px-8 py-4">Book a Consultation</Link>
            <Link to="/faq" className="btn-secondary text-base px-8 py-4">Read the FAQs</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
