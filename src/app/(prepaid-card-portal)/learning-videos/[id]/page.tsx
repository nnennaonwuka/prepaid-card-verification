"use client";
import NoLearningVideo from "@/app/(prepaid-card-portal)/learning-videos/_components/NoLearningVideo";
import SingleLearningVideoSkeleton from "@/app/(prepaid-card-portal)/learning-videos/_components/SingleLearningVideoSkeleton";
import { feather } from "@/app/fonts";
import PageWrapper from "@/components/PageWrapper";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useGetSingleLearningVideo } from "@/hooks/tansack-query/queries/learning-videos";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";

const SingleCard = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { singleLearningVideo, singleLearningVideoLoading, singleLearningVideoError } = useGetSingleLearningVideo(params.id);
  const videoTitle = singleLearningVideo?.title.replace(".mp4", "");

  return (
    <PageWrapper showFilter={false} showSearch={false}>
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => router.push("/learning-videos")}>Learning Videos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Watch Video</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {singleLearningVideoLoading ? (
        <SingleLearningVideoSkeleton />
      ) : singleLearningVideoError?.response?.status === 404 ? (
        <NoLearningVideo />
      ) : (
        <div>
          <p className={`${feather.className} text-[1.25rem]`}>{videoTitle}</p>
          <p className="my-3">{`Play the video below to learn about the ${videoTitle}`}</p>
          <ReactPlayer url={singleLearningVideo?.url} controls />
        </div>
      )}
    </PageWrapper>
  );
};

export default SingleCard;
