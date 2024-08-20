import type { DialogState } from "@/lib/redux/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: DialogState = {
  isFlagErrorFormOpen: false,
  isVerifyCardFormOpen: false,
  isConfirmationDialogOpen: false,
  isSuccessDialogOpen: false,
  isCardHistoryDialogOpen: false,
  isCardImageDialogOpen: false,
  isBgCardInfoDialogOpen: false,
  isNotificationsOpen: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openFlagErrorForm: state => {
      state.isFlagErrorFormOpen = true;
    },
    closeFlagErrorForm: state => {
      state.isFlagErrorFormOpen = false;
    },
    openVerifyCardForm: state => {
      state.isVerifyCardFormOpen = true;
    },
    closeVerifyCardForm: state => {
      state.isVerifyCardFormOpen = false;
    },
    openConfirmationDialog: state => {
      state.isConfirmationDialogOpen = true;
    },
    closeConfirmationDialog: state => {
      state.isConfirmationDialogOpen = false;
    },
    openSuccessDialog: state => {
      state.isSuccessDialogOpen = true;
    },
    closeSuccessDialog: state => {
      state.isSuccessDialogOpen = false;
    },
    openCardImageDialog: state => {
      state.isCardImageDialogOpen = true;
    },
    closeCardImageDialog: state => {
      state.isCardImageDialogOpen = false;
    },
    openCardHistoryDialog: state => {
      state.isCardHistoryDialogOpen = true;
    },
    closeCardHistoryDialog: state => {
      state.isCardHistoryDialogOpen = false;
    },
    openBgCardInfoDialog: state => {
      state.isBgCardInfoDialogOpen = true;
    },
    closeBgCardInfoDialog: state => {
      state.isBgCardInfoDialogOpen = false;
    },
    openNotifications: state => {
      state.isNotificationsOpen = true;
    },
    closeNotifications: state => {
      state.isNotificationsOpen = false;
    },
  },
});

export const {
  openFlagErrorForm,
  closeFlagErrorForm,
  openVerifyCardForm,
  closeVerifyCardForm,
  openConfirmationDialog,
  closeConfirmationDialog,
  openSuccessDialog,
  closeSuccessDialog,
  openCardImageDialog,
  closeCardImageDialog,
  openCardHistoryDialog,
  closeCardHistoryDialog,
  openBgCardInfoDialog,
  closeBgCardInfoDialog,
  openNotifications,
  closeNotifications,
} = dialogSlice.actions;

export default dialogSlice.reducer;
