export const site = {
  name: "City Nomadz",
  legal: "City Nomadz",
  domain: "citynomadz.org",
  url: "https://citynomadz.org",
  tagline: "Slow travel, lived long. Field notes from the quietest corners of the world.",
  description:
    "City Nomadz is an independent field journal for the nomadic life — grounded guides, honest costs, and long stays in a handful of countries we actually know.",
  email: "hello@citynomadz.org",
  since: "2026",
};

export type NavItem = {
  label: string;
  href: string;
};

export const nav: NavItem[] = [
  { label: "Destinations", href: "/destinations" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
];

export type DestinationMeta = {
  slug: string;
  name: string;
  country: string;
  capital: string;
  region: string;
  timezone: string;
  currency: string;
  blurb: string;
  index: string;
  tagline: string;
  tags: string[];
};

// Curated — the handful of countries we travel slowly & write truthfully about.
export const destinations: DestinationMeta[] = [
  {
    slug: "armenia",
    name: "Armenia",
    country: "Republic of Armenia",
    capital: "Yerevan",
    region: "South Caucasus",
    timezone: "GMT+4",
    currency: "AMD — Armenian dram",
    blurb:
      "Ancient stone, warm coffee, and friendlier wifi than you'd expect. Armenia rewards those who stay past the first week.",
    index: "01",
    tagline: "The small country with a loud heart",
    tags: ["Visa 180 days", "EUR 900–1,300 / month", "Mountain air"],
  },
  {
    slug: "greece",
    name: "Greece",
    country: "Hellenic Republic",
    capital: "Athens",
    region: "The Mediterranean",
    timezone: "GMT+2/+3",
    currency: "EUR — Euro",
    blurb:
      "Bleached light, sea-swimming mornings, and an unhurried tempo. Greece is the patient reset button of the Med.",
    index: "02",
    tagline: "An Aegean pace of life",
    tags: ["EU visa", "EUR 1,400–2,200 / month", "Sea in season"],
  },
];

export const tools = [
  {
    id: "costs",
    name: "Cost of Living",
    status: "Planned",
    number: "01",
    description:
      "Build a realistic monthly budget per city — rent, food, sim, co-working — based on our lived spending, not averages.",
  },
  {
    id: "currency",
    name: "Currency Converter",
    status: "Planned",
    number: "02",
    description:
      "Convert between AMD, EUR, GEL and more, live, tuned for the amounts a nomad actually spends.",
  },
  {
    id: "weather",
    name: "Weather Planner",
    status: "Planned",
    number: "03",
    description:
      "Know when a city is at its best. Seasonal honesty from someone who has weathered all four months there.",
  },
  {
    id: "dashboard",
    name: "Nomad Dashboard",
    status: "Soon",
    number: "04",
    description:
      "One calm screen to plan your year — cities, budgets, visas and plans, without the productivity theatre.",
  },
];

export const stats = [
  { value: "2", label: "Countries we actually live in" },
  { value: "90+", label: "Days minimum per stay" },
  { value: "0", label: "Sponsored recommendations" },
];