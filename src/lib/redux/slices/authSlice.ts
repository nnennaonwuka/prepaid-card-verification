import { SSO_WEB } from "@/config";
import { defaultUserConfigs } from "@/lib/constants";
import type { AuthState } from "@/lib/redux/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  user: {
    token: "",
    configs: defaultUserConfigs,
  },
  accessDenied: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserToken: (state, { payload }) => {
      state.user.token = payload;
    },
    updateUserConfigs: (state, { payload }) => {
      state.user.configs = payload;
    },
    logOutUser: () => {
      localStorage.clear();
      window.location.replace(`${SSO_WEB}/logout/?appUrl=${window.location.origin}`);
    },
    updateAccessDenied: (state, { payload }) => {
      state.accessDenied = payload;
    },
  },
});

export const { updateUserToken, updateUserConfigs, logOutUser } = authSlice.actions;

export default authSlice.reducer;
