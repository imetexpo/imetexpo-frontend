'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PartnersSection from '@/components/home/PartnersSection';
import BackToTop from '@/components/layout/BackToTop';
import Container from '@/components/ui/container';
import PageHero from '@/components/layout/PageHero';

export type ResourceBenefit = {
  title: string;
  description: string;
  icon: string;
  fallbackIcon: string;
};

export type ResourceOption = {
  title: string;
  description: string;
  image: string;
  fallbackIcon: string;
  buttonText?: string;
  buttonLink?: string;
};

export type ResourceFaq = {
  question: string;
  answer: string;
};

export type ResourceGuidePageProps = {
  heroTitle: string;
  heroAccent: string;
  heroSubtitle: string;
  introTitle: string;
  introAccent: string;
  introBody: string;
  introCtaText: string;
  introCtaHref: string;
  introImage: string;
  introImageAlt: string;
  benefitsHeading: string;
  benefitsAccent: string;
  benefits: ResourceBenefit[];
  optionsHeading: string;
  optionsAccent: string;
  optionsSubheading: string;
  options: ResourceOption[];
  faqHeading: string;
  faqAccent: string;
  faqs: ResourceFaq[];
};

function ImageWithFallback({
  src,
  alt,
  fallbackIcon,
  className = '',
  objectFit = 'cover',
}: {
  src: string;
  alt: string;
  fallbackIcon?: string;
  className?: string;
  objectFit?: 'cover' | 'contain';
}) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 ${className}`}
      >
        <span className="text-4xl">{fallbackIcon || '🏨'}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`h-full w-full ${objectFit === 'contain' ? 'object-contain' : 'object-cover'} ${className}`}
      onError={() => setError(true)}
    />
  );
}

export default function ResourceGuidePage({
  heroTitle,
  heroAccent,
  heroSubtitle,
  introTitle,
  introAccent,
  introBody,
  introCtaText,
  introCtaHref,
  introImage,
  introImageAlt,
  benefitsHeading,
  benefitsAccent,
  benefits,
  optionsHeading,
  optionsAccent,
  optionsSubheading,
  options,
  faqHeading,
  faqAccent,
  faqs,
}: ResourceGuidePageProps) {
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-100 grid place-content-center bg-[#031A34]">
        <div className="flex size-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-500 text-4xl">
          <div className="flex size-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-300 text-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="intro-animation font-sans">
      <div className="page-spacing-wrapper lg:pt-0">
        <PageHero title={heroTitle} accent={heroAccent} subtitle={heroSubtitle} />

        <Container className="py-10">
          <div className="animated-block">
            <div className="animated-block-target">
              <div className="grid w-full items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
                <div className="order-1 h-[350px] w-full overflow-hidden rounded-sm border border-gray-100 bg-[#FCF8F3] sm:h-[450px] lg:order-2 lg:h-[550px]">
                  <ImageWithFallback
                    src={introImage}
                    alt={introImageAlt}
                    fallbackIcon="🏢"
                    className="h-full w-full"
                  />
                </div>
                <div className="order-2 space-y-6 lg:order-1">
                  <h1 className="font-bebas text-5xl uppercase leading-tight text-[#031A34] sm:text-6xl md:text-7xl">
                    {introTitle} <span className="text-[#F9B122]">{introAccent}</span>
                  </h1>
                  <p className="font-sans text-lg leading-relaxed text-gray-700 sm:text-xl">{introBody}</p>
                  <div className="pt-2">
                    <Link href={introCtaHref} target={introCtaHref.startsWith('http') ? '_blank' : undefined}>
                      <button className="rounded-sm bg-[#F9B122] px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#031A34]">
                        {introCtaText}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Container className="py-10">
          <div className="animated-block mt-8 sm:mt-12 lg:mt-16">
            <div className="animated-block-target">
              <h2 className="font-bebas text-4xl uppercase text-[#031A34] sm:text-5xl md:text-6xl">
                {benefitsHeading} <span className="text-[#F9B122]">{benefitsAccent}</span>
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="relative flex flex-col overflow-hidden rounded-sm border border-gray-100 bg-[#FCF8F3] p-6 shadow-sm transition-all duration-300 hover:shadow-md"
                  >
                    <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-sm border border-gray-150 bg-white p-3">
                      <ImageWithFallback
                        src={benefit.icon}
                        alt={benefit.title}
                        fallbackIcon={benefit.fallbackIcon}
                        objectFit="contain"
                        className="h-full w-full"
                      />
                    </div>
                    <h3 className="mt-5 font-bebas text-2xl font-bold uppercase text-[#F9B122]">{benefit.title}</h3>
                    <p className="mt-3 text-lg leading-relaxed text-gray-650 sm:text-xl">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>

        <Container className="py-10">
          <div className="animated-block mt-8 sm:mt-12 lg:mt-16">
            <div className="animated-block-target">
              <h2 className="font-bebas text-4xl uppercase text-[#031A34] sm:text-5xl md:text-6xl">
                {optionsHeading} <span className="text-[#F9B122]">{optionsAccent}</span>
              </h2>
              <p className="mt-2 text-sm font-bold uppercase tracking-wider text-[#F9B122]">{optionsSubheading}</p>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {options.map((option) => (
                  <div
                    key={option.title}
                    className="group flex flex-col justify-between overflow-hidden rounded-sm border border-gray-100 bg-[#FCF8F3] shadow-sm transition-all duration-300 hover:shadow-md"
                  >
                    <div>
                      <div className="relative h-48 w-full overflow-hidden border-b border-gray-100 bg-white p-4 sm:h-56">
                        <ImageWithFallback
                          src={option.image}
                          alt={option.title}
                          fallbackIcon={option.fallbackIcon}
                          objectFit="cover"
                          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col gap-3 p-5">
                        <h4 className="font-bebas text-2xl font-bold uppercase text-[#031A34] sm:text-3xl">
                          {option.title}
                        </h4>
                        <p className="line-clamp-4 text-lg leading-relaxed text-gray-650 sm:text-xl">
                          {option.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto p-5 pt-0">
                      <Link href={option.buttonLink || '/contact-us'}>
                        <button className="rounded-sm bg-[#F9B122] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#031A34]">
                          {option.buttonText || 'Enquire Now'}
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>

        <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
          <div className="animated-block-target">
            <div className="border-t border-b border-gray-150 bg-[#FCF8F3] py-16">
              <Container>
                <h2 className="font-bebas text-4xl uppercase text-[#031A34] sm:text-5xl md:text-6xl">
                  {faqHeading} <span className="text-[#F9B122]">{faqAccent}</span>
                </h2>
                <div className="mt-8 space-y-4">
                  {faqs.map((item, idx) => (
                    <div key={item.question} className="overflow-hidden rounded-sm border border-gray-100 bg-white shadow-sm">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                        className="flex w-full cursor-pointer items-center justify-between p-4 text-left transition-all hover:bg-gray-50 sm:p-5"
                      >
                        <h4 className="pr-4 font-sans text-base font-bold uppercase text-[#031A34] sm:text-lg md:text-xl">
                          {item.question}
                        </h4>
                        <div className="relative shrink-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`size-5 transition-transform duration-200 ${openFaqIndex === idx ? 'rotate-45' : ''}`}
                          >
                            <path
                              d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                              fill="#F9B122"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </button>
                      {openFaqIndex === idx && (
                        <div className="whitespace-pre-line border-t border-gray-100 px-4 pb-5 pt-2 font-sans text-lg leading-relaxed text-gray-750 sm:px-5 sm:text-xl">
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
        .font-bebas {
          font-family: 'Bebas Neue', cursive;
        }
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
        .animated-block:nth-child(1) {
          animation-delay: 0.1s;
        }
        .animated-block:nth-child(2) {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}
