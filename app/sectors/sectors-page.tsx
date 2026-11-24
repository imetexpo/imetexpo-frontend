// app/sectors/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import PartnersSection from "@/components/home/PartnersSection";
import SectorOverviewSection from "@/components/sectors/SectorOverviewSection";
import ExplorePuneSection from "@/components/sectors/ExplorePuneSection";
import BackToTop from "@/components/layout/BackToTop";
import Container from "@/components/ui/container";
import PageHero from "@/components/layout/PageHero";
import { getImageAlt } from '@/lib/imageAlts';
import { Sector, sectorsData } from '@/data/sectors';

interface SectorsPageProps {
  sectors?: Sector[];
}

export default function SectorsPage({ sectors = sectorsData }: SectorsPageProps) {
  const quickGuideItems = [
    {
      title: "Become an Exhibitor",
      description: "Showcase your metrology, measurement, inspection, calibration, and quality technologies to manufacturers, engineers, quality professionals, and key industry decision-makers.",
      buttonText: "Book A Stand",
      buttonLink: "/exhibiting-enquiry",
      image: "/images/become_exhibitor.webp"
    },
    {
      title: "Download Your Event Brochure",
      description: "Explore INDIAMET 2027, discover the exhibition sectors, visitor profile, exhibiting opportunities, and everything you need to plan your participation.",
      buttonText: "Download Now",
      buttonLink: "/event-brochure",
      image: "/images/Untitled_500_x_500_px_cd8f081eec.webp"
    },
    {
      title: "Become a Visitor",
      description: "Discover the latest metrology and measurement technologies, connect with leading solution providers, meet industry professionals, and explore innovations shaping precision manufacturing.",
      buttonText: "Register Now",
      buttonLink: "/passes",
      image: "/images/become_visitor.webp"
    }
  ];
  return (
    <div className="intro-animation min-h-screen overflow-x-hidden bg-white">
      {/* Main Content */}
      <div className="page-spacing-wrapper lg:pt-0">
        <PageHero
          title="EVENT"
          accent="SECTORS"
          subtitle="From CMMs and optical measurement to calibration, 3D scanning, and digital quality — explore the technologies showcased at INDIAMET Expo."
        />

        {/* Sectors Grid Section */}
        <div className="animated-block">
          <div className="animated-block-target">
            <Container>
              <div className="text-center lg:text-left">
                <h1 className="mt-6 sm:mt-10 font-bebas text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#003A77] leading-tight">
                  Metrology Equipment, Measurement &amp; Inspection Sectors at INDIAMET 2027
                </h1>
                <p className="mx-auto mt-3 sm:mt-5 max-w-5xl text-xs sm:text-base lg:text-lg text-gray-700 lg:mx-0 leading-relaxed font-sans">
                  Explore the technology sectors at INDIAMET 2027, an international exhibition focused on metrology, precision measurement, inspection, calibration and quality engineering. The exhibition connects measurement solution providers with manufacturing professionals seeking accuracy, consistency and reliable quality processes. Discover the equipment, instruments and digital technologies shaping modern industrial measurement.
                </p>
              </div>

              <div className="my-8 sm:my-14 md:my-16">
                <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {sectors.map((sector, idx) => (
                    <Link
                      key={idx}
                      href={`/sectors/${sector.slug}`}
                      className="group relative block overflow-hidden rounded-lg sm:rounded-xl shadow-sm border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-md motion-safe:hover:scale-[1.02]"
                    >
                      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                        <Image
                          src={sector.image}
                          alt={getImageAlt(sector.image, sector.title)}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
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
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3.5 sm:p-4 pt-8">
                        <h3 className="text-center font-bebas text-base sm:text-lg md:text-xl text-white transition-colors duration-300 group-hover:text-[#00A1B1] font-bold uppercase tracking-wide">
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

        {/* Metrology Equipment, Measurement & Inspection Sectors Overview */}
        <SectorOverviewSection />

        {/* Quick Guide Section */}
        <div className="animated-block mt-8 sm:mt-16 lg:mt-20">
          <div className="animated-block-target">
            <Container>
              <div className="mb-6 sm:mb-10 text-center lg:text-left">
                <p className="text-[#00A1B1] font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider">Quick Guide</p>
                <h3 className="mt-1 sm:mt-2 font-bebas text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#003A77] leading-tight">
                  Simplifying Your <span className="text-[#00A1B1]">Participation Journey</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {quickGuideItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex flex-col justify-between overflow-hidden rounded-xl sm:rounded-2xl bg-[#FCF8F3] border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-lg shadow-sm"
                  >
                    <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={getImageAlt(item.image, item.title)}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#003A77]/20 group-hover:bg-[#003A77]/30 transition-all duration-300"></div>
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 font-sans">
                      <div>
                        <h4 className="text-base sm:text-lg md:text-xl font-bold text-[#003A77] leading-snug">{item.title}</h4>
                        <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                      <div className="mt-4 pt-1">
                        <Link href={item.buttonLink} className="inline-block w-full sm:w-auto">
                          <button className="w-full sm:w-auto bg-[#00A1B1] hover:bg-[#003A77] text-white px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm text-center">
                            {item.buttonText}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </div>

        {/* Explore INDIAMET 2027 in Pune Section */}
        <ExplorePuneSection />

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