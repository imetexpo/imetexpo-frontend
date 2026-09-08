import Image from 'next/image';
import Container from '../ui/container';
import Link from 'next/link';

interface Outcome {
  title: string;
  content: string;
  image: string;
}

interface OutcomesSectionProps {
  outcomes: Outcome[];
}

export default function OutcomesSection({ outcomes }: OutcomesSectionProps) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <p className="text-[#CC9808] font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider">
            Key Outcomes of Exhibiting
          </p>
          <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-[#03193D] leading-tight uppercase tracking-tight mt-3">
            TURN PRECISION TECHNOLOGY INTO BUSINESS GROWTH
          </h2>
          <p className="mt-4 sm:mt-5 font-sans text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl">
            At INDIAMET, exhibitors don't just showcase technology — they create business opportunities.
            <br /><br />
            Connect with qualified buyers, meet key decision-makers, demonstrate your latest metrology and inspection solutions, strengthen your brand presence, and build valuable relationships across India’s rapidly growing precision manufacturing and quality ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex flex-col group">
              <div className="relative h-[200px] sm:h-[220px] lg:h-[240px] rounded-sm overflow-hidden shadow-sm">
                <Image
                  src={outcome.image}
                  alt={outcome.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="mt-4 flex flex-col">
                <h3 className="font-bebas text-4xl sm:text-5xl text-[#CC9808] leading-none font-bold">
                  {outcome.title}
                </h3>
                <p className="mt-2 font-sans text-gray-700 text-sm sm:text-base leading-relaxed">
                  {outcome.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12">
          <Link
            href="/post-show-report/"
            className="inline-block bg-[#CC9808] hover:bg-[#03193D] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm"
          >
            Download Post-Show Report
          </Link>
        </div>
      </Container>
    </section>
  );
}