'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/container';
import BackToTop from '@/components/layout/BackToTop';
import PageHero from '@/components/layout/PageHero';
import { Field, TextInput, TextArea, Select } from '@/components/nominate/FormFields';

const steps = [
  'Nominator Details',
  'Nominee Details',
  'Category Selection',
  'Supporting Details',
  'Review & Submit',
];

const categoryOptions = [
  'Outstanding Tyre Manufacturing',
  'Best Rubber Compound Innovation',
  'Quality Excellence Award',
  'Tyre Testing & QC Award',
  'Machinery & Automation Award',
  'Inspection Technology Award',
  'Recycling & Sustainability Award',
  'Smart Manufacturing Award',
  'Young Professional Award',
  'Green Manufacturing Award',
  'Excellence in R&D',
  'Lifetime Achievement Award',
];

const countryOptions = [
  'India',
  'United States',
  'Germany',
  'China',
  'United Kingdom',
  'UAE',
  'Singapore',
  'Japan',
  'South Korea',
  'Thailand',
  'Malaysia',
  'Indonesia',
  'France',
  'Italy',
  'Other',
];

type FormData = {
  nominatorName: string;
  contactPerson: string;
  designation: string;
  email: string;
  mobile: string;
  nominatorCountry: string;
  nomineeName: string;
  nomineeType: 'Organization' | 'Individual';
  website: string;
  address: string;
  city: string;
  state: string;
  nomineeCountry: string;
  pinCode: string;
  nomineeEmail: string;
  nomineePhone: string;
  category: string;
  achievements: string;
  supportingLinks: string;
  additionalComments: string;
};

const initialFormData: FormData = {
  nominatorName: '',
  contactPerson: '',
  designation: '',
  email: '',
  mobile: '',
  nominatorCountry: '',
  nomineeName: '',
  nomineeType: 'Organization',
  website: '',
  address: '',
  city: '',
  state: '',
  nomineeCountry: '',
  pinCode: '',
  nomineeEmail: '',
  nomineePhone: '',
  category: '',
  achievements: '',
  supportingLinks: '',
  additionalComments: '',
};

const requiredByStep: (keyof FormData)[][] = [
  ['nominatorName', 'contactPerson', 'designation', 'email', 'mobile', 'nominatorCountry'],
  ['nomineeName', 'address', 'city', 'state', 'nomineeCountry', 'pinCode', 'nomineeEmail', 'nomineePhone'],
  ['category'],
  [],
  [],
];

export default function NominatePage() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    if (active > 0) {
      setError('');
      setActive(active - 1);
    }
  };

  const handleNext = () => {
    const missing = requiredByStep[active].some((key) => !formData[key]);
    if (missing) {
      setError('Please fill in all required fields before continuing.');
      return;
    }
    setError('');
    if (active < steps.length - 1) setActive(active + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError('Please accept the terms & privacy policy to submit your nomination.');
      return;
    }
    setError('');
    console.log('Nomination submitted:', formData);
    setSubmitted(true);
  };

  const goToStep = (i: number) => {
    if (i <= active) {
      setError('');
      setActive(i);
    }
  };

  return (
    <div className="intro-animation overflow-hidden bg-white font-sans">
      <PageHero
        title="AWARDS"
        accent="NOMINATE"
        subtitle="Recognize. Celebrate. Inspire excellence. Nominate the best organisations and individuals shaping the future of metrology and precision manufacturing."
      />

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
            <span className="font-medium text-[#CC9808]">Nomination Form</span>
          </div>
        </Container>
      </section>

      <section className="bg-[#FCF8F3] py-8">
        <Container>
          <div className="flex items-start overflow-x-auto pb-2">
            {steps.map((label, i) => {
              const isReached = i <= active;
              return (
                <div key={label} className="flex flex-1 items-center last:flex-none">
                  <div className="flex min-w-[4.5rem] flex-col items-center gap-2">
                    <button
                      type="button"
                      onClick={() => goToStep(i)}
                      disabled={i > active}
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors duration-300 ${
                        isReached
                          ? 'cursor-pointer border-[#CC9808] bg-[#CC9808] text-white'
                          : 'cursor-not-allowed border-gray-300 bg-white text-gray-700'
                      }`}
                    >
                      {i + 1}
                    </button>
                    <span
                      className={`hidden text-center text-[10px] uppercase tracking-wide sm:block ${
                        i === active ? 'font-bold text-[#CC9808]' : 'text-gray-600'
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <span
                      className={`mx-2 mb-5 h-px flex-1 transition-colors duration-300 ${
                        i < active ? 'bg-[#CC9808]' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              );
            })}
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
                ← Back to Awards
              </button>

              {submitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-sm bg-[#CC9808]/10 text-2xl text-[#CC9808]">
                    ✓
                  </div>
                  <h2 className="mb-2 font-bebas text-3xl uppercase tracking-wide text-[#03193D]">
                    Nomination Submitted
                  </h2>
                  <p className="mx-auto max-w-sm text-sm text-gray-600">
                    Thank you — your nomination has been received. Our team will review it and get in
                    touch if any further details are needed.
                  </p>
                </div>
              ) : (
                <>
                  {active === 0 && (
                    <div>
                      <h2 className="mb-4 font-bebas text-2xl uppercase tracking-wide text-[#CC9808]">
                        1. Nominator Details
                      </h2>
                      <div className="grid gap-5 md:grid-cols-2">
                        <Field label="Name of Nominator / Organization" required className="md:col-span-2">
                          <TextInput
                            name="nominatorName"
                            value={formData.nominatorName}
                            onChange={handleChange}
                            placeholder="Enter your name or organization"
                          />
                        </Field>
                        <Field label="Contact Person" required>
                          <TextInput
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={handleChange}
                            placeholder="Enter contact person name"
                          />
                        </Field>
                        <Field label="Designation" required>
                          <TextInput
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            placeholder="Enter designation"
                          />
                        </Field>
                        <Field label="Email Address" required>
                          <TextInput
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                          />
                        </Field>
                        <Field label="Mobile Number" required>
                          <TextInput
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            prefix="+91"
                            placeholder="Enter mobile number"
                          />
                        </Field>
                        <Field label="Country" required>
                          <Select
                            name="nominatorCountry"
                            value={formData.nominatorCountry}
                            onChange={handleChange}
                            placeholder="Select country"
                            options={countryOptions}
                          />
                        </Field>
                      </div>
                    </div>
                  )}

                  {active === 1 && (
                    <div>
                      <h2 className="mb-4 font-bebas text-2xl uppercase tracking-wide text-[#CC9808]">
                        2. Nominee Details
                      </h2>
                      <div className="grid gap-5 md:grid-cols-2">
                        <Field
                          label="Name of Nominee (Organization / Individual)"
                          required
                          className="md:col-span-2"
                        >
                          <TextInput
                            name="nomineeName"
                            value={formData.nomineeName}
                            onChange={handleChange}
                            placeholder="Enter nominee name"
                          />
                        </Field>

                        <div className="flex items-center gap-6 text-sm text-gray-700 md:col-span-2">
                          <span className="font-medium">
                            Type of Nominee <span className="text-[#CC9808]">*</span>
                          </span>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="nomineeType"
                              value="Organization"
                              checked={formData.nomineeType === 'Organization'}
                              onChange={handleChange}
                              className="accent-[#CC9808]"
                            />
                            Organization
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="nomineeType"
                              value="Individual"
                              checked={formData.nomineeType === 'Individual'}
                              onChange={handleChange}
                              className="accent-[#CC9808]"
                            />
                            Individual
                          </label>
                        </div>

                        <Field label="Website">
                          <TextInput
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="Enter website (if applicable)"
                          />
                        </Field>
                        <Field label="Address" required className="md:col-span-2">
                          <TextArea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter complete address"
                            rows={2}
                          />
                        </Field>
                        <Field label="City" required>
                          <TextInput
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter city"
                          />
                        </Field>
                        <Field label="State / Province" required>
                          <TextInput
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="Enter state"
                          />
                        </Field>
                        <Field label="Country" required>
                          <Select
                            name="nomineeCountry"
                            value={formData.nomineeCountry}
                            onChange={handleChange}
                            placeholder="Select country"
                            options={countryOptions}
                          />
                        </Field>
                        <Field label="PIN / ZIP Code" required>
                          <TextInput
                            name="pinCode"
                            value={formData.pinCode}
                            onChange={handleChange}
                            placeholder="Enter PIN / ZIP"
                          />
                        </Field>
                        <Field label="Email" required>
                          <TextInput
                            type="email"
                            name="nomineeEmail"
                            value={formData.nomineeEmail}
                            onChange={handleChange}
                            placeholder="Enter email address"
                          />
                        </Field>
                        <Field label="Phone / Mobile" required>
                          <TextInput
                            name="nomineePhone"
                            value={formData.nomineePhone}
                            onChange={handleChange}
                            prefix="+91"
                            placeholder="Enter number"
                          />
                        </Field>
                      </div>
                    </div>
                  )}

                  {active === 2 && (
                    <div>
                      <h2 className="mb-4 font-bebas text-2xl uppercase tracking-wide text-[#CC9808]">
                        3. Category Selection
                      </h2>
                      <Field label="Select Award Category" required>
                        <Select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          placeholder="-- Select Award Category --"
                          options={categoryOptions}
                        />
                      </Field>
                      <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-sm border border-gray-200 bg-[#FCF8F3] p-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">🏆</span>
                          <p className="text-sm text-gray-700">Not sure which category to choose?</p>
                        </div>
                        <Link
                          href="/awards/"
                          className="whitespace-nowrap rounded-sm border border-[#CC9808] px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#CC9808] transition-colors hover:bg-[#CC9808] hover:text-white"
                        >
                          View Categories →
                        </Link>
                      </div>
                    </div>
                  )}

                  {active === 3 && (
                    <div>
                      <h2 className="mb-4 font-bebas text-2xl uppercase tracking-wide text-[#CC9808]">
                        4. Supporting Details
                      </h2>
                      <div className="grid gap-5">
                        <Field label="Key Achievements / Notable Contributions">
                          <TextArea
                            name="achievements"
                            value={formData.achievements}
                            onChange={handleChange}
                            placeholder="Describe the nominee's key achievements relevant to this category"
                            rows={4}
                          />
                        </Field>
                        <Field label="Supporting Links (media coverage, case studies, etc.)">
                          <TextInput
                            name="supportingLinks"
                            value={formData.supportingLinks}
                            onChange={handleChange}
                            placeholder="Paste one or more links, separated by commas"
                          />
                        </Field>
                        <Field label="Additional Comments">
                          <TextArea
                            name="additionalComments"
                            value={formData.additionalComments}
                            onChange={handleChange}
                            placeholder="Anything else the jury should know"
                            rows={3}
                          />
                        </Field>
                      </div>
                    </div>
                  )}

                  {active === 4 && (
                    <div>
                      <h2 className="mb-4 font-bebas text-2xl uppercase tracking-wide text-[#CC9808]">
                        5. Review & Submit
                      </h2>
                      <p className="mb-6 text-sm text-gray-500">
                        Please check everything below before submitting. You can jump back to any earlier
                        step using the numbers above.
                      </p>
                      <div className="space-y-6">
                        <ReviewSection
                          title="Nominator Details"
                          rows={[
                            ['Name of Nominator / Organization', formData.nominatorName],
                            ['Contact Person', formData.contactPerson],
                            ['Designation', formData.designation],
                            ['Email Address', formData.email],
                            ['Mobile Number', formData.mobile],
                            ['Country', formData.nominatorCountry],
                          ]}
                        />
                        <ReviewSection
                          title="Nominee Details"
                          rows={[
                            ['Name of Nominee', formData.nomineeName],
                            ['Type of Nominee', formData.nomineeType],
                            ['Website', formData.website],
                            ['Address', formData.address],
                            ['City', formData.city],
                            ['State / Province', formData.state],
                            ['Country', formData.nomineeCountry],
                            ['PIN / ZIP Code', formData.pinCode],
                            ['Email', formData.nomineeEmail],
                            ['Phone / Mobile', formData.nomineePhone],
                          ]}
                        />
                        <ReviewSection title="Category Selection" rows={[['Award Category', formData.category]]} />
                        <ReviewSection
                          title="Supporting Details"
                          rows={[
                            ['Key Achievements', formData.achievements],
                            ['Supporting Links', formData.supportingLinks],
                            ['Additional Comments', formData.additionalComments],
                          ]}
                        />
                      </div>
                      <label className="mt-6 flex items-start gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="mt-1 accent-[#CC9808]"
                        />
                        <span>
                          I confirm the above details are accurate and I agree to the{' '}
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
                    </div>
                  )}

                  {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

                  <div className="mt-8 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={active === 0}
                      className={`inline-flex items-center gap-2 rounded-sm px-6 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                        active === 0
                          ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ← Previous Step
                    </button>

                    {active === steps.length - 1 ? (
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-sm bg-[#CC9808] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#03193D]"
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="inline-flex items-center gap-2 rounded-sm bg-[#CC9808] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#03193D]"
                      >
                        Save & Continue →
                      </button>
                    )}
                  </div>
                </>
              )}
            </form>

            <aside className="flex flex-col gap-6">
              <div className="rounded-sm border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-3 font-bebas text-xl uppercase tracking-wide text-[#CC9808]">
                  About the Awards
                </h3>
                <p className="mb-3 text-sm text-gray-700">
                  The India Tyre Show Excellence Awards honour outstanding achievement, innovation, and
                  leadership in tyre manufacturing, rubber technology, testing, and quality.
                </p>
                <Link
                  href="/awards/"
                  className="text-xs font-bold uppercase tracking-wider text-[#CC9808] hover:underline"
                >
                  Know more about →
                </Link>
              </div>

              <div className="rounded-sm border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-3 font-bebas text-xl uppercase tracking-wide text-[#CC9808]">Why Nominate?</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    'Gain global recognition',
                    'Enhance brand reputation',
                    'Showcase innovation & excellence',
                    'Benchmark against industry leaders',
                    'Expand business opportunities',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[#CC9808]">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-sm border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-3 font-bebas text-xl uppercase tracking-wide text-[#CC9808]">
                  Important Dates
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Nominations Open</p>
                    <p className="text-sm font-semibold text-[#03193D]">01 November 2026</p>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-xs text-gray-500">Last Date to Nominate</p>
                    <p className="text-sm font-semibold text-[#03193D]">31 January 2027</p>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-xs text-gray-500">Finalists Announcement</p>
                    <p className="text-sm font-semibold text-[#03193D]">15 March 2027</p>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-xs text-gray-500">Awards Ceremony</p>
                    <p className="text-sm font-bold text-[#CC9808]">23 April 2027</p>
                  </div>
                </div>
              </div>

              <div className="rounded-sm border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-3 font-bebas text-xl uppercase tracking-wide text-[#CC9808]">Need Help?</h3>
                <p className="mb-3 text-sm text-gray-700">Our team is here to assist you with your nomination.</p>
                <p className="text-sm text-[#03193D]">📞 +91 91483 19993</p>
                <p className="text-sm text-[#03193D]">✉️ support@tyre-expo.com</p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="bg-[#FCF8F3] py-6 sm:py-8">
        <Container>
          <div className="grid grid-cols-1 gap-6 border-t border-gray-200 pt-6 md:grid-cols-3 lg:gap-10 sm:pt-8">
            <div className="flex items-start gap-4">
              <span className="shrink-0 text-2xl leading-none sm:text-3xl">🔒</span>
              <p className="text-sm font-medium leading-snug text-gray-700 sm:text-base">
                Secure & Confidential — All nominations are treated with the utmost confidentiality
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="shrink-0 text-2xl leading-none sm:text-3xl">📄</span>
              <p className="text-sm font-medium leading-snug text-gray-700 sm:text-base">
                Easy Nomination Process — Simple 5-step process to submit securely online
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="shrink-0 text-2xl leading-none sm:text-3xl">🏅</span>
              <p className="text-sm font-medium leading-snug text-gray-700 sm:text-base">
                Celebrate Excellence — Join us at the India Tyre Show Awards Night
              </p>
            </div>
          </div>
        </Container>
      </section>

      <BackToTop />
    </div>
  );
}

function ReviewSection({ title, rows }: { title: string; rows: [string, string][] }) {
  const filled = rows.filter(([, value]) => value && value.trim() !== '');
  return (
    <div className="rounded-sm border border-gray-200 p-4">
      <h4 className="mb-3 text-sm font-semibold text-[#03193D]">{title}</h4>
      {filled.length === 0 ? (
        <p className="text-xs italic text-gray-400">Nothing entered</p>
      ) : (
        <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {filled.map(([label, value]) => (
            <div key={label}>
              <dt className="text-[11px] uppercase tracking-wide text-gray-400">{label}</dt>
              <dd className="break-words text-sm text-gray-800">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
