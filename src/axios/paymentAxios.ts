import { ICreateUpdatePaymentParams, IDeletePaymentParams } from "@/types";
import { axiosProcessor, rootApi } from "./axiosProcessor";

const paymentApi = rootApi + "/api/v1/payment";

export const postPayment = (paymentObj: ICreateUpdatePaymentParams) => {
  const obj = {
    method: "post",
    url: paymentApi,
    obj: paymentObj,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
export const getPayments = () => {
  const obj = {
    method: "get",
    url: paymentApi,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
export const deletePayment = (_id: IDeletePaymentParams) => {
  const obj = {
    method: "delete",
    url: paymentApi,
    isPrivate: true,
    obj: _id,
  };
  return axiosProcessor(obj);
};
export const updatePayment = (status: ICreateUpdatePaymentParams) => {
  const obj = {
    method: "put",
    url: paymentApi,
    obj: status,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
