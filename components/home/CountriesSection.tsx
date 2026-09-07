import Image from 'next/image';
import Link from 'next/link';
import Container from '../ui/container';

interface Country {
  name: string;
  flag: string;
}

interface CountriesSectionProps {
  countries: Country[];
}

export default function CountriesSection({ countries }: CountriesSectionProps) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28 text-white">
      <Image
        src="https://cdn.itegroupnews.com/img_5_cb9a8893c7.jpg"
        alt="Background"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#03193D]" />
      
      {/* Orange polygon overlay — inline style for clip-path */}
      <div 
        className="absolute right-0 top-0 h-full w-1/2 bg-[#CC9808]/20 hidden lg:block"
        style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}
      />

      <Container className="relative z-10 ">
        <p className="text-[#CC9808] font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider">
          Countries Represented
        </p>
        <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight mt-3">
          DISCOVER THE GLOBAL REACH OF INDIA TYRE SHOW
        </h2>
        
        <Link
          href="/exhibitor-list/"
          className="inline-block bg-[#CC9808] hover:bg-[#d67300] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm mt-6 whitespace-nowrap"
        >
          Explore the 2026 Exhibitor List
        </Link>

        <div className="mt-8 sm:mt-10 lg:mt-12 bg-[#03193D]/75 backdrop-blur-md border border-white/10 rounded-sm px-6 py-6 flex flex-wrap gap-6 sm:gap-8 items-center justify-center md:justify-start">
          {countries.map((country) => (
            <div key={country.name} className="flex items-center gap-3">
              <Image
                src={country.flag}
                alt={country.name}
                width={32}
                height={32}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover shadow-md"
              />
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-white">
                {country.name}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}