import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  label?: string;
  onOpenLightbox?: (src: string) => void;
}

const MIN = 2;
const MAX = 98;

const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

// Progressive resistance past a boundary — real things slow before they stop
function rubberband(overshoot: number, dimension: number, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

export default function BeforeAfterSlider({ before, after, label, onOpenLightbox }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [position, setPosition] = useState(50); // percentage 0–100
  const [isDragging, setIsDragging] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false });

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const minX = (MIN / 100) * width;
    const maxX = (MAX / 100) * width;
    let x = clientX - rect.left;

    if (x < minX) {
      x = minX - rubberband(minX - x, width);
    } else if (x > maxX) {
      x = maxX + rubberband(x - maxX, width);
    }
    // Safety floor/ceiling so the clipped-image math never divides by ~0
    setPosition(clamp((x / width) * 100, 0.5, 99.5));
  }, []);

  // Pointer Events (mouse/touch/pen unified) with capture — tracking continues
  // 1:1 with the pointer even when it leaves the element's bounds.
  const handlePointerDown = (e: React.PointerEvent) => {
    if (failed) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const endDrag = () => {
    setIsDragging(false);
    setPosition((p) => clamp(p, MIN, MAX)); // settle back from any rubber-banded overshoot
  };

  const allLoaded = failed || (imagesLoaded.before && imagesLoaded.after);

  return (
    <div className="group relative rounded-xl overflow-hidden bg-charcoal shadow-card">
      {/* Label */}
      {label && (
        <div className="absolute top-3 left-3 z-20 bg-charcoal/70 backdrop-blur-sm px-3 py-1 rounded-full">
          <p className="font-sans text-[10px] tracking-widest uppercase text-white/70">{label}</p>
        </div>
      )}

      {/* Lightbox trigger */}
      {onOpenLightbox && (
        <button
          onClick={() => onOpenLightbox(after)}
          aria-label="View full size"
          className="absolute top-3 right-3 z-20 bg-charcoal/70 backdrop-blur-sm p-2 rounded-full text-white/60 hover:text-clay transition-colors duration-200"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </button>
      )}

      {/* Image Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[36vh] max-h-[340px] min-h-[220px] sm:h-auto sm:max-h-none sm:aspect-[3/4] cursor-col-resize select-none touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {failed && <div className="absolute inset-0 z-30 bg-charcoal text-white flex items-center justify-center p-6 text-center font-sans text-sm">Comparison images are unavailable.</div>}
        {/* Skeleton */}
        {!allLoaded && (
          <div className="absolute inset-0 bg-charcoal/20 animate-pulse" />
        )}

        {/* AFTER image (full, underneath) */}
        <img
          src={after}
          alt="After rhinoplasty"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          onLoad={() => setImagesLoaded(p => ({ ...p, after: true }))}
          onError={() => { setFailed(true); setImagesLoaded(p => ({ ...p, after: true })); }}
          draggable={false}
        />

        {/* BEFORE image (clipped) */}
        <div
          className={`absolute inset-0 overflow-hidden ${!isDragging ? 'transition-[width] duration-300 ease-out' : ''}`}
          style={{ width: `${position}%` }}
        >
          <img
            src={before}
            alt="Before rhinoplasty"
            className="absolute inset-0 h-full object-cover"
            style={{ width: `${(100 / position) * 100}%`, maxWidth: 'none' }}
            loading="lazy"
            decoding="async"
            onLoad={() => setImagesLoaded(p => ({ ...p, before: true }))}
            onError={() => { setFailed(true); setImagesLoaded(p => ({ ...p, before: true })); }}
            draggable={false}
          />
        </div>

        {/* Divider line */}
        <div
          className={`absolute inset-y-0 w-0.5 bg-clay z-10 pointer-events-none ${!isDragging ? 'transition-[left] duration-300 ease-out' : ''}`}
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        />

        {/* Handle */}
        <motion.div
          role="slider" tabIndex={failed ? -1 : 0} aria-disabled={failed} aria-label={label ? `${label}: before and after comparison` : 'Before and after comparison'} aria-valuemin={MIN} aria-valuemax={MAX} aria-valuenow={Math.round(position)} aria-valuetext={`${Math.round(position)} percent before image`}
          onKeyDown={(event) => {
            if (failed) return;
            const change = event.key === 'ArrowLeft' ? -5 : event.key === 'ArrowRight' ? 5 : 0;
            if (change || event.key === 'Home' || event.key === 'End') { event.preventDefault(); setPosition(p => event.key === 'Home' ? MIN : event.key === 'End' ? MAX : clamp(p + change, MIN, MAX)); }
          }}
          className={`ba-slider-handle absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-clay shadow-clay flex items-center justify-center border-2 border-white/30 ${!isDragging ? 'transition-[left] duration-300 ease-out' : ''}`}
          style={{ left: `${position}%` }}
          animate={{ scale: isDragging ? 1.15 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onPointerDown={handlePointerDown}
        >
          {/* Left-right arrows */}
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
          </svg>
        </motion.div>

        {/* BEFORE label */}
        <div
          className={`absolute bottom-4 z-10 pointer-events-none ${!isDragging ? 'transition-[left] duration-300 ease-out' : ''}`}
          style={{ left: `${Math.max(position - 2, MIN)}%`, transform: 'translateX(-100%)' }}
        >
          <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/70 whitespace-nowrap px-2">
            Before
          </span>
        </div>

        {/* AFTER label */}
        <div
          className={`absolute bottom-4 z-10 pointer-events-none ${!isDragging ? 'transition-[left] duration-300 ease-out' : ''}`}
          style={{ left: `${Math.min(position + 2, MAX)}%` }}
        >
          <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/70 whitespace-nowrap px-2">
            After
          </span>
        </div>
      </div>
    </div>
  );
}
