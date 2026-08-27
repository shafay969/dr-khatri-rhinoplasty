// Confirmed real business facts, provided directly by the client 2026-08-24.
// This is the ONLY file that should feed schema.org structured data with
// business/credential facts — see .claude/skills/medical-local-seo/SKILL.md
// for why that boundary matters (YMYL structured data must be verifiable).
//
// Still unconfirmed / needed: exact MBBS year & institution, ENT residency
// specifics, ultrasonic/piezo training details, clinic hours, procedure
// count / satisfaction rate, Google Business Profile status. Do not add
// those to this file until confirmed — see the SEO follow-up questions
// raised alongside this file for the full list.

export const business = {
  legalName: 'Dr. Vijay Kumar Khatri',
  displayName: 'Dr. Vijay Khatri',
  practicingSince: 2012,
  credentials: ['FCPS (CPSP)', 'MRCS (UK)'],
  specialty: 'Piezo (Harmonic) Rhinoplasty',
  telephone: '+923332572052',
  hospital: {
    name: 'MidCiti Hospital',
    role: 'Visiting Consultant',
    addressLocality: 'Gulshan-e-Iqbal',
    addressRegion: 'Karachi',
    description: 'Near National Stadium, Karachi',
    // Resolved 2026-08-24 from https://maps.app.goo.gl/rU1FBKaXKxGtPLAb9
    latitude: 24.8977718,
    longitude: 67.0784749,
  },
} as const;
