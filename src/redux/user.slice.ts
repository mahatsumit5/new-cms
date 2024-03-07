import { IUser } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type TinititalState = {
  user: IUser;
};
const initialState: TinititalState = {
  user: {
    _id: "",
    email: "",
    fName: "",
    lName: "",
    __v: 0,
    address: "",
    createdAt: "",
    isVerified: false,
    phone: "",
    profile: "",
    status: "",
    updatedAt: "",
    verificationCode: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const { setUser } = actions;
export default reducer;
// export the action creator for other components to use it in dispatch() function of redux store
