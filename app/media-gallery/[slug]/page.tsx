// app/media-gallery/[slug]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock data for gallery images - In production, fetch from CMS
const galleryImagesData: Record<string, { title: string; images: string[] }> = {
  "exhibition-2025": {
    title: "Exhibition 2025",
    images: [
      "https://cdn.itegroupnews.com/mnng25_1198_ce8f5a92dd.webp",
      "https://cdn.itegroupnews.com/mnng25_1200_9a936ba630.webp",
      "https://cdn.itegroupnews.com/mnng25_1273_1ebc43e900.webp",
      "https://cdn.itegroupnews.com/mnng25_1022_f66004cb00.webp",
      "https://cdn.itegroupnews.com/mnng25_1077_1_84e0fb312f.webp",
      "https://cdn.itegroupnews.com/mnng25_1259_1_c140a9a0fc.webp",
    ],
  },
  "conference-program-2025": {
    title: "Conference Program 2025",
    images: [
      "https://cdn.itegroupnews.com/MW_25_AMG_0827i_022377fa05.webp",
      "https://cdn.itegroupnews.com/MW_25_AMG_2718i_63acadda70.webp",
      "https://cdn.itegroupnews.com/MW_25_AMG_1902i_32b7254dc4.webp",
      "https://cdn.itegroupnews.com/MW_25_AMG_1201i_07c7c15191.webp",
    ],
  },
  "exhibition-2024": {
    title: "Exhibition 2024",
    images: [
      "https://cdn.itegroupnews.com/mw24_2_1077_1_e0df386c4c.webp",
      "https://cdn.itegroupnews.com/mw24_1062_min_91b90d653f.jpg",
      "https://cdn.itegroupnews.com/mw24_1066_min_f99245412f.webp",
      "https://cdn.itegroupnews.com/mw24_1077_min_75a8122d24.jpg",
      "https://cdn.itegroupnews.com/mw24_1078_min_8d98b0dea5.webp",
      "https://cdn.itegroupnews.com/mw24_1094_min_8a95c9e0c6.webp",
    ],
  },
  "exhibition-2023": {
    title: "Exhibition 2023",
    images: [
      "https://cdn.itegroupnews.com/04_3b00db5ab1.webp",
      "https://cdn.itegroupnews.com/06_78416bfdb6.webp",
      "https://cdn.itegroupnews.com/40_46e545c298.webp",
    ],
  },
  // Add more galleries as needed
};

export default function GalleryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [gallery, setGallery] = useState<{ title: string; images: string[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // In production, fetch from CMS:
    // fetch(`/api/media-gallery/${slug}`).then(res => res.json()).then(data => {...})
    const data = galleryImagesData[slug];
    setGallery(data || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex size-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-500">
          <div className="flex size-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-300"></div>
        </div>
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="container mx-auto px-4 py-40 text-center">
        <h1 className="text-4xl font-bold mb-4">Gallery Not Found</h1>
        <p className="text-gray-600 mb-8">
          The gallery you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/media-gallery"
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-[#03193D] transition-colors"
        >
          Back to Media Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="page-spacing-wrapper">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/media-gallery"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-[#03193D] transition-colors mb-4"
          >
            ← Back to Media Gallery
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#03193D]">
            {gallery.title}
          </h1>
        </div>

        {/* Image Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {gallery.images.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(image)}
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                alt={`${gallery.title} - Image ${index + 1}`}
                width={600}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                src={image}
              />
              <div className="absolute inset-0 bg-[#03193D]/0 group-hover:bg-[#03193D]/30 transition-colors duration-300 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-[#03193D]/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-orange-500 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img
              src={selectedImage}
              alt="Full size gallery image"
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}