import { axiosProcessor, rootApi } from "./axiosProcessor";

const productApi = rootApi + "/api/v1/product";

export const postProduct = (productObj: FormData) => {
  const obj = {
    method: "post",
    url: productApi,
    obj: productObj,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
export const getProducts = (_id?: string) => {
  const obj = {
    method: "get",
    url: _id ? productApi + "/" + _id : productApi,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
export const deleteProduct = (_id: string) => {
  const obj = {
    method: "delete",
    url: productApi + "/" + _id,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
export const updateProduct = (data: FormData) => {
  const obj = {
    method: "put",
    url: productApi,
    obj: data,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
