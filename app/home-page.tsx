// app/page.tsx
'use client';

import { useState, useEffect } from 'react';

import BackToTop from '@/components/layout/BackToTop';
import LoadingSpinner from '@/components/ui/loadingSpinner';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import CountriesSection from '@/components/home/CountriesSection';
import MeasurementTechnologySection from '@/components/home/MeasurementTechnologySection';
import WhyVisitHomeSection from '@/components/home/WhyVisitHomeSection';
import OutcomesSection from '@/components/home/OutcomesSection';
import WhyExhibitSection from '@/components/home/WhyExhibitSection';
import SectorsSection from '@/components/home/SectorsSection';
import WhoShouldAttendSection from '@/components/home/WhoShouldAttendSection';
import BrochureSection from '@/components/home/BrochureSection';
import ArticlesSection from '@/components/home/ArticlesSection';
import BePartOfIndiaMetSection from '@/components/home/BePartOfIndiaMetSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import PartnersSection from '@/components/home/PartnersSection';
import { getLatestArticles } from '@/app/articles/data'; // Import from your data.ts


// Sample data - replace with actual data from API
const countriesData = [
  { name: 'India', flag: '/images/in.webp' },
  { name: 'Germany', flag: '/images/de.webp' },
  { name: 'China', flag: '/images/cn.webp' },
  { name: 'Japan', flag: '/images/jp.webp' },
  { name: 'USA', flag: '/images/us.webp' },
  { name: 'South Korea', flag: '/images/kr.webp' },
  { name: 'Thailand', flag: '/images/th.webp' },
  { name: 'Vietnam', flag: '/images/vn.webp' },
];



const outcomesData = [
  {
    title: 'GENERATE NEW LEADS',
    content: 'Meet manufacturers, quality professionals, engineers, procurement teams, and decision-makers actively looking for advanced measurement, inspection, calibration, and quality solutions.',
    image: '/images/generate.webp',
  },
  {
    title: 'STRENGTHEN YOUR BRAND',
    content: 'Position your company alongside leading global and Indian metrology brands and increase visibility among key players across automotive, aerospace, engineering, defence, electronics, medical devices, and other precision industries.',
    image: '/images/strength.webp',
  },
  {
    title: 'BUILD STRONG RELATIONSHIPS',
    content: 'Engage directly with existing customers, develop new partnerships, explore emerging markets, and create opportunities for long-term business growth.',
    image: '/images/build.webp',
  },
];

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Use your existing data.ts - get the 3 latest articles
  const articlesData = getLatestArticles(3);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {/* <Header /> */}
      <main className="intro-animation">
        <HeroSection />
        <AboutSection />
        <CountriesSection countries={countriesData} />
        <MeasurementTechnologySection />
        <OutcomesSection outcomes={outcomesData} />
        <WhyVisitHomeSection />
        <WhyExhibitSection />
        <SectorsSection />
        <WhoShouldAttendSection />
        <BrochureSection />
        <ArticlesSection articles={articlesData} />
        <BePartOfIndiaMetSection />
        <PartnersSection />
      </main>
      {/* <Footer /> */}
      <BackToTop />
    </>
  );
}