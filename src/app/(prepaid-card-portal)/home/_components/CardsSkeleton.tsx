import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/hooks/redux";

const CardsSkeleton = () => {
  const configs = useAppSelector(state => (state.auth as any).user.configs);
  const { canViewPreloadedCards } = configs;
  const numberOfCards: number = canViewPreloadedCards ? 5 : 4;

  return (
    <div className="mb-6 mt-8 flex gap-4">
      {Array(numberOfCards)
        .fill("-")
        .map((_, i) => (
          <div key={i} className="w-[13rem] rounded-[10px]">
            <Skeleton className="h-[5.375rem]" />
          </div>
        ))}
    </div>
  );
};

export default CardsSkeleton;
