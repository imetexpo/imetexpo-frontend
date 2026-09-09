export const HERO_IMAGE =
  'https://rubber-tyre.com.vn/wp-content/uploads/2025/07/CTHE0129-min-scaled.webp';

export const speakersData = [
  {
    id: '1',
    name: 'Dr. Robert Chen',
    title: 'Head of Tyre Technology',
    company: 'Bridgestone Corporation',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Aleksandr_Pistun_f52df668a9.png',
    session: 'Future of Smart Tyres',
    time: 'Day 1, 10:15 AM',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    title: 'Director of Sustainability',
    company: 'Michelin',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Kondrateva_1_79bf33c0ac.png',
    session: 'Sustainable Materials',
    time: 'Day 1, 11:30 AM',
  },
  {
    id: '3',
    name: 'Prof. Markus Weber',
    title: 'Head of Rubber Technology',
    company: 'Fraunhofer Institute',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Shulcz_45477a7a66.png',
    session: 'Advanced Compounds',
    time: 'Day 1, 12:00 PM',
  },
  {
    id: '4',
    name: 'Lisa Zhang',
    title: 'VP of Manufacturing',
    company: 'Continental',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Sorokousova_a6593878a3.png',
    session: 'Industry 4.0',
    time: 'Day 1, 2:30 PM',
  },
  {
    id: '5',
    name: 'James Wilson',
    title: 'CTO',
    company: 'Goodyear',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Sorokousova_a6593878a3.png',
    session: 'AI Quality Control',
    time: 'Day 2, 10:00 AM',
  },
  {
    id: '6',
    name: 'Dr. Anita Desai',
    title: 'Research Director',
    company: 'Apollo Tyres',
    imageUrl: 'https://regional-cdn.itegroupnews.com/uehjd_9ead53b16a.png',
    session: 'Green Materials',
    time: 'Day 2, 11:00 AM',
  },
  {
    id: '7',
    name: 'Michael Brown',
    title: 'CEO',
    company: 'Tyre Recycling Solutions',
    imageUrl: 'https://regional-cdn.itegroupnews.com/uehjd_9ead53b16a.png',
    session: 'Recycling Tech',
    time: 'Day 2, 2:00 PM',
  },
  {
    id: '8',
    name: 'Dr. Elena Petrova',
    title: 'Head of Innovation',
    company: 'Nokian Tyres',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Kuzneczov_feddd81b00.png',
    session: 'Smart Sensors',
    time: 'Day 2, 3:30 PM',
  },
];

export type SpeakerSlot = { name: string; position: string };
export type SessionTopic = { id: number; title: string };
export type Session = {
  time: string;
  title: string;
  description?: string;
  moderator?: SpeakerSlot;
  speakers?: SpeakerSlot[];
  topics?: SessionTopic[];
};
export type DayProgram = {
  day: string;
  date: string;
  description: string;
  sessions: Session[];
};

export const programData: DayProgram[] = [
  {
    day: 'Day 1 Theme : The Future of Tyre Manufacturing – Innovation, Automation & Manufacturing Excellence',
    date: 'April 22, 2027',
    description: '*For delegates',
    sessions: [
      { time: '09:00 – 09:35', title: 'Registration & Hi Tea' },
      { time: '09:35 – 09:40', title: 'Lamp Lighting' },
      {
        time: '09:40 – 09:45',
        title: 'Welcome Address',
        speakers: [{ name: 'Mr. Padmanabham R', position: 'MD, Maxx Business Media Pvt. Ltd.' }],
      },
      { time: '09:45 – 09:55', title: 'Chief Guest Address' },
      { time: '09:55 – 10:05', title: 'Guest of Honour Address' },
      { time: '10:05 – 10:15', title: 'Guest of Honour Address' },
      {
        time: '10:15 – 10:25',
        title: "Inaugural Keynote – India's Vision for Tyre Manufacturing Leadership 2035",
      },
      {
        time: '10:25 – 10:30',
        title: 'Vote of Thanks',
        speakers: [{ name: 'Director', position: 'Maxx Business Media Pvt. Ltd.' }],
      },
      {
        time: '10:30 – 11:30',
        title: 'Panel Discussion : Smart Manufacturing & Industry 4.0 in Tyre Production',
        description: 'Session Topics:',
        topics: [
          { id: 1, title: 'AI and machine learning in tyre manufacturing' },
          { id: 2, title: 'IoT-enabled production lines' },
          { id: 3, title: 'Predictive maintenance and quality control' },
          { id: 4, title: 'Digital twins and closed-loop manufacturing' },
          { id: 5, title: 'Smart factories powered by precision process control' },
        ],
      },
      {
        time: '11:30 – 12:00',
        title: 'Technical Session 1 : Advanced Rubber Compounds & Material Innovation',
        description: 'Session Topics:',
        topics: [
          { id: 1, title: 'Next-generation compounding technologies' },
          { id: 2, title: 'Silica and filler systems for lower rolling resistance' },
          { id: 3, title: 'High-performance materials for EV tyres' },
          { id: 4, title: 'Lab-to-plant scale-up challenges' },
        ],
      },
      {
        time: '12:00 – 12:30',
        title: 'Technical Session 2 : Tyre Testing, Uniformity & Quality Assurance',
        description: 'Session Topics:',
        topics: [
          { id: 1, title: 'Uniformity, balancing and endurance testing' },
          { id: 2, title: 'X-ray and vision inspection systems' },
          { id: 3, title: 'Automated quality inspection cells' },
          { id: 4, title: 'Reducing defect rates without slowing the line' },
        ],
      },
      {
        time: '12:30 – 13:00',
        title: 'Fireside Chat : Precision Manufacturing in the EV & Commercial Vehicle Era',
        description: 'Discussion Points:',
        topics: [
          { id: 1, title: 'Tight performance requirements for EV tyres' },
          { id: 2, title: 'Load, noise and range trade-offs' },
          { id: 3, title: 'OEM homologation challenges' },
          { id: 4, title: 'Future inspection and validation technologies' },
        ],
      },
      { time: '13:00 – 14:00', title: 'Networking Lunch' },
      {
        time: '14:00 – 14:30',
        title: 'Technical Session 3 : Automation & Robotics in Tyre Manufacturing',
        description: 'Session Topics:',
        topics: [
          { id: 1, title: 'Robotic process automation in tyre assembly' },
          { id: 2, title: 'Automated material handling' },
          { id: 3, title: 'Lights-out manufacturing capabilities' },
          { id: 4, title: 'Workforce transformation on the shop floor' },
        ],
      },
      {
        time: '14:30 – 15:30',
        title: 'Panel Discussion : Quality 4.0 – Digital Inspection & Manufacturing Excellence',
        description: 'Discussion Topics:',
        topics: [
          { id: 1, title: 'AI in dimensional and visual inspection' },
          { id: 2, title: 'Digital quality management' },
          { id: 3, title: 'Predictive quality analytics' },
          { id: 4, title: 'Zero-defect manufacturing' },
          { id: 5, title: 'Smart production lines' },
        ],
      },
      { time: '15:30 – 16:00', title: 'Networking Hi Tea' },
      {
        time: '16:00 – 16:30',
        title: 'Fireside Chat : The Future of AI, Digital Twins & Smart Tyre Plants',
        description: 'Discussion Points:',
        topics: [
          { id: 1, title: 'AI-assisted process control' },
          { id: 2, title: 'Digital twins for tyre plants' },
          { id: 3, title: 'Cloud-connected manufacturing' },
          { id: 4, title: 'Autonomous inspection systems' },
        ],
      },
      {
        time: '16:30 – 17:00',
        title: 'Technical Session 4 : Smart Tyres, Sensors & Connected Mobility',
        description: 'Session Topics:',
        topics: [
          { id: 1, title: 'Embedded sensors and TPMS evolution' },
          { id: 2, title: 'Real-time tyre health monitoring' },
          { id: 3, title: 'Data platforms for fleets and OEMs' },
          { id: 4, title: 'Opportunities in commercial vehicle telematics' },
        ],
      },
      { time: '17:00 – 17:10', title: 'Closing Remarks' },
    ],
  },
  {
    day: 'Day 2 Theme : Innovation, Sustainability & Next-Generation Tyre Technologies',
    date: 'April 23, 2027',
    description: '*For delegates of all categories',
    sessions: [
      { time: '09:30 – 10:00', title: 'Registration & Hi Tea' },
      {
        time: '10:00 – 11:00',
        title: 'Panel Discussion : Circular Economy & Tyre Recycling',
        description: 'Discussion Topics:',
        topics: [
          { id: 1, title: 'End-of-life tyre management' },
          { id: 2, title: 'Recycling technologies and recovered carbon black' },
          { id: 3, title: 'EPR norms and regulatory compliance' },
          { id: 4, title: 'Building globally competitive green factories' },
        ],
      },
      {
        time: '11:00 – 11:30',
        title: 'Technical Session 5 : Sustainable Raw Materials for Eco-Friendly Tyres',
        description: 'Session Topics:',
        topics: [
          { id: 1, title: 'Bio-based polymers and fillers' },
          { id: 2, title: 'Natural rubber sourcing resilience' },
          { id: 3, title: 'Reducing carbon footprint in compounding' },
          { id: 4, title: 'Renewable energy on the factory floor' },
        ],
      },
      {
        time: '11:30 – 12:00',
        title: 'Fireside Chat : Reducing Carbon Footprint in Tyre Manufacturing',
        description: 'Discussion Points:',
        topics: [
          { id: 1, title: 'Energy-efficient production' },
          { id: 2, title: 'Renewable energy integration' },
          { id: 3, title: 'Carbon-neutral plant roadmaps' },
          { id: 4, title: "India's opportunity in green mobility tyres" },
        ],
      },
      {
        time: '12:00 – 12:30',
        title: 'Technical Session 6 : Advanced Recycling & Recovered Materials',
        description: 'Session Topics:',
        topics: [
          { id: 1, title: 'Pyrolysis and mechanical recycling' },
          { id: 2, title: 'Recovered carbon black applications' },
          { id: 3, title: 'Devulcanisation technologies' },
          { id: 4, title: 'Quality consistency of recycled inputs' },
        ],
      },
      {
        time: '12:30 – 13:00',
        title: 'Technical Session 7 : Retreading, Lifetime Value & Fleet Solutions',
        description: 'Session Topics:',
        topics: [
          { id: 1, title: 'Modern retreading processes' },
          { id: 2, title: 'Inspection of casings and wear' },
          { id: 3, title: 'Total cost of ownership for fleets' },
          { id: 4, title: 'Digital tracking across the tyre lifecycle' },
        ],
      },
      { time: '13:00 – 14:00', title: 'Networking Lunch' },
      {
        time: '14:00 – 15:00',
        title: "Panel Discussion : Global Tyre Trends & India's Manufacturing Competitiveness",
        description: 'Discussion Topics:',
        topics: [
          { id: 1, title: 'Export readiness and quality regulations' },
          { id: 2, title: 'Global supply chain requirements' },
          { id: 3, title: 'Smart manufacturing benchmarks' },
          { id: 4, title: 'Workforce development' },
          { id: 5, title: "India's roadmap as a global tyre hub" },
        ],
      },
      { time: '15:00 – 15:30', title: 'Networking Hi Tea' },
      {
        time: '15:30 – 16:00',
        title: 'Fireside Chat : Precision Without Limits – Next-Generation Tyre Plants',
        description: 'Discussion Topics:',
        topics: [
          { id: 1, title: 'AI-enabled process and inspection systems' },
          { id: 2, title: 'In-line measurement and shop-floor metrology' },
          { id: 3, title: 'Digital twins and predictive quality' },
          { id: 4, title: 'The future of autonomous production cells' },
        ],
      },
      {
        time: '16:00 – 16:30',
        title: 'Technical Session 8 : Testing Laboratories, Standards & Compliance',
        description: 'Session Topics:',
        topics: [
          { id: 1, title: 'Lab accreditation best practices' },
          { id: 2, title: 'BIS, ECE and OEM test protocols' },
          { id: 3, title: 'Digital test certificates' },
          { id: 4, title: 'International compliance for exports' },
        ],
      },
      {
        time: '16:30 – 17:00',
        title: 'Technical Session 9 : Additive Manufacturing, Tooling & Reverse Engineering',
        description: 'Session Topics:',
        topics: [
          { id: 1, title: '3D printed moulds, jigs and fixtures' },
          { id: 2, title: 'Reverse engineering of tyre mould geometry' },
          { id: 3, title: 'Rapid prototyping for new patterns' },
          { id: 4, title: 'Hybrid manufacturing on the shop floor' },
        ],
      },
      { time: '17:00 – 17:10', title: 'Closing Remarks' },
    ],
  },
];

export const aboutStats = [
  {
    title: '300+ senior delegates',
    body: 'From leading tyre manufacturers, rubber compounders, automotive OEMs, retreaders, machinery suppliers, testing labs, and quality-driven mobility companies.',
  },
  {
    title: '30+ speakers',
    body: 'Including plant heads, compounding experts, sustainability leaders, automation specialists, R&D directors, and technology innovators.',
  },
  {
    title: '15+ hours of technical sessions',
    body: 'Covering tyre manufacturing, rubber compounds, automation, testing, recycling, EV tyres, digital plants, and smart factory innovations.',
  },
  {
    title: '8+ hours of networking',
    body: 'With OEMs, Tier 1 & Tier 2 suppliers, quality engineers, equipment vendors, research institutions, and procurement decision-makers.',
  },
];

export const whyAttend = [
  {
    title: 'Gain Insights into the Latest Tyre & Rubber Technologies',
    description:
      'Stay ahead of the rapidly evolving manufacturing landscape by exploring the latest innovations in compounding, automation, testing, retreading, recycling, digital quality management, and Industry 4.0. Learn directly from global technology leaders and plant professionals.',
  },
  {
    title: 'Discover New Business & Technology Opportunities',
    description:
      'Explore how advanced manufacturing solutions can improve accuracy, reduce production costs, enhance product quality, and accelerate digital transformation across passenger, commercial, OTR, and EV tyre segments.',
  },
  {
    title: 'Build High-Value Industry Connections',
    description:
      'The India Tyre Show Summit is an exclusive platform to network with plant leaders, quality managers, OEMs, testing laboratories, research institutions, automation providers, and technology innovators.',
  },
  {
    title: 'Maximise Your Exhibition & Business ROI',
    description:
      'Summit sessions give exhibitors and delegates market intelligence, customer insights, and technology trends that strengthen product positioning and improve engagement with prospective customers during the show.',
  },
];

export const delegatePackages = [
  {
    id: 1,
    title: 'Student',
    price: '₹ 3,500',
    features: [
      'Access to all technical summit sessions',
      'Summit kit (Badge, Folder, Notepad, Pen)',
      'Entry to exhibition area (all 3 days)',
      'Interaction with industry experts & speakers',
      'Certificate of Participation',
      'Career guidance & mentorship interaction',
      'Internship & placement opportunity connect',
      'Digital access to summit presentation summaries',
      'Lunch & refreshments',
    ],
  },
  {
    id: 2,
    title: 'General',
    price: '₹ 6,000',
    features: [
      'Full access to all summit sessions',
      'Entry to exhibition area (all 3 days)',
      'Summit kit (Badge, Folder, Notepad, Pen)',
      'Access to networking lunch & tea breaks',
      'B2B networking opportunity',
      'Access to speakers’ presentation (digital copy post event)',
      'Certificate of Participation',
      'Entry to Business Networking Meet',
      'Access to post-event report & industry insights summary',
    ],
  },
  {
    id: 3,
    title: 'Group of 3',
    price: '₹ 15,000',
    features: [
      'Full summit access (all sessions)',
      'Priority seating in technical sessions',
      'Exhibition entry (all 3 days)',
      'Reserved group seating',
      'Company name recognition on delegate list',
      'Access to networking lunch & tea breaks',
      'Digital presentations access',
      'Participation certificates for all 3',
      'Group networking badge recognition',
      'Priority B2B meeting assistance (pre-scheduled on request)',
    ],
  },
];

export const faqItems = [
  {
    id: 1,
    question: 'When will the India Tyre Show Summit take place?',
    answer: 'April 22–23, 2027, alongside India Tyre Show 2027 (22–24 April).',
  },
  {
    id: 2,
    question: 'Can I participate in the Summit online?',
    answer: 'No. The Summit will be held offline at the Auto Cluster Exhibition Centre, Pune.',
  },
  {
    id: 3,
    question: 'Will there be recordings of the business programme?',
    answer:
      'No. Delegates will be able to receive presentation materials where speakers have given approval.',
  },
  {
    id: 4,
    question: 'Can I get a ticket refund?',
    answer:
      'Yes, but only within specified deadlines. Refund rules depend on how close the cancellation is to the event start date.',
  },
  {
    id: 5,
    question: 'Can I get a group discount on the ticket price?',
    answer: 'Yes. Group pricing is available for 3 or more delegates booking at the same time.',
  },
  {
    id: 6,
    question: 'Can I pay for tickets by card?',
    answer: 'Yes. Select the card payment option on the website in the payment section.',
  },
];

export const venueImages = [
  'https://rubber-tyre.com.vn/wp-content/uploads/2025/07/CTHE0129-min-scaled.webp',
  'https://www.pace-tyres.com/static/upload/image/20230915/1694772403135963.jpg',
  'https://www.team-bhp.com/forum/attachments/tyre-alloy-wheel-section/2716695d1737442979-bharat-mobility-expo-2025-india-international-tyre-show-2025-dscf1158.jpg',
];
