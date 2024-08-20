import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

const NotificationsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array(12)
        .fill("-")
        .map((_, i) => (
          <Fragment key={i}>
            <div className="grid grid-cols-[40px_1fr_auto] gap-x-4">
              <Skeleton className="row-span-2 h-[40px] w-[40px] rounded-[5px]" />
              <Skeleton className="h-3" />
              <Skeleton className="h-3 w-3 justify-self-end rounded-full" />
              <Skeleton className="h-3" />
              <Skeleton className="h-3 w-16 justify-self-end" />
            </div>
            <Skeleton className="h-0.5" />
          </Fragment>
        ))}
    </div>
  );
};

export default NotificationsSkeleton;
