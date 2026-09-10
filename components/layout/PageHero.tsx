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
    <div className="border-neutral-900 bg-gradient-to-r from-[#03193D] to-[#CC9808]/80 py-12 text-white sm:py-16 md:py-20">
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-2.5 text-center">
          <h1 className="font-bebas text-4xl uppercase leading-none tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
            {title && accent ? ' ' : null}
            {accent ? <span className="text-[#CC9808]">{accent}</span> : null}
          </h1>
          {subtitle ? (
            <p className="mt-1 max-w-3xl font-sans text-sm leading-relaxed text-neutral-400 sm:text-base md:text-lg">
              {subtitle}
            </p>
          ) : null}
          {children ? <div className="mt-4 flex justify-center">{children}</div> : null}
        </div>
      </Container>
    </div>
  );
}
