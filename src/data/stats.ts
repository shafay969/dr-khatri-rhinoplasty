import { business } from './business';

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

// Derive experience from the client-confirmed start year. Unverified procedure,
// satisfaction, and Turkish-training statistics are deliberately omitted.
export const stats: Stat[] = [
  {
    id: 'experience',
    value: new Date().getFullYear() - business.practicingSince,
    suffix: '',
    label: 'Years in Practice',
  },
];

// Only facts already recorded as client-confirmed in business.ts are retained.
// Training dates, published research and clinical-outcome promises need review.
export const credentials = [
  {
    year: String(business.practicingSince),
    title: `Practicing Since ${business.practicingSince}`,
    description: `In clinical practice since ${business.practicingSince}.`,
  },
  {
    year: 'Credentials',
    title: business.credentials.join(' & '),
    description: 'Fellow of the College of Physicians and Surgeons Pakistan, and Member of the Royal College of Surgeons (UK).',
  },
  {
    year: 'Practice',
    title: `${business.hospital.role} — ${business.hospital.name}`,
    description: 'Visiting consultant at MidCiti Hospital, near National Stadium, Karachi.',
  },
];
