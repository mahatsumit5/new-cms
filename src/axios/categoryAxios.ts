import { updateCategoryParams, uploadCategoryParams } from "@/types";
import { axiosProcessor, rootApi } from "./axiosProcessor";

const categoryApi = rootApi + "/api/v1/category";

export const postCategory = (category: uploadCategoryParams) => {
  const obj = {
    method: "post",
    url: categoryApi,
    obj: category,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
export const getCategories = (_id: string | null = "") => {
  const obj = {
    method: "get",
    url: _id ? categoryApi + "/" + _id : categoryApi,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
export const deleteCatagory = (_id: { _id: string }) => {
  const obj = {
    method: "delete",
    url: categoryApi,
    obj: _id,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
export const updateCatagory = (data: updateCategoryParams) => {
  const obj = {
    method: "put",
    url: categoryApi,
    obj: data,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
