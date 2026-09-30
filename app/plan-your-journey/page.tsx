'use client';

import ResourceGuidePage from '@/components/layout/ResourceGuidePage';

export default function PlanYourJourneyPage() {
  return (
    <ResourceGuidePage
      heroTitle="PLAN YOUR"
      heroAccent="JOURNEY"
      heroSubtitle="Travel information to help you reach Pune and the Auto Cluster Exhibition Center for INDIAMET 2027."
      introTitle="Getting to"
      introAccent="Pune"
      introBody="Planning to visit INDIAMET 2027? Use this guide for Pune Airport, railway stations, local transport, taxis, and convenient routes to the Auto Cluster Exhibition Center in Chinchwad. Book travel and hotels early, as May is a busy period for business visitors."
      introCtaText="Download Brochure"
      introCtaHref="/event-brochure"
      introImage="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1200&h=800&fit=crop"
      introImageAlt="Travel to Pune for INDIAMET"
      benefitsHeading="Travel"
      benefitsAccent="Essentials"
      benefits={[
        {
          title: 'Pune International Airport',
          description:
            'Pune Airport (PNQ) is the nearest airport. From there, taxis, app cabs, and pre-paid counters connect you to Chinchwad and the Auto Cluster Exhibition Center.',
          icon: 'https://cdn.itegroupnews.com/staff_management_1_e3b60c1db6.png',
          fallbackIcon: '✈️',
        },
        {
          title: 'Railway Stations',
          description:
            'Pune Junction, Shivajinagar, and Chinchwad stations serve the city. Chinchwad is the most convenient rail stop for the exhibition venue.',
          icon: 'https://cdn.itegroupnews.com/partnership_41fd66a951.png',
          fallbackIcon: '🚆',
        },
        {
          title: 'Local Transport',
          description:
            'Use app-based cabs, taxis, auto-rickshaws, and PMPML buses to move between hotels, Hinjewadi, Pimpri-Chinchwad, and the venue.',
          icon: 'https://cdn.itegroupnews.com/meeting_3e0de9e870.png',
          fallbackIcon: '🚕',
        },
        {
          title: 'Route to the Venue',
          description:
            'The Auto Cluster Exhibition Center is on Mumbai–Pune Road, Chinchwad East. Allow extra time during peak morning traffic on show days.',
          icon: 'https://cdn.itegroupnews.com/branding_c56168b0cb.png',
          fallbackIcon: '📍',
        },
        {
          title: 'Stay Nearby',
          description:
            'Hotels in Chinchwad, Hinjewadi, Wakad, and central Pune offer convenient access. See recommended stays on the Plan Your Travel page.',
          icon: 'https://cdn.itegroupnews.com/research_5ebaa8133d.png',
          fallbackIcon: '🏨',
        },
        {
          title: 'International Visitors',
          description:
            'International guests should confirm visa, insurance, and flight connections well in advance. Allow time for immigration and the transfer into Pune.',
          icon: 'https://cdn.itegroupnews.com/product_release_d7b5bbb99c.png',
          fallbackIcon: '🌍',
        },
      ]}
      optionsHeading="Ways to"
      optionsAccent="Arrive"
      optionsSubheading="Choose the route that suits your itinerary"
      options={[
        {
          title: 'By Air',
          description:
            'Fly into Pune International Airport. A taxi or app cab to Chinchwad typically takes 45–75 minutes depending on traffic. Mumbai Airport is an alternative with a longer road transfer.',
          image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop',
          fallbackIcon: '✈️',
          buttonText: 'View Hotels',
          buttonLink: '/plan-your-travel',
        },
        {
          title: 'By Rail',
          description:
            'Arrive at Pune Junction or Chinchwad. From Chinchwad station the venue is a short taxi ride. Intercity and Mumbai–Pune services run throughout the day.',
          image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=500&fit=crop',
          fallbackIcon: '🚆',
          buttonText: 'Contact Us',
          buttonLink: '/contact-us',
        },
        {
          title: 'By Road',
          description:
            'Drive or take a coach via the Mumbai–Pune Expressway. Follow Mumbai–Pune Road toward Chinchwad East, Plot C-181, Auto Cluster Exhibition Center.',
          image: 'https://images.unsplash.com/photo-1449965404013-cebea7fb30dd?w=800&h=500&fit=crop',
          fallbackIcon: '🚗',
          buttonText: 'Open Map',
          buttonLink: '/when-and-where',
        },
      ]}
      faqHeading="Travel"
      faqAccent="Guide"
      faqs={[
        {
          question: 'How far is the venue from Pune Airport?',
          answer:
            'The Auto Cluster Exhibition Center in Chinchwad is typically 45–75 minutes from Pune International Airport by taxi, depending on traffic. Allow extra time on opening morning.',
        },
        {
          question: 'Which railway station is closest to INDIAMET 2027?',
          answer:
            'Chinchwad is the most convenient station for the venue. Pune Junction is the main city station and is well connected by taxi and app cabs.',
        },
        {
          question: 'Are taxis and app cabs available at the airport?',
          answer:
            'Yes. Pre-paid taxi counters and app-based cabs operate from Pune Airport. Confirm the destination as Auto Cluster Exhibition Center, Chinchwad East, before you start.',
        },
        {
          question: 'Where can I find hotel recommendations?',
          answer:
            'Visit the Plan Your Travel page for hotels in Chinchwad, Hinjewadi, Wakad, and central Pune that are convenient for exhibitors and visitors.',
        },
      ]}
    />
  );
}
