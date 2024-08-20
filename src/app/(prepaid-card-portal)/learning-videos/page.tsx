"use client";
import LearningVideo from "@/app/(prepaid-card-portal)/learning-videos/_components/LearningVideo";
import PageWrapper from "@/components/PageWrapper";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useGetAllLearningVideos } from "@/hooks/tansack-query/queries/learning-videos";
import LearningVideosSkeleton from "./_components/LearningVideosSkeleton";
import NoLearningVideo from "./_components/NoLearningVideo";

const LearningVideos = () => {
  const { learningVideos, learningVideosLoading, learningVideosError } = useGetAllLearningVideos();

  return (
    <PageWrapper showFilter={false} showSearch={false}>
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Learning Videos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {learningVideosLoading ? (
        <LearningVideosSkeleton />
      ) : learningVideos?.length === 0 ? (
        <NoLearningVideo />
      ) : (
        <div className="flex flex-wrap gap-4">
          {learningVideos?.map(video => <LearningVideo videoId={video.id} videoTitle={video.title.replace(".mp4", "")} key={video.id} />)}
        </div>
      )}
    </PageWrapper>
  );
};

export default LearningVideos;
