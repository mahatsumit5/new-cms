import { IAxiosProcessParams, TAxiosProcessor } from "@/types";
import axios from "axios";
import { getNewAccessJWT, logoutUser } from "./userAxios";

export const rootApi = !import.meta.env.PROD
  ? "http://localhost:8000"
  : "http://cms-server-env.eba-chhpa4gj.us-east-1.elasticbeanstalk.com";
// export const rootApi = import.meta.env.VITE_ROOTSERVER;

export const adminApi = rootApi + "/api/v1/admin";

export const getAccessJWt = () => {
  return sessionStorage.getItem("accessJWT");
};
export const getRefreshJWT = () => {
  return localStorage.getItem("refreshJWT");
};
export const axiosProcessor = async ({
  method,
  url,
  obj,
  isPrivate,
  refreshToken,
}: IAxiosProcessParams): TAxiosProcessor => {
  const token = refreshToken ? getRefreshJWT() : getAccessJWt();
  const headers = {
    Authorization: isPrivate ? token : null,
  };
  try {
    const { data } = await axios({
      method,
      url,
      data: obj,
      headers,
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (
      error?.response?.status === 403 &&
      error?.response?.data?.message ===
        "Your token has expired. Please login Again"
    ) {
      // 1. get new access Jwt
      const { status, accessJWT } = await getNewAccessJWT();
      if (status === "success" && accessJWT) {
        sessionStorage.setItem("accessJWT", accessJWT);
        return axiosProcessor({ method, url, obj, isPrivate, refreshToken });
      }
    }
    if (error?.response?.data?.message === "jwt expired") {
      console.log(error);
      logoutUser("");
    }
    return {
      status: "error",
      message: error.response ? error?.response?.data?.message : error.message,
    };
  }
};
const productApi = rootApi + "/api/v1/product";

export const deleteImageFromServer = (img: { fileName: string }) => {
  const obj = {
    method: "post",
    url: productApi + "/deleteFileFromServer",
    obj: img,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
