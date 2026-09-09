// app/conference-programme/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import PartnersSection from "@/components/home/PartnersSection";
import BackToTop from "@/components/layout/BackToTop";
import Container from "@/components/ui/container";

const statsData = [
  { value: "60+", label: "Conference Speakers" },
  { value: "12", label: "Specialised Sessions" },
  { value: "3", label: "Days" },
];

const mainEventsData = [
  {
    title: "Tyre Manufacturing Leaders Forum – Strategic Insights for Industry Growth",
    content: (
      <ul className="list-disc space-y-3 pl-5 text-sm text-gray-700 leading-relaxed font-sans">
        <li>
          <strong>Main Plenary Session: </strong>Featuring top executives from leading tyre manufacturers, rubber processors, and equipment suppliers across Asia and beyond.
          <br />
          Focus: Digital transformation, sustainable manufacturing, and supply chain resilience in the tyre industry.
        </li>
        <li>
          <strong>Industry 4.0 in Tyre Manufacturing: </strong>A showcase of the most effective digital and automation projects transforming tyre production worldwide.
        </li>
      </ul>
    ),
  },
  {
    title: "New for 2026 – Exclusive Forums and Round Tables",
    content: (
      <ul className="list-disc space-y-3 pl-5 text-sm text-gray-700 leading-relaxed font-sans">
        <li>
          <strong>Sustainability Forum – Debut Edition: </strong>Carbon Neutrality and Circular Economy: New Standards for Tyre Manufacturing.
        </li>
        <li>
          <strong>Round Table: The Future of Raw Materials: </strong>In-depth dialogue on natural rubber sourcing, synthetic alternatives, and sustainable compounding strategies.
        </li>
        <li>
          <strong>Round Table: Smart Factory & Automation: </strong>AI-driven quality control, predictive maintenance, and IoT integration in tyre plants.
        </li>
        <li>
          <strong>Round Table: Testing & Quality Assurance: </strong>Advanced uniformity, durability, and X-ray inspection technologies.
        </li>
        <li>
          <strong>Round Table: Emerging Markets & Investment: </strong>Exploring growth opportunities in ASEAN, India, and Africa.
        </li>
      </ul>
    ),
  },
  {
    title: "Technical Conferences",
    content: (
      <ul className="list-disc space-y-3 pl-5 text-sm text-gray-700 leading-relaxed font-sans">
        <li>
          <strong>Rubber Processing & Compounding: </strong>Latest innovations in mixing, extrusion, and curing technologies from leading processing plant experts.
        </li>
        <li>
          <strong>Tyre Testing & Lab Equipment:</strong> New methods and instruments for quality assurance, regulatory compliance, and performance benchmarking.
        </li>
      </ul>
    ),
  },
];

const keyEventsData = [
  {
    title: "The Tyre Manufacturing Leaders' Forum",
    image: "https://cdn.itegroupnews.com/MW_24_2304_0005_G_i_1_0c28de356a.jpg",
  },
  {
    title: "Industry 4.0 in Tyre Manufacturing",
    image: "https://cdn.itegroupnews.com/mw2022_gi_31_fe2e3e372e.jpg",
  },
  {
    title: "Sustainability Forum",
    image: "https://cdn.itegroupnews.com/4_C4_A3872_1202c590ba.jpg",
  },
  {
    title: "Technical Conferences",
    image: "https://cdn.itegroupnews.com/4_C4_A5222_ad4a659bdc.jpg",
  },
];

const conferencePartners = [
  {
    name: "Zyfra",
    logo: "https://cdn.itegroupnews.com/2_48e8e636ac.png",
    type: "Technology Partner",
    url: "https://www.zyfra.com/",
  },
  {
    name: "Modern Tyre Industry",
    logo: "https://cdn.itegroupnews.com/3_c5c5637a9c.png",
    type: "Media Partner",
    url: "#",
  },
];

export default function ConferenceProgrammePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-100 grid place-content-center bg-[#03193D]">
        <div className="flex size-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-500 text-4xl">
          <div className="flex size-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-300 text-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="intro-animation font-sans">
      <div className="page-spacing-wrapper pt-[120px] lg:pt-0">

        {/* Innovate Through Knowledge Section */}
        <Container className="py-10">
          <div className="animated-block">
            <div className="animated-block-target">
              <div className="w-full grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
                <div className="order-2 lg:order-1 space-y-6">
                  <div className="space-y-3">
                    <p className="text-[#CC9808] text-xs font-bold uppercase tracking-wider">Business Programme</p>
                    <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-tight text-[#03193D] uppercase">
                      Innovate Through <span className="text-[#CC9808]">Knowledge</span>
                    </h1>
                  </div>
                  <p className="text-base sm:text-lg leading-relaxed text-gray-705">
                    A dynamic three-day conference featuring industry leaders from tyre manufacturers, rubber processing plants, and equipment suppliers. Designed for decision-makers, engineers, and specialists, the program tackles key challenges, innovations, and trends shaping the tyre manufacturing sector.
                  </p>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 bg-[#FCF8F3] border border-gray-100 p-6 rounded-sm shadow-sm">
                    {statsData.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <h3 className="text-3xl font-bebas text-[#CC9808] uppercase font-bold">{stat.value}</h3>
                        <p className="text-[10px] uppercase font-bold text-gray-600 mt-1 tracking-wider">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link href="https://cdn-ite.prismetic.com/CP_Agenda_ITS_Tyre_Expo_2026.pdf" target="_blank" rel="noopener noreferrer">
                      <button className="bg-[#CC9808] hover:bg-[#03193D] text-white px-8 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                        View Agenda
                      </button>
                    </Link>
                  </div>
                </div>
                
                {/* Image */}
                <div className="order-1 lg:order-2 relative h-[300px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-sm border border-gray-150 bg-gray-100">
                  <Image
                    src="https://cdn.itegroupnews.com/MW_24_2304_0005_G_i_1_0c28de356a.jpg"
                    alt="Conference"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Main Events Section */}
        <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
          <div className="animated-block-target">
            <div className="bg-[#FCF8F3] py-16 border-t border-b border-gray-150">
              <Container>
                <div className="mb-8 space-y-2">
                  <h2 className="font-bebas text-4xl sm:text-5xl text-[#03193D] uppercase font-bold">
                    Main Events of the Business Programme
                  </h2>
                  <p className="text-sm font-bold text-[#CC9808] uppercase tracking-wider">
                    08 – 09 October 2026
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {mainEventsData.map((event, idx) => (
                    <div key={idx} className="relative flex flex-col overflow-hidden rounded-sm border border-gray-100 bg-white p-6 shadow-sm">
                      <div className="flex flex-col flex-1 gap-4">
                        <h3 className="font-bebas text-2xl text-[#CC9808] leading-tight uppercase font-bold">
                          {event.title}
                        </h3>
                        <div className="text-gray-650 flex-1">
                          {event.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          </div>
        </div>

        {/* Key Events Carousel Section */}
        <Container className="py-16">
          <div className="animated-block">
            <div className="animated-block-target">
              <div className="mb-8 space-y-3 max-w-3xl">
                <h3 className="font-bebas text-4xl sm:text-5xl text-[#03193D] uppercase font-bold">
                  Key Events
                </h3>
                <p className="text-sm text-gray-650 leading-relaxed">
                  The INDIAMET Expo 2026 conference programme unites top experts and industry leaders for three days of in-depth discussions. Participants share valuable insights and explore sustainability in tyre manufacturing, with a focus on innovations, business processes, and management strategies vital for the sector's future.
                </p>
              </div>
              <div className="relative mt-8 w-full">
                <Carousel>
                  <CarouselContent className="-ml-4">
                    {keyEventsData.map((event, idx) => (
                      <CarouselItem
                        key={idx}
                        className="pl-4 md:basis-1/2 lg:basis-1/3"
                      >
                        <div className="group flex flex-col overflow-hidden rounded-sm border border-gray-100 bg-[#FCF8F3] shadow-sm hover:shadow-md transition-all duration-300">
                          <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100 rounded-t-sm">
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-[#03193D]/20 group-hover:bg-[#03193D]/40 transition duration-300"></div>
                          </div>
                          <div className="p-5 font-sans">
                            <h5 className="font-bebas text-xl text-[#03193D] uppercase font-bold">
                              {event.title}
                            </h5>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
        </Container>

        {/* Conference Partners Section */}
        <Container className="py-10">
          <div className="animated-block">
            <div className="animated-block-target">
              <h2 className="font-bebas text-4xl sm:text-5xl text-[#03193D] uppercase font-bold mb-8">
                Conference Partners
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {conferencePartners.map((partner, idx) => (
                  <div
                    key={idx}
                    className="relative flex flex-col justify-between overflow-hidden rounded-sm border border-gray-100 bg-[#FCF8F3] p-6 shadow-sm hover:shadow-md transition-all duration-300 text-center"
                  >
                    <div>
                      <div className="relative h-20 w-full overflow-hidden mx-auto bg-white border border-gray-150 p-2 rounded-sm">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <h3 className="mt-5 font-bebas text-2xl text-[#03193D] uppercase font-bold">
                        {partner.name}
                      </h3>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">{partner.type}</p>
                    </div>
                    <div className="pt-6">
                      <Link href={partner.url} target="_blank" rel="noopener noreferrer">
                        <button className="w-full bg-[#CC9808] hover:bg-[#03193D] text-white py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer">
                          Visit Website
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>

        <div className="mt-12 sm:mt-16 lg:mt-20">
          <PartnersSection />
        </div>
      </div>
      <BackToTop />

      <style jsx>{`
        .font-bebas { font-family: 'Bebas Neue', cursive; }
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
      `}</style>
    </div>
  );
}