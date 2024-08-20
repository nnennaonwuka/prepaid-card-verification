import { Skeleton } from "@/components/ui/skeleton";

const LearningVideosSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {Array(12)
        .fill("-")
        .map((_, i) => (
          <div className="w-[290px]" key={i}>
            <Skeleton className="h-[158px] w-full rounded-t-[10px]" />
            <div className="flex h-[5rem] cursor-pointer items-center gap-4 rounded-b-[10px] bg-white p-5">
              <Skeleton className="h-9 w-9" />
              <div>
                <Skeleton className="mb-2 h-2 w-[12rem]" />
                <Skeleton className="h-2 w-[12rem]" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LearningVideosSkeleton;
