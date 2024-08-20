import { ReadNotificationsServerData } from "@/app/(prepaid-card-portal)/types";
import { prepaidCardsApi } from "./axios";

export const getAllUserNotifications = async () => {
  const response = await prepaidCardsApi("/user-notifications");
  return response?.data?.data;
};

export const readUserNotifications = async (data: ReadNotificationsServerData[]) => {
  await prepaidCardsApi.patch("/user-notifications/read", data);
};

export const clearAllUserNotifications = async (data: ReadNotificationsServerData[]) => {
  await prepaidCardsApi.patch("/user-notifications/clear", data);
};
