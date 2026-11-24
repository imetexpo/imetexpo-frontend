import Link from 'next/link';
import Container from '@/components/ui/container';
import { Calendar, Building2, MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';

export default function ExplorePuneSection() {
  return (
    <div className="animated-block mt-8 sm:mt-16 lg:mt-20">
      <div className="animated-block-target">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#00264D] via-[#003A77] to-[#004B8C] py-8 sm:py-14 md:py-16 lg:py-20 text-white">
          <Container className="relative z-10">
            <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
              <div className="rounded-2xl sm:rounded-3xl border border-white/15 bg-white/[0.06] p-4 sm:p-8 lg:p-14 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.25)]">

                {/* Location Badge */}
                <div className="mb-3 sm:mb-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#00A1B1]/30 bg-[#00A1B1]/10 px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#00A1B1] max-w-full">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#00A1B1] animate-pulse" />
                  <span className="truncate sm:whitespace-normal">Auto Cluster Exhibition Centre, Pune, India</span>
                </div>

                <h2 className="font-bebas text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight uppercase tracking-tight">
                  Explore INDIAMET 2027 in Pune
                </h2>

                <p className="mt-2.5 sm:mt-4 text-xs sm:text-base lg:text-lg text-gray-200 leading-relaxed font-sans max-w-4xl">
                  Meet the technologies supporting reliable measurement and manufacturing quality at
                  INDIAMET 2027, held from 13–15 May 2027 at the Auto Cluster Exhibition Centre,
                  Chinchwad East, Pune, Maharashtra, India. Explore the exhibition sectors, plan your
                  visit or enquire about exhibiting.
                </p>

                {/* Event Highlights Strip */}
                <div className="mt-5 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 max-w-3xl">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#00A1B1]">
                      <Calendar className="h-3.5 w-3.5 shrink-0" />
                      <span>Dates</span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm md:text-base font-bold text-white">
                      13–15 May 2027
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#00A1B1]">
                      <Building2 className="h-3.5 w-3.5 shrink-0" />
                      <span>Venue</span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm md:text-base font-bold text-white">
                      Auto Cluster Exhibition Centre
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#00A1B1]">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span>Location</span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm md:text-base font-bold text-white">
                      Chinchwad East, Pune, India
                    </p>
                  </div>
                </div>

                {/* Suggested CTA buttons */}
                <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <Link
                    href="/why-exhibit"
                    className="group inline-flex min-h-11 sm:min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#00A1B1] px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-[0_4px_20px_rgba(0,161,177,0.35)] transition-all duration-300 hover:bg-white hover:text-[#003A77] hover:shadow-[0_6px_24px_rgba(255,255,255,0.4)] text-center"
                  >
                    Why Exhibit
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    href="/why-visit"
                    className="group inline-flex min-h-11 sm:min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-[#003A77] text-center"
                  >
                    Why Visit
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>

                  <Link
                    href="/register?t=exhibitor"
                    className="group inline-flex min-h-11 sm:min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-200 transition-colors duration-200 hover:border-white hover:text-white text-center"
                  >
                    Exhibitor Enquiry
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
