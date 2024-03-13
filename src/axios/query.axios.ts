import { axiosProcessor, rootApi } from "./axiosProcessor";
const queryApi = rootApi + "/api/v1/query";
export const getDataForChart = () => {
  const obj = {
    method: "get",
    url: queryApi,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
