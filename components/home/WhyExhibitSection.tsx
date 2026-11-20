'use client';

import Link from 'next/link';
import Container from '../ui/container';

const reasons = [

  'Showcase measurement, inspection, and calibration solutions',
  'Connect with prospective industrial buyers and decision-makers',
  'Generate business enquiries and explore new partnerships',
  'Strengthen brand visibility in the metrology industry',
  'Present new technologies to precision manufacturing professionals'

];

export default function WhyExhibitSection() {
  return (
    <section className="bg-[#003A77] text-white py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch">

          {/* LEFT SIDE */}
          <div className="flex-1 flex flex-col gap-5 justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight text-[#00A1B1] uppercase">
                  WHY EXHIBIT
                </h2>
                <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight text-white uppercase">
                  AT INDIAMET 2027 ?
                </h2>
              </div>

              <p className="font-sans text-lg sm:text-xl text-gray-400 leading-relaxed mt-2">
                Showcase your innovations at an industrial metrology exhibition designed to connect measurement technology companies with relevant manufacturing audiences.
                INDIAMET 2027 offers an opportunity for metrology equipment manufacturers, calibration solution providers, inspection technology companies, and quality engineering specialists to present their capabilities to industry professionals.
              </p>
            </div>

            <Link
              href="/register?t=exhibitor"
              className="inline-block bg-[#00A1B1] hover:bg-white hover:text-[#003A77] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm mt-6 w-fit text-center"
            >Book Your Exhibition Stall
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
                <span className="text-[#00A1B1] text-sm sm:text-base font-bold font-sans flex-shrink-0 mt-1">
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