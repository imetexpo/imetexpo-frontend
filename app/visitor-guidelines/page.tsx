'use client';

import ResourceGuidePage from '@/components/layout/ResourceGuidePage';

export default function VisitorGuidelinesPage() {
  return (
    <ResourceGuidePage
      heroTitle="VISITOR"
      heroAccent="GUIDELINES"
      heroSubtitle="Registration, entry, and exhibition policies to help you make the most of INDIAMET 2027."
      introTitle="Prepare for"
      introAccent="Your Visit"
      introBody="Review these visitor guidelines before you arrive at the Auto Cluster Exhibition Center. Pre-register for your pass, carry a valid photo ID, and check opening hours, badge rules, and on-site policies so your visit is smooth from the entrance to the exhibition floor."
      introCtaText="Get Visitor Pass"
      introCtaHref="/passes"
      introImage="/images/visitor.jpg"
      introImageAlt="Visitor guidelines for INDIAMET"
      benefitsHeading="Visitor"
      benefitsAccent="Essentials"
      benefits={[
        {
          title: 'Pre-Register Online',
          description:
            'Complete visitor registration before show days to save time at the entrance. Bring your confirmation and a government-issued photo ID.',
          icon: 'https://cdn.itegroupnews.com/staff_management_1_e3b60c1db6.png',
          fallbackIcon: '📝',
        },
        {
          title: 'Badge & Entry',
          description:
            'Wear your visitor badge at all times inside the venue. Entry is for registered visitors, exhibitors, speakers, and accredited media only.',
          icon: 'https://cdn.itegroupnews.com/partnership_41fd66a951.png',
          fallbackIcon: '🎫',
        },
        {
          title: 'Opening Hours',
          description:
            'The exhibition is open 13 May 10:00–18:00, 14 May 10:00–18:00, and 15 May 10:00–16:00. Last entry is typically 30 minutes before close.',
          icon: 'https://cdn.itegroupnews.com/meeting_3e0de9e870.png',
          fallbackIcon: '🕐',
        },
        {
          title: 'Photography Policy',
          description:
            'Personal photography is generally allowed in public aisles. Always ask exhibitors before photographing products, stands, or demonstrations.',
          icon: 'https://cdn.itegroupnews.com/branding_c56168b0cb.png',
          fallbackIcon: '📷',
        },
        {
          title: 'Safety on the Floor',
          description:
            'Follow aisle directions, keep clear of live machinery demonstrations, and comply with steward and security instructions at all times.',
          icon: 'https://cdn.itegroupnews.com/research_5ebaa8133d.png',
          fallbackIcon: '🛡️',
        },
        {
          title: 'Business Conduct',
          description:
            'INDIAMET is a professional B2B exhibition. Business attire is recommended. Treat exhibitors, speakers, and fellow visitors with courtesy.',
          icon: 'https://cdn.itegroupnews.com/product_release_d7b5bbb99c.png',
          fallbackIcon: '🤝',
        },
      ]}
      optionsHeading="Before You"
      optionsAccent="Arrive"
      optionsSubheading="Complete these steps for a smoother visit"
      options={[
        {
          title: 'Visitor Pass',
          description:
            'Register for a visitor pass online. Keep a digital or printed copy of your confirmation and present it with photo ID at registration.',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
          fallbackIcon: '🎟️',
          buttonText: 'Register Now',
          buttonLink: '/visitor-registration',
        },
        {
          title: 'On-Site Registration',
          description:
            'If you have not pre-registered, on-site counters will be available. Expect queues at peak hours on opening day. Carry a visiting card and photo ID.',
          image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop',
          fallbackIcon: '📋',
          buttonText: 'Contact Support',
          buttonLink: '/contact-us',
        },
        {
          title: 'Group & Student Visits',
          description:
            'Organised groups and institutions should write to visitor support in advance so badges and entry can be coordinated smoothly.',
          image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=500&fit=crop',
          fallbackIcon: '👥',
          buttonText: 'Email Us',
          buttonLink: '/contact-us',
        },
      ]}
      faqHeading="Visitor"
      faqAccent="Guide"
      faqs={[
        {
          question: 'Do I need to register before visiting INDIAMET 2027?',
          answer:
            'Pre-registration is strongly recommended. It reduces waiting time at the entrance. Walk-in registration will be available subject to capacity and security checks.',
        },
        {
          question: 'What should I bring on the day?',
          answer:
            'Bring a government-issued photo ID, your registration confirmation, and visiting cards. International visitors should also carry passport details as required at registration.',
        },
        {
          question: 'Can I take photographs on the exhibition floor?',
          answer:
            'Photography in public aisles is generally permitted for personal and professional use. Do not photograph restricted stands, live processes, or confidential displays without exhibitor permission.',
        },
        {
          question: 'Are children allowed at the exhibition?',
          answer:
            'INDIAMET is a professional industry event. Children are generally not encouraged on the exhibition floor for safety reasons, especially near live equipment demonstrations. Please check with visitor support if you have a special requirement.',
        },
      ]}
    />
  );
}
