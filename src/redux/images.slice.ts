import { AwsImageType } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Tinitial = {
  images: AwsImageType[];
};
const initialState: Tinitial = {
  images: [],
};

const imagesSlice = createSlice({
  name: "Images",
  initialState,
  reducers: {
    setImages: (state, { payload }: PayloadAction<AwsImageType[]>) => {
      if (state.images.length === 0 && payload.length === 0) {
        return;
      }
      state.images = payload;
    },
  },
});
const { reducer, actions } = imagesSlice;
export const { setImages } = actions;
export default reducer;
