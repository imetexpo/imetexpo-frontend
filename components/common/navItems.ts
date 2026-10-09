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
    title: 'ABOUT',
    links: [
      { text: 'About IndiaMet Expo', href: '/about/' },
      { text: 'About The Organizer', href: '/about-organizer/' },
      { text: 'Partners & Sponsors', href: '/partners-and-sponsors/' },
    ],
  },
  {
    title: 'EXHIBIT',
    links: [
      { text: 'Why Exhibit', href: '/why-exhibit/' },
      { text: 'Event Sectors', href: '/sectors/' },
      { text: 'Plan Your Travel', href: '/plan-your-travel/?tab=exhibitor' },
     
      { text: 'Become an Exhibitor', href: '/exhibiting-enquiry/' },
      { text: 'Sponsorship Opportunities', href: '/sponsorship-opportunities/' },
      { text: 'View Exhibitor List 2026', href: '/exhibition-directory/' },
    ],
  },
  {
    title: 'VISIT',
    links: [
      { text: 'Why Visit', href: '/why-visit/' },
      { text: 'Plan Your Travel', href: '/plan-your-travel/?tab=visitor' },
    
      { text: 'Visitor Pass', href: '/passes/' },
      { text: 'Event Sectors', href: '/sectors/' },
      { text: 'Exhibitor List', href: '/exhibition-directory/' },
      { text: 'Download Brochure', href: '/register?t=brochure' },
    ],
  },
  {
    title: 'INSIGHTS',
    links: [
      { text: 'Articles and Latest News', href: '/articles/' },
      { text: 'Event Brochure', href: '/event-brochure/' },
    ],
  },
  {
    title: 'SUMMIT',
    links: [
      { text: 'Summit Agenda', href: '/summit/' },
      { text: 'Delegate', href: '/became-delegate/' },
      { text: 'Sponsor', href: '/register?t=sponsor' },
    ],
  },
  {
    title: 'GMEA AWARDS',
    links: [
      { text: 'Award Category', href: '/awards/' },
      { text: 'Nominate', href: '/nominate/' },
      { text: 'Sponsor', href: '/register?t=sponsor' },
    ],
  },
  { title: 'CONTACT US', href: '/contact-us/', links: [] },
];
