import { prepaidCardsApi } from "./axios";

export const getAllLearningVideos = async () => {
  const response = await prepaidCardsApi('/learning-videos');
  return response?.data?.data;
};

export const getSingleLearningVideo = async (id: string) => {
  const response = await prepaidCardsApi(`/learning-videos/${id}`);
  return response?.data?.data;
};
