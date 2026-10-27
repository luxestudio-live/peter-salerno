export interface SpeakingTopic {
  id: string;
  slug: string;
  title: string;
  category: "Leadership" | "Commercial Sales" | "Wellbeing & Laughter" | "Performance";
  tagline: string;
  description: string;
  takeaways: string[];
  idealAudiences: string[];
  formats: string[];
}

export interface PodcastEpisode {
  id: string;
  episodeNumber: number;
  title: string;
  duration: string;
  guest?: string;
  guestRole?: string;
  description: string;
  featured?: boolean;
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  synopsis: string;
  chapters: string[];
  publishedYear: string;
  format: string;
}

export interface Service {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  outcomes: string[];
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export const SITE_METADATA = {
  name: "Peter Salerno",
  tagline: "The Man With The Magic Message",
  subtitle: "Keynote Speaker · Author · Podcast Host · Business Mentor",
  primaryLocation: "Australia & International",
  phone: "+61 400 000 000",
  email: "bookings@petersalerno.com.au",
};

export const SPEAKING_TOPICS: SpeakingTopic[] = [
  {
    id: "finding-better-self",
    slug: "finding-your-better-self",
    title: "Finding Your Better Self: The Magic Within",
    category: "Performance",
    tagline: "Unlocking innate brilliance by shedding manufactured corporate friction.",
    description:
      "Peter's signature keynote combines real commercial wisdom, stagecraft, and genuine laughter therapy to help leaders and teams dissolve chronic tension, overcome self-limiting beliefs, and reignite daily creative ownership.",
    takeaways: [
      "The neuroscience of intentional humor in high-pressure environments",
      "Eliminating the operational 'wobbly tables' that drain daily focus",
      "Transforming anxiety into sustainable, joyful ownership",
      "A personal operating system for ongoing resilience and creative momentum",
    ],
    idealAudiences: ["Annual Conventions", "Leadership Summits", "All-Hands Conferences"],
    formats: ["45–60 Minute Keynote", "Half-Day Experiential Masterclass"],
  },
  {
    id: "wobbly-table",
    slug: "eliminating-the-wobbly-tables",
    title: "Eliminating the Wobbly Tables in Business & Life",
    category: "Commercial Sales",
    tagline: "Spotting and fixing the invisible irritations that sabotage customer retention.",
    description:
      "A brilliant commercial metaphor drawn from Peter's four decades in high-stakes sales and executive leadership: how minor unaddressed annoyances quietly corrode customer trust, team morale, and organizational momentum.",
    takeaways: [
      "A diagnostic framework for uncovering hidden team frustrations",
      "How to empower frontline staff to fix friction points immediately",
      "The compound commercial value of frictionless customer experiences",
      "Turning everyday service moments into lifetime brand loyalty",
    ],
    idealAudiences: ["Sales Teams", "Service Leaders", "Franchise Networks"],
    formats: ["45–60 Minute Keynote", "Interactive Team Workshop"],
  },
  {
    id: "laughter-high-stakes",
    slug: "laughter-in-high-stakes",
    title: "The Architecture of Joy: Laughter in High Stakes",
    category: "Wellbeing & Laughter",
    tagline: "Why serious business outcomes require human levity and psychological safety.",
    description:
      "As a certified Laughter Therapist and former President of Laughter Clubs Australasia, Peter demonstrates the physiological and neurochemical science of shared laughter to defuse conflict and build rock-solid psychological safety.",
    takeaways: [
      "Real-time techniques to reduce cortisol and stress in 90 seconds",
      "Breaking down siloed executive communication through shared levity",
      "Creating teams that bounce back quickly from unexpected commercial shocks",
      "A daily practice for mental stamina in demanding corporate roles",
    ],
    idealAudiences: ["Executive Retreats", "Healthcare & Corporate Summits", "HR Leaders"],
    formats: ["Interactive Keynote", "Facilitated Executive Experience"],
  },
  {
    id: "sales-psychology",
    slug: "commercial-sales-mastery",
    title: "Sales Mastery: The Psychology of Genuine Connection",
    category: "Commercial Sales",
    tagline: "Moving beyond transactional pitching into deep consultative trust.",
    description:
      "Drawing from qualifying for the prestigious Million Dollar Round Table (MDRT), Peter shares the timeless principles of high-value advisory, empathetic listening, and relational influence that close deals without high-pressure tactics.",
    takeaways: [
      "Moving from vendor to indispensable commercial partner",
      "How genuine warmth disarms the modern skeptical buyer",
      "Navigating price objections through value framing and confidence",
      "Building referral engines that generate recurring inbound business",
    ],
    idealAudiences: ["B2B Sales Teams", "Financial Advisers", "Real Estate Groups"],
    formats: ["45–60 Minute Keynote", "Deep-Dive Sales Masterclass"],
  },
];

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: "hbr-101",
    episodeNumber: 101,
    title: "Where Business Meets the Human Side of Success",
    duration: "42 min",
    guest: "David Koch",
    guestRole: "Business Commentator & Media Pioneer",
    description:
      "Peter and David explore why hyper-growth companies lose their soul when metrics eclipse human culture, and how leaders sustain authentic joy during economic headwinds.",
    featured: true,
  },
  {
    id: "hbr-98",
    episodeNumber: 98,
    title: "The Discipline of Joy: Leading Without the Ego",
    duration: "38 min",
    guest: "Elena Rostova",
    guestRole: "Managing Director, Pacific Growth Capital",
    description:
      "A candid boardroom discussion on managing executive burnout, cultivating genuine laughter during restructuring, and building trust that survives crises.",
    featured: false,
  },
  {
    id: "hbr-94",
    episodeNumber: 94,
    title: "From Stressed to Magnetic: The Speaker's Playbook",
    duration: "45 min",
    guest: "Marcus Vance",
    guestRole: "Keynote Strategist & Executive Speechwriter",
    description:
      "Deconstructing stage presence, natural storytelling pacing, and the art of turning dry slide decks into unforgettable emotional experiences.",
    featured: false,
  },
];

export const BOOKS: Book[] = [
  {
    id: "the-man-with-the-magic-message",
    title: "The Man With The Magic Message",
    subtitle: "Real Stories, Practical Wisdom, and How to Discover Your Better Self",
    synopsis:
      "In this candid, humor-filled, and deeply inspirational book, Peter Salerno shares a lifetime of lessons gathered across insurance boardrooms, theatrical stages, radio microphones, and community leadership. It is an actionable roadmap for anyone ready to embrace change, bring more laughter into their work, and live with purposeful joy.",
    chapters: [
      "Prologue: The Accidental Magician",
      "Chapter 1: The Wobbly Table in Your Mind",
      "Chapter 2: Why Laughter Dissolves Resistance",
      "Chapter 3: The Architecture of Human Connection",
      "Chapter 4: Finding Your Magic Under Pressure",
      "Chapter 5: Epilogue: Walking Off the Stage Better Than You Began",
    ],
    publishedYear: "Official Edition",
    format: "Hardcover, Paperback & Audiobook",
  },
];

export const SERVICES: Service[] = [
  {
    id: "keynotes",
    eyebrow: "Conferences & Summits",
    title: "Keynote Speaking",
    description:
      "Peter tailors each keynote presentation to your industry's specific challenges, weaving real business acumen with clean humor, sleight-of-hand metaphors, and memorable storytelling.",
    outcomes: ["High audience engagement", "Memorable central theme", "Immediate morale boost"],
  },
  {
    id: "workshops",
    eyebrow: "Leadership & Teams",
    title: "Interactive Corporate Workshops",
    description:
      "Hands-on, highly engaging sessions where participants do not merely listen—they participate, debate, laugh, and construct new operational agreements.",
    outcomes: ["Break down inter-departmental silos", "Actionable team charters", "Stress reduction tools"],
  },
  {
    id: "mentoring",
    eyebrow: "Founders & Executives",
    title: "Executive Mentoring & Advisory",
    description:
      "Peter acts as an objective sounding board, combining decades of commercial judgment with empathetic psychological insight to help leaders find clarity.",
    outcomes: ["Unbiased strategic counsel", "Renewed leadership energy", "Clear personal accountability"],
  },
];

export const MILESTONES: Milestone[] = [
  {
    year: "1984",
    title: "Commercial Acumen & MDRT Qualification",
    description: "Built high-performing advisory practices, qualifying for the prestigious Million Dollar Round Table.",
  },
  {
    year: "1999",
    title: "Laughter Clubs Australasia Leadership",
    description: "Appointed President of Laughter Clubs Australasia, pioneering laughter therapy across corporate Australia.",
  },
  {
    year: "2011",
    title: "National Book Release: The Magic Message",
    description: "Published his acclaimed autobiographical and business philosophy work, distributing across Australia.",
  },
  {
    year: "2018",
    title: "Happy Business Radio Launch",
    description: "Created and launched Happy Business Radio, broadcasting conversations on commercial success and human joy.",
  },
  {
    year: "2026",
    title: "Four Decades of Impact on Global Stages",
    description: "Now booking international keynotes, executive retreats, and national conventions for 2026 and 2027.",
  },
];
