'use client';

export default function BlogsError({ reset }: { reset: () => void }) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-xl px-4 text-center">
        <h1 className="text-2xl font-bold text-[#003A77]">Unable to load blogs</h1>
        <p className="mt-3 text-slate-600">Something went wrong while fetching the latest blog posts.</p>
        <button
          onClick={reset}
          className="mt-6 rounded-lg bg-[#003A77] px-5 py-2.5 text-sm font-semibold text-white cursor-pointer"
        >
          Try again
        </button>
      </div>
    </section>
  );
}

