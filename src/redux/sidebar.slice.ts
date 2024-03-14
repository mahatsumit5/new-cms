import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { isOpen: boolean } = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    toogleSideBar: (state, { payload }: PayloadAction<boolean>) => {
      state.isOpen = payload;
    },
  },
});
const { reducer, actions } = sidebarSlice;
export const { toogleSideBar } = actions;
export default reducer;
