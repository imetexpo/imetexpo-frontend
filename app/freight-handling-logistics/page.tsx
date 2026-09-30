'use client';

import ResourceGuidePage from '@/components/layout/ResourceGuidePage';

export default function FreightHandlingLogisticsPage() {
  return (
    <ResourceGuidePage
      heroTitle="FREIGHT, HANDLING"
      heroAccent="& LOGISTICS"
      heroSubtitle="Plan the safe movement of machinery, equipment, displays, and stand materials to INDIAMET 2027."
      introTitle="Move Your"
      introAccent="Cargo"
      introBody="Coordinate freight, on-site handling, delivery windows, installation, and removal with appointed logistics partners. Share crate lists, weights, and special requirements early so machinery, displays, and stand materials arrive on time at the Auto Cluster Exhibition Center."
      introCtaText="Enquire Now"
      introCtaHref="/exhibiting-enquiry"
      introImage="https://images.unsplash.com/photo-1586528116493-da8b6f4c9c3d?w=1200&h=800&fit=crop"
      introImageAlt="Freight handling and exhibition logistics"
      benefitsHeading="Logistics"
      benefitsAccent="Support"
      benefits={[
        {
          title: 'Inbound Freight',
          description:
            'Plan road, air, or sea freight into Pune with packing lists, insurance, and delivery slots that match the official exhibitor move-in timetable.',
          icon: 'https://cdn.itegroupnews.com/staff_management_1_e3b60c1db6.png',
          fallbackIcon: '📦',
        },
        {
          title: 'On-Site Handling',
          description:
            'Forklifts, rigging, and hall access are coordinated through appointed handlers. Heavy or oversized exhibits must be declared in advance.',
          icon: 'https://cdn.itegroupnews.com/partnership_41fd66a951.png',
          fallbackIcon: '🏗️',
        },
        {
          title: 'Customs & Documentation',
          description:
            'International exhibitors should prepare commercial invoices, packing lists, and ATA Carnet or temporary import papers with their freight forwarder.',
          icon: 'https://cdn.itegroupnews.com/meeting_3e0de9e870.png',
          fallbackIcon: '📄',
        },
        {
          title: 'Stand Materials',
          description:
            'Graphics, furniture, tools, and construction materials should follow the same delivery windows as product cargo to avoid delays on build-up days.',
          icon: 'https://cdn.itegroupnews.com/branding_c56168b0cb.png',
          fallbackIcon: '🧰',
        },
        {
          title: 'Live Equipment',
          description:
            'Machinery demonstrations may need extra power, compressed air, or floor loading checks. Confirm technical services before shipment leaves your warehouse.',
          icon: 'https://cdn.itegroupnews.com/research_5ebaa8133d.png',
          fallbackIcon: '⚙️',
        },
        {
          title: 'Empty Cases & Removal',
          description:
            'Empty case storage and outbound collection are arranged through the official logistics desk. Label crates clearly for a faster move-out after close of show.',
          icon: 'https://cdn.itegroupnews.com/product_release_d7b5bbb99c.png',
          fallbackIcon: '🚚',
        },
      ]}
      optionsHeading="Handling"
      optionsAccent="Stages"
      optionsSubheading="From warehouse to stand and back"
      options={[
        {
          title: 'Move-In',
          description:
            'Deliver cargo during your allocated build-up slot. Late arrivals may wait for hall access. Keep a site contact available for unloading.',
          image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop',
          fallbackIcon: '📥',
          buttonText: 'Resource Center',
          buttonLink: '/exhibitor-resource-center',
        },
        {
          title: 'On-Stand Installation',
          description:
            'Position machines, displays, and branding once the stand structure is ready. Follow safety rules for lifting, electrics, and live demonstrations.',
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop',
          fallbackIcon: '🔧',
          buttonText: 'Enquire Now',
          buttonLink: '/exhibiting-enquiry',
        },
        {
          title: 'Move-Out',
          description:
            'Do not dismantle before official close. Book outbound collection, reclaim empty cases, and confirm export or return-to-warehouse instructions.',
          image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&h=500&fit=crop',
          fallbackIcon: '📤',
          buttonText: 'Contact Us',
          buttonLink: '/contact-us',
        },
      ]}
      faqHeading="Freight"
      faqAccent="Guide"
      faqs={[
        {
          question: 'How can I transport products and equipment to INDIAMET 2027?',
          answer:
            'Use appointed exhibition logistics and freight-handling partners for machinery, displays, stand materials, and marketing cargo. Detailed shipping, handling, delivery, and move-in instructions are shared with registered exhibitors before the show.',
        },
        {
          question: 'Can we demonstrate live machinery on the stand?',
          answer:
            'Yes, where it is technically and safely feasible. Coordinate heavy equipment, special power, compressed air, and floor loading with the technical team well before cargo ships.',
        },
        {
          question: 'When should international cargo be sent?',
          answer:
            'Build in time for customs clearance, inland haulage to Pune, and your official move-in window. Your forwarder should confirm lead times for air and sea freight into India.',
        },
        {
          question: 'Who handles forklifts inside the halls?',
          answer:
            'On-site lifting is arranged through official handlers. Independent forklifts are generally not permitted without organiser approval. Declare oversized items early.',
        },
      ]}
    />
  );
}
