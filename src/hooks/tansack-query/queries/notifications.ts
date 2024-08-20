import { getAllUserNotifications } from "@/api/notifications";
import { NotificationsData } from "@/app/(prepaid-card-portal)/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetAllUserNotifications = () => {
  const {
    data,
    isLoading: notificationsLoading,
    error: notificationsError,
  } = useQuery<NotificationsData[], AxiosError>({
    queryKey: ["notifications"],
    queryFn: () => getAllUserNotifications(),
    refetchOnWindowFocus: true,
    staleTime: 0, // Actively get user notifications
  });

  return {
    notifications: data,
    notificationsLoading,
    notificationsError,
  };
};
