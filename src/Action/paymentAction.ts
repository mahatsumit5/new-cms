import { ICreateUpdatePaymentParams, IDeletePaymentParams } from "@/types";

import { AppDispatch } from "@/store";
import {
  deletePayment,
  getPayments,
  postPayment,
  updatePayment,
} from "@/axios/paymentAxios";
import { setPayments } from "@/redux/payment.slice";
import { closeDialog } from "@/redux/dialog.slice";
import { showToast } from "@/lib/utils";

export const postPaymentOptions =
  (obj: ICreateUpdatePaymentParams) => async (dispatch: AppDispatch) => {
    const pendingResp = postPayment(obj);
    showToast(pendingResp);

    const { status } = await pendingResp;

    if (status === "success") {
      dispatch(getPaymentsAction());
    }
  };
export const getPaymentsAction = () => async (dispatch: AppDispatch) => {
  const { status, result } = await getPayments();
  if (status === "success" && result?.length) {
    dispatch(setPayments(result));
  }
};
export const deletePaymentAction =
  (_id: IDeletePaymentParams) => async (dispatch: AppDispatch) => {
    const pendingResp = deletePayment(_id);
    showToast(pendingResp);

    const { status } = await pendingResp;
    if (status === "success") {
      dispatch(getPaymentsAction());
      dispatch(closeDialog());
    }
  };
export const updatePaymentAction =
  (obj: ICreateUpdatePaymentParams) => async (dispatch: AppDispatch) => {
    const pendingResp = updatePayment(obj);
    showToast(pendingResp);

    const { status } = await pendingResp;
    if (status === "success") {
      dispatch(closeDialog());
      dispatch(getPaymentsAction());
    }
  };
