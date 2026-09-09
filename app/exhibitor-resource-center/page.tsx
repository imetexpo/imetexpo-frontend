// app/exhibitor-resource-center/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PartnersSection from "@/components/home/PartnersSection";
import BackToTop from "@/components/layout/BackToTop";
import Container from "@/components/ui/container";

export default function ExhibitorResourceCenterPage() {
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-100 grid place-content-center bg-[#03193D]">
        <div className="flex size-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-500 text-4xl">
          <div className="flex size-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-300 text-2xl"></div>
        </div>
      </div>
    );
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const benefits = [
  {
    title: "Generate New Business Leads",
    description:
      "Connect with qualified buyers, OEMs, engineers, quality professionals, and decision-makers actively looking for metrology, measurement, inspection, calibration, and quality solutions.",
    icon: "https://cdn.itegroupnews.com/staff_management_1_e3b60c1db6.png",
    fallbackIcon: "🎯",
  },
  {
    title: "Strengthen Customer Relationships",
    description:
      "Meet existing customers face-to-face, understand their evolving requirements, demonstrate new solutions, and strengthen long-term business relationships.",
    icon: "https://cdn.itegroupnews.com/partnership_41fd66a951.png",
    fallbackIcon: "🤝",
  },
  {
    title: "Conduct Business Meetings",
    description:
      "Create dedicated meeting areas for technical discussions, product consultations, negotiations, project requirements, and focused business conversations with key decision-makers.",
    icon: "https://cdn.itegroupnews.com/meeting_3e0de9e870.png",
    fallbackIcon: "📊",
  },
  {
    title: "Build Brand Visibility",
    description:
      "Stand out at INDIAMET with a strong exhibition presence, impactful branding, live demonstrations, and professional product displays that strengthen your position in the precision manufacturing market.",
    icon: "https://cdn.itegroupnews.com/branding_c56168b0cb.png",
    fallbackIcon: "🏷️",
  },
  {
    title: "Study Market & Competitors",
    description:
      "Gain valuable insights into market trends, competing technologies, customer expectations, and emerging opportunities across India's metrology, measurement, inspection, and quality ecosystem.",
    icon: "https://cdn.itegroupnews.com/research_5ebaa8133d.png",
    fallbackIcon: "🔍",
  },
  {
    title: "Launch New Technologies",
    description:
      "Use INDIAMET as a powerful platform to introduce new products, technologies, equipment, and solutions through live demonstrations and direct engagement with prospective customers.",
    icon: "https://cdn.itegroupnews.com/product_release_d7b5bbb99c.png",
    fallbackIcon: "🚀",
  },
];

const standOptions = [
  {
    title: "Custom-Built Exhibition Stand",
    description:
      "Create a distinctive exhibition presence tailored to your brand and business objectives. Custom-built stands allow you to integrate product displays, live demonstrations, meeting areas, branding, and interactive experiences to attract and engage high-value visitors.",
    image: "https://cdn.itegroupnews.com/1_b17f63c840.png",
    fallbackIcon: "🏗️",
  },
  {
    title: "Standard Shell Scheme",
    description:
      "A professional and cost-effective stand solution for companies looking for a ready-to-use exhibition space. Enhance your stand with company branding, graphics, product displays, furniture, lighting, and other essential exhibition accessories.",
    image: "https://cdn.itegroupnews.com/2_f175606c2f.png",
    fallbackIcon: "📦",
  },
  {
    title: "Premium Exhibition Stand",
    description:
      "Make a stronger impact with a premium exhibition stand designed for enhanced visibility and visitor engagement. Combine upgraded branding, professional interiors, product showcases, meeting spaces, lighting, and display features to create a high-quality brand experience.",
    image: "https://cdn.itegroupnews.com/3_7b7bc3dca6.png",
    fallbackIcon: "⭐",
  },
];

const faqItems = [
  {
    question: "How can I transport my products and equipment to INDIAMET 2027?",
    answer:
      "Exhibitors can arrange transportation and logistics for machinery, equipment, displays, stand materials, marketing materials, and other exhibition cargo through the appointed exhibition logistics and freight-handling service providers. Detailed shipping, handling, delivery, and move-in instructions will be provided to registered exhibitors before the exhibition.",
  },
  {
    question: "How can I promote my participation at INDIAMET 2027?",
    answer:
      "Exhibitors can maximise their participation through INDIAMET's promotional and branding opportunities. Use your exhibitor profile, digital promotions, product announcements, social media campaigns, invitations, and exhibition marketing opportunities to increase visibility before and during the show.",
  },
  {
    question: "How can exhibitors order technical services?",
    answer:
      "Exhibitors can order additional technical and exhibition services through the official exhibitor service process. Services may include additional electrical requirements, furniture, lighting, internet connectivity, branding, rigging, water, compressed air, machinery handling, and other requirements. Detailed service information and order forms will be shared with exhibitors before the exhibition.",
  },
  {
    question: "Can exhibitors arrange live demonstrations of machinery and equipment?",
    answer:
      "Yes. Live demonstrations are encouraged where technically and safely feasible. Exhibitors planning machinery demonstrations, heavy equipment displays, electrical installations, compressed air, special power requirements, or other technical installations should coordinate their requirements with the exhibition technical team in advance.",
  },
];

  const ImageWithFallback = ({
    src,
    alt,
    fallbackIcon,
    className = "",
    objectFit = "cover"
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
          <span className="text-4xl">{fallbackIcon || "🏨"}</span>
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

        {/* Explore Opportunities Section */}
        <Container className="py-10">
          <div className="animated-block">
            <div className="animated-block-target">
              <div className="w-full grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
                {/* RIGHT IMAGE */}
                <div className="order-1 lg:order-2 h-[350px] sm:h-[450px] lg:h-[550px] w-full overflow-hidden rounded-sm border border-gray-100 bg-[#FCF8F3]">
                  <ImageWithFallback
                    src="https://cdn.itegroupnews.com/exhibition_2020_20_9dec3a8c6e.webp"
                    alt="INDIAMET Expo"
                    fallbackIcon="🏢"
                    className="h-full w-full"
                  />
                </div>
                {/* LEFT CONTENT */}
                <div className="order-2 lg:order-1 space-y-6">
                  <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-tight text-[#03193D] uppercase">
                    Explore <span className="text-[#CC9808]">Opportunities</span>
                  </h1>
                  <p className="text-base sm:text-lg leading-relaxed text-gray-700 font-sans">
                    As a participant at INDIAMET Expo, our team is dedicated to providing you with a variety of participation opportunities to make the most of your exhibition experience. From pre-event to post, we have created guides to help with the decision-making process and onboarding in a seamless manner.
                  </p>
                  <div className="pt-2">
                    <Link href="https://cdn-ite.prismetic.com/02_Manual_Forms_Mining_World_Russia_2026_EUR_0ddf1ecf29.pdf" target="_blank">
                      <button className="bg-[#CC9808] hover:bg-[#03193D] text-white px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                        Download Guide
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Stands for Business Objectives Section */}
        <Container className="py-10">
          <div className="animated-block mt-8 sm:mt-12 lg:mt-16">
            <div className="animated-block-target">
              <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-[#03193D] uppercase">
                Stands for your <span className="text-[#CC9808]">Business Objectives</span>
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="relative flex flex-col overflow-hidden rounded-sm border border-gray-100 bg-[#FCF8F3] p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden bg-white p-3 rounded-sm border border-gray-150">
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

        {/* Explore Stand Options Section */}
        <Container className="py-10">
          <div className="animated-block mt-8 sm:mt-12 lg:mt-16">
            <div className="animated-block-target">
              <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-[#03193D] uppercase">
                Explore Our <span className="text-[#CC9808]">Stand Options</span>
              </h2>
              <p className="mt-2 text-sm font-bold text-[#CC9808] uppercase tracking-wider">Selection Made Simple</p>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {standOptions.map((option, idx) => (
                  <div key={idx} className="group flex flex-col justify-between overflow-hidden rounded-sm border border-gray-100 bg-[#FCF8F3] shadow-sm hover:shadow-md transition-all duration-300">
                    <div>
                      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-white border-b border-gray-100 p-4">
                        <ImageWithFallback
                          src={option.image}
                          alt={option.title}
                          fallbackIcon={option.fallbackIcon}
                          objectFit="contain"
                          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col gap-3 p-5">
                        <h4 className="font-bebas text-2xl sm:text-3xl text-[#03193D] uppercase font-bold">{option.title}</h4>
                        <p className="text-sm text-gray-650 leading-relaxed line-clamp-4">{option.description}</p>
                      </div>
                    </div>
                    <div className="p-5 pt-0 mt-auto">
                      <Link href="/exhibiting-enquiry">
                        <button className="bg-[#CC9808] hover:bg-[#03193D] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                          Enquire Now
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>

        {/* Exhibition Guide FAQ Section */}
        <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
          <div className="animated-block-target">
            <div className="bg-[#FCF8F3] py-16 border-t border-b border-gray-150">
              <Container>
                <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-[#03193D] uppercase">
                  Exhibition <span className="text-[#CC9808]">Guide</span>
                </h2>
                <div className="mt-8 space-y-4">
                  {faqItems.map((item, idx) => (
                    <div key={idx} className="rounded-sm border border-gray-100 bg-white overflow-hidden shadow-sm">
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="flex w-full items-center justify-between p-4 sm:p-5 text-left transition-all hover:bg-gray-50 cursor-pointer"
                      >
                        <h4 className="text-base sm:text-lg md:text-xl font-bold text-[#03193D] pr-4 uppercase font-sans">
                          {item.question}
                        </h4>
                        <div className="relative shrink-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`size-5 transition-transform duration-200 ${openFaqIndex === idx ? "rotate-45" : ""}`}
                          >
                            <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="#CC9808" fillRule="evenodd" clipRule="evenodd"></path>
                          </svg>
                        </div>
                      </button>
                      {openFaqIndex === idx && (
                        <div className="px-4 sm:px-5 pb-5 pt-2 text-sm text-gray-750 leading-relaxed whitespace-pre-line border-t border-gray-100 font-sans">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20">
          <PartnersSection />
        </div>
      </div>
      <BackToTop />

      <style jsx>{`
        .font-bebas { font-family: 'Bebas Neue', cursive; }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
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
        .animated-block:nth-child(2) { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}