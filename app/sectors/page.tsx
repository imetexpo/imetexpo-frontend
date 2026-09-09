// app/sectors/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PartnersSection from "@/components/home/PartnersSection";
import BackToTop from "@/components/layout/BackToTop";
import Container from "@/components/ui/container";

export default function SectorsPage() {
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

  const sectors = [
    {
  title: "Coordinate Measuring Machines (CMM)",
  slug: "coordinate-measuring-machines-cmm",
  description: "Bridge, gantry, portable, and articulating CMMs for high-precision dimensional inspection, geometric measurement, and quality control.",
  image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
},
{
  title: "Dimensional Measurement & Gauging",
  slug: "dimensional-measurement-and-gauging",
  description: "Precision measuring instruments, gauges, comparators, height gauges, micrometers, and advanced solutions for dimensional and tolerance measurement.",
  image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
},
{
  title: "Optical & Vision Metrology",
  slug: "optical-and-vision-metrology",
  description: "Video measuring machines, optical systems, machine vision, microscopes, non-contact measurement, and automated visual inspection technologies.",
  image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
},
{
  title: "3D Scanning & Digital Measurement",
  slug: "3d-scanning-and-digital-measurement",
  description: "Laser scanners, structured-light scanners, handheld 3D scanners, point-cloud systems, reverse engineering, and digital inspection solutions.",
  image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
},
{
  title: "Surface & Form Measurement",
  slug: "surface-and-form-measurement",
  description: "Advanced systems for surface roughness, contour, roundness, cylindricity, waviness, profile, and precision form measurement.",
  image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
},
{
  title: "Calibration & Reference Standards",
  slug: "calibration-and-reference-standards",
  description: "Calibration equipment, reference standards, master instruments, calibration software, traceability solutions, and laboratory measurement systems.",
  image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
},
{
  title: "Testing & Quality Inspection",
  slug: "testing-and-quality-inspection",
  description: "Material testing, mechanical testing, dimensional inspection, non-destructive testing, laboratory equipment, and advanced quality inspection solutions.",
  image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
},
{
  title: "Sensors, Probes & Measurement Systems",
  slug: "sensors-probes-and-measurement-systems",
  description: "Precision sensors, probes, encoders, laser measurement systems, displacement sensors, force measurement, and advanced data acquisition technologies.",
  image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
},
{
  title: "Metrology Software & Digital Quality",
  slug: "metrology-software-and-digital-quality",
  description: "Inspection software, SPC, QMS, measurement data management, digital reporting, analytics, and connected quality management solutions.",
  image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
},
{
  title: "Automation & Industry 4.0",
  slug: "automation-and-industry-40",
  description: "Automated inspection, robotic measurement, inline metrology, smart manufacturing, AI-powered inspection, and connected Industry 4.0 solutions.",
  image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
},
{
  title: "Precision Instruments & Gauges",
  slug: "precision-instruments-and-gauges",
  description: "Micrometers, vernier instruments, dial indicators, thread gauges, gear measurement systems, precision gauges, and specialised inspection equipment.",
  image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
},
{
  title: "Metrology Services & Laboratories",
  slug: "metrology-services-and-laboratories",
  description: "Calibration laboratories, testing services, dimensional measurement, inspection services, certification, consultancy, training, and metrology support.",
  image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
}
  ];

  const quickGuideItems = [
  {
    title: "Become an Exhibitor",
    description: "Showcase your metrology, measurement, inspection, calibration, and quality technologies to manufacturers, engineers, quality professionals, and key industry decision-makers.",
    buttonText: "Book A Stand",
    buttonLink: "/exhibiting-enquiry",
    image: "https://cdn.itegroupnews.com/mw24_1062_min_91b90d653f.jpg"
  },
  {
    title: "Download Your Event Brochure",
    description: "Explore INDIAMET 2027, discover the exhibition sectors, visitor profile, exhibiting opportunities, and everything you need to plan your participation.",
    buttonText: "Download Now",
    buttonLink: "/event-brochure",
    image: "https://cdn.itegroupnews.com/Untitled_500_x_500_px_cd8f081eec.png"
  },
  {
    title: "Become a Visitor",
    description: "Discover the latest metrology and measurement technologies, connect with leading solution providers, meet industry professionals, and explore innovations shaping precision manufacturing.",
    buttonText: "Register Now",
    buttonLink: "/visitor-registration",
    image: "https://cdn.itegroupnews.com/mw24_1077_min_75a8122d24.jpg"
  }
];
  return (
    <div className="intro-animation">
      {/* Mobile Header */}
      <div className="fixed left-0 top-0 z-50 w-full bg-[#03193D] px-5 py-2 lg:hidden">
        <div className="flex justify-between">
          <Link href="/">
            <Image src="/imgs/logo-its.png" alt="INDIAMET Expo" width={140} height={40} className="h-auto w-auto object-contain" />
          </Link>
          <button className="z-10" aria-label="Menu">
            <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.66667 20C0.746193 20 0 19.2538 0 18.3333C0 17.4129 0.746193 16.6667 1.66667 16.6667H30.3333C31.2538 16.6667 32 17.4129 32 18.3333C32 19.2538 31.2538 20 30.3333 20H1.66667ZM1.66667 11.6667C0.746193 11.6667 0 10.9205 0 10C0 9.07952 0.746192 8.33333 1.66667 8.33333H30.3333C31.2538 8.33333 32 9.07952 32 10C32 10.9205 31.2538 11.6667 30.3333 11.6667H1.66667ZM1.66667 3.33333C0.746193 3.33333 0 2.58714 0 1.66667C0 0.746192 0.746192 0 1.66667 0H30.3333C31.2538 0 32 0.746192 32 1.66667C32 2.58714 31.2538 3.33333 30.3333 3.33333H1.66667Z" fill="#CC9808"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className="fixed bottom-3 right-3 z-50 opacity-0 transition-all duration-300 lg:bottom-10 lg:right-2">
        <button className="m-0 rounded-full border-none bg-white p-0 outline-hidden drop-shadow-lg" aria-label="Back to top">
          <svg className="size-10 fill-orange-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M22 12c0-5.522-4.476-10-10-10C6.479 2 2 6.479 2 12c0 5.524 4.478 10 10 10c5.524 0 10-4.476 10-10zm-14.53.28a.75.75 0 0 1-.073-.976l.073-.084l4-4a.75.75 0 0 1 .977-.073l.085.072l4 4.002a.75.75 0 0 1-.977 1.133l-.084-.073l-2.72-2.721v6.691a.75.75 0 0 1-.649.743l-.102.007a.75.75 0 0 1-.743-.648l-.007-.102v-6.69l-2.72 2.72a.75.75 0 0 1-.976.072l-.084-.072z"></path>
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="page-spacing-wrapper pt-[120px] lg:pt-0">

        {/* Sectors Grid Section */}
        <div className="animated-block">
          <div className="animated-block-target">
            <Container>
              <div className="text-center lg:text-left">
                <h2 className="font-bebas text-5xl text-[#03193D] md:text-6xl lg:text-7xl">
                  <br />
                  Sectors Showcased at <span className="text-[#CC9808]">INDIAMET Expo</span>
                </h2>
                <p className="mx-auto mt-5 max-w-9xl text-lg text-gray-700 lg:mx-0">
                  INDIAMET brings together the complete spectrum of metrology, measurement, inspection, 
                  calibration, testing, and quality technologies. From advanced CMMs and optical measurement 
                  systems to calibration equipment, 3D scanning, machine vision, and smart metrology software, 
                  the exhibition connects technology providers with manufacturers and quality professionals across 
                  India's precision manufacturing ecosystem.
                </p>
              </div>

              <div className="my-16 md:my-20">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {sectors.map((sector, idx) => (
                    <Link
                      key={idx}
                      href={`/sectors/${sector.slug}`}
                      className="group relative block overflow-hidden rounded-sm shadow-sm border border-gray-100 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md"
                    >
                      <div className="relative h-56 w-full overflow-hidden bg-gray-100 rounded-t-sm">
                        <Image
                          src={sector.image}
                          alt={sector.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              const fallback = document.createElement('div');
                              fallback.className = 'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200';
                              fallback.innerHTML = `<span class="text-6xl">${getSectorIcon(idx)}</span>`;
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 pt-8 rounded-b-sm">
                        <h3 className="text-center font-bebas text-lg sm:text-xl text-white transition-colors duration-300 group-hover:text-[#CC9808] font-bold uppercase tracking-wide">
                          {sector.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Container>
          </div>
        </div>

        {/* Quick Guide Section */}
        <div className="animated-block mt-12 lg:mt-20">
          <div className="animated-block-target">
            <Container>
              <div className="mb-10 text-center lg:mb-12 lg:text-left">
                <p className="font-bold text-[#CC9808]">Quick Guide</p>
                <h3 className="mt-2 font-bebas text-5xl text-[#03193D] md:text-6xl lg:text-7xl">
                  Simplifying Your <span className="text-[#CC9808]">Participation Journey</span>
                </h3>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {quickGuideItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex flex-col overflow-hidden rounded-sm bg-[#FCF8F3] border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-lg shadow-sm"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-[#03193D]/20 group-hover:bg-[#03193D]/40 transition-all duration-300"></div>
                      <div className="absolute bottom-4 left-0 right-0 flex justify-start pl-4">
                        <Link href={item.buttonLink}>
                          <button className="bg-[#CC9808] hover:bg-[#03193D] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                            {item.buttonText}
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-5 font-sans">
                      <h4 className="font-bebas text-2xl text-[#03193D] md:text-3xl font-bold">{item.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </div>

        {/* Partners Section */}
        <div className="mt-12 lg:mt-20">
          <PartnersSection />
        </div>
        <BackToTop />
      </div>

      <style jsx>{`
        .global-transition { transition: all 0.3s ease; }
        .flex-center { display: flex; align-items: center; justify-content: center; }
        .font-bebas { font-family: 'Bebas Neue', cursive; }
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
          to { opacity: 1; transform: translateY(0); }
        }
        .animated-block:nth-child(1) { animation-delay: 0.1s; }
        .animated-block:nth-child(2) { animation-delay: 0.3s; }
        .animated-block:nth-child(3) { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
}

function getSectorIcon(index: number): string {
  const icons = ["🌿", "🏭", "⚙️", "🔬", "🔧", "♻️", "🔨", "📦", "🧪", "🤖", "🚚", "🔥"];
  return icons[index] || "🏭";
}