import { motion } from 'framer-motion';

// PLACEHOLDER — this is a styled preview, not a live data feed. Instagram does not allow
// pulling a full profile + Reels grid client-side without Meta's Graph API (a Business/Creator
// account + access token, refreshed server-side). To make this genuinely auto-sync with new
// posts, wire this component up to the Instagram Graph API (or a service like Behold / SnapWidget)
// once Dr. Khatri's account is connected as a Business account. Until then, update the
// `reels` array below by hand when there's new content worth featuring.
//
// Name, bio, verified status, and follower/following counts below were pulled from the real
// public profile (instagram.com/vijay.k.khatri) at time of writing — update if they drift.
// PLACEHOLDER — profile photo: Instagram's CDN serves avatars via signed, session-locked URLs
// that reject direct/hotlinked requests (confirmed — returns 403 even with a browser UA and
// referer), so it can't be pulled programmatically. Swap the AvatarMonogram below for an
// <img src="/doctor/ig-avatar.jpg" ... /> once you save the real profile photo from Instagram
// and drop it in /public/doctor/.
// Exact post count wasn't visible in the fetched profile data — left as an approximate placeholder.

const INSTAGRAM_HANDLE = 'vijay.k.khatri';
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;
const INSTAGRAM_DISPLAY_NAME = 'Vijay Kumar Khatri';
const INSTAGRAM_BIO = 'Turkish Rhinoplasty: Leading Rhinoplasty Surgeon Based in Karachi';

const reels = [
  { src: '/gallery/nose-2-after.webp', views: '48.2K', caption: 'Tip refinement — 3 month result' },
  { src: '/gallery/nose-5-after.webp', views: '112K', caption: 'Bridge refinement walkthrough' },
  { src: '/gallery/nose-1-after.webp', views: '29.6K', caption: 'Primary rhinoplasty reveal' },
  { src: '/gallery/nose-4-after.webp', views: '67.9K', caption: 'Revision case, explained' },
];

const highlights = [
  { label: 'Before/After', src: '/gallery/nose-3-after.webp' },
  { label: 'Recovery', src: '/gallery/nose-6-after.webp' },
  { label: 'Clinic', src: '/gallery/nose-2-after.webp' },
];

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5 drop-shadow">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <svg viewBox="0 0 22 22" fill="#3897F0" className="w-3 h-3 shrink-0">
      <path d="M11 0l1.9 1.6 2.4-.7 1.2 2.2 2.4.5.1 2.5 2 1.4-1 2.3 1 2.3-2 1.4-.1 2.5-2.4.5-1.2 2.2-2.4-.7L11 22l-1.9-1.6-2.4.7-1.2-2.2-2.4-.5-.1-2.5-2-1.4 1-2.3-1-2.3 2-1.4.1-2.5 2.4-.5L7.1.9l2.4.7L11 0z" />
      <path d="M8.3 11.3l1.9 1.9 3.7-4.2" stroke="white" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

// Real photo pending — see PLACEHOLDER note above. A monogram avoids showing an unverified stock
// photo as if it were his actual profile picture.
function AvatarMonogram() {
  return (
    <div className="relative w-14 h-14 rounded-full border-2 border-white bg-clay-gradient flex items-center justify-center">
      <span className="font-serif text-white text-lg font-semibold">VK</span>
    </div>
  );
}

export default function InstagramPhoneMockup() {
  return (
    <div className="relative mx-auto w-[260px] sm:w-[280px] select-none">
      {/* Live-sync pill */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-charcoal text-white text-[10px] font-sans font-medium tracking-wide px-3 py-1.5 rounded-full shadow-card whitespace-nowrap"
      >
        <span className="relative flex w-1.5 h-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-400" />
        </span>
        @{INSTAGRAM_HANDLE}
      </motion.div>

      {/* Phone frame */}
      <div className="relative rounded-[2.5rem] bg-charcoal p-2.5 shadow-card-hover">
        {/* Side buttons */}
        <div className="absolute -left-[2px] top-24 w-[2px] h-6 bg-charcoal/70 rounded-l-sm" />
        <div className="absolute -left-[2px] top-32 w-[2px] h-10 bg-charcoal/70 rounded-l-sm" />
        <div className="absolute -right-[2px] top-28 w-[2px] h-14 bg-charcoal/70 rounded-r-sm" />

        {/* Screen */}
        <div className="relative rounded-[2rem] overflow-hidden bg-white aspect-[9/19] flex flex-col">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-charcoal rounded-b-2xl z-20" />

          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-2 pb-1 text-charcoal">
            <span className="font-sans text-[9px] font-semibold">9:41</span>
            <div className="flex items-center gap-1">
              <svg viewBox="0 0 16 16" className="w-2.5 h-2.5" fill="currentColor"><path d="M1 11h2v3H1zM5 8h2v6H5zM9 5h2v9H9zM13 2h2v12h-2z"/></svg>
              <svg viewBox="0 0 16 16" className="w-2.5 h-2.5" fill="currentColor"><path d="M8 3c-2.5 0-4.8 1-6.5 2.6l1.4 1.4C4.2 5.7 6 5 8 5s3.8.7 5.1 2l1.4-1.4C12.8 4 10.5 3 8 3zm0 4c-1.4 0-2.7.6-3.6 1.5l1.4 1.4c.6-.6 1.4-.9 2.2-.9s1.6.3 2.2.9l1.4-1.4C10.7 7.6 9.4 7 8 7zm0 4a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/></svg>
            </div>
          </div>

          {/* IG header */}
          <div className="flex items-center justify-between px-3 py-1.5">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-charcoal">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H6.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L6.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
            <div className="flex items-center gap-1">
              <span className="font-sans text-[11px] font-semibold text-charcoal">{INSTAGRAM_HANDLE}</span>
              <VerifiedBadge />
            </div>
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-charcoal">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </div>

          {/* Profile row */}
          <div className="flex items-center gap-4 px-4 py-2">
            <div className="relative shrink-0">
              <div className="absolute -inset-[2px] rounded-full bg-clay-gradient" />
              <div className="relative">
                <AvatarMonogram />
              </div>
            </div>
            <div className="flex gap-3 flex-1 justify-around text-center">
              <div>
                <p className="font-sans text-[12px] font-semibold text-charcoal leading-none">300+</p>
                <p className="font-sans text-[9px] text-muted mt-1">Posts</p>
              </div>
              <div>
                <p className="font-sans text-[12px] font-semibold text-charcoal leading-none">10.6K</p>
                <p className="font-sans text-[9px] text-muted mt-1">Followers</p>
              </div>
              <div>
                <p className="font-sans text-[12px] font-semibold text-charcoal leading-none">197</p>
                <p className="font-sans text-[9px] text-muted mt-1">Following</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="px-4 pb-2">
            <div className="flex items-center gap-1">
              <p className="font-sans text-[11px] font-semibold text-charcoal leading-tight">{INSTAGRAM_DISPLAY_NAME}</p>
              <VerifiedBadge />
            </div>
            <p className="font-sans text-[10px] text-muted leading-snug mt-0.5">
              {INSTAGRAM_BIO}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 px-4 pb-3">
            <div className="flex-1 bg-clay text-white text-center font-sans text-[10px] font-semibold py-1.5 rounded-lg">
              Follow
            </div>
            <div className="flex-1 bg-charcoal/5 text-charcoal text-center font-sans text-[10px] font-semibold py-1.5 rounded-lg">
              Message
            </div>
          </div>

          {/* Highlights */}
          <div className="flex gap-3 px-4 pb-3">
            {highlights.map((h) => (
              <div key={h.label} className="flex flex-col items-center gap-1 shrink-0">
                <div className="w-10 h-10 rounded-full p-[1.5px] border border-charcoal/15">
                  <img src={h.src} alt={h.label} className="w-full h-full rounded-full object-cover" />
                </div>
                <span className="font-sans text-[7px] text-muted whitespace-nowrap">{h.label}</span>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex border-t border-charcoal/10">
            <div className="flex-1 flex items-center justify-center py-2 text-charcoal/30">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M2 3h6v6H2V3zm0 8h6v6H2v-6zm8-8h6v6h-6V3zm0 8h6v6h-6v-6z" /></svg>
            </div>
            <div className="flex-1 flex items-center justify-center py-2 text-clay border-b-2 border-clay">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M4 3.5a1.5 1.5 0 012.316-1.262l9 6.5a1.5 1.5 0 010 2.524l-9 6.5A1.5 1.5 0 014 16.5v-13z" /></svg>
            </div>
            <div className="flex-1 flex items-center justify-center py-2 text-charcoal/30">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><circle cx="10" cy="6" r="3" /><path d="M4 18a6 6 0 0112 0H4z" /></svg>
            </div>
          </div>

          {/* Reels grid — the "top of profile" video content */}
          <div className="grid grid-cols-2 gap-[1.5px] flex-1 bg-charcoal/10 overflow-hidden">
            {reels.map((reel, i) => (
              <div key={i} className="relative bg-charcoal overflow-hidden">
                <img src={reel.src} alt={reel.caption} className="w-full h-full object-cover opacity-90" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                <div className="absolute top-1.5 left-1.5">
                  <PlayIcon />
                </div>
                <p className="absolute bottom-1.5 left-1.5 font-sans text-[8px] font-semibold text-white flex items-center gap-0.5">
                  <PlayIcon />
                  {reel.views}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tap-through hint */}
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        id="phone-mockup-instagram-link"
        className="absolute inset-0 z-10 rounded-[2.5rem]"
        aria-label={`View @${INSTAGRAM_HANDLE} on Instagram`}
      />
    </div>
  );
}
