// app/sponsorship-opportunities/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "@/components/ui/container";
import PartnersSection from "@/components/home/PartnersSection";
import BackToTop from "@/components/layout/BackToTop";
import PageHero from "@/components/layout/PageHero";
import LoadingDots from '@/components/ui/LoadingDots';


export default function AdvertisingDetailsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <LoadingDots fullScreen />
    );
  }

  const benefits = [
    {
      title: "Reach Your Target Audience",
      description: "Communicate directly with industry specialists and decision-makers.",
      icon: "/images/4_7579e3b4df.png",
      fallbackIcon: "🎯"
    },
    {
      title: "Increase Stand Traffic",
      description: "Drive more visitors to your booth and create meaningful connections.",
      icon: "/images/5_e69e2d6c8b.png",
      fallbackIcon: "📊"
    },
    {
      title: "Gain a Competitive Edge",
      description: "Stand out among exhibitors and position your brand as an industry leader.",
      icon: "/images/6_1234567890.png",
      fallbackIcon: "⚡"
    },
    {
      title: "Boost Brand Awareness",
      description: "Strengthen your company's image and market visibility.",
      icon: "/images/7_93579318f2.png",
      fallbackIcon: "🏷️"
    },
    {
      title: "Showcase Innovations",
      description: "Highlight new products and services to a highly relevant audience.",
      icon: "/images/8_fa2729f754.png",
      fallbackIcon: "💡"
    },
    {
      title: "Drive Sales & Business Growth",
      description: "Convert exhibition exposure into direct sales opportunities.",
      icon: "/images/9_1c550dbab6.png",
      fallbackIcon: "📈"
    }
  ];

  const sponsorshipTabs = [
    {
      title: "Presenting Sponsor",
      description: "Position your brand at the forefront of INDIAMET Expo with premium visibility across the exhibition website, visitor communications, venue branding, registration promotions, social media and selected official marketing materials.",
      points: [
        "Event branding: “INDIAMET Expo 2027 presented by [Sponsor Name]",
        "Exclusive presenting sponsor recognition across major event branding.",
        "Prime-position logo on the official event website homepage.",
        "Largest sponsor logo on the event backdrop, entrance branding and registration area.,",
        "Logo on official visitor invitations, digital brochures and promotional creatives.",
        "Prominent logo placement on all major email campaigns and social media promotions.",
        "One premium 150 sqm exhibition space (Raw Space)",
        "One exclusive 20-minute keynote or industry presentation, subject to programme approval.",
        "Opportunity to deliver the opening address at the conference.",
        "One sponsored technical session or panel discussion.",
        "One dedicated sponsor interview/video feature.",
        "Up to three dedicated social media promotional posts.",
        "Up to three promotional email mentions.",
        "10 exhibitor/staff badges.",
        "10 VIP/invitation passes.",
        "Sponsor acknowledgement in the post-event report.",
       "Opportunity to distribute company brochures or promotional material at the registration area, subject to approval."
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "/images/presenting.jpg",
      fallbackIcon: "🏆"
    },
    {
      title: "Platinum Sponsor",
      description: "Achieve high-impact visibility among manufacturing, metrology, quality, inspection and engineering professionals through premium venue branding, digital promotion, technical presentation opportunities and product showcase support.",
      points: [
        "Premium logo placement on the event website.",
        "Prominent logo on the main entrance and exhibition branding.",
        "Logo on conference and visitor promotional materials.",
        "One premium 90 sqm exhibition space (Raw Space).",
        "One 15-minute technical presentation, subject to programme approval.",
        "One panel discussion participation opportunity.",
        "One dedicated sponsor interview/video feature.",
        "Up to two dedicated social media promotional posts.",
        "Two email campaign mentions.",
        "8 exhibitor/staff badges.",
        "8 VIP/invitation passes.",
        "Sponsor acknowledgement in the post-event report.",

            ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "/images/platinum.webp",
      fallbackIcon: "🥇"
    },
    {
      title: "Gold Sponsor - 2",
      description: "Strengthen your brand presence with targeted exposure through exhibition signage, website visibility, brochure branding, social media promotion, product features and opportunities to engage relevant industry decision-makers.",
      points: [
       "Logo on the official event website sponsor section.",



"Logo on selected event promotional materials.",
"Prominent logo placement on the conference backdrop.",
"One 60 sqm exhibition space (shell scheme).",
"One 10-minute technical presentation, subject to programme approval.",
"One social media promotional post.",
"One email campaign mention.",
"6 exhibitor/staff badges.",
"6 VIP/invitation passes.",
"Sponsor acknowledgement in the post-event report."
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "/images/gold.webp",
      fallbackIcon: "🥈"
    },
    {
      title: "Silver Sponsor - 2",
      description: "A focused sponsorship option for specialist technology and solution providers seeking visibility among professionals involved in metrology, precision measurement, inspection, testing and quality management.",
      points: [
       
       "Logo on the event website sponsor section.",
"Logo on selected event branding and promotional creatives.",
"One 12 sqm exhibition space (Raw Space).",
"One opportunity to participate in a technical panel, subject to programme approval.",
"One social media sponsor acknowledgement.",
"4 exhibitor/staff badges.",
"4 VIP/invitation passes.",
"Sponsor acknowledgement in the post-event report."
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "/images/silver.jpg",
      fallbackIcon: "🥉"
    },

    {
      title: "Bronze Sponsor - 2",
      description: "A focused sponsorship option for specialist technology and solution providers seeking visibility among professionals involved in metrology, precision measurement, inspection, testing and quality management.",
      points: [
       
       "Logo on the event website sponsor section.",
"Logo on selected event branding and promotional creatives.",
"One 24 sqm exhibition space (Raw Space).",
"One opportunity to participate in a technical panel, subject to programme approval.",
"One social media sponsor acknowledgement.",
"4 exhibitor/staff badges.",
"4 VIP/invitation passes.",
"Sponsor acknowledgement in the post-event report."
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "/images/silver.jpg",
      fallbackIcon: "🥉"
    },
    {
      title: "Visitor Registration Sponsor",
      description: "Associate your brand with the visitor registration experience through registration-area branding, visitor communication visibility, website promotion and selected on-site branding opportunities.",
      points: [
        "Branding at the visitor registration counters and queue management area",
        "Logo presence on selected registration confirmation emails and visitor communications",
        "Website acknowledgement as the official Visitor Registration Sponsor",
        "Opportunity to include a branded message or insert in selected registration materials",
        "High dwell-time visibility among every visitor completing on-site or pre-show registration",
        "Selected directional or counter-top branding in the registration zone",
        "Direct association with the first official touchpoint of the exhibition journey",
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "/images/visitor.webp",
      fallbackIcon: "🎟️"
    },
    {
      title: "Official Lanyard Sponsor",
      description: "Put your brand directly in the hands of exhibition visitors with branding opportunities on visitor badges and selected registration-area communication materials.",
      points: [
        
"Exclusive branding on visitor and exhibitor lanyards.",
"Sponsor logo printed alongside INDIAMET branding.",
"Logo on event website and sponsor board.",
"Social media sponsor announcement.",
"4 exhibitor/staff badges and 4 VIP passes.",
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "/images/lanyard.webp",
      fallbackIcon: "🎫"
    },
    {
      title: "Official Visitor Badge Sponsor",
      description: "Create a strong first impression with prominent branding at the exhibition entrance, welcome area, selected directional signage and visitor arrival points.",
      points: [
       
"Sponsor logo on visitor badges.",
"Branding on badge holders, where applicable.",
"Logo on registration counter branding.",
"Website and social media recognition.",

"3 exhibitor/staff badges and 3 VIP passes.",
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "/images/visitor_badge.webp",
      fallbackIcon: "🚪"
    },
        {
      title: "Technology Showcase Sponsor",
      description: "Highlight your latest metrology, inspection, measurement and quality technologies through dedicated showcase branding, product demonstrations and digital promotion.",
      points: [
        "Dedicated showcase branding around a live demonstration or featured technology zone",
        "Opportunity to present CMMs, 3D measurement, vision inspection, calibration, or quality solutions",
        "Promotion of your showcase slot through selected website and social media channels",
        "On-site wayfinding or zone branding directing visitors to your demonstration area",
        "Product feature in selected digital communications before and during the show",
        "Direct engagement with engineers, quality professionals, and procurement teams",
        "Ideal for launching new instruments, software, or automation-enabled measurement systems",
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "/images/technology.png",
      fallbackIcon: "🔬"
    },
        {
      title: "Conference Session Partner",
      description: "Showcase your brand and products through premium advertising and branding opportunities within the official INDIAMET Expo brochure and its digital version.",
      points: [
"Sponsor branding on conference session backdrop.",
"Sponsor acknowledgement by session moderator.",
"Logo on conference programme.",
"Opportunity to nominate a speaker, subject to approval.",
"3 exhibitor/staff badges and 3 VIP passes.",
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "/images/session.jpg",
      fallbackIcon: "📰"
    }
,
      {
      title: "Conference Delegate Kit Sponsor",
      description: "Showcase your brand and products through premium advertising and branding opportunities within the official INDIAMET Expo brochure and its digital version.",
      points: [

" Exclusive recognition as the Official Conference Delegate Kit Sponsor of INDIAMET Expo 2027.",
"Sponsor logo printed on conference delegate kit bags or folders.",
"Sponsor logo on selected stationery items, such as notebooks and writing pads.",
"Opportunity to include company brochures, product catalogues and promotional inserts in delegate kits.",
"Company logo displayed on the conference sponsor backdrop.",
"Sponsor acknowledgement on the official INDIAMET website.",
"One dedicated social media sponsor announcement.",
"Sponsor acknowledgement in the conference programme.",
"Opportunity to display a promotional standee near the conference registration area.",
"4 exhibitor/staff badges and 4 VIP passes."
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "/images/conference.webp",
      fallbackIcon: "📰"
    }
,
    {
      title: "Official Conference Lunch Partner",
      description: "Position your brand at the centre of conference networking and delegate engagement.",
      points: [

"Exclusive recognition as the Official Conference Lunch Partner.",
"Sponsor logo on lunch-area branding and selected conference signage.",
"Branding on the conference programme and event website.",
"Sponsor logo on lunch invitation or delegate communication.",
"Opportunity to place company brochures or promotional material at the lunch area.",
"One branded standee at the lunch venue.",
"Acknowledgement by the conference host during the lunch announcement.",
"5 conference delegate passes.",
"2 VIP passes.",
"Company logo and sponsor profile in selected event promotions.",
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "/images/conflunch.jpg",
      fallbackIcon: "📰"
    }
,

 {
      title: "Official Exhibitor Networking Dinner Partner",
      description: "Connect your brand with industry leaders, exhibitors, technology providers and decision-makers in an exclusive networking environment.",
      points: [

"Exclusive recognition as the Official Exhibitor Networking Dinner Partner.",
"Prominent logo branding at the dinner entrance and venue.",
"Branding on the main dinner backdrop and stage.",
"Opportunity for a company representative to deliver a welcome address.",
"Sponsor logo on dinner invitations and event communications.",
"Opportunity to distribute company brochures and promotional material.",
"Dedicated branding on dinner tables or selected table cards.",
"Company logo on the event website and social media promotions.",
"Verbal acknowledgement by the event host.",
"10 dinner invitations for company representatives and guests.",
"5 VIP passes.",
"Opportunity to display one company standee at the venue.",
      ],
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "/images/exhibitor_dinner.jpg",
      fallbackIcon: "📰"
    }


  ];

  const ImageWithFallback = ({
    src,
    alt,
    fallbackIcon,
    className = "",
    objectFit = "contain"
  }: {
    src: string;
    alt: string;
    fallbackIcon?: string;
    className?: string;
    objectFit?: "cover" | "contain";
  }) => {
    const [error, setError] = useState(false);

    if (error || !src) {
      return (
        <div className={`flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 ${className}`}>
          <span className="text-3xl sm:text-4xl">{fallbackIcon || "🏨"}</span>
        </div>
      );
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={`h-full w-full ${objectFit === "contain" ? "object-contain" : "object-cover"} ${className}`}
        onError={() => setError(true)}
      />
    );
  };

  return (
    <div className="intro-animation font-sans">
      <div className="page-spacing-wrapper lg:pt-0">
        <PageHero
          title="SPONSOR"
          accent="INDIAMET EXPO"
          subtitle="Put your brand in front of the people who drive precision manufacturing through high-impact sponsorship and promotional opportunities."
        />

        {/* Benefits Section */}
        <Container className="py-10">
          <div className="animated-block mt-8 sm:mt-12">
            <div className="animated-block-target">
              <h2 className="font-bebas text-4xl sm:text-5xl text-[#003A77] uppercase">
                By leveraging these promotional options, you can:
              </h2>
              <p className="mt-2 text-base sm:text-lg font-bold text-[#00A1B1] uppercase tracking-wider">
                Please review the requirements carefully to ensure timely submission.
              </p>
              
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="relative flex flex-col overflow-hidden rounded-sm border border-gray-100 bg-[#FCF8F3] p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden bg-white p-3 rounded-sm border border-gray-150">
                      <ImageWithFallback
                        src={benefit.icon}
                        alt={benefit.title}
                        fallbackIcon={benefit.fallbackIcon}
                        objectFit="contain"
                        className="h-full w-full"
                      />
                    </div>
                    <h3 className="mt-5 font-bebas text-2xl text-[#00A1B1] uppercase font-bold">{benefit.title}</h3>
                    <p className="mt-3 text-lg sm:text-xl text-gray-650 leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>

        {/* Advertising & Sponsorship Options Section */}
        <Container className="py-10">
          <div className="animated-block mt-8 sm:mt-12">
            <div className="animated-block-target">
              <h2 className="font-bebas text-4xl sm:text-5xl text-[#003A77] uppercase">
                Sponsorship <span className="text-[#00A1B1]"> Options</span>
              </h2>
              <div className="mt-8 space-y-6">
                {sponsorshipTabs.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="group overflow-hidden rounded-sm border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="grid lg:grid-cols-[280px_1fr]">
                      <div className="relative flex min-h-[220px] items-center justify-center bg-[#003A77] p-8 lg:min-h-full">
                        <div className="absolute inset-y-0 left-0 w-1.5 bg-[#00A1B1]" />
                        <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-sm bg-white p-5 sm:h-44 sm:w-44">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.title}
                            fallbackIcon={item.fallbackIcon}
                            objectFit="contain"
                            className="h-full w-full"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 p-6 sm:p-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <h4 className="font-bebas text-3xl font-bold tracking-wide text-[#003A77] uppercase sm:text-4xl">
                            {item.title}
                          </h4>
                          <Link href={item.buttonLink} className="shrink-0">
                            <button className="bg-[#00A1B1] hover:bg-[#003A77] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                              {item.buttonText}
                            </button>
                          </Link>
                        </div>

                        <p className="text-lg leading-relaxed text-gray-600 sm:text-xl">
                          {item.description}
                        </p>

                        <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-3">
                          {item.points.map((point) => (
                            <li key={point} className="flex gap-3 text-left text-lg leading-relaxed text-gray-700 sm:text-xl">
                              <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#00A1B1]" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>

        <div className="mt-12 sm:mt-16 lg:mt-20">
          <PartnersSection />
        </div>
      </div>
      <BackToTop />

      <style jsx>{`
        .font-bebas { font-family: 'Bebas Neue', cursive; }
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