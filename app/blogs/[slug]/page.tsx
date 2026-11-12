import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchPublishedBlog } from '@/lib/publicBlogs';
import { blogDate } from '@/lib/blogs';
import BlogCover from '@/components/blogs/BlogCover';
import BlogContent from '@/components/blogs/BlogContent';

type Props = { params: Promise<{ slug: string }> };

export const maxDuration = 90;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchPublishedBlog(slug);
  if (!blog) return { title: 'Blog not found | IndiaMET', robots: { index: false } };
  return {
    title: blog.metaTitle || blog.title + ' | IndiaMET',
    description: blog.metaDescription || blog.excerpt || 'Read the latest IndiaMET industry insights.',
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt || 'Read the latest IndiaMET industry insights.',
      type: 'article',
      publishedTime: blog.publishedAt || undefined,
      modifiedTime: blog.updatedAt,
      authors: [blog.author],
      ...(blog.image ? { images: [{ url: blog.image, alt: blog.title }] } : {}),
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const blog = await fetchPublishedBlog(slug);
  if (!blog) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link href="/blogs" className="mb-6 inline-block text-sm font-semibold text-[#003A77] hover:underline">
        ← All blogs
      </Link>
      <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#00A1B1]">{blog.category}</p>
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#003A77] sm:text-4xl lg:text-5xl">
        {blog.title}
      </h1>
      <p className="mb-7 mt-5 text-sm text-slate-500">
        By {blog.author} · <time dateTime={blog.publishedAt || undefined}>{blogDate(blog.publishedAt)}</time>
      </p>
      <div className="mb-8 overflow-hidden rounded-lg">
        <BlogCover image={blog.image} title={blog.title} priority />
      </div>
      {blog.excerpt && (
        <p className="mb-8 rounded-lg border-l-4 border-[#00A1B1] bg-slate-50 p-5 text-base font-medium leading-7 text-[#003A77]">
          {blog.excerpt}
        </p>
      )}
      <BlogContent content={blog.content} />
    </article>
  );
}

