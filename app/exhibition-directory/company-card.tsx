// app/exhibition-directory/company-card.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ExternalLink, MessageCircle, Building, MapPin, Globe } from 'lucide-react'
import VisitorRegistrationForm from './visitor-registration-form'

interface CompanyCardProps {
  company: {
    id: string
    slug?: string
    name: string
    pavilion: string
    stand: string
    country: string
    logo?: string
    logoInitials: string
    countryCode?: string
  }
  onProductBrochureClick: (companyId: string, companyName: string) => void
}

export default function CompanyCard({ company, onProductBrochureClick }: CompanyCardProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [imageError, setImageError] = useState(false)
  const router = useRouter()

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (
      target.closest('button') ||
      target.closest('a') ||
      target.tagName === 'BUTTON' ||
      target.tagName === 'A'
    ) {
      return
    }

    // Use slug if available, otherwise use id
    const path = company.slug ? company.slug : company.id
    router.push(`/exhibition-directory/${path}`)
  }

  const handleConnectClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFormOpen(true)
  }

  const handleBrochureClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onProductBrochureClick(company.id, company.name)
  }

  const getLogoColor = () => {
    const colors = [
      'bg-orange-50',
      'bg-amber-50',
      'bg-stone-100',
      'bg-[#FCF8F3]',
    ];

    const index = company.name.length % colors.length;
    return colors[index];
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="group bg-[#FCF8F3] rounded-sm border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full cursor-pointer"
      >
        {/* Logo Area */}
        <div
          className={`h-32 sm:h-40 md:h-48 flex items-center justify-center p-4 sm:p-6 transition-colors duration-300 border-b border-gray-100 ${getLogoColor()} group-hover:bg-[#FCF8F3]`}
        >
          {company.logo && !imageError ? (
            <div className="relative w-full h-full">
              <img
                src={company.logo}
                alt={company.name}
                className="w-full h-full object-contain"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="text-4xl font-bebas text-gray-700 tracking-wide">
              {company.logoInitials}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
          {/* Company Name */}
          <h3 className="font-bebas text-xl sm:text-2xl text-black mb-3 leading-tight line-clamp-2 uppercase font-bold">
            {company.name}
          </h3>

          {/* Details */}
          <div className="space-y-1.5 text-xs text-gray-650 mb-4 font-sans">
            <div className="flex items-center gap-2">
              <Building size={14} className="text-gray-400 flex-shrink-0" />
              <span>{company.pavilion}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-gray-400 flex-shrink-0" />
              <span className="font-bold text-black">Stand #{company.stand}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-gray-400 flex-shrink-0" />
              <span>{company.country}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-200"
          >
            <button
              onClick={handleBrochureClick}
              className="px-3 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-800 border border-gray-300 rounded-sm hover:bg-black hover:text-white hover:border-black transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ExternalLink size={12} />
              <span>Details</span>
            </button>

            <button
              onClick={handleConnectClick}
              className="px-3 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white bg-[#CC9808] rounded-sm hover:bg-black transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageCircle size={12} />
              <span>Connect</span>
            </button>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <VisitorRegistrationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        companyName={company.name}
      />
    </>
  )
}