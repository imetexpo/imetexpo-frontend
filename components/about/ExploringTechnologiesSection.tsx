import Container from '@/components/ui/container';
import {
  Ruler,
  Scan,
  Eye,
  ShieldCheck,
  Compass,
  Layers,
  Cpu,
  CheckCircle2,
} from 'lucide-react';

const technologies = [
  {
    title: 'Dimensional Metrology',
    description:
      'Coordinate measuring machines (CMM), gauges, and dimensional measurement systems.',
    icon: Ruler,
  },
  {
    title: '3D Measurement & Scanning',
    description:
      'Advanced 3D scanning, laser measurement, and digital measurement solutions.',
    icon: Scan,
  },
  {
    title: 'Optical Metrology',
    description:
      'Non-contact measurement systems and optical inspection technologies.',
    icon: Eye,
  },
  {
    title: 'Industrial Inspection',
    description:
      'Machine vision, automated inspection, and quality control equipment.',
    icon: ShieldCheck,
  },
  {
    title: 'Calibration & Testing',
    description:
      'Calibration instruments, measurement standards, and laboratory testing solutions.',
    icon: Compass,
  },
  {
    title: 'Surface Measurement',
    description:
      'Surface roughness testing, profile measurement, and surface inspection systems.',
    icon: Layers,
  },
  {
    title: 'Smart Metrology',
    description:
      'Digital measurement, automated quality inspection, and Industry 4.0 applications.',
    icon: Cpu,
  },
];

export default function ExploringTechnologiesSection() {
  return (
    <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
      <div className="animated-block-target">
        <Container>
          <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
            {/* Header */}
            <div className="mb-8 sm:mb-10 lg:mb-12">
              <h1 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#003A77] leading-tight uppercase tracking-tight">
                Exploring Advanced Metrology &amp; Measurement Technologies
              </h1>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-gray-700 max-w-4xl leading-relaxed">
                INDIAMET 2027 focuses on technologies supporting modern manufacturing and
                quality assurance processes. As a metrology equipment exhibition, the event
                highlights the importance of measurement solutions in maintaining dimensional
                accuracy, verifying product specifications, and improving manufacturing performance.
              </p>
            </div>

            {/* 7 Technologies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10">
              {technologies.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="group flex items-start gap-4 rounded-xl sm:rounded-2xl border border-[#003A77]/10 bg-[#FCF8F3] p-4 sm:p-5 shadow-[0_2px_12px_rgba(19,45,73,0.02)] transition-all duration-300 hover:border-[#00A1B1]/40 hover:bg-white hover:shadow-[0_8px_24px_rgba(0,161,177,0.08)] motion-safe:hover:-translate-y-0.5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#003A77]/10 bg-[#EDF4FB] text-[#003A77] transition-colors group-hover:border-[#00A1B1] group-hover:bg-[#00A1B1] group-hover:text-white mt-0.5">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-sm sm:text-base font-bold text-[#003A77] leading-snug">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Concluding Statement Box */}
            <div className="rounded-xl sm:rounded-2xl border border-[#003A77]/15 bg-[#EDF4FB]/70 p-4 sm:p-6 text-[#003A77] font-medium text-xs sm:text-sm md:text-base leading-relaxed flex items-start sm:items-center gap-3.5 sm:gap-4 shadow-sm">
              <CheckCircle2
                className="h-5 w-5 sm:h-6 sm:w-6 text-[#00A1B1] shrink-0 mt-0.5 sm:mt-0"
                aria-hidden="true"
              />
              <p className="font-sans">
                These technologies play an important role in helping manufacturers improve
                product quality, reduce measurement uncertainty, and support consistent
                production standards.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
