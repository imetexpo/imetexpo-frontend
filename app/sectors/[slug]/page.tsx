// app/sectors/[slug]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getSectorBySlug, Sector } from "@/data/sectors";
import PartnersSection from "@/components/home/PartnersSection";
import BackToTop from "@/components/layout/BackToTop";
import Container from "@/components/ui/container";

export default function SectorPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [loading, setLoading] = useState(true);
  const [sector, setSector] = useState<Sector | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    const foundSector = getSectorBySlug(slug);
    setSector(foundSector || null);
    return () => clearTimeout(timer);
  }, [slug]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-100 grid place-content-center bg-[#03193D]">
        <div className="flex size-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-500 text-4xl">
          <div className="flex size-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-300 text-2xl"></div>
        </div>
      </div>
    );
  }

  if (!sector) {
    return (
      <div className="page-spacing-wrapper lg:pt-0">
        <Container className="py-20 text-center">
          <h1 className="font-bebas text-5xl text-[#03193D] md:text-6xl lg:text-7xl">
            Sector Not Found
          </h1>
          <p className="mt-5 text-lg text-gray-600">
            The sector you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/sectors">
            <button className="mt-8 bg-[#CC9808] hover:bg-[#03193D] text-white px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
              Back to All Sectors
            </button>
          </Link>
        </Container>
      </div>
    );
  }

  const quickGuideItems = [
    {
      title: "Become an Exhibitor",
      description: "Connect with 8,000+ tyre industry professionals across 3 days for unparalleled networking opportunities.",
      buttonText: "Book A Stand",
      buttonLink: "/exhibiting-enquiry",
      image: "https://cdn.itegroupnews.com/mw24_1062_min_91b90d653f.jpg"
    },
    {
      title: "Download Your Event Brochure",
      description: "Not ready to become an exhibitor? Visit the exhibition for free and find out what to expect for the following edition.",
      buttonText: "Download Now",
      buttonLink: "/event-brochure",
      image: "https://cdn.itegroupnews.com/Untitled_500_x_500_px_cd8f081eec.png"
    },
    {
      title: "Become a Visitor",
      description: "Find out who we are, what we do, and how best we can help you achieve your strategic business goals all wrapped up in our concise event brochure.",
      buttonText: "Register Now",
      buttonLink: "/visitor-registration",
      image: "https://cdn.itegroupnews.com/mw24_1077_min_75a8122d24.jpg"
    }
  ];

  return (
    <div className="intro-animation">
      {/* Main Content */}
      <div className="page-spacing-wrapper lg:pt-0">
        {/* Hero Section */}
        <div className="animated-block">
          <div className="animated-block-target">
            <Container>
              <div className="space-y-5 py-10">
                <h1 className="font-bebas text-5xl text-[#03193D] md:text-6xl lg:text-7xl uppercase">
                  {sector.title}
                </h1>
                <div className="relative h-[300px] w-full overflow-hidden rounded-sm md:h-[400px] lg:h-[500px] border border-gray-100">
                  <Image
                    src={sector.image}
                    alt={sector.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <p className="text-lg leading-relaxed text-gray-750 lg:text-xl font-sans mt-6">
                  {sector.content || sector.description}
                </p>
                {sector.buttonText && (
                  <div className="pt-4">
                    <Link href={sector.buttonLink || "/exhibiting-enquiry"}>
                      <button className="bg-[#CC9808] hover:bg-[#03193D] text-white px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                        {sector.buttonText}
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </Container>
          </div>
        </div>

        {/* Sub-Sectors Section */}
        {sector.subSectors && sector.subSectors.length > 0 && (
          <div className="animated-block mt-12">
            <div className="animated-block-target">
              <Container>
                <h2 className="mb-8 font-bebas text-4xl text-[#03193D] md:text-5xl uppercase">
                  Sub-Sectors Within <span className="text-[#CC9808]">{sector.title}</span>
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {sector.subSectors.map((sub, idx) => (
                    <div key={idx} className="rounded-sm border border-gray-100 bg-[#FCF8F3] p-6 shadow-sm transition-all hover:shadow-md">
                      <h3 className="mb-3 font-bebas text-2xl text-[#CC9808] uppercase font-bold">
                        {sub.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {sub.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          </div>
        )}

        {/* Key Products Section */}
        {sector.keyProducts && sector.keyProducts.length > 0 && (
          <div className="animated-block mt-12">
            <div className="animated-block-target">
              <Container>
                <h2 className="mb-8 font-bebas text-4xl text-[#03193D] md:text-5xl uppercase">
                  Key Products & Solutions
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {sector.keyProducts.map((product, idx) => (
                    <div key={idx} className="flex items-center gap-2 rounded-sm bg-[#FCF8F3] border border-gray-100 p-3">
                      <span className="text-xl text-[#CC9808]">✓</span>
                      <span className="text-gray-700 text-sm">{product}</span>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          </div>
        )}

        {/* Quick Guide Section */}
        <div className="animated-block mt-12 lg:mt-20">
          <div className="animated-block-target">
            <Container>
              <div className="mb-10 text-center lg:mb-12 lg:text-left">
                <p className="font-bold text-[#CC9808] uppercase text-xs tracking-wider">Quick Guide</p>
                <h3 className="mt-2 font-bebas text-5xl text-[#03193D] md:text-6xl lg:text-7xl uppercase">
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
                      <div className="absolute inset-0 bg-[#03193D]/20 transition-all duration-300 group-hover:bg-[#03193D]/40"></div>
                      <div className="absolute bottom-4 left-0 right-0 flex justify-start pl-4">
                        <Link href={item.buttonLink}>
                          <button className="bg-[#CC9808] hover:bg-[#03193D] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                            {item.buttonText}
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-5 font-sans">
                      <h4 className="font-bebas text-2xl text-[#03193D] md:text-3xl font-bold uppercase">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </div>

        {/* Back to Sectors Link */}
        <div className="animated-block mt-8">
          <Container>
            <Link href="/sectors">
              <button className="flex items-center gap-2 text-[#CC9808] transition-all hover:gap-3 hover:text-[#03193D] font-sans font-medium text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to All Sectors
              </button>
            </Link>
          </Container>
        </div>

        {/* Partners Section */}
        <div className="mt-12 lg:mt-20">
          <PartnersSection />
        </div>
      </div>

      <BackToTop />

      <style jsx>{`
        .font-bebas {
          font-family: 'Bebas Neue', cursive;
        }
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
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animated-block:nth-child(1) { animation-delay: 0.1s; }
        .animated-block:nth-child(2) { animation-delay: 0.3s; }
        .animated-block:nth-child(3) { animation-delay: 0.5s; }
        .animated-block:nth-child(4) { animation-delay: 0.6s; }
        .animated-block:nth-child(5) { animation-delay: 0.7s; }
        .animated-block:nth-child(6) { animation-delay: 0.8s; }
      `}</style>
    </div>
  );
}