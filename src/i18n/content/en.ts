/**
 * English — the source dictionary. It defines the SHAPE of all copy and holds
 * the non-text data (photos, links, colours). Other locales override strings
 * only (see hi.ts / ur.ts), so structure can never drift between languages.
 *
 * Links are written locale-free ("/#free-consultation"); <SmoothLink> adds the
 * current locale prefix. `*word*` in a title renders as a colour accent.
 */
import type { PhotoKey } from "@/config/photos";

const en = {
  meta: {
    tagline: "Relationship counselling that leads to your divine match",
    description:
      "Free relationship and pre-marriage counselling, the Soul Compass personality quiz, workshops and webinars that guide you toward a lasting, divine match.",
  },

  menu: [
    { href: "/", label: "Home" },
    { href: "/#free-consultation", label: "Free Consultation" },
    { href: "/#personality-quiz", label: "Personality Quiz" },
    { href: "/#workshops", label: "Workshops" },
    { href: "/#webinars", label: "Webinars" },
    { href: "/#get-app", label: "Get the App" },
  ],

  quizCta: { label: "Discover your love type", short: "Your love type", meta: "Soul Compass · 15 min", href: "/#personality-quiz" },

  ribbon: { text: "Your first counselling call is free.", cta: { label: "Book now", href: "/#free-consultation" } },

  heroSlides: [
    {
      typed: "I want someone to really listen",
      sub: "Your first counselling call is free",
      cta: { label: "Book my free call", href: "/#free-consultation" },
      photo: "heroConsult" as PhotoKey,
      alt: "A counsellor listening to a young woman in a calm, bright room",
      focus: "60% 40%",
    },
    {
      typed: "I want to know myself first",
      sub: "Take the Soul Compass quiz",
      cta: { label: "Take the quiz", href: "/#personality-quiz" },
      photo: "heroCompass" as PhotoKey,
      alt: "A young woman sitting quietly under a stone archway, sketching",
      focus: "50% 55%",
    },
    {
      typed: "I want us to be ready for forever",
      sub: "Pre-marriage workshop · 12–13 Dec",
      cta: { label: "Reserve a seat", href: "/#workshops" },
      photo: "heroWorkshop" as PhotoKey,
      alt: "A smiling couple sitting together on a boat at sunset",
      focus: "55% 45%",
    },
    {
      typed: "I want my match in my pocket",
      sub: "The Divine Companion app is coming soon",
      cta: { label: "Get notified", href: "/#get-app" },
      photo: "heroApp" as PhotoKey,
      alt: "A couple laughing together while looking at a phone",
      focus: "45% 40%",
    },
  ],

  statement: "Whether you’re single, engaged, married or a parent — we help you build a relationship that lasts.",

  audienceIntro: {
    title: "Counselling for *every stage* of love",
    body: "Divine Companion pairs free relationship counselling with the Soul Compass personality quiz, live workshops and webinars — so you understand yourself first, then meet a partner who truly fits.",
    explore: "Explore Divine Companion for",
  },

  audiences: [
    { label: "Singles", href: "/#personality-quiz", photo: "cardSingles" as PhotoKey, alt: "A smiling young woman in a red kurta", bg: "#FCE3EC", fg: "#24132F" },
    { label: "Couples", href: "/#free-consultation", photo: "cardCouples" as PhotoKey, alt: "A happy couple in traditional clothes", bg: "#F9C6D8", fg: "#24132F" },
    { label: "Parents", href: "/#free-consultation", photo: "cardParents" as PhotoKey, alt: "A smiling mother in a yellow sari", bg: "#E7DBFA", fg: "#24132F" },
    { label: "Counsellors", href: "/#webinars", photo: "cardCounsellors" as PhotoKey, alt: "A counsellor in a session", bg: "#5B2A86", fg: "#FBF8FE" },
  ],

  pillarsLabel: "Why Divine Companion",
  pillars: ["Certified counsellors", "100% confidential", "First call free", "Faith & family aware", "Personality-led matching", "Live workshops & webinars"],

  stats: [
    { value: 30, suffix: " min", label: "Free first counselling call" },
    { value: 4, suffix: " steps", label: "From sign-up to your match" },
    { value: 100, suffix: "%", label: "Private & confidential" },
  ],

  grow: {
    eyebrow: "What we offer",
    title: "Being single is the *perfect time to grow*",
    subtitle: "Everything we offer, built around one idea: understand yourself, and the right relationship gets easier.",
  },

  /** Golden-ratio bento: [1 φ:1][2 1:φ tall] / [3 φ:1][4 1:1]. */
  bento: {
    know: {
      id: "personality-quiz",
      eyebrow: "Free · 15 min",
      title: "Know yourself first",
      body: "The Soul Compass maps your character, values and love language — in plain words, not jargon.",
      chips: ["Character", "Values", "Love language"],
      cta: { label: "Discover your love type", href: "/soul-compass" }, // TODO: quiz flow
      photo: "fCompass" as PhotoKey,
      alt: "A woman leaning on a wooden door, lost in thought",
    },
    call: {
      id: "free-consultation",
      eyebrow: "Absolutely free",
      title: "Talk it through with a counsellor",
      body: "Thirty unhurried minutes, one-to-one — alone, with your partner, or with your parents.",
      chips: ["30 min", "Video or phone"],
      cta: { label: "Book my free call", href: "/free-consultation" }, // TODO: booking page
      photo: "fConsult" as PhotoKey,
      alt: "A counsellor talking with a young woman",
    },
    match: {
      id: "find-partners",
      title: "Find partners who truly fit",
      body: "Matches built on who you are — each with a harmony score and your counsellor's note.",
      harmony: "92% harmony",
      cta: { label: "See how matching works", href: "/#how-it-works" },
      people: ["pArjun", "tMehak", "pRohan", "cardSingles", "pKabir"] as PhotoKey[],
    },
    learn: {
      id: "workshops",
      title: "Learn together, live",
      body: "Webinars & workshops",
      next: "Next: 12–13 Dec",
      cta: { label: "Join us", href: "/workshops" }, // TODO: events page
    },
  },

  story: {
    eyebrow: "The experience",
    title: "How Divine Companion works",
    step: "Step",
    steps: [
      {
        key: "account",
        title: "Create your account",
        bullets: ["Sign up in a minute with your mobile number", "Search for yourself, or as a parent for your son or daughter", "Your details stay private until you choose to share"],
      },
      {
        key: "compass",
        title: "Know yourself with the Soul Compass",
        bullets: ["A 15-minute personality quiz", "Maps your values, temperament and love language", "Results in plain words, not jargon"],
      },
      {
        key: "call",
        title: "Talk to a counsellor — absolutely free",
        bullets: ["Some answers only come in conversation", "30 minutes, one-to-one, video or phone", "Bring your partner or your parents if you like"],
      },
      {
        key: "match",
        title: "Meet your Divine Companions",
        bullets: ["Matches based on who you are, not just what you are", "Every match comes with a harmony score", "Guidance from your counsellor at every step"],
      },
    ],
    photoAlts: {
      account: "A young woman smiling on a city street",
      call: "Two women in conversation by a window",
    },
    clips: {
      knot: "Clip: tying the sacred knot at a Hindu wedding",
      walk: "Clip: a couple walking hand in hand at sunset",
      laugh: "Clip: a couple laughing together",
    },
    chat: { from: "Sara · Counsellor", text: "How did your first call with Arjun go?" },
    cards: {
      account: {
        title: "Create your account",
        sub: "It takes less than a minute.",
        name: "Full name",
        mobile: "Mobile",
        looking: "I'm looking",
        self: "For myself",
        child: "For my son / daughter",
        cont: "Continue",
        done: "Account created",
      },
      compass: {
        title: "Soul Compass",
        question: "On a slow Sunday, you'd rather…",
        options: ["Host family for lunch", "Read with chai, alone", "Explore a new café"],
        traits: ["Warm", "Grounded", "Family-first"],
      },
      call: {
        title: "Book your free call",
        role: "Certified relationship counsellor",
        badge: "Free · 30 min · Video or phone",
        days: ["Mon", "Tue", "Wed", "Thu"],
        done: "You're booked · Wed, 4:00 pm",
      },
      list: { me: "Ananya", heading: "Your matches", week: "This week", harmony: "Harmony", view: "View profiles" },
      profile: {
        city: "Bengaluru",
        meta: "Designer · Hindi, Kannada",
        note: "Counsellor's note: you both put family first and like slow Sundays. Start with that.",
        todo1: "Share Soul Compass results",
        todo2: "First video call, Sat 7 pm",
        intro: "Introduced by Sara",
        matched: "Matched",
      },
      people: [
        { name: "Arjun, 30", meta: "Bengaluru · Designer" },
        { name: "Rohan, 29", meta: "Pune · Architect" },
        { name: "Kabir, 31", meta: "Mumbai · Doctor" },
      ],
    },
  },

  ready: {
    title: "Get ready *for love*",
    sub: "Join the next Ready for Forever workshop",
    cta: { label: "Reserve a seat", href: "/#workshops" },
    alt: "A smiling couple in wedding clothes",
  },

  testimonialsUi: { title: "Stories that began here", hint: "Hover or hold a story to slow it down.", label: "Member stories" },

  /**
   * PLACEHOLDER testimonials for layout only.
   * Replace with real, consented stories (and photos of those people) before launch.
   */
  testimonials: [
    { names: "Ananya & Rohit", city: "Pune", tag: "Married 2025", quote: "The Soul Compass said what I couldn't put into words. Our counsellor helped us talk about families before it became a fight.", photo: "tC4" as PhotoKey },
    { names: "Mehak", city: "Delhi", tag: "Single, growing", quote: "I came for matches and stayed for the workshops. I finally know what I'm looking for — and what I'm not.", photo: "tMehak" as PhotoKey },
    { names: "Sanjana & Arjun", city: "Bengaluru", tag: "Engaged", quote: "Our parents joined the free call too. It was the first time everyone felt heard in the same room.", photo: "tC8" as PhotoKey },
    { names: "Farhan & Zoya", city: "Hyderabad", tag: "Married 2026", quote: "We matched at 91% harmony, but it was the money conversation in the webinar that really prepared us.", photo: "tC6" as PhotoKey },
    { names: "Kavya's mother", city: "Chennai", tag: "Parent", quote: "The counsellor helped me listen to my daughter instead of deciding for her. That changed everything.", photo: "tD1" as PhotoKey },
    { names: "Neha & Vikram", city: "Jaipur", tag: "Married 2025", quote: "Gentle, never pushy. It felt like a friend who happens to be an expert was walking with us.", photo: "tC5" as PhotoKey },
    { names: "Aditya", city: "Mumbai", tag: "After heartbreak", quote: "The Fresh Start circle helped me heal before looking again. I'm dating with a lot more clarity now.", photo: "tE3" as PhotoKey },
    { names: "Riya & Kabir", city: "Ahmedabad", tag: "Engaged", quote: "We were both nervous about in-laws. One honest conversation with our counsellor changed everything.", photo: "tC3" as PhotoKey },
  ],

  closing: {
    text: "We listen. We understand. We get where you’re coming from. So whenever you’re ready, so are we.",
    cta: { label: "Book my free call", href: "/#free-consultation" },
  },

  quizBanner: {
    badge: "Personality Quiz · 100% free",
    title: "Know yourself in *15 minutes* — before you meet anyone.",
    body: "The Soul Compass maps your character, values and love language in plain words — so the right match, and every conversation after it, gets easier.",
    chips: ["24 questions", "No sign-up to start", "Results instantly"],
    cta: "Take the free quiz",
    resultLabel: "Your love type",
    resultValue: "Warm · Grounded",
    alt: "A young woman sitting quietly under a stone archway",
  },

  footer: {
    contactTitle: "Contact us",
    contact: ["Divine Companion", "Pune, Maharashtra", "India"],
    email: "hello@example.com", // TODO: real support address
    appTitle: "Get the app",
    cta: { label: "Schedule a free consultation", href: "/free-consultation" }, // TODO: booking page / scheduler
    legal: [
      { href: "/faqs", label: "FAQs" },
      { href: "/terms", label: "Terms & conditions" },
      { href: "/privacy", label: "Privacy and cookie policy" },
      { href: "/refunds", label: "Refund policy" },
      { href: "/disclaimer", label: "Counselling disclaimer" },
    ],
    rights: "Divine Companion. All rights reserved.",
    crisis: "Counselling isn't emergency care. In crisis in India, call 112 or Tele-MANAS 14416.",
  },

  ui: {
    home: "Divine Companion — home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Site menu",
    dismiss: "Dismiss announcement",
    bookFree: "Book my free call",
    appSoon: "The app — coming soon",
    comingSoon: "coming soon",
    language: "Language",
    highlights: "Highlights",
    prev: "Previous slide",
    next: "Next slide",
    choose: "Choose slide",
    goTo: "Go to slide",
    skip: "Skip to content",
    min15: "· 15 min",
  },
};

export default en;
export type Content = typeof en;
