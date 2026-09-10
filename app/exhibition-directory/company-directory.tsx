'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Loader2, X } from 'lucide-react';
import BackToTop from '@/components/layout/BackToTop';
import Container from '@/components/ui/container';
import CompanyGrid from './company-grid';
import { fetchExhibitionCompanies, ExhibitionCompany, generateSlug } from '@/lib/api/exhibitorClient';
import PageHero from '@/components/layout/PageHero';

export default function CompanyDirectory() {
  const router = useRouter();
  const [companies, setCompanies] = useState<ExhibitionCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'gallery' | 'list'>('grid');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const companiesPerPage = 24;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const loadCompanies = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchExhibitionCompanies(currentPage, companiesPerPage, searchQuery);
        setCompanies(result.companies);
        setTotalPages(result.totalPages);
      } catch (err) {
        setError('Failed to load exhibitors. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      loadCompanies();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [currentPage, searchQuery]);

  const filteredCompanies = selectedLetter
    ? companies.filter((company) => company.name?.toUpperCase().startsWith(selectedLetter))
    : companies;

  const handleProductBrochure = (companyId: string, companyName: string) => {
    const company = companies.find((c) => c.id === companyId);
    const slug = company?.slug || generateSlug(companyName);
    router.push(`/exhibition-directory/${slug}`);
  };

  const getPaginationRange = () => {
    if (isMobile) {
      const start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPages, start + 1);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }

    const maxPages = 5;
    let start = Math.max(1, currentPage - Math.floor(maxPages / 2));
    const end = Math.min(totalPages, start + maxPages - 1);

    if (end - start + 1 < maxPages) {
      start = Math.max(1, end - maxPages + 1);
    }

    return Array.from({ length: Math.min(maxPages, totalPages) }, (_, i) => start + i);
  };

  if (loading && companies.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FCF8F3] font-sans">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-[#CC9808]" />
          <p className="text-sm text-gray-600">Loading exhibitors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="intro-animation min-h-screen bg-white font-sans">
      <PageHero
        title="EXHIBITOR"
        accent="LIST"
        subtitle="Explore participating companies and innovators exhibiting at INDIAMET Expo."
      >
        <Link
          href="/exhibiting-enquiry/"
          className="inline-block rounded-sm bg-[#CC9808] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#FFD154]"
        >
          Exhibit at INDIAMET Expo →
        </Link>
      </PageHero>

      {error && (
        <div className="mx-auto max-w-7xl px-4 pt-6">
          <div className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        </div>
      )}

      <main className="pb-16 pt-8">
        <Container>
          <div className="mb-6 md:mb-8">
            <div className="mb-4 flex flex-wrap gap-1.5 sm:gap-2">
              <button
                onClick={() => {
                  setSelectedLetter(null);
                  setCurrentPage(1);
                }}
                className={`cursor-pointer rounded-sm px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors sm:px-4 ${
                  !selectedLetter
                    ? 'border border-[#CC9808] bg-[#CC9808] text-white'
                    : 'border border-gray-300 bg-white text-slate-800 hover:bg-slate-100'
                }`}
              >
                All
              </button>

              <div className="flex flex-wrap gap-1">
                {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                  <button
                    key={letter}
                    onClick={() => {
                      setSelectedLetter(letter);
                      setCurrentPage(1);
                    }}
                    className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm border text-xs font-bold uppercase tracking-wider transition-colors sm:h-9 sm:w-9 ${
                      selectedLetter === letter
                        ? 'border-[#CC9808] bg-[#CC9808] text-white'
                        : 'border-gray-300 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-500">
              Showing {filteredCompanies.length} companies {selectedLetter && `starting with "${selectedLetter}"`}
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by company name or sector..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-sm border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm focus:border-[#CC9808] focus:outline-none focus:ring-1 focus:ring-[#CC9808]"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="mb-6 flex justify-end gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`cursor-pointer rounded-sm p-2 transition-colors ${
                viewMode === 'grid'
                  ? 'border border-[#CC9808] bg-[#CC9808] text-white'
                  : 'border border-gray-300 bg-white text-slate-600'
              }`}
              aria-label="Grid view"
            >
              <GridIcon />
            </button>
            <button
              onClick={() => setViewMode('gallery')}
              className={`cursor-pointer rounded-sm p-2 transition-colors ${
                viewMode === 'gallery'
                  ? 'border border-[#CC9808] bg-[#CC9808] text-white'
                  : 'border border-gray-300 bg-white text-slate-600'
              }`}
              aria-label="Gallery view"
            >
              <GalleryIcon />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`cursor-pointer rounded-sm p-2 transition-colors ${
                viewMode === 'list'
                  ? 'border border-[#CC9808] bg-[#CC9808] text-white'
                  : 'border border-gray-300 bg-white text-slate-600'
              }`}
              aria-label="List view"
            >
              <ListIcon />
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#CC9808]" />
            </div>
          ) : (
            <CompanyGrid
              companies={filteredCompanies}
              viewMode={viewMode}
              onProductBrochureClick={handleProductBrochure}
            />
          )}

          {!loading && filteredCompanies.length > 0 && totalPages > 1 && (
            <div className="mt-8 md:mt-12">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Page {currentPage} of {totalPages}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`flex cursor-pointer items-center gap-1 rounded-sm px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                      currentPage === 1
                        ? 'cursor-not-allowed border border-gray-200 bg-gray-50 text-gray-400'
                        : 'border border-gray-300 bg-white text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <ChevronLeftIcon />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {getPaginationRange().map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm text-xs font-bold uppercase tracking-wider transition-colors sm:h-9 sm:w-9 ${
                          currentPage === page
                            ? 'border border-[#CC9808] bg-[#CC9808] text-white'
                            : 'border border-gray-300 bg-white text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`flex cursor-pointer items-center gap-1 rounded-sm px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                      currentPage === totalPages
                        ? 'cursor-not-allowed border border-gray-200 bg-gray-50 text-gray-400'
                        : 'border border-gray-300 bg-white text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <span>Next</span>
                    <ChevronRightIcon />
                  </button>
                </div>
              </div>
            </div>
          )}

          {!loading && filteredCompanies.length === 0 && (
            <div className="mx-auto mt-10 max-w-md rounded-sm border border-gray-100 bg-[#FCF8F3] py-16 text-center shadow-sm">
              <div className="mb-4 text-gray-400">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="mb-2 font-bebas text-3xl uppercase tracking-wide text-[#03193D]">No companies found</h3>
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-gray-600">
                Try adjusting your search or filter to find what you&apos;re looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLetter(null);
                  setCurrentPage(1);
                }}
                className="mt-6 cursor-pointer rounded-sm bg-[#CC9808] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#03193D]"
              >
                Clear all filters
              </button>
            </div>
          )}
        </Container>
      </main>
      <BackToTop />
    </div>
  );
}

function GridIcon() {
  return (
    <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="0.5" />
      <rect x="14" y="3" width="7" height="7" rx="0.5" />
      <rect x="3" y="14" width="7" height="7" rx="0.5" />
      <rect x="14" y="14" width="7" height="7" rx="0.5" />
    </svg>
  );
}

function GalleryIcon() {
  return (
    <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4 4h16v16H4V4zm2 4v8l6-4-6-4z" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="2" rx="0.5" />
      <rect x="3" y="11" width="18" height="2" rx="0.5" />
      <rect x="3" y="18" width="18" height="2" rx="0.5" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
