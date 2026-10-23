export const NAV = [
  { label: "About", href: "#about" },
  { label: "Designs", href: "#designs" },
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
  "Solar power",
  "Borehole water",
  "Smart home systems",
  "Interior decor",
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
