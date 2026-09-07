"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import PartnersSection from "@/components/home/PartnersSection";
import SectorsSection from "@/components/home/SectorsSection";
import BackToTop from "@/components/layout/BackToTop";
import Container from "@/components/ui/container";

export default function WhyExhibitPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const sectors = [
    {
      title: "Raw Materials & Compounds",
      slug: "raw-materials-and-compounds",
      description: "Natural rubber, synthetic rubber, carbon black, silica, processing oils, and specialty chemicals.",
      image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
    },
    {
      title: "Tyre Manufacturing Machinery",
      slug: "tyre-manufacturing-machinery",
      description: "Banbury mixers, calenders, extruders, tyre building machines, curing presses, and finishing equipment.",
      image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
    },
    {
      title: "Rubber Processing Equipment",
      slug: "rubber-processing-equipment",
      description: "Two-roll mills, internal mixers, strainers, pelletizers, and rubber bale cutters.",
      image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
    },
    {
      title: "Tyre Testing & Quality Control",
      slug: "tyre-testing-and-quality-control",
      description: "Durability testers, uniformity machines, balance testers, X-ray inspection, and lab equipment.",
      image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
    },
    {
      title: "Retreading & Repair Materials",
      slug: "retreading-and-repair-materials",
      description: "Retreading equipment, tread rubber, repair patches, and vulcanizing materials.",
      image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
    },
    {
      title: "Recycling & Sustainability Solutions",
      slug: "recycling-and-sustainability-solutions",
      description: "Tyre recycling machinery, crumb rubber processing, and sustainable manufacturing solutions.",
      image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
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
    { label: "Enquire to Exhibit", link: "/exhibiting-enquiry", icon: "/icons/enquire.png" },
    { label: "Download Event Brochure", link: "/event-brochure", icon: "/icons/brochure.png" },
    { label: "Exhibitor List", link: "/exhibitor-list", icon: "/icons/list.png" },
    { label: "Plan Your Travel", link: "/plan-your-travel", icon: "/icons/travel.png" },
    { label: "Why Visit", link: "/why-visit", icon: "/icons/visit.png" }
  ];

  return (
    <div className="intro-animation">
      <div className="page-spacing-wrapper">
        <div className="pt-[120px] lg:pt-[140px]">

          {/* Powering Progress Section */}
          <div className="animated-block">
            <div className="animated-block-target">
              <Container>
                <div className="grid items-center gap-10 overflow-hidden lg:grid-cols-5 lg:gap-20">
                  <div className="lg:col-span-5">
                    <div className="flex flex-col gap-5">
                      <p className="font-bold text-[#CC9808]"><br /><br /> Your Gateway to Tyre Manufacturing Growth in ASEAN</p>
                      <h2 className="font-bebas text-6xl text-black md:text-7xl">Powering Progress in the Global Rubber & Tyre Industry</h2>
                      <p className="text-lg text-gray-700">
                        As the global tyre industry shifts toward sustainability, automation, and high-performance materials, Southeast Asia's tyre manufacturing sector is experiencing unprecedented growth. ITS Tyre Expo connects you directly with the region's leading tyre manufacturers, rubber processors, OEMs, and government agencies driving this transformation.
                      </p>
                    </div>
                    <div className="mt-10 flex flex-wrap gap-8 2xl:gap-16">
                      <div className="flex w-fit flex-col justify-center border-r border-gray-200 pr-8 font-bebas last-of-type:border-none 2xl:pr-16">
                        <h3 className="mb-3 text-5xl font-bold text-[#CC9808] md:text-6xl">10th</h3>
                        <p className="text-sm font-semibold tracking-wider uppercase text-black font-sans">Edition</p>
                      </div>
                      <div className="flex w-fit flex-col justify-center border-r border-gray-200 pr-8 font-bebas last-of-type:border-none 2xl:pr-16">
                        <h3 className="mb-3 text-5xl font-bold text-[#CC9808] md:text-6xl">8,500+</h3>
                        <p className="text-sm font-semibold tracking-wider uppercase text-black font-sans">Trade Visitors</p>
                      </div>
                      <div className="flex w-fit flex-col justify-center border-r border-gray-200 pr-8 font-bebas last-of-type:border-none 2xl:pr-16">
                        <h3 className="mb-3 text-5xl font-bold text-[#CC9808] md:text-6xl">350+</h3>
                        <p className="text-sm font-semibold tracking-wider uppercase text-black font-sans">Exhibitors</p>
                      </div>
                      <div className="flex w-fit flex-col justify-center font-bebas last-of-type:border-none lg:border-r lg:pr-8 2xl:pr-16">
                        <h3 className="mb-3 text-5xl font-bold text-[#CC9808] md:text-6xl">60+</h3>
                        <p className="text-sm font-semibold tracking-wider uppercase text-black font-sans">Conference Speakers</p>
                      </div>
                    </div>
                    <div className="mt-10">
                      <Link href="/about-its-tyre-expo">
                        <button className="bg-[#CC9808] hover:bg-black text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                          About ITS Tyre Expo
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
                  <h2 className="font-bebas text-6xl text-black md:text-7xl">Why Exhibit at ITS Tyre Expo</h2>
                  <p className="text-lg text-gray-700">
                    Exhibiting at ITS Tyre Expo puts you at the center of Southeast Asia's fastest-growing tyre manufacturing hub. Connect directly with over 8,500 professionals with real purchasing power, showcase your solutions to a USD 45 billion industry, and expand your network across 50+ countries. This is your chance to generate high-quality leads, forge valuable partnerships, and position your brand as a leader in the region's rapidly modernizing rubber and tyre sector.
                  </p>
                </div>
                <div className="my-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {[
                    {
                      title: "Struggling to find qualified buyers?",
                      desc: "Meet a verified audience where 68% of visitors hold purchasing power including tyre manufacturers, rubber processors, and industrial buyers actively sourcing new suppliers.",
                      icon: "https://cdn.itegroupnews.com/recruitment_12105214_9abca4ba0e.png"
                    },
                    {
                      title: "Facing challenges entering the ASEAN market?",
                      desc: "Gain direct access to the companies driving demand across passenger, truck, OTR, and specialty tyre segments throughout the region.",
                      icon: "https://cdn.itegroupnews.com/goal_2974630_407b28db91.png"
                    },
                    {
                      title: "Worried about standing out in a competitive market?",
                      desc: "Stand out by showcasing your innovative, sustainable, and high-performance solutions to buyers looking for trusted technologies.",
                      icon: "https://cdn.itegroupnews.com/marketing_14125861_0aab65a0a8.png"
                    },
                    {
                      title: "Looking for buyers ready to invest?",
                      desc: "Tap into ASEAN's USD 12 billion tyre manufacturing equipment market, where demand for automation, raw materials, and testing equipment is rapidly growing.",
                      icon: "https://cdn.itegroupnews.com/contract_10861184_2c90043b14.png"
                    }
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex flex-col gap-4 font-sans">
                      <div className="flex items-center justify-center h-16 w-16 rounded-sm bg-[#FCF8F3] border border-gray-100 shadow-sm">
                        <img src={benefit.icon} alt={benefit.title} className="h-8 w-8 object-contain" />
                      </div>
                      <h3 className="font-bebas text-2xl text-black mt-2 font-bold">{benefit.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
                <Link href="/exhibiting-enquiry">
                  <button className="bg-[#CC9808] hover:bg-black text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">Book A Stand</button>
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
                      <h3 className="font-bebas text-6xl text-black md:text-7xl">Connecting You to Global Tyre Industry Decision-Makers</h3>
                      <p className="text-lg text-gray-700">
                        From tyre manufacturing executives and procurement specialists to R&D engineers and distributors, our visitors are key players driving growth, innovation, and modernization across the ASEAN rubber industry.
                      </p>
                    </div>
                    <div className="mt-10 grid grid-cols-2 gap-6 bg-[#FCF8F3] border border-gray-100 p-8 rounded-sm font-sans">
                      <div className="flex w-fit flex-col">
                        <h3 className="mb-3 text-5xl font-bold text-[#CC9808] font-bebas">48%</h3>
                        <p className="text-sm font-semibold uppercase text-black">First Time Exhibitors</p>
                      </div>
                      <div className="flex w-fit flex-col">
                        <h3 className="mb-3 text-5xl font-bold text-[#CC9808] font-bebas">52%</h3>
                        <p className="text-sm font-semibold uppercase text-black">First Time Visitors</p>
                      </div>
                      <div className="flex w-fit flex-col">
                        <h3 className="mb-3 text-5xl font-bold text-[#CC9808] font-bebas">35%</h3>
                        <p className="text-sm font-semibold uppercase text-black">With Budgets Over $5 Million</p>
                      </div>
                      <div className="flex w-fit flex-col">
                        <h3 className="mb-3 text-5xl font-bold text-[#CC9808] font-bebas">28%</h3>
                        <p className="text-sm font-semibold uppercase text-black">C-Level Decision Makers</p>
                      </div>
                    </div>
                    <div className="mt-10">
                      <Link href="/exhibiting-enquiry">
                        <button className="bg-[#CC9808] hover:bg-black text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">Enquire to Exhibit</button>
                      </Link>
                    </div>
                  </div>
                  <div className="order-first h-full lg:col-span-2">
                    <div className="h-[300px] sm:h-[400px] lg:h-full w-full overflow-hidden rounded-sm">
                      <img
                        src="https://cdn.itegroupnews.com/mw24_1095_min_aaba01f5dd.jpg"
                        alt="Visitors"
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
                    src="https://cdn.itegroupnews.com/img_3_4b6edc76d1.jpg"
                    alt="Event Background"
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/60"></div>
                {/* CONTENT */}
                <Container className="relative z-10">
                  <div className="grid items-center gap-10 md:grid-cols-12">
                    <div className="flex justify-center md:col-span-4">
                      <img
                        src="https://cdn.itegroupnews.com/Sales_Brochure_84b3c56f9d.png"
                        alt="Brochure"
                        className="h-64 w-auto object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-5 md:col-span-8">
                      <h3 className="font-bebas text-6xl md:text-7xl leading-tight">
                        Download Your Event Brochure
                      </h3>
                      <p className="max-w-[700px] text-lg text-gray-200">
                        Make sure you grab your copy of the event brochure to learn more
                        about the show and explore your participation opportunities.
                      </p>
                      <Link href="/event-brochure">
                        <button className="bg-[#CC9808] hover:bg-white hover:text-black text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
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
                <h2 className="mb-10 font-bebas text-6xl text-black md:text-7xl">Why Southeast Asia?</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Rapid Tyre Manufacturing Expansion",
                      desc: "The CIS mining sector is undergoing rapid modernisation. Imports of earthmoving, crushing, and processing equipment have surged, driven by the need to upgrade ageing infrastructure and improve operational efficiency across mines and processing plants.",
                      image: "https://cdn.itegroupnews.com/wide_angle_shot_excavation_machines_lookout_jackerath_garzweiler_skywalk_germany_58dec187f5.jpg"
                    },
                    {
                      title: "Government Support for EV & Automotive",
                      desc: "Flagship projects such as Baimskaya (copper), Udokan (copper), and Sukhoi Log (gold) are driving multi-billion-dollar investments in extraction and processing capacity creating sustained demand for advanced machinery, automation, and logistics solutions.",
                      image: "https://cdn.itegroupnews.com/business_team_global_business_planning_working_concept_4d7db7d78d.jpg"
                    },
                    {
                      title: "Growing Demand for Sustainable Solutions",
                      desc: "Russia and CIS governments are increasing exploration spending to boost reserves of strategic minerals such as copper, lithium, and rare earths. The federal programme Geology: Revival of a Legend is being extended to 2030, supporting new deposits and advanced exploration technologies.",
                      image: "https://cdn.itegroupnews.com/view_heavy_machinery_used_construction_industry_a179c698c8.jpg"
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="relative flex min-h-[350px] flex-col overflow-hidden text-white rounded-sm border border-white/10">
                      <div className="absolute inset-0">
                        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-black/60"></div>
                      <div className="relative z-10 flex h-full flex-col justify-end gap-4 p-6 font-sans">
                        <h3 className="text-xl font-bold leading-tight">{item.title}</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="animated-block mt-20">
            <div className="animated-block-target">
              <Container>
                <div className="mb-10 flex justify-between max-lg:flex-col lg:items-end">
                  <div className="lg:basis-2/3">
                    <p className="font-bold text-[#CC9808]">Testimonials</p>
                    <h3 className="my-3 font-bebas text-6xl text-black md:text-7xl">Why the Industry Chooses ITS Tyre Expo</h3>
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    { name: "Somchai Wongsuwan", title: "VP of Manufacturing", company: "Bridgestone Thailand", quote: "ITS Tyre Expo provides unparalleled access to the ASEAN tyre manufacturing ecosystem. Over three days, we connected with key suppliers and signed three major contracts." },
                    { name: "Lisa Tan", title: "Regional Director", company: "Continental Tyres", quote: "We've exhibited for 5 consecutive years, and ITS remains our most valuable platform for launching new products and networking with industry leaders across Southeast Asia." },
                    { name: "Nguyen Van Hieu", title: "Procurement Manager", company: "Casumina", quote: "The quality of visitors and exhibitors is exceptional. We found new raw material suppliers and advanced testing equipment that significantly improved our production efficiency." }
                  ].map((testimonial, idx) => (
                    <div key={idx} className="relative flex h-full flex-col overflow-hidden rounded-sm bg-[#FCF8F3] border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 font-sans">
                      <div className="text-4xl mb-4 text-[#CC9808] font-serif">&ldquo;</div>
                      <p className="mb-auto text-sm italic text-gray-700 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                      <div className="mt-6 flex items-center gap-4 border-t border-gray-200 pt-5">
                        <div className="h-12 w-12 rounded-sm bg-gradient-to-br from-[#CC9808] to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-black">{testimonial.name}</h5>
                          <p className="text-xs text-gray-500 leading-tight mt-1">{testimonial.title}<br />{testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          </div>

          {/* When and Where Section */}
          <div className="animated-block mt-20">
            <div className="animated-block-target">
              <Container className="text-black">
                <h2 className="mb-10 font-bebas text-6xl md:text-7xl">When and Where</h2>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-sm bg-[#FCF8F3] border border-gray-100 p-6 font-sans">
                    <p className="mb-2 text-sm font-bold uppercase tracking-wider text-black">Opening Hours</p>
                    <h4 className="text-lg font-bold text-gray-800">22, 23 April 2026: 10:00 - 18:00</h4>
                    <h4 className="mt-2 text-lg font-bold text-gray-800">24 April 2026: 10:00 - 16:00</h4>
                  </div>
                  <div className="rounded-sm bg-[#FCF8F3] border border-gray-100 p-6 font-sans">
                    <p className="mb-2 text-sm font-bold uppercase tracking-wider text-black">Venue</p>
                    <h4 className="text-lg font-bold text-gray-800">Pavilion 1 & 2, Crocus Expo IEC, Moscow, Russia</h4>
                  </div>
                </div>
                <div className="mt-8 overflow-hidden rounded-sm border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps?q=Crocus%20Expo%20IEC%20Moscow&output=embed"
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
          <div className="animated-block mt-20">
            <div className="animated-block-target">
              <div className="border-t-8 border-[#CC9808] bg-black py-20 text-white">
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
          </div>

          <hr className="border-t-6 border-[#CC9808]" />
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