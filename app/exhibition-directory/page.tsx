// app/exhibition-directory/page.tsx
'use client'

import { useState, useEffect } from 'react'
import CompanyGrid from './company-grid'
import { useRouter } from 'next/navigation'
import { Search, ChevronDown, Filter, X, Loader2 } from 'lucide-react'
import BackToTop from '@/components/layout/BackToTop'
import Container from '@/components/ui/container'
import { fetchExhibitionCompanies, ExhibitionCompany, generateSlug } from '@/lib/api/exhibitorClient'

export default function CompanyDirectory() {
  const router = useRouter()
  const [companies, setCompanies] = useState<ExhibitionCompany[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'gallery' | 'list'>('grid')
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  const companiesPerPage = 24

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Fetch companies
  useEffect(() => {
    const loadCompanies = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await fetchExhibitionCompanies(currentPage, companiesPerPage, searchQuery)
        setCompanies(result.companies)
        setTotalPages(result.totalPages)
      } catch (err) {
        setError('Failed to load exhibitors. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(() => {
      loadCompanies()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [currentPage, searchQuery])

  // Filter by letter (client-side filtering)
  const filteredCompanies = selectedLetter
    ? companies.filter(company =>
      company.name?.toUpperCase().startsWith(selectedLetter)
    )
    : companies

  const handleProductBrochure = (companyId: string, companyName: string) => {
    const company = companies.find(c => c.id === companyId)
    const slug = company?.slug || generateSlug(companyName)
    router.push(`/exhibition-directory/${slug}`)
  }

  // Pagination range
  const getPaginationRange = () => {
    if (isMobile) {
      const start = Math.max(1, currentPage - 1)
      const end = Math.min(totalPages, start + 1)
      return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    } else {
      const maxPages = 5
      let start = Math.max(1, currentPage - Math.floor(maxPages / 2))
      let end = Math.min(totalPages, start + maxPages - 1)

      if (end - start + 1 < maxPages) {
        start = Math.max(1, end - maxPages + 1)
      }

      return Array.from({ length: Math.min(maxPages, totalPages) }, (_, i) => start + i)
    }
  }

  if (loading && companies.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#CC9808] mx-auto mb-4" />
          <p className="text-slate-650 text-sm">Loading exhibitors...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="intro-animation min-h-screen bg-white font-sans">
      <div className="page-spacing-wrapper">
        <div className="pt-[120px] lg:pt-0">
          {/* Error display */}
          {error && (
            <div className="fixed top-36 left-0 right-0 z-40 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm">
                {error}
              </div>
            </div>
          )}

          <main className="pb-16">
            <Container>
              <div className="border-b border-gray-200 pb-6 mb-8 mt-4">
            <h1 className="font-bebas text-5xl sm:text-6xl text-[#03193D] uppercase tracking-wide">
              <br />
              Exhibitor <span className="text-[#CC9808]">Directory</span>
            </h1>
            <p className="mt-2 text-sm text-gray-600 font-sans">
              Find and connect with key tyre and rubber industry suppliers at INDIAMET Expo.
            </p>
          </div>

          {/* Alphabetical Filter */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
              <button
                onClick={() => {
                  setSelectedLetter(null)
                  setCurrentPage(1)
                }}
                className={`px-3 sm:px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer ${!selectedLetter
                    ? 'bg-[#CC9808] text-white border border-[#CC9808]'
                    : 'bg-white text-slate-800 hover:bg-slate-100 border border-gray-300'
                  }`}
              >
                All
              </button>

              <div className="flex flex-wrap gap-1">
                {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                  <button
                    key={letter}
                    onClick={() => {
                      setSelectedLetter(letter)
                      setCurrentPage(1)
                    }}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors border flex items-center justify-center cursor-pointer ${selectedLetter === letter
                        ? 'bg-[#CC9808] text-white border-[#CC9808]'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border-gray-300'
                      }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-4">
              Showing {filteredCompanies.length} companies {selectedLetter && `starting with "${selectedLetter}"`}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by company name or sector..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] text-sm bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setCurrentPage(1)
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex justify-end mb-6 gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-sm transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-[#CC9808] text-white border border-[#CC9808]' : 'bg-white text-slate-600 border border-gray-300'
                }`}
            >
              <GridIcon />
            </button>
            <button
              onClick={() => setViewMode('gallery')}
              className={`p-2 rounded-sm transition-colors cursor-pointer ${viewMode === 'gallery' ? 'bg-[#CC9808] text-white border border-[#CC9808]' : 'bg-white text-slate-600 border border-gray-300'
                }`}
            >
              <GalleryIcon />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-sm transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-[#CC9808] text-white border border-[#CC9808]' : 'bg-white text-slate-600 border border-gray-300'
                }`}
            >
              <ListIcon />
            </button>
          </div>

          {/* Companies Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#CC9808]" />
            </div>
          ) : (
            <CompanyGrid
              companies={filteredCompanies}
              viewMode={viewMode}
              onProductBrochureClick={handleProductBrochure}
            />
          )}

          {/* Pagination */}
          {!loading && filteredCompanies.length > 0 && totalPages > 1 && (
            <div className="mt-8 md:mt-12">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Page {currentPage} of {totalPages}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer ${currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed border border-gray-200 bg-gray-50'
                        : 'text-slate-800 border border-gray-300 hover:bg-slate-100 bg-white'
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
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center transition-colors cursor-pointer ${currentPage === page
                            ? 'bg-[#CC9808] text-white border border-[#CC9808]'
                            : 'bg-white text-slate-700 hover:bg-slate-100 border border-gray-300'
                          }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer ${currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed border border-gray-200 bg-gray-50'
                        : 'text-slate-800 border border-gray-300 hover:bg-slate-100 bg-white'
                      }`}
                  >
                    <span>Next</span>
                    <ChevronRightIcon />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredCompanies.length === 0 && (
            <div className="text-center py-16 border border-gray-100 rounded-sm bg-[#FCF8F3] shadow-sm max-w-md mx-auto mt-10">
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="font-bebas text-3xl text-[#03193D] mb-2 uppercase tracking-wide">No companies found</h3>
              <p className="text-sm text-gray-600 max-w-xs mx-auto leading-relaxed">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedLetter(null)
                  setCurrentPage(1)
                }}
                className="mt-6 bg-[#CC9808] hover:bg-[#03193D] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </Container>
      </main>
      <BackToTop />
        </div>
      </div>
    </div>
  )
}

// Icons
function GridIcon() {
  return (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="0.5" />
      <rect x="14" y="3" width="7" height="7" rx="0.5" />
      <rect x="3" y="14" width="7" height="7" rx="0.5" />
      <rect x="14" y="14" width="7" height="7" rx="0.5" />
    </svg>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function GalleryIcon() {
  return (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4 4h16v16H4V4zm2 4v8l6-4-6-4z" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="2" rx="0.5" />
      <rect x="3" y="11" width="18" height="2" rx="0.5" />
      <rect x="3" y="18" width="18" height="2" rx="0.5" />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}