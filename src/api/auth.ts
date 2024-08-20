import { prepaidCardsApi } from "./axios";

export const getUserProfile = async () => {
  const response = await prepaidCardsApi("/user-profile");
  return response?.data?.data;
};
