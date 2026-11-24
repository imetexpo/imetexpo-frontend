import Container from '@/components/ui/container';
import {
  Ruler,
  Gauge,
  Eye,
  Compass,
  Scan,
  Cpu,
  Factory,
} from 'lucide-react';

const technologySectors = [
  {
    title: 'Metrology Equipment & Dimensional Measurement',
    description:
      'Measurement accuracy begins with dependable metrology equipment. This sector covers tools and systems used to verify dimensions, tolerances and geometrical specifications in manufacturing environments. From handheld gauges to automated measuring machines, these solutions help quality teams monitor consistency and validate finished parts.',
    typicalAreas:
      'Coordinate measuring machines (CMMs), gauges, micrometers, height gauges, digital comparators and dimensional measuring systems.',
    icon: Ruler,
  },
  {
    title: 'Precision Measuring Instruments',
    description:
      'Precision measuring instruments support repeatable, traceable measurements across machining, assembly, testing and final inspection. Manufacturers use these instruments to check critical features, reduce measurement variation and support product acceptance decisions.',
    typicalAreas:
      'Precision gauges, bore gauges, calipers, micrometers, profile measurement and surface roughness instruments.',
    icon: Gauge,
  },
  {
    title: 'Industrial Inspection & Automated Quality Control',
    description:
      'Industrial inspection equipment helps manufacturers identify dimensional deviations, visible defects and process variation. Automated inspection and machine vision solutions can strengthen repeatability, support in-process checks and make quality data easier to use.',
    typicalAreas:
      'Vision inspection systems, optical inspection, in-line inspection, industrial testing systems and digital quality inspection software.',
    icon: Eye,
  },
  {
    title: 'Calibration, Testing & Measurement Traceability',
    description:
      'Calibration supports confidence in measurement results by comparing instruments against appropriate references and documenting their performance. This sector is relevant to calibration laboratories, industrial maintenance teams and quality departments managing measurement systems.',
    typicalAreas:
      'Calibration instruments, reference standards, electrical and dimensional calibration equipment, testing systems and calibration services.',
    icon: Compass,
  },
  {
    title: '3D Measurement, CMM & Optical Metrology',
    description:
      'Three-dimensional measurement technologies make it possible to inspect complex shapes, surface profiles and component geometry. Contact and non-contact systems help manufacturers compare physical parts against engineering requirements and support reverse engineering or inspection workflows.',
    typicalAreas:
      'CMM measurement technology, 3D scanners, laser measurement systems, optical metrology and 3D inspection software.',
    icon: Scan,
  },
  {
    title: 'Quality Engineering, Software & Smart Metrology',
    description:
      'Digital quality engineering brings measurement data into manufacturing decisions. Software, automation and connected inspection tools can support reporting, trend analysis and more efficient quality workflows across production operations.',
    typicalAreas:
      'Metrology software, inspection reporting, statistical process control, machine vision, smart metrology and automated measurement systems.',
    icon: Cpu,
  },
];

const targetIndustries = [
  'Automotive Components',
  'Aerospace & Defence',
  'Precision Engineering',
  'Tooling & Die Making',
  'Industrial Machinery',
  'Electronics & Semiconductors',
  'General Manufacturing',
  'Calibration Laboratories',
];

export default function SectorOverviewSection() {
  return (
    <div className="animated-block mt-8 sm:mt-14 lg:mt-20">
      <div className="animated-block-target">
        {/* 6 Technology Sectors Detail Grid */}
        <section className="bg-[#FAFBFD] py-8 sm:py-14 md:py-16 lg:py-20 border-t border-gray-100">
          <Container>
            <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
              <div className="mb-6 sm:mb-10 lg:mb-12 text-center lg:text-left">
                <p className="text-[#00A1B1] font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider">
                  Technology Categories
                </p>
                <h2 className="font-bebas text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#003A77] leading-tight uppercase tracking-tight mt-1 sm:mt-2">
                  Comprehensive Metrology &amp; Inspection Capabilities
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {technologySectors.map((sector, idx) => {
                  const Icon = sector.icon;
                  return (
                    <div
                      key={idx}
                      className="group flex flex-col justify-between rounded-xl sm:rounded-2xl border border-[#003A77]/10 bg-white p-4 sm:p-6 shadow-[0_2px_12px_rgba(19,45,73,0.03)] transition-all duration-300 hover:border-[#00A1B1]/40 hover:shadow-[0_8px_24px_rgba(0,161,177,0.08)] motion-safe:hover:-translate-y-0.5"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4">
                          <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl border border-[#003A77]/10 bg-[#EDF4FB] text-[#003A77] transition-colors group-hover:border-[#00A1B1] group-hover:bg-[#00A1B1] group-hover:text-white">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-[#003A77] leading-snug">
                          {sector.title}
                        </h3>

                        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                          {sector.description}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-5 rounded-lg sm:rounded-xl border border-[#003A77]/10 bg-[#FCF8F3] p-3 sm:p-3.5 font-sans">
                        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#00A1B1]">
                          Typical technology areas
                        </p>
                        <p className="mt-1 text-xs text-gray-700 leading-relaxed">
                          {sector.typicalAreas}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        {/* Industries Served by Metrology & Inspection Technologies */}
        <section className="bg-white py-8 sm:py-14 md:py-16 lg:py-20 border-t border-gray-100">
          <Container>
            <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
              <div className="rounded-2xl sm:rounded-3xl border border-[#003A77]/10 bg-[#FCF8F3] p-4 sm:p-8 lg:p-12 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <span className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-[#003A77] text-white">
                    <Factory className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[#00A1B1] font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider">
                      Target Sectors
                    </p>
                    <h2 className="font-bebas text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#003A77] leading-tight uppercase tracking-tight mt-1">
                      Industries Served by Metrology &amp; Inspection Technologies
                    </h2>
                  </div>
                </div>

                <p className="text-xs sm:text-base lg:text-lg text-gray-700 leading-relaxed font-sans mt-3 sm:mt-4 max-w-4xl">
                  Metrology and quality engineering are relevant across automotive components,
                  aerospace, precision engineering, tooling, machinery, electronics and general
                  manufacturing. Visitors can explore solutions applicable to incoming inspection,
                  process verification, laboratory calibration and final quality assurance.
                </p>

                <div className="mt-5 sm:mt-8 flex flex-wrap gap-2 sm:gap-2.5">
                  {targetIndustries.map((ind, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-lg border border-[#003A77]/15 bg-white px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#003A77] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </div>
  );
}
