'use client';

import Link from 'next/link';
import Container from '@/components/ui/container';
import BackToTop from '@/components/layout/BackToTop';
import PageHero from '@/components/layout/PageHero';

const HERO_IMAGE = '/award3.jpg';

const stats = [
  ['15+', 'Award Categories'],
  ['200+', 'Nominations Expected'],
  ['500+', 'Industry Leaders'],
  ['25+', 'Expert Jury Members'],
];

const whyParticipate = [
  ['🏆', 'Industry Recognition', 'Gain recognition among global leaders in tyre manufacturing and rubber technology.'],
  ['🌐', 'Global Visibility', 'Showcase your achievements on an international industry platform.'],
  ['🤝', 'Business Networking', 'Connect with key decision makers and expand your business network.'],
  ['📈', 'Brand Credibility', 'Strengthen your brand image and build trust with customers.'],
  ['🚀', 'Innovation Leadership', 'Position your organization as an innovator and industry trailblazer.'],
  ['⭐', 'Benchmark Against Industry', 'Measure your performance and stand out from the competition.'],
];

const categories = [
  ['⚙️', 'Outstanding Tyre Manufacturing'],
  ['🧪', 'Best Rubber Compound Innovation'],
  ['🏅', 'Quality Excellence Award'],
  ['📋', 'Tyre Testing & QC Award'],
  ['🖥️', 'Machinery & Automation Award'],
  ['🔍', 'Inspection Technology Award'],
  ['♻️', 'Recycling & Sustainability Award'],
  ['🏭', 'Smart Manufacturing Award'],
  ['🌟', 'Young Professional Award'],
  ['🌍', 'Green Manufacturing Award'],
  ['⚛️', 'Excellence in R&D'],
  ['🏆', 'Lifetime Achievement Award'],
];

const process = [
  ['📝', 'NOMINATION', 'Submit your nomination'],
  ['🔎', 'SCREENING', 'Initial screening of nominations'],
  ['👥', 'EXPERT JURY EVALUATION', 'Evaluation by expert jury panel'],
  ['📢', 'FINALISTS ANNOUNCEMENT', 'Selection of finalists'],
  ['🏆', 'AWARDS CEREMONY', 'Winners felicitated at the Awards Night'],
];

const jury = [
  { name: 'To Be Announced', role: 'Chairperson', company: 'Jury panel to be announced' },
  { name: 'To Be Announced', role: 'Industry Expert', company: 'Jury panel to be announced' },
  { name: 'To Be Announced', role: 'Academic Expert', company: 'Jury panel to be announced' },
  { name: 'To Be Announced', role: 'Research Expert', company: 'Jury panel to be announced' },
];

const sponsors = [
  { name: 'Coming Soon', role: 'Platinum Sponsor' },
  { name: 'Coming Soon', role: 'Gold Sponsor' },
  { name: 'Coming Soon', role: 'Silver Sponsor' },
  { name: 'Coming Soon', role: 'Supporting Sponsor' },
  { name: 'Coming Soon', role: 'Knowledge Sponsor' },
  { name: 'Coming Soon', role: 'Media Sponsor' },
];

const evaluation: [string, number][] = [
  ['Innovation', 35],
  ['Technical Excellence', 25],
  ['Industry Impact', 20],
  ['Business Growth', 10],
  ['Sustainability', 10],
];

const supporters = [
  { name: 'Coming Soon', role: 'Platinum Partner' },
  { name: 'Coming Soon', role: 'Gold Partner' },
  { name: 'Coming Soon', role: 'Silver Partner' },
  { name: 'Coming Soon', role: 'Supporting Partner' },
  { name: 'Coming Soon', role: 'Knowledge Partner' },
  { name: 'Coming Soon', role: 'Media Partner' },
];

function Ring({ percent, label }: { percent: number; label: string }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;

  return (
    <div className="flex w-40 flex-col items-center gap-4 transition-transform duration-200 hover:scale-105 md:w-44">
      <svg width="120" height="120" viewBox="0 0 120 120" className="h-28 w-28 md:h-32 md:w-32">
        <circle cx="60" cy="60" r={r} stroke="#e5e7eb" strokeWidth="10" fill="white" />
        <circle
          cx="60"
          cy="60"
          r={r}
          stroke="#CC9808"
          strokeWidth="10"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        <text x="60" y="68" textAnchor="middle" className="fill-[#03193D] text-lg font-bold md:text-xl">
          {percent}%
        </text>
      </svg>
      <p className="text-center text-sm font-semibold uppercase leading-snug tracking-wide text-[#03193D] md:text-base">
        {label}
      </p>
    </div>
  );
}

function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="mb-2 text-xs font-bold uppercase tracking-[1.5px] text-[#CC9808]">{children}</p>
  );
}

export default function AwardsPage() {
  return (
    <div className="intro-animation overflow-hidden bg-white font-sans">
      <PageHero
        title="AWARD"
        accent="CATEGORY"
        subtitle="Recognizing excellence in metrology, measurement technology, quality assurance, and sustainable innovation."
      >
        <div className="flex flex-wrap gap-4">
          <Link
            href="/sponsor/"
            className="rounded-sm border border-white px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white hover:text-[#03193D]"
          >
            Sponsor Now
          </Link>
          <Link
            href="/nominate/"
            className="rounded-sm bg-[#CC9808] px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#FFD154]"
          >
            Nominate Now →
          </Link>
        </div>
      </PageHero>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionEyebrow>About the Awards</SectionEyebrow>
              <h2 className="mb-6 font-bebas text-4xl uppercase tracking-tight text-[#03193D] lg:text-5xl">
                India Tyre Show Excellence Awards
              </h2>
              <p className="mb-6 text-base leading-relaxed text-gray-600 lg:text-lg">
                The India Tyre Show Excellence Awards honour individuals, teams and organizations that
                demonstrate outstanding achievement, innovation and leadership in tyre manufacturing,
                rubber compounds, testing, machinery, quality and allied technologies.
              </p>
              <p className="mb-8 text-base leading-relaxed text-gray-600 lg:text-lg">
                Celebrating pioneers across the tyre and rubber ecosystem, the awards recognize the
                leaders shaping the future of mobility, manufacturing and sustainability.
              </p>
              <div className="grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-4">
                {stats.map(([n, l]) => (
                  <div key={l} className="border-l-2 border-[#CC9808] pl-4">
                    <p className="text-2xl font-bold text-[#CC9808]">{n}</p>
                    <p className="mt-1 text-xs text-gray-500">{l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-80 overflow-hidden rounded-sm border border-[#CC9808]/20 bg-[#FCF8F3] lg:h-96">
              <img src={HERO_IMAGE} alt="India Tyre Show Awards" className="h-full w-full object-cover" />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#FCF8F3] py-16 lg:py-24">
        <Container>
          <div className="mb-12 text-center">
            <SectionEyebrow>Benefits</SectionEyebrow>
            <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#03193D] lg:text-5xl">
              Why Participate?
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyParticipate.map(([icon, title, desc]) => (
              <div
                key={title}
                className="rounded-sm border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="mb-3 block text-3xl">{icon}</span>
                <h3 className="mb-2 font-bebas text-xl uppercase tracking-wide text-[#03193D]">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="mb-12 text-center">
            <SectionEyebrow>Categories</SectionEyebrow>
            <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#03193D] lg:text-5xl">
              Award Categories
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {categories.map(([icon, title]) => (
              <div
                key={title}
                className="flex min-h-[150px] flex-col items-center justify-center gap-4 rounded-sm border border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#CC9808] hover:shadow-md"
              >
                <span className="text-4xl leading-none md:text-5xl">{icon}</span>
                <p className="text-sm font-semibold leading-snug text-[#03193D] md:text-base">{title}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#FCF8F3] py-16 lg:py-24">
        <Container>
          <div className="mb-12 text-center">
            <SectionEyebrow>Process</SectionEyebrow>
            <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#03193D] lg:text-5xl">
              Awards Process
            </h2>
          </div>
          <div className="flex flex-col items-stretch justify-between gap-10 md:flex-row md:items-start md:gap-4">
            {process.map(([icon, title, desc], i) => (
              <div key={title} className="flex w-full items-start md:w-auto md:flex-1">
                <div className="flex flex-1 flex-col items-center gap-4 text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#CC9808] bg-white text-4xl shadow-sm md:h-28 md:w-28 md:text-5xl">
                    {icon}
                  </div>
                  <p className="text-sm font-bold uppercase leading-snug tracking-wide text-[#CC9808] md:text-base">
                    {title}
                  </p>
                  <p className="max-w-[13rem] text-sm font-medium leading-relaxed text-[#03193D] md:text-base">
                    {desc}
                  </p>
                </div>
                {i < process.length - 1 && (
                  <span className="mx-2 hidden h-28 items-center justify-center text-3xl font-bold text-[#CC9808] md:flex">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="jury" className="py-16 lg:py-24">
        <Container>
          <div className="mb-12 text-center">
            <SectionEyebrow>Jury</SectionEyebrow>
            <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#03193D] lg:text-5xl">
              Meet the Jury
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {jury.map((member) => (
              <div
                key={`${member.role}-${member.name}`}
                className="overflow-hidden rounded-sm border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-48 items-center justify-center bg-[#FCF8F3] text-6xl">👤</div>
                <div className="p-4">
                  <span className="mb-2 inline-block rounded-sm border border-[#CC9808]/40 px-2 py-0.5 text-[10px] uppercase tracking-wide text-[#CC9808]">
                    {member.role}
                  </span>
                  <h3 className="text-sm font-semibold text-[#03193D]">{member.name}</h3>
                  <p className="mt-1 text-xs text-gray-600">{member.company}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="mx-auto mb-4 max-w-xl text-sm text-gray-600">
              Our jury comprises global experts from industry, academia and research institutions.
            </p>
            <Link
              href="#jury"
              className="inline-block rounded-sm border border-[#CC9808] px-6 py-2 text-xs font-bold uppercase tracking-wider text-[#CC9808] transition-all duration-300 hover:bg-[#CC9808] hover:text-white"
            >
              View All Jury
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-[#FCF8F3] py-16 lg:py-24">
        <Container>
          <div className="mb-12 text-center">
            <SectionEyebrow>Criteria</SectionEyebrow>
            <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#03193D] lg:text-5xl">
              Evaluation Criteria
            </h2>
          </div>
          <div className="flex flex-wrap items-start justify-center gap-8 md:flex-nowrap md:justify-between md:gap-4">
            {evaluation.map(([label, pct]) => (
              <Ring key={label} percent={pct} label={label} />
            ))}
          </div>
        </Container>
      </section>

      <section className="overflow-hidden py-16 lg:py-24">
        <Container>
          <div className="mb-12 text-center">
            <SectionEyebrow>Sponsors</SectionEyebrow>
            <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#03193D] lg:text-5xl">
              Our Sponsors
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 md:text-lg">
              Proudly supported by leading organizations sponsoring the India Tyre Show Excellence Awards.
            </p>
          </div>
          <PartnerTrack items={sponsors} />
        </Container>
      </section>

      <section className="overflow-hidden bg-[#FCF8F3] py-16 lg:py-24">
        <Container>
          <div className="mb-12 text-center">
            <SectionEyebrow>Supporters</SectionEyebrow>
            <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#03193D] lg:text-5xl">
              Our Supporters
            </h2>
          </div>
          <PartnerTrack items={supporters} />
        </Container>
      </section>

      <BackToTop />
    </div>
  );
}

function PartnerTrack({ items }: { items: { name: string; role: string }[] }) {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div
        className="awards-marquee flex w-max gap-6"
      >
        {loop.map((item, index) => (
          <div
            key={`${item.role}-${index}`}
            className="flex w-[220px] min-h-[180px] flex-shrink-0 flex-col items-center justify-center gap-4 rounded-sm border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#CC9808] hover:shadow-md md:w-[260px]"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#CC9808]/10">
              <span className="text-2xl font-bold text-[#CC9808]">{item.role.charAt(0)}</span>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-[#03193D]">{item.name}</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-[#CC9808]">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
