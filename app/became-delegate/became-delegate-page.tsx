'use client';

import { useState } from 'react';
import Container from '@/components/ui/container';
import BackToTop from '@/components/layout/BackToTop';
import DelegateForm from '@/app/delegates/DelegateForm';

const delegatePackages = [
  {
    id: 1,
    title: 'Student',
    price: '₹ 3,500',
    features: [
      'Access to all technical summit sessions',
      'Summit kit (Badge, Folder, Notepad, Pen)',
      'Entry to exhibition area (all 3 days)',
      'Interaction with industry experts & speakers',
      'Certificate of Participation',
      'Career guidance & mentorship interaction',
      'Internship & placement opportunity connect',
      'Digital access to summit presentation summaries',
      'Lunch & refreshments',
    ],
  },
  {
    id: 2,
    title: 'General',
    price: '₹ 6,000',
    features: [
      'Full access to all summit sessions',
      'Entry to exhibition area (all 3 days)',
      'Summit kit (Badge, Folder, Notepad, Pen)',
      'Access to networking lunch & tea breaks',
      'B2B networking opportunity',
      'Access to speakers’ presentation (digital copy post event)',
      'Certificate of Participation',
      'Entry to Business Networking Meet',
      'Access to post-event report & industry insights summary',
    ],
  },
  {
    id: 3,
    title: 'Group of 3',
    price: '₹ 15,000',
    features: [
      'Full summit access (all sessions)',
      'Priority seating in technical sessions',
      'Exhibition entry (all 3 days)',
      'Reserved group seating',
      'Company name recognition on delegate list',
      'Access to networking lunch & tea breaks',
      'Digital presentations access',
      'Participation certificates for all 3',
      'Group networking badge recognition',
      'Priority B2B meeting assistance (pre-scheduled on request)',
    ],
  },
];

export default function BecameDelegatePage() {
  const [selectedPackage, setSelectedPackage] = useState('');

  return (
    <main className="intro-animation overflow-hidden bg-white font-sans">
      <div className="border-b border-gray-100 bg-[#FCF8F3] py-10 lg:py-14">
        <Container>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#CC9808]">
            India Tyre Show Summit 2027
          </p>
          <h1 className="font-bebas text-5xl uppercase tracking-tight text-[#03193D] sm:text-6xl lg:text-7xl">
            Become a Delegate
          </h1>
          <p className="mt-4 max-w-3xl text-base text-gray-600 sm:text-lg">
            Prices are inclusive of GST
          </p>
        </Container>
      </div>

      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#03193D] lg:text-5xl">
                Choose Your Delegate Package
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-700">
                Join industry leaders at the India Tyre Show Summit. Select the package that best
                suits your needs and gain access to exclusive networking, technical sessions, and
                valuable industry connections.
              </p>

              <hr className="my-10 border-gray-200" />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {delegatePackages.map((pkg) => {
                  const packageKey = pkg.id === 3 ? 'group' : pkg.title.toLowerCase();
                  const isSelected = selectedPackage === packageKey;
                  return (
                    <button
                      type="button"
                      key={pkg.id}
                      onClick={() => setSelectedPackage(packageKey)}
                      className={`flex flex-col rounded-sm border p-4 text-left transition-all ${
                        isSelected
                          ? 'border-[#CC9808] bg-[#CC9808]/5 ring-1 ring-[#CC9808]'
                          : 'border-gray-100 bg-[#FCF8F3] hover:border-[#CC9808]/50'
                      }`}
                    >
                      <h3 className="mb-2 font-bebas text-2xl uppercase text-[#03193D]">
                        {pkg.title}
                      </h3>
                      <ul className="mb-4 flex-1 space-y-2">
                        {pkg.features.map((feature) => (
                          <li key={feature} className="flex items-start text-sm text-gray-700">
                            <span className="mt-0.5 mr-2 text-[#CC9808]">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto border-t border-gray-200 pt-3">
                        <div className="font-bebas text-2xl text-[#CC9808]">{pkg.price}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <hr className="my-10 border-gray-200" />

              <h3 className="mb-8 font-bebas text-3xl uppercase tracking-tight text-[#03193D]">
                Why Attend?
              </h3>
              <div className="grid grid-cols-2 gap-x-10 gap-y-10">
                {[
                  ['500+', 'Industry Professionals'],
                  ['30+', 'Expert Speakers'],
                  ['3', 'Networking Events'],
                  ['20+', 'Hours of Content'],
                ].map(([stat, label]) => (
                  <div key={label}>
                    <p className="font-bebas text-5xl text-[#CC9808]">{stat}</p>
                    <p className="mt-2 text-base text-gray-700">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="lg:sticky lg:top-[calc(var(--site-header-height,13.75rem)+1rem)]">
                <DelegateForm selectedPackage={selectedPackage} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <BackToTop />
    </main>
  );
}
