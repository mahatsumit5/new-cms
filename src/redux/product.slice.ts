import { IProduct } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Tinitial = {
  product: IProduct[];
};
const initialState: Tinitial = {
  product: [],
};

const catagorySlice = createSlice({
  name: "Catagory",
  initialState,
  reducers: {
    setProducts: (state, { payload }: PayloadAction<IProduct[]>) => {
      if (state.product.length === 0 && payload.length === 0) {
        return;
      }
      state.product = payload;
    },
  },
});
const { reducer, actions } = catagorySlice;
export const { setProducts } = actions;
export default reducer;
