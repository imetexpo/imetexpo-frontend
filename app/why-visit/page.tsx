// app/why-visit/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/container";
import PartnersSection from "@/components/home/PartnersSection";
import SectorsSection from "@/components/home/SectorsSection";
import BackToTop from "@/components/layout/BackToTop";
import React from "react";

export default function WhyVisitPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-100 grid place-content-center bg-[#03193D]">
        <div className="flex size-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-[#CC9808] text-4xl">
          <div className="flex size-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-[#CC9808] text-2xl"></div>
        </div>
      </div>
    );
  }

  /*
   * INDIAMET 2027
   * India International Metrology, Measurement Technology & Equipment Exhibition
   */

  const stats = [
    { value: "5,000+", label: "Expected Visitors" },
    { value: "200+", label: "Expected Exhibitors" },
    { value: "15+", label: "Industry Segments" },
    { value: "25+", label: "Technology Categories" },
  ];

  const attendeeCategories = [
    {
      title: "Discover the Latest Metrology Technologies",
      description:
        "Explore advanced Coordinate Measuring Machines, optical and vision systems, 3D scanning, precision instruments, surface and form measurement, calibration equipment, sensors, probes, testing systems, and digital metrology solutions.",
      image:
        "https://cdn.itegroupnews.com/1_1f3ae141f5.png",
    },
    {
      title: "Meet India's Precision Manufacturing Decision-Makers",
      description:
        "Connect with quality heads, metrology professionals, inspection engineers, manufacturing leaders, plant managers, procurement teams, OEMs, Tier 1 and Tier 2 suppliers, and technical decision-makers responsible for measurement and quality solutions.",
      image:
        "https://cdn.itegroupnews.com/2_6ab692408b.png",
    },
    {
      title: "Compare Measurement & Inspection Solutions",
      description:
        "Evaluate technologies from leading solution providers, compare capabilities and specifications, discuss applications with experts, and identify the right metrology and inspection solutions for your manufacturing requirements.",
      image:
        "https://cdn.itegroupnews.com/3_3310ab1131.png",
    },
    {
      title: "Stay Ahead of Precision Manufacturing Trends",
      description:
        "Understand how digital metrology, automation, Industry 4.0, artificial intelligence, 3D measurement, connected quality systems, and data-driven inspection are transforming modern manufacturing.",
      image:
        "https://cdn.itegroupnews.com/4_2e07c29daf.png",
    },
  ];

  /*
   * These figures are positioning/marketing figures for the upcoming
   * first edition and should not be presented as historical attendance data.
   */
  const businessAreas = [
    {
      percentage: "35%",
      label: "Automotive & Auto Components",
    },
    {
      percentage: "25%",
      label: "Engineering & Precision Manufacturing",
    },
    {
      percentage: "20%",
      label: "Aerospace, Defence & Electronics",
    },
  ];

  const visitorIndustries = [
    "Automotive & Auto Components",
    "Aerospace & Defence",
    "Machine Tools & Engineering",
    "Precision Manufacturing",
    "Electronics & Electrical",
    "Medical & Pharmaceutical",
    "Energy & Power",
    "Research & Development",
    "Quality & Testing Laboratories",
    "Manufacturing & Industrial Automation",
  ];

  const supplierIndustries = [
    "CMM & Dimensional Measurement",
    "Optical & Vision Metrology",
    "3D Scanning & Digital Measurement",
    "Surface & Form Measurement",
    "Calibration & Reference Standards",
    "Precision Instruments & Gauges",
    "Sensors, Probes & Measurement Systems",
    "Testing & Inspection Equipment",
    "Metrology Software & Digital Quality",
    "Automation & Industry 4.0 Solutions",
  ];

  const beyondExhibition = [
    {
      title: "INDIAMET Summit",
      description:
        "Gain valuable insights from industry experts, technology leaders, quality professionals, and manufacturing specialists discussing the latest developments in metrology, measurement, inspection, calibration, digital quality, and precision manufacturing.",
      image:
        "https://cdn.itegroupnews.com/MW_24_2304_0004_FORUM_i_c9f88bc608.jpg",
      buttonText: "Explore Summit",
      buttonLink: "/indiamet-summit",
    },
    {
      title: "Global Metrology Excellence Awards",
      description:
        "Recognise outstanding achievements, innovations, technologies, and contributions that are advancing measurement science, quality engineering, inspection, calibration, and precision manufacturing.",
      image:
        "https://cdn.itegroupnews.com/QR_MW_eng_web_site_e73baacf2e.svg",
      buttonText: "View Awards",
      buttonLink: "/awards",
    },
    {
      title: "Connect with Industry Leaders",
      description:
        "Build valuable professional connections with manufacturers, technology providers, quality experts, engineers, OEMs, buyers, and decision-makers from India's growing precision manufacturing ecosystem.",
      image:
        "https://cdn.itegroupnews.com/QR_MW_eng_web_site_e73baacf2e.svg",
      buttonText: "Connect",
      buttonLink: "/connect",
    },
  ];

  const quickLinks = [
    {
      label: "Become an Exhibitor",
      link: "/exhibiting-enquiry",
      icon:
        "https://cdn.itegroupnews.com/Vector_1_440f5852b9.png",
    },
    {
      label: "Register as a Visitor",
      link: "/visitor-registration",
      icon:
        "https://cdn.itegroupnews.com/Vector_2_9be2b98909.png",
    },
    {
      label: "Download Event Brochure",
      link: "/event-brochure",
      icon:
        "https://cdn.itegroupnews.com/Group_e024d13500.png",
    },
    {
      label: "Plan Your Travel",
      link: "/plan-your-travel",
      icon:
        "https://cdn.itegroupnews.com/Vector_1_b2c1ab92d0.png",
    },
  ];

  return (
    <div className="intro-animation">
      <div className="page-spacing-wrapper">
        <div className="pt-[100px] sm:pt-[120px] lg:pt-0">

          {/* =========================================================
              HERO / HEART OF PRECISION MANUFACTURING
          ========================================================== */}

          <Container>
            <div className="animated-block">
              <div className="animated-block-target">
                <div className="w-full grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">

                  <div className="order-2 lg:order-1">
                    <br />
                    <br />

                    <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-[#03193D]">
                      The Heart of Precision Manufacturing
                    </h2>

                    <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-gray-700">
                      INDIAMET 2027 brings together the complete metrology,
                      measurement, inspection, calibration, and quality
                      ecosystem under one roof. Discover advanced technologies,
                      meet leading solution providers, and connect with the
                      professionals responsible for precision and quality
                      across India's manufacturing industries.
                    </p>

                    <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-between bg-[#FCF8F3] border border-gray-100 px-4 sm:px-6 py-6 sm:py-8 rounded-sm gap-4 sm:gap-0 font-sans">

                      {stats.map((stat, idx) => (
                        <React.Fragment key={idx}>

                          <div className="text-center flex-1 min-w-[80px]">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bebas text-[#CC9808] font-bold">
                              {stat.value}
                            </h3>

                            <p className="text-[10px] sm:text-xs tracking-wider text-[#03193D] font-semibold mt-1 uppercase">
                              {stat.label}
                            </p>
                          </div>

                          {idx < stats.length - 1 && (
                            <div className="hidden md:block h-12 w-px bg-gray-200"></div>
                          )}

                        </React.Fragment>
                      ))}

                    </div>

                    <div className="mt-8 sm:mt-10">
                      <Link
                        href="/visitor-registration"
                        className="inline-flex bg-[#CC9808] hover:bg-[#03193D] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm"
                      >
                        Register as a Visitor
                      </Link>
                    </div>
                  </div>

                  <div className="order-1 lg:order-2 relative h-[400px] sm:h-[500px] lg:h-[600px] w-full overflow-hidden rounded-lg">

                    <Image
                      src="https://cdn.itegroupnews.com/1_1f3ae141f5.png"
                      alt="Precision Metrology and Measurement Technology"
                      fill
                      className="object-cover"
                    />

                  </div>

                </div>
              </div>
            </div>
          </Container>


          {/* =========================================================
              METROLOGY NETWORK SECTION
          ========================================================== */}

          <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
            <div className="animated-block-target">

              <div className="relative mx-auto overflow-hidden py-12 sm:py-16 lg:py-20 text-white">

                <div className="absolute inset-0">
                  <img
                    src="https://miningworldexpo.com/imgs/shape-1.svg"
                    alt="INDIAMET background"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="absolute inset-0 bg-[#03193D]/80"></div>

                <Container>
                  <div className="relative z-10 flex flex-col gap-4 sm:gap-5">

                    <p className="text-sm sm:text-base font-bold text-[#CC9808]">
                      Connect with the Metrology & Quality Community
                    </p>

                    <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-white max-w-[1000px]">
                      Where Metrology Leaders, Technology Providers &
                      Manufacturing Experts Meet
                    </h3>

                    <Link
                      href="/exhibitor-list"
                      className="inline-flex w-fit bg-[#CC9808] hover:bg-white hover:text-[#03193D] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm"
                    >
                      Explore Exhibitors
                    </Link>

                  </div>
                </Container>

              </div>

            </div>
          </div>


          {/* =========================================================
              WHY VISIT / ATTENDEE BENEFITS
          ========================================================== */}

          <Container>

            <div className="mt-12 sm:mt-16 lg:mt-20 space-y-12 sm:space-y-16 lg:space-y-20">

              {attendeeCategories.map((item, idx) => {

                const isReverse = idx % 2 !== 0;

                return (
                  <div key={idx} className="animated-block">

                    <div className="animated-block-target">

                      <div className="grid items-stretch gap-6 sm:gap-8 lg:grid-cols-2">

                        <div
                          className={`flex flex-col justify-center bg-[#FCF8F3] border border-gray-100 p-6 sm:p-8 lg:p-10 rounded-sm shadow-sm ${
                            isReverse
                              ? "lg:order-2"
                              : "lg:order-1"
                          }`}
                        >

                          <h4 className="font-bebas text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#03193D] leading-tight">
                            {item.title}
                          </h4>

                          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-700 leading-relaxed font-sans max-w-[600px]">
                            {item.description}
                          </p>

                        </div>

                        <div
                          className={`relative h-[300px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-sm ${
                            isReverse
                              ? "lg:order-1"
                              : "lg:order-2"
                          }`}
                        >

                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />

                        </div>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </Container>


          {/* =========================================================
              DOWNLOAD BROCHURE
          ========================================================== */}

          <div className="animated-block mt-12 sm:mt-16 lg:mt-20">

            <div className="animated-block-target">

              <div className="relative mx-auto overflow-hidden py-12 sm:py-16 lg:py-20 text-white">

                <div className="absolute inset-0">

                  <img
                    src="https://cdn.itegroupnews.com/img_3_4b6edc76d1.jpg"
                    alt="INDIAMET Exhibition"
                    className="h-full w-full object-cover"
                  />

                </div>

                <div className="absolute inset-0 bg-[#03193D]/75"></div>

                <Container>

                  <div className="relative z-10 grid items-center gap-8 sm:gap-10 md:grid-cols-12">

                    <div className="flex justify-center md:col-span-4">

                      <img
                        src="https://cdn.itegroupnews.com/Sales_Brochure_84b3c56f9d.png"
                        alt="INDIAMET Event Brochure"
                        className="h-48 sm:h-56 lg:h-64 w-auto object-contain"
                      />

                    </div>

                    <div className="flex flex-col gap-4 sm:gap-5 md:col-span-8">

                      <h3 className="font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                        Discover INDIAMET 2027
                      </h3>

                      <p className="max-w-[700px] text-base sm:text-lg text-gray-200 leading-relaxed">
                        Download the INDIAMET 2027 event brochure to explore
                        the exhibition profile, technology sectors, visitor
                        profile, exhibiting opportunities, summit programme,
                        and participation benefits.
                      </p>

                      <Link
                        href="/event-brochure"
                        className="inline-flex w-fit bg-[#CC9808] hover:bg-white hover:text-[#03193D] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm"
                      >
                        Download Brochure
                      </Link>

                    </div>

                  </div>

                </Container>

              </div>

            </div>

          </div>


          {/* =========================================================
              BUSINESS AREAS
          ========================================================== */}

          <Container>

            <div className="animated-block mt-12 sm:mt-16 lg:mt-20">

              <div className="animated-block-target">

                <div className="w-full grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">

                  <div className="order-2 lg:order-1">

                    <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-[#03193D]">
                      Meet Professionals Across India's Precision Manufacturing Ecosystem
                    </h3>

                    <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-gray-700">
                      INDIAMET attracts professionals from across India's
                      manufacturing and engineering ecosystem. Meet
                      decision-makers and technical specialists looking for
                      advanced measurement, inspection, calibration, testing,
                      automation, and digital quality solutions.
                    </p>

                    <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-between bg-[#FCF8F3] border border-gray-100 px-4 sm:px-6 py-6 sm:py-8 rounded-sm gap-4 sm:gap-0 font-sans">

                      {businessAreas.map((area, idx) => (

                        <React.Fragment key={idx}>

                          <div className="text-center flex-1 min-w-[80px]">

                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bebas text-[#CC9808] font-bold">
                              {area.percentage}
                            </h3>

                            <p className="text-[10px] sm:text-xs tracking-wider text-[#03193D] font-semibold mt-1 uppercase">
                              {area.label}
                            </p>

                          </div>

                          {idx < businessAreas.length - 1 && (
                            <div className="hidden md:block h-12 w-px bg-gray-200"></div>
                          )}

                        </React.Fragment>

                      ))}

                    </div>

                    <div className="mt-8 sm:mt-10">

                      <Link
                        href="/post-show-report"
                        className="inline-flex bg-[#CC9808] hover:bg-[#03193D] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm"
                      >
                        View Industry Insights
                      </Link>

                    </div>

                  </div>

                  <div className="order-1 lg:order-2 relative h-[400px] sm:h-[500px] lg:h-[600px] w-full overflow-hidden rounded-lg">

                    <Image
                      src="https://cdn.itegroupnews.com/Untitled_design_11_c8dee1a839.png"
                      alt="Precision Manufacturing Business Areas"
                      fill
                      className="object-cover"
                    />

                  </div>

                </div>

              </div>

            </div>

          </Container>


          {/* =========================================================
              WHO SHOULD VISIT
          ========================================================== */}

          <Container>

            <div className="animated-block mt-12 sm:mt-16 lg:mt-20">

              <div className="animated-block-target">

                <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#03193D]">
                  Who Should Visit INDIAMET 2027?
                </h3>

                <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 md:grid-cols-2">

                  {/* Visitor Industries */}

                  <div className="relative min-h-[350px] sm:min-h-[400px] overflow-hidden rounded-sm border border-white/10">

                    <img
                      src="https://cdn.itegroupnews.com/img_3_4b6edc76d1.jpg"
                      alt="Industries and Manufacturing Professionals"
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-[#03193D]/80"></div>

                    <div className="relative z-10 p-6 sm:p-8">

                      <h4 className="font-bebas text-2xl sm:text-3xl md:text-4xl text-white mb-6">
                        Industries & Manufacturing Professionals
                      </h4>

                      <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-100 font-sans">

                        {visitorIndustries.map((industry, idx) => (

                          <li
                            key={idx}
                            className="flex items-start gap-3"
                          >
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#CC9808]"></span>

                            <span>{industry}</span>
                          </li>

                        ))}

                      </ul>

                    </div>

                  </div>


                  {/* Technology Requirements */}

                  <div className="relative min-h-[350px] sm:min-h-[400px] overflow-hidden rounded-sm border border-white/10">

                    <img
                      src="https://cdn.itegroupnews.com/img_3_4b6edc76d1.jpg"
                      alt="Metrology Technology Solutions"
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-[#03193D]/80"></div>

                    <div className="relative z-10 p-6 sm:p-8">

                      <h4 className="font-bebas text-2xl sm:text-3xl md:text-4xl text-white mb-6">
                        Technology & Solution Requirements
                      </h4>

                      <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-100 font-sans">

                        {supplierIndustries.map((industry, idx) => (

                          <li
                            key={idx}
                            className="flex items-start gap-3"
                          >

                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#CC9808]"></span>

                            <span>{industry}</span>

                          </li>

                        ))}

                      </ul>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </Container>


          {/* =========================================================
              EVENT SECTORS
          ========================================================== */}

          <SectorsSection />


          {/* =========================================================
              MORE THAN AN EXHIBITION
          ========================================================== */}

          <Container>

            <div className="animated-block mt-12 sm:mt-16 lg:mt-20">

              <div className="animated-block-target">

                <div className="mb-6 sm:mb-8 flex flex-col lg:flex-row justify-between lg:items-end gap-4">

                  <div className="lg:basis-2/3">

                    <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#03193D]">
                      More Than an Exhibition
                    </h3>

                    <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
                      INDIAMET 2027 combines technology discovery, knowledge
                      exchange, professional networking, and industry
                      recognition to create a complete platform for the
                      metrology and precision manufacturing community.
                    </p>

                  </div>

                </div>


                <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">

                  {beyondExhibition.map((item, idx) => (

                    <div
                      key={idx}
                      className="group flex flex-col overflow-hidden rounded-sm bg-[#FCF8F3] border border-gray-100 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg"
                    >

                      <div className="relative h-48 sm:h-56 w-full overflow-hidden">

                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-[#03193D]/30 group-hover:bg-[#03193D]/50 transition"></div>

                      </div>

                      <div className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-5 font-sans">

                        <h4 className="text-lg sm:text-xl font-bold text-[#03193D]">
                          {item.title}
                        </h4>

                        <p className="text-sm text-gray-600 line-clamp-4 leading-relaxed">
                          {item.description}
                        </p>

                        <Link
                          href={item.buttonLink}
                          className="inline-flex w-fit bg-[#CC9808] hover:bg-[#03193D] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm"
                        >
                          {item.buttonText}
                        </Link>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </Container>


          {/* =========================================================
              WHEN & WHERE
          ========================================================== */}

          <Container>

            <div className="animated-block mt-12 sm:mt-16 lg:mt-20">

              <div className="animated-block-target">

                <div className="w-full flex flex-col text-[#03193D]">

                  <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#03193D]">
                    When and Where
                  </h3>

                  <div className="mt-4 sm:mt-5 grid gap-5 sm:gap-6 lg:grid-cols-2 font-sans">

                    <div className="rounded-sm bg-[#FCF8F3] border border-gray-100 p-5 sm:p-6 shadow-sm">

                      <p className="mb-2 font-bold text-sm sm:text-base text-[#03193D]">
                        Venue
                      </p>

                      <h4 className="text-lg sm:text-xl font-bold text-gray-800">
                        Auto Cluster Exhibition Center, Pune
                      </h4>

                      <p className="mt-2 text-sm text-gray-600">
                        Chinchwad, Pune, Maharashtra, India
                      </p>

                    </div>


                    <div className="rounded-sm bg-[#FCF8F3] border border-gray-100 p-5 sm:p-6 shadow-sm">

                      <p className="mb-2 font-bold text-sm sm:text-base text-[#03193D]">
                        Exhibition Dates
                      </p>

                      <h4 className="text-lg sm:text-xl font-bold text-gray-800">
                        22–24 April 2027
                      </h4>

                      <p className="mt-2 text-sm text-gray-600">
                        10:00 AM – 6:00 PM
                      </p>

                    </div>

                  </div>


                  <div className="mt-6 sm:mt-8 overflow-hidden rounded-sm border border-gray-200">

                    <iframe
                      src="https://www.google.com/maps?q=Auto+Cluster+Exhibition+Center%2C+Chinchwad%2C+Pune&output=embed"
                      className="w-full h-[300px] sm:h-[350px] md:h-[400px] border-0"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>

                  </div>

                </div>

              </div>

            </div>

          </Container>


          {/* =========================================================
              QUICK NAVIGATION
          ========================================================== */}

          <div className="animated-block mt-12 sm:mt-16 lg:mt-20">

            <div className="animated-block-target">

              <div className="border-t-8 border-[#CC9808] bg-[#03193D] py-12 sm:py-16 lg:py-20 text-white">

                <Container>

                  <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                    Plan Your INDIAMET Visit
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm sm:text-base text-gray-300 font-sans">
                    Everything you need to discover INDIAMET 2027, connect
                    with exhibitors, register for the exhibition, and plan
                    your visit to Pune.
                  </p>


                  <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-y-8 sm:gap-y-10 gap-x-4">

                    {quickLinks.map((item, idx) => (

                      <div
                        key={idx}
                        className="relative flex flex-col items-center justify-center text-center"
                      >

                        <Link
                          href={item.link}
                          className="flex flex-col items-center group"
                        >

                          <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gray-800 overflow-hidden transition-transform group-hover:scale-110">

                            <Image
                              src={item.icon}
                              alt={item.label}
                              width={28}
                              height={28}
                              className="object-contain sm:w-8 sm:h-8"
                            />

                          </div>

                          <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-semibold text-gray-300 group-hover:text-white transition">
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


          {/* =========================================================
              PARTNERS
          ========================================================== */}

          <PartnersSection />

          <BackToTop />

        </div>
      </div>


      {/* =========================================================
          PAGE STYLES
      ========================================================== */}

      <style jsx>{`

        .global-transition {
          transition: all 0.3s ease;
        }

        .flex-center {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .font-bebas {
          font-family: "Bebas Neue", cursive;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

      `}</style>

    </div>
  );
}