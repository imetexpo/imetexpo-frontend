export type NavLink = {
  text: string;
  href: string;
};

export type NavItem = {
  title: string;
  href?: string;
  links: NavLink[];
};

export const navItems: NavItem[] = [
  {
    title: 'About',
    links: [
      { text: 'About IndiaMet Expo', href: '/about/' },
      { text: 'About The Organizer', href: '/about-organizer/' },
      { text: 'Partners & Sponsors', href: '/partners-and-sponsors/' },
    ],
  },
  {
    title: 'Exhibit',
    links: [
      { text: 'Why Exhibit', href: '/why-exhibit/' },
      { text: 'Event Sectors', href: '/sectors/' },
      { text: 'Plan Your Travel', href: '/plan-your-travel/' },
      { text: 'Exhibitor Resource Center', href: '/exhibitor-resource-center/' },
      { text: 'Become an Exhibitor', href: '/exhibiting-enquiry/' },
      { text: 'Sponsorship Opportunities', href: '/sponsorship-opportunities/' },
      { text: 'View Exhibitor List 2026', href: '/exhibition-directory/' },
    ],
  },
  {
    title: 'Visit',
    links: [
      { text: 'Why Visit', href: '/why-visit/' },
      { text: 'Visitor Pass', href: '/passes/' },
      { text: 'Event Sectors', href: '/sectors/' },
      { text: 'Exhibitor List', href: '/exhibition-directory/' },
      { text: 'Download Brochure', href: '/register?t=brochure' },
    ],
  },
  {
    title: 'Insights',
    links: [
      { text: 'Articles and Latest News', href: '/articles/' },
      { text: 'Event Brochure', href: '/event-brochure/' },
    ],
  },
  {
    title: 'Summit',
    links: [
      { text: 'Summit Agenda', href: '/summit/' },
      { text: 'Delegate', href: '/became-delegate/' },
      { text: 'Sponsor', href: '/register?t=sponsor' },
    ],
  },
  {
    title: 'GMEA Awards',
    links: [
      { text: 'Award Category', href: '/awards/' },
      { text: 'Nominate', href: '/nominate/' },
      { text: 'Sponsor', href: '/register?t=sponsor' },
    ],
  },
  { title: 'Contact Us', href: '/contact-us/', links: [] },
];
