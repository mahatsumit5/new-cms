import { getOrders, updateOrder } from "../axiosHelper/orderAxios";
import { setOrder } from "../redux/orderSlice";

export const getOrderAction = () => async (dispatch) => {
  const { status, message, result } = await getOrders();
  if (status === "success") {
    dispatch(setOrder(result));
  }
};

export const updateOrderAction = (obj) => async (dispatch) => {
  const { status, message } = updateOrder(obj);
  if (status === "success") {
    dispatch(getOrderAction());
  }
};
