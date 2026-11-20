// app/sectors/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getSectorBySlug, getAllSectorSlugs } from "@/data/sectors";
import PartnersSection from "@/components/home/PartnersSection";
import BackToTop from "@/components/layout/BackToTop";
import Container from "@/components/ui/container";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSectorSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);

  if (!sector) {
    return {
      title: "Sector Not Found | IndiaMET Expo 2027",
      description: "The requested sector could not be found.",
    };
  }

  const title = `${sector.title} | IndiaMET Expo 2027`;
  const description = sector.shortText || sector.description;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.indiametexpo.com/sectors/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.indiametexpo.com/sectors/${slug}`,
      siteName: "IndiaMET Expo",
      images: [
        {
          url: sector.image.startsWith("http")
            ? sector.image
            : `https://www.indiametexpo.com${sector.image}`,
          alt: sector.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        sector.image.startsWith("http")
          ? sector.image
          : `https://www.indiametexpo.com${sector.image}`,
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function SectorPage({ params }: PageProps) {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);

  if (!sector) {
    notFound();
  }

  const quickGuideItems = [
    {
      title: "Become an Exhibitor",
      description: "Connect with 10,000+ metrology industry professionals across 3 days for unparalleled networking opportunities.",
      buttonText: "Book A Stand",
      buttonLink: "/exhibiting-enquiry",
      image: "/images/mw24_1062_min_91b90d653f.webp"
    },
    {
      title: "Download Your Event Brochure",
      description: "Not ready to become an exhibitor? Visit the exhibition for free and find out what to expect for the following edition.",
      buttonText: "Download Now",
      buttonLink: "/event-brochure",
      image: "/images/Untitled_500_x_500_px_cd8f081eec.webp"
    },
    {
      title: "Become a Visitor",
      description: "Find out who we are, what we do, and how best we can help you achieve your strategic business goals all wrapped up in our concise event brochure.",
      buttonText: "Register Now",
      buttonLink: "/passes",
      image: "/images/mw24_1077_min_75a8122d24.webp"
    }
  ];

  return (
    <div className="intro-animation">
      {/* Main Content */}
      <div className="page-spacing-wrapper lg:pt-0">
        {/* Hero Section */}
        <div className="animated-block">
          <div className="animated-block-target">
            <Container>
              <div className="space-y-5 py-10">
                <h1 className="font-bebas text-5xl text-[#003A77] md:text-6xl lg:text-7xl uppercase">
                  {sector.title}
                </h1>
                <div className="relative h-[300px] w-full overflow-hidden rounded-sm md:h-[400px] lg:h-[500px] border border-gray-100">
                  <Image
                    src={sector.image}
                    alt={sector.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <p className="text-lg leading-relaxed text-gray-750 lg:text-xl font-sans mt-6">
                  {sector.content || sector.description}
                </p>
                {sector.buttonText && (
                  <div className="pt-4">
                    <Link href={sector.buttonLink || "/exhibiting-enquiry"}>
                      <button className="bg-[#00A1B1] hover:bg-[#003A77] text-white px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                        {sector.buttonText}
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </Container>
          </div>
        </div>

        {/* Sub-Sectors Section */}
        {sector.subSectors && sector.subSectors.length > 0 && (
          <div className="animated-block mt-12">
            <div className="animated-block-target">
              <Container>
                <h2 className="mb-8 font-bebas text-4xl text-[#003A77] md:text-5xl uppercase">
                  Sub-Sectors Within <span className="text-[#00A1B1]">{sector.title}</span>
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {sector.subSectors.map((sub, idx) => (
                    <div key={idx} className="rounded-sm border border-gray-100 bg-[#FCF8F3] p-6 shadow-sm transition-all hover:shadow-md">
                      <h3 className="mb-3 font-bebas text-2xl text-[#00A1B1] uppercase font-bold">
                        {sub.title}
                      </h3>
                      <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                        {sub.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          </div>
        )}

        {/* Key Products Section */}
        {sector.keyProducts && sector.keyProducts.length > 0 && (
          <div className="animated-block mt-12">
            <div className="animated-block-target">
              <Container>
                <h2 className="mb-8 font-bebas text-4xl text-[#003A77] md:text-5xl uppercase">
                  Key Products & Solutions
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {sector.keyProducts.map((product, idx) => (
                    <div key={idx} className="flex items-center gap-2 rounded-sm bg-[#FCF8F3] border border-gray-100 p-3">
                      <span className="text-xl text-[#00A1B1]">✓</span>
                      <span className="text-gray-700 text-sm">{product}</span>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          </div>
        )}

        {/* Quick Guide Section */}
        <div className="animated-block mt-12 lg:mt-20">
          <div className="animated-block-target">
            <Container>
              <div className="mb-10 text-center lg:mb-12 lg:text-left">
                <p className="font-bold text-[#00A1B1] uppercase text-xs tracking-wider">Quick Guide</p>
                <h3 className="mt-2 font-bebas text-5xl text-[#003A77] md:text-6xl lg:text-7xl uppercase">
                  Simplifying Your <span className="text-[#00A1B1]">Participation Journey</span>
                </h3>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {quickGuideItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="group flex flex-col overflow-hidden rounded-sm bg-[#FCF8F3] border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-lg shadow-sm"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-[#003A77]/20 transition-all duration-300 group-hover:bg-[#003A77]/40"></div>
                      <div className="absolute bottom-4 left-0 right-0 flex justify-start pl-4">
                        <Link href={item.buttonLink}>
                          <button className="bg-[#00A1B1] hover:bg-[#003A77] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                            {item.buttonText}
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-5 font-sans">
                      <h4 className="font-bebas text-2xl text-[#003A77] md:text-3xl font-bold uppercase">
                        {item.title}
                      </h4>
                      <p className="text-lg sm:text-xl text-gray-600 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </div>

        {/* Back to Sectors Link */}
        <div className="animated-block mt-8">
          <Container>
            <Link href="/sectors">
              <button className="flex items-center gap-2 text-[#00A1B1] transition-all hover:gap-3 hover:text-[#003A77] font-sans font-medium text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to All Sectors
              </button>
            </Link>
          </Container>
        </div>

        {/* Partners Section */}
        <div className="mt-12 lg:mt-20">
          <PartnersSection />
        </div>
      </div>

      <BackToTop />
    </div>
  );
}
