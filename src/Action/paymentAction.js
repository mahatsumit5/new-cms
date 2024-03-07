import { toast } from "react-toastify";
import {
  deletePayment,
  getPayments,
  postPayment,
  updatePayment,
} from "../axiosHelper/paymentAxios";
import { setPayments } from "../redux/paymentSlice";

export const postPaymentOptions = (obj) => async (dispatch) => {
  const pendingResp = postPayment(obj);
  toast.promise(pendingResp, { pending: "Please wait" });
  const { status, message } = await pendingResp;
  toast[status](message);
  dispatch(getPaymentsAction());
};
export const getPaymentsAction = () => async (dispatch) => {
  const { status, message, data } = await getPayments();
  if (status === "success") {
    dispatch(setPayments(data));

    return true;
  } else return false;
};
export const deletePaymentAction = (_id) => async (dispatch) => {
  const { status, message } = await deletePayment(_id);
  toast[status](message);
  dispatch(getPaymentsAction());
};
export const updatePaymentAction = (obj) => async (dispatch) => {
  console.log(obj);
  const { status, message } = await updatePayment(obj);
  dispatch(getPaymentsAction());
};
