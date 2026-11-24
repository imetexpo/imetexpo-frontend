"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import PartnersSection from "@/components/home/PartnersSection";
import SectorsSection from "@/components/home/SectorsSection";
import WhyChooseIndiaMetSection from "@/components/why-exhibit/WhyChooseIndiaMetSection";
import WhoShouldExhibitSection from "@/components/why-exhibit/WhoShouldExhibitSection";
import BackToTop from "@/components/layout/BackToTop";
import Container from "@/components/ui/container";
import PageHero from "@/components/layout/PageHero";
import { getImageAlt } from '@/lib/imageAlts';

export default function WhyExhibitPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const sectors = [
    {
      title: "Coordinate Measuring Machines (CMM)",
      slug: "coordinate-measuring-machines",
      description: "Bridge, gantry, horizontal arm, and portable articulated arm CMMs for high-accuracy component inspection.",
      image: "/images/cmm.webp"
    },
    {
      title: "3D Scanning & Optical Metrology",
      slug: "3d-scanning-and-optical-metrology",
      description: "Laser scanners, structured light scanners, photogrammetry, and non-contact 3D inspection systems.",
      image: "/images/3dscan.webp"
    },
    {
      title: "Dimensional Gauging & Tooling",
      slug: "dimensional-gauging-and-tooling",
      description: "Air gauges, electronic gauges, dial indicators, bore gauges, height masters, and custom multi-gauging fixtures.",
      image: "/images/metrology.webp"
    },
    {
      title: "Surface & Form Measurement",
      slug: "surface-and-form-measurement",
      description: "Roughness testers, roundness testers, profilometers, contour measurement systems, and interferometers.",
      image: "/images/testing.webp"
    },
    {
      title: "Calibration & Standards",
      slug: "calibration-and-standards",
      description: "Calibration standards, gauge blocks, laser interferometers, master rings, and NABL-accredited laboratory equipment.",
      image: "/images/quality.webp"
    },
    {
      title: "Automated & In-Line Inspection",
      slug: "automated-and-inline-inspection",
      description: "Robotic inspection cells, automated optical inspection (AOI), machine vision systems, and smart factory metrology.",
      image: "/images/ai.webp"
    }
  ];

  const getSlides = () => {
    const slides = [];
    for (let i = 0; i < sectors.length; i += 3) {
      slides.push(sectors.slice(i, i + 3));
    }
    return slides;
  };

  const slides = getSlides();
  const totalSlides = slides.length;

  useEffect(() => {
    if (isAutoPlaying && totalSlides > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, totalSlides]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const handleMouseLeave = () => setIsAutoPlaying(true);

  const goToPreviousSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  const goToNextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const goToSlide = (index: number) => setCurrentSlide(index);

  const quickLinks = [
    { label: "Enquire to Exhibit", link: "/exhibiting-enquiry", icon: "/icons/enquire.webp" },
    { label: "Download Event Brochure", link: "/event-brochure", icon: "/icons/brochure.webp" },
    { label: "Exhibitor List", link: "/exhibitor-list", icon: "/icons/list.webp" },
    { label: "Plan Your Travel", link: "/plan-your-travel", icon: "/icons/travel.webp" },
    { label: "Why Visit", link: "/why-visit", icon: "/icons/visit.webp" }
  ];

  return (
    <div className="intro-animation min-h-screen overflow-x-hidden bg-white">
      <div className="page-spacing-wrapper">
        <div className="lg:pt-0">
          <PageHero
            title="WHY"
            accent="EXHIBIT"
            subtitle="Your gateway to precision manufacturing growth in India. Connect with manufacturers, quality professionals, and decision-makers at INDIAMET Expo."
          />

          {/* Powering Progress Section */}
          <div className="animated-block">
            <div className="animated-block-target">
              <Container className="py-10 sm:py-16 lg:py-20">
                <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-5 lg:gap-14 xl:gap-20">
                  <div className="lg:col-span-5">
                    <div className="flex flex-col gap-3 sm:gap-5">
                      <p className="font-bold text-[#00A1B1] text-xs sm:text-sm uppercase tracking-wider font-sans">
                        Your Gateway to Precision Manufacturing Growth in India
                      </p>
                      <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#003A77] leading-tight">
                        Powering the Future of Metrology, Measurement &amp; Quality
                      </h2>
                      <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-sans">
                        As manufacturing moves toward greater precision, automation, digitalisation, and quality excellence,
                        India’s metrology and measurement industry is entering a new era of growth. INDIAMET connects you with
                        leading manufacturers, technology providers, quality professionals, engineers, OEMs, and decision-makers
                        shaping the future of precision manufacturing.
                      </p>
                      <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-sans">
                        Discover advanced metrology and inspection technologies, build valuable business connections, and unlock new opportunities across India’s rapidly evolving manufacturing ecosystem.
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="mt-6 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-0 bg-[#FCF8F3] border border-gray-100 p-4 sm:py-6 sm:px-4 rounded-sm sm:divide-x divide-gray-200 font-sans">
                      <div className="text-center p-2 sm:p-0">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bebas text-[#00A1B1] font-bold">1st</h3>
                        <p className="text-[10px] sm:text-xs tracking-wider text-[#003A77] font-semibold mt-1 uppercase">Edition</p>
                      </div>
                      <div className="text-center p-2 sm:p-0">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bebas text-[#00A1B1] font-bold">10,000+</h3>
                        <p className="text-[10px] sm:text-xs tracking-wider text-[#003A77] font-semibold mt-1 uppercase">Trade Visitors</p>
                      </div>
                      <div className="text-center p-2 sm:p-0">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bebas text-[#00A1B1] font-bold">150+</h3>
                        <p className="text-[10px] sm:text-xs tracking-wider text-[#003A77] font-semibold mt-1 uppercase">Exhibitors</p>
                      </div>
                      <div className="text-center p-2 sm:p-0">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bebas text-[#00A1B1] font-bold">50+</h3>
                        <p className="text-[10px] sm:text-xs tracking-wider text-[#003A77] font-semibold mt-1 uppercase">Speakers</p>
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-8">
                      <Link href="/about" className="inline-block w-full sm:w-auto">
                        <button className="w-full sm:w-auto bg-[#00A1B1] hover:bg-[#003A77] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm text-center">
                          About INDIAMET Expo
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </div>

          {/* Why Exhibit Section */}
          <div className="animated-block mt-10 sm:mt-16 lg:mt-20">
            <div className="animated-block-target">
              <Container>
                <div className="grid gap-3 sm:gap-4">
                  <h1 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#003A77] leading-tight">
                    Why Exhibit at INDIAMET Expo 2027 ?
                  </h1>
                  <h2 className="font-bebas text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#003A77] leading-tight">
                    Put Your Measurement Technology in Front of the Right Industry Audience
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-sans">
                    INDIAMET 2027 is an international exhibition dedicated to metrology, measurement technology, industrial inspection, calibration and quality engineering. Taking place from 13–15 May 2027 at the Auto Cluster Exhibition Centre in Pune, the event is designed to connect solution providers with professionals seeking greater accuracy, efficiency and confidence in precision manufacturing.
                    <br /><br />
                    For manufacturers and suppliers evaluating an industrial metrology exhibition, INDIAMET offers a focused platform to present capabilities, start technical conversations and build relationships across the manufacturing quality ecosystem.
                  </p>
                </div>

                <div className="my-8 sm:my-12 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      title: "Struggling to find qualified buyers?",
                      desc: "Meet a focused audience of manufacturers, OEMs, engineers, quality professionals, procurement teams, and decision-makers actively looking for metrology, measurement, inspection, calibration, and quality solutions.",
                      icon: "/images/recruitment_12105214_9abca4ba0e.webp"
                    },
                    {
                      title: "Looking to expand your market presence?",
                      desc: "Gain direct access to India’s growing precision manufacturing ecosystem, including automotive, aerospace, defence, engineering, electronics, medical devices, and other high-precision industries.",
                      icon: "/images/goal_2974630_407b28db91.webp"
                    },
                    {
                      title: "Worried about standing out in a competitive market?",
                      desc: "Showcase your latest metrology and measurement technologies through live demonstrations and direct engagement with industry professionals looking for advanced solutions to improve accuracy, quality, and productivity.",
                      icon: "/images/marketing_14125861_0aab65a0a8.webp"
                    },
                    {
                      title: "Looking for buyers ready to invest?",
                      desc: "Connect with companies investing in advanced measurement, inspection, automation, digital quality, and Industry 4.0 technologies — and turn technology demonstrations into qualified business opportunities.",
                      icon: "/images/contract_10861184_2c90043b14.webp"
                    }
                  ].map((benefit, idx) => (
                    <div key={idx} className="group flex flex-col justify-between rounded-xl sm:rounded-2xl border border-[#003A77]/10 bg-[#FCF8F3] p-4 sm:p-5 shadow-[0_2px_12px_rgba(19,45,73,0.02)] transition-all duration-300 hover:border-[#00A1B1]/40 hover:bg-white hover:shadow-[0_8px_24px_rgba(0,161,177,0.08)] motion-safe:hover:-translate-y-0.5 font-sans">
                      <div>
                        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#EDF4FB] border border-[#003A77]/10 text-[#003A77] group-hover:border-[#00A1B1] group-hover:bg-[#00A1B1] transition-colors p-2.5">
                          <img src={benefit.icon} alt="" className="h-full w-full object-contain" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#003A77] leading-snug mt-3 sm:mt-4">{benefit.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/exhibiting-enquiry" className="inline-block w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-[#00A1B1] hover:bg-[#003A77] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm text-center">
                    Book A Stall
                  </button>
                </Link>
              </Container>
            </div>
          </div>

          <SectorsSection />

          {/* Why Choose INDIAMET for Your Next Exhibition? Section */}
          <WhyChooseIndiaMetSection />

          {/* Visitor Breakdown Section */}
          <div className="animated-block mt-10 sm:mt-16 lg:mt-20">
            <div className="animated-block-target">
              <Container>
                <div className="grid items-center gap-8 sm:gap-10 overflow-hidden lg:grid-cols-5 lg:gap-14 xl:gap-20">
                  <div className="lg:col-span-3">
                    <div className="flex flex-col gap-3 sm:gap-5">
                      <p className="font-bold text-[#00A1B1] text-xs sm:text-sm uppercase tracking-wider font-sans">Visitor Breakdown</p>
                      <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#003A77] leading-tight">
                        Connecting You to Precision Manufacturing Decision-Makers
                      </h3>
                      <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-sans">
                        From manufacturing leaders and procurement specialists to quality managers, metrology engineers, R&amp;D professionals, and inspection experts, INDIAMET brings together the decision-makers shaping India’s precision manufacturing and quality ecosystem.
                      </p>
                    </div>
                    <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-6 bg-[#FCF8F3] border border-gray-100 p-4 sm:p-6 lg:p-8 rounded-sm font-sans">
                      <div className="flex w-fit flex-col">
                        <h3 className="mb-1 sm:mb-2 text-3xl sm:text-4xl md:text-5xl font-bold text-[#00A1B1] font-bebas">68%</h3>
                        <p className="text-xs sm:text-sm font-semibold uppercase text-[#003A77]">Industry Decision-Makers</p>
                      </div>
                      <div className="flex w-fit flex-col">
                        <h3 className="mb-1 sm:mb-2 text-3xl sm:text-4xl md:text-5xl font-bold text-[#00A1B1] font-bebas">72%</h3>
                        <p className="text-xs sm:text-sm font-semibold uppercase text-[#003A77]">Manufacturing &amp; Engineering Professionals</p>
                      </div>
                      <div className="flex w-fit flex-col">
                        <h3 className="mb-1 sm:mb-2 text-3xl sm:text-4xl md:text-5xl font-bold text-[#00A1B1] font-bebas">45%</h3>
                        <p className="text-xs sm:text-sm font-semibold uppercase text-[#003A77]">Procurement &amp; Purchase Influencers</p>
                      </div>
                      <div className="flex w-fit flex-col">
                        <h3 className="mb-1 sm:mb-2 text-3xl sm:text-4xl md:text-5xl font-bold text-[#00A1B1] font-bebas">30%</h3>
                        <p className="text-xs sm:text-sm font-semibold uppercase text-[#003A77]">Senior Management &amp; C-Level Executives</p>
                      </div>
                    </div>
                    <div className="mt-6 sm:mt-8">
                      <Link href="/exhibiting-enquiry" className="inline-block w-full sm:w-auto">
                        <button className="w-full sm:w-auto bg-[#00A1B1] hover:bg-[#003A77] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm text-center">
                          Enquire to Exhibit
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="order-first lg:order-last h-full lg:col-span-2">
                    <div className="h-[220px] sm:h-[350px] lg:h-full w-full overflow-hidden rounded-sm shadow-sm">
                      <img
                        src="/images/why_exhibit.webp"
                        alt="Visitors examining advanced sensing equipment at a busy trade show"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </div>

          {/* Download Brochure Section */}
          <div className="animated-block mt-10 sm:mt-16 lg:mt-20">
            <div className="animated-block-target">
              <div className="relative mx-auto overflow-hidden py-10 sm:py-16 lg:py-20 text-white">
                {/* BACKGROUND IMAGE */}
                <div className="absolute inset-0">
                  <img
                    src="/images/img_3_4b6edc76d1.webp"
                    alt="Precision manufacturing and measurement technology banner with CNC machine and caliper"
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-[#003A77]/60"></div>
                {/* CONTENT */}
                <Container className="relative z-10">
                  <div className="grid items-center gap-6 sm:gap-10 md:grid-cols-12 text-center md:text-left">
                    <div className="flex justify-center md:col-span-4">
                      <img
                        src="/images/indiamet_Brochure.webp"
                        alt="IndiaMET exhibition brochure featuring metrology technology and event details"
                        className="h-40 sm:h-52 lg:h-64 w-auto object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-3 sm:gap-5 md:col-span-8 items-center md:items-start">
                      <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                        Download Your Event Brochure
                      </h3>
                      <p className="max-w-[700px] text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed font-sans">
                        Make sure you grab your copy of the event brochure to learn more
                        about the show and explore your participation opportunities.
                      </p>
                      <Link href="/event-brochure" className="inline-block w-full sm:w-auto">
                        <button className="w-full sm:w-auto bg-[#00A1B1] hover:bg-white hover:text-[#003A77] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm text-center">
                          Download Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          </div>

          {/* Why India Section */}
          <div className="animated-block mt-10 sm:mt-16 lg:mt-20">
            <div className="animated-block-target">
              <Container>
                <h2 className="mb-6 sm:mb-10 font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#003A77] leading-tight">Why India?</h2>
                <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Rapid Growth in Precision Manufacturing",
                      desc: "India’s automotive, aerospace, defence, electronics, engineering, and industrial manufacturing sectors are rapidly adopting advanced technologies to achieve higher precision, productivity, and quality. This is driving strong demand for modern metrology, inspection, and measurement solutions.",
                      image: "/images/Precision.webp"
                    },
                    {
                      title: "Rise of Smart & Automated Manufacturing",
                      desc: "The shift toward Industry 4.0, automation, digital manufacturing, and data-driven quality management is transforming how manufacturers measure and control production. Advanced CMMs, 3D scanning, machine vision, sensors, and connected metrology systems are becoming increasingly important.",
                      image: "/images/business_team_global_business_planning_working_concept_4d7db7d78d.webp"
                    },
                    {
                      title: "Growing Focus on Quality & Global Standards",
                      desc: "Indian manufacturers are increasingly focused on achieving global quality standards, improving dimensional accuracy, reducing production errors, and strengthening traceability. This is creating new opportunities for calibration, testing, inspection, measurement software, and quality technologies.",
                      image: "/images/growing.webp"
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="relative flex min-h-[280px] sm:min-h-[350px] flex-col overflow-hidden text-white rounded-sm border border-white/10 shadow-sm">
                      <div className="absolute inset-0">
                        <img src={item.image} alt={getImageAlt(item.image, item.title)} className="h-full w-full object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-[#003A77]/60"></div>
                      <div className="relative z-10 flex h-full flex-col justify-end gap-2.5 sm:gap-4 p-4 sm:p-6 font-sans">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold leading-tight">{item.title}</h3>
                        <p className="text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed font-sans">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          </div>

          {/* Who Should Exhibit? Section */}
          <WhoShouldExhibitSection />

          {/* When and Where Section */}
          <div className="animated-block mt-10 sm:mt-16 lg:mt-20">
            <div className="animated-block-target">
              <Container className="text-[#003A77]">
                <h2 className="mb-6 sm:mb-8 font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#003A77] leading-tight">When and Where</h2>
                <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                  <div className="rounded-sm bg-[#FCF8F3] border border-gray-100 p-4 sm:p-6 font-sans">
                    <p className="mb-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#00A1B1]">Opening Hours</p>
                    <h4 className="text-sm sm:text-base md:text-lg font-bold text-gray-800">13, 14 May 2027: 10:00 - 18:00</h4>
                    <h4 className="mt-1 text-sm sm:text-base md:text-lg font-bold text-gray-800">15 May 2027: 10:00 - 18:00</h4>
                  </div>
                  <div className="rounded-sm bg-[#FCF8F3] border border-gray-100 p-4 sm:p-6 font-sans">
                    <p className="mb-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#00A1B1]">Venue</p>
                    <h4 className="text-sm sm:text-base md:text-lg font-bold text-gray-800">Auto Cluster Exhibition Center, Pune, India</h4>
                  </div>
                </div>
                <div className="mt-6 sm:mt-8 overflow-hidden rounded-sm border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps?q=Auto%20Cluster%20Exhibition%20Center%2C%20Pune&output=embed"
                    className="w-full h-[240px] sm:h-[320px] md:h-[400px] border-0"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </Container>
            </div>
          </div>

          <PartnersSection />

          {/* Quick Navigation Footer */}
          {/* <div className="animated-block mt-20">
            <div className="animated-block-target">
              <div className="border-t-8 border-[#00A1B1] bg-[#003A77] py-20 text-white">
                <Container>
                  <h2 className="font-bebas text-6xl md:text-7xl">Quick Navigation</h2>
                  <div className="mt-16 grid grid-cols-2 gap-y-10 md:grid-cols-5">
                    {quickLinks.map((item, idx) => (
                      <div key={idx} className="relative flex flex-col items-center justify-center text-center">
                        {idx !== 0 && (
                          <div className="absolute left-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-gray-700 md:block"></div>
                        )}
                        <Link href={item.link} className="flex flex-col items-center group">
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800 group-hover:bg-orange-600 transition-colors">
                            <div className="text-2xl">
                              {idx === 0 && "📋"}
                              {idx === 1 && "📄"}
                              {idx === 2 && "📊"}
                              {idx === 3 && "✈️"}
                              {idx === 4 && "ℹ️"}
                            </div>
                          </div>
                          <p className="mt-4 text-sm font-semibold text-gray-300 group-hover:text-orange-400 transition-colors">{item.label}</p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </Container>
              </div>
            </div>
          </div> */}

          {/* <hr className="border-t-6 border-[#00A1B1]" /> */}
        </div>
        <BackToTop />
      </div>

      <style jsx>{`
        .global-transition { transition: all 0.3s ease; }
        .flex-center { display: flex; align-items: center; justify-content: center; }
        .font-bebas { font-family: 'Bebas Neue', cursive; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}