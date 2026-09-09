// app/media-gallery/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import BackToTop from "@/components/layout/BackToTop";
import Container from "@/components/ui/container";

const galleryCategories = [
  {
    id: 21,
    title: "Exhibition 2025",
    slug: "exhibition-2025",
    image: "https://cdn.itegroupnews.com/mnng25_1198_ce8f5a92dd.webp",
  },
  {
    id: 22,
    title: "Conference Program 2025",
    slug: "conference-program-2025",
    image: "https://cdn.itegroupnews.com/MW_25_AMG_0827i_022377fa05.webp",
  },
  {
    id: 3,
    title: "Exhibition 2024",
    slug: "exhibition-2024",
    image: "https://cdn.itegroupnews.com/mw24_2_1077_1_e0df386c4c.webp",
  },
  {
    id: 18,
    title: "Conference Program 2024",
    slug: "conference-program-2024",
    image: "https://cdn.itegroupnews.com/MW_24_2304_0077_FORUM_i_ba5014d9cf.webp",
  },
  {
    id: 4,
    title: "Conference Programme 2024",
    slug: "conference-programme-2024",
    image: "https://cdn.itegroupnews.com/MW_24_2304_0077_FORUM_i_289a26be30.webp",
  },
  {
    id: 5,
    title: "Exhibition 2023",
    slug: "exhibition-2023",
    image: "https://cdn.itegroupnews.com/04_3b00db5ab1.webp",
  },
  {
    id: 6,
    title: "Conference Programme 2023",
    slug: "conference-programme-2023",
    image: "https://cdn.itegroupnews.com/MW_23_IMG_1167i_5878b45805.webp",
  },
  {
    id: 9,
    title: "Award Ceremony Industry 4.0 2022",
    slug: "award-ceremony-mining-industry-4-0-2022",
    image: "https://cdn.itegroupnews.com/mw2022_gi_31_822c7f96d2.webp",
  },
  {
    id: 7,
    title: "Exhibition 2022",
    slug: "exhibition-2022",
    image: "https://cdn.itegroupnews.com/mw2022_exh_13_5eb7dd114b.webp",
  },
  {
    id: 8,
    title: "Conference Programme 2022",
    slug: "conference-programme-2022",
    image: "https://cdn.itegroupnews.com/mw2022_dp_15_5272bfa8da.webp",
  },
  {
    id: 10,
    title: "Exhibition 2021",
    slug: "exhibition-2021",
    image: "https://cdn.itegroupnews.com/mining_exh21_exh9_aefcb70926.webp",
  },
  {
    id: 11,
    title: "Conference Programme 2021",
    slug: "conference-programme-2021",
    image: "https://cdn.itegroupnews.com/mining_exh21_bip1_c30720d5b0.webp",
  },
  {
    id: 13,
    title: "Exhibition 2020",
    slug: "exhibition-2020",
    image: "https://cdn.itegroupnews.com/exhibition_2020_3_baa4271990.webp",
  },
  {
    id: 14,
    title: "Conference Programme 2020",
    slug: "conference-programme-2020",
    image: "https://cdn.itegroupnews.com/business_prog16_851c07f86b.webp",
  },
  {
    id: 15,
    title: "Exhibition 2019",
    slug: "exhibition-2019",
    image: "https://cdn.itegroupnews.com/mw24_2_1077_1_82887824ff.webp",
  },
  {
    id: 17,
    title: "Gala Event 2019",
    slug: "gala-event-2019",
    image: "https://cdn.itegroupnews.com/pr_20_16b0b652fa.webp",
  },
  {
    id: 16,
    title: "Conference Programme 2019",
    slug: "conference-programme-2019",
    image: "https://cdn.itegroupnews.com/MW_24_2504_0007_FORUM_i_e0c78dbe49.webp",
  },
];

export default function MediaGalleryPage() {
  return (
    <div className="intro-animation font-sans">
      <div className="page-spacing-wrapper pt-[120px] lg:pt-0 pb-16">
        
        {/* Gallery Header */}
        <Container>
          <div className="border-b border-gray-250 pb-6 mb-8 mt-10">
            <h1 className="font-bebas text-5xl sm:text-6xl text-[#03193D] uppercase tracking-wide">
              A Visual Journey Through <span className="text-[#CC9808]">INDIAMET Expo</span>
            </h1>
            <p className="mt-2 text-sm text-gray-650 font-sans">
              Discover the stories behind the images that have shaped INDIAMET Expo's legacy as a key event in the tyre manufacturing and rubber processing sector.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {galleryCategories.map((category) => (
              <Link
                key={category.id}
                href={`/media-gallery/${category.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-sm border border-gray-150 bg-[#FCF8F3] shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-[280px] sm:h-[320px] overflow-hidden bg-gray-100 rounded-sm">
                  <Image
                    alt={category.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-550 ease-in-out group-hover:scale-105"
                    src={category.image}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition duration-300"></div>
                  {/* Category Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-bebas text-2xl text-white uppercase group-hover:text-[#CC9808] transition-colors duration-300 font-bold tracking-wide">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>

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
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}