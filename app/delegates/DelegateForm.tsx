'use client';

import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import LoadingDots from '@/components/ui/LoadingDots';
import { getBackendUrl, getContactApiUrl } from '@/lib/api/backendUrl';



export const DELEGATE_PENDING_REGISTRATION_KEY = 'indiamet_delegate_pending_registration';
declare global {
  interface Window {
    Cashfree?: (options: { mode: 'sandbox' | 'production' }) => {
      checkout: (options: { paymentSessionId: string; redirectTarget: '_self' }) => Promise<{ orderId?: string; error?: string }>;
    };
  }
}
function loadCashfreeSdk() {
  return new Promise<void>((resolve, reject) => {
    if (window.Cashfree) return resolve();
    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Could not load the Cashfree payment gateway.'));
    document.body.appendChild(script);
  });
}
async function finishPaidRegistration(orderId: string, registration: typeof emptyForm) {
  let verification: any = null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await fetch(getBackendUrl() + '/api/cashfree/delegate/verify-payment/' + encodeURIComponent(orderId), { cache: 'no-store' });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.error || 'Could not verify your payment.');
    verification = result.data;
    if (verification?.paymentStatus === 'SUCCESS') break;
    if (verification?.paymentStatus !== 'PENDING') throw new Error('Payment was not completed. Please try again.');
    if (attempt < 2) await new Promise((resolve) => window.setTimeout(resolve, 1200));
  }
  if (verification?.paymentStatus !== 'SUCCESS') throw new Error('Your payment is still being confirmed. Please refresh this page in a moment.');
  const response = await fetch(getContactApiUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...registration, formType: 'delegate-registration', paymentOrderId: orderId, paymentStatus: 'SUCCESS', submittedAt: new Date().toISOString() }),
  });
  const result = await response.json();
  if (!response.ok || !result.success) throw new Error(result.message || result.error || 'Payment succeeded, but registration could not be completed.');
  return registration.firstName;
}
type Country = { name: string };
type State = { name: string };
type City = { name: string };

const inputClass =
  'w-full rounded-sm border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1] disabled:cursor-not-allowed disabled:bg-gray-100';

const emptyForm = {
  firstName: '',
  lastName: '',
  company: '',
  jobTitle: '',
  email: '',
  phone: '',
  website: '',
  address: '',
  country: '',
  state: '',
  city: '',
  pin: '',
  promocode: '',
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
  const [paymentError, setPaymentError] = useState('');
  const callbackHandled = useRef(false);
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
    const orderId = new URLSearchParams(window.location.search).get('delegate_order_id');
    if (!orderId || callbackHandled.current) return;
    callbackHandled.current = true;
    let registration: typeof emptyForm;
    try {
      const saved = window.sessionStorage.getItem(DELEGATE_PENDING_REGISTRATION_KEY);
      if (!saved) throw new Error('Your registration details could not be restored. Please choose a package and register again.');
      registration = JSON.parse(saved);
      setFormData(registration);
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : 'Could not restore your registration details.');
      const url = new URL(window.location.href);
      url.searchParams.delete('delegate_order_id');
      window.history.replaceState({}, '', url.pathname + url.search + url.hash);
      return;
    }
    setIsSubmitting(true);
    finishPaidRegistration(orderId, registration)
      .then((name) => {
        window.sessionStorage.removeItem(DELEGATE_PENDING_REGISTRATION_KEY);
        setSubmittedName(name);
        setShowThankYou(true);
        setFormData(emptyForm);
      })
      .catch((error) => {
        console.error('Delegate payment return error:', error);
        setPaymentError(error instanceof Error ? error.message : 'Could not complete your delegate registration.');
      })
      .finally(() => {
        setIsSubmitting(false);
        const url = new URL(window.location.href);
        url.searchParams.delete('delegate_order_id');
        window.history.replaceState({}, '', url.pathname + url.search + url.hash);
      });
  }, []);

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
    if (!formData.notRobot) {
      toast.error('Please confirm that you are not a robot.');
      return;
    }
    if (!formData.package) {
      toast.error('Please choose a delegate package.');
      return;
    }

    setIsSubmitting(true);
    setPaymentError('');
    try {
      const response = await fetch(getBackendUrl() + '/api/cashfree/delegate/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
<<<<<<< Updated upstream
          ...formData,
          pincode: formData.pin,
          companyName: formData.company,
          formType: 'delegate-registration',
          submittedAt: new Date().toISOString(),
=======
          package: formData.package,
          customerDetails: {
            customerName: [formData.firstName, formData.lastName].filter(Boolean).join(' '),
            customerEmail: formData.email,
            customerPhone: formData.phone,
          },
>>>>>>> Stashed changes
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Could not start secure payment.');
      }
      if (!result.data?.paymentSessionId || !result.data?.orderId) {
        throw new Error('Cashfree did not return a payment session. Please try again.');
      }
      window.sessionStorage.setItem(DELEGATE_PENDING_REGISTRATION_KEY, JSON.stringify(formData));
      await loadCashfreeSdk();
      const cashfree = window.Cashfree?.({
        mode: result.data.environment === 'sandbox' ? 'sandbox' : 'production',
      });
      if (!cashfree) throw new Error('Cashfree is not available. Please try again.');
      const paymentResult = await cashfree.checkout({
        paymentSessionId: result.data.paymentSessionId,
        redirectTarget: '_self',
      });
      if (paymentResult?.error) throw new Error(paymentResult.error);
      if (paymentResult?.orderId) {
        const name = await finishPaidRegistration(paymentResult.orderId, formData);
        window.sessionStorage.removeItem(DELEGATE_PENDING_REGISTRATION_KEY);
        setSubmittedName(name);
        setShowThankYou(true);
        setFormData(emptyForm);
      } else {
        setPaymentError('Checkout was closed before payment finished. Your details are saved; choose Continue to Payment to try again.');
      }
    } catch (error) {
      console.error('Delegate checkout error:', error);
      const message = error instanceof Error ? error.message : 'Payment could not be started. Please try again.';
      setPaymentError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showThankYou) {
    return (
      <div className="rounded-sm border border-gray-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-sm bg-[#00A1B1]/10 text-2xl text-[#00A1B1]">
          ✓
        </div>
        <h3 className="font-bebas text-3xl uppercase tracking-wide text-[#003A77]">
          Thank You{submittedName ? `, ${submittedName}` : ''}
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Your payment and delegate registration are complete. Your delegate pass will be sent to your email.
        </p>
        <button
          type="button"
          onClick={() => setShowThankYou(false)}
          className="mt-6 rounded-sm bg-[#00A1B1] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#003A77]"
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
        <h3 className="border-b border-gray-100 pb-3 font-bebas text-2xl uppercase tracking-wide text-[#00A1B1]">
          Register as Delegate
        </h3>

        {paymentError && <p role="alert" className="rounded-sm bg-red-50 p-3 text-sm text-red-700">{paymentError}</p>}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
              First Name <span className="text-[#00A1B1]">*</span>
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
              Last Name <span className="text-[#00A1B1]">*</span>
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
              Company Name <span className="text-[#00A1B1]">*</span>
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
              Job Title <span className="text-[#00A1B1]">*</span>
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
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
              Work Email <span className="text-[#00A1B1]">*</span>
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
              Phone <span className="text-[#00A1B1]">*</span>
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
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
            Website
          </label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className={inputClass}
            placeholder="Company website (e.g. https://example.com)"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
            Address <span className="text-[#00A1B1]">*</span>
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="Office or street address"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
            Country <span className="text-[#00A1B1]">*</span>
          </label>
          <div className="relative"><select
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
          </select>{countriesLoading && <LoadingDots size="sm" className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2" label="Loading countries..." />}</div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
              State <span className="text-[#00A1B1]">*</span>
            </label>
            <div className="relative"><select
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
            </select>{statesLoading && <LoadingDots size="sm" className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2" label="Loading states..." />}</div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
              City <span className="text-[#00A1B1]">*</span>
            </label>
            <div className="relative"><select
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
            </select>{citiesLoading && <LoadingDots size="sm" className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2" label="Loading cities..." />}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
              PIN / Pincode <span className="text-[#00A1B1]">*</span>
            </label>
            <input
              type="text"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="PIN / Postal Code"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
              Promo Code
            </label>
            <input
              type="text"
              name="promocode"
              value={formData.promocode}
              onChange={handleChange}
              className={inputClass}
              placeholder="Promo code (optional)"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
            Select Package <span className="text-[#00A1B1]">*</span>
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
            className="mt-1 accent-[#00A1B1]"
          />
          <span>
            I confirm that I am not a robot <span className="text-[#00A1B1]">*</span>
          </span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`rounded-sm bg-[#00A1B1] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#003A77] ${
            isSubmitting ? 'cursor-not-allowed opacity-70' : ''
          }`}
        >
          {isSubmitting ? <span className="inline-flex items-center justify-center gap-2"><LoadingDots size="sm" tone="light" label="" />Processing...</span> : 'Continue to Payment'}
        </button>

        <p className="text-[11px] leading-relaxed text-gray-500">
          By submitting this form, you agree to receive marketing communications. You can
          unsubscribe anytime. Read our{' '}
          <a href="/privacy-policy" className="text-[#00A1B1] underline" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </>
  );
}
