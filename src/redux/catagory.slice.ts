import { ICategory, IParentCategory } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Tinitial = {
  catalogue: ICategory[];
  parentCategory: IParentCategory[];
};
const initialState: Tinitial = {
  catalogue: [],
  parentCategory: [],
};

const catagorySlice = createSlice({
  name: "Catagory",
  initialState,
  reducers: {
    setCatagory: (state, { payload }: PayloadAction<ICategory[]>) => {
      if (state.catalogue.length === 0 && payload.length === 0) {
        return;
      }
      state.catalogue = payload;
    },
    setParentCategory: (
      state,
      { payload }: PayloadAction<IParentCategory[]>
    ) => {
      if (state.catalogue.length === 0 && payload.length === 0) {
        return;
      }
      state.parentCategory = payload;
    },
  },
});
const { reducer, actions } = catagorySlice;
export const { setCatagory, setParentCategory } = actions;
export default reducer;
