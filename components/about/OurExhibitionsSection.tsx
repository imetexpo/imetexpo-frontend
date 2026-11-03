import Image from 'next/image';
import Container from '@/components/ui/container';

type Exhibition = {
  name: string;
  logo: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
  href: string;
};

const exhibitions: Exhibition[] = [
  {
    name: 'DIEMEX 2023',
    logo: '',
    description: 'International Die, Mould And Tooling Exhibition',
    startDate: 'Oct 23rd, 2023',
    endDate: 'Oct 26th, 2023',
    venue: 'KTPO Convention Centre, Bangalore',
    href: 'https://diemex.in',
  },
  {
    name: 'Plast Mould Expo 2023',
    logo: '',
    description:
      'Plastic Injection Moulding Machinery and Materials Exhibition',
    startDate: 'Oct 23rd, 2023',
    endDate: 'Oct 26th, 2023',
    venue: 'KTPO Convention Centre, Bangalore',
    href: 'https://plastmould.in',
  },
  {
    name: 'DIEMEX 2025',
    logo: '',
    description: 'International Die, Mould And Tooling Exhibition',
    startDate: 'Nov 23rd, 2025',
    endDate: 'Nov 26th, 2025',
    venue: 'Chennai Trade Centre, Chennai, India',
    href: 'https://diemex.in',
  },
  {
   name: 'Plast Mould Expo 2025',
    logo: '',
    description:
      'Plastic Injection Moulding Machinery and Materials Exhibition',
    startDate: 'Oct 23rd, 2025',
    endDate: 'Oct 26th, 2025',
    venue: 'KTPO Convention Centre, Bangalore',
    href: 'https://plastmould.in',
  },
  {
    name: 'IndiaMet',
    logo: '',
    description: 'Inernational Metrology Exhibition & Summit.',
    startDate: 'May 13th, 2026',
    endDate: 'May 15th, 2026',
    venue: 'Auto Cluter Exhibition Centre, Pune, India.',
    href: 'https://indiametexpo.com',
  },
 
];

function ChevronIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z" />
    </svg>
  );
}

export default function OurExhibitionsSection() {
  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <div className="flex w-full items-end justify-between gap-10 max-lg:flex-wrap lg:gap-20 2xl:gap-40">
        <div>
          <h3 className="font-bebas text-3xl leading-tight text-[#003A77] sm:text-4xl md:text-5xl lg:text-6xl">
            Our Exhibitions at a Glance
          </h3>
          <div className="mt-4 space-y-4 text-lg leading-relaxed text-gray-700 sm:mt-5 sm:text-xl">
            <p>
              Each year, we organise and host over 30 leading industry events across key sectors,
              including exhibitions, summits, and conferences.
            </p>
            <p>
              Supported by the Connect digital platform, the ITE ecosystem offers innovative hybrid
              solutions for industry communities in Russia, the CIS, and beyond.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {exhibitions.map((event) => (
            <div
              key={event.name}
              className="group flex flex-col gap-5 rounded-2xl border border-black/10 bg-white p-5 xl:p-7"
            >
              <div>
                <Image
                  src={event.logo}
                  alt={event.name}
                  width={500}
                  height={500}
                  className="h-32 w-auto object-contain"
                />
              </div>
              <p className="text-lg leading-relaxed text-gray-700 sm:text-xl">{event.description}</p>
              <p className="text-lg text-gray-700 sm:text-xl">
                Start Date: <span className="font-bold">{event.startDate}</span>
              </p>
              <p className="text-lg text-gray-700 sm:text-xl">
                End Date: <span className="font-bold">{event.endDate}</span>
              </p>
              <p className="text-lg text-gray-700 sm:text-xl">
                Venue: <span className="font-bold">{event.venue}</span>
              </p>
              <a
                className="mt-auto block w-fit"
                target="_blank"
                rel="noopener noreferrer"
                href={event.href}
              >
                <span className="flex items-center gap-2 font-bebas text-2xl text-[#00A1B1] transition-colors duration-300 hover:text-[#003A77]">
                  Visit Website
                  <ChevronIcon />
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
