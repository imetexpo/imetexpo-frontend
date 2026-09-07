import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles, getRelatedArticles } from "../data";
import BackToTop from "@/components/layout/BackToTop";
import Container from "@/components/ui/container";

// Generate static paths for all articles at build time
export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  // ✅ IMPORTANT: Await the params Promise
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const relatedArticles = getRelatedArticles(slug, 3);

  if (!article) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="intro-animation font-sans">
      <div className="page-spacing-wrapper pt-[120px] lg:pt-[140px]">
        <Container className="py-12 sm:py-16 md:py-20">
          <article className="max-w-4xl mx-auto">
            {/* Date */}
            <div className="mb-4 text-center">
              <time className="text-xs text-[#CC9808] font-bold tracking-wider uppercase">
                {formatDate(article.publishedDate)}
              </time>
            </div>

            {/* Title */}
            <h1 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-[#03193D] uppercase text-center leading-tight mb-8">
              {article.title}
            </h1>

            {/* Featured Image */}
            <div className="relative w-full aspect-[16/9] rounded-sm overflow-hidden border border-gray-100 shadow-sm mb-10">
              <Image
                alt={article.title}
                fill
                className="object-cover"
                src={article.image}
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1000px"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none mx-auto
              prose-headings:font-bebas prose-headings:text-[#03193D] prose-headings:uppercase
              prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-[#CC9808]
              prose-p:text-sm sm:prose-p:text-base prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5
              prose-strong:text-[#03193D] prose-strong:font-bold
              prose-a:text-[#CC9808] prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-sm prose-img:shadow-sm prose-img:my-6
              prose-ul:list-disc prose-ul:pl-5 prose-ul:my-4
              prose-li:text-sm sm:prose-li:text-base prose-li:mb-1
            ">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            {/* Divider */}
            <div className="relative my-12">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs text-gray-400">✦ ✦ ✦</span>
              </div>
            </div>

            {/* Back to Articles Link */}
            <div className="text-center">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#CC9808] hover:bg-[#03193D] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to All Articles
              </Link>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-16 pt-8 border-t border-gray-200">
                <h3 className="font-bebas text-3xl text-[#03193D] uppercase mb-8 text-center font-bold">
                  You Might Also Like
                </h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {relatedArticles.map((relatedArticle) => (
                    <Link
                      key={relatedArticle.id}
                      href={`/articles/${relatedArticle.slug}`}
                      className="group block bg-[#FCF8F3] border border-gray-100 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden bg-gray-100 rounded-t-sm">
                        <Image
                          alt={relatedArticle.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          src={relatedArticle.image}
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-5 font-sans space-y-2">
                        <time className="text-[10px] text-[#CC9808] font-bold uppercase tracking-wider">
                          {formatDate(relatedArticle.publishedDate)}
                        </time>
                        <h4 className="font-bebas text-xl text-[#03193D] uppercase line-clamp-2 group-hover:text-[#CC9808] transition-colors duration-300 font-bold">
                          {relatedArticle.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </Container>
      </div>
      <BackToTop />
    </div>
  );
}