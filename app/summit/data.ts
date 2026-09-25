export const HERO_IMAGE =
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2000&q=80';

export const speakersData = [
  {
    id: '1',
    name: 'Dr. Anil Kumar',
    title: 'Senior Scientist',
    company: 'National Physical Laboratory (NPL)',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Aleksandr_Pistun_f52df668a9.png',
    session: 'The Future of Precision Metrology in India',
    time: 'Day 1, 10:15 AM',
  },
  {
    id: '2',
    name: 'Ms. Priya Sharma',
    title: 'Director – Quality & Metrology',
    company: 'Automotive Industry',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Kondrateva_1_79bf33c0ac.png',
    session: 'Advanced Measurement for Automotive Manufacturing',
    time: 'Day 1, 11:30 AM',
  },
  {
    id: '3',
    name: 'Prof. Rajesh Menon',
    title: 'Professor & Metrology Specialist',
    company: 'Engineering & Research Institute',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Shulcz_45477a7a66.png',
    session: 'Next-Generation Dimensional Metrology',
    time: 'Day 1, 12:00 PM',
  },
  {
    id: '4',
    name: 'Mr. Daniel Weber',
    title: 'VP – Industrial Metrology',
    company: 'Global Metrology Technology Company',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Sorokousova_a6593878a3.png',
    session: 'Smart Metrology & Industry 4.0',
    time: 'Day 1, 2:30 PM',
  },
  {
    id: '5',
    name: 'Mr. Arjun Mehta',
    title: 'Head – Quality Engineering',
    company: 'Leading Manufacturing Group',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Sorokousova_a6593878a3.png',
    session: 'AI-Based Inspection & Quality Control',
    time: 'Day 2, 10:00 AM',
  },
  {
    id: '6',
    name: 'Dr. Meera Iyer',
    title: 'Technical Director',
    company: 'NABL Accredited Laboratory',
    imageUrl: 'https://regional-cdn.itegroupnews.com/uehjd_9ead53b16a.png',
    session: 'Calibration, Traceability & Measurement Standards',
    time: 'Day 2, 11:00 AM',
  },
  {
    id: '7',
    name: 'Mr. Vikram Rao',
    title: 'CEO',
    company: 'Industrial Inspection Solutions',
    imageUrl: 'https://regional-cdn.itegroupnews.com/uehjd_9ead53b16a.png',
    session: 'Automated Inspection & Zero-Defect Manufacturing',
    time: 'Day 2, 2:00 PM',
  },
  {
    id: '8',
    name: 'Dr. Elena Petrova',
    title: 'Head of Innovation',
    company: 'Advanced Measurement Technologies',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Kuzneczov_feddd81b00.png',
    session: '3D Scanning, Digital Twins & Future Metrology',
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
    day: 'Day 1 Theme : The Future of Metrology – Precision Measurement, Inspection & Quality Excellence',
    date: 'April 22, 2027',
    description: '*For delegates',
    sessions: [
      { time: '09:00 – 09:35', title: 'Registration & Hi Tea' },
      { time: '09:35 – 09:40', title: 'Lamp Lighting' },
      {
        time: '09:40 – 09:45',
        title: 'Welcome Address',
        speakers: [
          {
            name: 'Mr. Padmanabham R',
            position: 'MD, Maxx Business Media Pvt. Ltd.',
          },
        ],
      },
      { time: '09:45 – 09:55', title: 'Chief Guest Address' },
      { time: '09:55 – 10:05', title: 'Guest of Honour Address' },
      {
        time: '10:05 – 10:15',
        title: 'Inaugural Keynote – India’s Vision for Global Metrology & Quality Leadership',
      },
      {
        time: '10:15 – 10:25',
        title: 'Vote of Thanks',
        speakers: [
          {
            name: 'Director',
            position: 'Maxx Business Media Pvt. Ltd.',
          },
        ],
      },

      {
        time: '10:25 – 11:25',
        title:
          'Panel Discussion : The Future of Precision Measurement in Advanced Manufacturing',
        description: 'Session Topics:',
        topics: [
          { id: 1, title: 'Evolution of industrial metrology' },
          { id: 2, title: 'Precision measurement for high-value manufacturing' },
          { id: 3, title: 'Measurement challenges in EV and aerospace components' },
          { id: 4, title: 'Integration of metrology with production systems' },
          { id: 5, title: 'Building world-class measurement capabilities in India' },
        ],
      },

      {
        time: '11:25 – 11:55',
        title:
          'Technical Session 1 : Advanced Dimensional Metrology & Precision Measurement',
        description: 'Session Topics:',
        topics: [
          { id: 1, title: 'Coordinate Measuring Machines and advanced CMM technologies' },
          { id: 2, title: 'Portable and shop-floor metrology' },
          { id: 3, title: 'High-accuracy dimensional measurement' },
          { id: 4, title: 'Measurement uncertainty and accuracy management' },
        ],
      },

      {
        time: '11:55 – 12:25',
        title:
          'Technical Session 2 : CMM, Optical Measurement & Automated Inspection',
        description: 'Session Topics:',
        topics: [
          { id: 1, title: 'Advanced CMM programming and inspection' },
          { id: 2, title: 'Vision measurement systems' },
          { id: 3, title: 'Optical and non-contact measurement' },
          { id: 4, title: 'Automated inspection cells' },
        ],
      },

      {
        time: '12:25 – 12:55',
        title:
          'Fireside Chat : Metrology as a Strategic Tool for Manufacturing Excellence',
        description: 'Discussion Points:',
        topics: [
          { id: 1, title: 'Reducing measurement-related production losses' },
          { id: 2, title: 'Improving dimensional accuracy and repeatability' },
          { id: 3, title: 'Connecting inspection with production decisions' },
          { id: 4, title: 'From quality control to predictive quality' },
        ],
      },

      { time: '12:55 – 14:00', title: 'Networking Lunch' },

      {
        time: '14:00 – 14:30',
        title:
          'Technical Session 3 : 3D Scanning, Reverse Engineering & Digital Measurement',
        description: 'Session Topics:',
        topics: [
          { id: 1, title: '3D laser scanning technologies' },
          { id: 2, title: 'Structured-light scanning' },
          { id: 3, title: 'Reverse engineering and CAD comparison' },
          { id: 4, title: 'Digital inspection workflows' },
        ],
      },

      {
        time: '14:30 – 15:30',
        title:
          'Panel Discussion : Quality 4.0 – Digital Metrology, AI & Smart Inspection',
        description: 'Discussion Topics:',
        topics: [
          { id: 1, title: 'AI-powered inspection and defect detection' },
          { id: 2, title: 'Digital quality management' },
          { id: 3, title: 'Real-time measurement data' },
          { id: 4, title: 'Predictive quality analytics' },
          { id: 5, title: 'Connected inspection systems' },
        ],
      },

      { time: '15:30 – 16:00', title: 'Networking Hi Tea' },

      {
        time: '16:00 – 16:30',
        title:
          'Fireside Chat : Smart Metrology & Industry 4.0',
        description: 'Discussion Points:',
        topics: [
          { id: 1, title: 'Connected measurement systems' },
          { id: 2, title: 'Digital twins and virtual inspection' },
          { id: 3, title: 'Cloud-based measurement data' },
          { id: 4, title: 'Automated decision-making from quality data' },
        ],
      },

      {
        time: '16:30 – 17:00',
        title:
          'Technical Session 4 : Surface, Form & Geometric Measurement',
        description: 'Session Topics:',
        topics: [
          { id: 1, title: 'Surface roughness measurement' },
          { id: 2, title: 'Roundness, cylindricity and form measurement' },
          { id: 3, title: 'Profile and contour measurement' },
          { id: 4, title: 'GD&T and tolerance verification' },
        ],
      },

      { time: '17:00 – 17:10', title: 'Closing Remarks' },
    ],
  },

  {
    day: 'Day 2 Theme : Calibration, Testing, Inspection & Next-Generation Quality Technologies',
    date: 'April 23, 2027',
    description: '*For delegates of all categories',
    sessions: [
      { time: '09:30 – 10:00', title: 'Registration & Hi Tea' },

      {
        time: '10:00 – 11:00',
        title:
          'Panel Discussion : Building a Strong Calibration & Measurement Ecosystem',
        description: 'Discussion Topics:',
        topics: [
          { id: 1, title: 'Measurement traceability' },
          { id: 2, title: 'Calibration best practices' },
          { id: 3, title: 'NABL laboratories and quality infrastructure' },
          { id: 4, title: 'National and international measurement standards' },
          { id: 5, title: 'Reducing uncertainty in industrial measurement' },
        ],
      },

      {
        time: '11:00 – 11:30',
        title:
          'Technical Session 5 : Calibration, Traceability & Measurement Standards',
        description: 'Session Topics:',
        topics: [
          { id: 1, title: 'Calibration laboratory best practices' },
          { id: 2, title: 'Traceability and reference standards' },
          { id: 3, title: 'Measurement uncertainty' },
          { id: 4, title: 'Digital calibration certificates' },
        ],
      },

      {
        time: '11:30 – 12:00',
        title:
          'Fireside Chat : Measurement Confidence in Global Manufacturing',
        description: 'Discussion Points:',
        topics: [
          { id: 1, title: 'International measurement standards' },
          { id: 2, title: 'Global customer quality requirements' },
          { id: 3, title: 'Measurement traceability for exports' },
          { id: 4, title: 'Building confidence in Indian manufacturing' },
        ],
      },

      {
        time: '12:00 – 12:30',
        title:
          'Technical Session 6 : NDT, Material Testing & Advanced Inspection',
        description: 'Session Topics:',
        topics: [
          { id: 1, title: 'Ultrasonic and eddy current testing' },
          { id: 2, title: 'X-ray and industrial CT inspection' },
          { id: 3, title: 'Material and mechanical testing' },
          { id: 4, title: 'Advanced defect detection technologies' },
        ],
      },

      {
        time: '12:30 – 13:00',
        title:
          'Technical Session 7 : Machine Vision & Automated Quality Inspection',
        description: 'Session Topics:',
        topics: [
          { id: 1, title: 'AI-based visual inspection' },
          { id: 2, title: 'Automated defect detection' },
          { id: 3, title: 'High-speed production inspection' },
          { id: 4, title: 'Vision systems for zero-defect manufacturing' },
        ],
      },

      { time: '13:00 – 14:00', title: 'Networking Lunch' },

      {
        time: '14:00 – 15:00',
        title:
          'Panel Discussion : Metrology for Automotive, Aerospace, EV & Precision Engineering',
        description: 'Discussion Topics:',
        topics: [
          { id: 1, title: 'Measurement challenges in automotive manufacturing' },
          { id: 2, title: 'EV component inspection and validation' },
          { id: 3, title: 'Aerospace precision and traceability' },
          { id: 4, title: 'Dies, moulds and precision tooling inspection' },
          { id: 5, title: 'Measurement requirements for high-precision components' },
        ],
      },

      { time: '15:00 – 15:30', title: 'Networking Hi Tea' },

      {
        time: '15:30 – 16:00',
        title:
          'Fireside Chat : Precision Without Limits – The Future of Digital Metrology',
        description: 'Discussion Points:',
        topics: [
          { id: 1, title: 'AI-enabled metrology' },
          { id: 2, title: 'Digital twins and virtual inspection' },
          { id: 3, title: 'Automated measurement systems' },
          { id: 4, title: 'Cloud-connected metrology' },
        ],
      },

      {
        time: '16:00 – 16:30',
        title:
          'Technical Session 8 : Standards, Compliance & Quality Infrastructure',
        description: 'Session Topics:',
        topics: [
          { id: 1, title: 'NABL accreditation and laboratory competence' },
          { id: 2, title: 'National and international standards' },
          { id: 3, title: 'Calibration and test documentation' },
          { id: 4, title: 'Quality compliance for global supply chains' },
        ],
      },

      {
        time: '16:30 – 17:00',
        title:
          'Technical Session 9 : Emerging Metrology Technologies & Future Manufacturing',
        description: 'Session Topics:',
        topics: [
          { id: 1, title: 'Inline and in-process measurement' },
          { id: 2, title: 'Robotic inspection systems' },
          { id: 3, title: 'Metrology for additive manufacturing' },
          { id: 4, title: 'Smart sensors and connected measurement' },
        ],
      },

      { time: '17:00 – 17:10', title: 'Closing Remarks' },
    ],
  },
];

export const aboutStats = [
  {
    title: '300+ senior delegates',
    body: 'From manufacturing companies, automotive and EV industries, aerospace, precision engineering, dies & moulds, electronics, quality departments, laboratories and research institutions.',
  },
  {
    title: '30+ industry speakers',
    body: 'Featuring metrology experts, quality leaders, calibration specialists, manufacturing professionals, technology innovators, researchers and industry decision-makers.',
  },
  {
    title: '15+ hours of technical sessions',
    body: 'Covering precision measurement, CMM, calibration, 3D scanning, machine vision, NDT, testing, digital metrology, AI-based inspection and Quality 4.0.',
  },
  {
    title: '8+ hours of networking',
    body: 'Connect with quality heads, metrology professionals, manufacturing engineers, procurement teams, laboratories, technology providers and industrial decision-makers.',
  },
];

export const whyAttend = [
  {
    title: 'Discover the Latest Metrology & Measurement Technologies',
    description:
      'Stay ahead of the rapidly evolving measurement landscape by exploring advanced CMMs, optical measurement, 3D scanning, machine vision, calibration, NDT, testing, sensors and digital metrology solutions.',
  },
  {
    title: 'Explore New Quality & Inspection Solutions',
    description:
      'Discover technologies that can improve measurement accuracy, reduce inspection time, minimise production errors and strengthen quality control across modern manufacturing environments.',
  },
  {
    title: 'Build High-Value Industry Connections',
    description:
      'INDIAMET provides a focused platform to connect with metrology professionals, quality heads, manufacturing engineers, procurement teams, laboratories, researchers and technology providers.',
  },
  {
    title: 'Understand the Future of Digital Metrology',
    description:
      'Learn how AI, automation, machine vision, 3D scanning, connected measurement systems, digital twins and real-time quality analytics are transforming industrial inspection and manufacturing.',
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
      'Entry to exhibition area',
      'Interaction with industry experts & speakers',
      'Certificate of Participation',
      'Career guidance & mentorship interaction',
      'Internship & placement networking opportunities',
      'Digital access to approved summit presentation materials',
      'Lunch & refreshments',
    ],
  },
  {
    id: 2,
    title: 'General',
    price: '₹ 6,000',
    features: [
      'Full access to all summit sessions',
      'Entry to exhibition area',
      'Summit kit (Badge, Folder, Notepad, Pen)',
      'Access to networking lunch & tea breaks',
      'B2B networking opportunities',
      'Access to approved speakers’ presentation materials',
      'Certificate of Participation',
      'Entry to Business Networking Meet',
      'Access to post-event industry insights summary',
    ],
  },
  {
    id: 3,
    title: 'Group of 3',
    price: '₹ 15,000',
    features: [
      'Full summit access',
      'Priority seating in technical sessions',
      'Exhibition entry',
      'Reserved group seating',
      'Company name recognition on delegate list',
      'Access to networking lunch & tea breaks',
      'Digital presentation access',
      'Participation certificates for all 3',
      'Group networking badge recognition',
      'Priority B2B meeting assistance on request',
    ],
  },
];

export const faqItems = [
  {
    id: 1,
    question: 'When will the INDIAMET Expo & Summit take place?',
    answer:
      'May 13–15, 2027, at the Auto Cluster Exhibition Centre, Pune, India.',
  },
  {
    id: 2,
    question: 'What is INDIAMET?',
    answer:
      'INDIAMET is an international exhibition and summit focused on metrology, precision measurement, inspection, calibration, testing and industrial quality technologies.',
  },
  {
    id: 3,
    question: 'Can I participate in the Summit online?',
    answer:
      'No. The Summit will be conducted as an in-person event at the Auto Cluster Exhibition Centre, Pune.',
  },
  {
    id: 4,
    question: 'Will summit presentations be available after the event?',
    answer:
      'Delegates may receive approved presentation materials where speakers have given permission to share them.',
  },
  {
    id: 5,
    question: 'Can I get a ticket refund?',
    answer:
      'Refunds, if applicable, will be subject to the cancellation and refund terms applicable to the event registration.',
  },
  {
    id: 6,
    question: 'Can I get a group discount on the ticket price?',
    answer:
      'Yes. Group pricing is available for three or more delegates registering together.',
  },
  {
    id: 7,
    question: 'Can I pay for tickets by card?',
    answer:
      'Yes. Available online payment options will be displayed during registration.',
  },
];

export const venueImages = [
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1600&q=80',
];