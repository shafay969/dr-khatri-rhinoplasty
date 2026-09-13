// Ahmed's testimonial (id 't0') is a real, verified patient story with real before/after photos.
// The remaining entries below are PLACEHOLDER demo content — replace with verified client
// content before launch.

export interface TestimonialPhotoPair {
  before: string;
  after: string;
  label: string;
}

export interface Testimonial {
  id: string;
  name: string;
  procedure: string;
  rating: number;
  text: string;
  initials: string;
  photos?: TestimonialPhotoPair[];
}

export const testimonials: Testimonial[] = [
  {
    id: 't0',
    name: 'Ahmed',
    procedure: 'Rhinoplasty',
    rating: 5,
    text: "I'd been unhappy with my nose for years but kept putting off doing anything about it — I didn't want to end up looking 'operated on'. Dr. Khatri's consultation put that fear to rest immediately; he took the time to actually study my face before suggesting anything, and explained exactly what he'd do and why. The result matches what we talked about almost exactly. My profile feels balanced and it actually fits the rest of my face now, and breathing feels noticeably easier too. Recovery was more manageable than I'd braced myself for — I was back to my normal routine within a few weeks. Months later, I still catch myself checking the mirror longer than I need to.",
    initials: 'A',
    photos: [
      { before: '/testimonials/ahmed-front-before.webp', after: '/testimonials/ahmed-front-after.webp', label: 'Front View' },
      { before: '/testimonials/ahmed-profile-before.webp', after: '/testimonials/ahmed-profile-after.webp', label: 'Side Profile' },
    ],
  },
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
