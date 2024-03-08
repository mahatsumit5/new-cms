import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

export interface IUser {
  _id: string;
  status: string;
  fName: string;
  lName: string;
  phone: string;

  email: string;
  isVerified: boolean;
  verificationCode: string | null;
  address: string;
  profile: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICategory {
  _id: string;
  status: string;
  title: string;
  slug: string;
  image: string;
  parentCategory: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IParentCategory {
  _id: string;
  status: string;
  title: string;
  slug: string;

  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ILoginform {
  email: string;
  password: string;
}
export interface IAxiosProcessParams {
  method: string;
  url: string;
  obj?: object;
  isPrivate?: boolean;
  refreshToken?: boolean;
}
export type HandleResetPasswordProps = {
  email: string;
  otp: string;
  password: string;
};
export type RequestOtpProps = {
  handleOnOTPRequest: (email: string) => Promise<void>;
};
export type ResetPasswordProps = {
  handleOnResetPassword: (obj: HandleResetPasswordProps) => Promise<void>;
  email: string;
  setFormToShow: Dispatch<SetStateAction<"reset" | "otp" | "verify">>;
};

export type TypeForm = UseFormReturn<
  {
    category: string;
    title: string;
    qty: string;
    price: string;
    salesPrice?: string;
    sku: string;
    salesStartDate?: Date;
    salesEndDate?: Date;
    description: string;
    status: boolean;
    size: string[];
    color: string[];
  },
  undefined
>;
export type TAxiosProcessor = Promise<{
  status: "success" | "error";
  message: string;
  result?: [];
  user?: IUser;
  token?: { accessJWT: string; refreshJWT: string };
  accessJWT?: string;
  imagesToDelete?: string | string[];
}>;
export type TAxiosProcessorError = {
  code: string;
  response: {
    data: {
      status: "error";
      message: string;
    };
    status: number;
  };
  message: string;
};
export interface ICatDialogProps {
  title: string;
  buttonName: string;
  children: React.ReactNode;
  item?: ICategory;
}

export interface IProduct {
  _id: string;
  status: "active" | "Inactive";
  title: string;
  slug: string;
  price: number;
  qty: number;
  sku: string;
  salesPrice: number;
  salesStartDate: Date | null;
  salesEndDate: Date | null;
  color: string[];
  size: string[];
  category: string;
  description: string;
  thumbnail: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IDeletePaymentParams {
  _id: string;
}

export interface ICreateUpdatePaymentParams {
  title: string;
  description: string;
}

export interface IPayment {
  _id: string;
  status: "active" | "Inactive";
  title: string;
  description: string;
  __v: number;
}
