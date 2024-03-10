import { axiosProcessor, rootApi } from "./axiosProcessor";

const orderApi = rootApi + "/api/v1/order";
export const getOrders = (_id?: string) => {
  const obj = {
    method: "get",
    url: _id ? orderApi + "/" + _id : orderApi,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};

export const updateOrder = (dataToUpd: object) => {
  const obj = {
    method: "put",
    url: orderApi,
    obj: dataToUpd,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
