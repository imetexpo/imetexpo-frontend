import Image from 'next/image';
import Link from 'next/link';
import Container from '../ui/container';

const socialLinks = [
  {
    label: 'LinkedIn',
    href: '#',
    viewBox: '0 0 448 512',
    path: 'M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z',
  },
  {
    label: 'Instagram',
    href: '#',
    viewBox: '0 0 448 512',
    path: 'M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z',
  },
  {
    label: 'Facebook',
    href: '#',
    viewBox: '0 0 512 512',
    path: 'M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z',
  },
  {
    label: 'X',
    href: '#',
    viewBox: '0 0 512 512',
    path: 'M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z',
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#031A34] text-gray-400 border-t border-white/10">
      {/* Top Section */}
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 xl:gap-20">
          
          {/* Logo */}
          <div className="space-y-4">
            <Image
              src="/ITS_logo_white.png"
              alt="IndiaMet Expo"
              width={180}
              height={50}
              className="object-contain"
            />
            <p className="text-x text-gray-100 font-sans mt-2">
              Metrology Exhibiton & Summit.
            </p>
          </div>

          {/* Contacts */}
          <div className="space-y-6 font-sans">
            <div>
              <h5 className="text-xl font-bold uppercase tracking-wider text-white mb-2 font-bebas">
                Contacts and Support
              </h5>
              <a
                href="mailto:pad@maxxmedia.in"
                className="hover:text-[#F9B122] transition-colors text-x"
              >
                pad@maxxmedia.in
              </a>
            </div>

            <div>
              <h5 className="text-xl font-bold uppercase tracking-wider text-white mb-2 font-bebas">
                Hotline
              </h5>
              <a href="tel:+91 9148319993" className="hover:text-[#F9B122] transition-colors text-x">
                +91- 91483 19993
              </a>
            </div>

            <div>
              <h5 className="text-xl font-bold uppercase tracking-wider text-white mb-2 font-bebas">
                Visitor Support
              </h5>
              <a href="tel:++91- 63649 36468" className="hover:text-[#F9B122] transition-colors text-x">
                +91- 63649 36468
              </a>
            </div>
          </div>

          {/* Opening Hours + Venue */}
          <div className="space-y-8 font-sans">
            <div>
              <h5 className="text-xl font-bold uppercase tracking-wider text-white mb-3 font-bebas">
                Opening Hours
              </h5>
              <div className="space-y-1.5 text-x">
                <p>13 May 2027: 10:00 - 18:00</p>
                <p>14 May 2027: 10:00 - 18:00</p>
                <p>15 May 2027: 10:00 - 16:00</p>
              </div>
            </div>

            <div>
              <h5 className="text-xl font-bold uppercase tracking-wider text-white mb-3 font-bebas">
                Exhibition Venue
              </h5>
              <div className="text-x leading-relaxed">
                <p>Auto Cluster Exhibition Centre</p>
                <p>Plot No. C-181, Chinchwad East</p>
                <p>Mumbai Pune Road,</p>
                <p>Pune - 411 019 Maharashtra, India</p>
              </div>
            </div>
          </div>

          {/* Quick Links + Stay Connected */}
          <div className="lg:max-w-md space-y-5 font-sans text-white">
            <div>
              <h5 className="mb-2 text-xl font-bold uppercase tracking-wider text-white font-bebas">Quick Links</h5>
              <div className="flex flex-col gap-2 text-white/70">
                <Link href="/exhibiting-enquiry" className="hover:underline hover:text-white transition-colors">
                  Become an Exhibitor
                </Link>
                <Link href="/event-brochure" className="hover:underline hover:text-white transition-colors">
                  Download event brochure
                </Link>
                <Link href="/contact-us" className="hover:underline hover:text-white transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>

            <div>
              <h5 className="mb-2 text-xl font-bold uppercase tracking-wider text-white font-bebas">Stay Connected</h5>
              <div className="flex gap-3">
                {socialLinks.map(({ label, href, viewBox, path }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group flex h-10 w-10 items-center justify-center rounded-full bg-white transition-all duration-300 hover:scale-110 hover:bg-[#F9B122]"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox={viewBox}
                      className="h-5 w-5 text-[#031A34] group-hover:text-white"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d={path} />
                    </svg>
                  </a>
                ))}
              </div>
              <p className="mt-3 text-sm text-white/60">Follow us for latest updates and news</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Section */}
      <Container>
        <div className="border-t border-white/10 py-8 text-xs font-sans">
          <div className="flex flex-nowrap items-center justify-between gap-x-4 overflow-x-auto">
            <div className="flex shrink-0 items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-neutral-100 font-bold sm:text-[16px]">Organised By</span>
              <Image
                src="/maxx_logo.png"
                alt="ITE"
                width={270}
                height={75}
                className="h-auto w-auto max-w-[100px] object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:max-w-[200px]"
              />
            </div>

            <div className="flex shrink-0 items-center gap-2 text-xs text-neutral-500 sm:gap-3 sm:text-[16px]">
              <p className="whitespace-nowrap">© IndiaMet 2027. All Rights Reserved.</p>
              <span className="text-neutral-800">|</span>
              <Link href="#" className="whitespace-nowrap hover:text-white transition-colors">Terms of Use</Link>
              <span className="text-neutral-800">|</span>
              <Link href="#" className="whitespace-nowrap hover:text-white transition-colors">Privacy Policy</Link>
              <span className="text-neutral-800">|</span>
              <Link href="#" className="whitespace-nowrap hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}