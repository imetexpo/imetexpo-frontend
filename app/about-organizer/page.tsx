// app/about-ite/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PartnersSection from "@/components/home/PartnersSection";
import OurExhibitionsSection from "@/components/about/OurExhibitionsSection";
import BackToTop from "@/components/layout/BackToTop";
import Container from "@/components/ui/container";
import PageHero from "@/components/layout/PageHero";

export default function AboutITEPage() {
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

  const stats = [
    { value: "1 Mil+", label: "Database" },
    { value: "10,000+", label: "Visitors Per Year" },
    { value: "500+", label: "Exhibitors Per Year" },
    { value: "1,700+", label: "Media in Attendance" },
    { value: "10", label: "Events" },
    { value: "20+", label: "Industry Sectors" }
  ];

  const missionVisionValues = [
    {
      title: "The Mission",
      content: "To create unique and valuable events for the success of your business and the development of industries and economies.",
      image: "/images/mission.jpg"
    },
    {
      title: "The Vision",
      content: "Connecting businesses year-round, both online and in person, allowing professionals to establish long-term business partnerships.",
      image: "/images/vision.jpg"
    },
    {
      title: "Our Values",
      content: "Entrepreneurship, Integrity, Excellence, Positive Thinking, Commitment to Result",
      image: "/images/values.jpg"
    }
  ];

  return (
    <div className="intro-animation">
      <div className="page-spacing-wrapper">
        <div className="lg:pt-0">
          <PageHero
            title="ABOUT THE"
            accent="ORGANIZER"
            subtitle="Maxx Business Media creates high-impact exhibitions, conferences, and industry platforms that connect manufacturers, innovators, and decision-makers."
          />

          {/* About Us Section */}
          <div className="animated-block">
            <div className="animated-block-target">
              <Container className="py-12 sm:py-16">
                <div className="flex flex-col gap-4 sm:gap-5">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#031A34]">About </h2>
                    <Image
                      src="/images/maxx_logo.png"
                      alt="Maxx Business Media"
                      width={280}
                      height={80}
                      className="h-24 w-auto object-contain sm:h-32 md:h-40 lg:h-48"
                    />
                  </div>
                  <p className="text-lg sm:text-xl text-gray-700">
                      Maxx Business Media Pvt. Ltd. is a leading B2B business events and media company based in India, dedicated to creating powerful platforms that connect industries, innovators, and decision-makers. Since its inception, Maxx Business Media has been organizing high-impact trade exhibitions, conferences, and industry-focused initiatives across key manufacturing and emerging sectors.
                      <br /><br />
                      Every year, we deliver multiple flagship exhibitions, summits, and industry forums that serve as catalysts for business growth, technology exchange, and market expansion. Supported by our integrated digital and media ecosystem, we offer year-round visibility and engagement opportunities for exhibitors, advertisers, and industry partners.
                     <br /><br />
                       With a strong network of international agents, industry associations, government bodies, and strategic partners, Maxx Business Media facilitates meaningful global–local connections, enabling companies to access new markets, buyers, and collaborations across India and overseas.
                      <br /><br />
                      Our events drive industrial development, support export growth, and provide unmatched access to targeted business audiences. By combining exhibitions, conferences, awards, digital platforms, and trade publications, we create comprehensive solutions for networking, branding, and professional advancement—while fostering constructive dialogue between industry stakeholders and policymakers. Maxx Business Media operates with a pan-India presence and an expanding international footprint, serving as a trusted partner to industries seeking sustainable growth and global relevance.
                    </p>
                </div>

                  {/* Stats Section */}
                  <div className="mt-10 sm:mt-12 lg:mt-16 flex flex-wrap justify-start gap-y-8 sm:gap-y-12 border-t border-gray-200 pt-8 sm:pt-10">
                    {stats.map((stat, idx) => (
                      <div key={idx} className="flex w-1/2 sm:w-1/3 md:w-1/4 items-start justify-start">
                        <div className="px-4 sm:px-6 md:px-8 text-start">
                          <h3 className="font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F9B122]">
                            {stat.value}
                          </h3>
                          <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-semibold uppercase text-[#031A34]">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
              </Container>
            </div>
          </div>

          {/* Mission, Vision, Values Section */}
          <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
            <div className="animated-block-target">
              <Container>
                <div className="mb-6 sm:mb-8 flex flex-col lg:flex-row justify-between lg:items-end gap-4">
                  <div className="lg:basis-2/3">
                    <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#031A34]">Working for Your Success</h3>
                    <p className="mt-3 text-lg sm:text-xl text-gray-700">
                      At Maxx Business Media Pvt Ltd, we create impactful exhibitions, conferences, trade publications, and digital platforms that connect industries, businesses, technology providers, and professionals. Our industry-focused platforms help businesses showcase innovation, build valuable relationships, discover new opportunities, and drive sustainable business growth.
                    </p>
                  </div>
                </div>
                <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {missionVisionValues.map((item, idx) => (
                    <div key={idx} className="group flex flex-col overflow-hidden rounded-sm bg-[#FCF8F3] border border-gray-100 transition-shadow duration-300 ease-in-out hover:shadow-lg">
                      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-200 rounded-t-sm">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-5 font-sans">
                        <h4 className="text-lg sm:text-xl font-bold text-[#031A34]">{item.title}</h4>
                        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          </div>

          <OurExhibitionsSection />

          {/* Partners Section */}
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <PartnersSection />
          </div>

        </div>
        <BackToTop />
      </div>

      <style jsx>{`
        .global-transition {
          transition: all 0.3s ease;
        }
        .flex-center {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .font-bebas {
          font-family: 'Bebas Neue', cursive;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}