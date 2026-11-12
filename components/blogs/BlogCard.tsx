import Link from 'next/link';
import { blogDate, type Blog } from '@/lib/blogs';
import BlogCover from './BlogCover';

export default function BlogCard({ blog, featured = false }: { blog: Blog; featured?: boolean }) {
  return (
    <Link
      href={'/blogs/' + blog.slug}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#00A1B1] bg-white transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#003A77]"
    >
      <div className="aspect-video overflow-hidden">
        <BlogCover image={blog.image} title={blog.title} priority={featured} />
      </div>
      <div className={featured ? 'flex flex-1 flex-col p-5 sm:p-6' : 'flex flex-1 flex-col p-4'}>
        <p className="mb-2 text-xs text-[#00A1B1]">
          Posted on <time dateTime={blog.publishedAt || undefined}>{blogDate(blog.publishedAt)}</time>
        </p>
        <h2
          className={
            featured
              ? 'text-xl font-bold leading-snug text-[#003A77] group-hover:text-[#00A1B1] sm:text-2xl'
              : 'text-base font-bold leading-snug text-[#003A77] group-hover:text-[#00A1B1]'
          }
        >
          {blog.title}
        </h2>
        {featured && blog.excerpt && <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{blog.excerpt}</p>}
        <p className="mt-3 text-xs text-slate-500">By {blog.author}</p>
      </div>
    </Link>
  );
}

