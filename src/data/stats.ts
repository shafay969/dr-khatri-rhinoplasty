// `experience` below is confirmed (practicing since 2012). `procedures`,
// `satisfaction`, and `technique` are still unverified placeholder numbers —
// see the SEO follow-up questions for what's still needed before these are
// safe to use in structured data or launch copy.

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  {
    id: 'procedures',
    value: 500,
    suffix: '+',
    label: 'Successful Procedures', // PLACEHOLDER
  },
  {
    id: 'experience',
    value: 14,
    suffix: '+',
    label: 'Years of Surgical Experience', // confirmed — practicing since 2012
  },
  {
    id: 'satisfaction',
    value: 98,
    suffix: '%',
    label: 'Patient Satisfaction Rate', // PLACEHOLDER
  },
  {
    id: 'technique',
    value: 1,
    suffix: '',
    label: 'Turkish-Trained Surgeon in Karachi', // PLACEHOLDER
  },
];

// Credential / timeline items for the About page.
// First four entries below are confirmed (2026-08-24). The remaining two
// are still unverified placeholders — see the SEO follow-up questions for
// what's needed before they're safe to publish as fact.
export const credentials = [
  {
    year: '2012',
    title: 'Practicing Since 2012',
    description: 'Over a decade of dedicated surgical practice in facial plastic and reconstructive surgery.',
  },
  {
    year: 'Board Certified',
    title: 'FCPS (CPSP) & MRCS (UK)',
    description: 'Fellow of the College of Physicians and Surgeons Pakistan, and Member of the Royal College of Surgeons (UK).',
  },
  {
    year: 'Technique',
    title: 'Piezo (Harmonic) Rhinoplasty',
    description: 'Ultrasonic bone-sculpting instrumentation in place of a traditional hammer and chisel — no tissue injury, no nasal packing or splints for most patients, and a recovery timeline as short as 9 days.',
  },
  {
    year: 'Practice',
    title: 'Visiting Consultant — MidCiti Hospital',
    description: 'Operates at MidCiti Hospital, near National Stadium, Karachi, as a visiting consultant.',
  },
  {
    year: '2015',
    title: 'ENT Specialization',
    description: 'Completed residency in Ear, Nose & Throat surgery, building a foundation of functional nasal anatomy.', // UNCONFIRMED — needs verification
  },
  {
    year: '2022',
    title: 'South Asian Anatomy Research',
    description: 'Published work on adapting structural rhinoplasty techniques for South Asian facial anatomy.', // UNCONFIRMED — needs verification
  },
];
