// Preserve the existing client-provided Abdullah record and photo references.
// Demonstration testimonials have been removed. Consent records and the text's
// clinical claims still require the practice's documented review before release.

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
    name: 'Abdullah',
    procedure: 'Rhinoplasty',
    rating: 5,
    text: "I'd been unhappy with my nose for years but kept putting off doing anything about it — I didn't want to end up looking 'operated on'. Dr. Khatri's consultation put that fear to rest immediately; he took the time to actually study my face before suggesting anything, and explained exactly what he'd do and why. The result matches what we talked about almost exactly. My profile feels balanced and it actually fits the rest of my face now, and breathing feels noticeably easier too. Recovery was more manageable than I'd braced myself for — I was back to my normal routine within a few weeks. Months later, I still catch myself checking the mirror longer than I need to.",
    initials: 'A',
    photos: [
      { before: '/testimonials/abdullah-front-before.webp', after: '/testimonials/abdullah-front-after.webp', label: 'Front View' },
      { before: '/testimonials/abdullah-profile-before.webp', after: '/testimonials/abdullah-profile-after.webp', label: 'Side Profile' },
    ],
  },
];
