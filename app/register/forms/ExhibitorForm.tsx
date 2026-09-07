"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useUTMData } from "@/hooks/useUTMTracker";
import { submitContactForm, PROJECT_ID_VAR } from "@/lib/graphql-client";

const productSectors = [
  "Raw Materials & Rubber Compounds",
  "Tyre Manufacturing Machinery",
  "Rubber Processing Equipment",
  "Tyre Testing & Quality Control",
  "Retreading & Repair Materials",
  "Recycling & Sustainability Solutions",
  "Mold & Tooling Solutions",
  "Tyre Reinforcement Materials",
  "Additives & Performance Chemicals",
  "Automation & Industry 4.0",
  "Material Handling & Logistics",
  "Curing & Vulcanization Systems",
];

export default function ExhibitorForm() {
  const { utmData, campaign } = useUTMData();
  const [formData, setFormData] = useState({
    interestLevel: "",
    firstName: "",
    lastName: "",
    companyName: "",
    companyWebsite: "",
    jobTitle: "",
    country: "",
    phone: "",
    workEmail: "",
    productSector: "",
    comments: "",
    agreeToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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

    if (
      !formData.interestLevel || !formData.firstName || !formData.lastName || !formData.companyName ||
      !formData.companyWebsite || !formData.jobTitle || !formData.country || !formData.phone ||
      !formData.workEmail || !formData.productSector
    ) {
      setSubmitError("Please fill in all required fields");
      return;
    }

    if (!formData.agreeToTerms) {
      setSubmitError("Please verify your request");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const payload = {
      email: formData.workEmail,
      formType: "exhibitor-enquiry",
      firstName: formData.firstName,
      lastName: formData.lastName,
      contactPerson: `${formData.firstName} ${formData.lastName}`.trim(),
      companyName: formData.companyName,
      website: formData.companyWebsite,
      jobTitle: formData.jobTitle,
      phone: formData.phone,
      country: formData.country,
      productSector: formData.productSector,
      message: formData.comments,
      interestLevel: formData.interestLevel,
      submittedAt: new Date().toISOString(),

      utmSource: utmData?.utm_source || "",
      utmMedium: utmData?.utm_medium || "",
      utmCampaign: utmData?.utm_campaign || "",
      utmTerm: utmData?.utm_term || "",
      utmContent: utmData?.utm_content || "",
      utmId: utmData?.utm_id || "",
      referrer: utmData?.referrer || "",
      landingPage: utmData?.landingPage || "",
      utmTimestamp: utmData?.timestamp || "",

      cmsCampaignId: campaign?.id || "",
      cmsCampaignName: campaign?.name || "",
      cmsCampaignSource: campaign?.utm_source || "",
      cmsCampaignMedium: campaign?.utm_medium || "",
    };

    try {
      if (!PROJECT_ID_VAR.projectId) {
        toast.error("CMS Project ID is missing.");
        setIsSubmitting(false);
        return;
      }

      const result = await submitContactForm(PROJECT_ID_VAR.projectId, payload);

      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null);

      if (result.errors) {
        setSubmitError(result.errors[0]?.message || "Failed to submit exhibiting enquiry");
        toast.error("Submission failed. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setSubmitSuccess(true);
      toast.success("Thank you! Your exhibiting enquiry has been submitted.");
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setSubmitError(error.message || "Network error occurred. Please try again.");
      toast.error("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-white rounded-sm border border-gray-100 p-8 max-w-md mx-auto text-center shadow-sm">
        <div className="w-16 h-16 bg-[#FCF8F3] border border-gray-150 rounded-sm flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#CC9808]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-bebas text-4xl text-[#03193D] mb-3 uppercase tracking-wide">Thank You!</h2>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Your enquiry has been submitted successfully. Our team will contact you shortly.
        </p>
        <Link href="/">
          <button className="bg-[#CC9808] hover:bg-[#03193D] text-white px-8 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
            Back to Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
          Your level of interest <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {["Ready to book my stand", "Looking for more information", "Looking for sponsorship opportunities"].map(
            (option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="interestLevel"
                  value={option}
                  checked={formData.interestLevel === option}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#CC9808] focus:ring-[#CC9808]"
                  required
                />
                <span className="text-gray-700 text-sm">{option}</span>
              </label>
            )
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Company name"
          className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
          Company Website <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          name="companyWebsite"
          value={formData.companyWebsite}
          onChange={handleChange}
          placeholder="www.yourcompany.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Job title"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 234 567 8900"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Work Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="workEmail"
            value={formData.workEmail}
            onChange={handleChange}
            placeholder="email@company.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
          Product Sector <span className="text-red-500">*</span>
        </label>
        <select
          name="productSector"
          value={formData.productSector}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm cursor-pointer"
          required
        >
          <option value="">Select a product sector</option>
          {productSectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2 pt-2">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
          Please verify your request <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="w-4 h-4 text-[#CC9808] focus:ring-[#CC9808] rounded-sm border-gray-300 cursor-pointer"
            required
          />
          <span className="text-sm text-gray-650">I agree to fill out this form</span>
        </div>
      </div>

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
          {isSubmitting ? "Submitting..." : "Submit Enquiry"}
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center leading-relaxed mt-4">
        By submitting this form, you agree to receive marketing communications,
        updates, and promotional materials from us. You can unsubscribe anytime.
        For more information on how we handle your data, please refer to our{" "}
        <Link href="/privacy-policy" className="text-[#CC9808] hover:underline ml-1">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
