"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/ui/container";
import BackToTop from "@/components/layout/BackToTop";
import PartnersSection from "@/components/home/PartnersSection";
import { Toaster } from "react-hot-toast";

import RegistrationTabs from "./RegistrationTabs";
import {
  RegistrationTab,
  TAB_QUERY_PARAM,
  REGISTRATION_HERO,
  isValidRegistrationTab,
} from "./registrationRoutes";

import EnquiryForm from "./forms/EnquiryForm";
import ExhibitorForm from "./forms/ExhibitorForm";
import SponsorForm from "./forms/SponsorForm";
import BrochureForm from "./forms/BrochureForm";

import EnquiryContent from "./content/EnquiryContent";
import ExhibitorContent from "./content/ExhibitorContent";
import SponsorContent from "./content/SponsorContent";
import BrochureContent from "./content/BrochureContent";

function RegisterPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawTab = searchParams.get(TAB_QUERY_PARAM);
  const activeTab: RegistrationTab = isValidRegistrationTab(rawTab) ? rawTab : "enquiry";

  const handleTabChange = (tab: RegistrationTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(TAB_QUERY_PARAM, tab);
    router.push(`/register?${params.toString()}`, { scroll: false });
  };

  const hero = REGISTRATION_HERO[activeTab];

  const renderContent = () => {
    switch (activeTab) {
      case "enquiry":
        return <EnquiryContent />;
      case "exhibitor":
        return <ExhibitorContent />;
      case "sponsor":
        return <SponsorContent />;
      case "brochure":
        return <BrochureContent />;
      default:
        return <EnquiryContent />;
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case "enquiry":
        return <EnquiryForm />;
      case "exhibitor":
        return <ExhibitorForm />;
      case "sponsor":
        return <SponsorForm />;
      case "brochure":
        return <BrochureForm />;
      default:
        return <EnquiryForm />;
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <section className="bg-white pt-[120px] lg:pt-[140px] pb-20">
        <Container>
          {/* Header */}
          <div className="text-center mb-10">
            <br /><br />
            <p className="text-[#CC9808] font-sans text-[14px] font-semibold uppercase tracking-[1.5px]">
              ITS Tyre Expo 2026
            </p>
            <h1 className="font-bebas font-bold text-[38px] lg:text-[48px] leading-[1.15] tracking-[1px] uppercase text-[#03193D] mt-2">
              {hero.title}
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto mt-4">{hero.subtitle}</p>
          </div>

          {/* Tab Navigation */}
          <div className="max-w-3xl mx-auto mb-12">
            <RegistrationTabs activeTab={activeTab} onTabChange={handleTabChange} />
          </div>

          {/* Content + Form pair for active tab */}
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12">
            <div className="lg:sticky lg:top-44 h-fit">{renderContent()}</div>

            <div className="bg-[#f5f5f5] rounded-2xl p-4 md:p-6">{renderForm()}</div>
          </div>
        </Container>
      </section>

      <PartnersSection />
      <BackToTop />
    </>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterPageContent />
    </Suspense>
  );
}