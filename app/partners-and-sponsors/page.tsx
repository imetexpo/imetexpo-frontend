// app/partners-and-sponsors/page.tsx
'use client';

import BackToTop from '@/components/layout/BackToTop';
import PageHero from '@/components/layout/PageHero';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/container';

export default function PartnersSponsorsPage() {
  const eventPartners = [
    {
      name: '',
      logo: '',
      type: 'Event Partner',
      website: '',
    },
    {
      name: '',
      logo: '',
      type: 'Event Partner',
      website: '',
    },
    {
      name: '',
      logo: '',
      type: '',
      website: '',
    },
  ];

  const mediaPartners = [
    { name: '', logo: '', type: 'General Media Partner', website: '' },
    { name: '', logo: '', type: 'General Media Partner', website: '' },
    { name: '', logo: '', type: 'General Media Partner', website: '' },
    { name: '', logo: '', type: 'Event Partner', website: '' },
    { name: '', logo: '', type: 'Exclusive Media Partner', website: '' },
    { name: '', logo: '', type: 'Exclusive Internet Partner', website: '' },
    { name: '', logo: '', type: 'Strategic Media Partner', website: '' },
    { name: '', logo: '', type: 'Media Partner', website: '' },
    { name: '', logo: '', type: 'Media Partner', website: '' },
    { name: '', logo: '', type: 'Media Partner', website: '' },
    ];

  const quickLinks = [
    { label: "Enquire to Exhibit", link: "/exhibiting-enquiry", icon: "https://cdn.itegroupnews.com/Vector_1_440f5852b9.png" },
    { label: "Download Event Brochure", link: "/event-brochure", icon: "https://cdn.itegroupnews.com/Group_e024d13500.png" },
    { label: "Exhibitor List", link: "/exhibitor-list", icon: "https://cdn.itegroupnews.com/Vector_ceea3d1488.png" },
    { label: "Plan Your Travel", link: "/plan-your-travel", icon: "https://cdn.itegroupnews.com/Vector_1_b2c1ab92d0.png" },
    { label: "Why Visit", link: "/why-visit", icon: "https://cdn.itegroupnews.com/Vector_2_9be2b98909.png" }
  ];

  return (
    <div className="page-spacing-wrapper">
      <div className="lg:pt-0">
        <PageHero
          title="PARTNERS &"
          accent="SPONSORS"
          subtitle="Meet the organisations supporting INDIAMET Expo and helping connect India's precision manufacturing community."
        />

        {/* Event Partners Section */}
        <section className="py-16 lg:py-20">
          <Container>
            <h2 className="font-bebas text-5xl text-[#03193D] md:text-6xl text-center mb-10 lg:mb-16">
              Event Partners
            </h2>
            <div className="flex flex-wrap gap-8 justify-center">
              {eventPartners.map((partner, index) => (
                <div
                  key={index}
                  className="flex w-full max-w-[320px] flex-col items-center gap-5 border border-gray-200 p-6 text-center rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="h-32 flex items-center justify-center">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={140}
                      height={100}
                      className="object-contain max-h-28"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-[#03193D] text-center">{partner.name}</h3>
                  <p className="text-orange-600 text-sm font-medium">{partner.type}</p>
                  <Link
                    href={partner.website}
                    target="_blank"
                    className="w-full mt-auto inline-flex items-center justify-center gap-2 bg-[#CC9808] text-white px-6 py-2.5 rounded-md font-semibold hover:bg-[#03193D] transition-colors"
                  >
                    Visit Website
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Media Partners Section */}
        <section className="py-16 lg:py-20 bg-orange-50">
          <Container>
            <h2 className="font-bebas text-5xl text-[#03193D] md:text-6xl text-center mb-10 lg:mb-16">
              Media Partners
            </h2>
            <div className="flex flex-wrap gap-6 justify-center">
              {mediaPartners.map((partner, index) => (
                <div
                  key={index}
                  className="flex w-full max-w-[280px] flex-col items-center gap-4 border border-gray-200 p-5 text-center rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="h-24 flex items-center justify-center">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={80}
                      className="object-contain max-h-20"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-base font-semibold text-[#03193D] text-center line-clamp-2 min-h-[48px]">
                    {partner.name}
                  </h3>
                  <p className="text-orange-600 text-xs font-medium">{partner.type}</p>
                  <Link
                    href={partner.website}
                    target="_blank"
                    className="w-full mt-auto inline-flex items-center justify-center gap-2 bg-[#CC9808] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#03193D] transition-colors"
                  >
                    Visit Website
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Quick Navigation Section */}
        <div className="animated-block mt-20">
          <div className="animated-block-target">
            <div className="border-t-8 border-[#CC9808] bg-[#03193D] py-20 text-white">
              <Container>
                {/* HEADING */}
                <h2 className="font-bebas text-6xl md:text-7xl">
                  Quick Navigation
                </h2>

                {/* NAV ITEMS */}
                <div className="mt-16 grid grid-cols-2 gap-y-10 md:grid-cols-5">
                  {quickLinks.map((item, idx) => (
                    <div key={idx} className="relative flex flex-col items-center justify-center text-center">
                      {/* VERTICAL DIVIDER */}
                      {idx !== 0 && (
                        <div className="absolute left-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-gray-700 md:block"></div>
                      )}
                      <Link href={item.link} className="flex flex-col items-center">
                        {/* ICON CIRCLE */}
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800 overflow-hidden">
                          <Image
                            src={item.icon}
                            alt={item.label}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                        {/* LABEL */}
                        <p className="mt-4 text-sm font-semibold text-gray-300">
                          {item.label}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          </div>
        </div>

        <hr className="border-t-6 border-[#CC9808]" />
      </div>
      <BackToTop />
    </div>
  );
}