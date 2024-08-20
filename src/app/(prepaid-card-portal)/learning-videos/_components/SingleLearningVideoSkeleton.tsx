import { Skeleton } from "@/components/ui/skeleton";

const SingleLearningVideoSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-2 w-[20rem]" />
      <Skeleton className="my-3 h-2 w-[40rem]" />
      <Skeleton className="h-[20rem] w-[35rem]" />
    </div>
  );
};

export default SingleLearningVideoSkeleton;
