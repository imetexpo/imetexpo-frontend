// app/sponsorship-opportunities/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "@/components/ui/container";
import PartnersSection from "@/components/home/PartnersSection";
import BackToTop from "@/components/layout/BackToTop";
import PageHero from "@/components/layout/PageHero";

export default function AdvertisingDetailsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-100 grid place-content-center bg-[#031A34]">
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
      title: "Presenting Sponsor",
      description: "Position your brand at the forefront of INDIAMET Expo with premium visibility across the exhibition website, visitor communications, venue branding, registration promotions, social media and selected official marketing materials.",
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/1_9622597897.png",
      fallbackIcon: "🏆"
    },
    {
      title: "Platinum Sponsor",
      description: "Achieve high-impact visibility among manufacturing, metrology, quality, inspection and engineering professionals through premium venue branding, digital promotion, technical presentation opportunities and product showcase support.",
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/2_af03062734.png",
      fallbackIcon: "🥇"
    },
    {
      title: "Gold Sponsor",
      description: "Strengthen your brand presence with targeted exposure through exhibition signage, website visibility, brochure branding, social media promotion, product features and opportunities to engage relevant industry decision-makers.",
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/3_065bb10e11.png",
      fallbackIcon: "🥈"
    },
    {
      title: "Silver Sponsor",
      description: "A focused sponsorship option for specialist technology and solution providers seeking visibility among professionals involved in metrology, precision measurement, inspection, testing and quality management.",
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/4_b530561fa3.png",
      fallbackIcon: "🥉"
    },
    {
      title: "Visitor Registration Sponsor",
      description: "Associate your brand with the visitor registration experience through registration-area branding, visitor communication visibility, website promotion and selected on-site branding opportunities.",
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/1_9622597897.png",
      fallbackIcon: "🎟️"
    },
    {
      title: "Visitor Badge Sponsor",
      description: "Put your brand directly in the hands of exhibition visitors with branding opportunities on visitor badges and selected registration-area communication materials.",
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/2_af03062734.png",
      fallbackIcon: "🎫"
    },
    {
      title: "Entrance & Welcome Sponsor",
      description: "Create a strong first impression with prominent branding at the exhibition entrance, welcome area, selected directional signage and visitor arrival points.",
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/3_065bb10e11.png",
      fallbackIcon: "🚪"
    },
    {
      title: "Knowledge Session Sponsor",
      description: "Associate your company with technical knowledge and industry learning through session branding, stage visibility, speaker introduction, presentation opportunities and digital promotion.",
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/4_b530561fa3.png",
      fallbackIcon: "🎤"
    },
    {
      title: "Technology Showcase Sponsor",
      description: "Highlight your latest metrology, inspection, measurement and quality technologies through dedicated showcase branding, product demonstrations and digital promotion.",
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/1_9622597897.png",
      fallbackIcon: "🔬"
    },
    {
      title: "Digital Promotion Partner",
      description: "Extend your INDIAMET Expo presence beyond the exhibition floor with website visibility, social media promotion, product features, email campaigns and digital brochure opportunities.",
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/2_af03062734.png",
      fallbackIcon: "📱"
    },
    {
      title: "Official Brochure Sponsor",
      description: "Showcase your brand and products through premium advertising and branding opportunities within the official INDIAMET Expo brochure and its digital version.",
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/3_065bb10e11.png",
      fallbackIcon: "📰"
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
      <div className="page-spacing-wrapper lg:pt-0">
        <PageHero
          title="SPONSOR"
          accent="INDIAMET EXPO"
          subtitle="Put your brand in front of the people who drive precision manufacturing through high-impact sponsorship and promotional opportunities."
        />

        {/* Benefits Section */}
        <Container className="py-10">
          <div className="animated-block mt-8 sm:mt-12">
            <div className="animated-block-target">
              <h2 className="font-bebas text-4xl sm:text-5xl text-[#031A34] uppercase">
                By leveraging these promotional options, you can:
              </h2>
              <p className="mt-2 text-base sm:text-lg font-bold text-[#F9B122] uppercase tracking-wider">
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
                    <h3 className="mt-5 font-bebas text-2xl text-[#F9B122] uppercase font-bold">{benefit.title}</h3>
                    <p className="mt-3 text-lg sm:text-xl text-gray-650 leading-relaxed">{benefit.description}</p>
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
              <h2 className="font-bebas text-4xl sm:text-5xl text-[#031A34] uppercase">
                Sponsorship <span className="text-[#F9B122]"> Options</span>
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
                      <h4 className="font-bebas text-2xl font-bold text-[#031A34] uppercase tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Button */}
                    <div className="shrink-0 mt-4 lg:mt-0">
                      <Link href={item.buttonLink}>
                        <button className="bg-[#F9B122] hover:bg-[#031A34] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
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