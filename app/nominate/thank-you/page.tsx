import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import Container from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Thank You for Your Nomination | INDIAMET Expo',
  description: 'Thank you for submitting your awards nomination to INDIAMET Expo.',
  robots: { index: false, follow: false },
};

export default function NominationThankYouPage() {
  return (
    <section className="bg-[#FCF8F3] py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm sm:px-12">
          <CheckCircle2 aria-hidden="true" className="mx-auto mb-6 h-16 w-16 text-[#00A1B1]" strokeWidth={1.5} />
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#00A1B1]">Nomination received</p>
          <h1 className="font-bebas text-5xl text-[#003A77] sm:text-6xl">Thank You!</h1>
          <p className="mt-5 text-base leading-relaxed text-gray-600">
            Thank you for submitting your awards nomination. Our team will review the details
            and contact you if any further information is needed.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            Please look out for a confirmation email in your inbox.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/awards/" className="rounded-lg bg-[#00A1B1] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#003A77]">
              Back to Awards
            </Link>
            <Link href="/" className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50">
              Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
