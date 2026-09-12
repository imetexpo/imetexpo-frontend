import Image from 'next/image';
import Link from 'next/link';
import Container from '../ui/container';

export default function Footer() {
  return (
    <footer className="bg-[#03193D] text-gray-400 border-t border-white/10">
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
                className="hover:text-[#CC9808] transition-colors text-x"
              >
                pad@maxxmedia.in
              </a>
            </div>

            <div>
              <h5 className="text-xl font-bold uppercase tracking-wider text-white mb-2 font-bebas">
                Hotline
              </h5>
              <a href="tel:+91 9148319993" className="hover:text-[#CC9808] transition-colors text-x">
                +91- 91483 19993
              </a>
            </div>

            <div>
              <h5 className="text-xl font-bold uppercase tracking-wider text-white mb-2 font-bebas">
                Visitor Support
              </h5>
              <a href="tel:++91- 63649 36468" className="hover:text-[#CC9808] transition-colors text-x">
                +91- 63649 36468
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="font-sans">
            <h5 className="text-xl font-bold uppercase tracking-wider text-white mb-3 font-bebas">
              Opening Hours
            </h5>
            <div className="space-y-1.5 text-x">
              <p>22 April 2027: 10:00 - 18:00</p>
              <p>23 April 2027: 10:00 - 18:00</p>
              <p>24 April 2027: 10:00 - 16:00</p>
            </div>
          </div>

          {/* Venue */}
          <div className="font-sans">
            <h5 className="text-xl font-bold uppercase tracking-wider text-white mb-3 font-bebas">
              Exhibition Venue
            </h5>
            <p className="text-x leading-relaxed">
              Auto Cluster Exhibition Center, Pune, India            </p>
          </div>
        </div>
      </Container>

      {/* Bottom Section */}
      <Container>
        <div className="border-t border-white/10 py-8 text-xs font-sans">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Organised By */}
            <div className="flex min-w-0 flex-wrap items-center gap-3">
              <span className="text-[16px] uppercase tracking-wider text-neutral-100 font-bold">Organised By</span>
              <Image
                src="/maxx_logo (1).png"
                alt="ITE"
                width={270}
                height={75}
                className="h-auto w-auto max-w-[140px] object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:max-w-[200px]"
              />
            </div>

            {/* Powered By */}
        
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-neutral-900 pt-6 text-[16px] text-neutral-500 md:flex-row md:justify-between md:items-center">
            <p>© IndiaMet 2027. All Rights Reserved.</p>
            <div className="flex items-center gap-3 flex-wrap">
              <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
              <span className="text-neutral-800">|</span>
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <span className="text-neutral-800">|</span>
              <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}