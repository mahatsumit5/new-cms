import { IAxiosProcessParams, TAxiosProcessor } from "@/types";
import axios from "axios";
import { getNewAccessJWT, logoutUser } from "./userAxios";
// export const rootApi = import.meta.env.VITE_ROOTSERVER;
export const rootApi = !import.meta.env.PROD
  ? "http://192.168.20.13:8080"
  : import.meta.env.VITE_ROOTSERVER;

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
      await logoutUser();
    }

    return {
      status: "error",
      message: error.response ? error?.response?.data?.message : error.message,
    };
  }
};

export const UploadImageToS3Bucket = (data: FormData) => {
  const obj = {
    method: "post",
    url: rootApi + "/api/v1/image",
    obj: data,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
