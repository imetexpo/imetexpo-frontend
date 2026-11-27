"use client";

import React, { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import toast from "react-hot-toast";
import LoadingDots from '@/components/ui/LoadingDots';
import CountryStateCityFields from "@/components/common/CountryStateCityFields";

import { queueContactSubmission } from "@/lib/api/contactSubmission";

export default function SponsorForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phone: "",
    companyName: "",
    address: "",
    country: "",
    city: "",
    state: "",
    website: "",
    partnershipType: "",
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

    if (!executeRecaptcha) {
      toast.error("Security verification is loading. Please try again.");
      setIsSubmitting(false);
      return;
    }

    try {
      const captchaToken = await executeRecaptcha("sponsor_registration");
      if (!captchaToken) throw new Error("Security verification failed. Please try again.");

      const payload = {
        ...formData,
        captchaToken,
        contactPerson: `${formData.firstName} ${formData.lastName}`.trim(),
        address: [formData.address, formData.city, formData.state, formData.country].filter(Boolean).join(", "),
        formType: "partner-registration",
        submittedAt: new Date().toISOString(),
      };

      await queueContactSubmission(payload);
      setSubmittedData({ ...payload, captchaToken: undefined });
      setSubmitSuccess(true);
      toast.success("Thank you! Your sponsor registration has been submitted.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Network error. Please check your connection and try again.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess && submittedData) {
    const displayName = [submittedData.firstName, submittedData.lastName].filter(Boolean).join(" ").trim() || submittedData.companyName || "Partner";

    return (
      <div className="bg-white rounded-2xl shadow-md border border-purple-100 p-8 max-w-lg mx-auto text-center animate-fadeIn">
        <div className="w-16 h-16 bg-[#FAF5FF] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#7E22CE]/30 shadow-xs">
          <svg className="w-8 h-8 text-[#6B21A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#6B21A8] bg-[#FAF5FF] border border-purple-200/80 px-3 py-1 rounded-full mb-3">
          IndiaMET 2027 • Sponsor &amp; Partner Registration
        </span>
        <h2 className="font-bebas text-4xl text-[#581C87] mb-2 uppercase tracking-wide">
          Thank You, {displayName}!
        </h2>
        <p className="text-base text-gray-600 mb-5 leading-relaxed">
          Your sponsorship &amp; partner enquiry for <strong>IndiaMET 2027 Exhibition &amp; Summit</strong> (13–15 May 2027, Pune) has been submitted successfully.
        </p>

        <div className="bg-[#FAF5FF]/70 border border-purple-100 rounded-xl p-4 text-left text-xs space-y-2 mb-6">
          <div className="flex justify-between pb-1.5 border-b border-purple-100">
            <span className="text-gray-500 font-medium">Name:</span>
            <span className="font-semibold text-gray-800">{displayName}</span>
          </div>
          <div className="flex justify-between pb-1.5 border-b border-purple-100">
            <span className="text-gray-500 font-medium">Company:</span>
            <span className="font-bold text-gray-800">{submittedData.companyName || "Not provided"}</span>
          </div>
          <div className="flex justify-between pb-1.5 border-b border-purple-100">
            <span className="text-gray-500 font-medium">Job Title:</span>
            <span className="font-semibold text-gray-800">{submittedData.jobTitle || "Not provided"}</span>
          </div>
          <div className="flex justify-between pb-1.5 border-b border-purple-100">
            <span className="text-gray-500 font-medium">Phone Number:</span>
            <span className="font-semibold text-gray-800">{submittedData.phone || "Not provided"}</span>
          </div>
          <div className="flex justify-between pb-1.5 border-b border-purple-100">
            <span className="text-gray-500 font-medium">Email:</span>
            <span className="font-semibold text-[#6B21A8]">{submittedData.email || "Not provided"}</span>
          </div>
          <div className="flex justify-between pb-1.5 border-b border-purple-100">
            <span className="text-gray-500 font-medium">Address:</span>
            <span className="font-semibold text-gray-800">{[submittedData.address, submittedData.city, submittedData.state, submittedData.country].filter(Boolean).join(", ") || "Not provided"}</span>
          </div>
          {submittedData.partnershipType && (
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Partnership Type:</span>
              <span className="font-semibold text-[#6B21A8] capitalize">{submittedData.partnershipType}</span>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 leading-relaxed">
          A confirmation email will be sent to <strong className="text-gray-700">{submittedData.email}</strong>. Our sponsorship and partnerships management team will reach out to you shortly with tailored sponsorship packages, branding deliverables, and booth layout options.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name <span className="text-[#00A1B1]">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition-all bg-white"
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name <span className="text-[#00A1B1]">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition-all bg-white"
            placeholder="Enter your last name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title <span className="text-[#00A1B1]">*</span>
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition-all bg-white"
            placeholder="Enter your job title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-[#00A1B1]">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition-all bg-white"
            placeholder="example@company.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mobile Phone <span className="text-[#00A1B1]">*</span>
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
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition-all bg-white"
            placeholder="9876543210"
            maxLength={10}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">Enter 10-digit mobile number</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name <span className="text-[#00A1B1]">*</span>
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition-all bg-white"
            placeholder="Enter company name"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address <span className="text-[#00A1B1]">*</span>
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows={2}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition-all bg-white resize-none"
            placeholder="Enter company address"
          />
        </div>

        <div className="md:col-span-2 space-y-4">
          <CountryStateCityFields
            country={formData.country}
            state={formData.state}
            city={formData.city}
            onCountryChange={(country) => setFormData((prev) => ({ ...prev, country, state: "", city: "" }))}
            onStateChange={(state) => setFormData((prev) => ({ ...prev, state, city: "" }))}
            onCityChange={(city) => setFormData((prev) => ({ ...prev, city }))}
            labelClassName="block text-sm font-medium text-gray-700 mb-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition-all bg-white"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Partnership Type <span className="text-[#00A1B1]">*</span>
          </label>
          <select
            name="partnershipType"
            value={formData.partnershipType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition-all bg-white"
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
            id="consent"
            name="privacyConsent"
            checked={formData.privacyConsent}
            onChange={handleChange}
            required
            className="mt-1 h-5 w-5 border-gray-300 rounded focus:ring-[#00A1B1] text-[#00A1B1]"
          />
          <label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
            I hereby give consent to <strong>INDIAMET Expo Organizing Committee</strong>
            for automated and mixed processing of my personal data in accordance
            with the{" "}
            <a href="/privacy-policy" className="text-[#00A1B1] hover:text-[#d97000] underline font-medium">
              Personal Data Policy
            </a>
            .<span className="text-[#00A1B1] ml-1">*</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-[#00A1B1] hover:bg-[#003A77] text-white font-semibold py-3 px-4 rounded-lg transition-all hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:ring-offset-2 ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? <span className="inline-flex items-center justify-center gap-2"><LoadingDots size="sm" tone="light" label="" />Processing...</span> : "Register as Partner →"}
      </button>

      <p className="text-xs text-gray-500 mt-3 text-center">
        All fields marked with <span className="text-[#00A1B1]">*</span> are required
      </p>
    </form>
  );
}
