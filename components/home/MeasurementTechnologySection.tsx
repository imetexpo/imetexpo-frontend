import Link from 'next/link';
import {
  Boxes,
  ShieldCheck,
  Gauge,
  Scan,
  Cpu,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';

const segments = [
  {
    number: '01',
    icon: Boxes,
    title: 'Metrology & Precision Measurement',
    description:
      'Coordinate measuring machines (CMM), dimensional measurement systems, and precision measuring instruments.',
  },
  {
    number: '02',
    icon: ShieldCheck,
    title: 'Inspection & Quality Control',
    description:
      'Industrial inspection equipment, automated inspection systems, and quality assurance solutions.',
  },
  {
    number: '03',
    icon: Gauge,
    title: 'Calibration & Testing',
    description:
      'Calibration instruments, laboratory equipment, and measurement verification technologies.',
  },
  {
    number: '04',
    icon: Scan,
    title: '3D Measurement & Optical Metrology',
    description:
      '3D scanning, laser measurement systems, and optical inspection technologies.',
  },
  {
    number: '05',
    icon: Cpu,
    title: 'Smart Manufacturing & Automation',
    description:
      'Digital metrology, automated measurement, machine vision, and intelligent quality inspection.',
  },
];

export default function MeasurementTechnologySection() {
  return (
    <section className="bg-[#FAFBFD] py-16 sm:py-20 lg:py-24 border-t border-gray-100">
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px]">
        {/* Header */}
        <div className="mb-8 sm:mb-10 lg:mb-12 max-w-4xl">
          <h2
            id="measurement-tech-heading"
            className="text-[clamp(1.5rem,4.5vw,3.25rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-[#132D49]"
          >
            Explore Advanced Measurement Technology at{' '}
            <span className="text-[#003A77]">INDIAMET 2027</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-[#526174]">
            INDIAMET 2027 brings the world of precision measurement and quality
            engineering into focus. This measurement technology exhibition highlights
            solutions supporting accurate, reliable, and efficient manufacturing
            processes.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid auto-rows-fr gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {segments.map((segment) => {
            const Icon = segment.icon;
            return (
              <article
                key={segment.number}
                className="group flex h-full flex-col rounded-2xl sm:rounded-3xl border border-[#003A77]/10 bg-white p-5 sm:p-8 shadow-[0_4px_24px_rgba(19,45,73,0.03)] transition-[border-color,box-shadow,translate] duration-300 hover:border-[#003A77]/25 hover:shadow-[0_16px_40px_rgba(19,45,73,0.08)] motion-safe:hover:-translate-y-1 motion-reduce:transition-none"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl border border-[#003A77]/10 bg-[#EDF4FB] text-[#003A77] transition-colors group-hover:border-[#003A77] group-hover:bg-[#003A77] group-hover:text-white motion-reduce:transition-none">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mb-3 sm:mb-4 mt-5 sm:mt-6 text-lg sm:text-xl font-semibold leading-snug tracking-[-0.02em] text-[#132D49] sm:min-h-14 xl:min-h-16 xl:text-2xl">
                  {segment.title}
                </h3>
                <p className="text-sm sm:text-base leading-[1.7] sm:leading-[1.8] text-[#526174]">
                  {segment.description}
                </p>
              </article>
            );
          })}

          {/* Card 06 - CTA Card */}
          <article className="relative flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-[#003A77] bg-[#003A77] p-5 sm:p-8 text-white shadow-[0_12px_32px_rgba(0,58,119,0.15)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full border border-white/10"
            />
            <div className="relative flex items-center justify-between gap-4">
              <span className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-white/20 bg-white/10">
                <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              </span>
              <span className="text-right text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                Your next step
              </span>
            </div>
            <h3 className="relative mb-3 sm:mb-4 mt-5 sm:mt-6 text-xl sm:text-2xl font-semibold leading-snug tracking-[-0.02em] sm:min-h-14 xl:min-h-16 xl:text-3xl">
              Be part of
              <br />
              INDIAMET 2027.
            </h3>
            <p className="relative mb-6 sm:mb-7 text-sm sm:text-base leading-[1.7] sm:leading-[1.8] text-white/80">
              Discover how advanced measurement and inspection technologies
              contribute to manufacturing accuracy, product consistency, and
              industrial innovation.
            </p>
            <Link
              href="/register?t=exhibitor"
              className="group relative mt-auto inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-[#003A77] transition-colors hover:bg-[#E8F1F8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
            >
              <span>Register as an Exhibitor</span>
              <ArrowRight
                className="h-4 w-4 shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
