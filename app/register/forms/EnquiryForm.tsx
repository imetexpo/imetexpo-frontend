"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useUTMData } from "@/hooks/useUTMTracker";
import { submitContactForm, PROJECT_ID_VAR } from "@/lib/graphql-client";

interface Country {
  name: string;
}

const COUNTRIES: string[] = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
  "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
  "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark",
  "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
  "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji",
  "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece",
  "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait",
  "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
  "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
  "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
  "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia",
  "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
  "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
  "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
  "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname",
  "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
  "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
  "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
  "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe",
];

export default function EnquiryForm() {
  const { utmData, campaign } = useUTMData();
  const [countries] = useState<Country[]>(COUNTRIES.map((name) => ({ name })));
  const [captchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    company: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    email: "",
    mobile: "",
    profile: "",
    promocode: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !captchaToken) {
      toast.error("Please complete the CAPTCHA verification");
      return;
    }

    setLoading(true);

    const payload = {
      formType: "visitor-registration",
      name: formData.name,
      designation: formData.designation,
      company: formData.company,
      address: formData.address,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      pincode: formData.pincode,
      email: formData.email,
      mobile: formData.mobile,
      profile: formData.profile,
      promocode: formData.promocode,
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
        setLoading(false);
        return;
      }

      const result = await submitContactForm(PROJECT_ID_VAR.projectId, payload);

      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null);

      if (result.errors) {
        toast.error(result.errors[0]?.message || "Failed to save registration lead");
        setLoading(false);
        return;
      }

      setSubmittedName(formData.name.split(" ")[0] || "Visitor");
      setSubmitSuccess(true);
      setLoading(false);

      setFormData({
        name: "",
        designation: "",
        company: "",
        address: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
        email: "",
        mobile: "",
        profile: "",
        promocode: "",
      });
      setTermsAccepted(false);
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.message || "Network error. Please try again.");
      setLoading(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You, {submittedName}!</h2>
        <p className="text-gray-600 mb-6">
          Your visitor registration for ITS Tyre Expo 2026 has been submitted successfully.
          A confirmation email has been sent to your registered email address.
        </p>
        <Link href="/" className="inline-block bg-[#CC9808] text-white px-6 py-2 rounded-lg hover:bg-black transition">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          placeholder="Enter your full name"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Designation <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleInputChange}
          required
          placeholder="Your job title/position"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          required
          placeholder="Your company/organization name"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address <span className="text-red-500">*</span>
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
          placeholder="ex: #20, 4th cross, RK Road"
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Country <span className="text-red-500">*</span>
        </label>
        <select
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
            placeholder="Enter your state"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            placeholder="Enter your city"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pin Code / Zip Code <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleInputChange}
          required
          placeholder="Enter your postal code"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder="Enter your email address"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
        />
        <p className="mt-1 text-xs text-gray-500">
          We'll send your registration confirmation and updates to this email.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mobile Number <span className="text-red-500">*</span>
        </label>
        <div className="flex">
          <div className="flex items-center px-3 py-2.5 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
            <span className="text-gray-700 text-sm">+91</span>
          </div>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            required
            placeholder="Enter your mobile number"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Please choose your Profile <span className="text-red-500">*</span>
        </label>
        <select
          name="profile"
          value={formData.profile}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
        >
          <option value="">Select your industry profile</option>
          <option value="Tyre Manufacturing">Tyre Manufacturing</option>
          <option value="Rubber Processing">Rubber Processing</option>
          <option value="Automotive">Automotive</option>
          <option value="Machinery">Machinery & Equipment</option>
          <option value="Raw Materials">Raw Materials Supply</option>
          <option value="Logistics">Logistics & Supply Chain</option>
          <option value="Research">Research & Development</option>
          <option value="Consulting">Consulting Services</option>
          <option value="Trading">Trading & Distribution</option>
          <option value="Media">Media & Publications</option>
          <option value="Student">Student</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Promocode (Optional)
        </label>
        <input
          type="text"
          name="promocode"
          value={formData.promocode}
          onChange={handleInputChange}
          placeholder="Enter promo code if you have one"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC9808] focus:border-[#CC9808] outline-none transition bg-white text-sm"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="terms-enquiry"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          required
          className="mt-1 w-4 h-4 text-[#CC9808] rounded border-gray-300 focus:ring-[#CC9808]"
        />
        <label htmlFor="terms-enquiry" className="text-sm text-gray-600 cursor-pointer">
          I agree to receive marketing communications, updates, and promotional materials from ITS Tyre Expo.
          I can unsubscribe anytime. For more information, please refer to our{" "}
          <Link href="/privacy-policy" className="text-[#CC9808] hover:underline">
            Privacy Policy
          </Link>.
        </label>
      </div>

      <button
        type="submit"
        disabled={loading || !termsAccepted}
        className="w-full bg-[#CC9808] text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Complete Registration"
        )}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Need assistance? Contact us at{" "}
        <a href="mailto:support@tyre-expo.com" className="text-[#CC9808] hover:underline">
          support@tyre-expo.com
        </a>
      </p>
    </form>
  );
}
