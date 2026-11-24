import Container from '@/components/ui/container';
import {
  Car,
  Plane,
  Cog,
  Cpu,
  Wrench,
  ShieldCheck,
  Gauge,
  FlaskConical,
  CheckCircle2,
} from 'lucide-react';

const industrySectors = [
  {
    number: '01',
    title: 'Automotive and auto component manufacturing',
    icon: Car,
  },
  {
    number: '02',
    title: 'Aerospace and defence manufacturing',
    icon: Plane,
  },
  {
    number: '03',
    title: 'Precision engineering and machining',
    icon: Cog,
  },
  {
    number: '04',
    title: 'Electronics and component manufacturing',
    icon: Cpu,
  },
  {
    number: '05',
    title: 'Tool rooms and industrial manufacturing',
    icon: Wrench,
  },
  {
    number: '06',
    title: 'Quality assurance and quality control',
    icon: ShieldCheck,
  },
  {
    number: '07',
    title: 'Metrology and calibration laboratories',
    icon: Gauge,
  },
  {
    number: '08',
    title: 'Research, development, and testing',
    icon: FlaskConical,
  },
];

export default function ConnectingIndustriesSection() {
  return (
    <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
      <div className="animated-block-target">
        <Container>
          <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
            {/* Header */}
            <div className="mb-6 sm:mb-10 lg:mb-12">
              <h1 className="font-bebas text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#003A77] leading-tight uppercase tracking-tight">
                Connecting Industries Through Precision Measurement
              </h1>
              <p className="mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-700 max-w-4xl leading-relaxed">
                INDIAMET 2027 serves as a platform for professionals involved in measurement,
                manufacturing, inspection, and quality assurance. As a precision measurement
                exhibition, it is designed to create opportunities for technology discovery,
                industry networking, and business collaboration.
              </p>
            </div>

            {/* 8 Industry Sectors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-10">
              {industrySectors.map((sector) => {
                const Icon = sector.icon;
                return (
                  <div
                    key={sector.number}
                    className="group flex items-center justify-between gap-3 rounded-xl sm:rounded-2xl border border-[#003A77]/10 bg-[#FCF8F3] p-3.5 sm:p-4 shadow-[0_2px_12px_rgba(19,45,73,0.02)] transition-all duration-300 hover:border-[#00A1B1]/40 hover:bg-white hover:shadow-[0_8px_24px_rgba(0,161,177,0.08)] motion-safe:hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl border border-[#003A77]/10 bg-[#EDF4FB] text-[#003A77] transition-colors group-hover:border-[#00A1B1] group-hover:bg-[#00A1B1] group-hover:text-white">
                        <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" aria-hidden="true" />
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-[#132D49] leading-snug">
                        {sector.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Concluding Highlight Box */}
            <div className="rounded-xl sm:rounded-2xl border border-[#003A77]/15 bg-[#EDF4FB]/70 p-3.5 sm:p-6 text-[#003A77] font-medium text-xs sm:text-sm md:text-base leading-relaxed flex items-start sm:items-center gap-3 sm:gap-4 shadow-sm">
              <CheckCircle2
                className="h-5 w-5 sm:h-6 sm:w-6 text-[#00A1B1] shrink-0 mt-0.5 sm:mt-0"
                aria-hidden="true"
              />
              <p className="font-sans">
                By connecting solution providers with professionals responsible for
                manufacturing accuracy and product quality, INDIAMET aims to support the
                adoption of advanced measurement technologies across industries.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
