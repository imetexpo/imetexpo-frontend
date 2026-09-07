'use client'
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function DelegateForm() {
  type Country = {
    name: string;
  };

  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
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
    notRobot: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!formData.notRobot) {
      toast.error("Please confirm that you are not a robot.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://your-backend-url.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'tyre-expo-delegate',
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Delegate registration submitted successfully!');
        
        setFormData({
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
          notRobot: false
        });
      } else {
        toast.error(result.message || 'Failed to submit registration.');
      }
    } catch (error) {
      toast.error('Network error. Please check your connection.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setCountriesLoading(true);
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
        const data = await res.json();

        const sortedCountries = data
          .map((c: any) => ({ name: c.name.common }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

        setCountries(sortedCountries);
      } catch (error) {
        console.error("Failed to fetch countries", error);
      } finally {
        setCountriesLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      
      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-orange-200 bg-white p-6 shadow-lg">
        <h3 className="text-2xl font-bold text-[#CC9808] border-b border-orange-200 pb-3">
          Register as Delegate
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              First Name<span className="ml-1 text-[#CC9808]">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#CC9808] focus:outline-none focus:ring-1 focus:ring-[#CC9808] transition-colors"
              placeholder="First name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Last Name<span className="ml-1 text-[#CC9808]">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#CC9808] focus:outline-none focus:ring-1 focus:ring-[#CC9808] transition-colors"
              placeholder="Last name"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Company Name<span className="ml-1 text-[#CC9808]">*</span>
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#CC9808] focus:outline-none focus:ring-1 focus:ring-[#CC9808] transition-colors"
            placeholder="Company name"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Job Title<span className="ml-1 text-[#CC9808]">*</span>
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#CC9808] focus:outline-none focus:ring-1 focus:ring-[#CC9808] transition-colors"
            placeholder="Job title"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Work Email<span className="ml-1 text-[#CC9808]">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#CC9808] focus:outline-none focus:ring-1 focus:ring-[#CC9808] transition-colors"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Phone<span className="ml-1 text-[#CC9808]">*</span>
          </label>
          <div className="flex">
            <div className="flex items-center gap-2 border border-gray-300 bg-gray-50 px-3 py-2 rounded-l-lg border-r-0">
              <span className="text-gray-700 font-medium">+91</span>
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="flex-1 rounded-r-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#CC9808] focus:outline-none focus:ring-1 focus:ring-[#CC9808] transition-colors"
              placeholder="9876543210"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Country<span className="ml-1 text-[#CC9808]">*</span>
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#CC9808] focus:outline-none focus:ring-1 focus:ring-[#CC9808] transition-colors bg-white"
          >
            <option value="">
              {countriesLoading ? "Loading countries..." : "Select Country"}
            </option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              State<span className="ml-1 text-[#CC9808]">*</span>
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              placeholder="Enter your state"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#CC9808] focus:outline-none focus:ring-1 focus:ring-[#CC9808] transition-colors"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              City<span className="ml-1 text-[#CC9808]">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="Enter your city"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#CC9808] focus:outline-none focus:ring-1 focus:ring-[#CC9808] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Select Package<span className="ml-1 text-[#CC9808]">*</span>
          </label>
          <select
            name="package"
            value={formData.package}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#CC9808] focus:outline-none focus:ring-1 focus:ring-[#CC9808] transition-colors bg-white"
          >
            <option value="">Choose Delegate Category</option>
            <option value="student">STUDENT - ₹3,500</option>
            <option value="general">GENERAL - ₹6,000</option>
            <option value="group">GROUP OF 3 - ₹15,000</option>
          </select>
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            name="notRobot"
            checked={formData.notRobot}
            onChange={(e) => setFormData(prev => ({ ...prev, notRobot: e.target.checked }))}
            required
            className="mt-1 text-[#CC9808] focus:ring-[#CC9808] rounded"
          />
          <label className="text-sm text-gray-700">
            I confirm that I am not a robot<span className="ml-1 text-[#CC9808]">*</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full rounded-lg bg-[#CC9808] px-6 py-3 text-sm font-semibold text-white hover:bg-[#d97000] hover:scale-105 transition-all duration-300 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Processing...' : 'Register as Delegate →'}
        </button>

        <p className="text-[11px] leading-relaxed text-gray-500 text-center">
          By submitting this form, you agree to receive marketing
          communications. You can unsubscribe anytime. Read our{' '}
          <a
            href="/privacy-policy"
            className="text-[#CC9808] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>.
        </p>
      </form>
    </>
  );
}