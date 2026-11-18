"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useUTMData } from "@/hooks/useUTMTracker";
import { COUNTRIES, INDUSTRIES, AWARD_CATEGORIES } from "@/lib/registrationOptions";
import AwardsTurnstile from "./AwardsTurnstile";
import LoadingDots from '@/components/ui/LoadingDots';
import CountryStateCityFields from "@/components/common/CountryStateCityFields";

const inputClass = "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#00A1B1] focus:ring-2 focus:ring-[#00A1B1]";
const initialForm = {
  name: "", jobTitle: "", companyName: "", email: "", phone: "",
  country: "", state: "", city: "", pincode: "", industry: "", awardCategory: "", message: "",
};

export default function AwardsForm() {
  const { utmData } = useUTMData();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || searchParams.get("awardCategory") || "";

  const findMatchingCategory = (param: string) => {
    if (!param) return "";
    const clean = param.trim().toLowerCase();
    const matched = AWARD_CATEGORIES.find((cat) => cat.toLowerCase() === clean);
    return matched || "";
  };

  const [formData, setFormData] = useState(() => ({
    ...initialForm,
    awardCategory: findMatchingCategory(categoryParam),
  }));

  useEffect(() => {
    if (categoryParam) {
      const matched = findMatchingCategory(categoryParam);
      if (matched) {
        setFormData((prev) => {
          if (prev.awardCategory === matched) return prev;
          return { ...prev, awardCategory: matched };
        });
      }
    }
  }, [categoryParam]);

  const updateCategoryUrl = (newCategory: string) => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }
    const hash = window.location.hash || "#awards-form";
    const queryString = params.toString();
    const newUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ""}${hash}`;

    window.history.replaceState(window.history.state, "", newUrl);
    router.replace(newUrl, { scroll: false });
  };

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaAttempt, setCaptchaAttempt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const captchaEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));

    if (name === "awardCategory") {
      updateCategoryUrl(value);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    if (!termsAccepted || (captchaEnabled && !captchaToken)) {
      setError("Please accept the terms and complete security verification.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/awards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          termsAccepted,
          captchaToken,
          utmSource: utmData?.utm_source || "",
          utmMedium: utmData?.utm_medium || "",
          utmCampaign: utmData?.utm_campaign || "",
          utmTerm: utmData?.utm_term || "",
          utmContent: utmData?.utm_content || "",
          utmId: utmData?.utm_id || "",
          landingPage: utmData?.landingPage || "",
          referrer: utmData?.referrer || "",
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit your awards enquiry. Please try again.");
      }

      // Also submit to backend contact endpoint for email dispatch and storage
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "award-nomination",
          ...formData,
        }),
      }).catch((err) => console.warn("Backend contact notification error:", err));

      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit. Please try again.");
      setCaptchaToken("");
      setCaptchaAttempt((attempt) => attempt + 1);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    const displayName = formData.name || formData.companyName || "Nominee";
    const address = [formData.city, formData.state, formData.country, formData.pincode].filter(Boolean).join(", ") || "Not provided";

    return (
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 max-w-lg mx-auto text-center animate-fadeIn">
        <div className="w-16 h-16 bg-[#E8F1F8] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#00A1B1]/40 shadow-xs">
          <svg className="w-8 h-8 text-[#003A77]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#00A1B1] bg-[#E8F1F8] px-3 py-1 rounded-full mb-3">
          IndiaMET 2027 • Awards &amp; Nomination
        </span>
        <h2 className="font-bebas text-4xl text-[#003A77] mb-2 uppercase tracking-wide">
          Thank You, {displayName}!
        </h2>
        <p className="text-base text-gray-600 mb-5 leading-relaxed">
          Your nomination enquiry for <strong>IndiaMET 2027 Exhibition &amp; Summit</strong> (13–15 May 2027, Pune) has been submitted successfully.
        </p>

        <div className="bg-[#F8FAFC] border border-gray-200/80 rounded-xl p-4 text-left text-xs space-y-2 mb-6">
          <div className="flex justify-between pb-1.5 border-b border-gray-200/60">
            <span className="text-gray-500 font-medium">Name:</span>
            <span className="font-semibold text-gray-800">{displayName}</span>
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
            <span className="font-semibold text-[#003A77]">{formData.email || "Not provided"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Address:</span>
            <span className="font-semibold text-gray-800">{address}</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed">
          A confirmation email has been dispatched to <strong className="text-gray-700">{formData.email}</strong>. Our awards management team will reach out to you shortly with further details.
        </p>
      </div>
    );
  }

  return (
    <form id="awards-form" onSubmit={handleSubmit} className="space-y-5 scroll-mt-28">
      <h2 className="font-bebas text-3xl text-[#003A77]">Awards Enquiry</h2>
      <fieldset disabled={loading} className="space-y-5">
        <legend className="sr-only">Awards enquiry details</legend>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {([
            { name: "name", label: "Full Name", type: "text", autoComplete: "name", required: true },
            { name: "jobTitle", label: "Job Title", type: "text", autoComplete: "organization-title", required: true },
            { name: "companyName", label: "Company Name", type: "text", autoComplete: "organization", required: true },
            { name: "email", label: "Work Email", type: "email", autoComplete: "email", required: true },
            { name: "phone", label: "Phone Number", type: "tel", autoComplete: "tel", required: false },
          ] as const).map((field) => (
            <div key={field.name}>
              <label htmlFor={"awards-" + field.name} className="mb-2 block text-sm font-medium text-gray-700">
                {field.label} {field.required && <span className="text-[#00A1B1]">*</span>}
              </label>
              <input
                id={"awards-" + field.name}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
                maxLength={200}
                placeholder={field.name === "phone" ? "+91 9876543210" : "Enter your " + field.label.toLowerCase()}
                className={inputClass}
              />
            </div>
          ))}
          <div className="md:col-span-2 space-y-4">
            <CountryStateCityFields
              country={formData.country}
              state={formData.state}
              city={formData.city}
              onCountryChange={(country) => setFormData((prev) => ({ ...prev, country, state: "", city: "" }))}
              onStateChange={(state) => setFormData((prev) => ({ ...prev, state, city: "" }))}
              onCityChange={(city) => setFormData((prev) => ({ ...prev, city }))}
              labelClassName="mb-2 block text-sm font-medium text-gray-700"
              inputClassName={inputClass}
            />
          </div>

          <div>
            <label htmlFor="awards-pincode" className="mb-2 block text-sm font-medium text-gray-700">
              Pin Code / Zip Code <span className="text-[#00A1B1]">*</span>
            </label>
            <input
              id="awards-pincode"
              name="pincode"
              type="text"
              value={formData.pincode}
              onChange={handleChange}
              required
              maxLength={20}
              placeholder="Enter pin code / zip code"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="awards-industry" className="mb-2 block text-sm font-medium text-gray-700">
              Industry
            </label>
            <select
              id="awards-industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Industry</option>
              {INDUSTRIES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="awards-awardCategory" className="mb-2 block text-sm font-medium text-gray-700">
              Award Category <span className="text-[#00A1B1]">*</span>
            </label>
            <select
              id="awards-awardCategory"
              name="awardCategory"
              value={formData.awardCategory}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select Award Category</option>
              {AWARD_CATEGORIES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="awards-message" className="mb-2 block text-sm font-medium text-gray-700">Message</label>
          <textarea id="awards-message" name="message" value={formData.message} onChange={handleChange}
            rows={4} maxLength={5000} placeholder="Enter your message" className={inputClass} />
        </div>
        <div className="flex items-start gap-3">
          <input id="awards-terms" type="checkbox" checked={termsAccepted}
            onChange={(event) => setTermsAccepted(event.target.checked)} required
            className="mt-1 h-4 w-4 shrink-0 accent-[#00A1B1]" />
          <label htmlFor="awards-terms" className="text-sm leading-relaxed text-gray-600">
            I confirm that I have read, understand and accept the event’s{" "}
            <a href="https://bengalurugccsummit.com/terms" target="_blank" rel="noopener noreferrer" className="text-[#00A1B1] underline">Terms and Conditions</a>
            <span className="text-[#00A1B1]">*</span>
          </label>
        </div>
        <p className="text-sm leading-relaxed text-gray-600">
          Maxpo Exhibitions may contact you from time to time with updates and information about our events,
          products and services that may be of interest. We may also pass your details to carefully selected
          third parties and to sponsors and exhibitors at this event. Please see our{" "}
          <a href="https://bengalurugccsummit.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#00A1B1] underline">Privacy Policy</a>{" "}
          for full details.
        </p>
        <AwardsTurnstile key={captchaAttempt} onVerify={setCaptchaToken} />
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={loading || !termsAccepted || (captchaEnabled && !captchaToken)}
          className="w-full rounded-lg bg-[#00A1B1] px-6 py-3 text-lg font-semibold text-white transition hover:bg-[#003A77] disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? <span className="inline-flex items-center justify-center gap-2"><LoadingDots size="sm" tone="light" label="" />Submitting...</span> : "Submit"}
        </button>
      </fieldset>
      <p className="text-center text-xs text-gray-500">All fields marked with * are required.</p>
    </form>
  );
}
