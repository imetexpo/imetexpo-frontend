export default function BlogsLoading() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 h-10 w-64 animate-pulse rounded bg-slate-200" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-72 animate-pulse rounded-lg bg-slate-100" />
          ))}
        </div>
      </div>
    </section>
  );
}

