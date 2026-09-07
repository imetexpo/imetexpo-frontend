'use client'

import SectionContainer from "@/components/ui/section"
import DelegateForm from "./DelegateForm"
import BackToTop from "@/components/layout/BackToTop"

export default function DelegatesPackagesPage() {
  const delegatePackages = [
    {
      id: 1,
      title: "Student",
      price: "₹ 3,500",
      features: [
        "Access to all technical conference sessions",
        "Conference kit (Badge, Folder, Notepad, Pen)",
        "Entry to exhibition area (all 3 days)",
        "Interaction with industry experts & speakers",
        "Certificate of Participation",
        "Career guidance & mentorship interaction",
        "Internship & placement opportunity connect",
        "Digital access to conference presentation summaries",
        "Lunch & refreshments",
      ],
    },
    {
      id: 2,
      title: "General",
      price: "₹ 6,000",
      features: [
        "Full access to all conference sessions",
        "Entry to exhibition area (all 3 days)",
        "Conference kit (Badge, Folder, Notepad, Pen)",
        "Access to networking lunch & tea breaks",
        "B2B networking opportunity",
        "Access to speakers' presentation (digital copy post event)",
        "Certificate of Participation",
        "Entry to Business Networking Meet",
        "Access to post-event report & industry insights summary",
      ],
    },
    {
      id: 3,
      title: "GROUP of 3",
      price: "₹ 15,000",
      features: [
        "Full conference access (all sessions)",
        "Priority seating in technical sessions",
        "Exhibition entry (all 3 days) Reserved group seating",
        "Company name recognition on delegate list",
        "Access to networking lunch & tea breaks",
        "Digital presentations access",
        "Participation certificates for all 3",
        "Group networking badge recognition",
        "Priority B2B meeting assistance (pre-scheduled on request)",
      ],
    }
  ];

  return (
    <main className="bg-white font-sans">
      {/* PAGE HEADER */}
      <div className="bg-orange-50 pt-18 pb-16">
        <SectionContainer>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#03193D]">
            Become a Delegate
          </h1>
          <p className="mt-4 max-w-4xl text-lg text-gray-600">
            Prices are inclusive of GST
          </p>
        </SectionContainer>
      </div>

      {/* MAIN CONTENT */}
      <section className="py-16">
        <SectionContainer>
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            {/* LEFT CONTENT - PACKAGES */}
            <div>
              <div className="max-w-4xl">
                <h2 className="mt-5 text-4xl font-semibold text-gray-700 lg:text-5xl">
                  Choose Your Delegate Package
                </h2>

                <p className="mt-6 text-lg leading-relaxed text-gray-700">
                  Join industry leaders and experts at Tyre Expo 2026. Select the package that best suits your 
                  needs and gain access to exclusive networking opportunities, insightful sessions, and valuable 
                  industry connections.
                </p>

                <hr className="my-10 border-gray-200" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {delegatePackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="flex flex-col bg-orange-50/30 rounded-2xl p-6 border border-orange-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <h3 className="text-2xl font-bold text-[#CC9808] mb-3">{pkg.title}</h3>
                      
                      <ul className="space-y-2 mb-6 flex-1">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-700">
                            <svg
                              className="mr-2 mt-0.5 flex-shrink-0 text-[#CC9808]"
                              width="16"
                              height="16"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.6667 5L7.50004 14.1667L3.33337 10"
                                stroke="#CC9808"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-4 border-t border-orange-200">
                        <div className="text-2xl font-bold text-[#CC9808]">{pkg.price}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="my-10 border-gray-200" />

                <h3 className="mb-8 text-3xl font-semibold text-gray-900">
                  Why Attend Tyre Expo 2026?
                </h3>

                <div className="grid grid-cols-2 gap-x-10 gap-y-8">
                  <div className="group hover:translate-x-1 transition-transform">
                    <p className="text-5xl font-bold text-[#CC9808]">500+</p>
                    <p className="mt-2 text-lg text-gray-700">Industry Professionals</p>
                  </div>
                  <div className="group hover:translate-x-1 transition-transform">
                    <p className="text-5xl font-bold text-[#CC9808]">30+</p>
                    <p className="mt-2 text-lg text-gray-700">Expert Speakers</p>
                  </div>
                  <div className="group hover:translate-x-1 transition-transform">
                    <p className="text-5xl font-bold text-[#CC9808]">4+</p>
                    <p className="mt-2 text-lg text-gray-700">Networking Events</p>
                  </div>
                  <div className="group hover:translate-x-1 transition-transform">
                    <p className="text-5xl font-bold text-[#CC9808]">20+</p>
                    <p className="mt-2 text-lg text-gray-700">Hours of Content</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="relative">
              <div className="lg:sticky lg:top-44">
                <DelegateForm />
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>
      
      <BackToTop />
    </main>
  )
}