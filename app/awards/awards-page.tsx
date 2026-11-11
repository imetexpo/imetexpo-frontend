'use client';

import Link from 'next/link';
import Container from '@/components/ui/container';
import BackToTop from '@/components/layout/BackToTop';
import PageHero from '@/components/layout/PageHero';

const HERO_IMAGE = '/images/gmea_awards.png';

const stats = [
  ['17', 'Award Categories'],
  ['200+', 'Nominations Expected'],
  ['500+', 'Industry Leaders'],
  ['25+', 'Expert Jury Members'],
];

const whyParticipate = [
  {
    image: '/images/awards2.png',
    title: 'Industry Recognition',
    description: 'Gain recognition among global leaders in metrology and precision engineering.',
  },
  {
    image: '/images/photo-1521737604893-d14cc237f11d.jpg',
    title: 'Global Visibility',
    description: 'Showcase your achievements on an international industry platform.',
  },
  {
    image: '/images/photo-1517245386807-bb43f82c33c4.jpg',
    title: 'Business Networking',
    description: 'Connect with key decision makers and expand your business network.',
  },
  {
    image: '/images/photo-1551836022-d5d88e9218df.jpg',
    title: 'Brand Credibility',
    description: 'Strengthen your brand image and build trust with customers.',
  },
  {
    image: '/images/innovation.png',
    title: 'Innovation Leadership',
    description: 'Position your organization as an innovator and industry trailblazer.',
  },
  {
    image: '/images/photo-1454165804606-c3d57bc86b40.jpg',
    title: 'Benchmark Against Industry',
    description: 'Measure your performance and stand out from the competition.',
  },
];

const categories = [
  {
    image: '/images/awards/bestmetrology.png',
    title: 'Best Metrology Company Award',
    description:
      'Recognizing overall excellence in metrology solutions, innovation, and industry impact.',
  },
  {
    image: '/images/awards/innovatoin.png',
    title: 'Innovation in Measurement Award',
    description:
      'Honouring outstanding innovation in measurement technologies, precision instruments, and advanced solutions.',
  },
  {
    image: '/images/awards/calibration.png',
    title: 'Excellence in Calibration Award',
    description:
      'Awarded to organizations demonstrating the highest standards in calibration services, accuracy, and reliability.',
  },
  {
    image: '/images/awards/quality.png',
    title: 'Quality Leadership Award',
    description:
      'Recognizing leadership in driving quality culture, continuous improvement, and customer satisfaction.',
  },
  {
    image: '/images/awards/cmm.png',
    title: 'CMM Technology Award',
    description:
      'For excellence in design, performance, and advancement in coordinate measuring machine (CMM) technologies.',
  },
  {
    image: '/images/awards/inspection.png',
    title: 'Smart Inspection Solution Award',
    description:
      'Honouring innovative inspection solutions, machine vision, and automated optical systems that drive accuracy and smart manufacturing.',
  },
  {
    image: '/images/awards/emerging.png',
    title: 'Emerging Metrology Company Award',
    description:
      'Recognizing emerging companies that are shaping the future of metrology with innovation, potential, and performance.',
  },
  {
    image: '/images/awards/bestlab.png',
    title: 'Best Calibration Lab Award',
    description:
      'Honouring calibration laboratories that demonstrate exceptional accuracy, reliability, and adherence to global standards.',
  },
  {
    image: '/images/awards/innovation_metrology.png',
    title: 'Innovation in Metrology Award',
    description:
      'Honouring innovative solutions that advance metrology technology and drive industrial transformation.',
  },
  {
    image: '/images/awards/metrology_edu.png',
    title: 'Metrology Education & Training Award',
    description:
      'Recognizing institutions and programs that empower the next generation of metrology professionals through excellence in education and training.',
  },
  {
    image: '/images/awards/startup.png',
    title: 'Metrology Start-Up Award',
    description:
      'Celebrating innovative start-ups driving disruption and delivering next-generation metrology solutions for a smarter tomorrow.',
  },
  {
    image: '/images/awards/quality_champ.png',
    title: 'Quality Champion Award',
    description:
      'Honouring organizations that uphold the highest standards of quality, precision, and reliability in metrology and continuous improvement.',
  },
  {
    image: '/images/awards/outstamding.png',
    title: 'Outstanding Metrology Solution Award',
    description:
      'Celebrating organizations that deliver ingenious metrology solutions, drive operational excellence, and create measurable impact across industries.',
  },
  {
    image: '/images/awards/lifetime.png',
    title: 'Lifetime Achievement Award',
    description:
      'Recognizing exceptional individuals who have made outstanding contributions to the advancement of metrology and quality, leaving a lasting legacy that inspires excellence.',
  },
  {
    image: '/images/awards/young.png',
    title: 'Young Professional Award',
    description:
      'Honouring young professionals who demonstrate exceptional promise, innovation, and dedication in advancing metrology, measurement, and quality excellence.',
  },
  {
    image: '/images/awards/sustain.png',
    title: 'Sustainability Award',
    description:
      'Honouring organizations that lead with purpose and responsibility—integrating sustainable practices, reducing environmental impact, and building a better tomorrow through innovation in metrology and quality.',
  },
  {
    image: '/images/awards/r&d.png',
    title: 'R&D Excellence Award',
    description:
      'Honouring organizations that demonstrate outstanding commitment to research and development, creating innovative metrology solutions that advance technology, improve accuracy, and drive industry progress.',
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
          stroke="#00A1B1"
          strokeWidth="10"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        <text x="60" y="68" textAnchor="middle" className="fill-[#003A77] text-lg font-bold md:text-xl">
          {percent}%
        </text>
      </svg>
      <p className="text-center text-sm font-semibold uppercase leading-snug tracking-wide text-[#003A77] md:text-base">
        {label}
      </p>
    </div>
  );
}

function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="mb-2 text-xs font-bold uppercase tracking-[1.5px] text-[#00A1B1]">{children}</p>
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
            className="rounded-sm border border-white px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white hover:text-[#003A77]"
          >
            Sponsor Now
          </Link>
          <Link
            href="/register?t=awards"
            className="rounded-sm bg-[#00A1B1] px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#FFD154]"
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
              <h2 className="mb-6 font-bebas text-4xl uppercase tracking-tight text-[#003A77] lg:text-5xl">
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
                  <div key={l} className="border-l-2 border-[#00A1B1] pl-4">
                    <p className="text-2xl font-bold text-[#00A1B1]">{n}</p>
                    <p className="mt-1 text-xs text-gray-500">{l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-80 overflow-hidden rounded-sm border border-[#00A1B1]/20 bg-[#FCF8F3] lg:h-96">
              <img src={HERO_IMAGE} alt="Global Metrology Excellence Awards" className="h-full w-full object-cover" />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#FCF8F3] py-16 lg:py-24">
        <Container>
          <div className="mb-12 text-center">
            <SectionEyebrow>Benefits</SectionEyebrow>
            <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#003A77] lg:text-5xl">
              Why Participate?
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyParticipate.map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-sm border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative h-52 w-full overflow-hidden bg-[#FCF8F3] sm:h-56">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 font-bebas text-xl uppercase tracking-wide text-[#003A77]">{item.title}</h3>
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
            <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#003A77] lg:text-5xl">
              Award Categories
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.title}
                href={`/register?t=awards&category=${encodeURIComponent(category.title)}#awards-form`}
                className="group flex flex-col overflow-hidden rounded-sm border border-gray-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00A1B1] hover:shadow-lg"
              >
                <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#05172b]">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 p-6">
                  <div>
                    <h3 className="font-bebas text-xl uppercase tracking-wide text-[#003A77] transition-colors group-hover:text-[#00A1B1] md:text-2xl">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-gray-600 sm:text-lg">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 text-xs font-bold uppercase tracking-wider text-[#00A1B1] group-hover:text-[#003A77]">
                    <span>Nominate for this Category</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#FCF8F3] py-16 lg:py-24">
        <Container>
          <div className="mb-12 text-center">
            <SectionEyebrow>Process</SectionEyebrow>
            <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#003A77] lg:text-5xl">
              Awards Process
            </h2>
          </div>
          <div className="flex flex-col items-stretch justify-between gap-10 md:flex-row md:items-start md:gap-4">
            {process.map(([icon, title, desc], i) => (
              <div key={title} className="flex w-full items-start md:w-auto md:flex-1">
                <div className="flex flex-1 flex-col items-center gap-4 text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#00A1B1] bg-white text-4xl shadow-sm md:h-28 md:w-28 md:text-5xl">
                    {icon}
                  </div>
                  <p className="text-sm font-bold uppercase leading-snug tracking-wide text-[#00A1B1] md:text-base">
                    {title}
                  </p>
                  <p className="max-w-[13rem] text-sm font-medium leading-relaxed text-[#003A77] md:text-base">
                    {desc}
                  </p>
                </div>
                {i < process.length - 1 && (
                  <span className="mx-2 hidden h-28 items-center justify-center text-3xl font-bold text-[#00A1B1] md:flex">
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
            <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#003A77] lg:text-5xl">
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
                  <span className="mb-2 inline-block rounded-sm border border-[#00A1B1]/40 px-2 py-0.5 text-[10px] uppercase tracking-wide text-[#00A1B1]">
                    {member.role}
                  </span>
                  <h3 className="text-sm font-semibold text-[#003A77]">{member.name}</h3>
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
              className="inline-block rounded-sm border border-[#00A1B1] px-6 py-2 text-xs font-bold uppercase tracking-wider text-[#00A1B1] transition-all duration-300 hover:bg-[#00A1B1] hover:text-white"
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
            <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#003A77] lg:text-5xl">
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
            <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#003A77] lg:text-5xl">
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
            <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#003A77] lg:text-5xl">
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
            className="flex w-[220px] min-h-[180px] flex-shrink-0 flex-col items-center justify-center gap-4 rounded-sm border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00A1B1] hover:shadow-md md:w-[260px]"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#00A1B1]/10">
              <span className="text-2xl font-bold text-[#00A1B1]">{item.role.charAt(0)}</span>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-[#003A77]">{item.name}</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-[#00A1B1]">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
