export interface Plan {
  id: string;
  name: string;
  price: string;
  frequency: string;
  features: string[];
  popular: boolean;
}

export interface ServiceArea {
  id: string;
  name: string;
  zipCodes: string[];
}

export interface BeforeAfter {
  id: string;
  title: string;
  before: string;
  after: string;
}

export const SITE = {
  name: "RootOps",
  tagline: "Smart Lawn Care, Simplified",
  phone: "+1 (512) 555-0198",
  email: "hello@rootops.io",
  supportEmail: "support@rootops.io",
};

export const heroImage = "https://images.unsplash.com/photo-1589923188900-85f5d5b4e5c1?w=1600&q=85";

export const lawnBeforeImage = "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=85";
export const lawnAfterImage = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85";

export const HERO = {
  headline: "Lawn care with receipts.",
  subheadline:
    "Every visit documented. Every crew GPS-tracked. Every lawn optimized with real-time dashboards and photo proof. Subscription lawn care that runs like a logistics operation.",
  cta: "Get Instant Quote",
  secondary: "See How It Works",
  stats: [
    { value: "4,200+", label: "Lawns Maintained" },
    { value: "4.9★", label: "Average Rating" },
    { value: "< 2hr", label: "Response Time" },
  ],
};

export const HOW_IT_WORKS = {
  title: "How RootOps Works",
  subtitle: "From quote to green lawn in three steps",
  steps: [
    {
      id: "1",
      title: "Get Your Quote",
      description:
        "Enter your address and lot size. Our algorithm calculates pricing instantly based on terrain, grass type, and service frequency.",
      icon: "calculator",
    },
    {
      id: "2",
      title: "We Schedule & Route",
      description:
        "Our route optimization AI assigns the nearest crew and schedules your visit. You get a 2-hour arrival window via text.",
      icon: "route",
    },
    {
      id: "3",
      title: "Track & Review",
      description:
        "Watch your crew's progress in real-time. After each visit, receive a photo report with before/after shots and next visit date.",
      icon: "dashboard",
    },
  ],
};

export const PLANS: Plan[] = [
  {
    id: "essential",
    name: "Essential",
    price: "$49",
    frequency: "/visit",
    features: [
      "Weekly mowing & edging",
      "Clipping cleanup",
      "Digital visit report",
      "GPS-tracked service",
      "Online scheduling",
    ],
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$89",
    frequency: "/visit",
    features: [
      "Everything in Essential",
      "Bi-weekly fertilization",
      "Weed treatment",
      "Seasonal aeration",
      "Priority scheduling",
      "Dedicated crew",
    ],
    popular: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: "$149",
    frequency: "/visit",
    features: [
      "Everything in Pro",
      "Weekly visits",
      "Irrigation monitoring",
      "Pest management",
      "Tree & shrub trimming",
      "Landscape lighting check",
      "24/7 priority support",
    ],
    popular: false,
  },
];

export const DASHBOARD = {
  title: "Your Visit Report Dashboard",
  subtitle: "Complete transparency after every service",
  metrics: [
    { label: "Grass Height", value: '2.5"', status: "optimal", change: "-0.3\"" },
    { label: "Coverage", value: "98%", status: "optimal", change: "+2%" },
    { label: "Weed Density", value: "Low", status: "good", change: "-15%" },
    { label: "Soil Moisture", value: "42%", status: "normal", change: "+5%" },
  ],
  visitDetails: {
    date: "June 10, 2024",
    crew: "Team Alpha — Marcus & Jay",
    duration: "1h 23m",
    services: ["Mow", "Edge", "Blow", "Spot Treat"],
    notes: "Front yard looking great. Recommend deep watering Thursday due to heat wave.",
  },
};

export const SEASONAL = {
  title: "Seasonal Care Calendar",
  subtitle: "We adjust your plan automatically based on your region's climate",
  seasons: [
    {
      id: "spring",
      name: "Spring",
      months: "Mar – May",
      tasks: [
        "First mow of season",
        "Pre-emergent weed control",
        "Spring fertilization",
        "Irrigation startup",
        "Mulch refresh",
      ],
      color: "#4ade80",
    },
    {
      id: "summer",
      name: "Summer",
      months: "Jun – Aug",
      tasks: [
        "Weekly mowing (higher cut)",
        "Deep watering schedule",
        "Grub prevention",
        "Heat stress monitoring",
        "Disease scouting",
      ],
      color: "#22c55e",
    },
    {
      id: "fall",
      name: "Fall",
      months: "Sep – Nov",
      tasks: [
        "Core aeration",
        "Overseeding",
        "Fall fertilization",
        "Leaf removal",
        "Final mow prep",
      ],
      color: "#f59e0b",
    },
    {
      id: "winter",
      name: "Winter",
      months: "Dec – Feb",
      tasks: [
        "Dormant season mow",
        "Equipment maintenance",
        "Soil testing",
        "Plan next season",
        "Tree pruning",
      ],
      color: "#60a5fa",
    },
  ],
};

export const SERVICE_AREAS: ServiceArea[] = [
  { id: "austin", name: "Austin", zipCodes: ["78701", "78702", "78703", "78704", "78745", "78748"] },
  { id: "round-rock", name: "Round Rock", zipCodes: ["78664", "78665", "78681"] },
  { id: "cedar-park", name: "Cedar Park", zipCodes: ["78613", "78631"] },
  { id: "pflugerville", name: "Pflugerville", zipCodes: ["78660"] },
  { id: "georgetown", name: "Georgetown", zipCodes: ["78626", "78628"] },
  { id: "san-marcos", name: "San Marcos", zipCodes: ["78666"] },
];

export const BEFORE_AFTERS: BeforeAfter[] = [
  {
    id: "ba1",
    title: "Full Lawn Restoration",
    before: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80",
    after: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80&sat=-100",
  },
  {
    id: "ba2",
    title: "Weed Elimination",
    before: "https://images.unsplash.com/photo-1592722509063-02ec390e8e47?w=800&q=80",
    after: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
  },
  {
    id: "ba3",
    title: "Seasonal Overhaul",
    before: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&q=80",
    after: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
];

export const QUOTE_WIDGET = {
  title: "Get Your Instant Quote",
  subtitle: "No phone calls. No waiting. Real pricing in seconds.",
  fields: [
    { id: "address", label: "Property Address", type: "text", placeholder: "123 Main St, Austin, TX" },
    { id: "lotSize", label: "Lot Size", type: "select", options: ["Small (< 3,000 sqft)", "Medium (3,000–6,000 sqft)", "Large (6,000–10,000 sqft)", "Estate (10,000+ sqft)"] },
    { id: "frequency", label: "Service Frequency", type: "select", options: ["Weekly", "Bi-weekly", "Monthly"] },
    { id: "plan", label: "Plan Level", type: "select", options: ["Essential", "Pro", "Elite"] },
  ],
};

export const CTA = {
  title: "Ready for a Smarter Lawn?",
  subtitle: "Join 4,200+ homeowners who've upgraded to tech-powered lawn care.",
  buttonText: "Get Started Free",
  subtext: "No commitment. Cancel anytime. First visit 50% off.",
};
