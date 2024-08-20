import { getAllLearningVideos, getSingleLearningVideo } from "@/api/learning-videos";
import { LearningVideosData, SingleLearningVideoData } from "@/app/(prepaid-card-portal)/learning-videos/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetAllLearningVideos = () => {
  const {
    data,
    isLoading: learningVideosLoading,
    error: learningVideosError,
  } = useQuery<LearningVideosData[]>({
    queryKey: ["learning-videos"],
    queryFn: () => getAllLearningVideos(),
  });

  return {
    learningVideos: data,
    learningVideosLoading,
    learningVideosError,
  };
};

export const useGetSingleLearningVideo = (id: string) => {
  const {
    data,
    isLoading: singleLearningVideoLoading,
    error: singleLearningVideoError,
  } = useQuery<SingleLearningVideoData, AxiosError>({
    queryKey: ["single-learning-video", id],
    queryFn: () => getSingleLearningVideo(id),
  });

  return {
    singleLearningVideo: data,
    singleLearningVideoLoading,
    singleLearningVideoError,
  };
};


