// app/contact-us/page.tsx
"use client";

import { useState, useEffect } from "react";
import PartnersSection from "@/components/home/PartnersSection";
import BackToTop from "@/components/layout/BackToTop";
import Container from "@/components/ui/container";
import Link from "next/link";

export default function ContactUsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-100 grid place-content-center bg-black">
        <div className="flex size-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-500 text-4xl">
          <div className="flex size-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-300 text-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="intro-animation font-sans">
      <div className="page-spacing-wrapper pt-[120px] lg:pt-[140px] pb-16">

        {/* Main Contact Section */}
        <Container>
          <div className="animated-block">
            <div className="animated-block-target">
              
              <div className="border-b border-gray-250 pb-6 mb-8 mt-10">
                <h1 className="font-bebas text-5xl sm:text-6xl text-black uppercase tracking-wide">
                  Contact <span className="text-[#CC9808]">Us</span>
                </h1>
                <p className="mt-2 text-sm text-gray-650 font-sans">
                  Have questions or need help with booth registration or visitor passes? Reach out to us.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                {/* Organised By Card */}
                <div className="lg:col-span-1">
                  <div className="relative flex flex-col justify-between overflow-hidden rounded-sm border border-gray-100 bg-[#FCF8F3] p-6 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                    <div className="space-y-4">
                      <div className="mb-2">
                        <h2 className="font-bebas text-2xl text-[#CC9808] uppercase font-bold">ORGANISED BY</h2>
                        <div className="mt-1 h-0.5 w-16 bg-[#CC9808]"></div>
                      </div>
                      <div className="space-y-3 font-sans">
                        <h3 className="text-lg font-bold text-black uppercase leading-snug">
                          Maxx Business Media Pvt. Ltd.
                        </h3>
                        <div className="text-xs text-gray-650 space-y-1.5 leading-relaxed">
                          <p>T9, 3rd Floor, Swastik Manandi Arcade,</p>
                          <p>Seshadripuram, Bangalore 560020</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 space-y-3 pt-6 border-t border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white border border-gray-150">
                          <svg className="w-5 h-5 text-[#CC9808]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold text-slate-800 font-sans tracking-wide">+91 91483 19993</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white border border-gray-150">
                          <svg className="w-5 h-5 text-[#CC9808]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold text-slate-800 font-sans tracking-wide">pad@diemex.in</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Venue & Map Card */}
                <div className="lg:col-span-2">
                  <div className="relative flex flex-col overflow-hidden rounded-sm border border-gray-100 bg-[#FCF8F3] p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="space-y-4">
                      <div className="mb-2">
                        <h2 className="font-bebas text-2xl text-[#CC9808] uppercase font-bold">VENUE</h2>
                        <div className="mt-1 h-0.5 w-16 bg-[#CC9808]"></div>
                      </div>
                      <div className="space-y-3 font-sans">
                        <h3 className="text-lg font-bold text-black uppercase leading-snug">
                          Auto Cluster Exhibition Centre
                        </h3>
                        <div className="text-xs text-gray-655 space-y-1 leading-relaxed">
                          <p>MIDC, Chinchwad, Pimpri-Chinchwad, Pune, Maharashtra 411019.</p>
                        </div>
                      </div>

                      {/* Google Maps Embed */}
                      <div className="overflow-hidden rounded-sm border border-gray-150">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4110.374496455856!2d73.7990458754672!3d18.638844465550328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b84992d04bbd%3A0x9f1c44fb853ba461!2sAuto%20Cluster%20Exhibition%20Center%2C%20Chinchwad%2C%20Pune!5e1!3m2!1sen!2sin!4v1770050921314!5m2!1sen!2sin"
                          className="w-full h-[300px] border-0"
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Auto Cluster Exhibition Centre Location"
                        ></iframe>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-2 border-t border-gray-200 font-sans">
                        <div className="flex items-center gap-2 text-gray-500">
                          <svg className="w-4 h-4 text-[#CC9808]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span>Interactive map - Zoom & explore</span>
                        </div>
                        <Link
                          href="https://www.google.com/maps/place/Auto+Cluster+Exhibition+Center,+Chinchwad,+Pune/@18.6388445,73.7990459,17z"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#CC9808] hover:text-black font-bold uppercase tracking-wider transition-colors"
                        >
                          Open in Google Maps →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours & Info */}
              <div className="mt-12 text-center space-y-4">
                <div className="inline-flex items-center gap-3 bg-[#FCF8F3] border border-gray-150 px-4 py-2.5 rounded-sm">
                  <svg className="w-5 h-5 text-[#CC9808]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Business Hours: Mon-Sat, 10AM-6PM IST</span>
                </div>
                <p className="text-xs text-gray-650 max-w-xl mx-auto leading-relaxed">
                  For exhibition bookings, stand options, partnership opportunities, or general visitor enquiries,
                  please reach out to us during business hours.
                </p>
              </div>
            </div>
          </div>
        </Container>

        <div className="mt-12 sm:mt-16 lg:mt-20">
          <PartnersSection />
        </div>
      </div>
      <BackToTop />

      <style jsx>{`
        .font-bebas { font-family: 'Bebas Neue', cursive; }
        .animated-block {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.6s ease forwards;
        }
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
        .animated-block:nth-child(1) { animation-delay: 0.1s; }
      `}</style>
    </div>
  );
}