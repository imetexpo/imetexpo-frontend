import Container from '@/components/ui/container';
import {
  Sparkles,
  Users,
  TrendingUp,
  ShieldCheck,
  Lightbulb,
} from 'lucide-react';

const pillars = [
  {
    number: '01',
    title: 'Discover Innovation',
    description:
      'Explore advancements in metrology, measurement, and inspection technologies.',
    icon: Sparkles,
  },
  {
    number: '02',
    title: 'Build Industry Connections',
    description:
      'Connect with technology providers, manufacturers, engineers, and business professionals.',
    icon: Users,
  },
  {
    number: '03',
    title: 'Explore Business Opportunities',
    description:
      'Identify potential suppliers, customers, and technology partners.',
    icon: TrendingUp,
  },
  {
    number: '04',
    title: 'Support Manufacturing Quality',
    description:
      'Understand how measurement solutions contribute to accuracy, consistency, and operational efficiency.',
    icon: ShieldCheck,
  },
  {
    number: '05',
    title: 'Encourage Knowledge Exchange',
    description:
      'Learn about emerging developments in industrial metrology and quality engineering.',
    icon: Lightbulb,
  },
];

export default function WhyIndiaMetMattersSection() {
  return (
    <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
      <div className="animated-block-target">
        <Container>
          <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
            {/* Header */}
            <div className="mb-6 sm:mb-10 lg:mb-12">
              <h1 className="font-bebas text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#003A77] leading-tight uppercase tracking-tight">
                Why INDIAMET 2027 Matters
              </h1>
              <p className="mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-700 max-w-4xl leading-relaxed font-sans">
                Precision measurement is fundamental to modern manufacturing. From verifying
                component dimensions to maintaining consistent production quality,
                metrology technologies help industries meet increasingly demanding requirements.
              </p>
            </div>

            {/* 5 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.number}
                    className={`group flex flex-col justify-between rounded-xl sm:rounded-2xl border border-[#003A77]/10 bg-[#FCF8F3] p-4 sm:p-6 shadow-[0_2px_12px_rgba(19,45,73,0.02)] transition-all duration-300 hover:border-[#00A1B1]/40 hover:bg-white hover:shadow-[0_8px_24px_rgba(0,161,177,0.08)] motion-safe:hover:-translate-y-0.5 ${idx === 3 ? 'lg:col-span-1' : ''
                      }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl border border-[#003A77]/10 bg-[#EDF4FB] text-[#003A77] transition-colors group-hover:border-[#00A1B1] group-hover:bg-[#00A1B1] group-hover:text-white">
                          <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" aria-hidden="true" />
                        </span>
                      </div>
                      <h4 className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg font-bold text-[#003A77] leading-snug">
                        {item.title}
                      </h4>
                      <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
