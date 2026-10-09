'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { navItems } from './navItems';


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
function UTMLink({ href, className, children, ...props }: { href: string; className?: string; children: React.ReactNode; onClick?: React.MouseEventHandler<HTMLAnchorElement>; target?: string; rel?: string }) {
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

  useEffect(() => () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
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
         {/* Logo + date + nav items */}
<div className="w-full bg-[#ffffff]">
  <div className="mx-auto flex w-full max-w-[2560px] flex-nowrap items-center justify-between gap-4 px-4 py-3 lg:px-6 xl:px-10">
    
    <div className="flex min-w-0 items-center gap-3 xl:gap-5">

      {/* Logo + Subtitle */}
<div className="flex shrink-0 flex-col items-center">
  <UTMLink href="/">
    <Image
      src="/ITS_logo_white.png"
      alt="IndiaMet Expo"
      width={270}
      height={100}
      className="h-16 w-auto cursor-pointer object-contain xl:h-20"
    />
  </UTMLink>

  {/* Subtitle below logo */}
  {/* <p className="mt-3 max-w-[220px] text-center font-[var(--font-montserrat)] text-[11px] font-medium leading-tight tracking-wide text-white sm:max-w-none sm:whitespace-nowrap sm:text-[13px] xl:text-[13px]">
    International Metrology Exhibition & Summit
  </p> */}
</div>

      {/* Date + Venue */}
      <div className="hidden shrink-0 lg:block">
        <h1 className="font-[var(--font-montserrat)] whitespace-nowrap text-sm font-bold leading-tight tracking-tight text-[#020B43] xl:text-base">
          13 - 15 May  2027
        </h1>

        <p className="mt-0.5 whitespace-nowrap font-[var(--font-montserrat)] text-[11px] leading-tight text-[#020B43] xl:text-xs">
          Auto Cluster Exhibition Center
        </p>

        <p className="font-[var(--font-montserrat)] text-[11px] leading-tight text-[#020B43] xl:text-xs">
          Pune, India
        </p>
      </div>

    </div>

    <nav
      aria-label="Primary"
      className="flex shrink-0 flex-nowrap items-center justify-end uppercase gap-3 xl:gap-5 2xl:gap-7"
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
                className="flex items-center gap-0.5 whitespace-nowrap py-1.5 text-[11px] transition-colors hover:text-[#008738] lg:text-xs xl:gap-1 xl:text-sm"
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
                  className={`absolute top-full z-50 w-56 max-w-[min(14rem,calc(100vw-1.5rem))] rounded-md border border-gray-700 bg-[#021533] text-white shadow-lg ${
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
              className="block whitespace-nowrap py-1.5 text-[11px] transition-colors hover:text-[#008738] lg:text-xs xl:text-sm"
            >
              {item.title}
            </UTMLink>
          )}
        </div>
        );
      })}
    </nav>
  </div>
</div>
        </div>
    </div>
  );
}