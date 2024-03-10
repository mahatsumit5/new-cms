import { IDialog } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IDialog = {
  buttonName: "",
  children: null,
  isOpen: true,
  title: "",
};

const paymentSlice = createSlice({
  name: "Dialog",
  initialState,
  reducers: {
    openDialog: (state, { payload }: PayloadAction<IDialog>) => {
      state.buttonName = payload.buttonName || "";
      state.children = payload.children;
      state.isOpen = true;
      state.title = payload.title || "";
    },
    closeDialog: (state) => {
      state.isOpen = false;
    },
  },
});
const { reducer, actions } = paymentSlice;
export const { openDialog, closeDialog } = actions;
export default reducer;
