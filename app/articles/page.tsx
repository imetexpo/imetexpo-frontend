// app/articles/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllArticles } from "./data";
import BackToTop from "@/components/layout/BackToTop";
import Container from "@/components/ui/container";

const articlesData = getAllArticles();
const ITEMS_PER_PAGE = 9;

export default function ArticlesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = articlesData.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="intro-animation font-sans">
      <div className="page-spacing-wrapper pt-[120px] lg:pt-[140px]">
        <Container>
          <div className="border-b border-gray-250 pb-6 mb-8 mt-10">
            <h1 className="font-bebas text-5xl sm:text-6xl text-[#03193D] uppercase tracking-wide">
              Industry <span className="text-[#CC9808]">Insights & News</span>
            </h1>
            <p className="mt-2 text-sm text-gray-650 font-sans">
              Stay up-to-date with technical breakthroughs, market trends, and updates from the tyre expo team.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-10 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#CC9808] focus:border-[#CC9808] text-sm bg-white"
            />
          </div>

          {/* Articles Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedArticles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-sm border border-gray-100 bg-[#FCF8F3] shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100 rounded-t-sm">
                    <Image
                      alt={article.title}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-550 group-hover:scale-105"
                      src={article.image}
                    />
                    <div className="absolute inset-0 bg-[#03193D]/10 group-hover:bg-[#03193D]/25 transition duration-300"></div>
                  </div>
                  <div className="p-5 space-y-3 font-sans">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                      {formatDate(article.publishedDate)}
                    </p>
                    <h2 className="font-bebas text-2xl text-[#03193D] line-clamp-2 group-hover:text-[#CC9808] transition-colors duration-300 uppercase font-bold">
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p className="text-xs text-gray-650 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                </div>
                <div className="p-5 pt-0 mt-auto">
                  <span className="text-xs font-bold text-[#CC9808] group-hover:text-[#03193D] transition-colors uppercase tracking-wider flex items-center gap-1">
                    Read Article →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* No Results Message */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-16 border border-gray-100 rounded-sm bg-[#FCF8F3] shadow-sm max-w-md mx-auto">
              <p className="text-sm font-bold uppercase tracking-wider text-gray-600">
                No articles found matching your search.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-sm text-xs font-bold uppercase tracking-wider text-slate-800 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      currentPage === page
                        ? "bg-[#CC9808] text-white border border-[#CC9808]"
                        : "bg-white border border-gray-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-sm text-xs font-bold uppercase tracking-wider text-slate-800 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </Container>
      </div>
      <BackToTop />

      <style jsx>{`
        .font-bebas { font-family: 'Bebas Neue', cursive; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
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