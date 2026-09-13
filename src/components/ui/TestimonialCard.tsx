import { motion } from 'framer-motion';
import { Testimonial } from '../../data/testimonials';
import BeforeAfterSlider from './BeforeAfterSlider';

interface TestimonialCardProps {
  testimonial: Testimonial;
  delay?: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i < rating ? '#B06A76' : 'none'}
          stroke={i < rating ? '#B06A76' : '#D1D5DB'}
          strokeWidth={1.5}
          className="w-4 h-4"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialCard({ testimonial, delay = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="card p-7 flex flex-col gap-4 hover:shadow-card-hover transition-shadow duration-300"
    >
      {/* Quote mark */}
      <div className="text-clay/25 font-serif text-5xl leading-none select-none">&ldquo;</div>

      <StarRating rating={testimonial.rating} />

      <p className="font-sans text-charcoal/80 text-sm leading-relaxed flex-1">
        {testimonial.text}
      </p>

      {testimonial.photos && testimonial.photos.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {testimonial.photos.map((pair) => (
            <BeforeAfterSlider
              key={pair.label}
              before={pair.before}
              after={pair.after}
              label={pair.label}
            />
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-clay/15 flex items-center justify-center flex-shrink-0">
          <span className="font-serif text-sm font-semibold text-clay">{testimonial.initials}</span>
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-charcoal">{testimonial.name}</p>
          <p className="font-sans text-xs text-muted">{testimonial.procedure}</p>
        </div>
      </div>
    </motion.div>
  );
}
