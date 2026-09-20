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
  {
    id: 'revision-when-and-how',
    question: "My first rhinoplasty didn't turn out right — how soon can I get revision surgery, and can it actually be fixed?",
    answer:
      "It depends heavily on how long ago your first surgery was. Swelling and soft tissue take a full year to fully settle, sometimes longer on thicker skin, so a nose that still looks off at four or six months is very often mid-healing rather than a finished, failed result — operating again before that year is up makes the second surgery less predictable, not more precise. Once you're past that mark, whether it's fixable depends on what's actually wrong: over-reduction, asymmetry, or a breathing problem from a collapsed nasal valve are all things a skilled revision surgeon can usually improve, though revision surgery works through scar tissue and is genuinely harder than a first operation, so 'improved' and 'perfect' aren't always the same promise. We've written a full breakdown of what revision surgery involves — including why rib cartilage sometimes becomes necessary the second time around — on the blog.",
  },
  {
    id: 'male-rhinoplasty-different',
    question: 'Is rhinoplasty for men actually different from a nose job for women, or is it the same surgery?',
    answer:
      "It's a genuinely different aesthetic target, not just a smaller version of the same plan. Most rhinoplasty conventions — a scooped, slightly concave bridge, a narrow and upturned tip — were built around what reads as balanced on a female face, and applying that same blueprint to a man tends to produce a nose that looks disconnected from a stronger jaw and brow. Male rhinoplasty generally aims for a straighter, sometimes even very slightly convex dorsal line and a tip that's refined without being narrowed into something delicate. Men also tend to have thicker, oilier skin, which affects how much fine tip definition is realistically achievable. If you're a man considering rhinoplasty, it's worth asking specifically to see a surgeon's male rhinoplasty results rather than judging from a general portfolio — we go into this in more depth on the blog.",
  },
  {
    id: 'minimum-age',
    question: "What's the right age to get rhinoplasty — is there a minimum, or a point where it's too late?",
    answer:
      "There's a genuine medical minimum on the young end: facial growth, including the nasal structure, generally needs to be complete before surgery, which typically means around 15 to 16 for girls and a year or two later for boys, though we confirm this individually rather than by a fixed number alone. Operating before growth is finished risks the nose developing unpredictably afterward. There's no meaningful upper age limit — I've operated on patients well into their fifties and sixties for both cosmetic and functional reasons, and healthy adults of any age can generally be good candidates, provided there's no medical condition that makes anesthesia or healing riskier. Age itself is rarely the deciding factor; overall health and realistic expectations matter more.",
  },
  {
    id: 'scarring-aftercare',
    question: 'Will rhinoplasty leave a visible scar, and how do I take care of it afterward?',
    answer:
      "For closed rhinoplasty, there's no external scar at all — every incision sits inside the nostrils. For open rhinoplasty, there's one small incision across the columella, the strip of skin between the nostrils, and in the vast majority of patients it heals into a thin, barely visible line within several months, tucked into a natural shadow under the tip. Keeping it out of direct sun for the first few months, applying a scar-supportive ointment if we recommend one at your follow-up, and avoiding picking at any scabbing during early healing all help it settle cleanly. If you're naturally prone to keloid or hypertrophic scarring, mention that at your consultation — it's uncommon on the nose specifically, but it's worth planning around rather than discovering afterward.",
  },
  {
    id: 'consultation-what-to-bring',
    question: 'What should I actually bring to my first rhinoplasty consultation to get the most out of it?',
    answer:
      "Bring reference photos if you have them — not to copy exactly, but to give us a concrete starting point for what you're drawn to, which we can then weigh against what your specific skin and cartilage can realistically achieve. Bring a list of any medications, supplements, or health conditions, since some of those affect bleeding risk or anesthesia planning. If breathing has ever been an issue — chronic congestion, one nostril feeling more blocked, snoring — mention it even if it wasn't your main reason for coming in, since it's often correctable in the same surgery. And bring your actual questions, written down if that helps; a rushed consultation where you leave with things unasked is a bad use of the appointment either way.",
  },
  {
    id: 'broken-nose-old-injury',
    question: "I broke my nose years ago and it's been crooked ever since — can rhinoplasty still fix it now?",
    answer:
      "Yes, and this is one of the more common reasons people end up in my consultation room. If a fracture wasn't corrected within the two-or-so-week window when a simple closed reduction could have realigned the bone, it heals into whatever position it landed in — which is exactly what a rhinoplasty addresses, structurally, regardless of how long ago the injury happened. What's worth checking alongside the visible crookedness is whether the septum was deviated in the same injury, since the two are frequently linked and one nostril feeling more blocked than the other since that injury is a real clue, not a separate issue. We've written a full breakdown of nasal injuries and timing on the blog if you want the longer version.",
  },
  {
    id: 'fresh-nasal-fracture-timing',
    question: 'I just broke my nose — how soon do I need to see someone, and is it the same surgery as rhinoplasty?',
    answer:
      "See someone quickly — ideally within about two weeks of a fresh fracture, once initial swelling has settled enough for an accurate exam, but before the bone starts setting in a displaced position. For a straightforward fracture, the right procedure is usually a closed reduction, which is a shorter, simpler operation than a full rhinoplasty and manually repositions the bone back into alignment. It's a different procedure with a different timeline, which is why 'I broke my nose last week' and 'my nose has looked crooked since I broke it years ago' get two genuinely different answers at a consultation.",
  },
  {
    id: 'bulbous-tip-only',
    question: "I don't mind my bridge, I just hate how round and bulbous my nose tip looks — can that be fixed on its own?",
    answer:
      "Very often, yes — tip-only rhinoplasty is one of the more common isolated procedures I perform, and it doesn't require touching the bony bridge at all if that's not part of your complaint. A bulbous look usually comes down to the cartilage that shapes the tip sitting wide or splayed apart rather than close together with defined domes, and it's addressed through targeted suturing and selective cartilage trimming. If your tip also droops noticeably when you smile, mention that specifically — it's frequently caused by a small muscle pulling the tip down rather than the cartilage shape itself, and it changes part of the surgical plan. We go into the detail on the blog.",
  },
  {
    id: 'sleeping-after-rhinoplasty',
    question: 'How am I actually supposed to sleep after rhinoplasty, and for how long?',
    answer:
      "Head elevated above your heart — roughly a 30 to 45 degree incline using a wedge pillow or a few firm pillows stacked behind you — for at least the first one to two weeks, and flat on your back rather than on your side or stomach. Elevation reduces overnight swelling and fluid pooling in the face, and side or stomach sleeping risks pressure against a nose that's still healing while you're unconscious and can't feel it happening. Most patients adjust within a few nights; if you're used to sleeping on your stomach, it's genuinely worth practicing the elevated position for a few nights before surgery rather than making it a new adjustment during recovery itself.",
  },
  {
    id: 'hijab-mask-after-surgery',
    question: 'Can I still wear a hijab, glasses, or a mask during recovery, or does everything have to stay off my face?',
    answer:
      "All three are manageable, it just takes a small adjustment in how they're worn. A hijab is fine early in recovery as long as it's pinned or wrapped so fabric isn't resting with real weight directly across the bridge, especially while a splint is still on — pinning a little further back solves this for most patients. Glasses and sunglasses need to stay off the nose itself for 4 to 6 weeks, since resting frames can leave an indentation or shift the healing structure underneath; contact lenses or temporarily taping frames to the forehead are the usual workarounds. A cloth or surgical mask is fine too, provided the ear loops aren't cinched tight enough to press the mask itself across the bridge. None of this is complicated once you know to plan for it — worth raising at your pre-op appointment if it's part of your daily routine.",
  },
  {
    id: 'glasses-after-surgery',
    question: 'When can I wear glasses or sunglasses again after rhinoplasty?',
    answer:
      "This trips people up more than almost anything else in early recovery, especially patients who wear prescription glasses daily. The bridge of the nose needs to be fully clear of any weight resting on it while the underlying bone and cartilage are still settling into their new position, so glasses of any kind — including sunglasses — should stay off for at least 4 to 6 weeks after surgery, and sometimes longer if your correction involved significant bridge work. Resting frames on the nose too early can leave a visible indentation or, in a worse case, shift the healing structure underneath. If you rely on glasses for daily vision, contact lenses are the easiest workaround during this window, or we can talk through options like taping frames to the forehead temporarily. Worth mentioning at your consultation if you wear glasses regularly, so it's part of the plan rather than a surprise at your first post-op visit.",
  },
];
