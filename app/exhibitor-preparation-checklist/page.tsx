'use client';

import ResourceGuidePage from '@/components/layout/ResourceGuidePage';

export default function ExhibitorPreparationChecklistPage() {
  return (
    <ResourceGuidePage
      heroTitle="EXHIBITOR"
      heroAccent="CHECKLIST"
      heroSubtitle="Stand preparation, branding, logistics, documentation, and on-site requirements for INDIAMET 2027."
      introTitle="Prepare Your"
      introAccent="Stand"
      introBody="Use this checklist to get ready for INDIAMET 2027 — from stand design and branding to freight, technical orders, staff travel, and opening-day operations. Completing each step on time keeps build-up smooth and your team ready to meet buyers."
      introCtaText="Download Guide"
      introCtaHref="/exhibitor-resource-center"
      introImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=800&fit=crop"
      introImageAlt="Exhibitor preparation checklist"
      benefitsHeading="Preparation"
      benefitsAccent="Priorities"
      benefits={[
        {
          title: 'Stand Design & Build',
          description:
            'Finalise shell scheme extras or custom stand drawings, height limits, and contractor access. Submit plans if required before the official deadline.',
          icon: 'https://cdn.itegroupnews.com/staff_management_1_e3b60c1db6.png',
          fallbackIcon: '🏗️',
        },
        {
          title: 'Branding & Graphics',
          description:
            'Produce fascia names, wall graphics, product films, and literature. Check print specs and delivery dates so artwork arrives with your cargo.',
          icon: 'https://cdn.itegroupnews.com/partnership_41fd66a951.png',
          fallbackIcon: '🎨',
        },
        {
          title: 'Technical Services',
          description:
            'Order power, lighting, internet, furniture, water, compressed air, and extra sockets through the official exhibitor service process.',
          icon: 'https://cdn.itegroupnews.com/meeting_3e0de9e870.png',
          fallbackIcon: '🔌',
        },
        {
          title: 'Freight & Installation',
          description:
            'Confirm packing lists, delivery slots, empty-case storage, and installation labour. Align logistics with your stand contractor timetable.',
          icon: 'https://cdn.itegroupnews.com/branding_c56168b0cb.png',
          fallbackIcon: '📦',
        },
        {
          title: 'Team & Travel',
          description:
            'Book hotels, airport transfers, and staff badges. Brief the team on opening hours, lead capture, and who handles technical issues on site.',
          icon: 'https://cdn.itegroupnews.com/research_5ebaa8133d.png',
          fallbackIcon: '🧳',
        },
        {
          title: 'Marketing Before the Show',
          description:
            'Invite customers, update your exhibitor profile, and use digital promotions so visitors know where to find you in the halls.',
          icon: 'https://cdn.itegroupnews.com/product_release_d7b5bbb99c.png',
          fallbackIcon: '📣',
        },
      ]}
      optionsHeading="Checklist"
      optionsAccent="Phases"
      optionsSubheading="Work through each stage before show week"
      options={[
        {
          title: 'Before You Ship',
          description:
            'Lock stand layout, service orders, insurance, and freight documents. Share emergency contacts with the organiser and your contractor.',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop',
          fallbackIcon: '✅',
          buttonText: 'Logistics Guide',
          buttonLink: '/freight-handling-logistics',
        },
        {
          title: 'Build-Up Days',
          description:
            'Arrive with badges, drawings, and toolkits. Check power, lighting, and product placement. Complete safety walkthroughs before opening.',
          image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop',
          fallbackIcon: '🔨',
          buttonText: 'Resource Center',
          buttonLink: '/exhibitor-resource-center',
        },
        {
          title: 'Show Days & Close',
          description:
            'Staff the stand throughout opening hours, capture leads, and restock literature. After close, follow official move-out rules before dismantling.',
          image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=500&fit=crop',
          fallbackIcon: '📌',
          buttonText: 'Enquire Now',
          buttonLink: '/exhibiting-enquiry',
        },
      ]}
      faqHeading="Checklist"
      faqAccent="Guide"
      faqs={[
        {
          question: 'What should exhibitors complete first?',
          answer:
            'Confirm your stand type and location, submit any custom-stand drawings, then place technical service orders and freight bookings. Travel and staff badges can run in parallel.',
        },
        {
          question: 'How do I order electricity, furniture, and internet?',
          answer:
            'Registered exhibitors receive official order forms for electrical supply, furniture, lighting, internet, branding, rigging, water, compressed air, and machinery handling. Order before the published deadline to avoid late fees.',
        },
        {
          question: 'How can I promote my participation?',
          answer:
            'Use your exhibitor profile, product announcements, invitations, social posts, and INDIAMET digital promotions so buyers can find your stand before they arrive.',
        },
        {
          question: 'When is exhibitor move-in and move-out?',
          answer:
            'Exact build-up and breakdown windows are issued to registered exhibitors. Do not arrive unannounced with cargo, and do not dismantle before official close of the show.',
        },
      ]}
    />
  );
}
