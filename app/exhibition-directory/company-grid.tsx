// app/exhibition-directory/company-grid.tsx
'use client';

import { ExhibitionCompany, generateSlug } from '@/lib/api/exhibitorClient';
import CompanyCard from './company-card';
import { Building, MapPin } from 'lucide-react';

interface CompanyGridProps {
  companies: ExhibitionCompany[];
  viewMode: 'grid' | 'gallery' | 'list';
  onProductBrochureClick: (companyId: string, companyName: string) => void;
}

export default function CompanyGrid({ companies, viewMode, onProductBrochureClick }: CompanyGridProps) {
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={{
              id: company.id,
              slug: company.slug || generateSlug(company.name),
              name: company.name,
              pavilion: company.pavilion,
              stand: company.standNumber,
              country: company.country,
              logo: company.logo,
              logoInitials: company.name.substring(0, 2).toUpperCase(),
              countryCode: company.countryCode
            }}
            onProductBrochureClick={(id, name) => onProductBrochureClick(id, name)}
          />
        ))}
      </div>
    );
  }

  if (viewMode === 'gallery') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={{
              id: company.id,
              slug: company.slug || generateSlug(company.name),
              name: company.name,
              pavilion: company.pavilion,
              stand: company.standNumber,
              country: company.country,
              logo: company.logo,
              logoInitials: company.name.substring(0, 2).toUpperCase(),
              countryCode: company.countryCode
            }}
            onProductBrochureClick={(id, name) => onProductBrochureClick(id, name)}
          />
        ))}
      </div>
    );
  }

  // List view
  return (
    <div className="overflow-hidden rounded-sm border border-gray-100 bg-white">
      <table className="w-full">
        <thead className="bg-[#03193D]">
          <tr>
            <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-white">Company</th>
            <th className="hidden p-4 text-left text-xs font-bold uppercase tracking-wider text-white md:table-cell">Location</th>
            <th className="hidden p-4 text-left text-xs font-bold uppercase tracking-wider text-white lg:table-cell">Stand</th>
            <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-white">Sector</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr
              key={company.id}
              onClick={() => onProductBrochureClick(company.id, company.name)}
              className="cursor-pointer border-t border-gray-100 transition-colors hover:bg-[#FCF8F3]"
            >
              <td className="p-4">
                <div className="flex items-center gap-3">
                  {company.logo && (
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-10 w-10 rounded-sm object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  <div>
                    <div className="font-medium text-[#03193D]">{company.name}</div>
                    <div className="text-sm text-gray-600 md:hidden">
                      {company.pavilion} • Stand {company.standNumber}
                    </div>
                  </div>
                </div>
              </td>
              <td className="hidden p-4 text-gray-600 md:table-cell">
                <div className="flex items-center gap-2">
                  <Building size={14} className="text-[#CC9808]" />
                  <span>{company.pavilion}</span>
                  <MapPin size={14} className="ml-2 text-[#CC9808]" />
                  <span>{company.country}</span>
                </div>
              </td>
              <td className="hidden p-4 font-medium text-[#03193D] lg:table-cell">
                {company.standNumber}
              </td>
              <td className="p-4">
                <div className="flex flex-wrap gap-1">
                  {company.sector.slice(0, 2).map((s, i) => (
                    <span key={i} className="rounded-sm bg-[#FCF8F3] px-2 py-1 text-xs text-[#03193D]">
                      {s}
                    </span>
                  ))}
                  {company.sector.length > 2 && (
                    <span className="rounded-sm bg-[#CC9808]/10 px-2 py-1 text-xs text-[#CC9808]">
                      +{company.sector.length - 2}
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}