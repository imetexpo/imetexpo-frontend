import Link from 'next/link';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';

export default function BePartOfIndiaMetSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#00264D] via-[#003A77] to-[#004B8C] py-16 sm:py-20 lg:py-24 text-white">
      {/* Decorative background radial highlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#00A1B1]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-[#00A1B1]/20 blur-3xl"
      />

      <div className="relative mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px]">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-white/[0.06] p-5 sm:p-10 lg:p-16 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="max-w-3xl">

              <h2 className="text-[clamp(1.75rem,4.5vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-white">
                Be Part of <span className="text-[#00A1B1]">INDIAMET 2027</span>
              </h2>

              <p className="mt-3 sm:mt-5 text-sm sm:text-base lg:text-xl font-medium text-gray-100 leading-relaxed">
                Discover the technologies supporting accurate measurement, reliable inspection, and better manufacturing quality.
              </p>

              <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs sm:text-sm md:text-base text-gray-300">
                <MapPin className="h-4 w-4 text-[#00A1B1] shrink-0" aria-hidden="true" />
                <span>Connect with the metrology industry at INDIAMET 2027, Pune.</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 sm:gap-4 shrink-0">
              <Link
                href="/exhibiting-enquiry"
                className="group inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#00A1B1] px-6 sm:px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(0,161,177,0.35)] transition-all duration-300 hover:bg-white hover:text-[#003A77] hover:shadow-[0_6px_24px_rgba(255,255,255,0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00A1B1]"
              >
                Exhibit at INDIAMET 2027
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/passes"
                className="group inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 sm:px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-[#003A77] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Plan Your Visit
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
