import { ILoginform, createUser } from "@/types";
import {
  adminApi,
  axiosProcessor,
  getAccessJWt,
  getRefreshJWT,
} from "./axiosProcessor";
const clientApi = import.meta.env.CLIENT_API;

// create user
export const postNewAdmin = (data: createUser) => {
  const obj = {
    method: "post",
    url: adminApi,
    obj: data,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
// update user
export const updateAdmin = (data: FormData) => {
  return axiosProcessor({
    method: "put",
    url: `${adminApi}/update-profile`,
    obj: data,
    isPrivate: true,
  });
};
export const getAllAdmins = () => {
  const obj = {
    method: "get",
    url: adminApi + "/get-admins",
    isPrivate: true,
  };
  return axiosProcessor(obj);
};

export const getAllUsers = () => {
  const obj = {
    method: "get",
    url: clientApi,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
export const updatePassword = (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  const obj = {
    method: "put",
    url: adminApi + "/change-password",
    obj: data,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
export const getAdmin = () => {
  const obj = {
    method: "get",
    url: adminApi,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};

export const loginUser = (logInData: ILoginform) => {
  const obj = {
    method: "post",
    url: adminApi + "/login",
    obj: logInData,
  };
  return axiosProcessor(obj);
};

// export const verifyAccount = (object) => {
//   const obj = {
//     method: "put",
//     url: adminApi + "/verify",
//     obj: object,
//   };
//   return axiosProcessor(obj);
// };

export const getNewAccessJWT = () => {
  //refreshtoken is sent to get access token
  const obj = {
    method: "get",
    url: adminApi + "/get-accessjwt",
    isPrivate: true,
    refreshToken: true,
  };
  return axiosProcessor(obj);
};

export const logoutUser = () => {
  const obj = {
    method: "post",
    url: "http://localhost:8000/logout",
    obj: {
      accessJWT: getAccessJWt(),
      refreshJWT: getRefreshJWT(),
    },
  };
  return axiosProcessor(obj);
};

export const reqOTP = (email: string) => {
  const obj = {
    method: "post",
    url: adminApi + "/request-otp",
    obj: { email },
  };
  return axiosProcessor(obj);
};
export const verifyOTP = ({ otp, email }: { otp: string; email: string }) => {
  const obj = {
    method: "post",
    url: adminApi + "/verify-otp",
    obj: { email, otp },
  };
  return axiosProcessor(obj);
};
export const changePassword = ({
  email,
  password,
}: {
  password: string;
  email: string;
}) => {
  const obj = {
    method: "post",
    url: adminApi + "/change-password",
    obj: { password, email },
    isPrivate: true,
  };
  return axiosProcessor(obj);
};
