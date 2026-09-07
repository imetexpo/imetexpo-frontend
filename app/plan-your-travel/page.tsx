// app/plan-your-travel/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PartnersSection from "@/components/home/PartnersSection";
import BackToTop from "@/components/layout/BackToTop";
import Container from "@/components/ui/container";

export default function PlanYourTravelPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("exhibitor");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-100 grid place-content-center bg-black">
        <div className="flex size-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-500 text-4xl">
          <div className="flex size-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-300 text-2xl"></div>
        </div>
      </div>
    );
  }

  const quickLinks = [
    { label: "Enquire to Exhibit", link: "/exhibiting-enquiry", icon: "📋" },
    { label: "Download Event Brochure", link: "/event-brochure", icon: "📄" },
    { label: "Exhibitor List", link: "/exhibitor-list", icon: "📊" },
    { label: "Plan Your Travel", link: "/plan-your-travel", icon: "✈️" },
    { label: "Why Visit", link: "/why-visit", icon: "ℹ️" }
  ];

  const exhibitorTabs = [
    {
      title: "Visa",
      description: "A regular business visa is suitable for business visits to Thailand aimed at negotiating, concluding contracts, participating in exhibitions, conferences, or other business meetings and events.",
      buttonText: "More Info",
      buttonLink: "/visa",
      image: "https://cdn.itegroupnews.com/Visa_5bceffab8a_802e5140f4.webp",
      fallbackIcon: "🛂"
    },
    {
      title: "Freight, Handling & Customs",
      description: "We recommend DMW EXPO for shipping your products, equipment, materials, or displays. Their reliable service ensures timely and safe delivery for your stand allowing you to focus on your stand.",
      buttonText: "More Info",
      buttonLink: "/exhibitor-resource-center",
      image: "https://cdn.itegroupnews.com/Freight_Handling_and_Customs_f1ff7e4873.webp",
      fallbackIcon: "📦"
    },
    {
      title: "Preparation Checklist",
      description: "To make your experience as seamless as possible, we have put together a checklist for you, to keep track of all the necessary requirements you will need to keep note of leading up to the event.",
      buttonText: "More Info",
      buttonLink: "/exhibitor-resource-center",
      image: "https://cdn.itegroupnews.com/Preperation_Checklist_e2dbffca54.webp",
      fallbackIcon: "✅"
    }
  ];

  const visitorTabs = [
    {
      title: "Visa",
      description: "The most convenient way to obtain a visa to Thailand is with our official travel partner. Get assistance with your visa application for a smooth travel experience.",
      buttonText: "More Info",
      buttonLink: "/visa",
      image: "https://cdn.itegroupnews.com/Visa_5bceffab8a_802e5140f4.webp",
      fallbackIcon: "🛂"
    },
    {
      title: "Rules of Entry",
      description: "Prior to your visit to ITS Tyre Expo, we as the event organisers urge you to adhere to the guidelines put in place for entry into Thailand.",
      buttonText: "More Info",
      buttonLink: "/terms-of-visiting",
      image: "https://cdn.itegroupnews.com/Freight_Handling_and_Customs_f1ff7e4873.webp",
      fallbackIcon: "📋"
    },
    {
      title: "When and Where",
      description: "Find out the time and place where you need to be to join us at ITS Tyre Expo 2026. Plan your schedule accordingly.",
      buttonText: "More Info",
      buttonLink: "/about-its-tyre-expo",
      image: "https://cdn.itegroupnews.com/Preperation_Checklist_e2dbffca54.webp",
      fallbackIcon: "📍"
    }
  ];

  const hotels = [
    {
      name: "Grand Sukhumvit Hotel Bangkok 5*",
      description: "Located in the heart of Bangkok's business district, a 15-minute drive from BITEC. The hotel features 350 luxury rooms, a rooftop pool, spa, fitness center, and 5 world-class restaurants. Free shuttle service to BITEC during exhibition days.",
      bookLink: "https://www.grandsukhumvit.com/",
      mapLink: "https://maps.google.com",
      image: "https://cdn.itegroupnews.com/Art_Moscow_0e9113a0b9.webp"
    },
    {
      name: "Novotel Bangkok Sukhumvit 4*",
      description: "Conveniently located near BTS On Nut station, direct connection to BITEC via Skytrain. Modern rooms, outdoor pool, fitness center, and all-day dining restaurant. Special expo rates available.",
      bookLink: "https://www.novotelbangkok.com/",
      mapLink: "https://maps.google.com",
      image: "https://cdn.itegroupnews.com/Penta_Hotel_417b45162b.webp"
    },
    {
      name: "Holiday Inn Express Sukhumvit 3*",
      description: "Budget-friendly option with modern amenities. Located near BTS Nana station, 20 minutes from BITEC. Complimentary breakfast and free Wi-Fi included.",
      bookLink: "https://www.hiexpress.com/bangkok",
      mapLink: "https://maps.google.com",
      image: "https://cdn.itegroupnews.com/Hotel_Peter_2_fda8f0151c.webp"
    },
    {
      name: "The St. Regis Bangkok 5*",
      description: "Luxury hotel with direct access to BTS Ratchadamri station. World-class spa, Michelin-starred dining, and butler service. 25 minutes to BITEC.",
      bookLink: "https://www.stregisbangkok.com/",
      mapLink: "https://maps.google.com",
      image: "https://cdn.itegroupnews.com/Radisson_b7ae653ffc.webp"
    },
    {
      name: "W Bangkok Hotel 5*",
      description: "Stylish hotel near BTS Chong Nonsi. Modern design, rooftop bar, spa, and fitness facilities. 20 minutes to BITEC.",
      bookLink: "https://www.wbangkok.com/",
      mapLink: "https://maps.google.com",
      image: "https://cdn.itegroupnews.com/Golden_Ring_Hotel_e270350c1a.webp"
    },
    {
      name: "Ibis Styles Bangkok Sukhumvit 3*",
      description: "Affordable comfort near BTS On Nut station. Modern rooms, swimming pool, and all-day dining. Perfect for budget-conscious exhibitors.",
      bookLink: "https://www.ibisstylesbangkok.com/",
      mapLink: "https://maps.google.com",
      image: "https://cdn.itegroupnews.com/Golden_Wood_Hotel_07b6676d88.webp"
    },
    {
      name: "The Berkeley Hotel Pratunam 4*",
      description: "Located in the shopping district, 30 minutes from BITEC. 600 rooms, rooftop pool, and multiple dining options. Free shuttle service available.",
      bookLink: "https://www.berkeleypratunam.com/",
      mapLink: "https://maps.google.com",
      image: "https://cdn.itegroupnews.com/ibis_65d9a5f2ce.webp"
    },
    {
      name: "Avani Sukhumvit Bangkok 4*",
      description: "Modern hotel connected to BTS On Nut station. Rooftop pool, fitness center, and multiple restaurants. Direct Skytrain access to BITEC.",
      bookLink: "https://www.avanihotels.com/sukhumvit",
      mapLink: "https://maps.google.com",
      image: "https://cdn.itegroupnews.com/Novotel_4bfc71dbc0.webp"
    },
    {
      name: "Oakwood Hotel & Residence 4*",
      description: "Serviced apartments near BTS Phrom Phong. Ideal for longer stays with kitchen facilities. 25 minutes to BITEC.",
      bookLink: "https://www.oakwoodbangkok.com/",
      mapLink: "https://maps.google.com",
      image: "https://cdn.itegroupnews.com/Metropol_f71f39d395.webp"
    },
    {
      name: "The Quarter Ari by UHG 4*",
      description: "Modern hotel in the Ari district. Rooftop pool with city views, fitness center, and restaurant. 35 minutes to BITEC.",
      bookLink: "https://www.thequarterari.com/",
      mapLink: "https://maps.google.com",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      fallbackIcon: "🏨"
    },
    {
      name: "Nysa Hotel Bangkok 4*",
      description: "Boutique hotel near BITEC. Modern design, swimming pool, and fitness center. Just 5 minutes from the exhibition center.",
      bookLink: "https://www.nysahotelbangkok.com/",
      mapLink: "https://maps.google.com",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
      fallbackIcon: "🏨"
    },
    {
      name: "The Park Nine Hotel 4*",
      description: "Located in the Bangna area, just 10 minutes from BITEC. Spacious rooms, outdoor pool, and fitness center.",
      bookLink: "https://www.theparknine.com/",
      mapLink: "https://maps.google.com",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&h=300&fit=crop",
      fallbackIcon: "🏨"
    }
  ];

  const ImageWithFallback = ({
    src,
    alt,
    fallbackIcon,
    className = ""
  }: {
    src: string;
    alt: string;
    fallbackIcon?: string;
    className?: string;
  }) => {
    const [error, setError] = useState(false);

    if (error || !src) {
      return (
        <div className={`flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 ${className}`}>
          <span className="text-4xl">{fallbackIcon || "🏨"}</span>
        </div>
      );
    }

    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        onError={() => setError(true)}
        unoptimized={src.includes('unsplash')}
      />
    );
  };

  const tabContent = activeTab === "exhibitor" ? exhibitorTabs : visitorTabs;

  return (
    <div className="intro-animation">
      {/* Main Content */}
      <div className="page-spacing-wrapper pt-[120px] lg:pt-[140px]">

        {/* Culture Section */}
        <div className="animated-block">
          <div className="animated-block-target">
            <Container className="py-10">
              <div className="mb-5 flex flex-col lg:flex-row justify-between lg:items-start gap-6">
                <div className="lg:w-3/4">
                  <h1 className="font-bebas text-5xl text-black md:text-6xl lg:text-7xl uppercase">
                    Blend business opportunity and Bangkok's vibrant culture when you visit <span className="text-[#CC9808]">ITS Tyre Expo</span>
                  </h1>
                  <p className="mt-5 text-lg text-gray-700 leading-relaxed font-sans">
                    Join thousands of tyre industry leaders and peers to forge valuable connections, discover cutting-edge trends in the industry, and immerse yourself in the rich culture and vibrant energy of Bangkok—a city that blends innovation with timeless charm.
                  </p>
                </div>
              </div>
            </Container>
          </div>
        </div>

        {/* Travel Information Tabs */}
        <div className="animated-block mt-8">
          <div className="animated-block-target">
            <Container>
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-gray-200 pb-8 mb-10">
                <h2 className="font-bebas text-4xl text-black md:text-5xl uppercase">
                  Travel <span className="text-[#CC9808]">Information</span> & Guidelines
                </h2>
                <div className="inline-flex bg-[#FCF8F3] border border-gray-150 p-1 rounded-sm gap-2">
                  <button
                    onClick={() => setActiveTab("exhibitor")}
                    className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer ${
                      activeTab === "exhibitor" ? "bg-[#CC9808] text-white" : "bg-transparent text-black hover:text-[#CC9808]"
                    }`}
                  >
                    For Exhibitors
                  </button>
                  <button
                    onClick={() => setActiveTab("visitor")}
                    className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer ${
                      activeTab === "visitor" ? "bg-[#CC9808] text-white" : "bg-transparent text-black hover:text-[#CC9808]"
                    }`}
                  >
                    For Visitors
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <div className="space-y-6">
                  {tabContent.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex flex-col md:flex-row items-center gap-6 rounded-sm border border-gray-100 bg-[#FCF8F3] p-6 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-sm bg-gray-200 border border-gray-150">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          fallbackIcon={item.fallbackIcon}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 text-center md:text-left space-y-2">
                        <h4 className="font-bebas text-2xl font-bold text-black uppercase tracking-wide">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="shrink-0 mt-4 md:mt-0">
                        <Link href={item.buttonLink}>
                          <button className="bg-[#CC9808] hover:bg-black text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                            {item.buttonText}
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </div>
        </div>

        {/* Hotels Section */}
        <div className="animated-block mt-16 lg:mt-24">
          <div className="animated-block-target">
            <Container>
              <div className="border-l-4 border-[#CC9808] pl-6 mb-10">
                <h2 className="font-bebas text-4xl text-black md:text-5xl uppercase">
                  Hotel Accommodation Deals
                </h2>
                <p className="mt-2 text-sm font-bold text-[#CC9808] uppercase tracking-wider">
                  Save 20% by using the promo code "EXPO" when booking through official links
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {hotels.map((hotel, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col justify-between rounded-sm border border-gray-100 bg-[#FCF8F3] p-5 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div>
                      <div className="relative h-48 w-full overflow-hidden rounded-sm bg-gray-200 border border-gray-150">
                        <ImageWithFallback
                          src={hotel.image}
                          alt={hotel.name}
                          fallbackIcon={hotel.fallbackIcon || "🏨"}
                          className="h-full w-full"
                        />
                      </div>
                      <div className="mt-4">
                        <h4 className="font-bebas text-2xl font-bold text-black uppercase tracking-wide line-clamp-1">
                          {hotel.name}
                        </h4>
                        <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3">
                          {hotel.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-3 pt-4 border-t border-gray-150">
                      <Link href={hotel.bookLink} target="_blank" className="flex-1">
                        <button className="w-full bg-[#CC9808] hover:bg-black text-white py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                          Book Room
                        </button>
                      </Link>
                      <Link href={hotel.mapLink} target="_blank" className="flex-1">
                        <button className="w-full border border-[#CC9808] text-[#CC9808] hover:bg-black hover:text-white hover:border-black py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                          Location
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          <PartnersSection />
        </div>

        {/* Quick Navigation */}
        <div className="animated-block mt-20">
          <div className="animated-block-target">
            <div className="border-t border-[#CC9808] bg-black py-16 text-white">
              <Container>
                <h2 className="font-bebas text-5xl md:text-6xl uppercase tracking-wider text-center lg:text-left">
                  Quick Navigation
                </h2>
                <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
                  {quickLinks.map((item, idx) => (
                    <div key={idx} className="relative flex flex-col items-center justify-center text-center">
                      <Link href={item.link} className="flex flex-col items-center group">
                        <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-gray-800 transition-colors group-hover:bg-[#CC9808]">
                          <div className="text-2xl">{item.icon}</div>
                        </div>
                        <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-300 transition-colors group-hover:text-[#CC9808]">
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

        <BackToTop />
      </div>

      <style jsx>{`
        .font-bebas { font-family: 'Bebas Neue', cursive; }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .animated-block {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animated-block:nth-child(1) { animation-delay: 0.1s; }
        .animated-block:nth-child(2) { animation-delay: 0.3s; }
        .animated-block:nth-child(3) { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
}