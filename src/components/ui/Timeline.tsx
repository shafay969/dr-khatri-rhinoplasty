import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent" />

      <div className="flex flex-col gap-10">
        {items.map((item, i) => (
          <TimelineEntry key={i} item={item} index={i} isLeft={i % 2 === 0} />
        ))}
      </div>
    </div>
  );
}

function TimelineEntry({ item, index, isLeft }: { item: TimelineItem; index: number; isLeft: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="relative flex items-start md:items-center gap-6 md:gap-0">
      {/* Desktop: alternate left/right */}
      <div className={`hidden md:block w-1/2 pr-10 ${isLeft ? '' : 'order-last pl-10 pr-0'}`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card p-6 text-right md:text-left"
          style={{ textAlign: isLeft ? 'right' : 'left' }}
        >
          <span className="section-label">{item.year}</span>
          <h3 className="font-serif text-xl font-semibold text-charcoal mt-1 mb-2">{item.title}</h3>
          <p className="font-sans text-muted text-sm leading-relaxed">
            {/* PLACEHOLDER — replace with verified credential details before launch */}
            {item.description}
          </p>
        </motion.div>
      </div>

      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.05, type: 'spring', stiffness: 300 }}
        className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow-gold"
        style={{ order: 0 }}
      >
        <span className="font-sans text-xs font-bold text-charcoal">{index + 1}</span>
      </motion.div>

      {/* Mobile / right-side content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="md:hidden flex-1"
      >
        <span className="section-label">{item.year}</span>
        <h3 className="font-serif text-lg font-semibold text-charcoal mt-1 mb-1">{item.title}</h3>
        <p className="font-sans text-muted text-sm leading-relaxed">
          {item.description}
        </p>
      </motion.div>

      <div className={`hidden md:block w-1/2 pl-10 ${isLeft ? 'order-last' : 'order-first pr-10 pl-0'}`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card p-6"
          style={{ textAlign: isLeft ? 'left' : 'right' }}
        >
          <span className="section-label">{item.year}</span>
          <h3 className="font-serif text-xl font-semibold text-charcoal mt-1 mb-2">{item.title}</h3>
          <p className="font-sans text-muted text-sm leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
