import {
  IFrequentlyBoughtItem,
  IOrderStatusCount,
  IOrdersalesByDate,
  IStatusCount,
  ITotalSalesByDate,
  IitemsByCat,
} from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Tinitial = {
  itemsByCategory: IitemsByCat[];
  orderSaleQtybyDate: IOrdersalesByDate[];
  activeAndInactivecount: IStatusCount[];
  orderStatuscount: IOrderStatusCount[];
  frequentlybought: IFrequentlyBoughtItem[];
  totalSales: ITotalSalesByDate[];
};
const initialState: Tinitial = {
  itemsByCategory: [],
  orderSaleQtybyDate: [],
  activeAndInactivecount: [],
  orderStatuscount: [],
  frequentlybought: [],
  totalSales: [],
};

const itemsByCategorySlice = createSlice({
  name: "ItemsByCategory",
  initialState,
  reducers: {
    setItemsByCat: (state, { payload }: PayloadAction<IitemsByCat[]>) => {
      if (state.itemsByCategory.length === 0 && payload.length === 0) {
        return;
      }
      state.itemsByCategory = payload;
    },
    setTotalSales: (state, { payload }: PayloadAction<ITotalSalesByDate[]>) => {
      if (state.totalSales.length === 0 && payload.length === 0) {
        return;
      }
      state.totalSales = payload;
    },
    setFrequentlyBought: (
      state,
      { payload }: PayloadAction<IFrequentlyBoughtItem[]>
    ) => {
      if (state.frequentlybought.length === 0 && payload.length === 0) {
        return;
      }
      state.frequentlybought = payload;
    },
    setorderStatusCount: (
      state,
      { payload }: PayloadAction<IOrderStatusCount[]>
    ) => {
      if (state.orderStatuscount.length === 0 && payload.length === 0) {
        return;
      }
      state.orderStatuscount = payload;
    },
    setStatusCount: (state, { payload }: PayloadAction<IStatusCount[]>) => {
      if (state.activeAndInactivecount.length === 0 && payload.length === 0) {
        return;
      }
      state.activeAndInactivecount = payload;
    },
    setOrderSalesQtyByDate: (
      state,
      { payload }: PayloadAction<IOrdersalesByDate[]>
    ) => {
      if (state.orderSaleQtybyDate.length === 0 && payload.length === 0) {
        return;
      }
      state.orderSaleQtybyDate = payload;
    },
  },
});
const { reducer, actions } = itemsByCategorySlice;
export const {
  setItemsByCat,
  setOrderSalesQtyByDate,
  setStatusCount,
  setorderStatusCount,
  setFrequentlyBought,
  setTotalSales,
} = actions;
export default reducer;
