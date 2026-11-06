import Container from '@/components/ui/container';
import { buildPageSchema, getSeoPage } from '@/lib/seo';

export default function PageSeo({ pageKey }: { pageKey: string }) {
  const page = getSeoPage(pageKey);

  return (
    <>
      <script
        id="page-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildPageSchema(pageKey)).replace(/</g, '\\u003c'),
        }}
      />
      {page.faqs.length > 0 && (
        <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-28 border-t border-gray-100 bg-[#FCF8F3] lg:scroll-mt-40 py-14 sm:py-20">
          <Container>
            <div className="mx-auto max-w-4xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#00A1B1]">
                Helpful information
              </p>
              <h2 id="faq-heading" className="mb-8 font-bebas text-4xl uppercase text-[#003A77] sm:text-5xl">
                Frequently Asked Questions
              </h2>
              <div className="divide-y divide-gray-200 border-y border-gray-200">
                {page.faqs.map((faq, index) => (
                  <details id={'faq-' + (index + 1)} key={faq.question} className="group scroll-mt-28 lg:scroll-mt-40">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-sm font-semibold text-[#003A77] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00A1B1] sm:text-base [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <span aria-hidden="true" className="shrink-0 text-xl font-normal text-[#00A1B1] group-open:rotate-45">+</span>
                    </summary>
                    <p className="max-w-3xl pb-6 text-sm leading-relaxed text-gray-600 sm:text-base">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
