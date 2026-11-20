'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Container from '../ui/container';
import Link from 'next/link';
import { getImageAlt } from '@/lib/imageAlts';

const slides = [
  { id: 1, image: '/images/picx1.webp' },
  { id: 2, image: '/images/picx2.webp' },
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="relative flex min-h-[580px] sm:min-h-[640px] h-[calc(100svh-var(--mobile-header-height,110px))] lg:h-screen w-full items-end justify-center overflow-hidden text-white">
      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-t from-[#191919] via-[#191919]/50 to-transparent" />

      {/* Slideshow background */}
      <div className="absolute inset-0 z-[-2] size-full bg-[#191919]">
        <div className="relative h-full w-full overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === activeSlide ? 'opacity-100' : 'opacity-0'
                }`}
            >
              {!imageErrors[slide.id] ? (
                <Image
                  src={slide.image}
                  alt={getImageAlt(slide.image, 'IndiaMET Expo')}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  onError={() => handleImageError(slide.id)}
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-800 to-black" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom content */}
      <div className="w-full pb-6 sm:pb-8 md:pb-12 relative z-10">
        <Container>
          {/* HEADING — vw-based but clamped so it never overflows on mobile */}
          <h1
            className="font-bebas uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.25rem, 8.5vw, 8.5rem)' }}
          >
            <br />
            <span className="text-white">INDIAMET </span>
            <span className="text-[#00A1B1]">2027</span>
          </h1>

          {/* BOTTOM ROW — stacks on mobile, side-by-side on lg+ */}
          <div className="mt-3 sm:mt-4 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 sm:gap-5 lg:gap-8">
            {/* Description — fixed readable font size, no vw */}
            <p className="font-sans text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-3xl">
              International Metrology Exhibition in India
              <br />
              13–15 May 2027 | Auto Cluster Exhibition Centre, Pune, India
            </p>

            {/* Exhibit button */}
            <div className="flex-shrink-0 w-full lg:w-auto">
              <Link
                href="/exhibiting-enquiry/"
                className="inline-block w-full lg:w-auto text-center bg-[#00A1B1] hover:bg-[#FFD154] text-white px-6 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider transition-all duration-300 rounded-sm shadow-lg hover:scale-105"
              >
                Become an Exhibitor
              </Link>
            </div>
          </div>
        </Container>
      </div >
    </section >
  );
}