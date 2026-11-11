// app/dashboard/layout.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  HomeIcon,
  UserIcon,
  MapIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  BookOpenIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  CreditCardIcon,
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import LoadingDots from '@/components/ui/LoadingDots';

type NavItem = {
  name: string;
  href?: string;
  icon: any;
  children?: Array<{ name: string; href: string }>;
};

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Company Profile', href: '/dashboard/exhibitor', icon: UserIcon },
  { name: 'Invoices', href: '/dashboard/invoice', icon: DocumentTextIcon },
  { name: 'Floor Layout', href: '/dashboard/layout', icon: MapIcon },
  { name: 'My Stalls', href: '/dashboard/stall', icon: ShoppingCartIcon },
  {
    name: 'Payment',
    icon: CreditCardIcon,
    children: [
      { name: 'Stall Payment', href: '/dashboard/payment/stall' },
      { name: 'Payment Remainders', href: '/dashboard/payment/remainders' },
    ],
  },
  { name: 'Products', href: '/dashboard/products', icon: DocumentTextIcon },
  { name: 'Brands', href: '/dashboard/brands', icon: DocumentTextIcon },
  { name: 'Brochures', href: '/dashboard/brochures', icon: DocumentTextIcon },
  { name: 'Requirements', href: '/dashboard/requirements', icon: CogIcon },
  { name: 'Team Members', href: '/dashboard/team', icon: UserGroupIcon },
  { name: 'Exhibitor Manual', href: '/dashboard/manual', icon: BookOpenIcon },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const [openMenus, setOpenMenus] = useState<string[]>(
    pathname.startsWith('/dashboard/payment') ? ['Payment'] : []
  );

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('tyre_expo_token') || localStorage.getItem('exhibitorToken');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  // Check if window is defined (client-side only)
  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const handleLogout = () => {
    // Clear all localStorage items
    localStorage.removeItem('tyre_expo_token');
    localStorage.removeItem('exhibitorToken');
    localStorage.removeItem('exhibitorData');
    localStorage.removeItem('tyre_exhibitor_data');
    localStorage.removeItem('remember_me');
    localStorage.removeItem('last_invoice_id');
    localStorage.removeItem('last_requirements_id');

    // Redirect to login page
    router.push('/login');
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingDots className="mx-auto flex" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const isOpen = isMobile ? mobileOpen : sidebarOpen;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full bg-white shadow-2xl transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'
          }`}
      >
        {/* Logo */}
        <div className={`flex h-16 items-center justify-between border-b border-gray-100 px-4 ${!isOpen && 'justify-center'}`}>
          {isOpen ? (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-orange-500">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
                </svg>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Indiamet Expo
              </span>
            </div>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-orange-500">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
              </svg>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="hidden lg:block text-gray-400 hover:text-gray-600"
          >
            {isOpen ? <ChevronLeftIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3 space-y-1">
          {navigation.map((item) => {
            if (item.children) {
              const childActive = item.children.some(
                (child) => pathname === child.href || pathname.startsWith(`${child.href}/`)
              );
              const expanded = openMenus.includes(item.name) || childActive;

              return (
                <div key={item.name} className="mb-1">
                  <button
                    type="button"
                    onClick={() => toggleMenu(item.name)}
                    className={`group flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                      childActive
                        ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } ${!isOpen && 'justify-center'}`}
                  >
                    <item.icon
                      className={`h-5 w-5 ${!isOpen ? 'mr-0' : 'mr-3'} ${
                        childActive ? 'text-amber-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    {isOpen && (
                      <>
                        <span className="flex-1 text-left">{item.name}</span>
                        <ChevronDownIcon
                          className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                        />
                      </>
                    )}
                  </button>
                  {isOpen && expanded && (
                    <div className="mt-1 space-y-1 pl-9">
                      {item.children.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => isMobile && setMobileOpen(false)}
                            className={`block rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${
                              isChildActive
                                ? 'bg-amber-100/80 font-semibold text-amber-900'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            {child.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href || '#'}
                onClick={() => isMobile && setMobileOpen(false)}
                className={`group mb-1 flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } ${!isOpen && 'justify-center'}`}
              >
                <item.icon
                  className={`h-5 w-5 ${!isOpen ? 'mr-0' : 'mr-3'} ${
                    isActive ? 'text-amber-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {isOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className={`absolute bottom-0 left-0 right-0 border-t border-gray-100 p-4 ${!isOpen && 'text-center'}`}>
          <button
            onClick={handleLogout}
            className={`flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 ${!isOpen && 'justify-center'
              }`}
          >
            <ArrowRightOnRectangleIcon className={`h-5 w-5 ${!isOpen ? 'mr-0' : 'mr-3'}`} />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#003A77]/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isOpen && !isMobile ? 'lg:pl-64' : isOpen && isMobile ? 'pl-0' : 'lg:pl-20'}`}>
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              onClick={toggleSidebar}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center gap-4">
              <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100">
                <BellIcon className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">TE</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-700">Tyre Expo</p>
                  <p className="text-xs text-gray-500">Exhibitor Portal</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}