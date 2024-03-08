import { IPayment } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Tinitial = {
  payment: IPayment[];
};
const initialState: Tinitial = {
  payment: [],
};

const paymentSlice = createSlice({
  name: "Payment",
  initialState,
  reducers: {
    setPayments: (state, { payload }: PayloadAction<IPayment[]>) => {
      if (state.payment.length === 0 && payload.length === 0) {
        return;
      }
      state.payment = payload;
    },
  },
});
const { reducer, actions } = paymentSlice;
export const { setPayments } = actions;
export default reducer;
