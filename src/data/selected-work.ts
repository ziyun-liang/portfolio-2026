export interface SelectedWorkEntry {
  client: string;
  employer: string;
  year: number;
  project: string;
  role: string;
  image: string;
  alt: string;
}

export const selectedWork: SelectedWorkEntry[] = [
  {
    client: "Visible Mobile",
    employer: "Madwell",
    year: 2022,
    project: "This beach is a phone store",
    role: "Art direction · OOH production",
    image: "/media/selected/visible-mobile-billboard.jpg",
    alt: "Truck-mounted billboard reading 'This beach is a phone store' with the Visible logo, parked near a beach with workers in safety vests.",
  },
];
