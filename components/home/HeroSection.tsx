'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Container from '../ui/container';
import Link from 'next/link';

const slides = [
  { id: 1, image: 'https://rubber-tyre.com.vn/wp-content/uploads/2025/07/CTHE0129-min-scaled.webp' },
  { id: 2, image: 'https://global.divhunt.com/3ed74ea1f32f6d8d53c3acfec927b4bc_113152.webp' },
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
    <section className="relative flex h-[calc(100svh-var(--mobile-header-height,110px))] w-full items-end justify-center overflow-hidden text-white lg:h-screen">
      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-t from-black via-black/50 to-transparent" />

      {/* Slideshow background */}
      <div className="absolute inset-0 z-[-2] size-full bg-[#03193D]">
        <div className="relative h-full w-full overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === activeSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {!imageErrors[slide.id] ? (
                <Image
                  src={slide.image}
                  alt="IndiaMet Expo"
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
      <div className="w-full pb-8 sm:pb-10 md:pb-12 relative z-10">
        <Container>
          {/* HEADING — vw-based but clamped so it never overflows on mobile */}
          <h1
            className="font-bebas uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 9.5vw, 9rem)' }}
          >
            <br />
            <span className="text-white">INDIAMET </span>
            <span className="text-[#CC9808]">2027</span>
          </h1>

          {/* BOTTOM ROW — stacks on mobile, side-by-side on lg+ */}
          <div className="mt-4 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-5 lg:gap-8">
            {/* Description — fixed readable font size, no vw */}
            <p className="font-sans text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed max-w-3xl">
              INDIAMET Expo connects global technology leaders, metrology experts, 
              manufacturers, and quality professionals to discover advanced measurement, 
              inspection, calibration, and quality solutions driving the next generation of 
              precision manufacturing.
            </p>

            {/* Exhibit button */}
            <div className="flex-shrink-0 w-full lg:w-auto">
              <Link
                href="/exhibiting-enquiry/"
                className="inline-block w-full lg:w-auto text-center bg-[#CC9808] hover:bg-[#FFD154] text-white px-10 py-4 text-base md:text-lg font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap rounded-sm shadow-lg hover:scale-105"
              >
                Exhibit
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}