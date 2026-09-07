'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import Container from '../ui/container';
import { Article, formatDate } from '@/app/articles/data'

interface ArticlesSectionProps {
  articles: Article[];
}

export default function ArticlesSection({ articles }: ArticlesSectionProps) {
  const [featuredArticle, ...restArticles] = articles;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
      <Container>
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12 flex-wrap">
          <div className="max-w-[900px]">
            <p className="text-[#CC9808] font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Articles
            </p>
            <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-black leading-tight uppercase tracking-tight mt-3">
              EVENT INSIGHTS & INDUSTRY TRENDS
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base font-sans">
              Stay up to date with the latest updates in the industry and the show
            </p>
          </div>

          <Button
            href="/articles/"
            className="border border-[#CC9808] text-[#CC9808] bg-[#CC9808] hover:bg-[#ff8c00] hover:text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm w-full sm:w-auto text-center"
          >
            VIEW ALL ARTICLES
          </Button>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT FEATURED ARTICLE */}
          {featuredArticle && (
            <div className="lg:w-[65%] group cursor-pointer min-w-0">
              <div className="relative h-[250px] sm:h-[300px] md:h-[340px] lg:h-[360px] rounded-sm overflow-hidden shadow-sm">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="mt-4">
                <p className="text-[#CC9808] text-xs font-semibold font-sans">
                  {formatDate(featuredArticle.publishedDate)}
                </p>
                <Link href={`/articles/${featuredArticle.slug}`}>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mt-2 leading-snug hover:text-[#CC9808] transition">
                    {featuredArticle.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed line-clamp-3 font-sans">
                  {featuredArticle.excerpt}
                </p>
              </div>
            </div>
          )}

          {/* RIGHT ARTICLES */}
          <div className="lg:w-[35%] flex flex-col gap-6 min-w-0">
            {restArticles.map((article) => (
              <div key={article.slug} className="grid grid-cols-[35%_65%] sm:grid-cols-[40%_60%] gap-3 sm:gap-4 items-start group cursor-pointer">
                <div className="relative h-[90px] sm:h-[100px] md:h-[110px] lg:h-[120px] rounded-sm overflow-hidden shadow-sm">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div>
                  <p className="text-[#CC9808] text-[10px] sm:text-xs font-semibold font-sans">
                    {formatDate(article.publishedDate)}
                  </p>
                  <Link href={`/articles/${article.slug}`}>
                    <h4 className="text-xs sm:text-sm md:text-base font-bold text-black mt-1 leading-snug hover:text-[#CC9808] transition line-clamp-2">
                      {article.title}
                    </h4>
                  </Link>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1 leading-relaxed line-clamp-3 font-sans">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}