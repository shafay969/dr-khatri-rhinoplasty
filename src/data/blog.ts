// PLACEHOLDER — editorial content written for demo purposes. Have Dr. Khatri review
// and approve all clinical claims before this goes live; nothing here should be
// treated as medical advice for an actual patient.

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readTime: string;
  coverGradient: string; // tailwind gradient utility classes — fallback wash behind `cover`
  cover: string; // path to cover illustration in /public/blog/
  content: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-choose-a-rhinoplasty-surgeon-in-karachi',
    title: 'How to Choose a Rhinoplasty Surgeon in Karachi (Without Getting Burned)',
    excerpt:
      "Karachi has no shortage of people willing to do your rhinoplasty. It has a much shorter list of people qualified to. Here's how to actually tell the difference before you book.",
    category: 'Patient Guide',
    date: '2026-08-22',
    readTime: '5 min read',
    coverGradient: 'from-sage via-clay-dark to-charcoal',
    cover: '/blog/choosing-a-surgeon.svg',
    content: [
      {
        paragraphs: [
          "I get asked some version of “how do I know you're actually good at this” a lot less often than I'd expect, given what's at stake. Most people research a laptop purchase harder than they research the person who's going to reshape their face. That's not a criticism — it's just that the aesthetic clinic industry in Karachi has gotten very good at looking uniformly polished, and glossy Instagram ads make an unqualified injector and a fellowship-trained surgeon look identical at a glance. So here's the actual list I'd want someone I cared about to work through before booking anyone — including me.",
        ],
      },
      {
        heading: "Verify the Certification, Don't Just Read It",
        paragraphs: [
          "Anyone can put “cosmetic surgeon” on a sign. In Pakistan, that phrase has no protected legal meaning the way “board-certified plastic surgeon” or a PM&DC-registered specialization does. A real surgical qualification for rhinoplasty means either a plastic surgery residency or an ENT/facial plastics specialization with documented rhinoplasty training on top of it — not a weekend certificate course, which is unfortunately a real category of “training” some injectors use to start offering surgical procedures they were never trained to perform. Ask directly which body they're registered with and what their specific qualification is, then actually look it up rather than taking the answer at face value. A surgeon with nothing to hide will never be defensive about this question.",
        ],
      },
      {
        heading: "Ask About Their Revision Rate — Not Just Their Best Five Photos",
        paragraphs: [
          "Every practice, mine included, shows you a curated gallery. That's not dishonest, but it's also not the full picture, and a gallery alone can't tell you how often a surgeon's own primary cases need to be redone. A surgeon who gives you an honest, specific revision rate — and can explain what typically causes the revisions they have done — is telling you more than one who claims a suspiciously perfect record. Nobody in this field bats a thousand. The ones who say they do are the ones I'd be more cautious about, not less.",
        ],
      },
      {
        heading: "Does Their Portfolio Include Noses Like Yours?",
        paragraphs: [
          "A stunning transformation on thin, tightly-draping skin tells you very little about what's achievable on thicker South Asian skin, which behaves differently under the same surgical plan — it's a distinction we've written about at length on this blog. When you're looking through a surgeon's before-and-afters, look specifically for patients with your skin thickness and your starting nasal shape, not just the most dramatic case in the album. If a practice can't show you several examples that resemble your own anatomy, that's worth asking about directly rather than assuming the technique will translate.",
        ],
      },
      {
        heading: 'What "Trained in Turkey" or Any Credential Actually Means',
        paragraphs: [
          "Training location gets thrown around as a credential in itself, and it shouldn't be — it's a starting point for a follow-up question, not an answer. What matters is what someone actually learned and how they apply it: structural grafting versus reductive shaving, open versus closed technique, and whether they can explain their reasoning for your specific nose rather than reciting a technique's reputation. If a surgeon can't explain, in plain language, what they'd actually do differently for your anatomy and why, the pedigree on the wall isn't doing the work you're paying for.",
        ],
      },
      {
        heading: "A Real Consultation Feels Like an Exam, Not a Sales Pitch",
        paragraphs: [
          "This is probably the fastest tell of all. A consultation genuinely built around your case should include a physical examination of your skin, cartilage, and nasal airway — not just a five-minute conversation followed by a quote. If breathing and airway function never come up, even briefly, that's a gap, since the two are more connected than most patients realize. Same-day discounts, pressure to “lock in the price today,” and vague non-answers about risk are the pattern to watch for. A surgeon confident in their own work doesn't need urgency tactics to get you to book.",
        ],
      },
      {
        heading: 'The Short Version',
        paragraphs: [
          "Verify the certification instead of reading it at face value, ask for an honest revision rate, look for patients who actually resemble your anatomy in the portfolio, get a specific answer about technique rather than a credential recited like a slogan, and pay attention to whether the consultation examines you or just sells to you. None of that is exotic advice. It's just the difference between choosing a surgeon and choosing an advertisement — and it's worth the extra hour of research before you commit to something this permanent.",
        ],
      },
    ],
  },
  {
    slug: 'non-surgical-rhinoplasty-vs-surgery-karachi',
    title: "The Liquid Nose Job Boom in Karachi: What Filler Can Actually Fix (and What It Can't)",
    excerpt:
      "Filler promises a nose job with no scalpel and no downtime. It genuinely helps some noses — and quietly complicates others down the line. Here's the honest, unsponsored breakdown.",
    category: 'Non-Surgical Options',
    date: '2026-08-10',
    readTime: '6 min read',
    coverGradient: 'from-clay-dark via-charcoal to-sage-dark',
    cover: '/blog/non-surgical-vs-surgical.svg',
    content: [
      {
        paragraphs: [
          "At least a couple of times a month, someone sits down for a consultation and opens with some version of: “I actually already tried to fix this — with filler, a few months ago.” Sometimes it under-corrected and they want to know if surgery is the “real” fix. Sometimes filler did something they didn't expect, and they're not entirely sure what's going on under the skin anymore. Either way, it's clear the “liquid nose job” has become most people's first stop before they ever think about surgery — Karachi especially, where a filler appointment is easier to book than a proper consultation. So it's worth being plain about what it actually does, because the marketing around it blurs a distinction that matters: filler adds volume. Surgery removes, repositions, and rebuilds it. Those aren't two versions of the same procedure — they're different tools solving different problems.",
        ],
      },
      {
        heading: 'What a “Liquid Nose Job” Is Actually Doing',
        paragraphs: [
          "Non-surgical rhinoplasty is dermal filler — almost always hyaluronic acid — injected at specific points along the bridge or tip to change how the nose reads from the front or in profile. It isn't reshaping cartilage or bone. It's adding small, precise deposits of volume in places that create the illusion of a straighter or more balanced line.",
          "The classic example is camouflaging a mild dorsal hump: instead of removing the bump, an injector adds filler just above and below it, so the bridge appears to run straight even though the hump is technically still sitting there underneath. It's a genuinely clever trick of the eye, and in skilled hands it can look convincing in photos. But the underlying structure hasn't changed at all — you've built scaffolding around the problem, not solved it.",
        ],
      },
      {
        heading: 'What It Can Genuinely Help With',
        paragraphs: [
          "I'm not going to pretend filler is only for people who don't know better. There are situations where it does a reasonable job: a small dorsal depression or asymmetry, a tip that could use a touch more definition or a subtle lift, minor irregularities left over from a previous rhinoplasty that don't justify redoing the whole surgery. For someone who wants a preview of what a slightly different nose might look like before committing to anything permanent, it can work as a genuinely useful, low-stakes trial — as long as everyone's honest that it's temporary and additive, not corrective.",
        ],
      },
      {
        heading: 'What Filler Cannot Do, No Matter How Good the Injector Is',
        paragraphs: [
          "This is the part that gets glossed over in a lot of the marketing I see: filler cannot make a nose smaller. It cannot reduce a prominent hump, narrow wide nasal bones, or lift a tip that's being pulled down by cartilage rather than skin. It cannot fix a breathing problem — a deviated septum or a collapsed nasal valve doesn't respond to volume, because the issue was never a shortage of tissue. If what you actually want is a smaller, straighter, or more refined nose, filler is working against that goal, not toward it, since you'd be adding material to a nose you want to look less prominent.",
          "There's a risk here that doesn't get enough airtime, too: the nose has an unusually unforgiving blood supply for filler work. Injected into or too close to the wrong vessel, it can cut off blood flow to the skin — and in rare, well-documented cases, to the retina. It isn't common, but it's serious enough that it should only ever be done by someone with real, specific training in nasal vascular anatomy, not just general facial filler experience. That's not a scare tactic. It's probably the single most important safety fact about nasal filler that patients are rarely told upfront.",
        ],
      },
      {
        heading: "Why It's Become So Popular in Karachi Specifically",
        paragraphs: [
          "Some of this is the obvious appeal — no anesthesia, a fifteen-minute appointment, no time off work or college, a price tag that feels far more approachable than surgery. But a lot of it is also sheer availability. Filler is offered at a huge range of clinics and dermatology practices across the city, often by people with genuine skill in general facial aesthetics but limited, specific training in nasal anatomy — which is a narrower and considerably less forgiving subspecialty than cheek or lip filler. Combine an easy, walk-in-friendly procedure with heavy promotion on social media and a real demand for quick, low-commitment fixes, and it's not surprising it's taken off the way it has.",
        ],
      },
      {
        heading: "The Catch Nobody Mentions: It's Temporary, and It Can Complicate Things Later",
        paragraphs: [
          "Hyaluronic acid filler dissolves. Most patients need a touch-up somewhere between nine and eighteen months to maintain the result, which means the real cost of the “cheaper” option is a recurring one, not a single payment — closer to a subscription than a purchase. That reframing matters more than whatever any individual session costs.",
          "There's a second issue that matters even more if surgery might be in your future: repeated filler in the same spot, over months or years, can build up low-grade scar tissue and fibrosis in the skin and soft-tissue envelope. That doesn't make surgery impossible later, but it does make a surgeon's job harder — dissecting through fibrotic tissue is less predictable than working with a nose that's never been touched, and it can affect how cleanly the skin drapes over new structure underneath. If there's a real chance you'll want a permanent surgical correction down the line, that's a conversation worth having with a surgeon before you start a long-term filler routine, not after.",
        ],
      },
      {
        heading: 'So How Do You Actually Decide?',
        paragraphs: [
          "The honest filter is fairly simple. If your main complaint is that your nose is too big, too wide, too bulbous, or you have a breathing issue, filler was never built to solve any of those — no injector can talk their way around that physics, however good they are with a needle. If your concern is a minor irregularity, a small asymmetry, or you genuinely just want to test a subtle change before deciding on anything permanent, filler from someone specifically trained in nasal anatomy is a reasonable, honest choice — provided you go in knowing it's temporary and additive, never corrective.",
          "And if you're not sure which category describes you, that's a completely normal reason to book a consultation rather than a filler appointment first. A good one should be able to tell you plainly whether filler could realistically help, or whether you'd just be spending a year and a half doing touch-ups on a fix that was never going to solve the actual problem.",
        ],
      },
    ],
  },
  {
    slug: 'turkish-rhinoplasty-what-it-actually-means',
    title: "What “Turkish Rhinoplasty” Actually Means (And Why the Name Gets Thrown Around Too Loosely)",
    excerpt:
      "Ask five surgeons what the term means and you'll get five different answers — three of which are really just rhinoplasty with a passport stamp. Here's the actual distinction.",
    category: 'Technique',
    date: '2026-06-02',
    readTime: '7 min read',
    coverGradient: 'from-clay-dark via-clay to-clay-light',
    cover: '/blog/turkish-rhinoplasty.svg',
    content: [
      {
        paragraphs: [
          "Ask five surgeons what “Turkish rhinoplasty” means and you'll get five different answers — three of which are really just rhinoplasty, performed by someone who happened to train in Istanbul. I understand why the term caught on. It sounds precise. It sounds like a technique you can't get anywhere else. But it isn't a brand you can slap on a consultation to make it sound more advanced, and it's worth untangling what the phrase is actually pointing at before you let it influence a decision this personal.",
          "Turkish rhinoplasty isn't a single maneuver or a patented method. It's a structural philosophy that a specific generation of surgeons — many of them Turkish, many of them trained by the same handful of mentors — pushed to the front of the field over the last fifteen years or so. The label stuck because the results were consistent enough that patients started requesting it by name.",
        ],
      },
      {
        heading: "It's About Structure, Not Shortcuts",
        paragraphs: [
          "The core idea is simple to say and harder to execute: instead of shaving cartilage away and hoping the nose settles into a good shape, you rebuild the internal framework — usually with cartilage grafts taken from the septum, ear, or occasionally rib — so the nose has real structural support underneath the skin. Reductive rhinoplasty, the older approach, removes tissue. Structural rhinoplasty adds and reinforces it.",
          "The practical difference shows up years later, not on the operating table. A nose built on structure tends to hold its shape as the skin thins and settles with age. A nose that was mostly reduced can lose definition, or develop that pinched, over-operated look that's become an easy tell of a rhinoplasty gone slightly too far.",
        ],
      },
      {
        heading: 'Why the Distinction Matters More for South Asian Patients',
        paragraphs: [
          "Thicker skin — which is common in South Asian noses — hides fine structural work but also punishes weak structural work. If there isn't enough cartilage support underneath, thick skin will just sag over the gap and blur whatever shape the surgeon was trying to create. I've had patients come in years after a procedure elsewhere, frustrated that the tip never really “finished” refining the way they were told it would. Nine times out of ten, the issue wasn't the skin. It was that nothing structural was placed underneath it to hold the shape once the swelling resolved.",
          "This is really the whole argument for the structural approach on our kind of anatomy. It's not about chasing a trend from Istanbul — it's about matching the technique to the tissue you're actually working with.",
        ],
      },
      {
        heading: 'The Honest Trade-off',
        paragraphs: [
          "Structural work takes longer on the table, usually costs more because of the grafting, and asks more of the surgeon's judgment — there's no shortcut version of harvesting and shaping a graft correctly. It's a legitimate trade-off, not a marketing footnote, and any surgeon who tells you there isn't one probably hasn't done enough revision cases to have learned it the hard way.",
          "So when you're sitting in a consultation and the term “Turkish rhinoplasty” comes up, the useful follow-up question isn't “where did you train.” It's “what are you actually going to do differently for my nose, structurally, and why.” If the answer is specific, you're probably in good hands. If it's just the name, keep asking.",
        ],
      },
    ],
  },
  {
    slug: 'rhinoplasty-recovery-timeline-week-by-week',
    title: 'How Long Rhinoplasty Recovery Actually Takes With the Piezo Technique',
    excerpt:
      "No packs, no splints, and a realistic 9-day floor for the early recovery — but 'early recovery' and 'final result' are still two different milestones. Here's the honest timeline.",
    category: 'Recovery',
    date: '2026-05-14',
    readTime: '7 min read',
    coverGradient: 'from-sage-dark via-sage to-sage-light',
    cover: '/blog/recovery-timeline.svg',
    content: [
      {
        paragraphs: [
          "Almost every patient asks some version of the same question at their pre-op appointment: “when will I look normal again?” The answer has genuinely changed for a lot of my patients since I moved to Piezo — Harmonic ultrasonic instrumentation for the bone work, instead of a traditional hammer and chisel. It's a real, meaningful difference in how the first two weeks feel. What hasn't changed is that “early recovery” and “final result” are still two different milestones, and conflating them is where most of the disappointment I see actually comes from.",
        ],
      },
      {
        heading: 'Days 1–9: The Part That Used to Be Miserable',
        paragraphs: [
          "This is where the Piezo technique makes the biggest practical difference. Because the ultrasonic instrument sculpts bone without the blunt trauma a hammer and chisel cause to the surrounding tissue, most patients don't need nasal packing or an external splint at all — and the early recovery most people dread is realistically down to about 9 days rather than the 10-to-14-day window that's typical with traditional instrumentation. Pain is minimal for most patients; a few days of mild discomfort rather than the “hit in the face” sensation older techniques are known for. Bruising still happens, especially under the eyes, and that's normal — it isn't a preview of the final shape.",
        ],
      },
      {
        heading: 'Weeks 2–4: Back in the World, Still Settling',
        paragraphs: [
          "This is when most people return to work or classes, and by now residual bruising is usually gone or easily covered. The nose looks presentable to a stranger, but it isn't finished — the tip in particular is typically the last area to settle, and it can stay slightly firm for months, which surprises people who expected everything to soften evenly right after the fast early recovery.",
          "Numbness across the tip and upper lip is still common through this stretch, even with a technique that causes less tissue trauma overall — it's from the nerves adjusting after surgery, not a complication, and it resolves gradually over weeks to months.",
        ],
      },
      {
        heading: 'Months 2–6: The Part No Technique Speeds Up',
        paragraphs: [
          "This is the honest caveat I make sure every patient hears before surgery, Piezo or not: a faster, gentler early recovery is not the same thing as a faster final result. Swelling reduction and the skin draping fully over the new structure underneath is a tissue-healing process, and it runs on its own timeline regardless of which instrument shaped the bone. It recedes in small increments — most noticeable morning versus evening — and most patients stop thinking about their nose day-to-day around the two-to-three month mark, even though a trained eye can still see refinement happening well past that.",
        ],
      },
      {
        heading: 'Month 12 and Beyond: The Real Final Result',
        paragraphs: [
          "I still tell every patient to hold their final judgment until at least the one-year mark, and for thicker-skinned noses, sometimes eighteen months. Piezo has changed how the first two weeks feel, genuinely for the better — it hasn't changed how long it takes skin and soft tissue to finish healing. Rushing to judge the result at month three does the surgery a disservice either way.",
          "If there's one thing I'd want a prospective patient to walk away with, it's this: the easier early recovery is real and worth knowing about, but patience for the final result is still part of the procedure, not separate from it.",
        ],
      },
    ],
  },
  {
    slug: 'rhinoplasty-south-asian-noses-what-is-different',
    title: 'Rhinoplasty on South Asian Noses: What Is Genuinely Different, Not Just Marketing',
    excerpt:
      "Thicker skin, different cartilage, different aesthetic goals from patient to patient. A straightforward look at why one technique doesn't fit every nose.",
    category: 'Technique',
    date: '2026-04-22',
    readTime: '6 min read',
    coverGradient: 'from-charcoal via-clay-dark to-clay',
    cover: '/blog/south-asian-noses.svg',
    content: [
      {
        paragraphs: [
          "A lot of what gets written about “ethnic rhinoplasty” online is either overly clinical or, honestly, a little reductive — as if every South Asian patient walks in wanting the same nose. They don't. What they do tend to share are a few anatomical patterns that change how I approach the surgery, and those are worth explaining plainly.",
        ],
      },
      {
        heading: 'Skin Thickness Changes What’s Actually Achievable',
        paragraphs: [
          "Skin on South Asian noses tends to run thicker and often has more sebaceous (oil-gland) tissue than the thin, tightly draping skin you'll see in a lot of Western rhinoplasty before-and-afters. Thicker skin is more forgiving of small imperfections in the underlying structure — it hides them — but it's also less willing to show off fine, sharp tip definition, no matter how precisely the cartilage underneath is shaped.",
          "This is the single most common expectation gap I see in consultations. A patient brings a reference photo of a very narrow, sharply defined tip, and the honest conversation is about how much of that look is actually the surgery versus how much of it is thin skin doing the surgeon a favor.",
        ],
      },
      {
        heading: 'The Cartilage Is Often Softer, Not Just Smaller',
        paragraphs: [
          "Septal and tip cartilage in many South Asian patients tends to be a bit weaker structurally than what you'd find in some other populations, which affects graft planning. If I know going in that the native cartilage won't hold a shape well on its own, that changes how much reinforcement I build into the plan — sometimes with rib cartilage when septal cartilage alone isn't enough.",
        ],
      },
      {
        heading: 'The Dorsal Hump and Bridge Height Conversation',
        paragraphs: [
          "A lot of patients come in wanting a straighter, higher bridge, and a fair number also want the nose to still look like it belongs on their face — not like a feature borrowed from someone else's. Those two goals aren't in conflict, but they do require restraint. Overbuilding a bridge on a face it wasn't designed for is one of the more common causes of results that look “done” rather than refined.",
          "I'd rather talk a patient down from an unrealistic reference photo during the consultation than have that conversation a year later.",
        ],
      },
      {
        heading: "So What Actually Changes in Practice",
        paragraphs: [
          "In practice: more reliance on structural grafting rather than reduction, more conservative tip work to respect what thicker skin will and won't show, and a lot more conversation up front about which parts of a reference photo are realistic for a given patient's actual anatomy. None of that is exotic. It's just anatomy-specific planning, done honestly instead of by template.",
        ],
      },
    ],
  },
  {
    slug: 'open-vs-closed-rhinoplasty-explained',
    title: "Open vs. Closed Rhinoplasty: The Question Everyone Asks and Nobody Explains Well",
    excerpt:
      "It's not about which one is “better.” It's about which access gives your specific nose the correction it actually needs.",
    category: 'Technique',
    date: '2026-03-30',
    readTime: '6 min read',
    coverGradient: 'from-sage via-charcoal to-sage-dark',
    cover: '/blog/open-vs-closed.svg',
    content: [
      {
        paragraphs: [
          "This comes up in nearly every first consultation, usually phrased as “which one is better?” And I understand the instinct — it feels like a question with a right answer. It isn't, really. Open and closed rhinoplasty are two different ways of getting to the same cartilage, and the right one depends on what needs to be done once you're in there, not on which sounds more advanced.",
        ],
      },
      {
        heading: 'The Actual Difference',
        paragraphs: [
          "Closed rhinoplasty places all incisions inside the nostrils, so there's no external scar at all. Open rhinoplasty adds one small incision across the columella — the strip of skin between the nostrils — which lifts the skin off the entire nasal framework like opening the hood of a car. That extra visibility is the whole point: it lets the surgeon see and measure the cartilage directly instead of working by feel through a smaller opening.",
        ],
      },
      {
        heading: 'When Closed Genuinely Makes Sense',
        paragraphs: [
          "For more limited corrections — smoothing a modest hump, small tip refinements, adjustments that don't require extensive grafting — closed rhinoplasty can achieve an excellent result with less swelling and a faster early recovery, since less tissue is disturbed overall. Surgeons who are highly experienced with it can do remarkably precise work through a closed approach.",
        ],
      },
      {
        heading: 'When Open Is the More Honest Choice',
        paragraphs: [
          "Most structural, graft-heavy rhinoplasty — the kind we talked about in the Turkish rhinoplasty piece on this blog — benefits from an open approach. Placing and securing cartilage grafts with precision is genuinely harder to do accurately through the smaller closed access, especially for revision cases where the anatomy has already been altered once and the margin for error is smaller.",
          "The columellar scar, for what it's worth, is a legitimate consideration but rarely the deciding factor it sounds like on paper. In the vast majority of patients it heals into a thin, barely visible line within several months, tucked into the natural shadow under the tip.",
        ],
      },
      {
        heading: 'The Question Worth Actually Asking',
        paragraphs: [
          "Rather than asking which approach is better in the abstract, ask your surgeon which one they're recommending for your specific correction and why. If the plan involves meaningful structural grafting, be a little skeptical of a surgeon who insists on doing it closed purely to avoid a scar — that's optimizing for the wrong variable. The goal is the best nose, not the smallest incision.",
        ],
      },
    ],
  },
  {
    slug: 'questions-to-ask-before-rhinoplasty-consultation',
    title: 'Ten Questions Worth Asking Before You Book a Rhinoplasty Consultation',
    excerpt:
      "A short, practical list — the kind I'd want my own family to walk in with — for separating a good fit from a good sales pitch.",
    category: 'Patient Guide',
    date: '2026-03-05',
    readTime: '5 min read',
    coverGradient: 'from-clay via-sage-dark to-charcoal',
    cover: '/blog/consultation-questions.svg',
    content: [
      {
        paragraphs: [
          "Consultations can be a little disorienting, especially the first one. There's a lot of information, some of it technical, delivered by someone you've just met about a decision that's going to sit in the middle of your face for the rest of your life. Here's the short list I'd hand my own family before they walked into any surgeon's office — mine included.",
        ],
      },
      {
        heading: '1–3: About the Surgeon',
        paragraphs: [
          "How many rhinoplasties do you perform in a typical year, and what share of those are revisions of someone else's work? A high revision volume isn't automatically a red flag — skilled revision surgeons attract complicated cases — but it's worth understanding the context.",
          "Are you board-certified in a relevant specialty, and can I see genuine before-and-after photos of patients with a similar nose shape or skin type to mine? Ask specifically for patients who look like you, not just the best three photos on the wall.",
          "What's your complication and revision rate, honestly? Any experienced surgeon should be comfortable answering this without getting defensive.",
        ],
      },
      {
        heading: '4–6: About Your Specific Nose',
        paragraphs: [
          "What exactly are you planning to change, structurally, and why? You want a specific answer — “we'll refine the tip” isn't a plan, “we'll place a columellar strut graft to support tip projection because the current cartilage is weak” is.",
          "Given my skin thickness, what's a realistic outcome, and what isn't? A surgeon who tempers a reference photo with honest anatomical limits is doing you a favor, even if it's not what you want to hear in the moment.",
          "Will this affect my breathing, one way or the other? A good rhinoplasty consultation should always touch on function, not just appearance — the two are more connected than most people assume going in.",
        ],
      },
      {
        heading: '7–10: About the Process',
        paragraphs: [
          "What does recovery actually look like at one week, one month, and one year for someone with my anatomy specifically? Vague timelines are a soft warning sign.",
          "What happens if I'm not satisfied with the result — is there a revision policy, and what does it cost? Get this in writing.",
          "Who will actually be doing my surgery, start to finish? In some practices, parts of a procedure are delegated. You should know exactly who's operating.",
          "And finally, the least technical but maybe most important one: do I feel comfortable being honest with this person about what I want? You'll be trusting their judgment on the table when you're not conscious to weigh in. That trust has to be earned in the room, not assumed because of a nice website.",
        ],
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
