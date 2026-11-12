import Link from 'next/link';

export default function BlogNotFound() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-xl px-4 text-center">
        <h1 className="text-2xl font-bold text-[#003A77]">Blog post not found</h1>
        <p className="mt-3 text-slate-600">The blog post you are looking for does not exist or has been unpublished.</p>
        <Link href="/blogs" className="mt-6 inline-block rounded-lg bg-[#003A77] px-5 py-2.5 text-sm font-semibold text-white">
          Back to all blogs
        </Link>
      </div>
    </section>
  );
}

