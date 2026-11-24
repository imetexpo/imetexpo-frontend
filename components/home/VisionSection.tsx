import { Target, Compass, Sparkles, ShieldCheck } from 'lucide-react';

export default function VisionSection() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20 border-t border-gray-100">
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading & Highlight Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h1
                id="vision-heading"
                className="text-[clamp(1.75rem,4.5vw,3.25rem)] font-bold leading-[1.15] tracking-tight text-[#132D49]"
              >
                Our Vision – <br className="hidden sm:block" />
                <span className="text-[#003A77]">
                  Empowering the Future of Precision Manufacturing
                </span>
              </h1>

              <p className="mt-4 text-base sm:text-lg font-medium text-[#003A77] leading-relaxed">
                Advancing industrial accuracy, inspection standards, and manufacturing
                excellence through metrology innovation.
              </p>
            </div>

            {/* Accent Callout Badge */}
            <div className="mt-6 sm:mt-8 rounded-2xl border border-[#003A77]/10 bg-[#FAFBFD] p-4 sm:p-5 shadow-[0_2px_12px_rgba(19,45,73,0.02)]">
              <div className="flex items-start gap-3.5 sm:gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#003A77] text-white">
                  <Target className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#132D49]">
                    Bridging Industry &amp; Technology
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#526174] leading-relaxed">
                    Connecting global measurement innovators with precision engineering
                    leaders to power quality-driven growth.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Narrative Paragraph Blocks */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 sm:gap-4">
            {/* Block 1 */}
            <div className="rounded-xl sm:rounded-2xl border border-[#003A77]/10 bg-[#FAFBFD] p-4 sm:p-5 shadow-[0_2px_12px_rgba(19,45,73,0.02)] transition-all duration-300 hover:border-[#00A1B1]/40 hover:bg-white hover:shadow-[0_8px_24px_rgba(0,161,177,0.08)] motion-safe:hover:-translate-y-0.5">
              <div className="flex items-start gap-3.5 sm:gap-4">
                <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg sm:rounded-xl border border-[#003A77]/10 bg-[#EDF4FB] text-[#003A77] transition-colors">
                  <Compass className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-normal">
                  At <strong className="text-[#003A77] font-semibold">INDIAMET</strong>, our
                  vision is to contribute to the advancement of precision manufacturing
                  by connecting industries with measurement, inspection, and quality
                  engineering technologies.
                </p>
              </div>
            </div>

            {/* Block 2 */}
            <div className="rounded-xl sm:rounded-2xl border border-[#003A77]/10 bg-[#FAFBFD] p-4 sm:p-5 shadow-[0_2px_12px_rgba(19,45,73,0.02)] transition-all duration-300 hover:border-[#00A1B1]/40 hover:bg-white hover:shadow-[0_8px_24px_rgba(0,161,177,0.08)] motion-safe:hover:-translate-y-0.5">
              <div className="flex items-start gap-3.5 sm:gap-4">
                <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg sm:rounded-xl border border-[#003A77]/10 bg-[#EDF4FB] text-[#003A77] transition-colors">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-normal">
                  As manufacturing processes become increasingly complex, accurate
                  measurement and effective quality control are essential for product
                  consistency, operational efficiency, and compliance with industry
                  requirements.
                </p>
              </div>
            </div>

            {/* Block 3 */}
            <div className="rounded-xl sm:rounded-2xl border border-[#003A77]/10 bg-[#FAFBFD] p-4 sm:p-5 shadow-[0_2px_12px_rgba(19,45,73,0.02)] transition-all duration-300 hover:border-[#00A1B1]/40 hover:bg-white hover:shadow-[0_8px_24px_rgba(0,161,177,0.08)] motion-safe:hover:-translate-y-0.5">
              <div className="flex items-start gap-3.5 sm:gap-4">
                <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg sm:rounded-xl border border-[#003A77]/10 bg-[#EDF4FB] text-[#003A77] transition-colors">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-normal">
                  <strong className="text-[#003A77] font-semibold">INDIAMET</strong> aims
                  to bridge the gap between technology providers and manufacturing
                  professionals by creating opportunities to explore innovative
                  solutions and develop valuable industry connections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
