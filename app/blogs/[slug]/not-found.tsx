import Link from 'next/link';

export default function BlogNotFound() {
  return (
    <section className="px-6 py-20 text-center">
      <h1 className="text-3xl font-bold text-[#003A77]">Blog not found</h1>
      <p className="mt-3 text-slate-600">This post may be unavailable or no longer published.</p>
      <Link href="/blogs" className="mt-6 inline-block font-semibold text-[#00A1B1] hover:text-[#003A77] underline">
        Return to blogs
      </Link>
    </section>
  );
}
