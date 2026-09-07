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
      title: "Find New Prospects",
      description: "It should be easy to read the company's direction and name. Important details that you want to communicate to potential clients should be obvious and easy to remember.",
      icon: "https://cdn.itegroupnews.com/staff_management_1_e3b60c1db6.png",
      fallbackIcon: "🎯"
    },
    {
      title: "Improve Existing Relationships",
      description: "You need a spacious recreational area, negotiation tables, an enclosed utility room where you will display your products, and interactive demo areas to engage visitors effectively.",
      icon: "https://cdn.itegroupnews.com/partnership_41fd66a951.png",
      fallbackIcon: "🤝"
    },
    {
      title: "Conduct Meetings",
      description: "Your stand should have an ideal meeting area. You can separate one 'meeting room' from another or plan a couple of closed rooms where the exhibition atmosphere will not distract from the business conversation.",
      icon: "https://cdn.itegroupnews.com/meeting_3e0de9e870.png",
      fallbackIcon: "📊"
    },
    {
      title: "Increase Brand Identity",
      description: "In this case, an interesting stand design solution, supported by a high-quality demonstration of the best products will help.",
      icon: "https://cdn.itegroupnews.com/branding_c56168b0cb.png",
      fallbackIcon: "🏷️"
    },
    {
      title: "Competitor Research",
      description: "A small stand is enough, but it is worth placing it next to the business program sites to be in the thick of industry events.",
      icon: "https://cdn.itegroupnews.com/research_5ebaa8133d.png",
      fallbackIcon: "🔍"
    },
    {
      title: "Showcase New Launches",
      description: "An interesting and bright design solution, perhaps navigation in the hall, will help. The invitation and presentation schedule should be large, informative, and located in the most visible place.",
      icon: "https://cdn.itegroupnews.com/product_release_d7b5bbb99c.png",
      fallbackIcon: "🚀"
    }
  ];

  const standOptions = [
    {
      title: "Individual Construction",
      description: "Choosing an individual project stand is highly recommended as it allows for an effective presentation of your company, highlights your high status, emphasizes your unique style, and attracts more clients.",
      image: "https://cdn.itegroupnews.com/1_b17f63c840.png",
      fallbackIcon: "🏗️"
    },
    {
      title: "Standard Shell Scheme",
      description: "Standard Shell Scheme is suitable for the construction of the exhibition area from 11 to 60 sq. m. The stand kit depends on the construction area. Standard Shell Scheme may be amended with standard decorative elements.",
      image: "https://cdn.itegroupnews.com/2_f175606c2f.png",
      fallbackIcon: "📦"
    },
    {
      title: "Premium Shell Scheme",
      description: "Premium Shell Scheme is suitable for the construction of the exhibition area from 12 to 60 sq. m. You can choose the color of decorative elements, and order additional equipment and furniture. The height of structures from 3.5 m to 5 m will make the stands look more voluminous and spacious.",
      image: "https://cdn.itegroupnews.com/3_7b7bc3dca6.png",
      fallbackIcon: "⭐"
    }
  ];

  const faqItems = [
    {
      question: "How to get your products/equipments to Bangkok on time?",
      answer: "ITS Tyre Expo partners with DMW EXPO to handle all freight handling requests from exhibitors. We recommend DMW EXPO for shipment of any products, stand equipment, marketing materials, machinery, and/or displays you plan to send for your stand.\n\nFor any enquiries, contact:\nMarina Filippova\nHead of Exhibition Department\nP: +66-2-123-4567\nE: marina.filippova@dmw-expo.com"
    },
    {
      question: "How can you spread the word about your ITS Tyre Expo participation?",
      answer: "Make the most of your time at the exhibition by leveraging ITS Tyre Expo's partnership and exclusive advertising opportunities to boost your impact and visibility."
    },
    {
      question: "How can exhibitors order technical services?",
      answer: "Exhibitors can conveniently order construction and technical services via the Technical Services Order Forms. Simply download the form, select the required services, sign, and send the scanned document to your technical manager. For any questions or assistance, please contact your technical manager using the details provided below."
    },
    {
      question: "How can you order suspended structures for ceiling installations?",
      answer: "For any enquiries regarding the ordering of suspended structures, please reach out to your technical manager using the contact details provided below."
    }
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
      <div className="page-spacing-wrapper pt-[120px] lg:pt-[140px]">

        {/* Explore Opportunities Section */}
        <Container className="py-10">
          <div className="animated-block">
            <div className="animated-block-target">
              <div className="w-full grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
                {/* RIGHT IMAGE */}
                <div className="order-1 lg:order-2 h-[350px] sm:h-[450px] lg:h-[550px] w-full overflow-hidden rounded-sm border border-gray-100 bg-[#FCF8F3]">
                  <ImageWithFallback
                    src="https://cdn.itegroupnews.com/exhibition_2020_20_9dec3a8c6e.webp"
                    alt="ITS Tyre Expo"
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
                    As a participant at ITS Tyre Expo, our team is dedicated to providing you with a variety of participation opportunities to make the most of your exhibition experience. From pre-event to post, we have created guides to help with the decision-making process and onboarding in a seamless manner.
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