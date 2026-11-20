import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';
import Container from '../ui/container';
import StatsGrid from './StatsGrid';

const statsData = [
  { number: '1st', label: 'Edition' },
  { number: '10000+', label: 'Visitors' },
  { number: '150+', label: 'Exhibitors' },
  { number: '50+', label: 'Speakers' },
];

export default function AboutSection() {
  return (
    <section className="bg-[#fffcfc] py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] items-center gap-8 sm:gap-10 lg:gap-12">

          {/* LEFT IMAGE */}
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] xl:h-[650px] rounded-lg overflow-hidden">
            <Image
              src="/images/pic1.webp"
              alt="Coordinate measuring probe inspecting a small precision metal component"
              width={200}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">

            <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-[#003A77] leading-tight uppercase tracking-tight">
              Where Precision Meets Innovation
            </h2>

            <div className="font-sans text-lg sm:text-xl text-gray-700 leading-relaxed space-y-4">
              <p className="text-justify font-normal">
                INDIAMET 2027 is India's international exhibition for metrology, measurement technology, inspection, calibration, and quality engineering. Bringing together industry professionals, technology providers, and manufacturing decision-makers, the exhibition provides a platform to explore innovations shaping the future of precision manufacturing.
              </p>
              <p className="text-justify font-normal">
                As a dedicated metrology exhibition in India, INDIAMET 2027 focuses on the technologies that help manufacturers improve measurement accuracy, maintain product quality, enhance inspection processes, and achieve greater production efficiency.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Link
                  href="/register?t=exhibitor"
                  className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#003A77] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#00A1B1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#003A77]"
                >
                  Become an Exhibitor
                  <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/passes"
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#003A77]/25 px-5 py-3.5 text-sm font-semibold text-[#003A77] transition-colors hover:border-[#003A77] hover:bg-[#003A77]/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#003A77]"
                >
                  Register as a Visitor
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            <div className="mt-2 sm:mt-3 lg:mt-4">
              <StatsGrid stats={statsData} />
            </div>

            <div className="mt-4 sm:mt-5 lg:mt-6">
              <Button
                href="/about"
                className="bg-[#00A1B1] hover:bg-[#003A77] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 inline-block rounded-sm"
              >
                Learn More
              </Button>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}