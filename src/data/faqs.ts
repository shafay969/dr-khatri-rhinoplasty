// PLACEHOLDER — demo content. Have Dr. Khatri review and approve all clinical
// claims and figures before this goes live.

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: 'pain-downtime',
    question: 'Is rhinoplasty painful, and how much downtime do I actually need?',
    answer:
      "Less painful than most people brace for, honestly. Most patients describe the first two or three days as pressure and stuffiness rather than sharp pain — think a bad sinus cold, not a toothache — and it's well controlled with medication. The splint comes off around day 6 to 7, and most people feel comfortable returning to a desk job or online classes within 7 to 10 days, once any visible bruising has faded or is easily covered. Physical activity, gym sessions, and anything that could bump the nose need to wait 4 to 6 weeks. If your work is more physically demanding, we'll plan the timeline around that specifically at your consultation.",
  },
  {
    id: 'looking-fake',
    question: "Will my nose look obviously “done,” or fake?",
    answer:
      "That's genuinely the outcome I'm working to avoid, and it's the whole reasoning behind the structural, cartilage-preserving approach we use rather than aggressively shaving cartilage away. An over-reduced nose is what tends to read as “surgical” years down the line — pinched, hollow, disconnected from the rest of the face. A well-planned rhinoplasty is built to look like it belongs on you, respecting your existing bone structure, skin thickness, and facial proportions rather than chasing a generic template. The best compliment I get from patients isn't “your nose looks amazing” — it's “nobody can tell, they just think I look better.”",
  },
  {
    id: 'cost-karachi',
    question: "What does rhinoplasty with Dr. Khatri actually cost in Karachi?",
    answer:
      "It genuinely depends on what your nose needs — a primary rhinoplasty with straightforward tip and bridge refinement costs less than a structural rebuild involving rib cartilage grafting or a revision of prior surgery, since the complexity, operating time, and materials involved are different. We don't quote a number over the phone or by email for exactly that reason; it wouldn't be an honest figure until we've actually examined your anatomy. What I can tell you is that the consultation itself is where you'll get a real, itemized estimate, and there's no obligation attached to booking one.",
  },
  {
    id: 'functional-breathing',
    question: "Can rhinoplasty fix breathing problems too, or is it purely cosmetic?",
    answer:
      "It absolutely can, and honestly, I think it's a missed opportunity when it doesn't. A deviated septum, collapsed nasal valves, or enlarged turbinates can all be corrected in the same surgery as a cosmetic refinement — that combination is sometimes called a septorhinoplasty. If you've dealt with chronic congestion, mouth-breathing at night, or one nostril that's always felt more blocked than the other, it's worth mentioning during your consultation even if breathing wasn't your main reason for coming in. A lot of patients are surprised to learn the two issues were connected the whole time.",
  },
  {
    id: 'good-candidate-turkish-technique',
    question: "How do I know if I'm a good candidate for the structural, Turkish-technique approach?",
    answer:
      "Almost everyone is, structurally speaking — it's less about qualifying for the technique and more about whether it's the right fit for your goals and anatomy, which we figure out together at the consultation. A few things matter more than others: your skin thickness, how much cartilage you have available (including whether septal cartilage alone is enough or rib cartilage might be needed), and realistic expectations about what your specific nose and skin can achieve. The honest exceptions are usually medical — certain bleeding disorders, active nasal infections, or being under 16 to 18 depending on facial growth completion. Beyond that, the best way to know is to actually sit down, have your anatomy examined, and ask direct questions. That's what the consultation is for.",
  },
  {
    id: 'non-surgical-option',
    question: 'Do you offer non-surgical rhinoplasty (filler), or only surgery?',
    answer:
      "It comes up a lot, usually from someone who's already had filler elsewhere and is trying to figure out what it actually did. The honest short answer is that filler and surgery solve different problems — filler adds volume to camouflage small irregularities, it can't reduce a hump or make a nose smaller, and it's temporary, needing a touch-up roughly every nine to eighteen months. If what you actually want is a smaller, straighter nose or a fix for a breathing issue, surgery is the only real path there. We've written a full, honest breakdown of what filler can and can't do on the blog — worth a read before you book anything, surgical or not, so you're spending your time and money on the option that actually matches what you want.",
  },
];
