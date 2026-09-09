// app/post-show-report/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/container";
import BackToTop from "@/components/layout/BackToTop";
import PartnersSection from "@/components/home/PartnersSection";

// Type definitions for components
interface InputProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

interface SelectProps {
  label: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  options?: { value: string; label: string }[];
}

interface CheckboxGroupProps {
  label: string;
  options: string[];
  required?: boolean;
  selectedValues?: string[];
  onChange?: (values: string[]) => void;
  name?: string;
}

// Reusable Input Component
function Input({ label, placeholder, required, type = "text", value, onChange, name }: InputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
        {label} {required && <span className="text-[#CC9808]">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
      />
    </div>
  );
}

// Reusable Select Component
function Select({ label, required, value, onChange, name, options = [] }: SelectProps) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
        {label} {required && <span className="text-[#CC9808]">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm cursor-pointer"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Reusable CheckboxGroup Component
function CheckboxGroup({ label, options, required, selectedValues = [], onChange, name }: CheckboxGroupProps) {
  const handleCheckboxChange = (option: string) => {
    const newSelectedValues = selectedValues.includes(option)
      ? selectedValues.filter((v) => v !== option)
      : [...selectedValues, option];
    onChange?.(newSelectedValues);
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
        {label} {required && <span className="text-[#CC9808]">*</span>}
      </label>
      <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-sm p-3 bg-white shadow-inner">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {options.map((option) => (
            <label key={option} className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-sm">
              <input
                type="checkbox"
                name={name}
                checked={selectedValues.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="mt-0.5 w-4 h-4 text-[#CC9808] focus:ring-[#CC9808] rounded-sm border-gray-300"
              />
              <span className="text-xs text-gray-650 font-medium">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

const productSectors = [
  "Coordinate Measuring Machines (CMM)",
  "Dimensional Measurement & Gauging",
  "Optical & Vision Metrology",
  "3D Scanning & Digital Measurement",
  "Surface & Form Measurement",
  "Calibration & Reference Standards",
  "Testing & Quality Inspection",
  "Sensors, Probes & Measurement Systems",
  "Metrology Software & Digital Quality",
  "Automation & Industry 4.0",
  "Precision Instruments & Gauges",
  "Metrology Services & Laboratories",
];

const countries = [
  "Afghanistan", "Armenia", "Azerbaijan", "Belarus", "China", "France",
  "Germany", "India", "Kazakhstan", "Kyrgyzstan", "Russia", "Tajikistan",
  "Turkmenistan", "United Kingdom", "United States", "Uzbekistan"
];

const sendSizes = ["Up to 100 sqm", "100-200 sqm", "200-500 sqm", "500+ sqm"];
const hearAboutOptions = ["Google", "LinkedIn", "Email", "Word of Mouth", "Conference", "Other"];

const statsData = [
  { value: "10,000+", label: "Visitors" },
  { value: "150+", label: "Exhibitors" },
  { value: "20+", label: "Countries" },
  { value: "1st", label: "Edition" },
];

export default function PostShowReportPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    companyWebsite: "",
    jobTitle: "",
    country: "",
    phone: "",
    workEmail: "",
    preferredSendSize: "",
    howDidYouHear: "",
    productSectors: [] as string[],
    captcha: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (sectors: string[]) => {
    setFormData((prev) => ({
      ...prev,
      productSectors: sectors,
    }));
  };

  const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, captcha: e.target.checked });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.companyName || !formData.jobTitle || 
        !formData.country || !formData.phone || !formData.workEmail || !formData.preferredSendSize) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    if (!formData.captcha) {
      setSubmitError('Please verify that you are not a robot');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setSubmitSuccess(true);
      setIsSubmitting(false);
    }, 1500);
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-20 font-sans">
        <Container>
          <div className="bg-[#FCF8F3] border border-gray-100 rounded-sm p-8 max-w-md text-center shadow-sm mx-auto">
            <div className="w-16 h-16 bg-white border border-gray-150 rounded-sm flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#CC9808]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-bebas text-4xl text-[#03193D] mb-3 uppercase tracking-wide">Thank You!</h2>
            <p className="text-sm text-gray-655 mb-6 leading-relaxed">Your post-show report has been sent to your email address.</p>
            <Link href="/">
              <button className="bg-[#CC9808] hover:bg-[#03193D] text-white px-8 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer">
                Back to Home
              </button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="intro-animation font-sans">
      <section className="bg-white pt-[120px] lg:pt-8 pb-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-12 items-start">
            
            {/* LEFT SECTION - Content */}
            <div className="flex flex-col gap-6 lg:sticky h-fit lg:top-[calc(var(--site-header-height,13.75rem)+1rem)]">
              <div className="space-y-3">
                <p className="text-[#CC9808] text-xs font-bold uppercase tracking-wider">
                  Post-Show Report
                </p>
                
                <h1 className="font-bebas text-5xl sm:text-6xl leading-[1.05] tracking-tight uppercase text-[#03193D]">
                  INDIAMET Expo <span className="text-[#CC9808]">Post-Show Report</span>
                </h1>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed font-sans">
                Gain a clear picture of the opportunities shaping Asia's tyre manufacturing and rubber processing industry.
                The Post-Show Report provides verified visitor and exhibitor data, event highlights, 
                and technical session summaries to help you evaluate the market and plan your next participation.
              </p>

              {/* STATS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#FCF8F3] border border-gray-100 p-6 rounded-sm shadow-sm">
                {statsData.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <h3 className="text-3xl font-bebas text-[#CC9808] uppercase font-bold">
                      {stat.value}
                    </h3>
                    <p className="text-[10px] uppercase font-bold text-gray-600 mt-1 tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* WHY DOWNLOAD */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="font-bebas text-2xl text-[#03193D] uppercase font-bold">
                  Why Download the Report:
                </h3>
                <ul className="text-xs text-gray-655 space-y-2.5">
                  <li className="flex items-start gap-2">
                    <span className="text-[#CC9808]">•</span>
                    <span>Evaluate audience quality and identify new growth opportunities.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#CC9808]">•</span>
                    <span>Benchmark the results you can expect by participating in the next edition.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#CC9808]">•</span>
                    <span>See which sectors and solutions were most in demand at the event.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* RIGHT SECTION - Form */}
            <div className="bg-[#FCF8F3] border border-gray-100 rounded-sm p-6 md:p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="text-[#03193D] font-bebas text-3xl font-bold uppercase tracking-wide">
                  Download Expo <span className="text-[#CC9808]">Brochure</span>
                </h2>
                <p className="text-xs text-gray-600 font-sans">Fill in the details to download the report from our previous show.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    placeholder="Type your first name"
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Last Name"
                    placeholder="Type your last name"
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>

                <Input
                  label="Company Name"
                  placeholder="Type your company name"
                  required
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                />

                <Input
                  label="Company Website"
                  placeholder="https://yourcompany.com"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleInputChange}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Job Title"
                    placeholder="Type your job title"
                    required
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                  />
                  <Select
                    label="Country"
                    required
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    options={countries.map(c => ({ value: c, label: c }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Phone"
                    placeholder="+91 123-456-7890"
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Work Email"
                    placeholder="Type your email"
                    required
                    type="email"
                    name="workEmail"
                    value={formData.workEmail}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Preferred Stand Size"
                    required
                    name="preferredSendSize"
                    value={formData.preferredSendSize}
                    onChange={handleInputChange}
                    options={sendSizes.map(s => ({ value: s, label: s }))}
                  />
                  <Select
                    label="How Did You Hear About Us?"
                    name="howDidYouHear"
                    value={formData.howDidYouHear}
                    onChange={handleInputChange}
                    options={hearAboutOptions.map(h => ({ value: h, label: h }))}
                  />
                </div>

                <CheckboxGroup
                  label="Product Sector"
                  options={productSectors}
                  required
                  selectedValues={formData.productSectors}
                  onChange={handleCheckboxChange}
                />

                {/* CAPTCHA */}
                <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-sm">
                  <input
                    type="checkbox"
                    id="captcha"
                    checked={formData.captcha}
                    onChange={handleCaptchaChange}
                    className="w-4 h-4 text-[#CC9808] focus:ring-[#CC9808] rounded-sm border-gray-300 cursor-pointer"
                    required
                  />
                  <label htmlFor="captcha" className="text-gray-650 text-sm cursor-pointer select-none">
                    I'm not a robot
                  </label>
                </div>

                {/* Error Message */}
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-sm p-3">
                    <p className="text-red-650 text-xs font-semibold text-center">{submitError}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#CC9808] hover:bg-[#03193D] text-white py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? 'Submitting...' : 'DOWNLOAD REPORT'}
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center leading-relaxed mt-4">
                  By submitting this form, you agree to receive marketing communications, 
                  updates, and promotional materials from us. You can unsubscribe anytime. 
                  For more information, please refer to our 
                  <Link href="/privacy-policy" className="text-[#CC9808] hover:underline ml-1 font-semibold">Privacy Policy</Link>.
                </p>
              </form>
            </div>

          </div>
        </Container>
      </section>
      <PartnersSection />
      <BackToTop />
    </div>
  );
}