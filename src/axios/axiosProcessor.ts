import { IAxiosProcessParams, ILoginform } from "@/types";
import axios from "axios";

export const rootApi = !import.meta.env.PROD
  ? "http://localhost:8000"
  : import.meta.env.ROOTSERVER;
export const adminApi = rootApi + "/api/v1/admin";
// const clientApi = import.meta.env.CLIENT_API;
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
}: IAxiosProcessParams) => {
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
  } catch (error) {
    //   if (
    //     error?.response?.status === 403 &&
    //     error?.response?.data?.message ===
    //       "Your token has expired. Please login Again"
    //   ) {
    //     // 1. get new access Jwt
    //     const { status, accessJWT } = await getNewAccessJWT();
    //     if (status === "success") {
    //       sessionStorage.setItem("accessJWT", accessJWT);
    //       return axiosProcessor({ method, url, obj, isPrivate, refreshToken });
    //     }
    //   }
    //   if (error?.response?.data?.message === "jwt expired") {
    //     console.log("refresh token expired");
    //     logoutUser();
    //   }
    //   return {
    //     status: "error",
    //     message: error.response ? error?.response?.data?.message : error.message,
    //     error,
    //   };
    // }
  }
};
