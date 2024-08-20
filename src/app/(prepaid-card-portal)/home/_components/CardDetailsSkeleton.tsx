import { Skeleton } from "@/components/ui/skeleton";

const CardDetailsSkeleton = () => {
  return (
    <div className="grid grid-cols-[0.3fr_0.7fr] gap-x-4">
      <div className="grid grid-cols-[1fr_1fr] gap-x-4 gap-y-6 self-start bg-white px-5 py-4">
        <Skeleton className="h-[136px] w-[136px] rounded-[8px]" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-3" />
          <Skeleton className="h-3" />
          <Skeleton className="h-3" />
          <Skeleton className="h-3" />
          <Skeleton className="h-3" />
        </div>
      </div>
      <div className="bg-white px-6 pb-12 pt-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-[30%]" />
            <Skeleton className="h-3 w-[20%]" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-3 w-[30%]" />
            <Skeleton className="h-3 w-[20%]" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-3 w-[30%]" />
            <Skeleton className="h-3 w-[20%]" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-3 w-[30%]" />
            <Skeleton className="h-3 w-[20%]" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-3 w-[30%]" />
            <Skeleton className="h-3 w-[20%]" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-3 w-[30%]" />
            <Skeleton className="h-3 w-[20%]" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-3 w-[30%]" />
            <Skeleton className="h-3 w-[20%]" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-3 w-[30%]" />
            <Skeleton className="h-3 w-[20%]" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-3 w-[30%]" />
            <Skeleton className="h-3 w-[20%]" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-3 w-[30%]" />
            <Skeleton className="h-3 w-[20%]" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-3 w-[30%]" />
            <Skeleton className="h-3 w-[20%]" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-3 w-[30%]" />
            <Skeleton className="h-3 w-[20%]" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-3 w-[30%]" />
            <Skeleton className="h-3 w-[20%]" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-3 w-[30%]" />
            <Skeleton className="h-3 w-[20%]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsSkeleton;
