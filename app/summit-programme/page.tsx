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
import LoadingDots from '@/components/ui/LoadingDots';
import { getImageAlt } from '@/lib/imageAlts';


const statsData = [
  { value: "60+", label: "Conference Speakers" },
  { value: "12", label: "Specialised Sessions" },
  { value: "3", label: "Days" },
];

const mainEventsData = [
  {
    title: "Industrial Metrology Leaders Forum – Strategic Insights for Quality Excellence",
    content: (
      <ul className="list-disc space-y-3 pl-5 text-sm text-gray-700 leading-relaxed font-sans">
        <li>
          <strong>Main Plenary Session: </strong>Featuring top executives from leading metrology instrumentation manufacturers, optical 3D measurement specialists, and precision engineering leaders across Asia and beyond.
          <br />
          Focus: Digital transformation, automated quality inspection, and zero-defect manufacturing in precision industries.
        </li>
        <li>
          <strong>Industry 4.0 in Precision Metrology: </strong>A showcase of inline 3D measurement, robotic scanning, and automated gauging systems transforming precision manufacturing.
        </li>
      </ul>
    ),
  },
  {
    title: "New for 2027 – Exclusive Forums and Round Tables",
    content: (
      <ul className="list-disc space-y-3 pl-5 text-sm text-gray-700 leading-relaxed font-sans">
        <li>
          <strong>Digital Metrology Forum – Debut Edition: </strong>Digital Twins and Closed-Loop Quality: New Standards for Industrial Metrology.
        </li>
        <li>
          <strong>Round Table: Optical & 3D Scanning Technologies: </strong>In-depth dialogue on structured light scanning, photogrammetry, and LiDAR applications in automated manufacturing.
        </li>
        <li>
          <strong>Round Table: Smart Factory & Inline Inspection: </strong>AI-driven quality control, predictive metrology, and IoT integration on production lines.
        </li>
        <li>
          <strong>Round Table: Calibration & Standards: </strong>Traceability, ISO/IEC standards, and international calibration protocols.
        </li>
        <li>
          <strong>Round Table: Advanced Manufacturing & Metrology: </strong>Exploring growth opportunities in aerospace, automotive, defense, and medical devices.
        </li>
      </ul>
    ),
  },
  {
    title: "Technical Conferences",
    content: (
      <ul className="list-disc space-y-3 pl-5 text-sm text-gray-700 leading-relaxed font-sans">
        <li>
          <strong>Coordinate Measuring & Dimensional Inspection: </strong>Latest innovations in tactile, optical, and multisensor CMM technology from leading global experts.
        </li>
        <li>
          <strong>Quality Engineering & Laboratory Equipment:</strong> New methods and instruments for geometric dimensioning and tolerancing (GD&T), surface roughness, and automated benchmarking.
        </li>
      </ul>
    ),
  },
];

const keyEventsData = [
  {
    title: "The Industrial Metrology Leaders' Forum",
    image: "/images/confe.jpg",
  },
  {
    title: "Industry 4.0 in Precision Metrology",
    image: "/images/industry4.jpg",
  },
  {
    title: "Digital Metrology & Quality Summit",
    image: "/images/4_C4_A3872_1202c590ba.jpg",
  },
  {
    title: "Technical Metrology Conferences",
    image: "/images/4_C4_A5222_ad4a659bdc.jpg",
  },
];

const conferencePartners = [
  {
    name: "Zyfra",
    logo: "/images/2_48e8e636ac.png",
    type: "Technology Partner",
    url: "https://www.zyfra.com/",
  },
  {
    name: "Industrial Metrology Insights",
    logo: "/images/3_c5c5637a9c.png",
    type: "Media Partner",
    url: "",
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
      <LoadingDots fullScreen />
    );
  }

  return (
    <div className="intro-animation font-sans">
      <div className="page-spacing-wrapper lg:pt-0">

        {/* Innovate Through Knowledge Section */}
        <Container className="py-10">
          <div className="animated-block">
            <div className="animated-block-target">
              <div className="w-full grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
                <div className="order-2 lg:order-1 space-y-6">
                  <div className="space-y-3">
                    <p className="text-[#00A1B1] text-xs font-bold uppercase tracking-wider">Business Programme</p>
                    <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-tight text-[#003A77] uppercase">
                      Innovate Through <span className="text-[#00A1B1]">Knowledge</span>
                    </h1>
                  </div>
                  <p className="text-base sm:text-lg leading-relaxed text-gray-705">
                    A dynamic three-day conference featuring industry leaders from precision measurement equipment manufacturers, optical metrology specialists, and quality engineering leaders. Designed for decision-makers, quality heads, design engineers, and calibration specialists, the program tackles key challenges, innovations, and trends shaping the precision manufacturing and metrology sector.
                  </p>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 bg-[#FCF8F3] border border-gray-100 p-6 rounded-sm shadow-sm">
                    {statsData.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <h3 className="text-3xl font-bebas text-[#00A1B1] uppercase font-bold">{stat.value}</h3>
                        <p className="text-[10px] uppercase font-bold text-gray-600 mt-1 tracking-wider">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link href="" target="_blank" rel="noopener noreferrer">
                      <button className="bg-[#00A1B1] hover:bg-[#003A77] text-white px-8 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                        View Agenda
                      </button>
                    </Link>
                  </div>
                </div>
                
                {/* Image */}
                <div className="order-1 lg:order-2 relative h-[300px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-sm border border-gray-150 bg-gray-100">
                  <Image
                    src="/images/confe.jpg"
                    alt="Speaker addressing a seated audience at a professional conference"
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
                  <h2 className="font-bebas text-4xl sm:text-5xl text-[#003A77] uppercase font-bold">
                    Main Events of the Business Programme
                  </h2>
                  <p className="text-sm font-bold text-[#00A1B1] uppercase tracking-wider">
                    13 – 15 May 2027 • Auto Cluster Exhibition Centre, Pune, India
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {mainEventsData.map((event, idx) => (
                    <div key={idx} className="relative flex flex-col overflow-hidden rounded-sm border border-gray-100 bg-white p-6 shadow-sm">
                      <div className="flex flex-col flex-1 gap-4">
                        <h3 className="font-bebas text-2xl text-[#00A1B1] leading-tight uppercase font-bold">
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
                <h3 className="font-bebas text-4xl sm:text-5xl text-[#003A77] uppercase font-bold">
                  Key Events
                </h3>
                <p className="text-sm text-gray-650 leading-relaxed">
                  The IndiaMet 2027 - India's Dedicated Industrial Metrology Exhibition And Summit conference programme unites top experts and industry leaders for three days of in-depth discussions. Participants share valuable insights and explore innovations in precision measurement, dimensional gauging, CMM, 3D scanning, and Industry 4.0 quality assurance strategies vital for the sector's future.
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
                              alt={getImageAlt(event.image, event.title)}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-[#003A77]/20 group-hover:bg-[#003A77]/40 transition duration-300"></div>
                          </div>
                          <div className="p-5 font-sans">
                            <h5 className="font-bebas text-xl text-[#003A77] uppercase font-bold">
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
              <h2 className="font-bebas text-4xl sm:text-5xl text-[#003A77] uppercase font-bold mb-8">
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
                          alt={getImageAlt(partner.logo, partner.name)}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <h3 className="mt-5 font-bebas text-2xl text-[#003A77] uppercase font-bold">
                        {partner.name}
                      </h3>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">{partner.type}</p>
                    </div>
                    <div className="pt-6">
                      <Link href={partner.url} target="_blank" rel="noopener noreferrer">
                        <button className="w-full bg-[#00A1B1] hover:bg-[#003A77] text-white py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer">
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