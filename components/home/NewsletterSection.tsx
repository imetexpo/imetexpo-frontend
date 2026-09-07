'use client';

import { Button } from '../ui/button';
import Container from '../ui/container';

export default function NewsletterSection() {
  return (
    <section className="bg-[#03193D] py-16 sm:py-20 lg:py-24 text-white border-t border-white/10">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10">
          <div className="max-w-[900px] text-center lg:text-left">
            <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white leading-tight uppercase tracking-tight">
              JOIN OUR NEWSLETTER
            </h2>
            <p className="text-gray-400 mt-4 text-sm sm:text-base md:text-lg leading-relaxed font-sans">
              Don&apos;t miss out on the latest with our weekly newsletter, bringing you not only 
              the latest updates from the event but also cutting-edge insights from the entire industry.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Button
              href="/newsletter/"
              className="bg-[#CC9808] hover:bg-white hover:text-[#03193D] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm w-full sm:w-auto text-center"
            >
              SIGN UP TODAY
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}