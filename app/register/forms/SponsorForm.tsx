"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

export default function SponsorForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phone: "",
    companyName: "",
    gstin: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    website: "",
    partnershipType: "",
    marketingConsent: false,
    privacyConsent: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validatePhoneNumber = (phone: string) => /^\d{10}$/.test(phone);
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validatePhoneNumber(formData.phone)) {
      toast.error("Please enter a valid 10-digit mobile number");
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    if (!formData.privacyConsent) {
      toast.error("Please accept the Privacy Policy to continue");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          formType: "tyre-expo-partner",
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json().catch(() => ({ success: false }));

      if (result.success) {
        toast.success("Partner registration submitted successfully! Our team will contact you soon.");

        setFormData({
          firstName: "",
          lastName: "",
          jobTitle: "",
          email: "",
          phone: "",
          companyName: "",
          gstin: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          website: "",
          partnershipType: "",
          marketingConsent: false,
          privacyConsent: false,
        });
      } else {
        toast.error(result.message || "Failed to submit registration. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please check your connection and try again.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name <span className="text-[#CC9808]">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition-all bg-white"
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name <span className="text-[#CC9808]">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition-all bg-white"
            placeholder="Enter your last name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title <span className="text-[#CC9808]">*</span>
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition-all bg-white"
            placeholder="Enter your job title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-[#CC9808]">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition-all bg-white"
            placeholder="example@company.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mobile Phone <span className="text-[#CC9808]">*</span>
        </label>
        <div className="flex">
          <div className="flex items-center gap-2 border border-gray-300 bg-gray-50 px-4 py-2.5 rounded-l-lg border-r-0">
            <span className="text-gray-700 font-medium">+91</span>
          </div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition-all bg-white"
            placeholder="9876543210"
            maxLength={10}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">Enter 10-digit mobile number</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name <span className="text-[#CC9808]">*</span>
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition-all bg-white"
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">GSTIN</label>
          <input
            type="text"
            name="gstin"
            value={formData.gstin}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition-all bg-white"
            placeholder="22AAAAA0000A1Z5 (Optional)"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address <span className="text-[#CC9808]">*</span>
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows={2}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition-all bg-white resize-none"
            placeholder="Enter company address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City <span className="text-[#CC9808]">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition-all bg-white"
            placeholder="Enter city"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State <span className="text-[#CC9808]">*</span>
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition-all bg-white"
            placeholder="Enter state"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pincode <span className="text-[#CC9808]">*</span>
          </label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            maxLength={6}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition-all bg-white"
            placeholder="Enter pincode"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition-all bg-white"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Partnership Type <span className="text-[#CC9808]">*</span>
          </label>
          <select
            name="partnershipType"
            value={formData.partnershipType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition-all bg-white"
          >
            <option value="">Select Partnership Type</option>
            <option value="platinum">Platinum Partner</option>
            <option value="gold">Gold Partner</option>
            <option value="silver">Silver Partner</option>
            <option value="exhibitor">Exhibitor</option>
            <option value="sponsor">Sponsor</option>
          </select>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
          <input
            type="checkbox"
            id="marketing"
            name="marketingConsent"
            checked={formData.marketingConsent}
            onChange={handleChange}
            className="mt-1 h-5 w-5 border-gray-300 rounded focus:ring-[#CC9808] text-[#CC9808]"
          />
          <label htmlFor="marketing" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
            I want to stay informed about exhibitions organized by
            <strong> INDIAMET Expo Organizing Committee</strong>, and be the first to
            receive information about exhibition stand sales, business program
            events, advertising and sponsorship opportunities.
          </label>
        </div>

        <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
          <input
            type="checkbox"
            id="consent"
            name="privacyConsent"
            checked={formData.privacyConsent}
            onChange={handleChange}
            required
            className="mt-1 h-5 w-5 border-gray-300 rounded focus:ring-[#CC9808] text-[#CC9808]"
          />
          <label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
            I hereby give consent to <strong>INDIAMET Expo Organizing Committee</strong>
            for automated and mixed processing of my personal data in accordance
            with the{" "}
            <a href="/privacy-policy" className="text-[#CC9808] hover:text-[#d97000] underline font-medium">
              Personal Data Policy
            </a>
            .<span className="text-[#CC9808] ml-1">*</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-[#CC9808] hover:bg-[#03193D] text-white font-semibold py-3 px-4 rounded-lg transition-all hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-[#CC9808] focus:ring-offset-2 ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "Processing..." : "Register as Partner →"}
      </button>

      <p className="text-xs text-gray-500 mt-3 text-center">
        All fields marked with <span className="text-[#CC9808]">*</span> are required
      </p>
    </form>
  );
}
