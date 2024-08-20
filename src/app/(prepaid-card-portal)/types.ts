export type UserConfigs = {
  canViewUnresolvedCardNumber: boolean;
  canViewPreloadedCards: boolean;
  canViewUnresolvedCardPan: boolean;
  canViewUnverifiedCardPan: boolean;
  canViewUnverifiedCardNumber: boolean;
  canViewUnresolvedCardImage: boolean;
  canViewUnverifiedCardImage: boolean;
  canVerifyCard: boolean;
  canFlagCardError: boolean;
};

export type UserProfileData = {
  staff_id: string;
  staff_name: string;
  staff_picture: string;
  configs: UserConfigs;
};

export type NotificationsData = {
  staff_id: string;
  notification_id: string;
  is_read: number;
  is_cleared: number;
  content: {
    name: string;
    message: string;
    image: string;
    ik_number: string;
  };
  created_at: string;
};

export type ReadNotificationsServerData = {
  notification_id: string;
};
