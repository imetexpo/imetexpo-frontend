"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/ui/container";
import BackToTop from "@/components/layout/BackToTop";
import PageHero from "@/components/layout/PageHero";
import PartnersSection from "@/components/home/PartnersSection";
import { Toaster } from "react-hot-toast";

import RegistrationTabs from "./RegistrationTabs";
import {
  RegistrationTab,
  TAB_QUERY_PARAM,
  REGISTRATION_HERO,
  normalizeRegistrationTab,
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
  const searchParams = useSearchParams();
  const activeTab: RegistrationTab =
    normalizeRegistrationTab(searchParams.get(TAB_QUERY_PARAM)) ?? "enquiry";

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

      <PageHero title={hero.title} accent={hero.accent} subtitle={hero.subtitle} />

      <section className="bg-white pt-0 lg:pt-0 pb-20">
        <Container>
          {/* Tab Navigation */}
          <div className="max-w-3xl mx-auto mb-12 mt-10">
            <RegistrationTabs activeTab={activeTab} />
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