'use client';

import { useEffect, useState } from 'react';
import Container from '@/components/ui/container';
import BackToTop from '@/components/layout/BackToTop';
import DelegateForm, { DELEGATE_PENDING_REGISTRATION_KEY } from '@/app/delegates/DelegateForm';
import PageHero from '@/components/layout/PageHero';

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

  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has('delegate_order_id')) return;
    try {
      const pending = window.sessionStorage.getItem(DELEGATE_PENDING_REGISTRATION_KEY);
      if (pending) setSelectedPackage(JSON.parse(pending).package || '');
    } catch (error) {
      console.error('Could not restore delegate checkout details', error);
    }
  }, []);

  return (
    <main className="intro-animation overflow-hidden bg-white font-sans">
      <PageHero
        title="BECOME A"
        accent="DELEGATE"
        subtitle="Prices are inclusive of GST. Join industry leaders at the IndiaMET Summit 2027."
      />

      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#003A77] lg:text-5xl">
                Choose Your Delegate Package
              </h2>
              <p className="mt-4 max-w-3xl text-lg sm:text-xl leading-relaxed text-gray-700">
                Join industry leaders and experts at our premier summit. Select the package that 
                best suits your needs and gain access to exclusive networking opportunities, 
                insightful sessions, and valuable industry connections.


              </p>

              <hr className="my-10 border-gray-200" />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {delegatePackages.map((pkg) => {
                  const packageKey = pkg.id === 3 ? 'group' : pkg.title.toLowerCase();
                  const isSelected = selectedPackage === packageKey;
                  return (
                    <div
                      key={pkg.id}
                      className={isSelected
                        ? 'flex flex-col rounded-sm border border-[#00A1B1] bg-[#00A1B1]/5 p-4 text-left ring-1 ring-[#00A1B1]'
                        : 'flex flex-col rounded-sm border border-gray-100 bg-[#FCF8F3] p-4 text-left transition-all hover:border-[#00A1B1]/50'
                      }
                    >
                      <h3 className="mb-2 font-bebas text-2xl uppercase text-[#003A77]">
                        {pkg.title}
                      </h3>
                      <ul className="mb-4 flex-1 space-y-2">
                        {pkg.features.map((feature) => (
                          <li key={feature} className="flex items-start text-sm text-gray-700">
                            <span className="mt-0.5 mr-2 text-[#00A1B1]">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto border-t border-gray-200 pt-3">
                        <div className="font-bebas text-2xl text-[#00A1B1]">{pkg.price}</div>
                        <button
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => setSelectedPackage(packageKey)}
                          className="mt-4 inline-flex w-full items-center justify-center rounded-sm bg-[#003A77] px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#00A1B1]"
                        >
                          Purchase {pkg.title} Pass
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <hr className="my-10 border-gray-200" />

              <h3 className="mb-8 font-bebas text-3xl uppercase tracking-tight text-[#003A77]">
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
                    <p className="font-bebas text-5xl text-[#00A1B1]">{stat}</p>
                    <p className="mt-2 text-base text-gray-700">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="lg:sticky lg:top-[calc(var(--site-header-height,13.75rem)+1rem)]">
                {selectedPackage ? (
                  <DelegateForm selectedPackage={selectedPackage} />
                ) : (
                  <div className="rounded-sm border border-gray-100 bg-white p-6 text-center shadow-sm">
                    <h3 className="font-bebas text-2xl uppercase tracking-wide text-[#003A77]">Choose your package</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      Select Student, General, or Group of 3 to continue to registration and secure payment.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <BackToTop />
    </main>
  );
}
