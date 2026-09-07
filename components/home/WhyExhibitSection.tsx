'use client';

import Link from 'next/link';
import Container from '../ui/container';

const reasons = [
  'ENTER A USD 75 BILLION TYRE MARKET',
  'MEET HIGH-VALUE BUYERS AND DECISION-MAKERS FROM ACROSS THE GLOBE',
  'SHOWCASE TECHNOLOGIES THAT IMPROVE EFFICIENCY AND REDUCE COSTS',
  'ALIGN WITH REGIONAL SUSTAINABILITY AND INNOVATION GOALS',
  'SECURE LONG-TERM PARTNERSHIPS AND MARKET PRESENCE',
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
                  AT TYRE SHOW?
                </h2>
              </div>

              <p className="font-sans text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed mt-2">
                In a market defined by rapid modernisation, localisation, and sustainability demands,
               IndiaMetprovides direct access to decision-makers shaping the future of tyre
                manufacturing and rubber technology across the globe. It&apos;s where global suppliers connect
                with real projects, demonstrate ROI-driven technologies, and secure long-term growth opportunities.
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