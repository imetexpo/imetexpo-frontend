// app/sponsorship-enquiry/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/container';
import PartnersSection from '@/components/home/PartnersSection';
import { Button } from '@/components/ui/button';
import { queueContactSubmission } from '@/lib/api/contactSubmission';

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
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", 
  "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", 
  "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", 
  "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", 
  "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", 
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", 
  "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", 
  "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", 
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", 
  "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", 
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", 
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", 
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", 
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", 
  "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", 
  "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", 
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", 
  "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
  "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", 
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", 
  "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", 
  "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

import { useUTMData } from "@/hooks/useUTMTracker";
import toast from "react-hot-toast";
import LoadingDots from '@/components/ui/LoadingDots';


export default function SponsorshipEnquiryPage() {
  const { utmData, campaign } = useUTMData();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    jobTitle: '',
    country: '',
    phone: '',
    workEmail: '',
    productSectors: [] as string[],
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSectorToggle = (sector: string) => {
    setFormData(prev => ({
      ...prev,
      productSectors: prev.productSectors.includes(sector)
        ? prev.productSectors.filter(s => s !== sector)
        : [...prev.productSectors, sector]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.companyName || !formData.jobTitle || !formData.country || !formData.phone || !formData.workEmail) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const payload = {
      // Form fields
      email: formData.workEmail,
      formType: 'sponsor-registration',
      firstName: formData.firstName,
      lastName: formData.lastName,
      contactPerson: `${formData.firstName} ${formData.lastName}`.trim(),
      companyName: formData.companyName,
      jobTitle: formData.jobTitle,
      phone: formData.phone,
      country: formData.country,
      productSectors: formData.productSectors,
      submittedAt: new Date().toISOString(),

      // UTM Tracking Data
      utmSource: utmData?.utm_source || '',
      utmMedium: utmData?.utm_medium || '',
      utmCampaign: utmData?.utm_campaign || '',
      utmTerm: utmData?.utm_term || '',
      utmContent: utmData?.utm_content || '',
      utmId: utmData?.utm_id || '',
      referrer: utmData?.referrer || '',
      landingPage: utmData?.landingPage || '',
      utmTimestamp: utmData?.timestamp || '',

      // CMS Campaign Data
      cmsCampaignId: campaign?.id || '',
      cmsCampaignName: campaign?.name || '',
      cmsCampaignSource: campaign?.utm_source || '',
      cmsCampaignMedium: campaign?.utm_medium || '',
    };

    try {
      await queueContactSubmission(payload);

      setSubmitSuccess(true);
      toast.success("Thank you! Your sponsorship enquiry has been submitted.");
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setSubmitError(error.message || 'Network error occurred. Please try again.');
      toast.error("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    const displayName = `${formData.firstName} ${formData.lastName}`.trim() || formData.companyName || "Partner";

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
        <div className="bg-white rounded-2xl shadow-md border border-purple-100 p-8 max-w-lg w-full text-center animate-fadeIn">
          <div className="w-16 h-16 bg-[#FAF5FF] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#7E22CE]/30 shadow-xs">
            <svg className="w-8 h-8 text-[#6B21A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#6B21A8] bg-[#FAF5FF] border border-purple-200/80 px-3 py-1 rounded-full mb-3">
            IndiaMET 2027 • Sponsorship Enquiry
          </span>
          <h2 className="font-bebas text-4xl text-[#581C87] mb-2 uppercase tracking-wide">
            Thank You, {displayName}!
          </h2>
          <p className="text-base text-gray-600 mb-5 leading-relaxed">
            Your sponsorship enquiry for <strong>IndiaMET 2027 Exhibition &amp; Summit</strong> (13–15 May 2027, Pune) has been submitted successfully.
          </p>

          <div className="bg-[#FAF5FF]/70 border border-purple-100 rounded-xl p-4 text-left text-xs space-y-2 mb-6">
            <div className="flex justify-between pb-1.5 border-b border-purple-100">
              <span className="text-gray-500 font-medium">Name:</span>
              <span className="font-semibold text-gray-800">{displayName}</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-purple-100">
              <span className="text-gray-500 font-medium">Company:</span>
              <span className="font-bold text-gray-800">{formData.companyName || "Not provided"}</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-purple-100">
              <span className="text-gray-500 font-medium">Job Title:</span>
              <span className="font-semibold text-gray-800">{formData.jobTitle || "Not provided"}</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-purple-100">
              <span className="text-gray-500 font-medium">Phone Number:</span>
              <span className="font-semibold text-gray-800">{formData.phone || "Not provided"}</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-purple-100">
              <span className="text-gray-500 font-medium">Email:</span>
              <span className="font-semibold text-[#6B21A8]">{formData.workEmail || "Not provided"}</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-purple-100">
              <span className="text-gray-500 font-medium">Address:</span>
              <span className="font-semibold text-gray-800">{formData.country || "Not provided"}</span>
            </div>
            {formData.productSectors && formData.productSectors.length > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Sectors:</span>
                <span className="font-semibold text-[#6B21A8]">{formData.productSectors.join(", ")}</span>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            A confirmation email will be sent to <strong className="text-gray-700">{formData.workEmail}</strong>. Our sponsorship and partnerships management team will reach out to you shortly with tailored sponsorship packages, branding deliverables, and booth layout options.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-white py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10">
            
            {/* LEFT SIDE - HEADER CONTENT */}
            <div className="flex flex-col gap-6 lg:sticky lg:top-44 h-fit">
              <p className="text-[#00A1B1] font-sans text-[14px] font-semibold uppercase tracking-[1.5px]">
                Partner With Us
              </p>
              <h1 className="font-bebas font-bold text-[38px] lg:text-[48px] leading-[1.15] tracking-[1px] uppercase text-[#003A77]">
                Sponsorship Enquiry
              </h1>
              <div className="font-sans text-[16px] sm:text-[18px] text-gray-700 leading-[1.6] space-y-4">
                <p>
                  Showcase your brand to thousands of precision metrology and quality engineering professionals 
                  and decision-makers from across the globe.
                </p>
                <p>
                  From premium branding opportunities to exclusive networking events, 
                  we offer tailored sponsorship packages to meet your marketing objectives 
                  and budget.
                </p>
              </div>
              <div className="mt-4">
                {/* <Button
               href="/contact-us/"
                  className="bg-[#00A1B1] text-white px-8 py-3 text-sm font-extrabold uppercase tracking-[1.5px] hover:bg-[#003A77] transition-all duration-300"
                >
                  Download Sponsorship Brochure
                </Button> */}
              </div>
            </div>

            {/* RIGHT SIDE - FORM */}
            <div className="bg-[#f5f5f5] rounded-2xl p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Type your first name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Type your last name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition bg-white"
                      required
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Type your Company Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition bg-white"
                    required
                  />
                </div>

                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="Type your Job Title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition bg-white"
                    required
                  />
                </div>

                {/* Country & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition bg-white"
                      required
                    >
                      <option value="">Select your country</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Type your phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition bg-white"
                      required
                    />
                  </div>
                </div>

                {/* Work Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="workEmail"
                    value={formData.workEmail}
                    onChange={handleInputChange}
                    placeholder="Type your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition bg-white"
                    required
                  />
                </div>

                {/* Product Sectors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Product Sectors
                  </label>
                  <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="grid grid-cols-1 gap-2">
                      {productSectors.map((sector, index) => (
                        <label key={index} className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                          <input
                            type="checkbox"
                            checked={formData.productSectors.includes(sector)}
                            onChange={() => handleSectorToggle(sector)}
                            className="mt-0.5 w-4 h-4 text-[#00A1B1] rounded border-gray-300 focus:ring-[#00A1B1]"
                          />
                          <span className="text-sm text-gray-700">{sector}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm text-center">{submitError}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00A1B1] text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-[#003A77] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <span className="inline-flex items-center justify-center gap-2"><LoadingDots size="sm" tone="light" label="" />Submitting...</span> : 'Submit Enquiry'}
                </button>

                {/* Terms & Conditions */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  T&C’s: By submitting this form, you agree to receive marketing communications, updates, 
                  and promotional materials from us. You can unsubscribe anytime by clicking the "unsubscribe" 
                  link in our emails. For more information on how we handle your data, please refer to our 
                  <Link href="/privacy-policy" className="text-[#00A1B1] hover:underline ml-1">Privacy Policy</Link>.
                </p>
              </form>
            </div>

          </div>
        </Container>
      </section>
      <PartnersSection />
    </>
  );
}