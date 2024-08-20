import type { UserConfigs } from "@/app/(prepaid-card-portal)/types";

export type SidebarState = {
  isSidebarOpen: boolean;
};

export type DialogState = {
  isFlagErrorFormOpen: boolean;
  isVerifyCardFormOpen: boolean;
  isConfirmationDialogOpen: boolean;
  isSuccessDialogOpen: boolean;
  isCardImageDialogOpen: boolean;
  isCardHistoryDialogOpen: boolean;
  isBgCardInfoDialogOpen: boolean;
  isNotificationsOpen: boolean;
};

export type AuthState = {
  user: {
    token: string;
    configs: UserConfigs;
  };
  accessDenied: boolean;
};
