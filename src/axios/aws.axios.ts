import { axiosProcessor, rootApi } from "./axiosProcessor";
const awsURL = rootApi + "/api/v1/aws";
export const getAllImages = (limit: number) => {
  return axiosProcessor({
    method: "get",
    url: `${awsURL}?limit=${limit}`,
    isPrivate: true,
  });
};
export const deleteImage = (key: string) => {
  return axiosProcessor({
    method: "delete",
    url: `${awsURL}`,
    isPrivate: true,
    obj: { key },
  });
};
