import { deleteOrder, getOrders, updateOrder } from "@/axios/order.axios";
import { closeDialog } from "@/redux/dialog.slice";
import { setOrders } from "@/redux/order.slice";
import { AppDispatch } from "@/store";
import { IOrder } from "@/types";
import { getChartDataAction } from "./chart.action";
import { showToast } from "@/lib/utils";

export const getOrderAction = () => async (dispatch: AppDispatch) => {
  const { status, result } = await getOrders();
  if (status === "success" && result?.length) {
    dispatch(setOrders(result as IOrder[]));
  }
};

export const updateOrderAction =
  (obj: object) => async (dispatch: AppDispatch) => {
    const pendingResp = updateOrder(obj);
    showToast(pendingResp);
    const { status } = await pendingResp;

    if (status === "success") {
      dispatch(getOrderAction());
      dispatch(closeDialog());
      dispatch(getChartDataAction());
    }
  };
export const deleteorderAction =
  (_id: string) => async (dispatch: AppDispatch) => {
    const pendingResp = deleteOrder(_id);
    showToast(pendingResp);

    const { status } = await pendingResp;

    if (status === "success") {
      dispatch(getOrderAction());
      dispatch(getChartDataAction());
      dispatch(closeDialog());
    }
  };
