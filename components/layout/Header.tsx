'use client';

import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from '../common/MobileMenu';
import Navbar from '../common/Navbar';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic countdown timer calculation for Mobile header
  const calculateTimeLeft = () => {
    const targetDate = new Date('2027-04-22T09:00:00').getTime();
    const diff = targetDate - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ✅ Desktop — Navbar handles ALL scroll logic internally */}
      <div className="hidden lg:block fixed top-0 left-0 w-full z-100">
        <Navbar />
      </div>

      {/* ✅ Mobile Countdown Banner (Brown bar at top-0 - 2 rows matching reference) */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-[#03193D] z-50 py-2 px-4 shadow-sm border-b border-black/10">
        <div className="flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold uppercase tracking-wider text-white text-center font-sans">
          <div className="text-[10px] text-gray-300 tracking-wide">
            22–24 April 2027 • Auto Cluster Exhibition Center, Pune, India
          </div>
          <div className="flex items-center gap-2.5 justify-center mt-0.5">
            <span>
              <strong className="text-[11px] font-bold text-[#CC9808]">{String(timeLeft.days).padStart(2, '0')}</strong>{' '}
              <span className="text-gray-305 text-[10px]">Days</span>
            </span>
            <span className="text-white/20">|</span>
            <span>
              <strong className="text-[11px] font-bold text-[#CC9808]">{String(timeLeft.hours).padStart(2, '0')}</strong>{' '}
              <span className="text-gray-305 text-[10px]">Hours</span>
            </span>
            <span className="text-white/20">|</span>
            <span>
              <strong className="text-[11px] font-bold text-[#CC9808]">{String(timeLeft.minutes).padStart(2, '0')}</strong>{' '}
              <span className="text-gray-305 text-[10px]">Mins</span>
            </span>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Header (starts right below the brown ticker at top-[42px]) */}
      <div className="lg:hidden bg-[#03193D] border-b border-white/10 px-4 py-3 fixed top-[42px] left-0 w-full z-50 shadow-lg">
        <div className="flex items-center justify-between">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <Image
              src="/ITS_logo_white.png"
              alt="India Tyre Show"
              width={270}
              height={100}
              className="object-contain w-[100px] sm:w-[120px] h-auto"
            />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login/"
              className="bg-[#CC9808] text-white px-3 py-1 text-xs border border-white/20
              hover:bg-[#CC9808] hover:text-[#03193D] transition-all duration-300 rounded-sm"
            >
              Login
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 hover:bg-white/10 rounded-sm transition cursor-pointer"
            >
              <Menu size={28} className="text-[#CC9808]" />
            </button>
          </div>
        </div>

        <div className="flex gap-3 mt-3">
          <Link
            href="/exhibiting-enquiry/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex-1 bg-[#CC9808] text-white text-center py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#cc7000] transition rounded-sm"
          >
            Exhibit
          </Link>
          <Link
            href="/visitor-registration/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex-1 bg-[#CC9808] text-white text-center py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#cc7000] transition rounded-sm"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Mobile spacer to prevent page content underlap */}
      <div className="lg:hidden h-[160px]" />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}