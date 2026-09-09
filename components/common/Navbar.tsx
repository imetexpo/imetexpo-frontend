'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import Container from '../ui/container';

const navItems = [
  {
    title: 'About',
    links: [
      { text: 'About IndiaMet Expo', href: '/about/' },
      { text: 'About The Organizer', href: '/about-organizer/' },
      { text: 'Partners & Sponsors', href: '/partners-and-sponsors/' },
    ],
  },
  {
    title: 'Exhibit',
    links: [
      { text: 'Why Exhibit', href: '/why-exhibit/' },
      { text: 'Event Sectors', href: '/sectors/' },
      { text: 'Plan Your Travel', href: '/plan-your-travel/' },
      { text: 'Exhibitor Resource Center', href: '/exhibitor-resource-center/' },
      { text: 'Become an Exhibitor', href: '/exhibiting-enquiry/' },
      { text: 'Sponsorship Opportunities', href: '/sponsorship-opportunities/' },
      { text: 'View Exhibitor List 2026', href: '/exhibition-directory/' },
    ],
  },
  {
    title: 'Visit',
    links: [
      { text: 'Why Visit', href: '/why-visit/' },
      { text: 'Visitor Pass', href: '/passes/' },
      { text: 'Event Sectors', href: '/sectors/' },
      { text: 'Summit', href: '/summit/' },
      { text: 'Become a Delegate', href: '/became-delegate/' },
            { text: 'Exhibitor List', href: '/exhibition-directory/' },
      {text: 'Download Brochure', href: '/register?t=brochure'}
    ],
  },
  {
    title: 'Insights',
    links: [
      { text: 'Articles and Latest News', href: '/articles/' },
      { text: 'Event Brochure', href: '/event-brochure/' },
         ],
  },
  {
    title: 'Summit',
    links: [
      { text: 'Summit Agenda', href: '/summit/' },
     
      { text: 'Deligate', href: '/became-delegate' },
      { text: 'Sponsor', href: '/register?t=sponsor' },
      
    ],
  },




  {
    title: 'GMEA Awards',
    links: [
      { text: 'Award Category', href: '/awards/' },
     
      { text: 'Nominate', href: '/nominate/' },
      { text: 'Sponsor', href: '/register?t=sponsor' },
      
    ],
  },
  { title: 'Contact us', href: '/contact-us/', links: [] },
  
];

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

  const handleMouseEnter = (title: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setOpenDropdown(title);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <div className="w-full bg-[#03193D] text-white">
        {/* TOP BAR */}
        <div>
          {/* Ticker strip */}
          <div className="bg-[#03193D] w-full">
            <Container className="flex items-center justify-end py-1.5">
              <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-white">
                <span>
                  <strong className="text-sm font-bold text-[#CC9808]">{String(timeLeft.days).padStart(2, '0')}</strong>{' '}
                  <span className="text-gray-300">Days</span>
                </span>
                <span className="text-white/30">|</span>
                <span>
                  <strong className="text-sm font-bold text-[#CC9808]">{String(timeLeft.hours).padStart(2, '0')}</strong>{' '}
                  <span className="text-gray-300">Hours</span>
                </span>
                <span className="text-white/30">|</span>
                <span>
                  <strong className="text-sm font-bold text-[#CC9808]">{String(timeLeft.minutes).padStart(2, '0')}</strong>{' '}
                  <span className="text-gray-300">Mins</span>
                </span>
              </div>
            </Container>
          </div>

          {/* Logo + buttons */}
          <div className="w-full bg-[#03193D]">
            <Container className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-4">
                <UTMLink href="/">
                  <img
                    src="/ITS_logo_white.png"
                    alt="IndiaMet Expo"
                    className="h-20 sm:h-22 w-auto cursor-pointer object-contain"
                  />
                </UTMLink>
                <div className="hidden sm:block border-l border-white/20 pl-4">
                  <h1 className="font-[var(--font-montserrat)] text-[18px] tracking-tight text-white leading-none">
                   22 - 24 APRIL 2027
                  </h1>
                  <p className="font-[var(--font-montserrat)] text-[18px] text-white-300 mt-1">
                    Auto Cluster Exhibition Center • Pune, India
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex gap-3">
                <UTMLink
                  href="/exhibiting-enquiry/"
                  className="bg-[#CC9808] hover:bg-[#FFD154] text-white text-center px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap rounded-sm"
                >
                  Exhibit
                </UTMLink>
                <UTMLink
                  href="/visitor-registration/"
                  className="bg-[#CC9808] hover:bg-[#FFD154] text-white text-center px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap rounded-sm"
                >
                  Register
                </UTMLink>
              </div>
            </Container>
          </div>
        </div>

        {/* NAV ROW */}
        <div className="border-t border-white/10 bg-[#021533]/90 backdrop-blur-md">
          <Container className="flex items-center py-1 min-h-[44px]">
            <div className="hidden lg:flex flex-1 items-center justify-end gap-4 pr-56 xl:gap-8 xl:pr-80">
              {navItems.map((item) => (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => item.links && item.links.length > 0 && handleMouseEnter(item.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.links && item.links.length > 0 ? (
                    <>
                      <button className="flex items-center gap-1 text-sm xl:text-base hover:text-[#CC9808] transition-colors whitespace-nowrap py-2">
                        {item.title}
                        <ChevronDown
                          className={`h-3 w-3 transition-transform duration-200 ${
                            openDropdown === item.title ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openDropdown === item.title && (
                        <div
                          className="absolute left-0 top-full z-50 w-56 rounded-md bg-[#021533] shadow-lg border border-gray-700"
                          onMouseEnter={() => handleMouseEnter(item.title)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="py-2">
                            {item.links.map((link) => (
                              <UTMLink
                                key={link.text}
                                href={link.href}
                                className="block px-4 py-2 text-sm hover:bg-[#CC9808] hover:text-white transition-colors"
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
                      className="text-sm xl:text-base hover:text-[#CC9808] transition-colors whitespace-nowrap block py-2"
                    >
                      {item.title}
                    </UTMLink>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </div>
    </div>
  );
}