import { getOrders, updateOrder } from "@/axios/order.axios";
import { setOrders } from "@/redux/order.slice";
import { AppDispatch } from "@/store";
import { IOrder } from "@/types";

export const getOrderAction = () => async (dispatch: AppDispatch) => {
  const { status, result } = await getOrders();
  if (status === "success" && result?.length) {
    dispatch(setOrders(result as IOrder[]));
  }
};

export const updateOrderAction =
  (obj: object) => async (dispatch: AppDispatch) => {
    const { status } = await updateOrder(obj);
    if (status === "success") {
      dispatch(getOrderAction());
    }
  };
