'use client';

import Link from 'next/link';
import Container from '../ui/container';

const visitPoints = [
  'Discover advancements in industrial metrology and precision measurement.',
  'Explore inspection, testing, and calibration technologies.',
  'Connect with equipment manufacturers and technology providers.',
  'Learn about automation and digital quality inspection.',
  'Explore potential suppliers and new business opportunities.',
];

const attendeeProfiles = [
  'Automotive & Auto Component Manufacturers',
  'Aerospace & Defence Manufacturing Professionals',
  'Precision Engineering & Machining Companies',
  'Quality Assurance & Quality Control Engineers',
  'Metrology & Calibration Laboratories',
  'Industrial Testing & Inspection Professionals',
  'Research & Development Organizations',
  'Production, Plant, and Procurement Managers',
];

const timings = [
  { day: 'Day 1', date: '13 May 2027', hours: '10:00 AM – 6:00 PM' },
  { day: 'Day 2', date: '14 May 2027', hours: '10:00 AM – 6:00 PM' },
  { day: 'Day 3', date: '15 May 2027', hours: '10:00 AM – 4:00 PM' },
];

export default function VisitorAndVenueSection() {
  return (
    <section className="bg-[#FCF8F3] py-16 sm:py-20 lg:py-24 border-t border-gray-200">
      <Container>
        {/* WHY VISIT + WHO SHOULD ATTEND */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* LEFT: Why Visit */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[#00A1B1] font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Visitor Experience
              </p>
              <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-[#003A77] leading-tight uppercase tracking-tight mt-2">
                WHY VISIT <span className="text-[#00A1B1]">INDIAMET 2027?</span>
              </h2>
              <p className="mt-3 font-sans text-base sm:text-lg text-gray-700 leading-relaxed">
                Experience the technologies advancing precision, inspection, and manufacturing quality at INDIAMET Expo 2027 in Pune. Connect with technology providers and explore solutions tailored to your operations.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {visitPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00A1B1]/15 text-xs font-bold text-[#00A1B1] mt-0.5">
                    ✓
                  </span>
                  <p className="font-sans text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/passes"
                className="inline-block bg-[#00A1B1] hover:bg-[#003A77] text-white px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm shadow-sm"
              >
                Register to Visit
              </Link>
            </div>
          </div>

          {/* RIGHT: Who Should Attend */}
          <div className="flex flex-col gap-5 rounded-sm border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
            <div>
              <p className="text-[#00A1B1] font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Audience Profile
              </p>
              <h3 className="font-bebas text-3xl sm:text-4xl text-[#003A77] leading-tight uppercase tracking-tight mt-1">
                WHO SHOULD ATTEND INDIAMET 2027?
              </h3>
              <p className="mt-2 font-sans text-sm sm:text-base text-gray-600 leading-relaxed">
                Designed for professionals and organizations involved in precision manufacturing, measurement, inspection, testing, calibration, and quality assurance:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {attendeeProfiles.map((profile, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 rounded-sm border border-gray-100 bg-[#FCF8F3]/60 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-gray-800 hover:border-[#00A1B1] transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00A1B1] shrink-0" />
                  <span>{profile}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* EXHIBITION DATES & VENUE BANNER */}
        <div className="mt-14 rounded-sm border border-gray-200 bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Venue & Dates */}
            <div className="lg:col-span-6 space-y-4">
              <span className="inline-block rounded-full bg-[#00A1B1]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#00A1B1]">
                Dates &amp; Venue
              </span>
              <h3 className="font-bebas text-3xl sm:text-4xl text-[#003A77] tracking-tight uppercase">
                INDIAMET 2027 – Exhibition Dates &amp; Venue
              </h3>
              <div className="space-y-1 font-sans text-sm sm:text-base text-gray-700">
                <p>
                  <strong className="text-[#0B1F4D]">Dates:</strong> 13–15 May 2027
                </p>
                <p>
                  <strong className="text-[#0B1F4D]">Venue:</strong> Auto Cluster Exhibition Centre
                </p>
                <p className="text-gray-600">
                  <strong className="text-[#0B1F4D]">Location:</strong> Chinchwad East, Pune, Maharashtra, India
                </p>
              </div>
              <p className="font-sans text-xs sm:text-sm font-medium text-[#00A1B1] pt-1">
                Join the metrology and precision manufacturing community at INDIAMET 2027.
              </p>
            </div>

            {/* Right: Daily Timings & CTAs */}
            <div className="lg:col-span-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-8">
              <div className="space-y-2 mb-6">
                <p className="font-bebas text-lg uppercase tracking-wider text-[#003A77]">
                  Daily Opening Hours
                </p>
                {timings.map((t, i) => (
                  <div key={i} className="flex justify-between items-center text-xs sm:text-sm py-1.5 border-b border-gray-100 last:border-b-0">
                    <span className="font-semibold text-gray-800">{t.day} ({t.date})</span>
                    <span className="font-mono font-medium text-[#003A77] bg-gray-50 px-2 py-0.5 rounded">{t.hours}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/passes"
                  className="bg-[#00A1B1] hover:bg-[#003A77] text-white px-6 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm text-center shadow-xs"
                >
                  Register as a Visitor
                </Link>
                <Link
                  href="/register?t=exhibitor"
                  className="border border-[#003A77] text-[#003A77] hover:bg-[#003A77] hover:text-white px-6 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm text-center"
                >
                  Become an Exhibitor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

