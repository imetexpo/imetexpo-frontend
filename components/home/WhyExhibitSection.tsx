'use client';

import Link from 'next/link';
import Container from '../ui/container';

const reasons = [
  'ACCESS INDIA’S GROWING PRECISION MANUFACTURING MARKET',
  'MEET KEY BUYERS AND QUALITY DECISION-MAKERS',
  'SHOWCASE ADVANCED METROLOGY & INSPECTION TECHNOLOGIES',
  'DRIVE QUALITY, ACCURACY & MANUFACTURING EFFICIENCY',
  'BUILD LONG-TERM PARTNERSHIPS & MARKET PRESENCE',
];

export default function WhyExhibitSection() {
  return (
    <section className="bg-[#03193D] text-white py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch">
          
          {/* LEFT SIDE */}
          <div className="flex-1 flex flex-col gap-5 justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight text-[#CC9808] uppercase">
                  WHY EXHIBIT
                </h2>
                <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight text-white uppercase">
                  AT INDIAMET?
                </h2>
              </div>

              <p className="font-sans text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed mt-2">
                As manufacturing moves towards greater precision, automation, and quality excellence, 
                INDIAMET provides direct access to the decision-makers driving this transformation. 
                Connect with manufacturers, engineers, quality professionals, and procurement leaders, 
                showcase your latest metrology and inspection technologies, and unlock new business 
                opportunities across India’s growing precision manufacturing ecosystem.
              </p>
            </div>

            <Link
              href="/why-exhibit/"
              className="inline-block bg-[#CC9808] hover:bg-white hover:text-[#03193D] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm mt-6 w-fit text-center"
            >
              Explore Benefits of Participating
            </Link>
          </div>

          {/* VERTICAL DIVIDER */}
          <div className="hidden lg:block w-px bg-white/20 self-stretch"></div>

          {/* RIGHT SIDE */}
          <div className="flex-1 flex flex-col justify-center">
            {reasons.map((text, index) => (
              <div
                key={index}
                className="flex items-start gap-4 sm:gap-5 border-b border-white/10 pb-5 pt-5 first:pt-0 last:border-b-0"
              >
                <span className="text-[#CC9808] text-sm sm:text-base font-bold font-sans flex-shrink-0 mt-1">
                  0{index + 1}.
                </span>
                <p className="font-bebas text-lg sm:text-xl md:text-2xl tracking-wide leading-snug text-gray-200 uppercase">
                  {text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}