'use client';

import ResourceGuidePage from '@/components/layout/ResourceGuidePage';

export default function TravelToPunePage() {
  return (
    <ResourceGuidePage
      heroTitle="TRAVEL TO"
      heroAccent="PUNE"
      heroSubtitle="Airport, rail, road, and hotel information to help exhibitors and teams reach the Auto Cluster Exhibition Center for INDIAMET 2027."
      introTitle="Reach the"
      introAccent="Venue"
      introBody="Plan your journey to Pune for INDIAMET 2027. Pune International Airport, city railway stations, and the Mumbai–Pune Expressway all connect you to the Auto Cluster Exhibition Center in Chinchwad. Book flights and hotels early, and allow extra time on move-in and opening mornings."
      introCtaText="View Hotels"
      introCtaHref="/plan-your-travel"
      introImage="https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=1200&h=800&fit=crop"
      introImageAlt="Travel to Pune for INDIAMET 2027"
      benefitsHeading="Getting to"
      benefitsAccent="Pune"
      benefits={[
        {
          title: 'Pune International Airport',
          description:
            'Pune Airport (PNQ) is the nearest airport. Taxis and app cabs run to Chinchwad; the transfer is typically 45–75 minutes depending on traffic.',
          icon: 'https://cdn.itegroupnews.com/staff_management_1_e3b60c1db6.png',
          fallbackIcon: '✈️',
        },
        {
          title: 'Railway Stations',
          description:
            'Pune Junction is the main station. Chinchwad is closer to the venue and a short taxi ride from the Auto Cluster Exhibition Center.',
          icon: 'https://cdn.itegroupnews.com/partnership_41fd66a951.png',
          fallbackIcon: '🚆',
        },
        {
          title: 'By Road',
          description:
            'Drive or take a coach via the Mumbai–Pune Expressway, then follow Mumbai–Pune Road to Chinchwad East, Plot C-181.',
          icon: 'https://cdn.itegroupnews.com/meeting_3e0de9e870.png',
          fallbackIcon: '🚗',
        },
        {
          title: 'Local Transport',
          description:
            'App-based cabs, taxis, and auto-rickshaws are widely available. Use them between hotels in Hinjewadi, Wakad, Chinchwad, and the venue.',
          icon: 'https://cdn.itegroupnews.com/branding_c56168b0cb.png',
          fallbackIcon: '🚕',
        },
        {
          title: 'Hotels for Teams',
          description:
            'Stay in Chinchwad, Hinjewadi, or Wakad for convenient access during build-up and show days. See recommended hotels on Plan Your Travel.',
          icon: 'https://cdn.itegroupnews.com/research_5ebaa8133d.png',
          fallbackIcon: '🏨',
        },
        {
          title: 'International Teams',
          description:
            'Overseas staff should confirm Indian visa requirements, flight connections, and travel insurance. Allow time for immigration and the transfer into Pune.',
          icon: 'https://cdn.itegroupnews.com/product_release_d7b5bbb99c.png',
          fallbackIcon: '🌍',
        },
      ]}
      optionsHeading="Travel"
      optionsAccent="Options"
      optionsSubheading="Choose the route that suits your team"
      options={[
        {
          title: 'By Air',
          description:
            'Fly into Pune International Airport. Mumbai Airport is an alternative with a longer road transfer on the Expressway. Pre-book cabs for stand crews arriving with tools and samples.',
          image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop',
          fallbackIcon: '✈️',
          buttonText: 'View Hotels',
          buttonLink: '/plan-your-travel',
        },
        {
          title: 'By Rail',
          description:
            'Arrive at Pune Junction or Chinchwad. Intercity and Mumbai–Pune trains run throughout the day. From Chinchwad station the venue is a short taxi ride.',
          image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=500&fit=crop',
          fallbackIcon: '🚆',
          buttonText: 'Contact Us',
          buttonLink: '/contact-us',
        },
        {
          title: 'By Road',
          description:
            'Use the Mumbai–Pune Expressway and Mumbai–Pune Road toward Chinchwad East. Freight vehicles should follow the official logistics move-in windows, not visitor drop-off lanes.',
          image: 'https://images.unsplash.com/photo-1449965404013-cebea7fb30dd?w=800&h=500&fit=crop',
          fallbackIcon: '🚗',
          buttonText: 'Freight Guide',
          buttonLink: '/freight-handling-logistics',
        },
      ]}
      faqHeading="Travel"
      faqAccent="Guide"
      faqs={[
        {
          question: 'How do I get from Pune Airport to the exhibition?',
          answer:
            'Take a taxi or app cab to Auto Cluster Exhibition Center, Chinchwad East. The journey is typically 45–75 minutes. Allow extra time on move-in days and the morning of 13 May 2027.',
        },
        {
          question: 'Which railway station is closest to the venue?',
          answer:
            'Chinchwad is the most convenient station. Pune Junction is the main city terminal and is well connected by taxi to Chinchwad and Hinjewadi hotels.',
        },
        {
          question: 'Do international exhibitors need a visa for India?',
          answer:
            'Visa rules depend on your nationality. Many travellers use an e-Visa or apply through an Indian mission. Check official Government of India guidance well before travel. The organiser does not issue visas.',
        },
        {
          question: 'Where should our stand team stay?',
          answer:
            'Hotels in Chinchwad, Hinjewadi, and Wakad are practical for exhibitors. Browse options on the Plan Your Travel page and book early for May 2027.',
        },
      ]}
    />
  );
}
