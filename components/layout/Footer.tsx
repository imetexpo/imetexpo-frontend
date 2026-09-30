import Image from 'next/image';
import Link from 'next/link';
import Container from '../ui/container';

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v7h4v-7h3.2l.8-4H13V9c0-.6.4-1 1-1Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.5 9H3.7v11.2h2.8V9ZM5.1 3.8C4.1 3.8 3.3 4.6 3.3 5.6s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8ZM20.3 13.2c0-3.1-1.7-4.5-3.9-4.5-1.8 0-2.6 1-3.1 1.7V9H10.5c0 1.3 0 11.2 0 11.2h2.8v-6.3c.1-.6.5-1.5 1.5-1.5 1 0 1.4.8 1.4 1.6v6.2h2.8v-6.7Z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C18.2 5.4 12 5.4 12 5.4s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 9 2 12.2 2 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6ZM10 15.2V9.2l5.2 3-5.2 3Z" />
    </svg>
  );
}

const socialLinks = [
  { label: 'Facebook', href: '#', Icon: FacebookIcon },
  { label: 'Instagram', href: '#', Icon: InstagramIcon },
  { label: 'LinkedIn', href: '#', Icon: LinkedinIcon },
  { label: 'YouTube', href: '#', Icon: YoutubeIcon },
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

          {/* Opening Hours */}
          <div className="font-sans">
            <h5 className="text-xl font-bold uppercase tracking-wider text-white mb-3 font-bebas">
              Opening Hours
            </h5>
            <div className="space-y-1.5 text-x">
              <p>13 May 2027: 10:00 - 18:00</p>
              <p>14 May 2027: 10:00 - 18:00</p>
              <p>15 May 2027: 10:00 - 16:00</p>
            </div>
          </div>

          {/* Venue */}
          <div className="font-sans">
            <h5 className="text-xl font-bold uppercase tracking-wider text-white mb-3 font-bebas">
              Exhibition Venue
            </h5>
            <p className="text-x leading-relaxed">
              <p>Auto Cluster Exhibition Centre</p>
Plot No. C-181, Chinchwad East<p>
Mumbai Pune Road,
<p>Pune - 411 019 Maharashtra,
India </p></p></p>
          </div>
        </div>

        <div className="mt-12 flex justify-end">
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 text-white transition-colors hover:border-[#F9B122] hover:text-[#F9B122]"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
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
                src="/maxx_logo (1).png"
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