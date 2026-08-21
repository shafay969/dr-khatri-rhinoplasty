import { motion } from 'framer-motion';
import { Link, useParams, Navigate } from 'react-router-dom';
import { blogPosts, getBlogPostBySlug } from '../data/blog';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="pt-20">
      {/* ── HERO ── */}
      <section className={`relative py-20 md:py-28 bg-gradient-to-br ${post.coverGradient} overflow-hidden`}>
        <img src={post.cover} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="relative z-10 max-w-3xl mx-auto px-5 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-white/90 font-semibold">
              {post.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="font-sans text-xs text-white/70">{post.readTime}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-white display-type mb-4 text-balance"
          >
            {post.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="font-sans text-white/60 text-xs tracking-wide"
          >
            {formatDate(post.date)} · Dr. Vijay Khatri's Practice
          </motion.p>
        </div>
      </section>

      {/* ── BREADCRUMB ── */}
      <div className="bg-paper border-b border-charcoal/5">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-4">
          <Link to="/blog" className="font-sans text-xs text-muted hover:text-clay transition-colors duration-200 inline-flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H6.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L6.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
            Back to The Journal
          </Link>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <article className="py-16 md:py-20 bg-paper">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          {post.content.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
              className="mb-9"
            >
              {section.heading && (
                <h2 className="font-serif text-xl md:text-2xl text-charcoal font-semibold mb-4">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p key={j} className="font-sans text-charcoal/80 text-base leading-relaxed mb-4 last:mb-0">
                  {p}
                </p>
              ))}
            </motion.div>
          ))}

          <div className="clay-divider my-10" />

          <div className="bg-white rounded-2xl shadow-card p-7 md:p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
            <div>
              <p className="font-serif text-xl text-charcoal font-semibold mb-1.5">
                Curious how this applies to your nose specifically?
              </p>
              <p className="font-sans text-muted text-sm leading-relaxed">
                General advice only goes so far. A consultation looks at your actual anatomy.
              </p>
            </div>
            <Link to="/booking" className="btn-primary shrink-0 whitespace-nowrap">Book a Consultation</Link>
          </div>
        </div>
      </article>

      {/* ── RELATED POSTS ── */}
      <section className="py-16 md:py-20 bg-white border-t border-charcoal/5">
        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
          <p className="section-label mb-3 text-center">Keep Reading</p>
          <h2 className="section-title text-center mb-10">More from The Journal</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden bg-paper shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className={`relative aspect-[16/9] bg-gradient-to-br ${p.coverGradient} overflow-hidden`}>
                  <img
                    src={p.cover}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-clay font-semibold">
                    {p.category}
                  </span>
                  <h3 className="font-serif text-base text-charcoal leading-snug mt-2 group-hover:text-clay transition-colors duration-300">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
