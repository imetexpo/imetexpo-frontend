// app/about/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PartnersSection from "@/components/home/PartnersSection";
import SectorsSection from "@/components/home/SectorsSection";
import BackToTop from "@/components/layout/BackToTop";
import Container from "@/components/ui/container";

export default function AboutPage() {
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

  const ecosystemItems = [
    {
      title: "The Exhibition",
      description: "At the heart of the INDIAMET ecosystem is the international exhibition dedicated to metrology, measurement technology, inspection, calibration, and quality engineering. It brings together the complete spectrum of the precision manufacturing and quality industry, offering a high-impact platform to:",
      points: [
        "Build direct, face-to-face business connections with industry leaders and decision-makers.",
        "Showcase advanced metrology, measurement, inspection, and calibration technologies.",
        "Meet manufacturers, engineers, quality professionals, procurement leaders, and industry specialists from across India and global markets."
      ],
      buttonText: "Why Exhibit",
      buttonLink: "/why-exhibit"
    },
    {
  title: "INDIAMET Summit",

  description: "Throughout the exhibition and beyond, INDIAMET brings together industry leaders, technology experts, and manufacturing professionals through conferences, forums, and focused summit sessions. These programmes are designed to explore the latest developments in metrology, measurement technology, inspection, quality, and precision manufacturing.",

  points: [
    "Gain insights from leading metrology experts, manufacturing leaders, and technology innovators.",
    "Discuss emerging technologies, industry challenges, standards, and best practices in measurement and quality.",
    "Participate in focused sessions covering CMMs, 3D measurement, vision inspection, calibration, automation, and Industry 4.0."
  ],

  buttonText: "Explore Summit",
  buttonLink: "/conference-programme"
},

{
  title: "INDIAMET Connect",

  description: "INDIAMET Connect is the digital layer of the INDIAMET ecosystem — an online platform designed to keep industry professionals connected before, during, and after the exhibition. Through Connect, participants can:",

  points: [
    "Connect with manufacturers, buyers, suppliers, and metrology professionals throughout the year.",
    "Access industry insights, technology updates, expert content, and exhibitor information.",
    "Discover new business opportunities, connect with exhibitors, and follow up with potential partners online."
  ],

  buttonText: "Explore Connect",
  buttonLink: "/connect"
}
  ];

  const keyEvents = [
    { title: "Conference Programme", description: "INDIAMET brings together industry leaders, metrology experts, manufacturing professionals, and technical specialists through a comprehensive conference programme featuring industry forums, expert presentations, panel discussions, and technical sessions. The programme explores emerging technologies, industry challenges, standards, and the latest trends shaping metrology, measurement, inspection, calibration, and precision manufacturing.", image: "https://cdn.itegroupnews.com/MW_24_2304_0005_G_i_1_0c28de356a.jpg", buttonText: "Learn More", buttonLink: "/conference-programme" }, { title: "INDIAMET Connect", description: "INDIAMET Connect is the exhibition's dedicated business networking platform, designed to connect exhibitors, visitors, manufacturers, quality professionals, metrology experts, media, professional associations, and industry leaders. The platform helps participants discover new technologies, build valuable business relationships, and explore new business opportunities.", image: "https://cdn.itegroupnews.com/Untitled_400_x_490_px_400_x_250_px_13b6d04f0b.png", buttonText: "Join Now", buttonLink: "/connect" }, { title: "Global Metrology Excellence Awards", description: "The Global Metrology Excellence Awards (GMEA) recognise outstanding achievements and innovation in metrology, measurement technology, inspection, calibration, quality engineering, and precision manufacturing. The awards celebrate organisations and professionals developing advanced solutions that improve accuracy, productivity, quality, and manufacturing performance.", image: "https://cdn.itegroupnews.com/mw2022_gi_5d2b509b31.jpg", buttonText: "Learn More", buttonLink: "/awards" }
  ];

  const quickLinks = [
    { label: "Enquire to Exhibit", link: "/exhibiting-enquiry", icon: "/images/Vector_1_440f5852b9.png" },
    { label: "Download Event Brochure", link: "/event-brochure", icon: "/images/Group_e024d13500.png" },
    { label: "Exhibitor List", link: "/exhibition-directory", icon: "/images/Vector_ceea3d1488.png" },
    { label: "Plan Your Travel", link: "/plan-your-travel", icon: "/images/Vector_1_b2c1ab92d0.png" },
    { label: "Why Visit", link: "/why-visit", icon: "/images/Vector_2_9be2b98909.png" }
  ];

  return (
    <div className="intro-animation min-h-screen bg-white">
      <div className="page-spacing-wrapper">
        <div className="pt-[120px] lg:pt-[140px]">

          {/* PAGE HEADER BANNER (Black section matching screenshot 4) */}
          <div className="bg-[#03193D] text-white py-12 sm:py-16 md:py-20 border-b border-neutral-900">
            <Container>
              <div className="flex flex-col gap-2.5 max-w-4xl">
                <h1 className="font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-none tracking-tight">
                  ABOUT <span className="text-[#CC9808]">INDIAMET EXPO</span>
                </h1>
                <p className="font-sans text-sm sm:text-base md:text-lg text-neutral-450 mt-1 max-w-3xl leading-relaxed">
                  From Measurement to Manufacturing: Powering the Future of Precision & Quality
                </p>
              </div>
            </Container>
          </div>

          {/* Transforming Tyre Operations Section */}
          <Container className="py-12 sm:py-16 lg:py-20">
            <div className="w-full grid items-start gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
  
              {/* LEFT IMAGE - Responsive cover-fit matching screenshot 4 */}
              <div className="w-full h-64 sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-sm overflow-hidden shadow-sm relative">
                <img
                  src="/images/image1.png"
                  alt="expo excavator"
                  className="w-full h-full object-cover"
                />
              </div>
  
              {/* RIGHT CONTENT */}
              <div className="flex flex-col justify-center">
                <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-[#03193D]">
                  Transforming Precision Manufacturing <br className="hidden sm:block" /> Through Metrology
                </h2>
  
                <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-gray-700">
                INDIAMET is India’s international exhibition for metrology, measurement technology, 
                inspection, calibration, and quality engineering, bringing together the technologies 
                and solutions driving the future of precision manufacturing.
                  <br /><br />
                  The exhibition connects leading Indian and global companies with manufacturers, 
                  engineers, quality professionals, procurement leaders, and decision-makers to 
                  discover advanced measurement technologies, build business partnerships, and 
                  explore new opportunities across the manufacturing ecosystem.
                </p>
  
                {/* STATS SECTION */}
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-between bg-[#FCF8F3] border border-gray-100 px-4 sm:px-6 py-6 sm:py-8 rounded-sm gap-4 sm:gap-0">
                  <div className="text-center flex-1 min-w-[80px]">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bebas text-[#CC9808] font-bold">1st</h3>
                    <p className="text-[10px] sm:text-xs tracking-wider text-[#03193D] font-semibold mt-1 font-sans">EDITION</p>
                  </div>
  
                  <div className="hidden md:block h-12 w-px bg-gray-200"></div>
  
                  <div className="text-center flex-1 min-w-[80px]">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bebas text-[#CC9808] font-bold">10,000+</h3>
                    <p className="text-[10px] sm:text-xs tracking-wider text-[#03193D] font-semibold mt-1 font-sans">VISITORS</p>
                  </div>
  
                  <div className="hidden md:block h-12 w-px bg-gray-200"></div>
  
                  <div className="text-center flex-1 min-w-[80px]">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bebas text-[#CC9808] font-bold">150+</h3>
                    <p className="text-[10px] sm:text-xs tracking-wider text-[#03193D] font-semibold mt-1 font-sans">EXHIBITORS</p>
                  </div>
  
                  <div className="hidden md:block h-12 w-px bg-gray-200"></div>
  
                  <div className="text-center flex-1 min-w-[80px]">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bebas text-[#CC9808] font-bold">50+</h3>
                    <p className="text-[10px] sm:text-xs tracking-wider text-[#03193D] font-semibold mt-1 font-sans">SPEAKERS</p>
                  </div>
                </div>
  
                <div className="mt-8 sm:mt-10">
                  <Link href="/why-exhibit">
                    <button className="bg-[#CC9808] hover: text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                      Why Exhibit
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>

          {/* Explore Our Event Sectors Section */}
          <SectorsSection />
          
          {/* Year-Round Industry Ecosystem Section */}
          <Container> 
            <div className="animated-block ">
              <div className="animated-block-target">
                <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] ">
                  <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#03193D]">INDIAMET: A Year-Round Metrology & Manufacturing Ecosystem</h3>
                  <p className="mt-4 sm:mt-5 text-base sm:text-lg text-gray-700">
                    INDIAMET is a premier international platform for metrology, measurement technology, inspection, calibration, and quality engineering. It brings together technology providers, manufacturers, quality professionals, engineers, and decision-makers from across India and global markets.
                    <br /><br />
                    But INDIAMET is more than a three-day exhibition — it is a year-round industry ecosystem designed to connect the metrology and precision manufacturing community through exhibitions, knowledge-sharing, industry insights, networking, and business opportunities.
                  </p>

                  <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {ecosystemItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="relative flex flex-col overflow-hidden rounded-sm bg-[#FCF8F3] border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="flex flex-col flex-1 gap-3 sm:gap-4 font-sans">
                          <h4 className="text-lg sm:text-xl font-bold text-[#03193D]">{item.title}</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-600 flex-1 leading-relaxed">
                            {item.points.map((point, pIdx) => (
                              <li key={pIdx}>{point}</li>
                            ))}
                          </ul>
                        </div>
                          
                        <div className="mt-5">
                          <Link href={item.buttonLink}>
                            <button className="bg-[#CC9808] hover:bg-[#03193D] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                              {item.buttonText}
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>

          {/* Download Brochure Section */}
          <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
            <div className="animated-block-target">
              <div className="relative mx-auto overflow-hidden py-12 sm:py-16 lg:py-20 text-white">
                <div className="absolute inset-0">
                  <img
                    src="https://cdn.itegroupnews.com/img_3_4b6edc76d1.jpg"
                    alt="Event Background"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="absolute inset-0 bg-[#03193D]/60"></div>

                <Container className="relative z-10">
                  <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
                    <div className="grid items-center gap-8 md:grid-cols-12">
                      <div className="flex justify-center md:col-span-5 lg:col-span-4">
                        <img
                          src="https://cdn.itegroupnews.com/Sales_Brochure_84b3c56f9d.png"
                          alt="Brochure"
                          className="h-48 sm:h-56 lg:h-64 w-auto object-contain"
                        />
                      </div>

                      <div className="flex flex-col gap-4 sm:gap-5 md:col-span-7 lg:col-span-8">
                        <h3 className="font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                          Download Your Event Brochure
                        </h3>
                  
                        <p className="max-w-[700px] text-base sm:text-lg text-gray-200">
                          Make sure you grab your copy of the event brochure to learn more
                          about the show and explore your participation opportunities.
                        </p>
                  
                        <Link href="/event-brochure">
                          <button className="bg-[#CC9808] hover:bg-white hover:text-[#03193D] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm w-fit">
                            Download Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          </div>

          {/* Leading Exhibitors Section */}
          <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
            <div className="animated-block-target">
              <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
                <Container>
                  <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#03193D]">
                    Meet the Leading Exhibitors of 2027
                  </h3>
                </Container>
                          
                <div className="mt-6 sm:mt-8 lg:mt-10 mx-4 bg-[#FCF8F3] border border-gray-100 p-6 sm:p-8 flex flex-col rounded-sm shadow-sm">
                  <h4 className="font-bebas text-3xl sm:text-4xl lg:text-5xl text-[#03193D]">
                    Exhibiting at INDIAMET Elevates Your Brand and Expands Your Business Network
                  </h4>
                          
                  <div className="mt-6 sm:mt-8 w-full overflow-hidden rounded-sm">
                    <img
                      src="/images/image2.png"
                      alt="Exhibitors"
                      className="h-[200px] sm:h-[280px] md:h-[350px] lg:h-[400px] w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                          
                  <div className="mt-6 sm:mt-8">
                    <Link href="/exhibition-directory" target="_blank">
                      <button className="bg-[#CC9808] hover:bg-[#03193D] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                        View Full Exhibitor List
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Venue Section */}
          <Container className="py-12 sm:py-16 lg:py-20">
            <div className="animated-block">
              <div className="animated-block-target">
                <div className="w-full flex flex-col text-[#03193D]">
                  <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#03193D]">Here's Where You Can Find Us!</h3>
                  <div className="mt-1 sm:mt-1 lg:mt-2 grid gap-5 sm:gap-6 lg:grid-cols-2">
                    <div className="rounded-sm bg-[#FCF8F3] border border-gray-100 p-5 sm:p-6 font-sans">
                      <p className="mb-2 font-bold text-sm sm:text-base text-[#03193D]">Opening Hours</p>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800">22 April 2027: 10:00 - 18:00</h4>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800">23 April 2027: 10:00 - 18:00</h4>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800">24 April 2027: 10:00 - 16:00</h4>
                    </div>
                    <div className="rounded-sm bg-[#FCF8F3] border border-gray-100 p-5 sm:p-6 font-sans">
                      <p className="mb-2 font-bold text-sm sm:text-base text-[#03193D]">Venue</p>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800">Auto Cluster Exhibition Center, Pune, India</h4>
                    </div>
                  </div>
                  <div className="mt-6 sm:mt-8 overflow-hidden rounded-lg">
                    <iframe
                      src="https://www.google.com/maps?q=Auto%20Cluster%20Exhibition%20Center%2C%20Pune&output=embed"
                      className="w-full h-[300px] sm:h-[350px] md:h-[400px] border-0"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </Container>

          {/* Key Events Section */}
          <Container className="py-12 sm:py-16 lg:py-20">
            <div className="animated-block">
              <div className="animated-block-target">
                <div className="w-full">
                  <div className="mb-6 sm:mb-8 flex flex-col lg:flex-row justify-between lg:items-end gap-4">
                    <div className="lg:basis-2/3">
                      <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#03193D]">Key Events</h3>
                      <p className="mt-3 text-base sm:text-lg text-gray-600">
                        INDIAMET Connect is a professional networking platform designed to connect exhibitors, visitors, manufacturers, metrology professionals, industry experts, media, and professional associations. It helps the industry discover new technologies, build valuable business relationships, and stay connected throughout the year.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {keyEvents.map((event, idx) => (
                      <div key={idx} className="group flex flex-col overflow-hidden bg-[#FCF8F3] border border-gray-100 rounded-sm transition-shadow duration-300 ease-in-out hover:shadow-lg">
                        <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-[#03193D]/20 group-hover:bg-[#03193D]/40 transition"></div>
                        </div>
                        <div className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-5 font-sans">
                          <h4 className="text-lg sm:text-xl font-bold text-[#03193D]">{event.title}</h4>
                          <p className="text-sm text-gray-600 line-clamp-4 leading-relaxed">{event.description}</p>
                          {event.buttonText && (
                            <Link href={event.buttonLink}>
                              <button className="bg-[#CC9808] hover:bg-[#03193D] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm w-fit mt-2">
                                {event.buttonText}
                              </button>
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
          
          {/* Partners Section */}
          <PartnersSection />

          {/* Quick Navigation */}
          <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
            <div className="animated-block-target">
              <div className="border-t-8 border-[#CC9808] bg-[#03193D] py-12 sm:py-16 lg:py-20 text-white">
                <Container>
                  <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                    Quick Navigation
                  </h2>
                          
                  <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-8 sm:gap-y-10 gap-x-4">
                    {quickLinks.map((item, idx) => (
                      <div key={idx} className="relative flex flex-col items-center justify-center text-center">
                        <Link href={item.link} className="flex flex-col items-center group">
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
          
          <hr className="border-t-6 border-[#CC9808]" />
        </div>
        <BackToTop/>
      </div>

      <style jsx>{`
        .font-bebas {
          font-family: 'Bebas Neue', cursive;
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