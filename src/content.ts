export const NAV = [
  { label: "About", href: "#about" },
  { label: "Designs", href: "#designs" },
  { label: "Lookbook", href: "#lookbook" },
  { label: "Upgrades", href: "#upgrades" },
  { label: "Why Skyline", href: "#why" },
  { label: "Process", href: "#process" },
];

export const HERO_META = [
  "Complete homes, ready to enjoy",
  "Optional solar, water & smart upgrades",
  "Clear quotes. No hidden costs.",
];

export const MARQUEE_ITEMS = [
  "Affordable bungalows",
  "Modern homes",
  "Architecture",
  "Interior styling",
  "Statement lighting",
  "Smart living",
  "Solar power",
  "Borehole water",
  "Clear quotes",
];

export type Design = {
  id: string;
  index: string;
  tag: string;
  title: string;
  summary: string;
  features: string[];
  image: string;
  imageWidth: number;
  imageHeight: number;
  alt: string;
  note: string;
};

export const DESIGNS: Design[] = [
  {
    id: "bungalows",
    index: "01",
    tag: "Bungalow",
    title: "Affordable Bungalows",
    summary:
      "Compact, comfortable, and well-planned. Our bungalows make the most of every square metre, with practical layouts, good natural light, and finishes that look far more expensive than they are.",
    features: [
      "Single-storey, space-smart layouts",
      "Good natural light throughout",
      "Quality finishes, sensible cost",
    ],
    image: "./images/bungalow.jpg",
    imageWidth: 1200,
    imageHeight: 1006,
    alt: "Concept image of a contemporary single-storey home exterior",
    note: "Single storey / space smart",
  },
  {
    id: "modern-homes",
    index: "02",
    tag: "Modern",
    title: "Modern Homes",
    summary:
      "Clean lines, stylish exteriors, and functional interiors. Our modern designs bring a contemporary look to everyday living without the premium price tag.",
    features: [
      "Clean architectural lines",
      "Stylish, low-maintenance exterior",
      "Functional, contemporary interiors",
    ],
    image: "./images/modern.jpg",
    imageWidth: 1600,
    imageHeight: 1200,
    alt: "Concept image of a modern home exterior with clean architectural lines",
    note: "Two storeys / contemporary",
  },
];

export type Upgrade = {
  id: string;
  title: string;
  short: string;
  description: string;
};

export const UPGRADES: Upgrade[] = [
  {
    id: "solar",
    title: "Solar Power",
    short: "Solar Power",
    description:
      "Cut your energy bills and enjoy reliable electricity, whatever the grid is doing.",
  },
  {
    id: "borehole",
    title: "Borehole Water Supply",
    short: "Borehole Water",
    description: "Have your own clean, steady water supply on your property.",
  },
  {
    id: "smart",
    title: "Smart Home Systems",
    short: "Smart Home",
    description:
      "Control your lighting, security, and appliances from your phone for added comfort and convenience.",
  },
  {
    id: "interior",
    title: "Interior Decor",
    short: "Interior Decor",
    description:
      "Move into a home that's already beautifully styled, from finishes and fittings to furnishing touches.",
  },
];

export type Principle = {
  title: string;
  description: string;
};

export const PRINCIPLES: Principle[] = [
  {
    title: "Affordable by design",
    description:
      "Smart planning keeps costs down without cutting corners on quality.",
  },
  {
    title: "Engineering you can trust",
    description:
      "Every project is built on solid engineering principles, from foundation to roof.",
  },
  {
    title: "Stylish and modern",
    description: "Thoughtfully designed homes you'll be proud to show off.",
  },
  {
    title: "Flexible upgrades",
    description: "Pay only for what you want. Add features at your own pace.",
  },
  {
    title: "Transparent process",
    description:
      "Clear pricing and clear communication from first conversation to key handover.",
  },
];

export type Step = {
  number: string;
  title: string;
  description: string;
};

export const STEPS: Step[] = [
  {
    number: "01",
    title: "Choose your design",
    description: "Browse our bungalow and modern home options.",
  },
  {
    number: "02",
    title: "Customise",
    description: "Tell us which upgrades you'd like, if any.",
  },
  {
    number: "03",
    title: "Get your quote",
    description: "Receive a clear, detailed price with no surprises.",
  },
  {
    number: "04",
    title: "We build",
    description: "Our team handles construction with regular updates.",
  },
  {
    number: "05",
    title: "Move in",
    description: "Receive your keys and enjoy your new home.",
  },
];

export const AUDIENCES = [
  "First-time homeowners",
  "Growing families",
  "Young professionals",
  "Investors",
];

export type ShowcaseCategory =
  | "Architecture"
  | "Smart Homes"
  | "Interiors"
  | "Furniture"
  | "Lighting"
  | "Solar & Water";

export type ShowcaseSize = "standard" | "wide" | "tall" | "large";

export type ShowcaseItem = {
  id: string;
  title: string;
  category: ShowcaseCategory;
  description: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  alt: string;
  size: ShowcaseSize;
  interest: string;
  credit?: string;
};

export const SHOWCASE_CATEGORIES = [
  "All",
  "Architecture",
  "Smart Homes",
  "Interiors",
  "Furniture",
  "Lighting",
  "Solar & Water",
] as const;

export type ShowcaseFilter = (typeof SHOWCASE_CATEGORIES)[number];

export const INTEREST_OPTIONS = [
  "Not sure yet",
  "Affordable Bungalows",
  "Modern Homes",
  "Both / comparing options",
  "Architecture & custom build",
  "Smart home package",
  "Interior decor & furniture",
  "Solar & water package",
];

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "house-dusk",
    title: "Dusk on the terrace",
    category: "Architecture",
    description:
      "Warm interior light, clean horizontal lines and a calm outdoor room — the kind of evening that sells a home before you step inside.",
    image: "./images/showcase/house-dusk.jpg",
    imageWidth: 1400,
    imageHeight: 933,
    alt: "Modern home glowing with warm interior light at dusk",
    size: "large",
    interest: "Architecture & custom build",
  },
  {
    id: "house-modern",
    title: "Modern frontage",
    category: "Architecture",
    description:
      "A confident, low-maintenance exterior with deep overhangs, crisp geometry and generous glazing.",
    image: "./images/showcase/house-modern.jpg",
    imageWidth: 1400,
    imageHeight: 933,
    alt: "Contemporary two-storey home exterior with clean architectural lines",
    size: "wide",
    interest: "Architecture & custom build",
  },
  {
    id: "architecture-white",
    title: "Sculpted in white",
    category: "Architecture",
    description:
      "Layered volumes and soft shadows show how a simple white palette can feel quietly dramatic.",
    image: "./images/showcase/architecture-white.jpg",
    imageWidth: 1400,
    imageHeight: 933,
    alt: "White modern building with layered geometric volumes",
    size: "standard",
    interest: "Architecture & custom build",
  },
  {
    id: "architecture-glass",
    title: "Glass and structure",
    category: "Architecture",
    description:
      "Floor-to-ceiling glazing blurs the line between living space and landscape.",
    image: "./images/showcase/architecture-glass.jpg",
    imageWidth: 1400,
    imageHeight: 933,
    alt: "Modern glass-fronted building reflecting the surrounding landscape",
    size: "standard",
    interest: "Architecture & custom build",
  },
  {
    id: "smart-security",
    title: "Connected entry",
    category: "Smart Homes",
    description:
      "Smart locks, cameras and lighting controls let you check in and manage your home from anywhere.",
    image: "./images/showcase/smart-security.jpg",
    imageWidth: 1400,
    imageHeight: 933,
    alt: "Smart doorbell and security camera beside a modern front door",
    size: "standard",
    interest: "Smart home package",
  },
  {
    id: "interior-living",
    title: "The connected living room",
    category: "Smart Homes",
    description:
      "Lighting, climate and entertainment working together — comfort you can control from your phone.",
    image: "./images/showcase/interior-living.jpg",
    imageWidth: 1400,
    imageHeight: 788,
    alt: "Bright modern living room with integrated smart home technology",
    size: "large",
    interest: "Smart home package",
  },
  {
    id: "interior-lounge",
    title: "Quiet luxury lounge",
    category: "Interiors",
    description:
      "Warm neutrals, soft seating and considered texture make a small footprint feel generous.",
    image: "./images/showcase/interior-lounge.jpg",
    imageWidth: 1400,
    imageHeight: 738,
    alt: "Warm neutral lounge with soft seating and layered textures",
    size: "standard",
    interest: "Interior decor & furniture",
  },
  {
    id: "interior-suite",
    title: "A suite to slow down in",
    category: "Interiors",
    description:
      "Layered lighting, natural materials and a restful palette turn the main bedroom into a retreat.",
    image: "./images/showcase/interior-suite.jpg",
    imageWidth: 1400,
    imageHeight: 1400,
    alt: "Restful modern bedroom suite with natural materials and soft lighting",
    size: "tall",
    interest: "Interior decor & furniture",
  },
  {
    id: "interior-dining",
    title: "Dining in warm light",
    category: "Interiors",
    description:
      "A simple table, sculptural chairs and a warm glow — proof that atmosphere is a design decision.",
    image: "./images/showcase/interior-dining.jpg",
    imageWidth: 1400,
    imageHeight: 788,
    alt: "Modern dining room with sculptural chairs and warm pendant lighting",
    size: "standard",
    interest: "Interior decor & furniture",
  },
  {
    id: "furniture-sofa",
    title: "The statement sofa",
    category: "Furniture",
    description:
      "A deep, low-slung sofa anchors the room and invites long conversations.",
    image: "./images/showcase/furniture-sofa.jpg",
    imageWidth: 1400,
    imageHeight: 933,
    alt: "Deep modern sofa styled in a contemporary living space",
    size: "wide",
    interest: "Interior decor & furniture",
  },
  {
    id: "furniture-chair",
    title: "A sculptural chair",
    category: "Furniture",
    description:
      "One well-chosen chair can change the whole mood of a corner.",
    image: "./images/showcase/furniture-chair.jpg",
    imageWidth: 1400,
    imageHeight: 1750,
    alt: "Sculptural designer armchair in a minimal interior",
    size: "standard",
    interest: "Interior decor & furniture",
  },
  {
    id: "furniture-dining",
    title: "Gather around",
    category: "Furniture",
    description:
      "A generous dining table designed for everyday meals and the people who stay late.",
    image: "./images/showcase/furniture-dining.jpg",
    imageWidth: 1400,
    imageHeight: 788,
    alt: "Modern dining table and chairs in a bright dining room",
    size: "standard",
    interest: "Interior decor & furniture",
  },
  {
    id: "furniture-coffee",
    title: "Coffee-table calm",
    category: "Furniture",
    description:
      "Natural timber, soft edges and room to breathe — the details that make a room feel finished.",
    image: "./images/showcase/furniture-coffee.jpg",
    imageWidth: 1400,
    imageHeight: 2097,
    alt: "Natural timber coffee table styled in a calm living room",
    size: "tall",
    interest: "Interior decor & furniture",
  },
  {
    id: "lighting-pendant",
    title: "Suspended light",
    category: "Lighting",
    description:
      "Pendants used as architecture: a line of light that defines the space below.",
    image: "./images/showcase/lighting-pendant.jpg",
    imageWidth: 1400,
    imageHeight: 933,
    alt: "Row of pendant lights suspended above a modern interior",
    size: "standard",
    interest: "Interior decor & furniture",
  },
  {
    id: "lighting-warm",
    title: "Layered warmth",
    category: "Lighting",
    description:
      "Warm pools of light, dimmable circuits and statement fixtures for evenings at home.",
    image: "./images/showcase/lighting-warm.jpg",
    imageWidth: 1400,
    imageHeight: 1120,
    alt: "Warm layered lighting in a contemporary living space",
    size: "wide",
    interest: "Interior decor & furniture",
  },
  {
    id: "lighting-chandelier",
    title: "The grand gesture",
    category: "Lighting",
    description:
      "A chandelier turns a ceiling into a moment — scale, sparkle and drama in one fixture.",
    image: "./images/showcase/lighting-chandelier.jpg",
    imageWidth: 683,
    imageHeight: 1024,
    alt: "Large ornate chandelier hanging in a grand lobby",
    size: "tall",
    interest: "Interior decor & furniture",
    credit: "Photo: atkinson000 / Flickr · CC BY 2.0",
  },
  {
    id: "solar-field",
    title: "Solar at scale",
    category: "Solar & Water",
    description:
      "Clean power, lower bills and a supply that keeps working when the grid doesn’t.",
    image: "./images/showcase/solar-field.jpg",
    imageWidth: 1400,
    imageHeight: 932,
    alt: "Large solar panel array under a clear sky",
    size: "standard",
    interest: "Solar & water package",
  },
  {
    id: "solar-roof",
    title: "Your roof, working harder",
    category: "Solar & Water",
    description:
      "A neat solar array sized to your home and your daily usage.",
    image: "./images/showcase/solar-roof.jpg",
    imageWidth: 1400,
    imageHeight: 932,
    alt: "Solar panels installed on a modern residential roof",
    size: "wide",
    interest: "Solar & water package",
  },
  {
    id: "water-tap",
    title: "Water, on your terms",
    category: "Solar & Water",
    description:
      "A borehole supply gives you clean, steady water without depending on the mains.",
    image: "./images/showcase/water-tap.jpg",
    imageWidth: 1400,
    imageHeight: 2100,
    alt: "Modern tap with a steady stream of clean water",
    size: "tall",
    interest: "Solar & water package",
  },
];
