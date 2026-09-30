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
      points: [
        "Exclusive presenting-partner recognition on the official website, event brochure, and selected visitor communications",
        "Premium on-site branding at key visitor touchpoints, including registration, entrance, and high-traffic exhibition areas",
        "Logo placement on official email campaigns, social media posts, and selected pre-show marketing materials",
        "Opportunity to deliver a featured industry presentation or opening address during the summit programme",
        "Complimentary exhibitor stand upgrade or prominent product showcase space, subject to availability",
        "VIP hospitality access for clients, partners, and senior management during the exhibition",
        "Priority branding in visitor registration promotions and selected digital advertising creatives",
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/1_9622597897.png",
      fallbackIcon: "🏆"
    },
    {
      title: "Platinum Sponsor",
      description: "Achieve high-impact visibility among manufacturing, metrology, quality, inspection and engineering professionals through premium venue branding, digital promotion, technical presentation opportunities and product showcase support.",
      points: [
        "High-visibility logo placement on the exhibition website, official brochure, and selected venue signage",
        "Premium branding on selected exhibition aisles, session areas, or digital screens",
        "One dedicated technical presentation or product spotlight in the knowledge programme",
        "Social media features highlighting your brand, products, and participation at INDIAMET",
        "Inclusion in selected pre-show and on-site visitor communications",
        "Complimentary visitor passes for clients and business partners",
        "Lead-generation support through selected networking and showcase opportunities",
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/2_af03062734.png",
      fallbackIcon: "🥇"
    },
    {
      title: "Gold Sponsor",
      description: "Strengthen your brand presence with targeted exposure through exhibition signage, website visibility, brochure branding, social media promotion, product features and opportunities to engage relevant industry decision-makers.",
      points: [
        "Logo presence on the official website and selected pages of the event brochure",
        "On-site branding through selected exhibition signage and promotional displays",
        "Social media mention and product or company feature across INDIAMET channels",
        "Opportunity to showcase a featured product, solution, or case study",
        "Inclusion in selected visitor email communications before the show",
        "Complimentary passes for customers, distributors, and sales teams",
        "Recognition as a Gold Sponsor on selected digital and print materials",
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/3_065bb10e11.png",
      fallbackIcon: "🥈"
    },
    {
      title: "Silver Sponsor",
      description: "A focused sponsorship option for specialist technology and solution providers seeking visibility among professionals involved in metrology, precision measurement, inspection, testing and quality management.",
      points: [
        "Logo listing on the official website and selected sponsor acknowledgement materials",
        "Branding in selected exhibition communications and digital directories",
        "Opportunity to highlight a specialist product or application for metrology and quality teams",
        "Social media acknowledgement as a Silver Sponsor",
        "Selected on-site brand visibility in designated sponsor areas",
        "Complimentary visitor invitations for key customers and channel partners",
        "Cost-effective exposure among a highly targeted technical audience",
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/4_b530561fa3.png",
      fallbackIcon: "🥉"
    },
    {
      title: "Visitor Registration Sponsor",
      description: "Associate your brand with the visitor registration experience through registration-area branding, visitor communication visibility, website promotion and selected on-site branding opportunities.",
      points: [
        "Branding at the visitor registration counters and queue management area",
        "Logo presence on selected registration confirmation emails and visitor communications",
        "Website acknowledgement as the official Visitor Registration Sponsor",
        "Opportunity to include a branded message or insert in selected registration materials",
        "High dwell-time visibility among every visitor completing on-site or pre-show registration",
        "Selected directional or counter-top branding in the registration zone",
        "Direct association with the first official touchpoint of the exhibition journey",
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/1_9622597897.png",
      fallbackIcon: "🎟️"
    },
    {
      title: "Visitor Badge Sponsor",
      description: "Put your brand directly in the hands of exhibition visitors with branding opportunities on visitor badges and selected registration-area communication materials.",
      points: [
        "Logo or brand mark on official visitor badges worn throughout the exhibition",
        "Continuous brand exposure as visitors move across halls, sessions, and networking areas",
        "Recognition as the official Visitor Badge Sponsor on selected communications",
        "Branding support in the badge collection or lanyard distribution area",
        "Opportunity to include a short brand line or URL on selected badge artwork, subject to production",
        "High-frequency visibility among exhibitors, visitors, speakers, and media",
        "Ideal for brands seeking recall beyond a single stand or signage location",
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/2_af03062734.png",
      fallbackIcon: "🎫"
    },
    {
      title: "Entrance & Welcome Sponsor",
      description: "Create a strong first impression with prominent branding at the exhibition entrance, welcome area, selected directional signage and visitor arrival points.",
      points: [
        "Prominent branding at the main exhibition entrance and welcome zone",
        "Logo placement on selected directional signage guiding visitors into the halls",
        "High-impact first-impression visibility for arriving exhibitors, visitors, and guests",
        "Opportunity for branded welcome messaging or digital display at arrival points",
        "Recognition as the Entrance & Welcome Sponsor on selected event materials",
        "Photo-opportunity branding in a high-traffic visitor gathering area",
        "Strong association with the official start of the INDIAMET visitor experience",
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/3_065bb10e11.png",
      fallbackIcon: "🚪"
    },
    {
      title: "Knowledge Session Sponsor",
      description: "Associate your company with technical knowledge and industry learning through session branding, stage visibility, speaker introduction, presentation opportunities and digital promotion.",
      points: [
        "Session-stage branding including backdrop, lectern, or digital screen presence",
        "Opportunity to introduce the session or deliver a short technical presentation",
        "Logo placement on selected session listings, agendas, and digital programme pages",
        "Recognition in speaker communications and selected summit promotions",
        "Association with expert discussions on metrology, inspection, quality, and manufacturing",
        "Lead capture opportunities among engineers, quality managers, and technical buyers",
        "Post-session digital mention across selected INDIAMET communication channels",
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/4_b530561fa3.png",
      fallbackIcon: "🎤"
    },
    {
      title: "Technology Showcase Sponsor",
      description: "Highlight your latest metrology, inspection, measurement and quality technologies through dedicated showcase branding, product demonstrations and digital promotion.",
      points: [
        "Dedicated showcase branding around a live demonstration or featured technology zone",
        "Opportunity to present CMMs, 3D measurement, vision inspection, calibration, or quality solutions",
        "Promotion of your showcase slot through selected website and social media channels",
        "On-site wayfinding or zone branding directing visitors to your demonstration area",
        "Product feature in selected digital communications before and during the show",
        "Direct engagement with engineers, quality professionals, and procurement teams",
        "Ideal for launching new instruments, software, or automation-enabled measurement systems",
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/1_9622597897.png",
      fallbackIcon: "🔬"
    },
    {
      title: "Digital Promotion Partner",
      description: "Extend your INDIAMET Expo presence beyond the exhibition floor with website visibility, social media promotion, product features, email campaigns and digital brochure opportunities.",
      points: [
        "Featured logo and profile on selected pages of the official exhibition website",
        "Sponsored social media posts highlighting your brand, products, or participation",
        "Inclusion in selected pre-show and post-show email campaigns to registered audiences",
        "Product or company feature in the digital brochure or online exhibitor communications",
        "Banner or tile placement in selected digital visitor journeys, subject to inventory",
        "Year-round digital recall beyond the three exhibition days",
        "Measurable reach among manufacturers, metrology specialists, and quality decision-makers",
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/2_af03062734.png",
      fallbackIcon: "📱"
    },
    {
      title: "Official Brochure Sponsor",
      description: "Showcase your brand and products through premium advertising and branding opportunities within the official INDIAMET Expo brochure and its digital version.",
      points: [
        "Premium advertising position in the official printed exhibition brochure",
        "Matching visibility in the digital brochure circulated to registered visitors and exhibitors",
        "Logo acknowledgement as the Official Brochure Sponsor on selected inner pages",
        "Opportunity to feature product imagery, a company profile, or a technical highlight",
        "Longer shelf life as visitors retain and share the brochure during and after the event",
        "Distribution to on-site visitors, exhibitors, speakers, and selected industry partners",
        "Strong branding among a qualified audience planning their exhibition visit",
      ],
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
              <div className="mt-8 space-y-6">
                {sponsorshipTabs.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="group overflow-hidden rounded-sm border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="grid lg:grid-cols-[280px_1fr]">
                      <div className="relative flex min-h-[220px] items-center justify-center bg-[#031A34] p-8 lg:min-h-full">
                        <div className="absolute inset-y-0 left-0 w-1.5 bg-[#F9B122]" />
                        <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-sm bg-white p-5 sm:h-44 sm:w-44">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.title}
                            fallbackIcon={item.fallbackIcon}
                            objectFit="contain"
                            className="h-full w-full"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 p-6 sm:p-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <h4 className="font-bebas text-3xl font-bold tracking-wide text-[#031A34] uppercase sm:text-4xl">
                            {item.title}
                          </h4>
                          <Link href={item.buttonLink} className="shrink-0">
                            <button className="bg-[#F9B122] hover:bg-[#031A34] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                              {item.buttonText}
                            </button>
                          </Link>
                        </div>

                        <p className="text-lg leading-relaxed text-gray-600 sm:text-xl">
                          {item.description}
                        </p>

                        <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-3">
                          {item.points.map((point) => (
                            <li key={point} className="flex gap-3 text-left text-lg leading-relaxed text-gray-700 sm:text-xl">
                              <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#F9B122]" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
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