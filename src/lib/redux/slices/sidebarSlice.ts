import type { SidebarState } from "@/lib/redux/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SidebarState = {
  isSidebarOpen: true,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: state => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
