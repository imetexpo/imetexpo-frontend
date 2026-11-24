import Link from 'next/link';
import Container from '@/components/ui/container';
import {
  Ruler,
  Gauge,
  Scan,
  Eye,
  Compass,
  Layers,
  Cpu,
  Search,
  ClipboardList,
  Handshake,
} from 'lucide-react';

const exhibitProfiles = [
  {
    number: '01',
    title: 'Coordinate measuring machines (CMM) and dimensional measurement systems',
    icon: Ruler,
  },
  {
    number: '02',
    title: 'Precision measuring instruments, gauges and reference standards',
    icon: Gauge,
  },
  {
    number: '03',
    title: '3D scanning, optical metrology and laser measurement solutions',
    icon: Scan,
  },
  {
    number: '04',
    title: 'Machine vision and industrial inspection equipment',
    icon: Eye,
  },
  {
    number: '05',
    title: 'Calibration instruments, laboratory systems and testing solutions',
    icon: Compass,
  },
  {
    number: '06',
    title: 'Surface, contour, form and roughness measurement',
    icon: Layers,
  },
  {
    number: '07',
    title: 'Metrology software, digital inspection and automation technologies',
    icon: Cpu,
  },
];

const bookingSteps = [
  {
    step: '01',
    title: 'Review the exhibition sectors and your product fit.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Submit your company details through the exhibitor enquiry form.',
    icon: ClipboardList,
  },
  {
    step: '03',
    title: 'Discuss stall availability, requirements and participation terms with the team.',
    icon: Handshake,
  },
];

export default function WhoShouldExhibitSection() {
  return (
    <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
      <div className="animated-block-target">
        <section className="bg-white py-10 sm:py-16 lg:py-20 border-t border-gray-100">

          {/* Container 1: Who Should Exhibit? */}
          <Container>
            <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
              <div className="mb-6 sm:mb-10 lg:mb-12">
                <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#003A77] leading-tight uppercase tracking-tight mt-1 sm:mt-2">
                  Who Should Exhibit?
                </h2>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-700 max-w-4xl leading-relaxed font-sans">
                  INDIAMET welcomes enquiries from manufacturers, suppliers, service providers and technology companies working across:
                </p>
              </div>

              {/* 7 Profile Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
                {exhibitProfiles.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.number}
                      className="group flex items-center gap-3.5 rounded-xl sm:rounded-2xl border border-[#003A77]/10 bg-[#FCF8F3] p-4 sm:p-5 shadow-[0_2px_12px_rgba(19,45,73,0.02)] transition-all duration-300 hover:border-[#00A1B1]/40 hover:bg-white hover:shadow-[0_8px_24px_rgba(0,161,177,0.08)] motion-safe:hover:-translate-y-0.5"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#003A77]/10 bg-[#EDF4FB] text-[#003A77] transition-colors group-hover:border-[#00A1B1] group-hover:bg-[#00A1B1] group-hover:text-white">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-[#132D49] leading-snug font-sans">
                        {item.title}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <div className="mt-8 sm:mt-10">
                <Link href="/exhibiting-enquiry" className="inline-block w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-[#00A1B1] hover:bg-[#003A77] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm text-center">
                    Enquire to Exhibit
                  </button>
                </Link>
              </div>
            </div>
          </Container>

          {/* Container 2: Who Can You Connect With? */}
          <div className="mt-12 sm:mt-16 lg:mt-20 pt-10 sm:pt-14 border-t border-gray-100">
            <Container>
              <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
                <div className="mb-6 sm:mb-8">
                  <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#003A77] leading-tight uppercase tracking-tight mt-1 sm:mt-2">
                    Who Can You Connect With?
                  </h2>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-700 max-w-4xl leading-relaxed font-sans">
                    The intended visitor audience includes automotive and auto-component manufacturers; aerospace and defence professionals; precision engineering companies; electronics and medical-device manufacturers; quality and inspection teams; calibration laboratories; and purchasing, production and R&D professionals. Actual attendee composition will depend on registrations.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="mt-8 sm:mt-10">
                  <Link href="/passes" className="inline-block w-full sm:w-auto">
                    <button className="w-full sm:w-auto bg-[#00A1B1] hover:bg-[#003A77] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm text-center">
                      Register as a Visitor
                    </button>
                  </Link>
                </div>
              </div>
            </Container>
          </div>

          {/* Container 3: How INDIAMET Stall Booking Works */}
          <div className="mt-12 sm:mt-16 lg:mt-20 pt-10 sm:pt-14 border-t border-gray-100">
            <Container>
              <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
                <div className="mb-6 sm:mb-8">
                  <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#003A77] leading-tight uppercase tracking-tight mt-1 sm:mt-2">
                    How INDIAMET Stall Booking Works
                  </h2>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-700 max-w-4xl leading-relaxed font-sans">
                    Interested in participating? Submit an INDIAMET exhibitor registration enquiry through the official website. The organizing team can share available stand options, participation information and applicable pricing.
                  </p>
                </div>

                {/* 3 Booking Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                  {bookingSteps.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        // key={item.step}
                        className="group flex flex-col justify-between rounded-xl sm:rounded-2xl border border-[#003A77]/10 bg-[#FCF8F3] p-5 sm:p-6 shadow-[0_2px_12px_rgba(19,45,73,0.02)] transition-all duration-300 hover:border-[#00A1B1]/40 hover:bg-white hover:shadow-[0_8px_24px_rgba(0,161,177,0.08)] motion-safe:hover:-translate-y-0.5"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-4 mb-4">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#003A77]/10 bg-[#EDF4FB] text-[#003A77] transition-colors group-hover:border-[#00A1B1] group-hover:bg-[#00A1B1] group-hover:text-white">
                              <Icon className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <span className="font-bebas text-2xl font-bold text-[#00A1B1]">
                              Step {item.step}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm font-semibold text-[#132D49] leading-relaxed font-sans">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <div className="mt-8 sm:mt-10">
                  <Link href="/exhibiting-enquiry" className="inline-block w-full sm:w-auto">
                    <button className="w-full sm:w-auto bg-[#00A1B1] hover:bg-[#003A77] text-white px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm text-center">
                      Register for Exihitor
                    </button>
                  </Link>
                </div>
              </div>
            </Container>
          </div>

        </section>
      </div>
    </div>
  );
}
