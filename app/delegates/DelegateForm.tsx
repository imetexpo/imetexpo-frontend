'use client';

import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

type Country = { name: string };
type State = { name: string };
type City = { name: string };

const inputClass =
  'w-full rounded-sm border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#CC9808] focus:ring-1 focus:ring-[#CC9808] disabled:cursor-not-allowed disabled:bg-gray-100';

const emptyForm = {
  firstName: '',
  lastName: '',
  company: '',
  jobTitle: '',
  email: '',
  phone: '',
  country: '',
  state: '',
  city: '',
  package: '',
  notRobot: false,
};

export default function DelegateForm({ selectedPackage = '' }: { selectedPackage?: string }) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [statesLoading, setStatesLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (selectedPackage) {
      setFormData((prev) => ({ ...prev, package: selectedPackage }));
    }
  }, [selectedPackage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setCountriesLoading(true);
        const res = await fetch('https://countriesnow.space/api/v0.1/countries');
        if (!res.ok) throw new Error(`Countries API failed: ${res.status}`);
        const result = await res.json();
        const mapped = (result.data || [])
          .map((item: { country?: string; name?: string }) => ({
            name: item.country || item.name || '',
          }))
          .filter((item: Country) => item.name)
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
        setCountries(mapped);
      } catch (error) {
        console.error('Failed to fetch countries', error);
        toast.error('Failed to load countries');
      } finally {
        setCountriesLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      if (!formData.country) {
        setStates([]);
        return;
      }

      try {
        setStatesLoading(true);
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ country: formData.country }),
        });
        const result = await response.json();
        const sorted = (result.data?.states || [])
          .map((state: { name: string }) => ({ name: state.name }))
          .sort((a: State, b: State) => a.name.localeCompare(b.name));
        setStates(sorted);
        setFormData((prev) => ({ ...prev, state: '', city: '' }));
        setCities([]);
      } catch (error) {
        console.error('Failed to fetch states', error);
        toast.error('Failed to load states');
        setStates([]);
      } finally {
        setStatesLoading(false);
      }
    };

    fetchStates();
  }, [formData.country]);

  useEffect(() => {
    const fetchCities = async () => {
      if (!formData.country || !formData.state) {
        setCities([]);
        return;
      }

      try {
        setCitiesLoading(true);
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            country: formData.country,
            state: formData.state,
          }),
        });
        const result = await response.json();
        const sorted = (result.data || [])
          .map((city: string) => ({ name: city }))
          .sort((a: City, b: City) => a.name.localeCompare(b.name));
        setCities(sorted);
        setFormData((prev) => ({ ...prev, city: '' }));
      } catch (error) {
        console.error('Failed to fetch cities', error);
        toast.error('Failed to load cities');
        setCities([]);
      } finally {
        setCitiesLoading(false);
      }
    };

    fetchCities();
  }, [formData.country, formData.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.notRobot) {
      toast.error('Please confirm that you are not a robot.');
      setIsSubmitting(false);
      return;
    }

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiBase}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          formType: 'delegate-registration',
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Backend responded with status ${response.status}`);
      }

      const result = await response.json();
      if (!result.success) {
        toast.error(result.message || 'Failed to submit registration.');
        return;
      }

      toast.success('Delegate registration submitted successfully!');
      setSubmittedName(formData.firstName);
      setShowThankYou(true);
      setFormData(emptyForm);
      setStates([]);
      setCities([]);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showThankYou) {
    return (
      <div className="rounded-sm border border-gray-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-sm bg-[#CC9808]/10 text-2xl text-[#CC9808]">
          ✓
        </div>
        <h3 className="font-bebas text-3xl uppercase tracking-wide text-[#03193D]">
          Thank You{submittedName ? `, ${submittedName}` : ''}
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Your delegate registration has been received. Our team will contact you shortly.
        </p>
        <button
          type="button"
          onClick={() => setShowThankYou(false)}
          className="mt-6 rounded-sm bg-[#CC9808] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#03193D]"
        >
          Register another delegate
        </button>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-sm border border-gray-100 bg-white p-6 shadow-sm"
      >
        <h3 className="border-b border-gray-100 pb-3 font-bebas text-2xl uppercase tracking-wide text-[#CC9808]">
          Register as Delegate
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
              First Name <span className="text-[#CC9808]">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="First name"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
              Last Name <span className="text-[#CC9808]">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Last name"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
            Company Name <span className="text-[#CC9808]">*</span>
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="Company name"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
            Job Title <span className="text-[#CC9808]">*</span>
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="Job title"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
            Work Email <span className="text-[#CC9808]">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
            Phone <span className="text-[#CC9808]">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="Phone number"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
            Country <span className="text-[#CC9808]">*</span>
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">{countriesLoading ? 'Loading countries...' : 'Select Country'}</option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
              State <span className="text-[#CC9808]">*</span>
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              disabled={!formData.country || statesLoading}
              className={inputClass}
            >
              <option value="">
                {statesLoading
                  ? 'Loading states...'
                  : !formData.country
                    ? 'Select country first'
                    : 'Select State'}
              </option>
              {states.map((state) => (
                <option key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
              City <span className="text-[#CC9808]">*</span>
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              required={cities.length > 0}
              disabled={!formData.state || citiesLoading}
              className={inputClass}
            >
              <option value="">
                {citiesLoading
                  ? 'Loading cities...'
                  : !formData.state
                    ? 'Select state first'
                    : cities.length === 0
                      ? 'No cities found — type in state if needed'
                      : 'Select City'}
              </option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
            Select Package <span className="text-[#CC9808]">*</span>
          </label>
          <select
            name="package"
            value={formData.package}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Choose Delegate Category</option>
            <option value="student">STUDENT — ₹3,500</option>
            <option value="general">GENERAL — ₹6,000</option>
            <option value="group">GROUP OF 3 — ₹15,000</option>
          </select>
        </div>

        <label className="flex items-start gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            name="notRobot"
            checked={formData.notRobot}
            onChange={(e) => setFormData((prev) => ({ ...prev, notRobot: e.target.checked }))}
            required
            className="mt-1 accent-[#CC9808]"
          />
          <span>
            I confirm that I am not a robot <span className="text-[#CC9808]">*</span>
          </span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`rounded-sm bg-[#CC9808] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#03193D] ${
            isSubmitting ? 'cursor-not-allowed opacity-70' : ''
          }`}
        >
          {isSubmitting ? 'Processing...' : 'Register as Delegate'}
        </button>

        <p className="text-[11px] leading-relaxed text-gray-500">
          By submitting this form, you agree to receive marketing communications. You can
          unsubscribe anytime. Read our{' '}
          <a href="/privacy-policy" className="text-[#CC9808] underline" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </>
  );
}
