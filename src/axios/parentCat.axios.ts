import { axiosProcessor, rootApi } from "./axiosProcessor";

const categoryApi = rootApi + "/api/v1/parentCat";

export const getParentCategory = () => {
  const obj = {
    method: "get",
    url: categoryApi,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
