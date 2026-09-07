'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '../ui/container';

const sectorsData = [
  {
    id: 1,
    title: 'Tyre Manufacturing Equipment',
    slug: 'tyre-manufacturing-machinery',
    shortText: 'State-of-the-art machinery for tyre production including mixing mills and curing presses.',
    image: 'https://cdn.itegroupnews.com/Mining_World_Sectors_Images_7d57d82790.png',
  },
  {
    id: 2,
    title: 'Raw Materials & Compounds',
    slug: 'raw-materials-and-rubber-compounds',
    shortText: 'Natural and synthetic rubber, carbon black, silica, oils, and chemicals.',
    image: 'https://cdn.itegroupnews.com/Mining_World_Sectors_Images_1_ce66f08346.png',
  },
  {
    id: 3,
    title: 'Retreading & Repair',
    slug: 'retreading-and-repair-materials',
    shortText: 'Advanced retreading systems and repair tools for extending tyre life.',
    image: 'https://cdn.itegroupnews.com/Mining_World_Sectors_Images_2_5de8dcc6a6.png',
  },
  {
    id: 4,
    title: 'Tyre Recycling & Sustainability',
    slug: 'recycling-and-sustainability-solutions',
    shortText: 'Eco-friendly recycling solutions and circular economy initiatives.',
    image: 'https://cdn.itegroupnews.com/Mining_World_Sectors_Images_3_cabcb4d92e.png',
  },
  {
    id: 5,
    title: 'Testing & Quality Control',
    slug: 'tyre-testing-and-quality-control',
    shortText: 'Inspection systems, testing machines, and QA solutions.',
    image: 'https://cdn.itegroupnews.com/Mining_World_Sectors_Images_4_eac11c7a2e.png',
  },
  {
    id: 6,
    title: 'Tyre Management & IoT',
    slug: 'automation-and-industry-40',
    shortText: 'Smart tyre tech, RFID tracking, and fleet management systems.',
    image: 'https://cdn.itegroupnews.com/Mining_World_Sectors_Images_5_46733f0b8f.png',
  },
];

export default function SectorsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      
        <div>
          <Container>
            <div className="mb-8 sm:mb-10 lg:mb-12">
              <p className="text-[#CC9808] font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Event Sectors
              </p>
              <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-[#03193D] leading-tight uppercase tracking-tight mt-3">
                Explore Key Sectors Driving the Tyre Industry
              </h2>
            </div>
          </Container>

          {/* Add this to your global CSS or a <style> tag */}
          <style>{`
            @keyframes marquee-scroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee-track {
              animation: marquee-scroll 35s linear infinite;
            }
            .marquee-track:hover {
              animation-play-state: paused;
            }
          `}</style>
          
          <div className="relative mt-8 sm:mt-10 lg:mt-12 overflow-hidden">
            <div className="marquee-track flex gap-4 sm:gap-5 lg:gap-6 w-max">
              
              {/* Render list TWICE for seamless loop */}
              {[...sectorsData, ...sectorsData].map((sector, index) => (
                <Link
                  key={`${sector.id}-${index}`}
                  href={`/sectors/${sector.slug}`}
                  className="min-w-[280px] sm:min-w-[320px] lg:min-w-[380px] xl:min-w-[420px] flex-shrink-0 overflow-hidden group relative block cursor-pointer rounded-sm shadow-sm"
                >
                  <div className="relative h-[220px] sm:h-[240px] lg:h-[280px] xl:h-[320px]">
                    <Image
                      src={sector.image}
                      alt={sector.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-sm" />
                  <div className="absolute bottom-0 left-0 p-4 sm:p-5 text-white w-full">
                    <h3 className="font-bebas text-xl sm:text-2xl lg:text-3xl tracking-wide uppercase leading-tight line-clamp-2">
                      {sector.title}
                    </h3>
                    <p className="font-sans text-[11px] sm:text-xs lg:text-sm text-gray-300 mt-1 sm:mt-2 leading-relaxed line-clamp-2">
                      {sector.shortText}
                    </p>
                    <span className="inline-block mt-3 font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#CC9808] group-hover:underline">
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
          
            </div>
          </div>
            
          <Container> 
            <div className="mt-8 sm:mt-10 lg:mt-12">
              <Link href="/sectors/">
                <button className="bg-[#CC9808] hover:bg-[#03193D] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                  Explore All The Sectors
                </button>
              </Link>
            </div>
          </Container>
        </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .font-bebas {
          font-family: 'Bebas Neue', cursive;
        }
        .font-heading {
          font-family: 'Bebas Neue', cursive;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}