import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';
import { useInView } from 'framer-motion';

interface StatCounterProps {
  value: number;
  suffix: string;
  label: string;
  duration?: number;
}

export default function StatCounter({ value, suffix, label, duration = 2 }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (v) => setDisplayValue(Math.round(v)),
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex items-end justify-center gap-0.5"
      >
        <span className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal tabular-nums leading-none">
          {displayValue}
        </span>
        <span className="font-serif text-2xl md:text-3xl font-bold text-gold mb-1">
          {suffix}
        </span>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="font-sans text-muted text-sm mt-2 max-w-[140px] mx-auto leading-snug"
      >
        {label}
      </motion.p>
    </div>
  );
}
