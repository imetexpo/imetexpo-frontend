import LoadingDots from '@/components/ui/LoadingDots';

export default function DashboardSkeleton() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-[#FCF8F3]">
      <LoadingDots label="Loading dashboard..." />
    </div>
  );
}
