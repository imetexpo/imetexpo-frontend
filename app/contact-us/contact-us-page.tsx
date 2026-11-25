// app/contact-us/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PartnersSection from "@/components/home/PartnersSection";
import BackToTop from "@/components/layout/BackToTop";
import Container from "@/components/ui/container";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import LoadingDots from '@/components/ui/LoadingDots';


export default function ContactUsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <LoadingDots fullScreen />
    );
  }

  return (
    <div className="intro-animation font-sans">
      <div className="page-spacing-wrapper lg:pt-0 pb-20 sm:pb-28">
        <PageHero
          title="CONTACT"
          accent="US"
          subtitle="Have questions or need help with booth registration or visitor passes? Reach out to us."
        />

        {/* Main Contact Section */}
        <Container>
          <div className="animated-block">
            <div className="animated-block-target">
              <div className="mt-12 sm:mt-16 lg:mt-20 grid gap-8 lg:grid-cols-3">
                {/* Organised By Card */}
                <div className="lg:col-span-1">
                  <div className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-gray-150 bg-[#FCF8F3] p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                    <div className="space-y-6">
                      <div className="mb-2">
                        <h2 className="font-bebas text-3xl sm:text-4xl text-[#00A1B1] uppercase font-bold tracking-tight">ORGANISED BY</h2>
                        <div className="mt-1.5 h-1 w-20 bg-[#00A1B1]"></div>
                      </div>
                      <Image
                        src="/images/maxx_logo.webp"
                        alt="MaxX Business Media Pvt Ltd logo"
                        width={360}
                        height={140}
                        className="h-auto w-[240px] object-contain sm:w-[280px]"
                      />
                      <div className="space-y-3 font-sans">
                        <h3 className="text-xl sm:text-2xl font-bold text-black uppercase leading-snug">
                          Maxx Business Media Pvt. Ltd.
                        </h3>
                        <div className="text-base sm:text-lg text-gray-700 space-y-1.5 leading-relaxed">
                          <p>T9, 3rd Floor, Swastik Manandi Arcade,</p>
                          <p>Seshadripuram, Bangalore 560020</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-10 space-y-5 pt-8 border-t border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-lg bg-white border border-gray-200 shadow-xs">
                          <svg className="w-6 h-6 text-[#00A1B1]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <a
                          href="tel:+919148319993"
                          className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 hover:text-[#00A1B1] font-sans tracking-wide transition-colors"
                        >
                          +91 91483 19993
                        </a>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-lg bg-white border border-gray-200 shadow-xs">
                          <svg className="w-6 h-6 text-[#00A1B1]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <a
                          href="mailto:pad@maxxmedia.in"
                          className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 hover:text-[#00A1B1] font-sans tracking-wide transition-colors"
                        >
                          pad@maxxmedia.in
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Venue & Map Card */}
                <div className="lg:col-span-2">
                  <div className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-gray-150 bg-[#FCF8F3] p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                    <div className="space-y-6">
                      <div className="mb-2">
                        <h2 className="font-bebas text-3xl sm:text-4xl text-[#00A1B1] uppercase font-bold tracking-tight">VENUE</h2>
                        <div className="mt-1.5 h-1 w-20 bg-[#00A1B1]"></div>
                      </div>
                      <div className="space-y-3 font-sans">
                        <h3 className="text-xl sm:text-2xl font-bold text-black uppercase leading-snug">
                          Auto Cluster Exhibition Centre
                        </h3>
                        <div className="text-base sm:text-lg text-gray-700 space-y-1 leading-relaxed">
                          <p>MIDC, Chinchwad, Pimpri-Chinchwad, Pune, Maharashtra 411019.</p>
                        </div>
                      </div>

                      {/* Google Maps Embed */}
                      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-xs">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4110.374496455856!2d73.7990458754672!3d18.638844465550328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b84992d04bbd%3A0x9f1c44fb853ba461!2sAuto%20Cluster%20Exhibition%20Center%2C%20Chinchwad%2C%20Pune!5e1!3m2!1sen!2sin!4v1770050921314!5m2!1sen!2sin"
                          className="w-full h-[360px] sm:h-[420px] border-0"
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Auto Cluster Exhibition Centre Location"
                        ></iframe>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 text-sm pt-4 border-t border-gray-200 font-sans">
                        <div className="flex items-center gap-2 text-gray-600">
                          <svg className="w-4 h-4 text-[#00A1B1]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span>Interactive map - Zoom &amp; explore</span>
                        </div>
                        <Link
                          href="https://www.google.com/maps/place/Auto+Cluster+Exhibition+Center,+Chinchwad,+Pune/@18.6388445,73.7990459,17z"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00A1B1] hover:text-[#003A77] font-bold uppercase tracking-wider transition-colors"
                        >
                          Open in Google Maps →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours & Info */}
              <div className="mt-16 sm:mt-20 text-center space-y-5">
                <div className="inline-flex items-center gap-3.5 bg-[#FCF8F3] border border-gray-200 px-6 py-3.5 rounded-lg shadow-2xs">
                  <svg className="w-5 h-5 text-[#00A1B1]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base font-bold text-slate-800 uppercase tracking-wider">Business Hours: Mon-Sat, 10AM-6PM IST</span>
                </div>
                <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
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