"use client";

import { useState } from "react";
import Link from "next/link";
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
  const [formData, setFormData] = useState(initialForm);
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
    return (
      <div role="status" className="py-10 text-center">
        <h2 className="mb-3 font-bebas text-3xl text-[#003A77]">Thank you, {formData.name}!</h2>
        <p className="text-gray-600">Your awards enquiry has been received. Our team will contact you with further details.</p>
        <Link href="/awards/" className="mt-6 inline-block font-semibold text-[#00A1B1] hover:underline">Explore the awards →</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
