import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
}

interface StepProcessProps {
  steps: Step[];
}

export default function StepProcess({ steps }: StepProcessProps) {
  return (
    <div className="relative">
      {/* Connecting line (desktop) */}
      <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-clay/30 to-transparent" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
            className="flex flex-col items-center text-center gap-4"
          >
            {/* Number circle */}
            <div className="relative w-20 h-20 rounded-full bg-clay/10 border border-clay/30 flex items-center justify-center group-hover:bg-clay/20 transition-colors">
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-clay flex items-center justify-center">
                <span className="font-sans text-[10px] font-bold text-charcoal">{step.number}</span>
              </span>
              <div className="text-clay w-8 h-8">{step.icon}</div>
            </div>

            <div>
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">{step.title}</h3>
              <p className="font-sans text-muted text-sm leading-relaxed">{step.description}</p>
            </div>

            {/* Connector arrow (mobile) */}
            {i < steps.length - 1 && (
              <div className="md:hidden text-clay/40 text-2xl">↓</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
