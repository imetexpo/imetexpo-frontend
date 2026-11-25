// app/about/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PartnersSection from "@/components/home/PartnersSection";
import SectorsSection from "@/components/home/SectorsSection";
import VisionSection from "@/components/home/VisionSection";
import ExploringTechnologiesSection from "@/components/about/ExploringTechnologiesSection";
import ConnectingIndustriesSection from "@/components/about/ConnectingIndustriesSection";
import WhyIndiaMetMattersSection from "@/components/about/WhyIndiaMetMattersSection";
import JoinIndiaMetSection from "@/components/about/JoinIndiaMetSection";
import BackToTop from "@/components/layout/BackToTop";
import Container from "@/components/ui/container";
import PageHero from "@/components/layout/PageHero";
import LoadingDots from '@/components/ui/LoadingDots';
import { getImageAlt } from '@/lib/imageAlts';


export default function AboutPage() {
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
      buttonLink: "/summit"
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
      buttonLink: "/contact-us"
    }
  ];

  const keyEvents = [
    { title: "Conference Programme", description: "INDIAMET brings together industry leaders, metrology experts, manufacturing professionals, and technical specialists through a comprehensive conference programme featuring industry forums, expert presentations, panel discussions, and technical sessions. The programme explores emerging technologies, industry challenges, standards, and the latest trends shaping metrology, measurement, inspection, calibration, and precision manufacturing.", image: "/images/confe.webp", buttonText: "Learn More", buttonLink: "/summit" }, { title: "INDIAMET Connect", description: "INDIAMET Connect is the exhibition's dedicated business networking platform, designed to connect exhibitors, visitors, manufacturers, quality professionals, metrology experts, media, professional associations, and industry leaders. The platform helps participants discover new technologies, build valuable business relationships, and explore new business opportunities.", image: "/images/Untitled_400_x_490_px_400_x_250_px_13b6d04f0b.webp", buttonText: "Join Now", buttonLink: "/contact-us" }, { title: "Global Metrology Excellence Awards", description: "The Global Metrology Excellence Awards (GMEA) recognise outstanding achievements and innovation in metrology, measurement technology, inspection, calibration, quality engineering, and precision manufacturing. The awards celebrate organisations and professionals developing advanced solutions that improve accuracy, productivity, quality, and manufacturing performance.", image: "/images/awards2.webp", buttonText: "Learn More", buttonLink: "/awards" }
  ];

  const quickLinks = [
    { label: "Enquire to Exhibit", link: "/exhibiting-enquiry", icon: "/images/Vector_1_440f5852b9.webp" },
    { label: "Download Event Brochure", link: "/event-brochure", icon: "/images/Group_e024d13500.webp" },
    { label: "Exhibitor List", link: "/exhibition-directory", icon: "/images/Vector_ceea3d1488.webp" },
    { label: "Plan Your Travel", link: "/plan-your-travel", icon: "/images/Vector_1_b2c1ab92d0.webp" },
    { label: "Why Visit", link: "/why-visit", icon: "/images/Vector_2_9be2b98909.webp" }
  ];

  return (
    <div className="intro-animation min-h-screen overflow-x-hidden bg-white">
      <div className="page-spacing-wrapper">
        <div className="lg:pt-0">

          <PageHero
            title="ABOUT"
            accent="INDIAMET EXPO"
            subtitle="From Measurement to Manufacturing: Powering the Future of Precision & Quality"
          />

          {/* Transforming Metrology Operations Section */}
          <Container className="py-10 sm:py-16 lg:py-20">
            <div className="w-full grid items-start gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">

              {/* LEFT IMAGE */}
              <div className="w-full h-56 sm:h-80 md:h-[450px] lg:h-[550px] rounded-sm overflow-hidden shadow-sm relative">
                <img
                  src="/images/about_indiamet.webp"
                  alt="Visitors exploring industrial exhibitors in a busy exhibition hall"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* RIGHT CONTENT */}
              <div className="flex flex-col justify-center">
                <h1 className="font-bebas text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-[#003A77]">
                  About INDIAMET 2027 – International Metrology & Measurement Technology Exhibition
                </h1>

                <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700">
                  INDIAMET 2027 is India’s international exhibition for metrology, measurement technology, inspection, calibration, and quality engineering. Scheduled from 13–15 May 2027 at the Auto Cluster Exhibition Centre, Pune, the event connects measurement technology providers, industry professionals, manufacturers, and decision-makers working towards higher accuracy and quality in manufacturing.
                  <br /><br />
                  As a dedicated INDIAMET metrology exhibition, the event provides a platform for exploring technologies that support dimensional accuracy, reliable inspection, efficient calibration, and improved manufacturing quality.
                  <br /><br />
                  The INDIAMET measurement technology expo aims to encourage industry collaboration, knowledge exchange, and business opportunities across precision manufacturing and quality engineering.
                </p>

                {/* STATS SECTION */}
                <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-0 bg-[#FCF8F3] border border-gray-100 p-4 sm:py-6 sm:px-4 rounded-sm sm:divide-x divide-gray-200">
                  <div className="text-center p-2 sm:p-0">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bebas text-[#00A1B1] font-bold">1st</h3>
                    <p className="text-[10px] sm:text-xs tracking-wider text-[#003A77] font-semibold mt-1 font-sans">EDITION</p>
                  </div>

                  <div className="text-center p-2 sm:p-0">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bebas text-[#00A1B1] font-bold">10,000+</h3>
                    <p className="text-[10px] sm:text-xs tracking-wider text-[#003A77] font-semibold mt-1 font-sans">VISITORS</p>
                  </div>

                  <div className="text-center p-2 sm:p-0">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bebas text-[#00A1B1] font-bold">150+</h3>
                    <p className="text-[10px] sm:text-xs tracking-wider text-[#003A77] font-semibold mt-1 font-sans">EXHIBITORS</p>
                  </div>

                  <div className="text-center p-2 sm:p-0">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bebas text-[#00A1B1] font-bold">50+</h3>
                    <p className="text-[10px] sm:text-xs tracking-wider text-[#003A77] font-semibold mt-1 font-sans">SPEAKERS</p>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8">
                  <Link href="/why-exhibit">
                    <button className="w-full sm:w-auto bg-[#00A1B1] hover:bg-[#003A77] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm text-center">
                      Why Exhibit
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>

          {/* Our Vision Section */}
          <VisionSection />

          {/* Explore Our Event Sectors Section */}
          <SectorsSection />

          {/* Year-Round Industry Ecosystem Section */}
          <Container className="py-10 sm:py-16 lg:py-20">
            <div className="animated-block ">
              <div className="animated-block-target">
                <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] ">
                  <h3 className="font-bebas text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#003A77] leading-tight">INDIAMET: A Year-Round Metrology & Manufacturing Ecosystem</h3>
                  <p className="mt-3 sm:mt-5 text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-sans">
                    INDIAMET is a premier international platform for metrology, measurement technology, inspection, calibration, and quality engineering. It brings together technology providers, manufacturers, quality professionals, engineers, and decision-makers from across India and global markets.
                    <br /><br />
                    But INDIAMET is more than a three-day exhibition — it is a year-round industry ecosystem designed to connect the metrology and precision manufacturing community through exhibitions, knowledge-sharing, industry insights, networking, and business opportunities.
                  </p>

                  <div className="mt-6 sm:mt-10 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {ecosystemItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="relative flex flex-col justify-between overflow-hidden rounded-sm bg-[#FCF8F3] border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="flex flex-col flex-1 gap-2.5 sm:gap-4 font-sans">
                          <h4 className="text-base sm:text-lg md:text-xl font-bold text-[#003A77]">{item.title}</h4>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{item.description}</p>
                          <ul className="list-disc space-y-1.5 pl-4 sm:pl-5 text-xs sm:text-sm text-gray-600 flex-1 leading-relaxed">
                            {item.points.map((point, pIdx) => (
                              <li key={pIdx}>{point}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 sm:mt-6">
                          <Link
                            href={item.buttonLink}
                            className="inline-block w-full sm:w-auto bg-[#00A1B1] hover:bg-[#003A77] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm text-center"
                          >
                            {item.buttonText}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>

          {/* Exploring Advanced Metrology & Measurement Technologies Section */}
          <ExploringTechnologiesSection />

          {/* Download Brochure Section */}
          <div className="animated-block mt-10 sm:mt-16 lg:mt-20">
            <div className="animated-block-target">
              <div className="relative mx-auto overflow-hidden py-10 sm:py-16 lg:py-20 text-white">
                <div className="absolute inset-0">
                  <img
                    src="/images/img_3_4b6edc76d1.webp"
                    alt="Precision manufacturing and measurement technology banner with CNC machine and caliper"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="absolute inset-0 bg-[#003A77]/60"></div>

                <Container className="relative z-10">
                  <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
                    <div className="grid items-center gap-6 sm:gap-8 md:grid-cols-12">
                      <div className="flex justify-center md:col-span-5 lg:col-span-4">
                        <img
                          src="/images/indiamet_Brochure.webp"
                          alt="IndiaMET exhibition brochure featuring metrology technology and event details"
                          className="h-40 sm:h-56 lg:h-64 w-auto object-contain"
                        />
                      </div>

                      <div className="flex flex-col gap-3 sm:gap-5 md:col-span-7 lg:col-span-8 text-center md:text-left items-center md:items-start">
                        <h3 className="font-bebas text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                          Download Your Event Brochure
                        </h3>

                        <p className="max-w-[700px] text-sm sm:text-base lg:text-lg text-gray-200 font-sans leading-relaxed">
                          Make sure you grab your copy of the event brochure to learn more
                          about the show and explore your participation opportunities.
                        </p>

                        <Link href="/event-brochure" className="w-full sm:w-auto">
                          <button className="w-full sm:w-auto bg-[#00A1B1] hover:bg-white hover:text-[#003A77] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm text-center">
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

          {/* Connecting Industries Through Precision Measurement Section */}
          <ConnectingIndustriesSection />

          {/* Why INDIAMET 2027 Matters Section */}
          <WhyIndiaMetMattersSection />

          {/* Venue Section */}
          <Container className="py-10 sm:py-16 lg:py-20">
            <div className="animated-block">
              <div className="animated-block-target">
                <div className="w-full flex flex-col text-[#003A77]">
                  <h3 className="font-bebas text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#003A77] leading-tight">Here's Where You Can Find Us!</h3>
                  <div className="mt-4 sm:mt-6 grid gap-4 sm:gap-6 lg:grid-cols-2">
                    <div className="rounded-sm bg-[#FCF8F3] border border-gray-100 p-4 sm:p-6 font-sans">
                      <p className="mb-2 font-bold text-xs sm:text-sm text-[#00A1B1] uppercase tracking-wider">Opening Hours</p>
                      <h4 className="text-sm sm:text-base md:text-lg font-bold text-gray-800">13 May 2027: 10:00 - 18:00</h4>
                      <h4 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mt-1">14 May 2027: 10:00 - 18:00</h4>
                      <h4 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mt-1">15 May 2027: 10:00 - 18:00</h4>
                    </div>
                    <div className="rounded-sm bg-[#FCF8F3] border border-gray-100 p-4 sm:p-6 font-sans">
                      <p className="mb-2 font-bold text-xs sm:text-sm text-[#00A1B1] uppercase tracking-wider">Venue</p>
                      <h4 className="text-sm sm:text-base md:text-lg font-bold text-gray-800">Auto Cluster Exhibition Center, Pune, India</h4>
                    </div>
                  </div>
                  <div className="mt-6 sm:mt-8 overflow-hidden rounded-lg">
                    <iframe
                      src="https://www.google.com/maps?q=Auto%20Cluster%20Exhibition%20Center%2C%20Pune&output=embed"
                      className="w-full h-[240px] sm:h-[320px] md:h-[400px] border-0"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </Container>

          {/* Key Events Section */}
          <Container className="py-10 sm:py-16 lg:py-20">
            <div className="animated-block">
              <div className="animated-block-target">
                <div className="w-full">
                  <div className="mb-6 sm:mb-8 flex flex-col lg:flex-row justify-between lg:items-end gap-3 sm:gap-4">
                    <div className="lg:basis-2/3">
                      <h3 className="font-bebas text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#003A77] leading-tight">Key Events</h3>
                      <p className="mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg text-gray-600 font-sans leading-relaxed">
                        INDIAMET Connect is a professional networking platform designed to connect exhibitors, visitors, manufacturers, metrology professionals, industry experts, media, and professional associations. It helps the industry discover new technologies, build valuable business relationships, and stay connected throughout the year.
                      </p>
                    </div>
                  </div>
                  <div className="grid min-w-0 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {keyEvents.map((event, idx) => (
                      <div key={idx} className="group flex min-w-0 flex-col overflow-hidden bg-[#FCF8F3] border border-gray-100 rounded-sm transition-shadow duration-300 ease-in-out hover:shadow-lg">
                        <div className="relative h-44 sm:h-56 w-full overflow-hidden">
                          <Image
                            src={event.image}
                            alt={getImageAlt(event.image, event.title)}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-[#003A77]/20 group-hover:bg-[#003A77]/40 transition"></div>
                        </div>
                        <div className="flex flex-col flex-1 justify-between gap-3 sm:gap-4 p-4 sm:p-5 font-sans">
                          <div>
                            <h4 className="text-base sm:text-lg font-bold text-[#003A77]">{event.title}</h4>
                            <p className="mt-1 text-xs sm:text-sm text-gray-600 line-clamp-4 leading-relaxed">{event.description}</p>
                          </div>
                          {event.buttonText && (
                            <Link
                              href={event.buttonLink}
                              className="inline-block w-full sm:w-auto bg-[#00A1B1] hover:bg-[#003A77] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm text-center mt-2"
                            >
                              {event.buttonText}
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

          {/* Join INDIAMET 2027 in Pune Section */}
          <JoinIndiaMetSection />

          {/* Partners Section */}
          <PartnersSection />

          {/* Quick Navigation */}
          {/* <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
            <div className="animated-block-target">
              <div className="border-t-8 border-[#00A1B1] bg-[#003A77] py-12 sm:py-16 lg:py-20 text-white">
                <Container>
                  <h1 className="font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                    Quick Navigation
                  </h1>
                          
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
          </div> */}

          {/* <hr className="border-t-6 border-[#00A1B1]" /> */}
        </div>
        <BackToTop />
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