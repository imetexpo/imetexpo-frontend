import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Users,
  Cpu,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const visitorBenefits = [
  {
    number: '01',
    icon: Sparkles,
    text: 'Discover advancements in industrial metrology and precision measurement.',
  },
  {
    number: '02',
    icon: ShieldCheck,
    text: 'Explore inspection, testing, and calibration technologies.',
  },
  {
    number: '03',
    icon: Users,
    text: 'Connect with equipment manufacturers and technology providers.',
  },
  {
    number: '04',
    icon: Cpu,
    text: 'Learn about automation and digital quality inspection.',
  },
  {
    number: '05',
    icon: TrendingUp,
    text: 'Explore potential suppliers and business opportunities.',
  },
];

export default function WhyVisitHomeSection() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-24 border-t border-gray-100">
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading, Subtitle, Context & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2
                id="why-visit-heading"
                className="text-[clamp(1.65rem,4.5vw,3.25rem)] font-bold leading-[1.15] tracking-tight text-[#132D49]"
              >
                Why Visit <span className="text-[#003A77]">INDIAMET 2027?</span>
              </h2>

              <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg font-medium text-[#003A77] leading-snug">
                Experience the technologies advancing precision, inspection, and
                manufacturing quality at INDIAMET Expo 2027 in Pune.
              </p>

              <p className="mt-3 sm:mt-4 text-xs sm:text-sm lg:text-base text-[#526174] leading-relaxed">
                Whether you are a manufacturing engineer, quality control
                professional, production manager, procurement specialist, or
                industry decision-maker, INDIAMET provides an opportunity to explore
                metrology and measurement solutions relevant to your operations.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/passes"
                className="group inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#003A77] px-6 sm:px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(0,58,119,0.2)] transition-all duration-300 hover:bg-[#00A1B1] hover:shadow-[0_6px_20px_rgba(0,161,177,0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#003A77]"
              >
                Register as a Visitor
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* Right Column: 5 Highlight Cards */}
          <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-4">
            {visitorBenefits.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.number}
                  className="group flex items-center justify-between gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-[#003A77]/10 bg-[#FAFBFD] p-3.5 sm:p-5 shadow-[0_2px_12px_rgba(19,45,73,0.02)] transition-all duration-300 hover:border-[#00A1B1]/40 hover:bg-white hover:shadow-[0_8px_24px_rgba(0,161,177,0.08)] motion-safe:hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg sm:rounded-xl border border-[#003A77]/10 bg-[#EDF4FB] text-[#003A77] transition-colors group-hover:border-[#00A1B1] group-hover:bg-[#00A1B1] group-hover:text-white">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                    </span>
                    <p className="text-xs sm:text-sm lg:text-base font-medium text-[#132D49] leading-snug sm:leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xs font-bold tabular-nums tracking-wider text-[#8594A5] group-hover:text-[#00A1B1] transition-colors"
                  >
                    {item.number}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
