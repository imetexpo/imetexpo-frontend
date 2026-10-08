'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import Container from '../ui/container';
import { navItems } from './navItems';

const innerPadding = 'px-[calc(1rem+1cm)] sm:px-[calc(1.5rem+1cm)] lg:px-[calc(2rem+1cm)] xl:px-[calc(3rem+1cm)]';

// ═══════════════════════════════════════════════════════════════
// NEW: Hook to preserve UTM params in navigation
// ═══════════════════════════════════════════════════════════════
function useUTMQueryString() {
  const searchParams = useSearchParams();
  
  if (!searchParams) return '';
  
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'];
  const utmPairs = utmKeys
    .map(key => {
      const val = searchParams.get(key);
      return val ? `${key}=${encodeURIComponent(val)}` : '';
    })
    .filter(Boolean);
  
  return utmPairs.length > 0 ? `?${utmPairs.join('&')}` : '';
}

// ═══════════════════════════════════════════════════════════════
// NEW: UTM-preserving Link component
// ═══════════════════════════════════════════════════════════════
function UTMLink({ href, className, children, ...props }: { href: string; className?: string; children: React.ReactNode; [key: string]: any }) {
  const utmQuery = useUTMQueryString();
  
  const isExternal = href.startsWith('http') || href.startsWith('#');
  if (isExternal) {
    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    );
  }

  const [withoutHash, hash] = href.split('#');
  const [rawPath, rawQuery] = withoutHash.split('?');
  const path = rawPath.endsWith('/') ? rawPath : `${rawPath}/`;
  const params = new URLSearchParams(rawQuery || '');

  if (utmQuery) {
    const utmParams = new URLSearchParams(utmQuery.replace(/^\?/, ''));
    utmParams.forEach((value, key) => {
      if (!params.has(key)) params.set(key, value);
    });
  }

  const query = params.toString();
  const finalHref = `${path}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;

  return (
    <Link href={finalHref} className={className} {...props}>
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const calculateTimeLeft = () => {
    const targetDate = new Date('2027-05-13T09:00:00').getTime();
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

  const handleMouseEnter = (title: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setOpenDropdown(title);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <div className="w-full bg-[#ffffff] text-[#020B43]">
        {/* TOP BAR */}
        <div>
          {/* Ticker strip */}
          <div className="bg-[#ffffff] w-full">
            <Container className="flex items-center justify-end py-1.5">
              <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-[#020B43]">
                <span>
                  <strong className="text-sm font-bold text-[#008738]">{String(timeLeft.days).padStart(2, '0')}</strong>{' '}
                  <span className="text-gray-300">Days</span>
                </span>
                <span className="text-white/30">|</span>
                <span>
                  <strong className="text-sm font-bold text-[#008738]">{String(timeLeft.hours).padStart(2, '0')}</strong>{' '}
                  <span className="text-gray-300">Hours</span>
                </span>
                <span className="text-white/30">|</span>
                <span>
                  <strong className="text-sm font-bold text-[#008738]">{String(timeLeft.minutes).padStart(2, '0')}</strong>{' '}
                  <span className="text-gray-300">Mins</span>
                </span>
              </div>
            </Container>
          </div>

         {/* Logo + date + nav items */}
<div className="w-full bg-[#ffffff]">
  <Container className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3 py-3.5">
    
    <div className="flex min-w-0 items-center gap-3 xl:gap-4">

      {/* Logo + Subtitle */}
<div className="flex shrink-0 flex-col items-center">
  <UTMLink href="/">
    <img
      src="/ITS_logo_white.png"
      alt="IndiaMet Expo"
      className="-mt-7 h-30 w-auto cursor-pointer object-contain sm:h-22"
    />
  </UTMLink>

  {/* Subtitle below logo */}
  {/* <p className="mt-3 max-w-[220px] text-center font-[var(--font-montserrat)] text-[11px] font-medium leading-tight tracking-wide text-white sm:max-w-none sm:whitespace-nowrap sm:text-[13px] xl:text-[13px]">
    International Metrology Exhibition & Summit
  </p> */}
</div>

      {/* Date + Venue */}
      <div className="mt-7 hidden shrink-0 pl-2 sm:block xl:pl-4">
        <h1 className="font-[var(--font-montserrat)] text-lg font-bold leading-none tracking-tight text-[#020B43] xl:text-[22px]">
          13 - 15 May  2027
        </h1>

        <p className="mt-1 font-[var(--font-montserrat)] text-sm text-[#020B43] xl:text-[18px]">
          Auto Cluster Exhibition Center
        </p>

        <p className="font-[var(--font-montserrat)] text-sm text-[#020B43] xl:text-[18px]">
          Pune, India
        </p>
      </div>

    </div>

    <nav
      aria-label="Primary"
      className="mt-6 flex min-w-0 flex-[1_1_20rem] flex-wrap items-center justify-end gap-x-2 gap-y-1 sm:mt-8 lg:mt-10 xl:mt-14 xl:gap-x-4 2xl:mt-14 2xl:flex-[1_1_auto] 2xl:flex-nowrap 2xl:gap-x-8"
    >
      {navItems.map((item, index) => {
        const hasLinks = Boolean(item.links && item.links.length > 0);
        const alignRight = index >= navItems.length - 3;
        return (
        <div
          key={item.title}
          className="relative"
          onMouseEnter={() => hasLinks && handleMouseEnter(item.title)}
          onMouseLeave={handleMouseLeave}
        >
          {hasLinks ? (
            <>
              <button
                type="button"
                aria-expanded={openDropdown === item.title}
                aria-haspopup="true"
                onClick={() =>
                  setOpenDropdown((current) => (current === item.title ? null : item.title))
                }
                className="flex items-center gap-0.5 whitespace-nowrap py-1.5 text-[11px] transition-colors hover:text-[#008738] lg:text-xs xl:gap-1 xl:py-2 xl:text-sm 2xl:text-base"
              >
                {item.title}
                <ChevronDown
                  className={`h-3 w-3 shrink-0 transition-transform duration-200 ${
                    openDropdown === item.title ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openDropdown === item.title && (
                <div
                  className={`absolute top-full z-50 w-56 max-w-[min(14rem,calc(100vw-1.5rem))] rounded-md border border-gray-700 bg-[#021533] shadow-lg ${
                    alignRight ? 'right-0' : 'left-0'
                  }`}
                  onMouseEnter={() => handleMouseEnter(item.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="py-2">
                    {item.links.map((link) => (
                      <UTMLink
                        key={link.text}
                        href={link.href}
                        className="block px-4 py-2 text-sm hover:bg-[#008738] hover:text-white transition-colors"
                      >
                        {link.text}
                      </UTMLink>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <UTMLink
              href={item.href || '#'}
              className="block whitespace-nowrap py-1.5 text-[11px] transition-colors hover:text-[#008738] lg:text-xs xl:py-2 xl:text-sm 2xl:text-base"
            >
              {item.title}
            </UTMLink>
          )}
        </div>
        );
      })}
    </nav>
  </Container>
</div>
        </div>
    </div>
  );
}