'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from '../common/MobileMenu';
import Navbar from '../common/Navbar';

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const mobileHeaderRef = useRef<HTMLDivElement>(null);
  const [desktopNavHeight, setDesktopNavHeight] = useState(isHomePage ? 129 : 104);
  const [mobileHeaderHeight, setMobileHeaderHeight] = useState(isHomePage ? 105 : 80);

  useEffect(() => {
    const el = desktopNavRef.current;
    if (!el) return;

    const updateHeight = () => {
      const height = el.offsetHeight;
      if (height > 0) {
        setDesktopNavHeight(height);
        document.documentElement.style.setProperty('--site-header-height', `${height}px`);
      }
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = mobileHeaderRef.current;
    if (!el) return;

    const updateHeight = () => {
      const height = el.offsetHeight;
      if (height > 0) {
        setMobileHeaderHeight(height);
        document.documentElement.style.setProperty('--mobile-header-height', `${height}px`);
      }
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop â€” full navbar stays at the top while scrolling */}
      <div ref={desktopNavRef} className="hidden lg:block fixed top-0 left-0 w-full z-100">
        <Navbar />
        {isHomePage && (
          <div
            aria-hidden="true"
            className="h-[25px] w-full"
            style={{ background: 'linear-gradient(to right, #020B43, #008738)' }}
          />
        )}
      </div>
      {!isHomePage && (
        <div
          className="hidden lg:block shrink-0"
          style={{ height: desktopNavHeight }}
          aria-hidden="true"
        />
      )}

      <div
        ref={mobileHeaderRef}
        className="lg:hidden fixed top-0 left-0 w-full z-[60] bg-[#020B43] shadow-lg"
      >
        <div className="px-3 py-3 sm:px-4">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Image
                src="/footer_logo.png"
                alt="IndiaMet Expo"
                width={270}
                height={100}
                className="h-14 w-auto max-w-[160px] object-contain sm:h-16 sm:max-w-[180px]"
              />
            </Link>

            <div className="ml-3 hidden min-w-0 flex-1 text-[10px] leading-tight text-gray-300 sm:block">
              <p className="font-semibold text-white">13 - 15 May 2027</p>
              <p>Auto Cluster Exhibition Center</p>
              <p>Pune, India</p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Link
                href="/login/"
                className="bg-[#008738] text-white px-4 py-1.5 text-sm border border-white/20
                hover:bg-[#008738] hover:text-[#020B43] transition-all duration-300 rounded-sm"
              >
                Login
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-white/10 rounded-sm transition cursor-pointer"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X size={32} className="text-[#008738]" />
                ) : (
                  <Menu size={32} className="text-[#008738]" />
                )}
              </button>
            </div>
          </div>
        </div>
        {isHomePage && (
          <div
            aria-hidden="true"
            className="h-[25px] w-full"
            style={{ background: 'linear-gradient(to right, #020B43, #008738)' }}
          />
        )}
      </div>

      {/* Mobile spacer to prevent page content underlap */}
      <div className="lg:hidden shrink-0" style={{ height: mobileHeaderHeight }} aria-hidden="true" />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        topOffset={mobileHeaderHeight}
      />
    </>
  );
}
