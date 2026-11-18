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
    <section className="bg-[#F8FAFC] py-16 sm:py-24">
      <Container>
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 max-w-lg mx-auto text-center animate-fadeIn">
          <div className="w-16 h-16 bg-[#E8F1F8] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#00A1B1]/40 shadow-xs">
            <svg className="w-8 h-8 text-[#003A77]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#00A1B1] bg-[#E8F1F8] px-3 py-1 rounded-full mb-3">
            IndiaMET 2027 • Awards &amp; Nomination
          </span>
          <h1 className="font-bebas text-4xl text-[#003A77] mb-2 uppercase tracking-wide">
            Thank You for Your Nomination!
          </h1>
          <p className="text-base text-gray-600 mb-5 leading-relaxed">
            Your awards nomination for <strong>IndiaMET 2027 Exhibition &amp; Summit</strong> (13–15 May 2027, Pune) has been submitted successfully.
          </p>
          <p className="text-xs text-gray-500 leading-relaxed mb-6">
            A confirmation email has been dispatched to your email address. Our awards management team will review the details and reach out to you shortly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/awards/" className="rounded-lg bg-[#003A77] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#002855]">
              Explore Awards
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
