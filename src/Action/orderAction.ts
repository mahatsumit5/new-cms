import { deleteOrder, getOrders, updateOrder } from "@/axios/order.axios";
import { closeDialog } from "@/redux/dialog.slice";
import { setOrders } from "@/redux/order.slice";
import { AppDispatch } from "@/store";
import { IOrder } from "@/types";
import { toast } from "sonner";
import { getChartDataAction } from "./chart.action";

export const getOrderAction = () => async (dispatch: AppDispatch) => {
  const { status, result } = await getOrders();
  if (status === "success" && result?.length) {
    dispatch(setOrders(result as IOrder[]));
  }
};

export const updateOrderAction =
  (obj: object) => async (dispatch: AppDispatch) => {
    const { status, message } = await updateOrder(obj);
    toast(message);
    if (status === "success") {
      dispatch(getOrderAction());
      dispatch(closeDialog());
      dispatch(getChartDataAction());
    }
  };
export const deleteorderAction =
  (_id: string) => async (dispatch: AppDispatch) => {
    const { status, message } = await deleteOrder(_id);
    toast(message);
    if (status === "success") {
      dispatch(getOrderAction());
      dispatch(getChartDataAction());
      dispatch(closeDialog());
    }
  };
