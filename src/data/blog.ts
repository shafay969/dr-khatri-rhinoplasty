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
  coverGradient: string; // tailwind gradient utility classes
  content: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'turkish-rhinoplasty-what-it-actually-means',
    title: "What “Turkish Rhinoplasty” Actually Means (And Why the Name Gets Thrown Around Too Loosely)",
    excerpt:
      "Ask five surgeons what the term means and you'll get five different answers — three of which are really just rhinoplasty with a passport stamp. Here's the actual distinction.",
    category: 'Technique',
    date: '2026-06-02',
    readTime: '7 min read',
    coverGradient: 'from-clay-dark via-clay to-clay-light',
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
    title: 'How Long Rhinoplasty Recovery Actually Takes, Week by Week',
    excerpt:
      "Not the sanitized brochure version. What swelling, numbness, and “does this look normal” actually feel like from week one to month twelve.",
    category: 'Recovery',
    date: '2026-05-14',
    readTime: '8 min read',
    coverGradient: 'from-sage-dark via-sage to-sage-light',
    content: [
      {
        paragraphs: [
          "Almost every patient asks some version of the same question at their pre-op appointment: “when will I look normal again?” And almost every patient is a little disappointed by the honest answer, which is that “normal” and “final” are not the same milestone, and the gap between them is longer than most people expect. So here's the version I actually tell patients, not the three-bullet-point version from a brochure.",
        ],
      },
      {
        heading: 'Week 1: The Part Everyone Pictures',
        paragraphs: [
          "The splint comes off around day 6 or 7, and this is usually the moment people brace for the reveal. What you'll actually see is a nose buried under swelling and often some bruising under the eyes — which, to be clear, is completely normal and not a preview of the final shape. Most patients are off strong pain medication by day 3 or 4 and back to reading, working from a laptop, and moving around the house comfortably well before the splint removal.",
        ],
      },
      {
        heading: 'Weeks 2–4: Back in the World, Still Swollen',
        paragraphs: [
          "This is when most people return to work or classes, usually with makeup covering any residual bruising and a nose that looks “post-surgery” to anyone who knew what to look for, but not obviously so to a stranger. The tip is typically the last area to settle — it can stay firm and slightly swollen for months, which surprises people who expected the whole nose to soften evenly.",
          "Numbness across the tip and upper lip is common through this stretch and can genuinely be unsettling if no one warns you about it in advance. It's from the nerves adjusting after being disturbed during surgery, and it resolves gradually over weeks to months, not overnight.",
        ],
      },
      {
        heading: 'Months 2–6: The Slow, Boring, Important Part',
        paragraphs: [
          "Nothing dramatic happens here, which is exactly the point. Swelling recedes in small increments, most noticeably in the morning versus evening, and most patients stop thinking about their nose day-to-day around the two-to-three month mark, even though a trained eye — mine, mostly — can still see refinement happening well past that.",
        ],
      },
      {
        heading: 'Month 12 and Beyond: The Real Final Result',
        paragraphs: [
          "I tell every patient to hold their final judgment until at least the one-year mark, and for thicker-skinned noses, sometimes eighteen months. That's genuinely how long it takes for the last of the swelling to resolve and for the skin to fully drape over the new structure underneath. It's not a caveat I add to manage expectations — it's just how tissue heals, and rushing to judge the result at month three does the surgery a disservice.",
          "If there's one thing I'd want a prospective patient to walk away with, it's this: patience is part of the procedure, not separate from it. The surgery gives the nose its shape. Time is what lets you actually see it.",
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
