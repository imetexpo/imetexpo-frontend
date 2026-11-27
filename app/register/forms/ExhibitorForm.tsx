"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useUTMData } from "@/hooks/useUTMTracker";
import { queueContactSubmission } from "@/lib/api/contactSubmission";
import LoadingDots from '@/components/ui/LoadingDots';
import CountryStateCityFields from "@/components/common/CountryStateCityFields";



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

export default function ExhibitorForm() {
  const { utmData, campaign } = useUTMData();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    companyWebsite: "",
    jobTitle: "",
    country: "",
    state: "",
    city: "",
    phone: "",
    workEmail: "",
    productSector: "",
    comments: "",
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
      !formData.firstName || !formData.lastName || !formData.companyName ||
      !formData.companyWebsite || !formData.jobTitle || !formData.country || !formData.state ||
      !formData.city || !formData.phone || !formData.workEmail || !formData.productSector
    ) {
      setSubmitError("Please fill in all required fields");
      return;
    }


    setIsSubmitting(true);
    setSubmitError("");

    if (!executeRecaptcha) {
      setSubmitError("Security verification is loading. Please try again.");
      setIsSubmitting(false);
      return;
    }

    let captchaToken = "";
    try {
      captchaToken = await executeRecaptcha("exhibitor_registration");
    } catch {
      setSubmitError("Security verification could not be completed. Please try again.");
      setIsSubmitting(false);
      return;
    }
    if (!captchaToken) {
      setSubmitError("Security verification could not be completed. Please try again.");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      email: formData.workEmail,
      formType: "exhibitor-enquiry",
      captchaToken,
      firstName: formData.firstName,
      lastName: formData.lastName,
      contactPerson: `${formData.firstName} ${formData.lastName}`.trim(),
      companyName: formData.companyName,
      website: formData.companyWebsite,
      jobTitle: formData.jobTitle,
      phone: formData.phone,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      productSector: formData.productSector,
      message: formData.comments,
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
      await queueContactSubmission(payload);

      setSubmitSuccess(true);
      toast.success("Thank you! Your exhibiting enquiry has been submitted.");
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setSubmitError(error.message || "Network error occurred. Please try again.");
      toast.error(error.message || "A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 max-w-lg mx-auto text-center animate-fadeIn">
        <div className="w-16 h-16 bg-[#E8F1F8] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#00A1B1]/40 shadow-xs">
          <svg className="w-8 h-8 text-[#003A77]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#00A1B1] bg-[#E8F1F8] px-3 py-1 rounded-full mb-3">
          IndiaMET 2027 • Exhibitor Registration
        </span>
        <h2 className="font-bebas text-4xl text-[#003A77] mb-2 uppercase tracking-wide">
          Thank You, {formData.firstName || formData.companyName || "Partner"}!
        </h2>
        <p className="text-base text-gray-600 mb-5 leading-relaxed">
          Your exhibiting enquiry for <strong>IndiaMET 2027 Exhibition &amp; Summit</strong> (13–15 May 2027, Pune) has been submitted successfully.
        </p>
        <div className="bg-[#F8FAFC] border border-gray-200/80 rounded-xl p-4 text-left text-xs space-y-2 mb-6">
          <div className="flex justify-between pb-1.5 border-b border-gray-200/60">
            <span className="text-gray-500 font-medium">Name:</span>
            <span className="font-semibold text-gray-800">{[formData.firstName, formData.lastName].filter(Boolean).join(" ").trim() || "Not provided"}</span>
          </div>
          <div className="flex justify-between pb-1.5 border-b border-gray-200/60">
            <span className="text-gray-500 font-medium">Company:</span>
            <span className="font-bold text-gray-800">{formData.companyName || "Not provided"}</span>
          </div>
          <div className="flex justify-between pb-1.5 border-b border-gray-200/60">
            <span className="text-gray-500 font-medium">Job Title:</span>
            <span className="font-semibold text-gray-800">{formData.jobTitle || "Not provided"}</span>
          </div>
          <div className="flex justify-between pb-1.5 border-b border-gray-200/60">
            <span className="text-gray-500 font-medium">Phone Number:</span>
            <span className="font-semibold text-gray-800">{formData.phone || "Not provided"}</span>
          </div>
          <div className="flex justify-between pb-1.5 border-b border-gray-200/60">
            <span className="text-gray-500 font-medium">Email:</span>
            <span className="font-semibold text-[#003A77]">{formData.workEmail || "Not provided"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Address:</span>
            <span className="font-semibold text-gray-800">{[formData.city, formData.state, formData.country].filter(Boolean).join(", ") || "Not provided"}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          A confirmation email will be sent to <strong className="text-gray-700">{formData.workEmail}</strong>. Our exhibition management team will reach out to you shortly with booth layout options and pricing details.
        </p>
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
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition bg-white text-sm"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition bg-white text-sm"
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
          className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition bg-white text-sm"
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
          className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition bg-white text-sm"
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
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="Job title"
          className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition bg-white text-sm"
          required
        />
      </div>

      <CountryStateCityFields
        country={formData.country}
        state={formData.state}
        city={formData.city}
        onCountryChange={(country) => setFormData((prev) => ({ ...prev, country, state: "", city: "" }))}
        onStateChange={(state) => setFormData((prev) => ({ ...prev, state, city: "" }))}
        onCityChange={(city) => setFormData((prev) => ({ ...prev, city }))}
        labelClassName="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1"
        inputClassName="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition bg-white text-sm"
      />

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
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition bg-white text-sm"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition bg-white text-sm"
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
          className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition bg-white text-sm cursor-pointer"
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


      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-sm p-3">
          <p className="text-red-650 text-xs font-semibold text-center">{submitError}</p>
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#00A1B1] hover:bg-[#003A77] text-white py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? <span className="inline-flex items-center justify-center gap-2"><LoadingDots size="sm" tone="light" label="" />Submitting...</span> : "Submit Enquiry"}
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center leading-relaxed mt-4">
        By submitting this form, you agree to receive marketing communications,
        updates, and promotional materials from us. You can unsubscribe anytime.
        For more information on how we handle your data, please refer to our{" "}
        <Link href="/privacy-policy" className="text-[#00A1B1] hover:underline ml-1">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
