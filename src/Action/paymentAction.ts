import { ICreateUpdatePaymentParams, IDeletePaymentParams } from "@/types";

import { setPayments } from "../redux/paymentSlice";
import { AppDispatch } from "@/store";
import {
  deletePayment,
  getPayments,
  postPayment,
  updatePayment,
} from "@/axios/paymentAxios";
import { toast } from "sonner";

export const postPaymentOptions =
  (obj: ICreateUpdatePaymentParams) => async (dispatch: AppDispatch) => {
    const pendingResp = postPayment(obj);
    const { status, message } = await pendingResp;
    toast(message);
    if (status === "success") {
      dispatch(getPaymentsAction());
    }
  };
export const getPaymentsAction = () => async (dispatch: AppDispatch) => {
  const { status, result } = await getPayments();
  if (status === "success") {
    dispatch(setPayments(result));

    return true;
  } else return false;
};
export const deletePaymentAction =
  (_id: IDeletePaymentParams) => async (dispatch: AppDispatch) => {
    const { status, message } = await deletePayment(_id);
    toast(message);
    if (status === "success") {
      dispatch(getPaymentsAction());
    }
  };
export const updatePaymentAction =
  (obj: ICreateUpdatePaymentParams) => async (dispatch: AppDispatch) => {
    console.log(obj);
    const { status, message } = await updatePayment(obj);
    toast(message);
    if (status === "success") {
      dispatch(getPaymentsAction());
    }
  };
