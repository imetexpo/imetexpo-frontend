// app/advertising-details/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "@/components/ui/container";
import PartnersSection from "@/components/home/PartnersSection";
import BackToTop from "@/components/layout/BackToTop";

export default function AdvertisingDetailsPage() {
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

  const benefits = [
    {
      title: "Reach Your Target Audience",
      description: "Communicate directly with industry specialists and decision-makers.",
      icon: "https://cdn.itegroupnews.com/4_7579e3b4df.png",
      fallbackIcon: "🎯"
    },
    {
      title: "Increase Stand Traffic",
      description: "Drive more visitors to your booth and create meaningful connections.",
      icon: "https://cdn.itegroupnews.com/5_e69e2d6c8b.png",
      fallbackIcon: "📊"
    },
    {
      title: "Gain a Competitive Edge",
      description: "Stand out among exhibitors and position your brand as an industry leader.",
      icon: "https://cdn.itegroupnews.com/6_1234567890.png",
      fallbackIcon: "⚡"
    },
    {
      title: "Boost Brand Awareness",
      description: "Strengthen your company's image and market visibility.",
      icon: "https://cdn.itegroupnews.com/7_93579318f2.png",
      fallbackIcon: "🏷️"
    },
    {
      title: "Showcase Innovations",
      description: "Highlight new products and services to a highly relevant audience.",
      icon: "https://cdn.itegroupnews.com/8_fa2729f754.png",
      fallbackIcon: "💡"
    },
    {
      title: "Drive Sales & Business Growth",
      description: "Convert exhibition exposure into direct sales opportunities.",
      icon: "https://cdn.itegroupnews.com/9_1c550dbab6.png",
      fallbackIcon: "📈"
    }
  ];

  const sponsorshipTabs = [
    {
      title: "Advertising Options",
      description: "Enhance brand awareness and maximize visitor engagement by leveraging a range of advertising services designed to increase your company's visibility and commercial success.",
      buttonText: "Download Manual",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/1_9622597897.png",
      fallbackIcon: "📢"
    },
    {
      title: "Affiliate Sponsorship Packages",
      description: "Choose from a variety of sponsorship packages tailored to meet your marketing objectives, or request a customized package that aligns with your brand strategy.",
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/2_af03062734.png",
      fallbackIcon: "🤝"
    },
    {
      title: "Advertising Surfaces at BITEC",
      description: "Secure prime advertising locations both indoors and outdoors at the ITS Tyre Expo exhibition site to ensure maximum exposure for your brand.",
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/3_065bb10e11.png",
      fallbackIcon: "📍"
    },
    {
      title: "New Product Announcements",
      description: "Take advantage of free marketing support and exclusive promotional packages to introduce and highlight your latest products effectively.",
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/4_b530561fa3.png",
      fallbackIcon: "🎉"
    }
  ];

  const ImageWithFallback = ({
    src,
    alt,
    fallbackIcon,
    className = "",
    objectFit = "contain"
  }: {
    src: string;
    alt: string;
    fallbackIcon?: string;
    className?: string;
    objectFit?: "cover" | "contain";
  }) => {
    const [error, setError] = useState(false);

    if (error || !src) {
      return (
        <div className={`flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 ${className}`}>
          <span className="text-3xl sm:text-4xl">{fallbackIcon || "🏨"}</span>
        </div>
      );
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={`h-full w-full ${objectFit === "contain" ? "object-contain" : "object-cover"} ${className}`}
        onError={() => setError(true)}
      />
    );
  };

  return (
    <div className="intro-animation font-sans">
      <div className="page-spacing-wrapper pt-[120px] lg:pt-[140px]">

        {/* Header Section */}
        <Container className="py-10">
          <div className="animated-block">
            <div className="animated-block-target">
              <div className="text-center lg:text-left space-y-4">
                <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-tight text-black uppercase">
                  Advertising & <span className="text-[#CC9808]">Sponsorship</span>
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-gray-700 max-w-3xl font-sans">
                  Maximize your brand exposure and reach key decision-makers through our comprehensive 
                  advertising and sponsorship opportunities at ITS Tyre Expo 2026.
                </p>
              </div>
            </div>
          </div>
        </Container>

        {/* Benefits Section */}
        <Container className="py-10">
          <div className="animated-block mt-8 sm:mt-12">
            <div className="animated-block-target">
              <h2 className="font-bebas text-4xl sm:text-5xl text-black uppercase">
                By leveraging these promotional options, you can:
              </h2>
              <p className="mt-2 text-sm font-bold text-[#CC9808] uppercase tracking-wider">
                Please review the requirements carefully to ensure timely submission.
              </p>
              
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="relative flex flex-col overflow-hidden rounded-sm border border-gray-100 bg-[#FCF8F3] p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden bg-white p-3 rounded-sm border border-gray-150">
                      <ImageWithFallback
                        src={benefit.icon}
                        alt={benefit.title}
                        fallbackIcon={benefit.fallbackIcon}
                        objectFit="contain"
                        className="h-full w-full"
                      />
                    </div>
                    <h3 className="mt-5 font-bebas text-2xl text-[#CC9808] uppercase font-bold">{benefit.title}</h3>
                    <p className="mt-3 text-sm text-gray-650 leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>

        {/* Advertising & Sponsorship Options Section */}
        <Container className="py-10">
          <div className="animated-block mt-8 sm:mt-12">
            <div className="animated-block-target">
              <h2 className="font-bebas text-4xl sm:text-5xl text-black uppercase">
                Advertising & <span className="text-[#CC9808]">Sponsorship Options</span>
              </h2>
              <div className="mt-8 space-y-4">
                {sponsorshipTabs.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col lg:flex-row items-center gap-6 rounded-sm border border-gray-100 bg-[#FCF8F3] p-6 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-white border border-gray-150 p-2">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        fallbackIcon={item.fallbackIcon}
                        objectFit="contain"
                        className="h-full w-full"
                      />
                    </div>
                    
                    {/* Title & Description */}
                    <div className="flex-1 text-center lg:text-left space-y-2">
                      <h4 className="font-bebas text-2xl font-bold text-black uppercase tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Button */}
                    <div className="shrink-0 mt-4 lg:mt-0">
                      <Link href={item.buttonLink}>
                        <button className="bg-[#CC9808] hover:bg-black text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                          {item.buttonText}
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
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
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animated-block:nth-child(1) { animation-delay: 0.1s; }
      `}</style>
    </div>
  );
}