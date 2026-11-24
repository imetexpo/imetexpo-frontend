import Link from 'next/link';
import { Calendar, MapPin, Building2, ArrowRight, ArrowUpRight } from 'lucide-react';
import Container from '@/components/ui/container';

export default function JoinIndiaMetSection() {
  return (
    <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
      <div className="animated-block-target">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#00264D] via-[#003A77] to-[#004B8C] py-12 sm:py-16 lg:py-20 text-white">
          {/* Subtle gradient highlights */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[#00A1B1]/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-[#00A1B1]/20 blur-3xl"
          />

          <Container className="relative z-10">
            <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
              <div className="rounded-2xl sm:rounded-3xl border border-white/15 bg-white/[0.06] p-6 sm:p-10 lg:p-14 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                
                {/* Header */}
                <div className="max-w-4xl">
                  <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-[#00A1B1]/30 bg-[#00A1B1]/10 px-3.5 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#00A1B1]">
                    <span className="h-2 w-2 rounded-full bg-[#00A1B1] animate-pulse" />
                    Pune, Maharashtra, India
                  </div>

                  <h3 className="font-bebas text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight uppercase tracking-tight">
                    Join INDIAMET 2027 in Pune
                  </h3>

                  <p className="mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg font-medium text-gray-200 leading-relaxed font-sans">
                    Be part of a dedicated platform for metrology, measurement technology,
                    inspection, calibration, and quality engineering.
                  </p>
                </div>

                {/* Event Details 4-Card Strip */}
                <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 backdrop-blur-sm">
                    <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#00A1B1]">
                      Exhibition
                    </p>
                    <p className="mt-1 text-xs sm:text-base font-bold text-white">
                      INDIAMET 2027
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#00A1B1]">
                      <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>Dates</span>
                    </div>
                    <p className="mt-1 text-xs sm:text-base font-bold text-white">
                      13–15 May 2027
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#00A1B1]">
                      <Building2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>Venue</span>
                    </div>
                    <p className="mt-1 text-xs sm:text-base font-bold text-white">
                      Auto Cluster Exhibition Centre
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#00A1B1]">
                      <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>Location</span>
                    </div>
                    <p className="mt-1 text-xs sm:text-base font-bold text-white">
                      Chinchwad East, Pune, India
                    </p>
                  </div>
                </div>

                {/* Body paragraph */}
                <p className="mt-6 sm:mt-8 text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed font-sans max-w-4xl">
                  Whether you are a technology provider looking to showcase innovations or an
                  industry professional seeking advanced measurement solutions, INDIAMET 2027
                  offers an opportunity to connect with the precision manufacturing community.
                </p>

                {/* 3 Calls to action */}
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-center gap-3.5 sm:gap-4">
                  <Link
                    href="/register?t=exhibitor"
                    className="group inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#00A1B1] px-6 sm:px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(0,161,177,0.35)] transition-all duration-300 hover:bg-white hover:text-[#003A77] hover:shadow-[0_6px_24px_rgba(255,255,255,0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00A1B1]"
                  >
                    Become an Exhibitor
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                  <Link
                    href="/passes"
                    className="group inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 sm:px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-[#003A77] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    Register as a Visitor
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                  <Link
                    href="/sectors"
                    className="group inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 px-6 sm:px-7 py-3.5 text-sm font-semibold text-gray-200 transition-colors duration-200 hover:border-white hover:text-white"
                  >
                    Explore Exhibition Sectors
                  </Link>
                </div>

              </div>
            </div>
          </Container>
        </section>
      </div>
    </div>
  );
}
