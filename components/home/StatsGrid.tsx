interface StatItem {
  number: string;
  label: string;
}

interface StatsGridProps {
  stats: StatItem[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="bg-[#FCF8F3] border border-gray-100 rounded-sm p-8 sm:p-0 sm:py-8 lg:py-12">
      <div className="flex flex-col gap-8 sm:grid sm:grid-cols-4 sm:gap-0">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`
              flex flex-col items-start sm:items-center justify-center text-left sm:text-center
              py-0 sm:py-4 px-0 sm:px-4
              ${index !== stats.length - 1 ? 'sm:border-r sm:border-gray-200' : ''}
            `}
          >
            <span className="font-bebas text-3xl sm:text-4xl lg:text-5xl font-bold text-[#CC9808] leading-none tracking-wide">
              {stat.number}
            </span>
            <span className="mt-1.5 sm:mt-3 text-[10px] sm:text-xs font-semibold text-[#03193D] uppercase tracking-wider leading-tight font-sans">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}