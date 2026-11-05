import LoadingDots from '@/components/ui/LoadingDots';

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-white">
      <LoadingDots label="Loading page..." />
    </div>
  );
}
