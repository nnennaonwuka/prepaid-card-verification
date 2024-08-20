import { clearAllUserNotifications, readUserNotifications } from "@/api/notifications";
import { ReadNotificationsServerData } from "@/app/(prepaid-card-portal)/types";
import { invalidateQueries } from "@/lib/tansack-query/queryClient";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";

export const useReadUserNotifications = () => {
  const { toast } = useToast();
  const { mutate: readNotifications } = useMutation({
    mutationFn: (data: ReadNotificationsServerData[]) => readUserNotifications(data),
    onSuccess: () => {
      invalidateQueries(["notifications"]);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast({
          description: error?.response?.data.message,
        });
        return;
      }
      toast({
        description: "Failed to perform action",
      });
    },
  });

  return { readNotifications };
};

export const useClearAllUserNotifications = () => {
  const { toast } = useToast();
  const { mutate: clearNotifications, isPending: isClearingNotifications } = useMutation({
    mutationFn: (data: ReadNotificationsServerData[]) => clearAllUserNotifications(data),
    onSuccess: () => {
      invalidateQueries(["notifications"]);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast({
          description: error?.response?.data.message,
        });
        return;
      }
      toast({
        description: "Failed to perform action",
      });
    },
  });

  return { clearNotifications, isClearingNotifications };
};
