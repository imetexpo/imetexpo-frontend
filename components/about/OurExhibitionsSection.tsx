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
    name: 'MIMS AutoMobility Saint Peterburg',
    logo: 'https://cdn.itegroupnews.com/MIMS_Logo_3ec8b81f21.webp',
    description: 'International trade fair for automotive production, aftermarket and service industry',
    startDate: 'Aug 25th, 2026',
    endDate: 'Aug 28th, 2026',
    venue: 'Expoforum, St. Petersburg',
    href: 'https://mims.ru',
  },
  {
    name: 'A-FEST',
    logo: 'https://cdn.itegroupnews.com/Afest_Logo_72ba5022c8.webp',
    description:
      'A new event in Aquaflame and AIRVent ecosystem for designers and installers of heating, water supply, ventilation, and air conditioning systems.',
    startDate: 'Sep 8th, 2026',
    endDate: 'Sep 8th, 2026',
    venue: 'RBC Event Centre',
    href: 'https://aquaflame-expo.ru',
  },
  {
    name: 'WorldFood Moscow',
    logo: 'https://cdn.itegroupnews.com/worldfoodmoscow_f9a1d64bf8.webp',
    description: 'The international food and drink exhibition.',
    startDate: 'Sep 15th, 2026',
    endDate: 'Sep 18th, 2026',
    venue: 'Crocus Expo, Moscow',
    href: 'https://expoworldfood.com/',
  },
  {
    name: 'Comtrans',
    logo: 'https://cdn.itegroupnews.com/comtrans_92db3bfebf.webp',
    description: 'The international exhibition of commercial vehicles.',
    startDate: 'Sep 22nd, 2026',
    endDate: 'Sep 25th, 2026',
    venue: 'Crocus Expo, Moscow',
    href: 'https://www.comtransexpo.ru/en/',
  },
  {
    name: 'Fastenex',
    logo: 'https://cdn.itegroupnews.com/fastenex_396b02490f.webp',
    description: 'The international exhibition of fasteners and industrial supply.',
    startDate: 'Oct 6th, 2026',
    endDate: 'Oct 9th, 2026',
    venue: 'Hall 4, Pavilion 1, Crocus Expo, Moscow',
    href: 'https://fastenex.ru/en/',
  },
  {
    name: 'Weldex',
    logo: 'https://cdn.itegroupnews.com/weldex_5dabc45563.webp',
    description: 'The international exhibition of welding materials, equipment and technologies.',
    startDate: 'Oct 6th, 2026',
    endDate: 'Oct 9th, 2026',
    venue: 'Pavilion 1, Hall 4, Crocus Expo',
    href: 'https://weldexexpo.com',
  },
  {
    name: 'TransRussia Summit',
    logo: 'https://cdn.itegroupnews.com/T_Rsummit_Logo_eafa958e56.webp',
    description: 'Summit for the transport and logistics industry',
    startDate: 'Oct 19th, 2026',
    endDate: 'Oct 21st, 2026',
    venue: 'Hyatt, Moscow, Russia',
    href: 'https://transrussia.ru/ru/summit',
  },
  {
    name: 'MosBuild Summit',
    logo: 'https://cdn.itegroupnews.com/MOB_Summit_Logo_563ce31a7a.webp',
    description: 'Summit for the construction industry',
    startDate: 'Oct 21st, 2026',
    endDate: 'Oct 23rd, 2026',
    venue: 'Hyatt, Moscow, Russia',
    href: 'https://mosbuild.com',
  },
  {
    name: 'MiningWorld Summit',
    logo: 'https://cdn.itegroupnews.com/M_Wsummit_Logo_e8c7ad29b7.png',
    description: 'Summit for the mining industry',
    startDate: 'Nov 16th, 2026',
    endDate: 'Nov 18th, 2026',
    venue: 'Hyatt, Moscow, Russia',
    href: 'https://summit.miningworld.ru',
  },
  {
    name: 'YugAgro',
    logo: 'https://cdn.itegroupnews.com/yugagro_24d7ac61db.webp',
    description:
      'The international exhibition of agricultural machinery, equipment, and materials for crop production.',
    startDate: 'Nov 17th, 2026',
    endDate: 'Nov 20th, 2026',
    venue: 'Expograd Yug, Krasnodar',
    href: 'https://yugagroexpo.com',
  },
  {
    name: 'RosUpack Summit',
    logo: 'https://cdn.itegroupnews.com/RU_Psummit_Logo_a934ef99e8.png',
    description: 'Summit for the packaging industry',
    startDate: 'Nov 18th, 2026',
    endDate: 'Nov 20th, 2026',
    venue: 'Hyatt, Moscow, Russia',
    href: 'https://summit.rosupack.com',
  },
  {
    name: 'Pharmtech & Ingredients',
    logo: 'https://cdn.itegroupnews.com/pharmtech_e6f6e7a85a.webp',
    description:
      'The international exhibition for equipment, raw materials and technologies for pharmaceutical production.',
    startDate: 'Nov 24th, 2026',
    endDate: 'Nov 27th, 2026',
    venue: 'Crocus Expo, Moscow',
    href: 'https://expopharmtech.com/',
  },
  {
    name: 'Woodex',
    logo: 'https://cdn.itegroupnews.com/WOOD_2027_Logo_8353fd19d2.png',
    description:
      'The international exhibition of equipment, materials and components for woodworking and furniture industry',
    startDate: 'Dec 1st, 2026',
    endDate: 'Dec 4th, 2026',
    venue: 'Crocus Expo, Moscow',
    href: 'https://woodexexpo.com/',
  },
  {
    name: 'DairyTech',
    logo: 'https://cdn.itegroupnews.com/dairytech_d532416dae.webp',
    description: 'The international exhibition of equipment for milk and dairy production.',
    startDate: 'Jan 26th, 2027',
    endDate: 'Jan 28th, 2027',
    venue: 'Pavilion 1, Hall 4, Crocus Expo, Moscow',
    href: 'https://dairytechexpo.com/',
  },
  {
    name: 'AIRVent',
    logo: 'https://cdn.itegroupnews.com/AV_2027_Logo_f86d2b8e91.png',
    description:
      'The international exhibition of ventilation, air conditioning, and refrigeration equipment.',
    startDate: 'Feb 1st, 2027',
    endDate: 'Feb 4th, 2027',
    venue: 'Crocus Expo, Moscow',
    href: 'https://airventexpo.com/',
  },
  {
    name: 'Aquaflame',
    logo: 'https://cdn.itegroupnews.com/AQF_LOGO_BLACK_removebg_preview_8c13087461.webp',
    description:
      'The international exhibition for domestic and industrial heating, water supply, engineering systems, and equipment for swimming pools and spas.',
    startDate: 'Feb 1st, 2027',
    endDate: 'Feb 4th, 2027',
    venue: 'Crocus Expo, Moscow',
    href: 'https://aquaflameexpo.com',
  },
  {
    name: 'TranRussia',
    logo: 'https://cdn.itegroupnews.com/transrussia_5ab92d93fe.webp',
    description: 'The international event for transportation and logistics market experts.',
    startDate: 'Mar 16th, 2027',
    endDate: 'Mar 18th, 2027',
    venue: 'Crocus Expo, Moscow',
    href: 'https://trstexpo.com/',
  },
  {
    name: 'SkladTech',
    logo: 'https://cdn.itegroupnews.com/skladtech_92b3cc7f1b.webp',
    description:
      'The special exposition for warehouse and handling equipment, automation systems and solutions.',
    startDate: 'Mar 16th, 2027',
    endDate: 'Mar 18th, 2027',
    venue: 'Crocus Expo, Moscow',
    href: 'https://trstexpo.com/',
  },
  {
    name: 'MosBuild',
    logo: 'https://cdn.itegroupnews.com/Untitled_3_6f915a6545.webp',
    description: 'The international building and interiors trade show.',
    startDate: 'Mar 30th, 2027',
    endDate: 'Apr 2nd, 2027',
    venue: 'Crocus Expo, Moscow',
    href: 'https://mosbuildexpo.com/',
  },
  {
    name: 'MosHome',
    logo: 'https://cdn.itegroupnews.com/Mos_Home_black_3a7f04ae97.webp',
    description:
      'The International exhibition of consumer goods for house, garden, sports and leisure MosHome.',
    startDate: 'Mar 30th, 2027',
    endDate: 'Apr 2nd, 2027',
    venue: 'Crocus Expo, Moscow',
    href: 'https://moshomeexpo.com',
  },
  {
    name: 'MITT',
    logo: 'https://cdn.itegroupnews.com/mitt_2eb1a572e1.webp',
    description: 'The international travel & hospitality show.',
    startDate: 'Apr 13th, 2027',
    endDate: 'Apr 15th, 2027',
    venue: 'Crocus Expo, Moscow',
    href: 'https://expomitt.com',
  },
  {
    name: 'ExpoCifra',
    logo: 'https://cdn.itegroupnews.com/expocifra_2c23f2988f.webp',
    description:
      'The international exhibition of information technologies and digital transformation solutions. Co-located with ExpoElectronica',
    startDate: 'Apr 13th, 2027',
    endDate: 'Apr 15th, 2027',
    venue: 'Crocus Expo, Pavillion 3, Hall 13',
    href: 'https://expocifra.com/en/',
  },
  {
    name: 'ExpoElectronica',
    logo: 'https://cdn.itegroupnews.com/expoelectronica_0a85ec1bd8.webp',
    description:
      'The international exhibition of electronica, components and technologies, materials and equipment, embedded systems and turnkey solutions.',
    startDate: 'Apr 13th, 2027',
    endDate: 'Apr 15th, 2027',
    venue: 'Crocus Expo, Moscow, Russia',
    href: 'https://expoelectronica.ru',
  },
  {
    name: 'Analitika Expo',
    logo: 'https://cdn.itegroupnews.com/ANA_2027_Logo_ec0f410bf1.png',
    description: 'The international exhibition of laboratory equipment and chemical reagents.',
    startDate: 'Apr 21st, 2027',
    endDate: 'Apr 23rd, 2027',
    venue: 'Crocus Expo, Moscow',
    href: 'https://analitikaexpo.com/en/',
  },
  {
    name: 'Securika Moscow',
    logo: 'https://cdn.itegroupnews.com/securika_38e38c4107.webp',
    description: 'The international exhibition of security and fire protection equipment and products.',
    startDate: 'Apr 21st, 2027',
    endDate: 'Apr 23rd, 2027',
    venue: 'Crocus Expo, Moscow',
    href: 'https://securikaexpo.com',
  },
  {
    name: 'MiningWorld',
    logo: 'https://cdn.itegroupnews.com/miningworld_5ce552a5d6.webp',
    description:
      'The international exhibition of machines and equipment for mining, processing, and transportation of minerals.',
    startDate: 'Apr 27th, 2027',
    endDate: 'Apr 29th, 2027',
    venue: 'Crocus Expo, Moscow',
    href: 'https://miningworldexpo.com',
  },
  {
    name: 'RosUpack',
    logo: 'https://cdn.itegroupnews.com/rosupack_746977fd87.webp',
    description: 'The international event for package manufacturers and consumers. Co-located with Printech.',
    startDate: 'Jun 15th, 2027',
    endDate: 'Jun 18th, 2027',
    venue: 'Crocus Expo, Moscow',
    href: 'https://rosupackexpo.com/',
  },
  {
    name: 'Printech',
    logo: 'https://cdn.itegroupnews.com/printech_4fb4b37c6e.webp',
    description:
      'The international exhibition of equipment, technologies and supplies for printing and advertising production. Co-located with RosUpack.',
    startDate: 'Jun 15th, 2027',
    endDate: 'Jun 18th, 2027',
    venue: 'Crocus Expo, Moscow',
    href: 'https://printech-expo.ru/en/',
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
          <h3 className="font-bebas text-3xl leading-tight text-[#031A34] sm:text-4xl md:text-5xl lg:text-6xl">
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
                <span className="flex items-center gap-2 font-bebas text-2xl text-[#F9B122] transition-colors duration-300 hover:text-[#031A34]">
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
