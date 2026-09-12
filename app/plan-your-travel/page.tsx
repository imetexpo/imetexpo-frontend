// app/plan-your-travel/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PartnersSection from "@/components/home/PartnersSection";
import BackToTop from "@/components/layout/BackToTop";
import Container from "@/components/ui/container";
import PageHero from "@/components/layout/PageHero";

export default function PlanYourTravelPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"exhibitor" | "visitor">(
    "exhibitor"
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-100 grid place-content-center bg-[#03193D]">
        <div className="flex size-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-500 text-4xl">
          <div className="flex size-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-300 text-2xl" />
        </div>
      </div>
    );
  }

  const quickLinks = [
    {
      label: "Enquire to Exhibit",
      link: "/exhibiting-enquiry",
      icon: "📋",
    },
    {
      label: "Download Event Brochure",
      link: "/event-brochure",
      icon: "📄",
    },
    {
      label: "Exhibitor List",
      link: "/exhibitor-list",
      icon: "📊",
    },
    {
      label: "Plan Your Travel",
      link: "/plan-your-travel",
      icon: "✈️",
    },
    {
      label: "Why Visit",
      link: "/why-visit",
      icon: "ℹ️",
    },
  ];

  const exhibitorTabs = [
    {
      title: "Travel to Pune",
      description:
        "Plan your journey to Pune for INDIAMET 2027. Find useful information about Pune Airport, railway stations, local transportation, and convenient routes to the Auto Cluster Exhibition Center.",
      buttonText: "More Info",
      buttonLink: "/plan-your-travel",
      image:
        "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=400&h=300&fit=crop",
      fallbackIcon: "✈️",
    },
    {
      title: "Freight, Handling & Logistics",
      description:
        "Plan the safe and efficient movement of your machinery, equipment, displays, stand materials, and exhibition products. Ensure timely delivery, handling, installation, and removal of your exhibition materials.",
      buttonText: "More Info",
      buttonLink: "/exhibitor-resource-center",
      image:
        "https://images.unsplash.com/photo-1586528116493-da8b6f4c9c3d?w=400&h=300&fit=crop",
      fallbackIcon: "📦",
    },
    {
      title: "Exhibitor Preparation Checklist",
      description:
        "Prepare for INDIAMET 2027 with our exhibitor checklist covering stand preparation, branding, logistics, documentation, equipment movement, installation, and other important requirements.",
      buttonText: "More Info",
      buttonLink: "/exhibitor-resource-center",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
      fallbackIcon: "✅",
    },
  ];

  const visitorTabs = [
    {
      title: "Plan Your Journey",
      description:
        "Planning to visit INDIAMET 2027? Find useful travel information to help you reach Pune and the Auto Cluster Exhibition Center, including airport, railway, local transport, and accommodation information.",
      buttonText: "More Info",
      buttonLink: "/plan-your-travel",
      image:
        "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=400&h=300&fit=crop",
      fallbackIcon: "✈️",
    },
    {
      title: "Visitor Guidelines",
      description:
        "Make the most of your visit to INDIAMET 2027 by reviewing important visitor guidelines, registration requirements, entry information, and exhibition policies before arriving at the venue.",
      buttonText: "More Info",
      buttonLink: "/terms-of-visiting",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
      fallbackIcon: "📋",
    },
    {
      title: "When & Where",
      description:
        "INDIAMET 2027 takes place from 22–24 April 2027 at the Auto Cluster Exhibition Center, Pune. Plan your visit and join leading metrology, measurement, inspection, calibration, and quality professionals.",
      buttonText: "More Info",
      buttonLink: "/about-indiamet-expo",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop",
      fallbackIcon: "📍",
    },
  ];

  const hotels = [
    {
      name: "Sayaji Hotel Pune",
      description:
        "A premium hotel in Pune offering comfortable rooms, business facilities, restaurants, fitness amenities, and convenient access to key industrial and business areas.",
      bookLink: "https://www.sayajihotels.com/",
      mapLink: "https://maps.google.com/?q=Sayaji+Hotel+Pune",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    },
    {
      name: "DoubleTree by Hilton Pune-Chinchwad",
      description:
        "A modern business hotel in the Chinchwad area, offering comfortable accommodation, meeting facilities, dining options, fitness facilities, and convenient access to industrial areas.",
      bookLink: "https://www.hilton.com/",
      mapLink:
        "https://maps.google.com/?q=DoubleTree+by+Hilton+Pune+Chinchwad",
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
    },
    {
      name: "Holiday Inn Express Pune Hinjewadi",
      description:
        "A convenient choice for business travellers visiting Pune, offering modern rooms, breakfast, Wi-Fi, and easy access to the Hinjewadi business district.",
      bookLink: "https://www.ihg.com/holidayinnexpress/",
      mapLink:
        "https://maps.google.com/?q=Holiday+Inn+Express+Pune+Hinjewadi",
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
    },
    {
      name: "Radisson Blu Pune Hinjawadi",
      description:
        "A full-service business hotel offering modern rooms, restaurants, meeting facilities, fitness amenities, and convenient access to Pune's technology and industrial hubs.",
      bookLink: "https://www.radissonhotels.com/",
      mapLink:
        "https://maps.google.com/?q=Radisson+Blu+Pune+Hinjawadi",
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
    },
    {
      name: "Hyatt Place Pune Hinjawadi",
      description:
        "A contemporary hotel designed for business travellers, with comfortable rooms, dining facilities, meeting spaces, fitness amenities, and easy access to Hinjawadi.",
      bookLink: "https://www.hyatt.com/",
      mapLink:
        "https://maps.google.com/?q=Hyatt+Place+Pune+Hinjawadi",
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop",
    },
    {
      name: "Ginger Pune Wakad",
      description:
        "A practical and comfortable accommodation option for exhibitors and visitors, with modern rooms and convenient access to Wakad, Hinjawadi, and surrounding business areas.",
      bookLink: "https://www.gingerhotels.com/",
      mapLink: "https://maps.google.com/?q=Ginger+Pune+Wakad",
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
    },
    {
      name: "ibis Pune Hinjewadi",
      description:
        "A modern and affordable business hotel offering comfortable rooms, dining, meeting facilities, and convenient connectivity to Hinjewadi and other key areas of Pune.",
      bookLink: "https://all.accor.com/",
      mapLink: "https://maps.google.com/?q=ibis+Pune+Hinjewadi",
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop",
    },
    {
      name: "The Orchid Hotel Pune",
      description:
        "A premium business hotel offering spacious rooms, restaurants, meeting facilities, fitness amenities, and convenient access to major business and industrial locations.",
      bookLink: "https://www.orchidhotel.com/",
      mapLink: "https://maps.google.com/?q=The+Orchid+Hotel+Pune",
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop",
    },
    {
      name: "Pride Hotel Pune",
      description:
        "A well-established business hotel in Pune offering comfortable accommodation, restaurants, conference facilities, fitness amenities, and services for business travellers.",
      bookLink: "https://www.pridehotel.com/",
      mapLink: "https://maps.google.com/?q=Pride+Hotel+Pune",
      image:
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop",
    },
    {
      name: "Hotel Tip Top International",
      description:
        "A convenient business accommodation option in the Pimpri-Chinchwad area, offering comfortable rooms, dining facilities, meeting spaces, and easy access to industrial locations.",
      bookLink: "https://www.tiptopinternational.com/",
      mapLink:
        "https://maps.google.com/?q=Hotel+Tip+Top+International+Pune",
      image:
        "https://images.unsplash.com/photo-1562790351-d273a961e0e9?w=400&h=300&fit=crop",
    },
  ];

  const ImageWithFallback = ({
    src,
    alt,
    fallbackIcon,
    className = "",
  }: {
    src: string;
    alt: string;
    fallbackIcon?: string;
    className?: string;
  }) => {
    const [error, setError] = useState(false);

    if (error || !src) {
      return (
        <div
          className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 ${className}`}
        >
          <span className="text-4xl">{fallbackIcon || "🏨"}</span>
        </div>
      );
    }

    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        className={`object-cover ${className}`}
        onError={() => setError(true)}
        unoptimized
      />
    );
  };

  const tabContent =
    activeTab === "exhibitor" ? exhibitorTabs : visitorTabs;

  return (
    <div className="intro-animation">
      <div className="page-spacing-wrapper lg:pt-0">
        <PageHero
          title="PLAN YOUR"
          accent="TRAVEL"
          subtitle="Whether you are exhibiting, visiting, speaking, or networking, make the most of your INDIAMET 2027 experience in Pune."
        />

        {/* Travel Information Tabs */}
        <div className="animated-block mt-8">
          <div className="animated-block-target">
            <Container>
              <div className="mb-10 flex flex-col items-start justify-between gap-6 border-b border-gray-200 pb-8 lg:flex-row lg:items-center">
                <h2 className="font-bebas text-4xl uppercase text-[#03193D] md:text-5xl">
                  Travel{" "}
                  <span className="text-[#CC9808]">
                    Information
                  </span>{" "}
                  &amp; Guidelines
                </h2>

                <div className="inline-flex gap-2 rounded-sm border border-gray-200 bg-[#FCF8F3] p-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab("exhibitor")}
                    className={`cursor-pointer rounded-sm px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      activeTab === "exhibitor"
                        ? "bg-[#CC9808] text-white"
                        : "bg-transparent text-[#03193D] hover:text-[#CC9808]"
                    }`}
                  >
                    For Exhibitors
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("visitor")}
                    className={`cursor-pointer rounded-sm px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      activeTab === "visitor"
                        ? "bg-[#CC9808] text-white"
                        : "bg-transparent text-[#03193D] hover:text-[#CC9808]"
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
                      className="flex flex-col items-center gap-6 rounded-sm border border-gray-100 bg-[#FCF8F3] p-6 shadow-sm transition-all duration-300 hover:shadow-md md:flex-row"
                    >
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-sm border border-gray-200 bg-gray-200">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          fallbackIcon={item.fallbackIcon}
                          className="h-full w-full"
                        />
                      </div>

                      <div className="flex-1 space-y-2 text-center md:text-left">
                        <h4 className="font-bebas text-2xl font-bold uppercase tracking-wide text-[#03193D]">
                          {item.title}
                        </h4>

                        <p className="text-sm leading-relaxed text-gray-600">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-4 shrink-0 md:mt-0">
                        <Link
                          href={item.buttonLink}
                          className="inline-flex rounded-sm bg-[#CC9808] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#03193D]"
                        >
                          {item.buttonText}
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
              <div className="mb-10 border-l-4 border-[#CC9808] pl-6">
                <h2 className="font-bebas text-4xl uppercase text-[#03193D] md:text-5xl">
                  Accommodation in{" "}
                  <span className="text-[#CC9808]">Pune</span>
                </h2>

                <p className="mt-2 text-sm font-bold uppercase tracking-wider text-[#CC9808]">
                  Convenient hotel options for INDIAMET 2027 exhibitors &amp;
                  visitors
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {hotels.map((hotel, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between rounded-sm border border-gray-100 bg-[#FCF8F3] p-5 shadow-sm transition-all duration-300 hover:shadow-md"
                  >
                    <div>
                      <div className="relative h-48 w-full overflow-hidden rounded-sm border border-gray-200 bg-gray-200">
                        <ImageWithFallback
                          src={hotel.image}
                          alt={hotel.name}
                          fallbackIcon="🏨"
                          className="h-full w-full"
                        />
                      </div>

                      <div className="mt-4">
                        <h4 className="line-clamp-1 font-bebas text-2xl font-bold uppercase tracking-wide text-[#03193D]">
                          {hotel.name}
                        </h4>

                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600">
                          {hotel.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3 border-t border-gray-200 pt-4">
                      <Link
                        href={hotel.bookLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-sm bg-[#CC9808] py-2 text-center text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#03193D]"
                      >
                        Book Room
                      </Link>

                      <Link
                        href={hotel.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-sm border border-[#CC9808] py-2 text-center text-xs font-bold uppercase tracking-wider text-[#CC9808] transition-all duration-300 hover:border-[#03193D] hover:bg-[#03193D] hover:text-white"
                      >
                        Location
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </div>

        {/* Partners */}
        <div className="mt-16 lg:mt-24">
          <PartnersSection />
        </div>

        {/* Quick Navigation */}
        {/* <div className="animated-block mt-20">
          <div className="animated-block-target">
            <div className="border-t border-[#CC9808] bg-[#03193D] py-16 text-white">
              <Container>
                <h2 className="text-center font-bebas text-5xl uppercase tracking-wider md:text-6xl lg:text-left">
                  Quick Navigation
                </h2>

                <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
                  {quickLinks.map((item, idx) => (
                    <div
                      key={idx}
                      className="relative flex flex-col items-center justify-center text-center"
                    >
                      <Link
                        href={item.link}
                        className="group flex flex-col items-center"
                      >
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
        </div> */}

        <BackToTop />
      </div>

      <style jsx>{`
        .font-bebas {
          font-family: "Bebas Neue", cursive;
        }

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

        .animated-block:nth-child(1) {
          animation-delay: 0.1s;
        }

        .animated-block:nth-child(2) {
          animation-delay: 0.3s;
        }

        .animated-block:nth-child(3) {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}