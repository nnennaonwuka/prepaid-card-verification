import { feather } from "@/app/fonts";
import NoNotificationIcon from "@/assets/icons/no-notification.svg";
import NotificationIcon from "@/assets/icons/notification.svg";
import MemberFallbackImage from "@/assets/images/member-fallback.svg";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useClearAllUserNotifications, useReadUserNotifications } from "@/hooks/tansack-query/mutations/notifications";
import { useGetAllUserNotifications } from "@/hooks/tansack-query/queries/notifications";
import Image from "next/image";
import { FC, Fragment, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import ImageWithFallback from "./ImageWithFallback";
import NotificationsSkeleton from "./NotificationsSkeleton";

const Notifications: FC = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const { notifications, notificationsLoading, notificationsError } = useGetAllUserNotifications();
  const { readNotifications } = useReadUserNotifications();
  const { clearNotifications, isClearingNotifications } = useClearAllUserNotifications();
  const isUnreadPresent = notifications?.some(notification => !notification.is_read);
  const notificationIds = notifications?.map(notification => ({ notification_id: notification.notification_id }));

  const handleNotificationOpen = () => {
    if (isNotificationsOpen && notificationIds?.length) {
      readNotifications(notificationIds);
    }
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const handleClearNotifications = () => {
    notificationIds?.length && clearNotifications(notificationIds);
  };

  return (
    <Popover open={isNotificationsOpen} onOpenChange={handleNotificationOpen}>
      <PopoverTrigger asChild>
        <div className="relative flex h-full w-10 items-center justify-center rounded-full bg-[#75748F1A]">
          <Image src={NotificationIcon} alt="Notification Icon" className="h-[18px] w-[18px] cursor-pointer" />
          <div className={`absolute right-1 top-0 h-3 w-3 rounded-full bg-destructive ${isUnreadPresent || "hidden"}`}></div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-h-[30rem] min-h-[20rem] w-[30rem] rounded-[12px] px-5 pt-10 pb-6" align="center" sideOffset={30}>
        <div className="mb-4">
          <div className="mb-3">
            <h4 className={`${feather.className} text-[1.25rem] font-bold`}>Notification</h4>
          </div>
          {notificationsLoading ? (
            <NotificationsSkeleton />
          ) : notifications?.length === 0 ? (
            <div className="mt-3 flex h-40 flex-col items-center justify-center gap-6">
              <Image src={NoNotificationIcon} alt="no notification icon" width={40} height={40} />
              <p className={`${feather.className}`}>No Notification Found </p>
            </div>
          ) : (
            <div className="h-[20rem] overflow-auto">
              {notifications?.map(notification => (
                <div className="grid grid-cols-[40px_1fr_auto] gap-x-4 border-b border-primary-gray py-4" key={notification.notification_id}>
                  <ImageWithFallback
                    className="row-span-2 h-10 w-10 rounded-[5px] border-[0.45px] border-primary-gray"
                    src={notification.content.image}
                    alt={`${notification.content.name} image`}
                    fallbackSrc={MemberFallbackImage}
                    width={500}
                    height={500}
                  />
                  <p className="font-bold">{notification.content.message}</p>
                  <div className={`h-3 w-3 justify-self-end rounded-full bg-destructive ${notification.is_read && "invisible"}`}></div>
                  <p className="text-sm">{`${notification.content.name} ${notification.content.ik_number}`}</p>
                  <p className="justify-self-end text-sm">{notification.created_at}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={`${notifications?.length || "hidden"} mt-auto`}>
          <Button
            variant="outline"
            className={`${feather.className} w-[6.375rem] rounded-[10px] px-2 disabled:border-primary-green`}
            disabled={isClearingNotifications}
            onClick={handleClearNotifications}
          >
            {isClearingNotifications ? <ClipLoader color="#59C903" size={20} /> : "Clear All"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
