'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/container';
import BackToTop from '@/components/layout/BackToTop';
import SideCard, { CheckItem, DateItem } from '@/components/sponsor/SideCard';
import { Field, TextInput, TextArea, Select, RadioCard } from '@/components/nominate/FormFields';

const HERO_IMAGE =
  'https://rubber-tyre.com.vn/wp-content/uploads/2025/07/CTHE0129-min-scaled.webp';

type SponsorPackage = {
  title: string;
  price: string;
  note: string;
  benefits: string[];
};

const packages: SponsorPackage[] = [
  {
    title: 'PLATINUM PARTNER',
    price: '₹12,00,000 + GST',
    note: '3 Complimentary Stalls',
    benefits: [
      '3 complimentary exhibition stalls at prime locations',
      'Title branding on all event collaterals, banners & backdrop',
      'Logo on homepage of event website with hyperlink',
      '10 complimentary delegate passes',
      'Dedicated speaking slot at the main stage',
      'Full-page ad in the event brochure',
      'Prominent logo placement on award trophies',
      'Social media promotion across India Tyre Show channels',
    ],
  },
  {
    title: 'GOLD PARTNER',
    price: '₹8,00,000 + GST',
    note: '2 Complimentary Stalls',
    benefits: [
      '2 complimentary exhibition stalls',
      'Logo branding on event banners & backdrop',
      'Logo on event website',
      '6 complimentary delegate passes',
      'Half-page ad in the event brochure',
      'Mention during opening & closing ceremony',
      'Social media promotion',
    ],
  },
  {
    title: 'SILVER PARTNER',
    price: '₹5,00,000 + GST',
    note: '1 Complimentary Stall',
    benefits: [
      '1 complimentary exhibition stall',
      'Logo branding on select event collaterals',
      'Logo on event website',
      '4 complimentary delegate passes',
      'Quarter-page ad in the event brochure',
      'Social media mention',
    ],
  },
  {
    title: 'ASSOCIATE PARTNER',
    price: '₹2,50,000 + GST',
    note: 'Logo Branding',
    benefits: [
      'Logo branding at the venue',
      'Logo on event website',
      '2 complimentary delegate passes',
      'Listing in the event brochure',
    ],
  },
  {
    title: 'SUPPORTING PARTNER',
    price: '₹1,25,000 + GST',
    note: 'Logo Branding',
    benefits: [
      'Logo branding at the venue',
      'Logo on event website',
      '1 complimentary delegate pass',
    ],
  },
];

type FormState = {
  companyName: string;
  contactPerson: string;
  designation: string;
  email: string;
  mobile: string;
  website: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  companyType: string;
  source: string;
};

const initialForm: FormState = {
  companyName: '',
  contactPerson: '',
  designation: '',
  email: '',
  mobile: '',
  website: '',
  address: '',
  city: '',
  state: '',
  country: '',
  pinCode: '',
  companyType: '',
  source: '',
};

export default function SponsorPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [selectedPackage, setSelectedPackage] = useState<SponsorPackage>(packages[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePackageSelect = (pkg: SponsorPackage) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError('Please accept the terms & privacy policy to submit your enquiry.');
      return;
    }
    setError('');
    console.log('Sponsor enquiry submitted:', { ...form, package: selectedPackage.title });
    setSubmitted(true);
  };

  return (
    <div className="intro-animation overflow-hidden bg-white font-sans">
      <section className="relative min-h-[50vh] w-full overflow-hidden sm:min-h-[60vh] lg:min-h-[70vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03193D]/95 via-[#03193D]/80 to-[#03193D]/40" />
        <Container className="relative z-10 flex min-h-[50vh] items-center py-12 sm:min-h-[60vh] lg:min-h-[70vh]">
          <div className="max-w-4xl text-white">
            <span className="mb-4 inline-block rounded-sm border border-[#CC9808]/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#CC9808]">
              India Tyre Show Excellence Awards 2027
            </span>
            <h1 className="font-bebas text-4xl uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl">
              Award Sponsor
              <br />
              <span className="text-[#CC9808]">Partnership Form</span>
            </h1>
            <p className="mt-4 max-w-3xl text-sm text-white/90 sm:text-base lg:text-lg">
              Partner with the premier recognition platform in the tyre industry and showcase your brand
              to global leaders, innovators and decision makers.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-gray-100 bg-[#FCF8F3] py-4">
        <Container>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="transition-colors hover:text-[#CC9808]">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/awards/" className="transition-colors hover:text-[#CC9808]">
              Awards
            </Link>
            <span className="text-gray-400">/</span>
            <span className="font-medium text-[#CC9808]">Sponsor Partnership</span>
          </div>
        </Container>
      </section>

      <section className="py-10 lg:py-16" id="form">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-sm border border-gray-100 bg-white p-6 shadow-sm md:p-8"
            >
              <button
                type="button"
                onClick={() => router.push('/awards/')}
                className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-600 transition-colors hover:text-[#CC9808]"
              >
                ← Back
              </button>

              {submitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-sm bg-[#CC9808]/10 text-2xl text-[#CC9808]">
                    ✓
                  </div>
                  <h2 className="mb-2 font-bebas text-3xl uppercase tracking-wide text-[#03193D]">
                    Enquiry Submitted
                  </h2>
                  <p className="mx-auto max-w-sm text-sm text-gray-600">
                    Thank you — our partnerships team will contact you about the {selectedPackage.title}{' '}
                    package.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="mb-1 font-bebas text-2xl uppercase tracking-wide text-[#CC9808]">
                    Sponsor Information
                  </h2>
                  <p className="mb-6 text-sm text-gray-600">
                    Please complete the form below and our team will get in touch with you.
                  </p>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Company Name" required>
                      <TextInput
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        required
                        placeholder="Enter company name"
                      />
                    </Field>
                    <Field label="Contact Person" required>
                      <TextInput
                        name="contactPerson"
                        value={form.contactPerson}
                        onChange={handleChange}
                        required
                        placeholder="Enter full name"
                      />
                    </Field>
                    <Field label="Designation" required>
                      <TextInput
                        name="designation"
                        value={form.designation}
                        onChange={handleChange}
                        required
                        placeholder="Enter designation"
                      />
                    </Field>
                    <Field label="Email Address" required>
                      <TextInput
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter email address"
                      />
                    </Field>
                    <Field label="Mobile Number" required>
                      <TextInput
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        required
                        prefix="+91"
                        placeholder="Enter mobile number"
                      />
                    </Field>
                    <Field label="Website">
                      <TextInput
                        name="website"
                        value={form.website}
                        onChange={handleChange}
                        placeholder="Enter website"
                      />
                    </Field>
                    <Field label="Address" required className="md:col-span-2">
                      <TextArea
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        placeholder="Enter complete address"
                        rows={2}
                      />
                    </Field>
                    <Field label="City" required>
                      <TextInput
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                        placeholder="Enter city"
                      />
                    </Field>
                    <Field label="State" required>
                      <Select
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        required
                        placeholder="Select state"
                        options={[
                          'Maharashtra',
                          'Karnataka',
                          'Gujarat',
                          'Delhi',
                          'Tamil Nadu',
                          'Telangana',
                          'West Bengal',
                          'Rajasthan',
                          'Uttar Pradesh',
                          'Other',
                        ]}
                      />
                    </Field>
                    <Field label="Country" required>
                      <Select
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        required
                        placeholder="Select country"
                        options={['India', 'USA', 'Germany', 'China', 'United Kingdom', 'UAE', 'Singapore', 'Other']}
                      />
                    </Field>
                    <Field label="ZIP / Pin Code" required>
                      <TextInput
                        name="pinCode"
                        value={form.pinCode}
                        onChange={handleChange}
                        required
                        placeholder="Enter PIN / ZIP code"
                      />
                    </Field>
                    <Field label="Company Type" required>
                      <Select
                        name="companyType"
                        value={form.companyType}
                        onChange={handleChange}
                        required
                        placeholder="Select company type"
                        options={['Manufacturer', 'Distributor', 'Service Provider', 'Other']}
                      />
                    </Field>
                  </div>

                  <h2 className="mb-4 mt-8 font-bebas text-2xl uppercase tracking-wide text-[#CC9808]">
                    Sponsorship Interest
                  </h2>
                  <p className="mb-3 text-sm font-medium text-[#03193D]">
                    Sponsorship Package Interested In <span className="text-[#CC9808]">*</span>
                  </p>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                    {packages.map((pkg) => (
                      <div key={pkg.title} onClick={() => handlePackageSelect(pkg)} className="cursor-pointer">
                        <RadioCard
                          name="package"
                          title={pkg.title}
                          price={pkg.price}
                          note={pkg.note}
                          checked={selectedPackage.title === pkg.title}
                          onChange={() => handlePackageSelect(pkg)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-5 md:grid-cols-1">
                    <Field label="How did you hear about the Awards?" required>
                      <Select
                        name="source"
                        value={form.source}
                        onChange={handleChange}
                        required
                        placeholder="Select an option"
                        options={['Email', 'Social Media', 'Referral', 'Website', 'Event']}
                      />
                    </Field>
                  </div>

                  <label className="mt-6 flex items-start gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 accent-[#CC9808]"
                    />
                    <span>
                      I agree to the{' '}
                      <Link href="/privacy-policy" className="text-[#CC9808] underline">
                        terms & conditions
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy-policy" className="text-[#CC9808] underline">
                        privacy policy
                      </Link>
                      .
                    </span>
                  </label>

                  {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

                  <button
                    type="submit"
                    className="mt-6 inline-flex items-center gap-2 rounded-sm bg-[#CC9808] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#03193D]"
                  >
                    Submit Enquiry →
                  </button>
                </>
              )}
            </form>

            <aside className="flex flex-col gap-6">
              <SideCard title="Why Sponsor the Awards?">
                <ul className="space-y-1">
                  <CheckItem>Position your brand among industry leaders</CheckItem>
                  <CheckItem>Gain unmatched visibility before, during and after the event</CheckItem>
                  <CheckItem>Generate qualified leads and business opportunities</CheckItem>
                  <CheckItem>Strengthen your brand image and credibility</CheckItem>
                  <CheckItem>Network with top decision makers and innovators</CheckItem>
                </ul>
              </SideCard>

              <SideCard title="Sponsorship Packages">
                <p className="mb-4 text-sm text-gray-700">
                  Choose a package that aligns with your marketing and branding goals. Click a package on
                  the form to view full benefits.
                </p>
                <Link
                  href="/awards/"
                  className="inline-block rounded-sm border border-[#CC9808] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#CC9808] transition-colors hover:bg-[#CC9808] hover:text-white"
                >
                  View Awards Page →
                </Link>
              </SideCard>

              <SideCard title="Important Dates" icon="📅">
                <DateItem label="Sponsorship Bookings Open" date="01 November 2026" />
                <DateItem label="Last Date to Confirm Sponsorship" date="28 February 2027" />
                <DateItem label="Marketing Collateral Deadline" date="15 March 2027" />
                <DateItem label="Awards Ceremony" date="23 April 2027" last />
              </SideCard>

              <SideCard title="Need Help?" icon="🎧">
                <p className="mb-3 text-sm text-gray-700">
                  Our team is here to help you create the perfect partnership.
                </p>
                <p className="text-sm text-[#03193D]">📞 +91 91483 19993</p>
                <p className="text-sm text-[#03193D]">✉️ awards@maxxmedia.in</p>
              </SideCard>
            </aside>
          </div>
        </Container>
      </section>

      <section className="bg-[#FCF8F3] py-8">
        <Container>
          <div className="grid grid-cols-2 gap-6 border-t border-gray-200 pt-6 md:grid-cols-4">
            {[
              { icon: '👤', label: 'Dedicated Account Manager' },
              { icon: '🛡️', label: 'Customized Branding Opportunities' },
              { icon: '🔗', label: 'Exclusive Networking Access' },
              { icon: '📣', label: 'Pre & Post Event Promotions' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="shrink-0 text-2xl">{item.icon}</span>
                <span className="text-sm font-semibold leading-tight text-[#03193D] md:text-base">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#03193D]/60 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-sm bg-white shadow-xl"
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-sm text-gray-500 hover:bg-gray-100"
            >
              ✕
            </button>
            <div className="p-6 md:p-8">
              <span className="mb-3 inline-block rounded-sm border border-[#CC9808]/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#CC9808]">
                {selectedPackage.title}
              </span>
              <h3 className="font-bebas text-3xl uppercase tracking-wide text-[#03193D]">
                {selectedPackage.price}
              </h3>
              <p className="mb-5 mt-1 text-sm text-gray-600">{selectedPackage.note}</p>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#CC9808]">What You Get</h4>
              <ul className="mb-6 space-y-2">
                {selectedPackage.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm text-[#03193D]">
                    <span className="mt-0.5 text-[#CC9808]">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#CC9808] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#03193D]"
              >
                Continue with {selectedPackage.title}
              </button>
            </div>
          </div>
        </div>
      )}

      <BackToTop />
    </div>
  );
}
