// PLACEHOLDER — replace with verified client content before launch
// All testimonials below are demo content for pitch purposes only.

export interface Testimonial {
  id: string;
  name: string;
  procedure: string;
  rating: number;
  text: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Ayesha R.',
    procedure: 'Rhinoplasty',
    rating: 5,
    // PLACEHOLDER — demo testimonial
    text: 'I was nervous about looking "done" or unnatural, but Dr. Khatri understood exactly what I wanted. Months later, people just say I look refreshed — nobody guesses I had surgery.',
    initials: 'AR',
  },
  {
    id: 't2',
    name: 'Bilal S.',
    procedure: 'Revision Rhinoplasty',
    rating: 5,
    // PLACEHOLDER — demo testimonial
    text: 'After a disappointing first surgery elsewhere, Dr. Khatri corrected everything I was unhappy with. The difference in both how it looks and how I breathe is night and day.',
    initials: 'BS',
  },
  {
    id: 't3',
    name: 'Sana M.',
    procedure: 'Rhinoplasty',
    rating: 5,
    // PLACEHOLDER — demo testimonial
    text: 'The consultation alone told me he actually listens. He didn\'t push one generic "ideal nose" — he worked with my face.',
    initials: 'SM',
  },
  {
    id: 't4',
    name: 'Hassan T.',
    procedure: 'Rhinoplasty',
    rating: 5,
    // PLACEHOLDER — demo testimonial
    text: 'Booked through WhatsApp, had my consultation within the week, and the whole process felt organized and professional from day one.',
    initials: 'HT',
  },
];
