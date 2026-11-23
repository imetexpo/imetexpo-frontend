'use client';

import Image from 'next/image';
import type { VisitorPass } from '@/lib/api/passes';

type VisitorPassCardProps = {
  pass: VisitorPass;
  cardId?: string;
};

export default function VisitorPassCard({ pass, cardId = 'visitor-pass' }: VisitorPassCardProps) {
  const registrationDigits = (pass.registrationNumber || '').replace(/\D/g, '');
  const visitorId = 'IM-' + registrationDigits.slice(-6);

  return (
    <article
      id={cardId}
      data-visitor-pass="true"
      className="mx-auto flex min-h-[540px] w-full max-w-[340px] flex-col overflow-hidden border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,47,92,0.18)]"
    >
      <Image
        src="/indiamet-logo.png"
        alt="IndiaMET"
        width={1288}
        height={374}
        unoptimized
        className="mx-auto mt-[29px] h-auto w-[168px]"
      />
      <div className="mx-auto mt-[57px] h-[2px] w-[calc(100%-24px)] bg-[#00A651]" />

      <div className="flex flex-col items-center px-4 text-center text-black">
        <h3 className="mt-[25px] flex h-[38px] w-full items-center justify-center text-[22px] font-extrabold uppercase leading-tight">
          {pass.name}
        </h3>
        {pass.designation ? (
          <p className="mt-[6px] h-[17px] w-full truncate text-[13px] font-normal uppercase leading-[17px]">
            {pass.designation}
          </p>
        ) : null}
        <p className={(pass.designation ? 'mt-[4px]' : 'mt-[6px]') + ' h-[23px] w-full truncate text-[13px] font-normal uppercase leading-[23px]'}>
          {pass.company}
        </p>
        {pass.country ? (
          <p className={(pass.designation ? 'mt-[4px]' : 'mt-[5px]') + ' h-[15px] w-full truncate text-[12px] font-normal uppercase leading-[15px]'}>
            {pass.country}
          </p>
        ) : null}

        <img
          src={pass.qrDataUrl}
          alt="Visitor pass QR code"
          className={(pass.country ? 'mt-[5px]' : 'mt-[25px]') + ' h-[156px] w-[156px] max-w-full bg-white object-contain'}
        />
        <p className="mt-[2px] h-[17px] text-[10px] font-normal leading-[17px]">
          Visitor ID: {visitorId}
        </p>
      </div>

      <div className="mx-auto mb-[27px] mt-auto flex h-[48px] w-[calc(100%-24px)] items-center justify-center bg-[#00A651] text-[16px] font-bold tracking-[3px] text-black">
        VISITOR
      </div>
    </article>
  );
}
