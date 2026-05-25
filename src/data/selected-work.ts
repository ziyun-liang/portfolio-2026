export interface SelectedWorkEntry {
  project: string;
  employer: string;
  year: number;
  role: string;
  image: string;
  alt: string;
  /** Optional outbound link — when present, the project name becomes clickable. */
  url?: string;
}

// Inline color-box image as a data URI. Used as a placeholder while real
// imagery is being collected. The `#` is encoded so the URI stays a single
// fragment (otherwise the browser treats `#FF6B6B` as a fragment identifier).
const colorBox = (hex: string): string => {
  const safe = hex.replace("#", "%23");
  return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 1 1'><rect width='1' height='1' fill='${safe}'/></svg>`;
};

export const selectedWork: SelectedWorkEntry[] = [
  { project: "NYT Cooking",                 employer: "NYT",                year: 2025, role: "Concept",                                                       image: colorBox("#FF6B6B"), alt: "Coral red placeholder" },
  { project: "AI User Research Site",       employer: "NYT",                year: 2025, role: "Vibe Code with Figma Make",                                     image: colorBox("#4ECDC4"), alt: "Teal placeholder" },
  { project: "NYT Movie Planner",           employer: "NYT",                year: 2025, role: "Vibe Code with Figma Make",                                     image: colorBox("#FFE66D"), alt: "Yellow placeholder" },
  { project: "NYT Cooking Planner",         employer: "NYT",                year: 2025, role: "Vibe Code with Figma Make",                                     image: colorBox("#95E1D3"), alt: "Mint placeholder" },
  { project: "Your Daytime Firework",       employer: "TRLab",              year: 2022, role: "Product direction, NFT production",                             image: colorBox("#C44569"), alt: "Magenta placeholder" },
  { project: "RFLCT",                       employer: "Kettle",             year: 2022, role: "UX/UI Direction",                                               image: colorBox("#F8B500"), alt: "Amber placeholder" },
  { project: "The Calder Question",         employer: "TRLab",              year: 2022, role: "UX/UI Direction",                                               image: colorBox("#6C5CE7"), alt: "Purple placeholder" },
  { project: "Space-between Ads",           employer: "NYT",                year: 2021, role: "Concept",                                                       image: colorBox("#00B894"), alt: "Emerald placeholder" },
  { project: "Wordle Desktop Ad",           employer: "NYT",                year: 2021, role: "UX/UI Direction",                                               image: colorBox("#E17055"), alt: "Terracotta placeholder" },
  { project: "MasterClass",                 employer: "Kettle",             year: 2020, role: "UX/UI Direction",                                               image: colorBox("#74B9FF"), alt: "Sky placeholder" },
  { project: "Apple",                       employer: "Kettle",             year: 2020, role: "UX/UI Direction",                                               image: colorBox("#FD79A8"), alt: "Pink placeholder" },
  { project: "Kettle Website",              employer: "Kettle",             year: 2020, role: "UX/UI Direction",                                               image: colorBox("#A29BFE"), alt: "Lavender placeholder" },
  { project: "Apple App Store",             employer: "Kettle",             year: 2020, role: "UX/UI Direction",                                               image: colorBox("#FDCB6E"), alt: "Sun placeholder", url: "https://www.apple.com/app-store/" },
  { project: "KORESS",                      employer: "Kettle",             year: 2020, role: "UX/UI Direction",                                               image: colorBox("#55EFC4"), alt: "Spring placeholder" },
  { project: "American Express App",        employer: "Kettle",             year: 2019, role: "Concept",                                                       image: colorBox("#FAB1A0"), alt: "Peach placeholder" },
  { project: "Babe Hatch Blog",             employer: "Hatch",              year: 2019, role: "UX/UI Direction",                                               image: colorBox("#81ECEC"), alt: "Cyan placeholder" },
  { project: "Lycored",                     employer: "Madwell",            year: 2018, role: "UX/UI Direction",                                               image: colorBox("#00CEC9"), alt: "Turquoise placeholder" },
  { project: "Visible",                     employer: "Madwell",            year: 2018, role: "Design Direction, Production",                                  image: colorBox("#FF7675"), alt: "Salmon placeholder" },
  { project: "The Polos TV Show",           employer: "MarcoPolo Learning", year: 2018, role: "Character Design, TV show storyboard",                          image: colorBox("#636E72"), alt: "Slate placeholder" },
  { project: "MarcoPolo World Schools",     employer: "MarcoPolo Learning", year: 2017, role: "UX/UI Direction, Illustration, Game Design, Production",        image: colorBox("#2D3436"), alt: "Charcoal placeholder" },
];
