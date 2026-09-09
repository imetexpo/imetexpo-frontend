'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Mic2,
  BarChart3,
  MessageCircle,
  Lightbulb,
  TrendingUp,
  Handshake,
  BadgePercent,
  MapPin,
} from 'lucide-react';
import Container from '@/components/ui/container';
import BackToTop from '@/components/layout/BackToTop';
import {
  HERO_IMAGE,
  aboutStats,
  speakersData,
  programData,
  whyAttend,
  delegatePackages,
  faqItems,
  venueImages,
} from './data';

const aboutIcons = [Users, Mic2, BarChart3, MessageCircle];
const whyIcons = [Lightbulb, TrendingUp, Handshake, BadgePercent];

function HeroSection() {
  return (
    <section className="relative min-h-[50vh] w-full overflow-hidden text-white sm:min-h-[60vh] lg:min-h-[70vh]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
      />
      <div className="absolute inset-0 bg-[#03193D]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#03193D]/90 via-[#03193D]/50 to-transparent" />

      <Container className="relative z-10 flex min-h-[50vh] items-end pb-8 pt-12 sm:min-h-[60vh] sm:pb-12 lg:min-h-[70vh] lg:pb-16">
        <div className="w-full">
          <span className="mb-4 inline-block rounded-sm border border-[#CC9808]/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#CC9808]">
            April 22–23, 2027 · Pune, India
          </span>
          <h1 className="font-bebas text-4xl uppercase leading-none tracking-tight sm:text-5xl lg:text-7xl xl:text-8xl">
            India Tyre Show
            <br />
            <span className="text-[#CC9808]">Summit 2027</span>
          </h1>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end">
            <p className="max-w-3xl text-sm text-white/90 sm:text-base lg:text-xl">
              Global summit on tyre manufacturing, rubber technology, automation and sustainable
              mobility.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row lg:ml-auto">
              <Link
                href="/became-delegate/"
                className="rounded-sm bg-[#CC9808] px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#FFD154] hover:text-[#03193D]"
              >
                Become a Delegate
              </Link>
              <Link
                href="/become-partner/"
                className="rounded-sm border border-white px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white hover:text-[#03193D]"
              >
                Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function AboutSection() {
  return (
    <section>
      <h2 className="mb-8 font-bebas text-4xl uppercase tracking-tight text-[#03193D] sm:text-5xl lg:text-6xl">
        About the <span className="text-[#CC9808]">Summit</span>
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {aboutStats.map((item, index) => {
          const Icon = aboutIcons[index];
          return (
            <div
              key={item.title}
              className="flex gap-4 rounded-sm border border-gray-100 bg-[#FCF8F3] p-5 shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-white text-[#CC9808]">
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-sm leading-relaxed text-gray-700">
                <strong className="text-[#03193D]">{item.title}</strong> {item.body}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SpeakersSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const looped = [...speakersData, ...speakersData];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const timer = setInterval(() => {
      if (isPaused.current) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 1) {
        el.scrollLeft = 0;
      } else {
        el.scrollLeft += 1;
      }
    }, 25);

    return () => clearInterval(timer);
  }, []);

  return (
    <section>
      <div className="mb-8 max-w-3xl">
        <h2 className="font-bebas text-4xl uppercase tracking-tight text-[#03193D] sm:text-5xl lg:text-6xl">
          Top Speakers <span className="text-[#CC9808]">India Tyre Show Summit 2027</span>
        </h2>
        <p className="mt-3 text-sm text-gray-600 sm:text-base">
          The leading voices in tyre manufacturing, rubber technology and quality engineering
        </p>
      </div>
      <div
        ref={containerRef}
        onMouseEnter={() => {
          isPaused.current = true;
        }}
        onMouseLeave={() => {
          isPaused.current = false;
        }}
        className="flex gap-4 overflow-x-auto pb-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {looped.map((speaker, index) => (
          <article
            key={`${speaker.id}-${index}`}
            className="w-[260px] shrink-0 overflow-hidden rounded-sm border border-gray-100 bg-white shadow-sm sm:w-[280px]"
          >
            <div className="relative h-72 overflow-hidden bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={speaker.imageUrl}
                alt={speaker.name}
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#03193D] to-transparent p-4 text-white">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#CC9808]">
                  {speaker.session}
                </p>
                <p className="text-[10px] text-white/80">{speaker.time}</p>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bebas text-2xl uppercase text-[#03193D]">{speaker.name}</h3>
              <p className="text-xs font-bold uppercase tracking-wide text-[#CC9808]">
                {speaker.title}
              </p>
              <p className="mt-1 text-xs text-gray-600">{speaker.company}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProgrammeSection() {
  const [activeDay, setActiveDay] = useState(0);
  const selectedDay = programData[activeDay];

  return (
    <section>
      <h2 className="mb-8 font-bebas text-4xl uppercase tracking-tight text-[#03193D] sm:text-5xl lg:text-6xl">
        Driving Precision, Quality &amp; Smart Manufacturing
      </h2>
      <div className="mb-10 flex flex-wrap gap-3">
        {programData.map((day, index) => (
          <button
            key={day.date}
            type="button"
            onClick={() => setActiveDay(index)}
            className={`rounded-sm px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeDay === index
                ? 'bg-[#CC9808] text-white'
                : 'bg-[#03193D] text-white hover:bg-[#CC9808]'
            }`}
          >
            {day.date}
          </button>
        ))}
      </div>
      <div className="border-t border-gray-200 pt-8">
        <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#CC9808]">
          {selectedDay.description}
        </p>
        <p className="mb-10 text-lg font-semibold text-[#03193D] sm:text-xl">
          {selectedDay.day} · {selectedDay.date}
        </p>
        <div className="space-y-10">
          {selectedDay.sessions.map((session) => (
            <div key={`${session.time}-${session.title}`} className="grid gap-4 md:grid-cols-[160px_1fr]">
              <div className="text-sm font-bold uppercase tracking-wider text-[#CC9808]">
                {session.time}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#03193D] sm:text-xl">{session.title}</h3>
                {session.description && (
                  <p className="mt-2 text-sm text-gray-500">{session.description}</p>
                )}
                {session.topics && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                    {session.topics.map((topic) => (
                      <li key={topic.id}>{topic.title}</li>
                    ))}
                  </ul>
                )}
                {session.speakers && session.speakers.some((s) => s.name) && (
                  <div className="mt-3 space-y-1">
                    {session.speakers
                      .filter((s) => s.name)
                      .map((speaker) => (
                        <p key={speaker.name} className="text-sm text-gray-600">
                          <span className="font-semibold text-[#CC9808]">{speaker.name}</span>
                          {speaker.position ? ` · ${speaker.position}` : ''}
                        </p>
                      ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyAttendSection() {
  return (
    <section>
      <h2 className="mb-8 font-bebas text-4xl uppercase tracking-tight text-[#03193D] sm:text-5xl lg:text-6xl">
        Why Attend <span className="text-[#CC9808]">India Tyre Show Summit 2027</span>
      </h2>
      <div className="space-y-6">
        {whyAttend.map((item, index) => {
          const Icon = whyIcons[index];
          return (
            <div key={item.title} className="flex gap-4 border-b border-gray-100 pb-6 last:border-0">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#FCF8F3] text-[#CC9808]">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#03193D] sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function BecomeDelegateSection() {
  return (
    <section>
      <h2 className="mb-2 font-bebas text-4xl uppercase tracking-tight text-[#03193D] sm:text-5xl lg:text-6xl">
        Become a <span className="text-[#CC9808]">Delegate</span>
      </h2>
      <p className="mb-10 text-sm font-semibold text-gray-600">Prices include GST</p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {delegatePackages.map((pkg) => (
          <div
            key={pkg.id}
            className="flex min-h-[420px] flex-col rounded-sm border border-gray-100 bg-[#FCF8F3] p-6 md:p-8"
          >
            <h3 className="font-bebas text-3xl uppercase text-[#03193D]">{pkg.title}</h3>
            <ul className="mt-5 flex-1 space-y-2">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-0.5 text-[#CC9808]">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-bebas text-4xl text-[#CC9808]">{pkg.price}</p>
            <Link
              href="/became-delegate/"
              className="mt-4 inline-flex items-center justify-center rounded-sm bg-[#CC9808] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#03193D]"
            >
              Register
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function VenueSection() {
  return (
    <section>
      <h2 className="mb-8 font-bebas text-4xl uppercase tracking-tight text-[#03193D] sm:text-5xl lg:text-6xl">
        Venue
      </h2>
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#FCF8F3] text-[#CC9808]">
          <MapPin className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#03193D] sm:text-2xl">
            Auto Cluster Exhibition Centre
          </h3>
          <p className="mt-1 text-sm text-gray-600 sm:text-base">
            Chinchwad East, Old Mumbai - Pune Hwy, MIDC, Chinchwad, Pimpri-Chinchwad, Maharashtra
            411019
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {venueImages.map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt="India Tyre Show venue"
            className="h-56 w-full rounded-sm object-cover"
          />
        ))}
      </div>
    </section>
  );
}

function OrganizerSection() {
  return (
    <section>
      <h2 className="mb-8 font-bebas text-4xl uppercase tracking-tight text-[#03193D] sm:text-5xl lg:text-6xl">
        Organizer
      </h2>
      <div className="space-y-6 text-sm leading-relaxed text-gray-700 sm:text-base lg:text-lg">
        <p>
          The India Tyre Show Summit 2027 is held alongside India Tyre Show 2027 – India’s dedicated
          exhibition for tyre manufacturing, rubber compounding, testing, retreading, recycling, and
          advanced mobility technologies.
        </p>
        <p>
          India Tyre Show is organised by <strong>Maxx Business Media</strong>, a leading organizer
          of industrial exhibitions, conferences, and B2B business forums dedicated to the
          manufacturing sector. Backed by extensive industry expertise and a strong network across
          automotive, tyre, rubber, and advanced manufacturing industries, Maxx Business Media
          delivers high-impact platforms that connect technology providers with key decision-makers.
        </p>
      </div>
    </section>
  );
}

function ContactsSection() {
  return (
    <section>
      <h2 className="mb-8 font-bebas text-4xl uppercase tracking-tight text-[#03193D] sm:text-5xl lg:text-6xl">
        Contacts
      </h2>
      <div className="max-w-xl rounded-sm border border-gray-100 bg-[#FCF8F3] p-6 md:p-8">
        <p className="text-sm font-bold text-[#03193D] sm:text-base">
          For participation and partnership inquiries:
        </p>
        <h3 className="mt-6 font-bebas text-3xl uppercase text-[#03193D]">Padmanabham R</h3>
        <p className="text-sm text-[#CC9808]">Summit Director</p>
        <div className="mt-4 space-y-1 text-sm font-semibold text-[#03193D]">
          <a href="mailto:pad@maxxmedia.in" className="block hover:text-[#CC9808]">
            pad@maxxmedia.in
          </a>
          <a href="tel:+919148319993" className="block hover:text-[#CC9808]">
            +91 91483 19993
          </a>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section>
      <h2 className="mb-8 border-b border-gray-200 pb-6 font-bebas text-4xl uppercase tracking-tight text-[#03193D] sm:text-5xl lg:text-6xl">
        FAQ
      </h2>
      <div className="space-y-2">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.id} className="border-b border-gray-200">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between py-5 text-left"
                aria-expanded={isOpen}
              >
                <h3 className="pr-4 text-base font-semibold text-[#03193D] sm:text-lg">
                  {item.question}
                </h3>
                <span className={`shrink-0 text-[#CC9808] transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-sm leading-relaxed text-gray-600">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function SummitPage() {
  return (
    <div className="intro-animation overflow-hidden bg-white font-sans">
      <HeroSection />
      <div className="space-y-16 py-12 lg:space-y-24 lg:py-20">
        <Container>
          <AboutSection />
        </Container>
        <Container>
          <SpeakersSection />
        </Container>
        <div className="border-y border-gray-100 bg-[#FCF8F3] py-16">
          <Container>
            <ProgrammeSection />
          </Container>
        </div>
        <Container>
          <WhyAttendSection />
        </Container>
        <Container>
          <BecomeDelegateSection />
        </Container>
        <Container>
          <VenueSection />
        </Container>
        <Container>
          <OrganizerSection />
        </Container>
        <div className="border-y border-gray-100 bg-[#FCF8F3] py-16">
          <Container>
            <ContactsSection />
          </Container>
        </div>
        <Container>
          <FAQSection />
        </Container>
      </div>
      <BackToTop />
    </div>
  );
}
