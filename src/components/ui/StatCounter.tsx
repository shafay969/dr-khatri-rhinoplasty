interface StatCounterProps {
  value: number;
  suffix: string;
  label: string;
  duration?: number;
}

export default function StatCounter({ value, suffix, label }: StatCounterProps) {
  return (
    <div className="text-center">
      <div className="flex items-end justify-center gap-0.5">
        <span className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal tabular-nums leading-none">{value}</span>
        <span className="font-serif text-2xl md:text-3xl font-bold text-clay mb-1">{suffix}</span>
      </div>
      <p className="font-sans text-muted text-sm mt-2 max-w-[140px] mx-auto leading-snug">{label}</p>
    </div>
  );
}
