// app/conference/page.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import BackToTop from '@/components/layout/BackToTop';
import Container from '@/components/ui/container';
import Image from 'next/image';
import Link from 'next/link';

// ==================== CONFERENCE PROGRAM DATA ====================
const programData = [
    {
        day: "Day 1 Theme : Future of Tyre Manufacturing – Innovation & Automation",
        date: "October 08, 2026",
        description: "*For delegates",
        sessions: [
            { time: "09:00 – 09:35", title: "Registration & Hi Tea" },
            { time: "09:35 – 09:40", title: "Lamp Lighting & Inauguration" },
            { time: "09:40 – 09:55", title: "Welcome Address", speakers: [{ name: "Mr. Rajesh Mehta", position: "MD, Tyre Expo Organizing Committee" }] },
            { time: "09:55 – 10:15", title: "Inaugural Keynote – India's Tyre Industry: Roadmap to Global Leadership", speakers: [{ name: "Dr. Suresh Kumar", position: "President, Automotive Tyre Manufacturers Association" }] },
            { time: "10:15 – 11:30", title: "Panel Discussion : Smart Manufacturing & Industry 4.0 in Tyre Production", description: "Session Topics:", topics: [{ id: 1, title: "AI and Machine Learning in Tyre Manufacturing" }, { id: 2, title: "IoT-enabled Production Lines" }, { id: 3, title: "Predictive Maintenance & Quality Control" }], moderator: { name: "Dr. Robert Chen", position: "Head of Technology, Bridgestone" }, speakers: [{ name: "Sarah Johnson", position: "Director, Michelin" }, { name: "Prof. Markus Weber", position: "Fraunhofer Institute" }, { name: "Lisa Zhang", position: "VP Manufacturing, Continental" }] },
            { time: "11:30 – 12:00", title: "Technical Session 1 : Advanced Rubber Compounds & Material Innovation", speakers: [{ name: "Dr. Anita Desai", position: "Research Director, Apollo Tyres" }] },
            { time: "12:00 – 12:30", title: "Technical Session 2 : High-Performance Materials for Green Tyres", speakers: [{ name: "James Wilson", position: "CTO, Goodyear" }] },
            { time: "12:30 – 13:00", title: "Fireside Chat : Sustainable Raw Materials for Next-Gen Tyres", description: "• Bio-based materials • Recycled rubber innovations • Reducing carbon footprint" },
            { time: "13:00 – 14:00", title: "Networking Lunch" },
            { time: "14:00 – 14:30", title: "Technical Session 3 : Smart Tyre Sensors & IoT Integration", speakers: [{ name: "Dr. Elena Petrova", position: "Head of Innovation, Nokian Tyres" }] },
            { time: "14:30 – 15:30", title: "Panel Discussion : Automation & Robotics in Tyre Manufacturing", description: "Session Topics:", topics: [{ id: 1, title: "Robotic process automation in tyre assembly" }, { id: 2, title: "Automated quality inspection systems" }, { id: 3, title: "Lights-out manufacturing capabilities" }], moderator: { name: "Michael Brown", position: "CEO, Tyre Robotics Solutions" }, speakers: [{ name: "Sarah Johnson", position: "Director, Michelin" }, { name: "James Wilson", position: "CTO, Goodyear" }] },
            { time: "15:30 – 16:00", title: "Networking Hi Tea" },
            { time: "16:00 – 16:30", title: "Technical Session 4 : Tyre Testing & Quality Assurance", speakers: [{ name: "Prof. Markus Weber", position: "Fraunhofer Institute" }] },
            { time: "16:30 – 17:00", title: "Technical Session 5 : Digital Twin Technology in Tyre Design", speakers: [{ name: "Lisa Zhang", position: "VP Manufacturing, Continental" }] },
            { time: "17:00 – 17:10", title: "Closing Remarks Day 1" }
        ]
    },
    {
        day: "Day 2 Theme : Sustainability & Circular Economy in Tyre Industry",
        date: "October 09, 2026",
        description: "*For delegates of all categories",
        sessions: [
            { time: "09:30 – 10:00", title: "Registration & Hi Tea" },
            { time: "10:00 – 11:00", title: "Panel Discussion : Circular Economy & Tyre Recycling", description: "Session Topics:", topics: [{ id: 1, title: "End-of-life tyre management" }, { id: 2, title: "Recycling technologies & innovations" }, { id: 3, title: "Regulatory compliance & EPR norms" }], moderator: { name: "Michael Brown", position: "CEO, Tyre Recycling Solutions" }, speakers: [{ name: "Dr. Anita Desai", position: "Apollo Tyres" }, { name: "Prof. Markus Weber", position: "Fraunhofer Institute" }] },
            { time: "11:00 – 11:30", title: "Technical Session 6 : Sustainable Materials for Eco-Friendly Tyres", speakers: [{ name: "Dr. Anita Desai", position: "Research Director, Apollo Tyres" }] },
            { time: "11:30 – 12:00", title: "Fireside Chat : Reducing Carbon Footprint in Tyre Manufacturing", description: "• Energy-efficient production • Renewable energy integration • Carbon-neutral initiatives" },
            { time: "12:00 – 12:30", title: "Technical Session 7 : Advanced Recycling Technologies", speakers: [{ name: "Michael Brown", position: "CEO, Tyre Recycling Solutions" }] },
            { time: "12:30 – 13:00", title: "Technical Session 8 : Bio-Based Materials for Tyre Production", speakers: [{ name: "Dr. Elena Petrova", position: "Head of Innovation, Nokian Tyres" }] },
            { time: "13:00 – 14:00", title: "Networking Lunch" },
            { time: "14:00 – 15:00", title: "Panel Discussion : Global Trends & Market Opportunities", description: "Session Topics:", topics: [{ id: 1, title: "Emerging markets & export opportunities" }, { id: 2, title: "Global supply chain dynamics" }, { id: 3, title: "Trade policies & standards compliance" }], moderator: { name: "Dr. Robert Chen", position: "Head of Technology, Bridgestone" }, speakers: [{ name: "James Wilson", position: "CTO, Goodyear" }, { name: "Lisa Zhang", position: "VP Manufacturing, Continental" }] },
            { time: "15:00 – 15:30", title: "Networking Hi Tea" },
            { time: "15:30 – 16:00", title: "Technical Session 9 : Smart Mobility & Future Tyre Technologies", speakers: [{ name: "Dr. Robert Chen", position: "Head of Technology, Bridgestone" }] },
            { time: "16:00 – 16:30", title: "Technical Session 10 : AI-Driven Quality Control Systems", speakers: [{ name: "Sarah Johnson", position: "Director, Michelin" }] },
            { time: "16:30 – 17:00", title: "Closing Ceremony & Awards", description: "Recognition of industry leaders & innovation awards" },
            { time: "17:00 – 17:10", title: "Vote of Thanks" }
        ]
    }
];

// ==================== SPEAKERS DATA ====================
const speakersData = [
    { id: '1', name: 'Dr. Robert Chen', title: 'Head of Tyre Technology', company: 'Bridgestone Corporation', imageUrl: 'https://regional-cdn.itegroupnews.com/Aleksandr_Pistun_f52df668a9.png', session: 'Future of Smart Tyres', time: 'Day 1, 10:00 AM' },
    { id: '2', name: 'Sarah Johnson', title: 'Director of Sustainability', company: 'Michelin', imageUrl: 'https://regional-cdn.itegroupnews.com/Kondrateva_1_79bf33c0ac.png', session: 'Sustainable Materials', time: 'Day 1, 11:45 AM' },
    { id: '3', name: 'Prof. Markus Weber', title: 'Head of Rubber Technology', company: 'Fraunhofer Institute', imageUrl: 'https://regional-cdn.itegroupnews.com/Shulcz_45477a7a66.png', session: 'Advanced Compounds', time: 'Day 1, 2:00 PM' },
    { id: '4', name: 'Lisa Zhang', title: 'VP of Manufacturing', company: 'Continental', imageUrl: 'https://regional-cdn.itegroupnews.com/Sorokousova_a6593878a3.png', session: 'Industry 4.0', time: 'Day 1, 3:45 PM' },
    { id: '5', name: 'James Wilson', title: 'CTO', company: 'Goodyear', imageUrl: 'https://regional-cdn.itegroupnews.com/Sorokousova_a6593878a3.png', session: 'AI Quality Control', time: 'Day 2, 10:00 AM' },
    { id: '6', name: 'Dr. Anita Desai', title: 'Research Director', company: 'Apollo Tyres', imageUrl: 'https://regional-cdn.itegroupnews.com/uehjd_9ead53b16a.png', session: 'Green Materials', time: 'Day 2, 11:45 AM' },
    { id: '7', name: 'Michael Brown', title: 'CEO', company: 'Tyre Recycling Solutions', imageUrl: 'https://regional-cdn.itegroupnews.com/uehjd_9ead53b16a.png', session: 'Recycling Tech', time: 'Day 2, 2:00 PM' },
    { id: '8', name: 'Dr. Elena Petrova', title: 'Head of Innovation', company: 'Nokian Tyres', imageUrl: 'https://regional-cdn.itegroupnews.com/Kuzneczov_feddd81b00.png', session: 'Smart Sensors', time: 'Day 2, 3:45 PM' }
];

// ==================== FAQ DATA ====================
const faqItems = [
    { id: 1, question: "When will Tyre Expo 2026 take place?", answer: "October 08-09, 2026" },
    { id: 2, question: "Where will the conference be held?", answer: "Auto Cluster Exhibition Centre, Chinchwad, Pune, India" },
    { id: 3, question: "Can I participate in Tyre Expo 2026 online?", answer: "No. Tyre Expo 2026 will be held offline at the venue." },
    { id: 4, question: "Will there be recordings of the sessions?", answer: "No. However, delegates will receive presentation materials (with speaker approval)." },
    { id: 5, question: "Can I get a ticket refund?", answer: "Yes, but only within specified deadlines. Refund rules depend on cancellation timing." },
    { id: 6, question: "Is there a group discount available?", answer: "Yes, group discounts are available for 3 or more delegates booking together." }
];

// ==================== COMPONENTS ====================

// Hero Section
function HeroSection() {
    return (
        <div className="animated-block">
            <div className="animated-block-target">
                <div className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] w-full overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
                        <div className="absolute inset-0 bg-[url('https://www.team-bhp.com/forum/attachments/tyre-alloy-wheel-section/2716695d1737442979-bharat-mobility-expo-2025-india-international-tyre-show-2025-dscf1158.jpg')] bg-cover bg-center scale-110" />
                    </div>
                    <Container>
                        <div className="relative z-20 flex min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] w-full items-center py-12 sm:py-16 lg:py-20">
                            <div className="max-w-3xl space-y-6">
                                <div className="inline-block px-4 py-1.5 bg-[#CC9808]/20 backdrop-blur-sm border border-[#CC9808]/30 rounded-sm">
                                    <span className="text-[#CC9808] font-bold text-xs uppercase tracking-wider">
                                        October 08-09, 2026 | Pune, India
                                    </span>
                                </div>
                                <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl text-white leading-[1.05] tracking-tight uppercase">
                                    ITS TYRE EXPO <span className="text-[#CC9808]">CONFERENCE 2026</span>
                                </h1>
                                <p className="text-base sm:text-lg md:text-xl text-gray-250 leading-relaxed font-sans max-w-2xl">
                                    International Conference on Tyre Manufacturing Technology, Rubber Compounds, Automation, and Sustainable Solutions
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                    <Link href="/visitor-registration">
                                        <button className="bg-[#CC9808] hover:bg-[#03193D] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer">
                                            Become a Delegate
                                        </button>
                                    </Link>
                                    <Link href="/become-partner">
                                        <button className="border border-white hover:bg-white hover:text-[#03193D] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer bg-transparent">
                                            Become a Partner
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
}

// About Section
function AboutSection() {
    const stats = [
        { value: "300+", label: "Industry Leaders" },
        { value: "30+", label: "Expert Speakers" },
        { value: "15+", label: "Technical Sessions" },
        { value: "20+", label: "Countries" }
    ];

    return (
        <Container>
            <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
                <div className="animated-block-target">
                    <div className="w-full grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
                        <div className="order-2 lg:order-1 space-y-6">
                          <div className="space-y-3">
                            <p className="text-[#CC9808] text-xs font-bold uppercase tracking-wider">About The Conference</p>
                            <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl leading-tight text-[#03193D] uppercase">
                                Where <span className="text-[#CC9808]">Innovation</span> Meets <span className="text-[#CC9808]">Excellence</span>
                            </h2>
                          </div>
                          <p className="text-base sm:text-lg leading-relaxed text-gray-705 font-sans">
                              ITS Tyre Expo 2026 is the premier international conference dedicated to tyre manufacturing technology,
                              innovation, and sustainability. Join industry leaders, rubber compounding technology experts, and decision-makers
                              from across the globe to dissect upcoming market shifts and manufacturing advancements.
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#FCF8F3] border border-gray-100 p-6 rounded-sm shadow-sm">
                              {stats.map((stat, idx) => (
                                  <div key={idx} className="text-center">
                                      <h3 className="text-3xl font-bebas text-[#CC9808] uppercase font-bold">{stat.value}</h3>
                                      <p className="text-[10px] uppercase font-bold text-gray-600 mt-1 tracking-wider">{stat.label}</p>
                                  </div>
                              ))}
                          </div>
                        </div>
                        <div className="order-1 lg:order-2 relative h-[300px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-sm border border-gray-150 bg-gray-100">
                            <Image
                                src="https://www.pace-tyres.com/static/upload/image/20230915/1694772403135963.jpg"
                                alt="Tyre Conference"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

// Speakers Section
function SpeakersSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const loopedSpeakers = [...speakersData, ...speakersData];

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        autoScrollRef.current = setInterval(() => {
            if (isHovered) return;
            const maxScrollLeft = container.scrollWidth - container.clientWidth;
            if (container.scrollLeft >= maxScrollLeft - 1) {
                container.scrollTo({ left: 0, behavior: 'auto' });
            } else {
                container.scrollBy({ left: 1, behavior: 'auto' });
            }
        }, 20);

        return () => {
            if (autoScrollRef.current) clearInterval(autoScrollRef.current);
        };
    }, [isHovered]);

    return (
        <Container>
            <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
                <div className="animated-block-target">
                    <div className="text-center mb-10 max-w-2xl mx-auto space-y-3">
                        <p className="text-xs font-bold text-[#CC9808] uppercase tracking-wider">Speakers</p>
                        <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-[#03193D] uppercase">
                            Industry <span className="text-[#CC9808]">Experts</span>
                        </h2>
                        <p className="text-sm text-gray-650 leading-relaxed font-sans">
                            Leading voices from global tyre manufacturers, technology providers, and research institutions
                        </p>
                    </div>

                    <div
                        ref={scrollContainerRef}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="flex overflow-x-auto overflow-y-visible gap-6 pb-8"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {loopedSpeakers.map((speaker, index) => (
                            <div key={index} className="flex-shrink-0 w-[260px] sm:w-[300px] group cursor-pointer">
                                <div className="relative flex flex-col justify-between overflow-hidden rounded-sm border border-gray-100 bg-[#FCF8F3] shadow-sm hover:shadow-md transition-all duration-300">
                                    <div>
                                      <div className="relative h-[260px] sm:h-[300px] w-full overflow-hidden bg-gray-100 rounded-t-sm">
                                          <Image
                                              src={speaker.imageUrl}
                                              alt={speaker.name}
                                              fill
                                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 font-sans">
                                              <p className="text-white text-xs font-bold uppercase tracking-wider">{speaker.session}</p>
                                              <p className="text-gray-300 text-[10px] uppercase font-bold mt-1">{speaker.time}</p>
                                          </div>
                                      </div>
                                      <div className="p-5 font-sans">
                                          <h3 className="font-bebas text-2xl text-[#03193D] group-hover:text-[#CC9808] transition-colors uppercase font-bold">
                                              {speaker.name}
                                          </h3>
                                          <p className="text-[#CC9808] text-xs font-bold uppercase tracking-wide mt-1">{speaker.title}</p>
                                          <p className="text-gray-500 text-xs mt-1">{speaker.company}</p>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
}

// Conference Programme Section
function ConferenceProgramme() {
    const [activeDay, setActiveDay] = useState(0);
    const selectedDay = programData[activeDay];

    return (
        <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
            <div className="animated-block-target">
                <div className="bg-[#FCF8F3] py-16 border-t border-b border-gray-150">
                    <Container>
                        <div className="text-center mb-8 space-y-3">
                            <p className="text-xs font-bold text-[#CC9808] uppercase tracking-wider">Schedule</p>
                            <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-[#03193D] uppercase">
                                Conference <span className="text-[#CC9808]">Programme</span>
                            </h2>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {programData.map((day, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveDay(index)}
                                    className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 border rounded-sm cursor-pointer ${activeDay === index
                                        ? "bg-[#CC9808] border-[#CC9808] text-white shadow-sm"
                                        : "bg-white border-gray-300 text-gray-700 hover:bg-slate-50"
                                        }`}
                                >
                                    {day.date}
                                </button>
                            ))}
                        </div>

                        <div className="bg-white border border-gray-100 rounded-sm p-6 sm:p-8 shadow-sm">
                            <div className="mb-6 pb-4 border-b border-gray-200">
                                <h3 className="font-bebas text-2xl text-[#03193D] uppercase font-bold">{selectedDay.day}</h3>
                                <p className="mt-1 text-xs font-bold text-[#CC9808] uppercase tracking-wider">{selectedDay.description}</p>
                            </div>

                            <div className="space-y-4">
                                {selectedDay.sessions.map((session, idx) => (
                                    <div key={idx} className="group hover:bg-[#FCF8F3] p-4 rounded-sm border border-transparent hover:border-gray-100 transition-all duration-350">
                                        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-3 md:gap-6 items-start font-sans">
                                            <div className="text-[#CC9808] font-bold text-xs uppercase tracking-wider pt-0.5">{session.time}</div>
                                            <div className="space-y-2">
                                                <h4 className="text-base sm:text-lg font-bold text-[#03193D] group-hover:text-[#CC9808] transition-colors uppercase font-sans">
                                                    {session.title}
                                                </h4>
                                                {session.description && (
                                                    <p className="text-xs text-gray-650 font-medium leading-relaxed">{session.description}</p>
                                                )}
                                                {session.topics && (
                                                    <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600 leading-relaxed pt-1">
                                                        {session.topics.map(topic => (
                                                            <li key={topic.id}>{topic.title}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                                {session.speakers && (
                                                    <div className="flex flex-wrap gap-4 pt-2">
                                                        {session.speakers.map((speaker, i) => (
                                                            <p key={i} className="text-xs text-gray-500 font-semibold bg-gray-50 px-2.5 py-1 border border-gray-150 rounded-sm">
                                                                <span className="text-[#CC9808]">Speaker:</span> {speaker.name} ({speaker.position})
                                                            </p>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
}

// Why Attend Section
function WhyAttendSection() {
    const reasons = [
        { icon: "🎯", title: "Stay Updated on Key Industry Developments", description: "Gain insights into the latest trends in tyre manufacturing, automation, and sustainable materials." },
        { icon: "📈", title: "Insights for Business Growth", description: "Discover new opportunities for business expansion and emerging technologies." },
        { icon: "🤝", title: "Networking Opportunities", description: "Connect with industry leaders, experts, and decision-makers from global tyre companies." },
        { icon: "💡", title: "Innovation Showcase", description: "Experience cutting-edge technologies and solutions from leading manufacturers." },
        { icon: "🌍", title: "Global Perspective", description: "Learn from international case studies and best practices." },
        { icon: "🏆", title: "Recognition & Awards", description: "Celebrate excellence in tyre manufacturing innovation." }
    ];

    return (
        <Container>
            <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
                <div className="animated-block-target">
                    <div className="text-center mb-10 space-y-3">
                        <p className="text-xs font-bold text-[#CC9808] uppercase tracking-wider">Why Attend</p>
                        <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-[#03193D] uppercase">
                            Why Attend <span className="text-[#CC9808]">ITS Tyre Expo 2026</span>
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {reasons.map((reason, idx) => (
                            <div key={idx} className="relative flex flex-col overflow-hidden rounded-sm border border-gray-100 bg-[#FCF8F3] p-6 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="text-4xl mb-4">{reason.icon}</div>
                                <h3 className="font-bebas text-2xl text-[#CC9808] uppercase font-bold">{reason.title}</h3>
                                <p className="mt-3 text-xs text-gray-650 font-sans leading-relaxed">{reason.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
}

// Become Delegate Section
function BecomeDelegate() {
    const packages = [
        { title: "Student", price: "₹ 3,500", features: ["Access to all technical sessions", "Conference kit", "Entry to exhibition area", "Certificate of Participation", "Lunch & refreshments"] },
        { title: "General", price: "₹ 6,000", features: ["Full access to all sessions", "Conference kit", "Networking lunch & tea breaks", "B2B networking opportunity", "Access to speakers' presentations", "Certificate of Participation"] },
        { title: "Group of 3", price: "₹ 15,000", features: ["Full conference access for 3", "Priority seating", "Company name recognition", "Networking lunch & tea breaks", "Digital presentations access", "Participation certificates", "Priority B2B meeting assistance"] }
    ];

    return (
        <Container>
            <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
                <div className="animated-block-target">
                    <div className="text-center mb-10 space-y-3">
                        <p className="text-xs font-bold text-[#CC9808] uppercase tracking-wider">Registration</p>
                        <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-[#03193D] uppercase">
                            Become a <span className="text-[#CC9808]">Delegate</span>
                        </h2>
                        <p className="text-xs font-bold text-gray-505 uppercase tracking-wide">Prices include GST</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
                        {packages.map((pkg, idx) => (
                            <div key={idx} className="relative flex flex-col justify-between overflow-hidden rounded-sm border border-gray-100 bg-[#FCF8F3] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                                <div>
                                    <div className="text-center mb-6 border-b border-gray-200 pb-4">
                                        <h3 className="font-bebas text-2xl text-[#03193D] uppercase font-bold">{pkg.title}</h3>
                                        <div className="mt-2 text-4xl font-bebas text-[#CC9808] font-bold">{pkg.price}</div>
                                    </div>
                                    <ul className="space-y-3 mb-8 font-sans">
                                        {pkg.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-xs text-gray-650 leading-relaxed">
                                                <span className="text-[#CC9808] font-bold">✓</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button className="w-full bg-[#CC9808] hover:bg-[#03193D] text-white py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer">
                                    REGISTER NOW
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
}

// Venue Section
function VenueSection() {
    return (
        <Container>
            <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
                <div className="animated-block-target">
                    <div className="w-full grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
                        <div className="order-2 lg:order-1 space-y-6">
                          <div className="space-y-3">
                            <p className="text-xs font-bold text-[#CC9808] uppercase tracking-wider">Venue</p>
                            <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-[#03193D] uppercase leading-tight">
                                Event <span className="text-[#CC9808]">Location</span>
                            </h2>
                          </div>
                          <div>
                              <h3 className="text-lg font-bold text-[#03193D] uppercase font-sans">Auto Cluster Exhibition Centre</h3>
                              <p className="mt-2 text-sm text-gray-600 leading-relaxed font-sans">
                                  Chinchwad East, Old Mumbai - Pune Hwy, MIDC, Chinchwad,<br />
                                  Pimpri-Chinchwad, Maharashtra 411019, India
                              </p>
                          </div>
                          <div className="space-y-3 font-sans">
                              <div className="flex items-center gap-3 p-3 bg-[#FCF8F3] border border-gray-100 rounded-sm">
                                  <span className="text-2xl">✈️</span>
                                  <div>
                                      <span className="font-bold text-xs uppercase tracking-wider text-[#03193D]">From Airport:</span>
                                      <span className="text-gray-650 text-xs font-medium ml-2">15 km, 30 minutes</span>
                                  </div>
                              </div>
                              <div className="flex items-center gap-3 p-3 bg-[#FCF8F3] border border-gray-100 rounded-sm">
                                  <span className="text-2xl">🚂</span>
                                  <div>
                                      <span className="font-bold text-xs uppercase tracking-wider text-[#03193D]">From Railway Station:</span>
                                      <span className="text-gray-650 text-xs font-medium ml-2">8 km, 20 minutes</span>
                                  </div>
                              </div>
                              <div className="flex items-center gap-3 p-3 bg-[#FCF8F3] border border-gray-100 rounded-sm">
                                  <span className="text-2xl">🏨</span>
                                  <div>
                                      <span className="font-bold text-xs uppercase tracking-wider text-[#03193D]">Nearby Hotels:</span>
                                      <span className="text-gray-650 text-xs font-medium ml-2">Within 2 km radius</span>
                                  </div>
                              </div>
                          </div>
                        </div>
                        <div className="order-1 lg:order-2 relative h-[300px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-sm border border-gray-150 bg-gray-100 shadow-sm">
                            <iframe
                                src="https://www.google.com/maps?q=Pune,India&output=embed"
                                className="w-full h-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

// Organizer Section
function OrganizerSection() {
    return (
        <Container>
            <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
                <div className="animated-block-target">
                    <div className="text-center mb-10 space-y-3">
                        <p className="text-xs font-bold text-[#CC9808] uppercase tracking-wider">Organizer</p>
                        <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-[#03193D] uppercase">
                            Behind the <span className="text-[#CC9808]">Event</span>
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto font-sans">
                        <div className="relative flex flex-col justify-between overflow-hidden rounded-sm border border-gray-100 bg-[#FCF8F3] p-6 shadow-sm">
                            <h3 className="font-bebas text-2xl text-[#CC9808] uppercase font-bold">Maxx Business Media</h3>
                            <p className="mt-3 text-xs text-gray-650 leading-relaxed">
                                Tyre Expo is organized by Maxx Business Media, a leading exhibition organizer with a strong portfolio
                                of industrial trade fairs and conferences across key manufacturing sectors.
                            </p>
                        </div>
                        <div className="relative flex flex-col justify-between overflow-hidden rounded-sm border border-gray-100 bg-[#FCF8F3] p-6 shadow-sm">
                            <h3 className="font-bebas text-2xl text-[#03193D] uppercase font-bold">Contact Information</h3>
                            <div className="mt-3 space-y-2 text-xs text-gray-650 leading-relaxed font-semibold">
                                <p>📧 info@tyre-expo.com</p>
                                <p>📞 +91 1234567890</p>
                                <p>🌐 www.tyre-expo.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

// Contacts Section
function Contacts() {
    return (
        <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
            <div className="animated-block-target">
                <div className="bg-[#FCF8F3] py-16 border-t border-b border-gray-150">
                    <Container>
                        <div className="text-center mb-10 space-y-3">
                            <p className="text-xs font-bold text-[#CC9808] uppercase tracking-wider">Get In Touch</p>
                            <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-[#03193D] uppercase">
                                Contact <span className="text-[#CC9808]">Information</span>
                            </h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto font-sans">
                            <div className="relative flex flex-col items-center text-center overflow-hidden rounded-sm border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-gray-50 border border-gray-150 mb-4">
                                    <span className="text-2xl">🤝</span>
                                </div>
                                <h3 className="font-bebas text-2xl text-[#03193D] uppercase font-bold">For Participation & Partnership</h3>
                                <div className="mt-3 space-y-1.5 text-xs text-gray-650 font-semibold">
                                    <p>📧 partnership@tyre-expo.com</p>
                                    <p>📞 +91 9876543210</p>
                                </div>
                            </div>
                            <div className="relative flex flex-col items-center text-center overflow-hidden rounded-sm border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-gray-50 border border-gray-150 mb-4">
                                    <span className="text-2xl">🎤</span>
                                </div>
                                <h3 className="font-bebas text-2xl text-[#03193D] uppercase font-bold">For Speaking Opportunities</h3>
                                <div className="mt-3 space-y-1.5 text-xs text-gray-650 font-semibold">
                                    <p>📧 speakers@tyre-expo.com</p>
                                    <p>📞 +91 9876543211</p>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
}

// FAQ Section
function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <Container>
            <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
                <div className="animated-block-target">
                    <div className="text-center mb-10 space-y-3">
                        <p className="text-xs font-bold text-[#CC9808] uppercase tracking-wider">FAQ</p>
                        <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-[#03193D] uppercase">
                            Frequently Asked <span className="text-[#CC9808]">Questions</span>
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-3 font-sans">
                        {faqItems.map((item, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div key={item.id} className="rounded-sm border border-gray-100 bg-white overflow-hidden shadow-sm">
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                        className="flex w-full items-center justify-between p-4 sm:p-5 text-left transition-all hover:bg-gray-50 cursor-pointer"
                                    >
                                        <h3 className="text-base font-bold text-[#03193D] pr-4 uppercase">{item.question}</h3>
                                        <div className="relative shrink-0">
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 15 15"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`size-5 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                                            >
                                                <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="#CC9808" fillRule="evenodd" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    {isOpen && (
                                        <div className="px-4 sm:px-5 pb-5 pt-2 text-xs text-gray-700 leading-relaxed border-t border-gray-100">
                                            {item.answer}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Container>
    );
}

// ==================== MAIN PAGE ====================
export default function ConferencePage() {
    return (
        <div className="intro-animation">
            <div className="page-spacing-wrapper pt-[120px] lg:pt-0">
                <HeroSection />
                <AboutSection />
                <SpeakersSection />
                <ConferenceProgramme />
                <WhyAttendSection />
                <BecomeDelegate />
                <VenueSection />
                <OrganizerSection />
                <Contacts />
                <FAQ />
            </div>
            <BackToTop />

            <style jsx>{`
                .font-bebas {
                    font-family: 'Bebas Neue', cursive;
                }
                .animated-block {
                  opacity: 0;
                  transform: translateY(30px);
                  animation: fadeInUp 0.6s ease forwards;
                }
                @keyframes fadeInUp {
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                .animated-block:nth-child(1) { animation-delay: 0.1s; }
            `}</style>
        </div>
    );
}