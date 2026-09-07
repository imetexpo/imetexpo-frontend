import Image from 'next/image';
import { Button } from '../ui/button';
import Container from '../ui/container';
import StatsGrid from './StatsGrid';

const statsData = [
  { number: '30th', label: 'Edition' },
  { number: '10500+', label: 'Visitors' },
  { number: '550+', label: 'Exhibitors' },
  { number: '100+', label: 'Speakers' },
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
              alt="India Tyre Show"
              width={200}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            <p className="text-[#CC9808] font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider">
              About India Tyre Show
            </p>

            <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-[#03193D] leading-tight uppercase tracking-tight">
              POWERING THE FUTURE OF TYRE INDUSTRY
            </h2>

            <div className="font-sans text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed space-y-4">
              <p className="text-justify font-normal">
                For three decades,IndiaMethas been the premier international exhibition 
                for tyre manufacturing and rubber technology. It brings together global tyre professionals, 
                decision-makers, and innovators to connect, collaborate, and explore the technologies 
                shaping the future of the industry.
              </p>
              <p className="text-justify font-normal">
                Showcasing state-of-the-art equipment, technologies, and services,IndiaMethelps 
                companies overcome challenges, expand into key markets, and build lasting partnerships. 
                Whether you&apos;re exploring new opportunities or reinforcing your market presence, 
                this is where the tyre community meets to advance the industry.
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