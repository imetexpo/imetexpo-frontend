import { ReactNode } from 'react';

export default function SideCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-sm border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-3 flex items-center gap-2 font-bebas text-xl uppercase tracking-wide text-[#F9B122]">
        {icon && <span>{icon}</span>}
        {title}
      </h3>
      {children}
    </div>
  );
}

export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2 py-1 text-sm text-gray-700">
      <span className="mt-0.5 text-[#F9B122]">✓</span>
      <span>{children}</span>
    </li>
  );
}

export function DateItem({ label, date, last }: { label: string; date: string; last?: boolean }) {
  return (
    <div className={`relative pb-4 pl-5 ${last ? 'pb-0' : ''}`}>
      {!last && <span className="absolute bottom-0 left-[3px] top-3 w-px bg-[#F9B122]/30" />}
      <span className="absolute left-0 top-1 h-2 w-2 rounded-full bg-[#F9B122]" />
      <p className="text-sm font-medium text-[#031A34]">{label}</p>
      <p className="text-xs font-semibold text-[#F9B122]">{date}</p>
    </div>
  );
}
