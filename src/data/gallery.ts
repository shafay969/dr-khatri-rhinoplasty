// Gallery image pair configuration.
// Images are served from /public/gallery/
// Naming: nose-1-before.webp / nose-1-after.webp (rhinoplasty pairs)
// Drop images into /public/gallery/ — no code changes needed to add new pairs.

export interface GalleryPair {
  id: string;
  category: 'rhinoplasty' | 'full-face';
  before: string;
  after: string;
  label: string;
}

export const galleryPairs: GalleryPair[] = [
  {
    id: 'nose-1',
    category: 'rhinoplasty',
    before: '/gallery/nose-1-before.webp',
    after: '/gallery/nose-1-after.webp',
    label: 'Primary Rhinoplasty',
  },
  {
    id: 'nose-2',
    category: 'rhinoplasty',
    before: '/gallery/nose-2-before.webp',
    after: '/gallery/nose-2-after.webp',
    label: 'Tip Refinement',
  },
  {
    id: 'nose-3',
    category: 'rhinoplasty',
    before: '/gallery/nose-3-before.webp',
    after: '/gallery/nose-3-after.webp',
    label: 'Dorsal Hump Reduction',
  },
  {
    id: 'nose-4',
    category: 'rhinoplasty',
    before: '/gallery/nose-4-before.webp',
    after: '/gallery/nose-4-after.webp',
    label: 'Revision Rhinoplasty',
  },
];

// Teaser pairs shown on the Home page (first 3)
export const teaserPairs = galleryPairs.slice(0, 3);
