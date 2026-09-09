'use client';

type PassData = {
  registrationNumber: string;
  qrToken: string;
  name?: string;
  company?: string;
  city?: string;
  state?: string;
  passUrl: string;
  event?: {
    name: string;
    dates: string;
    venue: string;
  };
};

export default function VisitorPassCard({
  pass,
  compact = false,
}: {
  pass: PassData;
  compact?: boolean;
}) {
  const initial = (pass.name || 'V').trim().charAt(0).toUpperCase();
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(pass.passUrl || pass.qrToken)}`;
  const location = [pass.city, pass.state].filter(Boolean).join(', ');

  return (
    <div
      className={`mx-auto overflow-hidden rounded-sm border border-gray-100 bg-white shadow-lg ${
        compact ? 'w-full max-w-sm' : 'w-full max-w-md'
      }`}
    >
      <div className="bg-[#03193D] px-6 py-3 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#CC9808]">Visitor Pass</p>
      </div>
      <div className="px-6 py-6 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-sm bg-[#CC9808] text-2xl font-bold text-white">
          {initial}
        </div>
        <h3 className="font-bebas text-2xl uppercase tracking-wide text-[#03193D]">{pass.name || 'Visitor'}</h3>
        <p className="text-sm text-gray-600">{pass.company || 'India Tyre Show 2027'}</p>
        {location && <p className="mt-1 text-xs text-gray-500">{location}</p>}

        <div className="relative mx-auto mt-5 w-fit rounded-sm bg-[#FCF8F3] p-3">
          <img src={qrSrc} alt="Visitor pass QR code" className="h-48 w-48" />
          <span className="pointer-events-none absolute inset-x-6 top-1/2 h-0.5 -translate-y-1/2 bg-[#CC9808]/80" />
        </div>
        <p className="mt-3 text-xs font-medium text-gray-600">Scan at entry for instant check-in</p>
        <p className="mt-2 font-mono text-sm font-semibold text-[#CC9808]">{pass.registrationNumber}</p>
        <p className="mt-3 text-xs text-gray-600">
          {pass.event?.name || 'India Tyre Show 2027'} · {pass.event?.dates || '22–24 April 2027'}
        </p>
        <p className="text-xs text-gray-500">{pass.event?.venue || 'Auto Cluster Exhibition Center, Pune'}</p>
        <div className="mt-4 inline-flex rounded-sm bg-[#CC9808]/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#CC9808]">
          Visitor
        </div>
      </div>
    </div>
  );
}
