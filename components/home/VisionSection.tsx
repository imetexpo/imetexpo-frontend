import Container from '@/components/ui/container';
import { Compass, Sparkles, ShieldCheck } from 'lucide-react';

export default function VisionSection() {
  return (
    <section className="bg-white py-10 sm:py-16 lg:py-20 border-t border-gray-100">
      <Container>
        <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-10 lg:mb-12">
            <h2
              id="vision-heading"
              className="font-bebas text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#003A77] leading-tight uppercase tracking-tight mt-1 sm:mt-2"
            >
              Our Vision – Empowering the Future of Precision Manufacturing
            </h2>
          </div>

          {/* All cards in one line (3 columns on md/lg) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Card 1 */}
            <div className="group flex flex-col justify-between rounded-xl sm:rounded-2xl border border-[#003A77]/10 bg-[#FCF8F3] p-5 sm:p-6 shadow-[0_2px_12px_rgba(19,45,73,0.02)] transition-all duration-300 hover:border-[#00A1B1]/40 hover:bg-white hover:shadow-[0_8px_24px_rgba(0,161,177,0.08)] motion-safe:hover:-translate-y-0.5">
              <div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#003A77]/10 bg-[#EDF4FB] text-[#003A77] transition-colors group-hover:border-[#00A1B1] group-hover:bg-[#00A1B1] group-hover:text-white">
                  <Compass className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-sans">
                  At <strong className="text-[#003A77] font-semibold">INDIAMET</strong>, our vision is to contribute to the advancement of precision manufacturing by connecting industries with measurement, inspection, and quality engineering technologies.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group flex flex-col justify-between rounded-xl sm:rounded-2xl border border-[#003A77]/10 bg-[#FCF8F3] p-5 sm:p-6 shadow-[0_2px_12px_rgba(19,45,73,0.02)] transition-all duration-300 hover:border-[#00A1B1]/40 hover:bg-white hover:shadow-[0_8px_24px_rgba(0,161,177,0.08)] motion-safe:hover:-translate-y-0.5">
              <div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#003A77]/10 bg-[#EDF4FB] text-[#003A77] transition-colors group-hover:border-[#00A1B1] group-hover:bg-[#00A1B1] group-hover:text-white">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-sans">
                  As manufacturing processes become increasingly complex, accurate measurement and effective quality control are essential for product consistency, operational efficiency, and compliance with industry requirements.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group flex flex-col justify-between rounded-xl sm:rounded-2xl border border-[#003A77]/10 bg-[#FCF8F3] p-5 sm:p-6 shadow-[0_2px_12px_rgba(19,45,73,0.02)] transition-all duration-300 hover:border-[#00A1B1]/40 hover:bg-white hover:shadow-[0_8px_24px_rgba(0,161,177,0.08)] motion-safe:hover:-translate-y-0.5">
              <div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#003A77]/10 bg-[#EDF4FB] text-[#003A77] transition-colors group-hover:border-[#00A1B1] group-hover:bg-[#00A1B1] group-hover:text-white">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-sans">
                  <strong className="text-[#003A77] font-semibold">INDIAMET</strong> aims to bridge the gap between technology providers and manufacturing professionals by creating opportunities to explore innovative solutions and develop valuable industry connections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
