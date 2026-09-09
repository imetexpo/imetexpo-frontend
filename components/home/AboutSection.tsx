import Image from 'next/image';
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
              src="https://cdn.itegroupnews.com/33_1_f4d3f3d85d.jpg"
              alt="IndiaMet Expo"
              width={200}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            <p className="text-[#CC9808] font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider">
              About INDIAMET Expo
            </p>

            <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-[#03193D] leading-tight uppercase tracking-tight">
              POWERING THE FUTURE OF PRECISION & QUALITY
            </h2>

            <div className="font-sans text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed space-y-4">
              <p className="text-justify font-normal">
                INDIAMET is India’s international exhibition for metrology, measurement technology, inspection, calibration, and quality engineering. The exhibition brings together leading technology providers, manufacturers, quality professionals, engineers, decision-makers, and industry experts to connect, collaborate, and explore the technologies shaping the future of precision manufacturing.
              </p>
              <p className="text-justify font-normal">
                Showcasing advanced CMMs, optical and vision measurement systems, dimensional inspection equipment, calibration technologies, sensors, testing solutions, software, and Industry 4.0 technologies, INDIAMET provides a platform for businesses to discover innovative solutions, improve manufacturing accuracy, strengthen quality processes, and build new partnerships.
              </p>

<p className="text-justify font-normal">
              Whether you are looking to discover the latest measurement technologies, expand your market presence, connect with qualified buyers, or stay ahead of the evolving quality and manufacturing landscape, INDIAMET is where the global metrology and precision engineering community comes together.
            </p>
            
            </div>

            <div className="mt-2 sm:mt-3 lg:mt-4">
              <StatsGrid stats={statsData} />
            </div>

            <div className="mt-4 sm:mt-5 lg:mt-6">
              <Button
                href="/about-indiatyreshow/"
                className="bg-[#CC9808] hover:bg-[#03193D] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 inline-block rounded-sm"
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