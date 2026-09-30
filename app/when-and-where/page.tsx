'use client';

import ResourceGuidePage from '@/components/layout/ResourceGuidePage';

export default function WhenAndWherePage() {
  return (
    <ResourceGuidePage
      heroTitle="WHEN &"
      heroAccent="WHERE"
      heroSubtitle="INDIAMET 2027 takes place from 13–15 May 2027 at the Auto Cluster Exhibition Center, Pune."
      introTitle="Join Us in"
      introAccent="Pune"
      introBody="INDIAMET 2027 is held from 13 to 15 May 2027 at the Auto Cluster Exhibition Center, Chinchwad, Pune. Plan your visit around official opening hours and join manufacturers, metrology specialists, quality professionals, and technology providers from India and overseas."
      introCtaText="Get Visitor Pass"
      introCtaHref="/passes"
      introImage="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop"
      introImageAlt="Auto Cluster Exhibition Center Pune"
      benefitsHeading="Event"
      benefitsAccent="Details"
      benefits={[
        {
          title: 'Show Dates',
          description:
            'INDIAMET 2027 runs for three days: 13, 14, and 15 May 2027. Plan meetings, summit sessions, and stand visits across the full programme.',
          icon: 'https://cdn.itegroupnews.com/staff_management_1_e3b60c1db6.png',
          fallbackIcon: '📅',
        },
        {
          title: 'Opening Hours',
          description:
            '13 May 2027: 10:00–18:00. 14 May 2027: 10:00–18:00. 15 May 2027: 10:00–16:00. Arrive early on opening day for registration.',
          icon: 'https://cdn.itegroupnews.com/partnership_41fd66a951.png',
          fallbackIcon: '🕙',
        },
        {
          title: 'Exhibition Venue',
          description:
            'Auto Cluster Exhibition Center, Plot No. C-181, Chinchwad East, Mumbai Pune Road, Pune – 411 019, Maharashtra, India.',
          icon: 'https://cdn.itegroupnews.com/meeting_3e0de9e870.png',
          fallbackIcon: '📍',
        },
        {
          title: 'Getting There',
          description:
            'The venue sits on Mumbai–Pune Road in Chinchwad. It is reachable from Pune Airport, Pune Junction, and Chinchwad railway station by taxi or cab.',
          icon: 'https://cdn.itegroupnews.com/branding_c56168b0cb.png',
          fallbackIcon: '🚗',
        },
        {
          title: 'On-Site Facilities',
          description:
            'Expect registration, information desks, F&B outlets, and visitor amenities. Follow on-site signage for halls, summit rooms, and emergency exits.',
          icon: 'https://cdn.itegroupnews.com/research_5ebaa8133d.png',
          fallbackIcon: '🏛️',
        },
        {
          title: 'Who You Will Meet',
          description:
            'Join exhibitors and visitors from metrology, measurement, inspection, calibration, quality engineering, and precision manufacturing.',
          icon: 'https://cdn.itegroupnews.com/product_release_d7b5bbb99c.png',
          fallbackIcon: '👥',
        },
      ]}
      optionsHeading="Show"
      optionsAccent="Schedule"
      optionsSubheading="Plan your days at INDIAMET 2027"
      options={[
        {
          title: '13 May 2027',
          description:
            'Opening day. Exhibition open 10:00–18:00. Complete registration, walk the halls, and attend opening-day summit sessions and networking.',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop',
          fallbackIcon: '1️⃣',
          buttonText: 'Summit Agenda',
          buttonLink: '/summit',
        },
        {
          title: '14 May 2027',
          description:
            'Full business day. Exhibition open 10:00–18:00. Ideal for supplier meetings, product demonstrations, and knowledge sessions.',
          image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=500&fit=crop',
          fallbackIcon: '2️⃣',
          buttonText: 'Why Visit',
          buttonLink: '/why-visit',
        },
        {
          title: '15 May 2027',
          description:
            'Final day. Exhibition open 10:00–16:00. Close remaining meetings and collect brochures before an earlier finish.',
          image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=500&fit=crop',
          fallbackIcon: '3️⃣',
          buttonText: 'Contact Us',
          buttonLink: '/contact-us',
        },
      ]}
      faqHeading="Venue"
      faqAccent="Guide"
      faqs={[
        {
          question: 'What are the official dates of INDIAMET 2027?',
          answer:
            'INDIAMET 2027 takes place from 13 to 15 May 2027 at the Auto Cluster Exhibition Center, Pune.',
        },
        {
          question: 'What are the daily opening hours?',
          answer:
            '13 May 2027: 10:00–18:00. 14 May 2027: 10:00–18:00. 15 May 2027: 10:00–16:00. Please check on-site notices for any session-specific timings.',
        },
        {
          question: 'Where is the Auto Cluster Exhibition Center?',
          answer:
            'Plot No. C-181, Chinchwad East, Mumbai Pune Road, Pune – 411 019, Maharashtra, India. Open the map from the Contact Us page for directions.',
        },
        {
          question: 'Is parking available at the venue?',
          answer:
            'Limited parking is typically available around the exhibition complex. Using taxis or app cabs is recommended during peak hours. Follow on-site instructions for exhibitor and visitor vehicle access.',
        },
      ]}
    />
  );
}
