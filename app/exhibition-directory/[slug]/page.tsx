// app/exhibition-directory/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Globe, Eye, Download, MapPin, Building, Package, Tag, File, X, Menu, ArrowLeft, Share2, Loader2, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { fetchExhibitionCompanyBySlug, fetchExhibitorProducts, fetchExhibitorBrochures, fetchExhibitorBrands, ExhibitionCompany } from '@/lib/api/exhibitorClient';
import VisitorRegistrationForm from '../visitor-registration-form';
import Container from '@/components/ui/container';

export default function ExhibitorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [activeTab, setActiveTab] = useState<'about' | 'products' | 'brands' | 'brochures'>('about');
  const [company, setCompany] = useState<ExhibitionCompany | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [brochures, setBrochures] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; name: string } | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const loadCompanyData = async () => {
      if (!slug) return;

      setLoading(true);
      setError(null);

      try {
        const companyData = await fetchExhibitionCompanyBySlug(slug);

        if (!companyData) {
          setError('Company not found');
          setLoading(false);
          return;
        }

        setCompany(companyData);

        const [productsData, brochuresData, brandsData] = await Promise.all([
          fetchExhibitorProducts(companyData.id),
          fetchExhibitorBrochures(companyData.id),
          fetchExhibitorBrands(companyData.id)
        ]);

        setProducts(productsData);
        setBrochures(brochuresData);
        setBrands(brandsData);
      } catch (err) {
        setError('Failed to load company details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCompanyData();
  }, [slug]);

  const handlePrevious = () => {
    router.back();
  };

  const handleNext = () => {
    router.forward();
  };

  const handleClose = () => {
    router.push('/exhibition-directory');
  };

  const handleConnectClick = () => {
    setIsFormOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: company?.name,
        text: `Check out ${company?.name} at ITS Tyre Expo 2026`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const getLogoColor = (countryCode: string = 'INT') => {
    const colors: Record<string, string> = {
      'RU': 'bg-slate-50',
      'CN': 'bg-red-50',
      'KZ': 'bg-sky-50',
      'TR': 'bg-orange-55',
    };
    return colors[countryCode] || 'bg-stone-50';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#CC9808] mx-auto mb-4" />
          <p className="text-slate-650 text-sm">Loading company details...</p>
        </div>
      </div>
    );
  }
  if (error || !company) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="text-center">
          <div className="text-red-650 text-2xl mb-4">⚠️</div>
          <p className="text-slate-700 text-sm mb-4">{error || 'Company not found'}</p>
          <button
            onClick={() => router.push('/exhibition-directory')}
            className="bg-[#CC9808] hover:bg-[#03193D] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer"
          >
            Back to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="intro-animation bg-white min-h-screen font-sans">
      <div className="page-spacing-wrapper">
        <div className="pt-[120px] lg:pt-[140px]">
          {/* TOP NAV */}
          <div className="bg-white border-b border-gray-200 sticky top-[160px] lg:top-[140px] z-40">
        <Container>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => router.push('/exhibition-directory')}
                className="p-2 hover:bg-slate-100 rounded-sm cursor-pointer"
                aria-label="Back"
              >
                <ArrowLeft size={20} />
              </button>
              <span className="text-sm font-bold text-slate-800 truncate max-w-[150px] uppercase font-bebas tracking-wide">
                {company.name}
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-sm text-xs font-bold uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} /> PREV
              </button>

              <Link
                href="/exhibition-directory"
                className="px-6 py-2 bg-[#CC9808] hover:bg-[#03193D] text-white rounded-sm font-bold text-xs uppercase tracking-wider transition-colors"
              >
                BACK TO EXHIBITOR LIST
              </Link>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-sm text-xs font-bold uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
              >
                NEXT <ChevronRight size={16} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="hidden lg:flex p-2 hover:bg-slate-100 rounded-sm transition-colors cursor-pointer"
                aria-label="Share"
              >
                <Share2 size={20} />
              </button>
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-sm cursor-pointer"
                aria-label="Menu"
              >
                <Menu size={20} />
              </button>
              <button
                onClick={handleClose}
                className="hidden lg:flex p-2 hover:bg-slate-100 rounded-sm transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-40 bg-[#03193D] bg-opacity-50 lg:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl flex flex-col justify-between">
            <div>
              <div className="p-6 border-b border-gray-255">
                <div className="flex justify-between items-center">
                  <h3 className="font-bebas text-2xl font-bold uppercase text-[#03193D]">Navigation</h3>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 hover:bg-slate-100 rounded-sm cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="p-4 space-y-3 flex flex-col">
                <button
                  onClick={() => {
                    router.push('/exhibition-directory');
                    setShowMobileMenu(false);
                  }}
                  className="w-full py-3 px-4 bg-[#CC9808] text-white rounded-sm font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-[#03193D] transition-colors"
                >
                  Back to Exhibitor List
                </button>
                <button
                  onClick={() => {
                    handlePrevious();
                    setShowMobileMenu(false);
                  }}
                  className="w-full py-3 px-4 border border-gray-300 hover:bg-slate-100 rounded-sm font-bold text-xs uppercase tracking-wider text-slate-800 cursor-pointer transition-colors"
                >
                  ← Previous Company
                </button>
                <button
                  onClick={() => {
                    handleNext();
                    setShowMobileMenu(false);
                  }}
                  className="w-full py-3 px-4 border border-gray-300 hover:bg-slate-100 rounded-sm font-bold text-xs uppercase tracking-wider text-slate-800 cursor-pointer transition-colors"
                >
                  Next Company →
                </button>
                <button
                  onClick={() => {
                    handleShare();
                    setShowMobileMenu(false);
                  }}
                  className="w-full py-3 px-4 border border-gray-300 hover:bg-slate-100 rounded-sm font-bold text-xs uppercase tracking-wider text-slate-800 cursor-pointer transition-colors"
                >
                  Share Company
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <div className="fixed inset-0 z-50 bg-[#03193D] bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm w-full max-w-4xl h-[80vh] flex flex-col border border-gray-200">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bebas text-xl font-bold uppercase truncate">{selectedPdf.name}</h3>
              <button
                onClick={() => setSelectedPdf(null)}
                className="p-2 hover:bg-slate-100 rounded-sm cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1">
              <iframe
                src={`${selectedPdf.url}#toolbar=1`}
                className="w-full h-full"
                title={selectedPdf.name}
              />
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="pt-6 pb-16">
        {/* COMPANY HEADER */}
        <Container className="mt-8">
          <div className="bg-[#FCF8F3] border border-gray-100 rounded-sm shadow-sm overflow-hidden p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
              {/* Logo */}
              <div className="flex-shrink-0 mx-auto lg:mx-0">
                <div className={`w-48 h-48 lg:w-56 lg:h-56 rounded-sm border border-gray-150 flex items-center justify-center p-6 bg-white overflow-hidden`}>
                  {company.logo && !imageError ? (
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-full h-full object-contain"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="text-4xl font-bebas font-bold text-gray-700">
                      {company.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-4 text-center lg:text-left">
                <div>
                  <h1 className="font-bebas text-4xl sm:text-5xl lg:text-6xl font-bold text-[#03193D] uppercase leading-tight">
                    {company.name}
                  </h1>
                  {company.shortName && (
                    <p className="text-slate-650 font-sans text-sm sm:text-base font-semibold">({company.shortName})</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0">
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <Building size={16} className="text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-700 truncate">{company.pavilion}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <MapPin size={16} className="text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      {company.hall || 'Not specified'}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="inline-flex items-center gap-3 bg-white border border-gray-150 px-4 py-2.5 rounded-sm">
                    <span className="font-bold text-slate-800 text-sm uppercase tracking-wider">Stand No:</span>
                    <span className="text-xl font-bold text-[#CC9808]">#{company.standNumber}</span>
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 justify-center lg:justify-start">
                    {company.sector.map((sector: string, index: number) => (
                      <span
                        key={index}
                        className="bg-[#CC9808] text-white px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-center lg:justify-start gap-6">
                  {company.website && (
                    <a
                      href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#CC9808] font-sans font-bold text-xs uppercase tracking-wider hover:text-[#03193D] transition-colors"
                    >
                      <Globe size={16} />
                      <span>Visit Website</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* TABS */}
        <Container className="mt-8">
          <div className="flex flex-wrap gap-2 items-center">
            {[
              { id: 'about', label: 'About', icon: Building },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'brands', label: 'Brands', icon: Tag },
              { id: 'brochures', label: 'Brochures', icon: File }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-2.5 rounded-sm font-bold border transition-colors flex items-center gap-2 text-xs uppercase tracking-wider cursor-pointer ${isActive
                      ? 'bg-[#CC9808] text-white border-[#CC9808]'
                      : 'bg-white text-slate-700 border-gray-300 hover:bg-slate-50'
                    }`}
                >
                  <Icon size={14} className="flex-shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
            <button
              onClick={handleConnectClick}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#CC9808] border border-[#CC9808] rounded-sm hover:bg-[#03193D] hover:border-black transition-colors flex items-center gap-2 ml-auto cursor-pointer"
            >
              <MessageCircle size={14} />
              <span>Book Appointment</span>
            </button>
          </div>
        </Container>

        {/* CONTENT AREA */}
        <Container className="mt-6">
          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="bg-[#FCF8F3] border border-gray-100 rounded-sm p-6 sm:p-8 shadow-sm">
                <h2 className="font-bebas text-3xl text-[#03193D] mb-4 uppercase">Company Overview</h2>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {company.description || `${company.name} is a leading company in the ${company.sector.join(' and ')} sector, 
                  headquartered in ${company.country}. With a strong presence at ${company.pavilion}, 
                  Stand ${company.standNumber}, the company provides comprehensive 
                  solutions and services to clients worldwide.`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#FCF8F3] border border-gray-100 rounded-sm p-6 shadow-sm">
                  <h3 className="font-bebas text-2xl text-[#03193D] mb-4 uppercase">Location Details</h3>
                  <ul className="space-y-3 font-sans">
                    <li className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white border border-gray-150 rounded-sm flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} className="text-[#CC9808]" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Pavilion</p>
                        <p className="text-sm font-semibold text-slate-900">{company.pavilion}</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white border border-gray-150 rounded-sm flex items-center justify-center flex-shrink-0">
                        <Building size={18} className="text-[#CC9808]" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Hall</p>
                        <p className="text-sm font-semibold text-slate-900">{company.hall || 'Not specified'}</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white border border-gray-150 rounded-sm flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} className="text-[#CC9808]" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Stand Number</p>
                        <p className="text-sm font-semibold text-slate-900">{company.standNumber}</p>
                      </div>
                    </li>
                    {company.fullAddress && (
                      <li className="flex items-start gap-3 pt-3 border-t border-gray-150 mt-2">
                        <div className="w-10 h-10 bg-white border border-gray-150 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                          <MapPin size={18} className="text-[#CC9808]" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Company Address</p>
                          <p className="text-sm font-semibold text-slate-900">{company.fullAddress}</p>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="bg-[#FCF8F3] border border-gray-100 rounded-sm p-6 shadow-sm">
                  <h3 className="font-bebas text-2xl text-[#03193D] mb-4 uppercase">Sectors & Specialties</h3>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {company.sector.map((sector: string, index: number) => (
                      <span
                        key={index}
                        className="bg-white border border-gray-150 text-slate-800 px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>

                  {company.contactPerson && (company.contactPerson.name || company.contactPerson.email || company.contactPerson.phone) && (
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-bebas text-2xl text-[#03193D] mb-3 uppercase">Contact Person</h4>
                      <div className="space-y-2 text-sm font-sans text-slate-700">
                        {company.contactPerson.name && (
                          <p>
                            <span className="font-bold text-[#03193D]">Name:</span> {company.contactPerson.name}
                          </p>
                        )}
                        {company.contactPerson.jobTitle && (
                          <p>
                            <span className="font-bold text-[#03193D]">Title:</span> {company.contactPerson.jobTitle}
                          </p>
                        )}
                        {company.contactPerson.email && (
                          <p>
                            <span className="font-bold text-[#03193D]">Email:</span> {company.contactPerson.email}
                          </p>
                        )}
                        {company.contactPerson.phone && (
                          <p>
                            <span className="font-bold text-[#03193D]">Phone:</span> {company.contactPerson.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="bg-[#FCF8F3] border border-gray-100 rounded-sm p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center justify-between">
                    <div>
                      {product.image ? (
                        <div className="flex justify-center mb-4 h-24 w-24 overflow-hidden rounded-sm bg-white border border-gray-150 p-2">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        </div>
                      ) : (
                        <div className="flex justify-center mb-4">
                          <div className={`w-24 h-24 bg-white border border-gray-150 rounded-sm flex items-center justify-center`}>
                            <div className="text-2xl font-bebas text-gray-700">
                              {company.name.substring(0, 2).toUpperCase()}
                            </div>
                          </div>
                        </div>
                      )}
                      <h3 className="font-bebas text-2xl text-[#03193D] mb-2 uppercase font-bold">
                        {product.title || product.name}
                      </h3>
                      <p className="text-gray-650 text-xs leading-relaxed font-sans">
                        {product.description || `${company.name} services`}
                      </p>
                    </div>
                    {product.price && (
                      <div className="mt-4">
                        <span className="inline-block bg-[#CC9808] text-white px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">
                          {product.price}
                        </span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16 border border-gray-100 rounded-sm bg-[#FCF8F3] shadow-sm max-w-sm mx-auto">
                  <Package size={48} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-sm font-bold uppercase tracking-wider text-slate-700">No products available</p>
                </div>
              )}
            </div>
          )}

          {/* BRANDS TAB */}
          {activeTab === 'brands' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brands.length > 0 ? (
                brands.map((brand, index) => (
                  <div key={brand.id || index} className="bg-[#FCF8F3] border border-gray-100 rounded-sm p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-4">
                      {brand.logo ? (
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-14 h-14 rounded-sm object-contain bg-white border border-gray-150 p-1"
                        />
                      ) : (
                        <div className={`w-14 h-14 bg-white border border-gray-150 rounded-sm flex items-center justify-center flex-shrink-0`}>
                          <div className="text-lg font-bebas text-gray-700">
                            {brand.name?.substring(0, 2).toUpperCase() || company.name.substring(0, 2).toUpperCase()}
                          </div>
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="font-bebas text-2xl text-[#03193D] truncate uppercase font-bold">{brand.name || company.name}</h3>
                        {brand.description && (
                          <p className="text-gray-600 text-xs mt-1 font-sans leading-relaxed line-clamp-2">{brand.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16 border border-gray-100 rounded-sm bg-[#FCF8F3] shadow-sm max-w-sm mx-auto">
                  <Tag size={48} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-sm font-bold uppercase tracking-wider text-slate-700">No brands available</p>
                </div>
              )}
            </div>
          )}

          {/* BROCHURES TAB */}
          {activeTab === 'brochures' && (
            <div className="bg-[#FCF8F3] border border-gray-100 rounded-sm overflow-hidden shadow-sm">
              {brochures.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full font-sans border-collapse">
                    <thead>
                      <tr className="bg-white border-b border-gray-200">
                        <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-slate-700">Brochure</th>
                        <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-slate-700 hidden sm:table-cell">Description</th>
                        <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {brochures.map((brochure) => {
                        const brochureUrl = brochure.fileUrl || brochure.url;
                        const brochureName = brochure.name || brochure.title || 'Brochure';

                        return (
                          <tr key={brochure.id} className="border-t border-gray-150 hover:bg-white transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-16 bg-white border border-gray-200 rounded-sm flex items-center justify-center flex-shrink-0 p-1">
                                  <File size={20} className="text-gray-400" />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-bold text-sm text-slate-900 truncate">{brochureName}</p>
                                  <p className="text-xs text-gray-650 mt-1 sm:hidden">{brochure.description}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 hidden sm:table-cell">
                              <p className="text-xs text-gray-650 leading-relaxed">{brochure.description || 'No description available'}</p>
                            </td>
                            <td className="p-4">
                              {brochureUrl ? (
                                <div className="flex flex-col sm:flex-row gap-2">
                                  <button
                                    onClick={() => setSelectedPdf({ url: brochureUrl, name: brochureName })}
                                    className="px-3 py-2 bg-[#CC9808] text-white rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-[#03193D] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                                  >
                                    <Eye size={14} /> View
                                  </button>
                                  <a
                                    href={brochureUrl}
                                    download={brochureName}
                                    className="px-3 py-2 bg-slate-800 text-white rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-[#03193D] transition-colors flex items-center justify-center gap-1.5"
                                  >
                                    <Download size={14} /> Download
                                  </a>
                                </div>
                              ) : (
                                <span className="text-xs text-gray-500 font-bold uppercase">No file available</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-16">
                  <File size={48} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-sm font-bold uppercase tracking-wider text-slate-700">No brochures available</p>
                </div>
              )}
            </div>
          )}
        </Container>

        {/* BOTTOM NAVIGATION */}
        <Container className="mt-8">
          <div className="bg-[#FCF8F3] border border-gray-100 rounded-sm p-6 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevious}
                className="px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 text-slate-700 border border-gray-300 bg-white hover:bg-slate-50 cursor-pointer"
              >
                <ChevronLeft size={14} />
                <span>Previous</span>
              </button>

              <Link
                href="/exhibition-directory"
                className="px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors text-white bg-[#CC9808] hover:bg-[#03193D]"
              >
                <span>Back to List</span>
              </Link>

              <button
                onClick={handleNext}
                className="px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 text-slate-700 border border-gray-300 bg-white hover:bg-slate-50 cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </Container>
      </div>

      <VisitorRegistrationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        companyName={company.name}
      />
        </div>
      </div>
    </div>
  );
}