'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  {
    title: 'About',
    links: [
      { text: 'About IndiaMet Expo', href: '/about/' },
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
      { text: 'Advertising Opportunities', href: '/sponsorship-opportunities/' },
      { text: 'View Exhibitor List 2026', href: '/exhibition-directory/' },
    ],
  },
  {
    title: 'Attend',
    links: [
      { text: 'Why Visit', href: '/why-visit/' },
      { text: 'Visitor Pass', href: '/passes/' },
      { text: 'Event Sectors', href: '/sectors/' },
      { text: 'Summit', href: '/summit/' },
      { text: 'Become a Delegate', href: '/became-delegate/' },
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
    ],
  },
  
  { title: 'Conference', href: '/summit/', links: [] },
  { title: 'Awards', href: '/awards/', links: [] },
  { title: 'Contact us', href: '/contact-us/', links: [] },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleDropdown = (title: string) => {
    if (openDropdown === title) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(title);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-[#03193D]/60 z-40 lg:hidden transition-opacity duration-300" 
        onClick={onClose} 
      />
      
      {/* Floating Rounded Menu Card */}
      <div className="fixed top-[160px] left-4 right-4 bottom-4 bg-[#03193D] border border-neutral-900 z-45 shadow-2xl overflow-y-auto rounded-[28px] p-6 text-white lg:hidden flex flex-col justify-between font-sans transition-all duration-300 animate-slide-up no-scrollbar">
        
        {/* Main Content Area */}
        <div className="flex-1">
          {/* Label */}
          <div className="text-[11px] font-sans font-semibold uppercase tracking-wider text-neutral-500 mb-5 pl-1">
            Main menu
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col">
            {navItems.map((item) => {
              const hasLinks = item.links && item.links.length > 0;
              const isDropdownOpen = openDropdown === item.title;
              return (
                <div key={item.title} className="border-b border-neutral-900 py-3">
                  {hasLinks ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.title)}
                        className="w-full flex items-center justify-between py-2 text-white transition-colors cursor-pointer group"
                      >
                        <span className="font-bold text-white text-lg sm:text-xl font-sans tracking-tight group-hover:text-[#CC9808] transition-colors">
                          {item.title}
                        </span>
                        <span className="text-2xl text-neutral-400 font-light pr-1 select-none leading-none">
                          {isDropdownOpen ? '−' : '+'}
                        </span>
                      </button>
                      
                      {isDropdownOpen && (
                        <div className="mt-2 mb-3 pl-2 flex flex-col gap-3 transition-all duration-300">
                          {item.links.map((link) => (
                            <Link
                              key={link.text}
                              href={link.href}
                              onClick={onClose}
                              className="block text-[15px] text-gray-300 hover:text-[#CC9808] font-sans font-medium transition-colors"
                            >
                              {link.text}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <Link
                        href={item.href || '#'}
                        onClick={onClose}
                        className="block py-2 font-bold text-white text-lg sm:text-xl font-sans tracking-tight hover:text-[#CC9808] transition-colors"
                      >
                        {item.title}
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button at the Bottom */}
        <div className="mt-8 pt-4">
          <Link
            href="/exhibiting-enquiry/"
            onClick={onClose}
            className="block w-full text-center bg-[#CC9808] border border-[#CC9808] hover:bg-[#03193D] text-white py-3.5 text-sm font-bold uppercase tracking-widest transition-all duration-300 rounded-sm font-bebas"
          >
            Exhibit
          </Link>
        </div>
      </div>

      <style jsx>{`
        .font-bebas { font-family: 'Bebas Neue', cursive; }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slideUp {
          from {
            transform: translateY(15px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
}