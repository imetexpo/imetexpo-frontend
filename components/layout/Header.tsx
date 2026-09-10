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
  const [desktopNavHeight, setDesktopNavHeight] = useState(220);
  const [mobileHeaderHeight, setMobileHeaderHeight] = useState(110);

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
      {/* Desktop — full navbar stays at the top while scrolling */}
      <div ref={desktopNavRef} className="hidden lg:block fixed top-0 left-0 w-full z-100">
        <Navbar />
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
        className="lg:hidden fixed top-0 left-0 w-full z-[60] bg-[#03193D] shadow-lg"
      >
        <div className="px-4 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wider text-gray-300">
          22–24 April 2027 • Auto Cluster Exhibition Center, Pune, India
        </div>
        <div className="border-t border-white/10 px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Image
                src="/ITS_logo_white.png"
                alt="IndiaMet Expo"
                width={270}
                height={100}
                className="object-contain w-[150px] sm:w-[180px] h-auto"
              />
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/login/"
                className="bg-[#CC9808] text-white px-4 py-1.5 text-sm border border-white/20
                hover:bg-[#CC9808] hover:text-[#03193D] transition-all duration-300 rounded-sm"
              >
                Login
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1 hover:bg-white/10 rounded-sm transition cursor-pointer"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X size={32} className="text-[#CC9808]" />
                ) : (
                  <Menu size={32} className="text-[#CC9808]" />
                )}
              </button>
            </div>
          </div>
        </div>
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