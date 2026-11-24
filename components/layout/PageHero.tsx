import { ReactNode } from 'react';
import Container from '@/components/ui/container';

type PageHeroProps = {
  title: string;
  accent?: string;
  subtitle?: string;
  children?: ReactNode;
};

export default function PageHero({ title, accent, subtitle, children }: PageHeroProps) {
  return (
    <div className="border-neutral-900 bg-gradient-to-r from-[#0B1F4D] via-[#0B1F4D] to-[#00A1B1] py-8 sm:py-14 md:py-20 text-white">
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 sm:gap-2.5 text-center">
          <h1 className="font-bebas text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-tight tracking-tight">
            {title}
            {title && accent ? ' ' : null}
            {accent ? <span className="text-[#ffffff]">{accent}</span> : null}
          </h1>
          {subtitle ? (
            <p className="mt-1 max-w-3xl font-sans text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-white/80">
              {subtitle}
            </p>
          ) : null}
          {children ? <div className="mt-3 sm:mt-4 flex justify-center w-full">{children}</div> : null}
        </div>
      </Container>
    </div>
  );
}
