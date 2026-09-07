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
      { text: 'About India Tyre Show', href: '/about/' },
      { text: 'About ITE', href: '/about-ite/' },
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
      { text: 'Advertising Opportunities', href: '/advertising-details/' },
      { text: 'View Exhibitor List 2026', href: '/exhibition-directory/' },
    ],
  },
  {
    title: 'Attend',
    links: [
      { text: 'Why Visit', href: '/why-visit/' },
      { text: 'Event Sectors', href: '/sectors/' },
      { text: 'Conference Programme', href: '/conference-programme/' },
      { text: 'Partners and Sponsors', href: '/partners-and-sponsors/' },
    ],
  },
  {
    title: 'Insights',
    links: [
      { text: 'Articles and Latest News', href: '/articles/' },
      { text: 'Why India Report', href: '/insights/' },
      { text: 'Event Brochure', href: '/event-brochure/' },
      { text: 'Post-Show Report', href: '/post-show-report/' },
      { text: 'Media Gallery', href: '/media-gallery/' },
      { text: 'Conference Programme', href: '/conference-programme/' },
    ],
  },
  { title: 'Contact us', href: '/contact-us/', links: [] },
  { title: 'Conference', href: '/conference/', links: [] },
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

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState('none');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollY(currentY);

      if (currentY > lastScrollY && currentY > 50) {
        setScrollDirection('down');
      } else if (currentY < lastScrollY) {
        setScrollDirection('up');
      }

      lastScrollY = currentY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollDirection, scrollY };
}

// ═══════════════════════════════════════════════════════════════
// NEW: UTM-preserving Link component
// ═══════════════════════════════════════════════════════════════
function UTMLink({ href, className, children, ...props }: { href: string; className?: string; children: React.ReactNode; [key: string]: any }) {
  const utmQuery = useUTMQueryString();
  
  // Don't append UTMs to external links or anchors
  const isExternal = href.startsWith('http') || href.startsWith('#');
  const finalHref = isExternal ? href : `${href.replace(/\/?$/, '/')}${utmQuery}`;
  
  return (
    <Link href={finalHref} className={className} {...props}>
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollDirection, scrollY } = useScrollDirection();

  const isScrolled = scrollY > 80;
  const showTopBar = !isScrolled || scrollDirection === 'up';
  const showLogo = isScrolled && scrollDirection === 'down';

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
    <>
      <div className="fixed top-0 w-full left-0 right-0 z-50 bg-[#03193D] text-white">

        {/* TOP BAR */}
        <div
          style={{
            maxHeight: showTopBar ? '140px' : '0px',
            opacity: showTopBar ? 1 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.45s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s ease',
          }}
        >
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
                    alt="India Tyre Show"
                    className="h-10 sm:h-12 w-auto cursor-pointer object-contain"
                  />
                </UTMLink>
                <div className="hidden sm:block border-l border-white/20 pl-4">
                  <h1 className="font-[var(--font-montserrat)] text-[28px] font-semibold tracking-tight text-white leading-none">
                    India Tyre Show
                  </h1>
                  <p className="font-[var(--font-montserrat)] text-[12px] text-gray-300 mt-1">
                    22–24 April 2026 • Mumbai, India
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex gap-3">
                <UTMLink
                  href="/exhibiting-enquiry/"
                  className="bg-[#CC9808] hover:bg-[#d67300] text-white text-center px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap rounded-sm"
                >
                  Exhibit
                </UTMLink>
                <UTMLink
                  href="/visitor-registration/"
                  className="bg-[#CC9808] hover:bg-[#d67300] text-white text-center px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap rounded-sm"
                >
                  Register
                </UTMLink>
              </div>
            </Container>
          </div>
        </div>

        {/* NAV ROW */}
        <div className="border-t border-white/10 bg-[#03193D]/90 backdrop-blur-md">
          <Container className="flex items-center py-1 min-h-[44px]">
            <div
              style={{
                width: showLogo ? '44px' : '0px',
                opacity: showLogo ? 1 : 0,
                marginRight: showLogo ? '14px' : '0px',
                flexShrink: 0,
                overflow: 'hidden',
                transition: 'width 0.45s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s ease, margin-right 0.45s ease',
              }}
            >
              <UTMLink href="/">
                <img
                  src="/ITS_logo_white.png"
                  alt="India Tyre Show"
                  style={{ height: '30px', width: 'auto', display: 'block', minWidth: '32px' }}
                />
              </UTMLink>
            </div>

            <div className="hidden lg:flex items-center gap-4 xl:gap-8 flex-1">
              {navItems.map((item) => (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => item.links && item.links.length > 0 && handleMouseEnter(item.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.links && item.links.length > 0 ? (
                    <>
                      <button className="flex items-center gap-1 text-sm xl:text-base hover:text-orange-500 transition-colors whitespace-nowrap py-2">
                        {item.title}
                        <ChevronDown
                          className={`h-3 w-3 transition-transform duration-200 ${
                            openDropdown === item.title ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openDropdown === item.title && (
                        <div
                          className="absolute left-0 top-full z-50 w-56 rounded-md bg-[#1e1e1e] shadow-lg border border-gray-700"
                          onMouseEnter={() => handleMouseEnter(item.title)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="py-2">
                            {item.links.map((link) => (
                              <UTMLink
                                key={link.text}
                                href={link.href}
                                className="block px-4 py-2 text-sm hover:bg-orange-500 hover:text-white transition-colors"
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
                      className="text-sm xl:text-base hover:text-orange-500 transition-colors whitespace-nowrap block py-2"
                    >
                      {item.title}
                    </UTMLink>
                  )}
                </div>
              ))}
            </div>

            <div
              style={{
                maxWidth: isScrolled ? '100px' : '0px',
                opacity: showLogo ? 1 : 0,
                overflow: 'hidden',
                marginLeft: 'auto',
                transition: 'max-width 0.45s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s ease',
              }}
            >
              <UTMLink
                href="/login/"
                className="bg-[#CC9808] font-bold uppercase tracking-wider text-white px-4 py-2 text-xs 
                  hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap inline-block rounded-sm"
              >
                Login
              </UTMLink>
            </div>
          </Container>
        </div>
      </div>

      <div className="h-[125px] lg:h-[135px]" />
    </>
  );
}