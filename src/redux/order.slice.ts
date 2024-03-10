import { IOrder } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Tinitial = {
  orders: IOrder[];
};
const initialState: Tinitial = {
  orders: [],
};

const orderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    setOrders: (state, { payload }: PayloadAction<IOrder[]>) => {
      if (state.orders.length === 0 && payload.length === 0) {
        return;
      }
      state.orders = payload;
    },
  },
});
const { reducer, actions } = orderSlice;
export const { setOrders } = actions;
export default reducer;
