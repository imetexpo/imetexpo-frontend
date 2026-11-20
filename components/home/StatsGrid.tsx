interface StatItem {
  number: string;
  label: string;
}

interface StatsGridProps {
  stats: StatItem[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="bg-[#FCF8F3] border border-gray-100 rounded-sm p-4 sm:p-0 sm:py-8 lg:py-12">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-0">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`
              flex flex-col items-center justify-center text-center
              py-2 sm:py-4 px-2 sm:px-4
              ${index % 2 === 0 ? 'border-r border-gray-200 sm:border-r' : 'sm:border-r'}
              ${index === stats.length - 1 ? 'sm:border-r-0' : ''}
              ${index === stats.length - 2 ? 'sm:border-r' : ''}
            `}
          >
            <span className="font-bebas text-2xl sm:text-4xl lg:text-5xl font-bold text-[#00A1B1] leading-none tracking-wide">
              {stat.number}
            </span>
            <span className="mt-1 sm:mt-3 text-[10px] sm:text-xs font-semibold text-[#003A77] uppercase tracking-wider leading-tight font-sans">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}