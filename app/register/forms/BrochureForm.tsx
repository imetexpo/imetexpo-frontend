"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useUTMData } from "@/hooks/useUTMTracker";
import { submitContactForm, PROJECT_ID_VAR } from "@/lib/graphql-client";

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
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vietnam", "Zambia", "Zimbabwe",
];

export default function BrochureForm() {
  const { utmData, campaign } = useUTMData();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    website: "",
    jobTitle: "",
    country: "",
    phone: "",
    email: "",
    productSectors: [] as string[],
    confirm: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSectorToggle = (sector: string) => {
    setFormData((prev) => ({
      ...prev,
      productSectors: prev.productSectors.includes(sector)
        ? prev.productSectors.filter((s) => s !== sector)
        : [...prev.productSectors, sector],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName || !formData.lastName || !formData.company ||
      !formData.jobTitle || !formData.country || !formData.phone || !formData.email
    ) {
      setSubmitError("Please fill in all required fields");
      return;
    }

    if (!formData.confirm) {
      setSubmitError("Please confirm that you are not a robot");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const payload = {
      email: formData.email,
      formType: "event-brochure",
      firstName: formData.firstName,
      lastName: formData.lastName,
      contactPerson: `${formData.firstName} ${formData.lastName}`.trim(),
      companyName: formData.company,
      jobTitle: formData.jobTitle,
      phone: formData.phone,
      country: formData.country,
      website: formData.website,
      productSectors: formData.productSectors,
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
        setSubmitError(result.errors[0]?.message || "Failed to save brochure download request");
        toast.error("Submission failed. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setSubmitSuccess(true);
      toast.success("Thank you! Your brochure request has been submitted.");
      setFormData({
        firstName: "",
        lastName: "",
        company: "",
        website: "",
        jobTitle: "",
        country: "",
        phone: "",
        email: "",
        productSectors: [],
        confirm: false,
      });
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
      <div className="bg-white border border-gray-100 rounded-sm p-8 max-w-md mx-auto text-center shadow-sm">
        <div className="w-16 h-16 bg-[#FCF8F3] border border-gray-150 rounded-sm flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#CC9808]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-bebas text-4xl text-[#03193D] mb-3 uppercase tracking-wide">Thank You!</h2>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Your brochure request has been submitted successfully. Download link will be sent to your email.
        </p>
        <Link href="/">
          <button className="bg-[#CC9808] hover:bg-[#03193D] text-white px-8 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer">
            Back to Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
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
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Company Website</label>
        <input
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://www.company.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
          Job Title <span className="text-red-500">*</span>
        </label>
        <input
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="Job Title"
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
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Work Email <span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Product Sector <span className="text-red-500">*</span>
        </label>
        <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-sm p-3 bg-white shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {productSectors.map((sector, index) => (
              <label key={index} className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-sm">
                <input
                  type="checkbox"
                  checked={formData.productSectors.includes(sector)}
                  onChange={() => handleSectorToggle(sector)}
                  className="mt-0.5 w-4 h-4 text-[#CC9808] rounded-sm border-gray-300 focus:ring-[#CC9808]"
                />
                <span className="text-xs text-gray-650 font-medium">{sector}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-sm">
        <input
          type="checkbox"
          name="confirm"
          checked={formData.confirm}
          onChange={handleChange}
          className="w-4 h-4 text-[#CC9808] rounded-sm border-gray-300 focus:ring-[#CC9808] cursor-pointer"
          required
        />
        <span className="text-sm text-gray-650">I'm not a robot</span>
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
          {isSubmitting ? "Submitting..." : "DOWNLOAD BROCHURE"}
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center leading-relaxed mt-4">
        T&C: By submitting this form, you agree to receive marketing communications, updates,
        and promotional materials from us. You can unsubscribe anytime. For more information,
        please refer to our
        <Link href="/privacy-policy" className="text-[#CC9808] hover:underline ml-1 font-semibold">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
