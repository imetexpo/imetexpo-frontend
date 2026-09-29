'use client';

import { useRef, useEffect } from 'react';
import Container from '../ui/container';

const EMPTY_CARD_COUNT = 8;

export default function PartnersSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    let animationId: number;

    const autoScroll = () => {
      if (!scrollContainer) return;

      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      if (maxScroll <= 0) {
        animationId = requestAnimationFrame(autoScroll);
        return;
      }

      scrollAmount += 0.5;
      if (scrollAmount >= maxScroll) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    isDown = true;
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
    scrollContainer.style.cursor = 'grabbing';
    scrollContainer.style.userSelect = 'none';
  };

  const handleMouseLeave = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    isDown = false;
    scrollContainer.style.cursor = 'grab';
    scrollContainer.style.userSelect = 'auto';
  };

  const handleMouseUp = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    isDown = false;
    scrollContainer.style.cursor = 'grab';
    scrollContainer.style.userSelect = 'auto';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainer.scrollLeft = scrollLeft - walk;
  };

  const handleWheel = (e: React.WheelEvent) => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      e.preventDefault();
      scrollContainer.scrollLeft += e.deltaY;
    }
  };

  const emptyCards = Array.from({ length: EMPTY_CARD_COUNT * 2 }, (_, index) => index);

  return (
    <section className="overflow-x-hidden border-t border-gray-100 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full">
        <Container>
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <p className="text-[#F9B122] font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Our Ecosystem
            </p>
            <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-[#031A34] leading-tight uppercase tracking-tight mt-3">
              Partners & Sponsors
            </h2>
            <p className="text-gray-600 mt-2 text-lg sm:text-xl font-sans">
              Meet our valued partners and sponsors who make IndiaMet possible
            </p>
          </div>
        </Container>

        <div className="relative mt-8 w-full max-w-full overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="cursor-grab overflow-x-auto scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onWheel={handleWheel}
          >
            <div className="flex gap-6 pb-4" style={{ minWidth: 'max-content' }}>
              {emptyCards.map((index) => (
                <div
                  key={index}
                  className="flex flex-shrink-0 flex-col items-center"
                  style={{ minWidth: '180px', maxWidth: '180px' }}
                >
                  <div className="flex min-h-[100px] w-full items-center justify-center rounded-sm border border-gray-200 bg-[#FCF8F3] px-4 py-4 shadow-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
