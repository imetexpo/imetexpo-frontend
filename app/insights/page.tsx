// app/insights/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/container";
import BackToTop from "@/components/layout/BackToTop";
import PartnersSection from "@/components/home/PartnersSection";

const countries = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahrain", "Bangladesh", "Belarus", "Belgium", "Bolivia", "Botswana", "Brazil", "Bulgaria",
  "Canada", "Chile", "China", "Colombia", "Congo", "Croatia", "Czech Republic", "Denmark",
  "Ecuador", "Egypt", "Estonia", "Finland", "France", "Georgia", "Germany", "Ghana",
  "Greece", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
  "Israel", "Italy", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan",
  "Latvia", "Lebanon", "Lithuania", "Luxembourg", "Malaysia", "Mexico", "Mongolia", "Morocco",
  "Netherlands", "New Zealand", "Nigeria", "Norway", "Oman", "Pakistan", "Peru", "Philippines",
  "Poland", "Portugal", "Qatar", "Romania", "Russia", "Saudi Arabia", "Serbia", "Singapore",
  "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sudan", "Sweden",
  "Switzerland", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Turkey", "Turkmenistan", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vietnam", "Zambia", "Zimbabwe"
];

export default function InsightsPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    country: "",
    workEmail: "",
    confirmRequest: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.companyName || !formData.jobTitle || !formData.country || !formData.workEmail) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    if (!formData.confirmRequest) {
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

  // ✅ SUCCESS SCREEN
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
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">Your report has been sent to your email address.</p>
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
      <section className="bg-white pt-[120px] lg:pt-[140px] pb-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-12 items-start">
            
            {/* LEFT SECTION */}
            <div className="flex flex-col gap-6 lg:sticky lg:top-44 h-fit">
              <div className="space-y-3">
                <p className="text-[#CC9808] text-xs font-bold uppercase tracking-wider">
                  Explore Insights
                </p>
                
                <h1 className="font-bebas text-5xl sm:text-6xl leading-[1.05] tracking-tight uppercase text-[#03193D]">
                  Unlock Market <span className="text-[#CC9808]">Opportunities</span>
                </h1>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                With growing demand for innovative rubber products and reliable tyre manufacturing suppliers,
                getting access to key market data is essential to establish a robust footprint in the industry.
              </p>
    
              {/* Features */}
              <div className="space-y-5 pt-2">
                {[
                  {
                    title: "COMPREHENSIVE MARKET INSIGHTS",
                    desc: "Gain detailed analysis of market dynamics, emerging sectors, and export opportunities tailored for suppliers.",
                  },
                  {
                    title: "ACTIONABLE GROWTH STRATEGIES",
                    desc: "Explore proven methods to expand your exports and establish a strong foothold in a region.",
                  },
                  {
                    title: "EXCLUSIVE REGIONAL DATA",
                    desc: "Access key statistics, trends, and forecasts across the global tyre markets.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-6 h-6 border border-gray-150 bg-white rounded-sm flex items-center justify-center text-[#CC9808] text-xs font-bold mt-0.5 shrink-0">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#03193D] mb-1 font-sans">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-650 leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SECTION - FORM */}
            <div className="bg-[#FCF8F3] border border-gray-100 rounded-sm p-6 md:p-8 shadow-sm">
              <div className="mb-6">
                <h3 className="text-[#03193D] font-bebas text-3xl mb-1 uppercase tracking-wide font-bold">
                  Get The Free <span className="text-[#CC9808]">Market Report</span>
                </h3>
                <p className="text-xs text-gray-600 font-sans">One step closer to unlocking exclusive market insights.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Type your Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="Type your Job Title"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm cursor-pointer"
                    required
                  >
                    <option value="">Select your country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="workEmail"
                    placeholder="Type your email"
                    value={formData.workEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
                    required
                  />
                </div>

                {/* Fake Captcha */}
                <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-sm">
                  <input
                    type="checkbox"
                    name="confirmRequest"
                    checked={formData.confirmRequest}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#CC9808] rounded-sm border-gray-300 focus:ring-[#CC9808] cursor-pointer"
                    required
                  />
                  <span className="text-sm text-gray-650">I'm not a robot</span>
                </div>

                {/* Error Message */}
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-sm p-3">
                    <p className="text-red-650 text-xs font-semibold text-center">{submitError}</p>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#CC9808] hover:bg-[#03193D] text-white py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center leading-relaxed mt-4">
                  T&C: By submitting this form, you agree to receive marketing communications, 
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

      <style jsx>{`
        .font-bebas { font-family: 'Bebas Neue', cursive; }
        .animated-block {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.6s ease forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animated-block:nth-child(1) { animation-delay: 0.1s; }
      `}</style>
    </div>
  );
}