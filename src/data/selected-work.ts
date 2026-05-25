export interface SelectedWorkEntry {
  client: string;
  employer: string;
  year: number;
  project: string;
  role: string;
  image: string;
  alt: string;
}

// Inline color-box image as a data URI. Used as a placeholder while real
// imagery is being collected. The encoded `#` keeps the URI a single, valid
// fragment (otherwise the browser treats `#FF6B6B` as a fragment identifier).
const colorBox = (hex: string): string => {
  const safe = hex.replace("#", "%23");
  return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 1 1'><rect width='1' height='1' fill='${safe}'/></svg>`;
};

export const selectedWork: SelectedWorkEntry[] = [
  { client: "Visible Mobile",   employer: "Madwell",                year: 2022, project: "This beach is a phone store",     role: "Art direction · OOH production",       image: colorBox("#FF6B6B"), alt: "Coral red placeholder" },
  { client: "Verizon",          employer: "Madwell",                year: 2022, project: "Yes you can",                     role: "Brand campaign · digital",             image: colorBox("#4ECDC4"), alt: "Teal placeholder" },
  { client: "Casper",           employer: "Madwell",                year: 2021, project: "Sleep channel rebrand",           role: "Art direction · motion",               image: colorBox("#FFE66D"), alt: "Yellow placeholder" },
  { client: "Dunkin'",          employer: "Madwell",                year: 2021, project: "Iced season identity",            role: "Brand identity · packaging",           image: colorBox("#95E1D3"), alt: "Mint placeholder" },
  { client: "ESPN",             employer: "Kettle",                 year: 2021, project: "Tournament hub redesign",         role: "Product design · prototyping",         image: colorBox("#C44569"), alt: "Magenta placeholder" },
  { client: "Sonos",            employer: "Kettle",                 year: 2020, project: "Listener archive",                role: "Product design · IA",                  image: colorBox("#F8B500"), alt: "Amber placeholder" },
  { client: "Discovery+",       employer: "Kettle",                 year: 2020, project: "Watchlist UX",                    role: "Product design",                       image: colorBox("#6C5CE7"), alt: "Purple placeholder" },
  { client: "Equinox",          employer: "Kettle",                 year: 2020, project: "Trainer profile system",          role: "Product design · system",              image: colorBox("#00B894"), alt: "Emerald placeholder" },
  { client: "Squarespace",      employer: "Kettle",                 year: 2019, project: "Template gallery rework",         role: "Product design",                       image: colorBox("#E17055"), alt: "Terracotta placeholder" },
  { client: "Bumble",           employer: "Kettle",                 year: 2019, project: "BFF discovery",                   role: "Product design · research",            image: colorBox("#74B9FF"), alt: "Sky placeholder" },
  { client: "Marco Polo",       employer: "Marco Polo Learning",    year: 2017, project: "Read-along reader",               role: "Lead PD · product",                    image: colorBox("#FD79A8"), alt: "Pink placeholder" },
  { client: "Marco Polo",       employer: "Marco Polo Learning",    year: 2017, project: "World of Animals",                role: "Lead PD · system",                     image: colorBox("#A29BFE"), alt: "Lavender placeholder" },
  { client: "Marco Polo",       employer: "Marco Polo Learning",    year: 2016, project: "Ocean playset",                   role: "Lead PD",                              image: colorBox("#FDCB6E"), alt: "Sun placeholder" },
  { client: "Marco Polo",       employer: "Marco Polo Learning",    year: 2016, project: "Weather investigations",          role: "Lead PD · curriculum",                 image: colorBox("#55EFC4"), alt: "Spring placeholder" },
  { client: "Marco Polo",       employer: "Marco Polo Learning",    year: 2016, project: "Parent dashboard",                role: "Lead PD",                              image: colorBox("#FAB1A0"), alt: "Peach placeholder" },
  { client: "Marco Polo",       employer: "Marco Polo Learning",    year: 2016, project: "Onboarding flow",                 role: "Lead PD",                              image: colorBox("#81ECEC"), alt: "Cyan placeholder" },
  { client: "Marco Polo",       employer: "Marco Polo Learning",    year: 2015, project: "First brand system",              role: "Lead PD · brand",                      image: colorBox("#00CEC9"), alt: "Turquoise placeholder" },
  { client: "Marco Polo",       employer: "Marco Polo Learning",    year: 2015, project: "Pilot user studies",              role: "Research · synthesis",                 image: colorBox("#FF7675"), alt: "Salmon placeholder" },
  { client: "Marco Polo",       employer: "Marco Polo Learning",    year: 2015, project: "Investor deck",                   role: "Visual design",                        image: colorBox("#636E72"), alt: "Slate placeholder" },
  { client: "Marco Polo",       employer: "Marco Polo Learning",    year: 2015, project: "Logo + first identity",           role: "Brand · identity",                     image: colorBox("#2D3436"), alt: "Charcoal placeholder" },
];
