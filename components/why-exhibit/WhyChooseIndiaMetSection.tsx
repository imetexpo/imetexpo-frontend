import Container from '@/components/ui/container';
import Link from 'next/link';
import { Users, MonitorPlay, Handshake, TrendingUp } from 'lucide-react';

const reasons = [
  {
    title: 'Reach a Relevant Industrial Audience',
    description:
      'Meet metrology engineers, quality assurance professionals, inspection specialists, production teams, procurement managers and manufacturing decision-makers interested in measurement and quality solutions.',
    icon: Users,
  },
  {
    title: 'Demonstrate Technology in Context',
    description:
      'Explain the value of your equipment through product conversations and demonstrations, from dimensional inspection to optical measurement, calibration and digital quality workflows. Live demonstrations should be offered only when confirmed in the event programme.',
    icon: MonitorPlay,
  },
  {
    title: 'Build Business Relationships',
    description:
      'Use the exhibition to introduce products, discuss technical requirements, connect with potential distributors and buyers, and discover partnership opportunities in India’s precision manufacturing sector.',
    icon: Handshake,
  },
  {
    title: 'Strengthen Your Industry Visibility',
    description:
      'Position your company among organizations advancing measurement accuracy, inspection reliability and smarter manufacturing practices.',
    icon: TrendingUp,
  },
];

export default function WhyChooseIndiaMetSection() {
  return (
    <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
      <div className="animated-block-target">
        <section className="bg-white py-10 sm:py-16 lg:py-20 border-t border-gray-100">
          <Container>
            <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
              {/* Header */}
              <div className="mb-8 sm:mb-10 lg:mb-12">
                <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#003A77] leading-tight uppercase tracking-tight mt-1 sm:mt-2">
                  Why Choose INDIAMET for Your Next Exhibition?
                </h2>
              </div>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {reasons.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="group flex flex-col justify-between rounded-xl sm:rounded-2xl border border-[#003A77]/10 bg-[#FCF8F3] p-5 sm:p-6 shadow-[0_2px_12px_rgba(19,45,73,0.02)] transition-all duration-300 hover:border-[#00A1B1]/40 hover:bg-white hover:shadow-[0_8px_24px_rgba(0,161,177,0.08)] motion-safe:hover:-translate-y-0.5"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#003A77]/10 bg-[#EDF4FB] text-[#003A77] transition-colors group-hover:border-[#00A1B1] group-hover:bg-[#00A1B1] group-hover:text-white">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        </div>
                        <h3 className="mt-4 text-base sm:text-lg font-bold text-[#003A77] leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 sm:mt-8">
                <Link href="/passes" className="inline-block w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-[#00A1B1] hover:bg-[#003A77] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm text-center">
                    Register as a Visitor
                  </button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </div>
  );
}
