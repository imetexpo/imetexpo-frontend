// app/why-visit/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/container";
import PartnersSection from "@/components/home/PartnersSection";
import SectorsSection from "@/components/home/SectorsSection";
import BackToTop from "@/components/layout/BackToTop";
import React from "react";

export default function WhyVisitPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-100 grid place-content-center bg-[#03193D]">
        <div className="flex size-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-500 text-4xl">
          <div className="flex size-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-300 text-2xl"></div>
        </div>
      </div>
    );
  }

  const stats = [
    { value: "8,500+", label: "Visitors" },
    { value: "350+", label: "Exhibitors" },
    { value: "30+", label: "Visiting Countries" },
    { value: "12", label: "Event Sectors" }
  ];

  const countries = [
    { name: "Thailand", flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAGFBMVEUtKkqlGTH09fiiACHPoaj3+/3///8AADP2wT/MAAABGElEQVR4nO3csQ3CABAEwTe2of+OyX8lUhPMVHDaAm4Otnl6wB/SpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTWpOtrnY5mabF5smpUlpUpqUJqVJaVKalCalSWlSmpQmpUlpUpqUJqVJaVKalCalSWlSmpQmpUlpUvNmmw/bAAAAAAAAAAAAAAAAAAAAAL89fQ7wh/xalP+T0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1qbra52OZkm4NNk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClN6guCHexVxL7UcwAAAABJRU5ErkJggg==" },
    { name: "Vietnam", flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAilBMVEXaJR3//wDaIBjgVFDZEB7sohLYAB7aIB3ZHB3ZFx7//QDbLxzrnBPmgRbkdRfvsBHtpxL99QP0yg3dPhvojBX21Avzww7jbhjyvw/jaRjwtRDhWxn0yA365wf++AL77AbfThr54QjqlhT10AzmexbvsxDeSRrhYBn32grrmBP20wvpkRT66QfmfhYMvpJVAAAEBUlEQVR4nO3d2XLiMBAFUGtGtGT2YAghJGEJSciE+f/fGwwYvMh4gSlQ657XLGV1+RrZ7i48DwAAAAAAAAAAAAAAAAAAAAAAAABOWrc+gPtDL3TrQ7g3KhCBuvVB3BnZFm1564O4M7QQC4QnQbWEEC2EJ04utzVZIjxxtN7WZI3wxOyig/Ak+D+7mvz4tz6QO7KLDsITpzyx5yE8EX94qMkQ4YnQ6FCTEcIT8UUE58nBMToIzxG9H2vyjvDsaXGib30w98HvxGrSQXhCNIjVZIDwhKSIw73xlr9K1GSF8IQPpxM1waPqLRJJqImnu6madPFxTI+pmjziRKFmqiZN52uixyJt7Hp46ClTkyfXTxR6y9TkzfGa6EmmJEJM3A4PPRtq8uz2iWKIjuvh0V+Gkgjx5XJ4pCk62/C4fHNMD8aaPDgcHj01lkSIKcPwaFkK9XJq0qNy/8Ci0ulur1FG2xydbXjapf6+Z9M9tOznLPa6+lZdi2madwpcz8PUskuxli/Fq7rIwLcoOAfUKV7XBTqWnSR7Mnj9bxV5Day6lJyo3M/aS32QfbmJ0CT9ZPEamhMrcxPx1ah4jRWNlOWvxRQtr1ySJdnf9EafsytWZDa3OjcRbXgOXdeTxRfXJFoVr7aUFYuTZE+2FleoyKJl6abETFHj4pL0GVxck2hqehxd3tsXo9xEfDkoXnmugbR8U5KDhsVrzzFkeJLsyaDeVmVm6x1fGZo+apTkmc2mxIzGle8Kx2xzE/G9daWKrD2eF9cERd8VStJmtykxo3nZSy2TO74yqOxOxaFOc1U6Om4Ex0sNYpznzJhG6eg4NOMki2txxHgDG+dXecLkyJgGVXlr6siYRpXoOBKezCDGeTa1mNSWGcQ4z4kxDVntxrjpQHgMgxjnOTCmUfkFmANjGpkZpiL8Z5yMgxg7uW2B7Mc08qKzCSivrYl9eIyDGGGTsMpta+I+pmEexIgaj3LampiPaRgHMU6NR776Y/g58zEN0yBGvPFI0U/2F3iPaRgGMdKPoU1tTRzHNI5k5iqabTwytDX1OIcnE52uKRaUvnPmHB49T641r/Eo09Y05xueVHTyG4/SbU2Mw0Pxy+f5UZPksMuMbXgS0Rn4558+az/+xoNteOLTX8Pid+PxYRe7JroqOEVnU6rxSAYb7uFRn9EKy46axO4KP3m+OZbRZ0mFxqNjW1ODZ3ho/3yk2qhJNOzyyjI8Ktgt7rti41HU1sTy2zRkO9yU1Gg8onm4VWH5bRq0CF9g1dln7O4KOX6bRhidv3XXFQ67MAyPbMwuGDWRrQ3DTx7duairU1GH4fb+0iUxLAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgE1+QZr3G9L+AUNoNHsFdezzAAAAAElFTkSuQmCC" },
    { name: "Indonesia", flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAACVBMVEX/AAD/////paXx3aQcAAAAyUlEQVR4nO3QsQEAIAzAoOr/R7s3sxucwAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADfXLY5bE7KSTkpJ+WknJSTclJOykk5KSflpJyUk3JSTspJOSkn5aSclJNyUk7KSTkpJ+WknJSTclJOykk5KSflpJyUk3JSTspJOSkn5aSclJNyUk7KSTkpJ+WknJSTclJOykk5KSflpJyUk3JSTspJOSkn5aSclJNyUk7KSTkpJ+WknJSTclJOykk5KSflpJyUk3JSTspJPST9Y+jj6DMKAAAAAElFTkSuQmCC" },
    { name: "Malaysia", flag: "data:image/png;base64,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" },
    { name: "Singapore", flag: "data:image/png;base64,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" },
    { name: "Japan", flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAkFBMVEX///+8AC28ACu3AAC7ACW5ABi7ACm7ACe3AAi4ABC5ABu4AA27ACa4ABW5AB26ACDgpq3vzdP88/XBJEHDMEn35ejw09jOZHTmtr3XhZHJT2L14OTqxsrnu8Hkr7bdmqPPa3nUe4i+EDXDNEzMXG3bk53KU2XHR1vz2d6/Gzv67fDZjJfRcn/FPVTdl6HNYHCeybvVAAAEq0lEQVR4nO3djXqaMBQG4BICBGhEEa2KqHO2ta529393k7lOrXXlJz/PYd97BZzzhJNwkujdHQAAAAAAAAAAAAAAAAAAAAAAAACU0nwwLxaLRTEf5Knth7EunS9XGY/jUErP86QM45hnq+V8Z/vBbCm+DV0ZcZ8555jPI+kOvxW2H8+4dPHkysR3bvET6T4t/qcXabwKPX4zH++4F67Gth/VkEkmOPsyI7/fIy6yie3HNWDhyKBSQo4CyRa2H1mz4kVWGyJng0Wuu1xvR8/idlm9zRfPI9uPrsuje98gI6V794fth9dilHkNM1Lysg4Olb6oU1qvBaJvOwTVVqJubf2IiZXtIJRKv0ctM1KKsg4tbEfO16vWKjjrTFHZhu1KyUkgt7aDUWMcty0lJyzuxBfQtnV1vUxKB0ZKHqpMySEpYW47pLZSv8lq/l98n/rsM1Qz45zjme2g2nnoKU+J4/QebIfVRj/WkBLHiQkv83NXbX19x1y6dfZF1Vrto+DFdmhNTVV85HwumtoOrpmtqy0ljuPSXLplut6cUkByQl6EGlPiOCHFdr7yBewl5tsOsL5lm+5rFd7Sdoi1Vdzqa45x2yHW1dc9TA4Dhdpq1tE9TA4DZW07yHoKvZPOUTi3HWYtT+pbBNf4k+0w69jpXMKeuJTOeC31femciyhNx3udy/qTYG870Op2wkhKHEfQeXkW+hcnRx6dj54HE7NOidPpzHr6F2xHLLIdalW5qXJyKChUGrMTU+XkUFCoHBWdJsZyklDpy86aHuWr735mO9iK1qZKLKFvY3Ml9lBkbQdbjcFp55ATGqe5xiZ6J+9CGueWCmkwJ5LGWXxjXzslIl88fTPNk6OIRqMaObmGnFxDTq4hJ9cw71wzuz6hse9ldh1L47zSCN871/Qciv1cbDvYil4M9k+oHAo1soF+xDe2g63oh7l+bI/KvWODkzGRVsFh4jFz0qJE57RFYGwfkM6B0FdTBSV5tR1qZRNTBUVS2Qa8u0sV3p79FxYTuhr4bGYnkMwuYMlQu4BIo+AoVXrP+hZSr46hk0p8ZTvMWgYm+gViYDvMeoZ6b++U/KHtIGua6G+2hXQWJ39oP4RC5ujJiebrgDQvBGquKOSqSWmud+oRNDYxPpjpXKPQurvz107xL+ScYyGZZtKlpb4yG1K6uXNhr+vt4YQu7nyQanp7WEjq4+9Soadb7VLp1n9qqqMLKakcsr9hpr5dnVDqrn1K+Y+RcYoL2Eupo/YOaeAQrq/vdoHKpAQB0cXapR1T18UP/E6k5JCUtaqawtcdSUn508tqfuKw970DteSvjYpPn5DKAZyK3lr/zCFz32wHodrgvt3qLeHEdi6qSDctNgeZ2HSplJxMvKZDJYnI7VtU9uo2mZW5S+foTQP5rPbfZgRiRuVHCZoa7GuNFe7uO1hbr2wf3F7F//PquT9p3JVtb/e2jpOv0sKSeP3YmaV8FeOpL6KbvwnJeCTY9H8ZImfy/k8uZI/77JQaxgLek+J+0+96Xb1tVDyuMt8TcViKhednq8eCyJ0crdJdPh4MBuN8183FKgAAAAAAAAAAAAAAAAAAAAAAAEADvwBVDEywi5GrLQAAAABJRU5ErkJggg==" }
  ];

  const attendeeCategories = [
    {
      title: "See What's Powering Asia's Tyre Manufacturing Boom",
      description: "Experience the latest machinery, automation systems, and processing technologies driving large-scale tyre plant modernisation and expansion across the region.",
      image: "https://cdn.itegroupnews.com/1_1f3ae141f5.png"
    },
    {
      title: "Meet the Buyers Behind Multi-Million Projects",
      description: "Engage directly with procurement heads, plant managers, and investors responsible for sourcing equipment and solutions for new and existing tyre manufacturing operations.",
      image: "https://cdn.itegroupnews.com/2_6ab692408b.png"
    },
    {
      title: "Benchmark Against Global Industry Leaders",
      description: "Explore innovations from 350+ exhibitors across 15 countries and understand how leading international manufacturers are redefining performance, efficiency, and sustainability.",
      image: "https://cdn.itegroupnews.com/3_3310ab1131.png"
    },
    {
      title: "Gain a Front-Row View of Market Trends",
      description: "Stay ahead of industry shifts from automation and Industry 4.0 to sustainability, circular economy, and digital transformation shaping the future of tyre manufacturing.",
      image: "https://cdn.itegroupnews.com/4_2e07c29daf.png"
    }
  ];

  const businessAreas = [
    { percentage: "28%", label: "Tyre Manufacturing operations" },
    { percentage: "22%", label: "Components & spare parts supply" },
    { percentage: "25%", label: "Machinery & equipment supply" }
  ];

  const visitorIndustries = [
    "Design and construction of tyre plants",
    "Raw material processing",
    "Quality control and testing",
    "Media related to tyre industry",
    "Rubber compounding",
    "Tyre manufacturing operations",
    "Distribution and logistics"
  ];

  const supplierIndustries = [
    "Suppliers of components and spare parts",
    "Suppliers of machines and equipment",
    "Suppliers of power supply equipment",
    "Companies involved in tyre transportation",
    "Automation and software providers"
  ];

  const beyondExhibition = [
    {
      title: "Conference Programme",
      description: "Join 12 specialised sessions tackling the industry's most pressing challenges from technological innovation to sustainability and market dynamics. Gain actionable insights to enhance efficiency and strengthen your operations.",
      image: "https://cdn.itegroupnews.com/MW_24_2304_0004_FORUM_i_c9f88bc608.jpg",
      buttonText: "Learn More",
      buttonLink: "/conference-programme"
    },
    {
      title: "ITS Tyre Expo Connect",
      description: "Connect with peers, explore opportunities, and access event schedules, exhibitor deals, and floor plans with the official ITS Tyre Expo app – your year-round networking tool.",
      image: "https://cdn.itegroupnews.com/QR_MW_eng_web_site_e73baacf2e.svg",
      buttonText: "Learn More",
      buttonLink: "/connect"
    },
    {
      title: "Awards",
      description: "The Tyre Innovation Awards honor innovative projects that boost safety, efficiency, and sustainability, setting benchmarks for excellence in tyre manufacturing.",
      image: "https://cdn.itegroupnews.com/QR_MW_eng_web_site_e73baacf2e.svg",
      buttonText: "Learn More",
      buttonLink: "/awards"
    }
  ];

  const quickLinks = [
    { label: "Become an Exhibitor", link: "/exhibiting-enquiry", icon: "https://cdn.itegroupnews.com/Vector_1_440f5852b9.png" },
    { label: "Become a Visitor", link: "/visitor-registration", icon: "https://cdn.itegroupnews.com/Vector_2_9be2b98909.png" },
    { label: "Download Your Event Brochure", link: "/event-brochure", icon: "https://cdn.itegroupnews.com/Group_e024d13500.png" },
    { label: "Plan your Travel", link: "/plan-your-travel", icon: "https://cdn.itegroupnews.com/Vector_1_b2c1ab92d0.png" }
  ];

  return  (
  <div className="intro-animation">
    <div className="page-spacing-wrapper">
      <div className="pt-[100px] sm:pt-[120px] lg:pt-0">

        {/* Heart of Industry Section */}
        <Container>
          <div className="animated-block">
            <div className="animated-block-target">
              <div className="w-full grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
                <div className="order-2 lg:order-1">
                  <br /><br />
                  <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-[#03193D]">
                    The Heart of the Tyre Manufacturing Industry
                  </h2>
                  <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-gray-700">
                    Experience the complete tyre manufacturing value chain in one place. ITS Tyre Expo brings together technology leaders, equipment manufacturers, and industry professionals to exchange ideas, discover innovations, and drive the next phase of growth in global tyre manufacturing.
                  </p>
                  <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-between bg-[#FCF8F3] border border-gray-100 px-4 sm:px-6 py-6 sm:py-8 rounded-sm gap-4 sm:gap-0 font-sans">
                    {stats.map((stat, idx) => (
                      <React.Fragment key={idx}>
                        <div className="text-center flex-1 min-w-[80px]">
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bebas text-[#CC9808] font-bold">{stat.value}</h3>
                          <p className="text-[10px] sm:text-xs tracking-wider text-[#03193D] font-semibold mt-1 uppercase">{stat.label}</p>
                        </div>
                        {idx < stats.length - 1 && (
                          <div className="hidden md:block h-12 w-px bg-gray-200"></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="mt-8 sm:mt-10">
                    <Link href="/visitor-registration">
                      <button className="bg-[#CC9808] hover:bg-[#03193D] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                        Get your Badge Today
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="order-1 lg:order-2 relative h-[400px] sm:h-[500px] lg:h-[600px] w-full overflow-hidden rounded-lg">
                  <Image
                    src="https://cdn.itegroupnews.com/1_1f3ae141f5.png"
                    alt="Tyre Industry"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Global Network Section */}
        <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
          <div className="animated-block-target">
            <div className="relative mx-auto overflow-hidden py-12 sm:py-16 lg:py-20 text-white">
              <div className="absolute inset-0">
                <img
                  src="https://miningworldexpo.com/imgs/shape-1.svg"
                  alt="Background"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-[#03193D]/50"></div>
              <Container>
                <div className="relative z-10 flex flex-col gap-4 sm:gap-5">
                  <p className="text-sm sm:text-base font-bold text-[#CC9808]">
                    Connect with the Global Tyre Network at ITS Tyre Expo
                  </p>
                  <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-white max-w-[1000px]">
                    Where Tyre Manufacturing's Key Players Meet and Opportunities Take Shape
                  </h3>
                  <Link href="/exhibition-directory" target="_blank">
                    <button className="inline-block bg-[#CC9808] hover:bg-[#03193D] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                      Explore the Exhibitors List
                    </button>
                  </Link>
                </div>
              </Container>
            </div>
          </div>
        </div>

        {/* Why Attend Section */}
        <Container>
          <div className="mt-12 sm:mt-16 lg:mt-20 space-y-12 sm:space-y-16 lg:space-y-20">
            {attendeeCategories.map((item, idx) => {
              const isReverse = idx % 2 !== 0;
              return (
                <div key={idx} className="animated-block">
                  <div className="animated-block-target">
                <div className="grid items-stretch gap-6 sm:gap-8 lg:grid-cols-2">
                      <div className={`flex flex-col justify-center bg-[#FCF8F3] border border-gray-100 p-6 sm:p-8 lg:p-10 rounded-sm shadow-sm ${isReverse ? "lg:order-2" : "lg:order-1"}`}>
                        <h4 className="font-bebas text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#03193D] leading-tight">
                          {item.title}
                        </h4>
                        <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-700 leading-relaxed font-sans max-w-[600px]">
                          {item.description}
                        </p>
                      </div>
                      <div className={`relative h-[300px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-sm ${isReverse ? "lg:order-1" : "lg:order-2"}`}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>

        {/* Download Brochure Section */}
        <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
          <div className="animated-block-target">
            <div className="relative mx-auto overflow-hidden py-12 sm:py-16 lg:py-20 text-white">
              <div className="absolute inset-0">
                <img
                  src="https://cdn.itegroupnews.com/img_3_4b6edc76d1.jpg"
                  alt="Event Background"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-[#03193D]/60"></div>
              <Container>
                <div className="relative z-10 grid items-center gap-8 sm:gap-10 md:grid-cols-12">
                  <div className="flex justify-center md:col-span-4">
                    <img
                      src="https://cdn.itegroupnews.com/Sales_Brochure_84b3c56f9d.png"
                      alt="Brochure"
                      className="h-48 sm:h-56 lg:h-64 w-auto object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-4 sm:gap-5 md:col-span-8">
                    <h3 className="font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                      Download Your Event Brochure
                    </h3>
                    <p className="max-w-[700px] text-base sm:text-lg text-gray-200 leading-relaxed">
                      Make sure you grab your copy of the event brochure to learn more about the show and explore your participation opportunities.
                    </p>
                    <Link href="/event-brochure">
                      <button className="bg-[#CC9808] hover:bg-white hover:text-[#03193D] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                        Download Now
                      </button>
                    </Link>
                  </div>
                </div>
              </Container>
            </div>
          </div>
        </div>

        {/* Business Areas Section */}
        <Container>
          <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
            <div className="animated-block-target">
              <div className="w-full grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
                <div className="order-2 lg:order-1">
                  <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-[#03193D]">
                    Discover the Key Business Areas of Our Attendees
                  </h3>
                  <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-gray-700">
                    ITS Tyre Expo attracts a diverse audience from industries such as manufacturing, distribution, technology, and services. Understanding their business focus allows you to identify potential partners, customise your offerings, and engage directly with decision-makers driving innovation.
                  </p>
                  <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-between bg-[#FCF8F3] border border-gray-100 px-4 sm:px-6 py-6 sm:py-8 rounded-sm gap-4 sm:gap-0 font-sans">
                    {businessAreas.map((area, idx) => (
                      <React.Fragment key={idx}>
                        <div className="text-center flex-1 min-w-[80px]">
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bebas text-[#CC9808] font-bold">{area.percentage}</h3>
                          <p className="text-[10px] sm:text-xs tracking-wider text-[#03193D] font-semibold mt-1 uppercase">{area.label}</p>
                        </div>
                        {idx < businessAreas.length - 1 && (
                          <div className="hidden md:block h-12 w-px bg-gray-200"></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="mt-8 sm:mt-10">
                    <Link href="/post-show-report">
                      <button className="bg-[#CC9808] hover:bg-[#03193D] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                        Download Your Post-Show Report
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="order-1 lg:order-2 relative h-[400px] sm:h-[500px] lg:h-[600px] w-full overflow-hidden rounded-lg">
  <Image
    src="https://cdn.itegroupnews.com/Untitled_design_11_c8dee1a839.png"
    alt="Business Areas"
    fill
    className="object-cover"
  />
</div>
              </div>
            </div>
          </div>
        </Container>

        {/* Who is it for Section */}
        <Container>
          <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
            <div className="animated-block-target">
              <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#03193D]">
                Who is ITS Tyre Expo for?
              </h3>
              <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 md:grid-cols-2">
                <div className="relative min-h-[350px] sm:min-h-[400px] overflow-hidden rounded-sm border border-white/10">
                  <img
                    src="https://cdn.itegroupnews.com/img_3_4b6edc76d1.jpg"
                    alt="Visitor Industries"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#03193D]/60"></div>
                  <div className="relative z-10 p-6 sm:p-8">
                    <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg text-white font-sans">
                      {visitorIndustries.map((industry, idx) => (
                        <li key={idx}>{industry}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="relative min-h-[350px] sm:min-h-[400px] overflow-hidden rounded-sm border border-white/10">
                  <img
                    src="https://cdn.itegroupnews.com/img_3_4b6edc76d1.jpg"
                    alt="Supplier Industries"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#03193D]/60"></div>
                  <div className="relative z-10 p-6 sm:p-8">
                    <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg text-white font-sans">
                      {supplierIndustries.map((industry, idx) => (
                        <li key={idx}>{industry}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Past Exhibitors Section */}
        <Container>
          <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
            <div className="animated-block-target">
              <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#03193D]">
                Have a Look at Our Past Exhibitors
              </h3>
              <div className="mt-8 sm:mt-10 bg-[#FCF8F3] border border-gray-100 p-6 sm:p-8 rounded-sm shadow-sm">
                <div className="overflow-hidden rounded-sm">
                  <img
                    src="https://cdn.itegroupnews.com/MWR_Past_Exhibitors_1_dcd641cb9b.png"
                    alt="Past Exhibitors"
                    className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full object-cover"
                  />
                </div>
                <div className="mt-6 sm:mt-8 flex justify-center">
                  <Link href="https://catalogue.ite-expo.ru/en-GB/exhibitorlist.aspx?project_id=541" target="_blank">
                    <button className="bg-[#CC9808] hover:bg-[#03193D] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                      View the Exhibitor List
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Event Sectors Section */}
        <SectorsSection />

        {/* Beyond an Exhibition Section */}
        <Container>
          <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
            <div className="animated-block-target">
              <div className="mb-6 sm:mb-8 flex flex-col lg:flex-row justify-between lg:items-end gap-4">
                <div className="lg:basis-2/3">
                  <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#03193D]">
                    Beyond an Exhibition
                  </h3>
                  <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
                    Experience the forefront of tyre manufacturing innovation through live technology showcases, expert-led discussions, and actionable insights. Discover opportunities to shape the future of the industry and stay ahead in a rapidly evolving market.
                  </p>
                </div>
              </div>
              <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {beyondExhibition.map((item, idx) => (
                  <div key={idx} className="group flex flex-col overflow-hidden rounded-sm bg-[#FCF8F3] border border-gray-100 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg">
                    <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#03193D]/20 group-hover:bg-[#03193D]/40 transition"></div>
                    </div>
                    <div className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-5 font-sans">
                      <h4 className="text-lg sm:text-xl font-bold text-[#03193D]">{item.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-4 leading-relaxed">{item.description}</p>
                      <Link href={item.buttonLink}>
                        <button className="bg-[#CC9808] hover:bg-[#03193D] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm">
                          {item.buttonText}
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>

        {/* When and Where Section */}
        <Container>
          <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
            <div className="animated-block-target">
              <div className="w-full flex flex-col text-[#03193D]">
                <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#03193D]">
                  When and Where
                </h3>
                <div className="mt-4 sm:mt-5 grid gap-5 sm:gap-6 lg:grid-cols-2 font-sans">
                  <div className="rounded-sm bg-[#FCF8F3] border border-gray-100 p-5 sm:p-6 shadow-sm">
                    <p className="mb-2 font-bold text-sm sm:text-base text-[#03193D]">Venue</p>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-800">BITEC, Bangkok, Thailand</h4>
                  </div>
                  <div className="rounded-sm bg-[#FCF8F3] border border-gray-100 p-5 sm:p-6 shadow-sm">
                    <p className="mb-2 font-bold text-sm sm:text-base text-[#03193D]">Opening Hours</p>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-800">15 October 2026: 10:00 - 18:00</h4>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-800">16 October 2026: 10:00 - 18:00</h4>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-800">17 October 2026: 10:00 - 16:00</h4>
                  </div>
                </div>
                <div className="mt-6 sm:mt-8 overflow-hidden rounded-sm border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps?q=BITEC%20Bangkok%20Thailand&output=embed"
                    className="w-full h-[300px] sm:h-[350px] md:h-[400px] border-0"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Quick Navigation */}
        <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
          <div className="animated-block-target">
            <div className="border-t-8 border-orange-600 bg-[#03193D] py-12 sm:py-16 lg:py-20 text-white">
              <Container>
                <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                  Quick Navigation
                </h2>
                <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-y-8 sm:gap-y-10 gap-x-4">
                  {quickLinks.map((item, idx) => (
                    <div key={idx} className="relative flex flex-col items-center justify-center text-center">
                      <Link href={item.link} className="flex flex-col items-center group">
                        <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gray-800 overflow-hidden transition-transform group-hover:scale-110">
                          <Image
                            src={item.icon}
                            alt={item.label}
                            width={28}
                            height={28}
                            className="object-contain sm:w-8 sm:h-8"
                          />
                        </div>
                        <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-semibold text-gray-300 group-hover:text-white transition">
                          {item.label}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          </div>
        </div>

        <PartnersSection />
        <BackToTop />
      </div>
    </div>

    <style jsx>{`
      .global-transition {
        transition: all 0.3s ease;
      }
      .flex-center {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .font-bebas {
        font-family: 'Bebas Neue', cursive;
      }
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .line-clamp-4 {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `}</style>
  </div>
);
}