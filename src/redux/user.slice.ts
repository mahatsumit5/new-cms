import { IUser } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type TinititalState = {
  user: IUser | null;
};
const initialState: TinititalState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
    },
    logOut: (state) => {
      state.user = initialState.user;
    },
  },
});

const { reducer, actions } = userSlice;
export const { setUser, logOut } = actions;
export default reducer;
// export the action creator for other components to use it in dispatch() function of redux store
