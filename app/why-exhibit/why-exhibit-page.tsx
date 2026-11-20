"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import PartnersSection from "@/components/home/PartnersSection";
import SectorsSection from "@/components/home/SectorsSection";
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
    <div className="intro-animation">
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
              <Container className="py-12 sm:py-16">
                <div className="grid items-center gap-10 overflow-hidden lg:grid-cols-5 lg:gap-20">
                  <div className="lg:col-span-5">
                    <div className="flex flex-col gap-5">
                      <p className="font-bold text-[#00A1B1]">Your Gateway to Precision Manufacturing Growth in India</p>
                      <h2 className="font-bebas text-6xl text-[#003A77] md:text-7xl">Powering the Future of Metrology, Measurement & Quality</h2>
                      <p className="text-lg sm:text-xl text-gray-700">
                       As manufacturing moves toward greater precision, automation, digitalisation, and quality excellence, 
                       India’s metrology and measurement industry is entering a new era of growth. INDIAMET connects you with 
                       leading manufacturers, technology providers, quality professionals, engineers, OEMs, and decision-makers 
                       shaping the future of precision manufacturing.
                        </p>
                        <p className="text-lg sm:text-xl text-gray-700"> Discover advanced metrology and inspection technologies, build valuable business connections, and unlock new opportunities across India’s rapidly evolving manufacturing ecosystem.           </p>
                    </div>
                    <div className="mt-10 flex flex-wrap gap-8 2xl:gap-16">
                      <div className="flex w-fit flex-col justify-center border-r border-gray-200 pr-8 font-bebas last-of-type:border-none 2xl:pr-16">
                        <h3 className="mb-3 text-5xl font-bold text-[#00A1B1] md:text-6xl">1st</h3>
                        <p className="text-sm font-semibold tracking-wider uppercase text-[#003A77] font-sans">Edition</p>
                      </div>
                      <div className="flex w-fit flex-col justify-center border-r border-gray-200 pr-8 font-bebas last-of-type:border-none 2xl:pr-16">
                        <h3 className="mb-3 text-5xl font-bold text-[#00A1B1] md:text-6xl">10,000+</h3>
                        <p className="text-sm font-semibold tracking-wider uppercase text-[#003A77] font-sans">Trade Visitors</p>
                      </div>
                      <div className="flex w-fit flex-col justify-center border-r border-gray-200 pr-8 font-bebas last-of-type:border-none 2xl:pr-16">
                        <h3 className="mb-3 text-5xl font-bold text-[#00A1B1] md:text-6xl">150+</h3>
                        <p className="text-sm font-semibold tracking-wider uppercase text-[#003A77] font-sans">Exhibitors</p>
                      </div>
                      <div className="flex w-fit flex-col justify-center font-bebas last-of-type:border-none lg:border-r lg:pr-8 2xl:pr-16">
                        <h3 className="mb-3 text-5xl font-bold text-[#00A1B1] md:text-6xl">50+</h3>
                        <p className="text-sm font-semibold tracking-wider uppercase text-[#003A77] font-sans">Conference Speakers</p>
                      </div>
                    </div>
                    <div className="mt-10">
                      <Link href="/about">
                        <button className="bg-[#00A1B1] hover:bg-[#003A77] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
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
          <div className="animated-block mt-20">
            <div className="animated-block-target">
              <Container>
                <div className="grid gap-5">
                  <h2 className="font-bebas text-6xl text-[#003A77] md:text-7xl">Why Exhibit at INDIAMET Expo 2027</h2>
                  <p className="text-lg sm:text-xl text-gray-700">
                    Exhibiting at INDIAMET Expo puts you at the center of India's fastest-growing metrology, precision measurement, and quality assurance hub. Connect directly with over 10,000 professionals with real purchasing power, showcase your solutions to high-growth automotive, aerospace, defence, and precision manufacturing sectors, and expand your market reach. This is your prime opportunity to generate high-quality sales leads, forge valuable OEM partnerships, and position your brand as a technology leader.
                  </p>
                </div>
                <div className="my-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                      desc: "Connect with companies investing in advanced measurement, inspection, automation, digital quality, and Industry 4.0 technologies — and turn technology demonstrations into qualified business opportunities.ng.",
                      icon: "/images/contract_10861184_2c90043b14.webp"
                    }
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex flex-col gap-4 font-sans">
                      <div className="flex items-center justify-center h-16 w-16 rounded-sm bg-[#FCF8F3] border border-gray-100 shadow-sm">
                        <img src={benefit.icon} alt="" className="h-8 w-8 object-contain" />
                      </div>
                      <h3 className="font-bebas text-2xl text-[#003A77] mt-2 font-bold">{benefit.title}</h3>
                      <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
                <Link href="/exhibiting-enquiry">
                  <button className="bg-[#00A1B1] hover:bg-[#003A77] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">Book A Stand</button>
                </Link>
              </Container>
            </div>
          </div>

          <SectorsSection />

          {/* Visitor Breakdown Section */}
          <div className="animated-block mt-20">
            <div className="animated-block-target">
              <Container>
                <div className="grid items-center gap-10 overflow-hidden lg:grid-cols-5 lg:gap-20">
                  <div className="lg:col-span-3">
                    <div className="flex flex-col gap-5">
                      <p className="font-bold text-orange-600">Visitor Breakdown</p>
                      <h3 className="font-bebas text-6xl text-[#003A77] md:text-7xl">Connecting You to Precision Manufacturing Decision-Makers</h3>
                      <p className="text-lg sm:text-xl text-gray-700">
                        From manufacturing leaders and procurement specialists to quality managers, metrology engineers, R&D professionals, and inspection experts, INDIAMET brings together the decision-makers shaping India’s precision manufacturing and quality ecosystem.
                      </p>
                    </div>
                    <div className="mt-10 grid grid-cols-2 gap-6 bg-[#FCF8F3] border border-gray-100 p-8 rounded-sm font-sans">
                      <div className="flex w-fit flex-col">
                        <h3 className="mb-3 text-5xl font-bold text-[#00A1B1] font-bebas">68%</h3>
                        <p className="text-sm font-semibold uppercase text-[#003A77]">Industry Decision-Makers</p>
                      </div>
                      <div className="flex w-fit flex-col">
                        <h3 className="mb-3 text-5xl font-bold text-[#00A1B1] font-bebas">72%</h3>
                        <p className="text-sm font-semibold uppercase text-[#003A77]">Manufacturing & Engineering Professionals</p>
                      </div>
                      <div className="flex w-fit flex-col">
                        <h3 className="mb-3 text-5xl font-bold text-[#00A1B1] font-bebas">45%</h3>
                        <p className="text-sm font-semibold uppercase text-[#003A77]">Procurement & Purchase Influencers</p>
                      </div>
                      <div className="flex w-fit flex-col">
                        <h3 className="mb-3 text-5xl font-bold text-[#00A1B1] font-bebas">30%</h3>
                        <p className="text-sm font-semibold uppercase text-[#003A77]">Senior Management & C-Level Executives</p>
                      </div>
                    </div>
                    <div className="mt-10">
                      <Link href="/exhibiting-enquiry">
                        <button className="bg-[#00A1B1] hover:bg-[#003A77] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">Enquire to Exhibit</button>
                      </Link>
                    </div>
                  </div>
                  <div className="order-first h-full lg:col-span-2">
                    <div className="h-[300px] sm:h-[400px] lg:h-full w-full overflow-hidden rounded-sm">
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
          <div className="animated-block mt-20">
            <div className="animated-block-target">
              <div className="relative mx-auto overflow-hidden py-20 text-white">
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
                  <div className="grid items-center gap-10 md:grid-cols-12">
                    <div className="flex justify-center md:col-span-4">
                      <img
                        src="/images/indiamet_Brochure.webp"
                        alt="IndiaMET exhibition brochure featuring metrology technology and event details"
                        className="h-64 w-auto object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-5 md:col-span-8">
                      <h3 className="font-bebas text-6xl md:text-7xl leading-tight">
                        Download Your Event Brochure
                      </h3>
                      <p className="max-w-[700px] text-lg sm:text-xl text-gray-200">
                        Make sure you grab your copy of the event brochure to learn more
                        about the show and explore your participation opportunities.
                      </p>
                      <Link href="/event-brochure">
                        <button className="bg-[#00A1B1] hover:bg-white hover:text-[#003A77] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                          Download Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          </div>

          {/* Why ASEAN Section */}
          <div className="animated-block mt-20">
            <div className="animated-block-target">
              <Container>
                <h2 className="mb-10 font-bebas text-6xl text-[#003A77] md:text-7xl">Why India?</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Rapid Growth in Precision Manufacturing",
                      desc: "India’s automotive, aerospace, defence, electronics, engineering, and industrial manufacturing sectors are rapidly adopting advanced technologies to achieve higher precision, productivity, and quality. This is driving strong demand for modern metrology, inspection, and measurement solutions..",
                      image: "/images/wide_angle_shot_excavation_machines_lookout_jackerath_garzweiler_skywalk_germany_58dec187f5.webp"
                    },
                    {
                      title: "Rise of Smart & Automated Manufacturing",
                      desc: "The shift toward Industry 4.0, automation, digital manufacturing, and data-driven quality management is transforming how manufacturers measure and control production. Advanced CMMs, 3D scanning, machine vision, sensors, and connected metrology systems are becoming increasingly important.",
                      image: "/images/business_team_global_business_planning_working_concept_4d7db7d78d.webp"
                    },
                    {
                      title: "Growing Focus on Quality & Global Standards",
                      desc: "Indian manufacturers are increasingly focused on achieving global quality standards, improving dimensional accuracy, reducing production errors, and strengthening traceability. This is creating new opportunities for calibration, testing, inspection, measurement software, and quality technologies.",
                      image: "/images/view_heavy_machinery_used_construction_industry_a179c698c8.webp"
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="relative flex min-h-[350px] flex-col overflow-hidden text-white rounded-sm border border-white/10">
                      <div className="absolute inset-0">
                        <img src={item.image} alt={getImageAlt(item.image, item.title)} className="h-full w-full object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-[#003A77]/60"></div>
                      <div className="relative z-10 flex h-full flex-col justify-end gap-4 p-6 font-sans">
                        <h3 className="text-xl font-bold leading-tight">{item.title}</h3>
                        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          </div>

          {/* Testimonials Section */}
          {/* <div className="animated-block mt-20">
            <div className="animated-block-target">
              <Container>
                <div className="mb-10 flex justify-between max-lg:flex-col lg:items-end">
                  <div className="lg:basis-2/3">
                    <p className="font-bold text-[#00A1B1]">Testimonials</p>
                    <h3 className="my-3 font-bebas text-6xl text-[#003A77] md:text-7xl">Why the Industry Chooses INDIAMET Expo</h3>
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    { name: "Rajesh Kulkarni", title: "VP of Quality Assurance", company: "Precision Auto Components", quote: "INDIAMET Expo provides unparalleled access to India's precision manufacturing ecosystem. Over three days, we connected with key tier-1 suppliers and secured high-value contracts." },
                    { name: "Vikram Sharma", title: "Managing Director", company: "Metrology Systems India", quote: "We've exhibited consistently, and IndiaMET remains our most valuable platform for launching new CMMs and 3D optical scanning solutions across western and northern India." },
                    { name: "Anita Rao", title: "Head of Procurement", company: "Aerospace Precision Tools", quote: "The quality of visitors and metrology equipment showcased is exceptional. We connected with advanced calibration providers that significantly elevated our inspection capabilities." }
                  ].map((testimonial, idx) => (
                    <div key={idx} className="relative flex h-full flex-col overflow-hidden rounded-sm bg-[#FCF8F3] border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 font-sans">
                      <div className="text-4xl mb-4 text-[#00A1B1] font-serif">&ldquo;</div>
                      <p className="mb-auto text-lg sm:text-xl italic text-gray-700 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                      <div className="mt-6 flex items-center gap-4 border-t border-gray-200 pt-5">
                        <div className="h-12 w-12 rounded-sm bg-gradient-to-br from-[#00A1B1] to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-[#003A77]">{testimonial.name}</h5>
                          <p className="text-xs text-gray-500 leading-tight mt-1">{testimonial.title}<br />{testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          </div> */}

          {/* When and Where Section */}
          <div className="animated-block mt-20">
            <div className="animated-block-target">
              <Container className="text-[#003A77]">
                <h2 className="mb-10 font-bebas text-6xl md:text-7xl">When and Where</h2>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-sm bg-[#FCF8F3] border border-gray-100 p-6 font-sans">
                    <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#003A77]">Opening Hours</p>
                    <h4 className="text-lg font-bold text-gray-800">13, 14 May 2027: 10:00 - 18:00</h4>
                    <h4 className="mt-2 text-lg font-bold text-gray-800">15 May  2027: 10:00 - 16:00</h4>
                  </div>
                  <div className="rounded-sm bg-[#FCF8F3] border border-gray-100 p-6 font-sans">
                    <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#003A77]">Venue</p>
                    <h4 className="text-lg font-bold text-gray-800">Auto Cluster Exhibition Center, Pune, India</h4>
                  </div>
                </div>
                <div className="mt-8 overflow-hidden rounded-sm border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps?q=Auto%20Cluster%20Exhibition%20Center%2C%20Pune&output=embed"
                    className="w-full h-[400px] border-0"
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