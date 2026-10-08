'use client';

import Link from 'next/link';
import Container from '@/components/ui/container';
import BackToTop from '@/components/layout/BackToTop';
import PageHero from '@/components/layout/PageHero';

const HERO_IMAGE = 'images/gmea_awards.png';

const stats = [
  ['15+', 'Award Categories'],
  ['200+', 'Nominations Expected'],
  ['500+', 'Industry Leaders'],
  ['25+', 'Expert Jury Members'],
];

const whyParticipate = [
  {
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&h=500&fit=crop',
    title: 'Industry Recognition',
    description: 'Gain recognition among global leaders in metrology and precision engineering.',
  },
  {
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=500&fit=crop',
    title: 'Global Visibility',
    description: 'Showcase your achievements on an international industry platform.',
  },
  {
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=500&fit=crop',
    title: 'Business Networking',
    description: 'Connect with key decision makers and expand your business network.',
  },
  {
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=500&fit=crop',
    title: 'Brand Credibility',
    description: 'Strengthen your brand image and build trust with customers.',
  },
  {
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop',
    title: 'Innovation Leadership',
    description: 'Position your organization as an innovator and industry trailblazer.',
  },
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    title: 'Benchmark Against Industry',
    description: 'Measure your performance and stand out from the competition.',
  },
];

const categories = [
  {
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&h=500&fit=crop',
    title: 'Global Metrology Excellence Award',
    description:
      'Honours outstanding overall achievement in metrology, measurement science, and quality excellence at a national or international level.',
  },
  {
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop',
    title: 'Advanced Measurement Technology Award',
    description:
      'Recognises breakthrough instruments, sensors, and measurement systems that raise accuracy, speed, or capability in industrial applications.',
  },
  {
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop',
    title: 'Precision Measurement Innovation Award',
    description:
      'Celebrates original methods, software, or processes that improve dimensional accuracy, repeatability, and process control.',
  },
  {
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=500&fit=crop',
    title: 'CMM & 3D Metrology Excellence Award',
    description:
      'Awards leadership in coordinate measuring machines, 3D scanning, and spatial measurement used in manufacturing and quality labs.',
  },
  {
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop',
    title: 'Machine Vision & Smart Inspection Award',
    description:
      'Recognises vision systems, AI-enabled inspection, and automated optical solutions that detect defects and ensure product quality.',
  },
  {
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&h=500&fit=crop',
    title: 'Calibration Excellence Award',
    description:
      'Honours laboratories, service providers, and in-house teams delivering traceable, reliable calibration that underpins measurement confidence.',
  },
  {
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=500&fit=crop',
    title: 'Quality & Measurement Leadership Award',
    description:
      'Celebrates organisations that embed metrology into quality systems, audits, and continuous improvement across the plant.',
  },
  {
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=500&fit=crop',
    title: 'Best Industrial Metrology Application Award',
    description:
      'Awards a standout shop-floor or production-line application where measurement technology has delivered clear operational impact.',
  },
  {
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop',
    title: 'Digital & Smart Metrology Award',
    description:
      'Recognises connected, data-driven, and Industry 4.0 metrology — including digital twins, IoT gauges, and smart factory quality data.',
  },
  {
    image: 'https://images.unsplash.com/photo-1473341304170-bd7d52b37bef?w=800&h=500&fit=crop',
    title: 'Sustainable Metrology Award',
    description:
      'Honours measurement practices that reduce waste, energy use, or environmental impact while maintaining quality and compliance.',
  },
  {
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=500&fit=crop',
    title: 'Emerging Metrology Company Award',
    description:
      'Celebrates a growing company that has rapidly expanded its metrology offering, market reach, or technology portfolio.',
  },
  {
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=500&fit=crop',
    title: 'Metrology Startup of the Year',
    description:
      'Awards an early-stage venture introducing a distinctive product, service, or business model to the measurement and quality market.',
  },
  {
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?w=800&h=500&fit=crop',
    title: 'Metrology Education & Skill Development Award',
    description:
      'Recognises institutions, programmes, or companies that build metrology skills through training, certification, or knowledge transfer.',
  },
  {
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=500&fit=crop',
    title: 'Metrology Professional of the Year',
    description:
      'Honours an individual whose technical expertise, leadership, or contribution has advanced the profession of measurement science.',
  },
  {
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=500&fit=crop',
    title: 'Lifetime Achievement Award',
    description:
      'Celebrates a distinguished career of sustained contribution to metrology, quality engineering, and the wider precision-manufacturing community.',
  },
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
          stroke="#008738"
          strokeWidth="10"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        <text x="60" y="68" textAnchor="middle" className="fill-[#020B43] text-lg font-bold md:text-xl">
          {percent}%
        </text>
      </svg>
      <p className="text-center text-sm font-semibold uppercase leading-snug tracking-wide text-[#020B43] md:text-base">
        {label}
      </p>
    </div>
  );
}

function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="mb-2 text-xs font-bold uppercase tracking-[1.5px] text-[#008738]">{children}</p>
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
            className="rounded-sm border border-white px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white hover:text-[#020B43]"
          >
            Sponsor Now
          </Link>
          <Link
            href="/nominate/"
            className="rounded-sm bg-[#008738] px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#FFD154]"
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
              <h2 className="mb-6 font-bebas text-4xl uppercase tracking-tight text-[#020B43] lg:text-5xl">
                Global Metrology Excellence Awards

              </h2>
              <p className="mb-6 text-lg sm:text-xl leading-relaxed text-gray-600 lg:text-xl">
                The Global Metrology Excellence Awards (GMEA) honour individuals, teams and 
                organizations that demonstrate outstanding achievement, innovation and leadership 
                in metrology, measurement, inspection, calibration, quality assurance and allied technologies.


              </p>
              <p className="mb-8 text-lg sm:text-xl leading-relaxed text-gray-600">
                Recognizing excellence across the entire metrology and quality engineering 
                ecosystem, GMEA celebrates the pioneers, innovators, and leaders who are shaping 
                the future of precision manufacturing and quality assurance.


              </p>
              <div className="grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-4">
                {stats.map(([n, l]) => (
                  <div key={l} className="border-l-2 border-[#008738] pl-4">
                    <p className="text-2xl font-bold text-[#008738]">{n}</p>
                    <p className="mt-1 text-xs text-gray-500">{l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-80 overflow-hidden rounded-sm border border-[#008738]/20 bg-[#FCF8F3] lg:h-96">
              <img src={HERO_IMAGE} alt="Global Metrology Excellence Awards" className="h-full w-full object-cover" />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#FCF8F3] py-16 lg:py-24">
        <Container>
          <div className="mb-12 text-center">
            <SectionEyebrow>Benefits</SectionEyebrow>
            <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#020B43] lg:text-5xl">
              Why Participate?
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyParticipate.map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-sm border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative h-44 w-full overflow-hidden bg-[#FCF8F3] sm:h-48">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 font-bebas text-xl uppercase tracking-wide text-[#020B43]">{item.title}</h3>
                  <p className="text-lg sm:text-xl text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="mb-12 text-center">
            <SectionEyebrow>Categories</SectionEyebrow>
            <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#020B43] lg:text-5xl">
              Award Categories
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.title}
                className="flex flex-col overflow-hidden rounded-sm border border-gray-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#008738] hover:shadow-md"
              >
                <div className="relative h-44 w-full overflow-hidden bg-[#FCF8F3] sm:h-48">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <h3 className="font-bebas text-xl uppercase tracking-wide text-[#020B43] md:text-2xl">
                    {category.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-600 sm:text-xl">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#FCF8F3] py-16 lg:py-24">
        <Container>
          <div className="mb-12 text-center">
            <SectionEyebrow>Process</SectionEyebrow>
            <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#020B43] lg:text-5xl">
              Awards Process
            </h2>
          </div>
          <div className="flex flex-col items-stretch justify-between gap-10 md:flex-row md:items-start md:gap-4">
            {process.map(([icon, title, desc], i) => (
              <div key={title} className="flex w-full items-start md:w-auto md:flex-1">
                <div className="flex flex-1 flex-col items-center gap-4 text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#008738] bg-white text-4xl shadow-sm md:h-28 md:w-28 md:text-5xl">
                    {icon}
                  </div>
                  <p className="text-sm font-bold uppercase leading-snug tracking-wide text-[#008738] md:text-base">
                    {title}
                  </p>
                  <p className="max-w-[13rem] text-sm font-medium leading-relaxed text-[#020B43] md:text-base">
                    {desc}
                  </p>
                </div>
                {i < process.length - 1 && (
                  <span className="mx-2 hidden h-28 items-center justify-center text-3xl font-bold text-[#008738] md:flex">
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
            <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#020B43] lg:text-5xl">
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
                  <span className="mb-2 inline-block rounded-sm border border-[#008738]/40 px-2 py-0.5 text-[10px] uppercase tracking-wide text-[#008738]">
                    {member.role}
                  </span>
                  <h3 className="text-sm font-semibold text-[#020B43]">{member.name}</h3>
                  <p className="mt-1 text-xs text-gray-600">{member.company}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="mx-auto mb-4 max-w-xl text-lg sm:text-xl text-gray-600">
              Our jury comprises global experts from industry, academia and research institutions.
            </p>
            <Link
              href="#jury"
              className="inline-block rounded-sm border border-[#008738] px-6 py-2 text-xs font-bold uppercase tracking-wider text-[#008738] transition-all duration-300 hover:bg-[#008738] hover:text-white"
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
            <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#020B43] lg:text-5xl">
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
            <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#020B43] lg:text-5xl">
              Our Sponsors
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg sm:text-xl text-gray-600">
              Proudly supported by leading organizations sponsoring the Global Metrology Excellence Awards.
            </p>
          </div>
          <PartnerTrack items={sponsors} />
        </Container>
      </section>

      <section className="overflow-hidden bg-[#FCF8F3] py-16 lg:py-24">
        <Container>
          <div className="mb-12 text-center">
            <SectionEyebrow>Supporters</SectionEyebrow>
            <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#020B43] lg:text-5xl">
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
            className="flex w-[220px] min-h-[180px] flex-shrink-0 flex-col items-center justify-center gap-4 rounded-sm border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#008738] hover:shadow-md md:w-[260px]"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#008738]/10">
              <span className="text-2xl font-bold text-[#008738]">{item.role.charAt(0)}</span>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-[#020B43]">{item.name}</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-[#008738]">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
