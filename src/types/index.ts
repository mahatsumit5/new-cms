import { ColumnDef } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
export type Key =
  | "catagory"
  | "product"
  | "order"
  | "payment"
  | "frequenltyBought";
export type TabsKey = "catagory" | "product" | "payment";

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
type ChartData = {
  itemsByCategory: IitemsByCat[];
  orderSalesByDate: IOrdersalesByDate[];
  activeAndInactiveProducts: IStatusCount[];
  orderStatusCount: IOrderStatusCount[];
  frequentyBought: IFrequentlyBoughtItem[];
  totalSalesByDate: ITotalSalesByDate[];
};
export type TAxiosProcessor = Promise<{
  status: "success" | "error";
  message: string;
  result?: [];
  user?: IUser;
  token?: { accessJWT: string; refreshJWT: string };
  accessJWT?: string;
  imagesToDelete?: string | string[];
  chartData?: ChartData;
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
  category: ICategory;
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
  _id?: string;
  title: string;
  description: string;
  status: "active" | "inactive";
}

export interface IPayment {
  _id: string;
  status: "active" | "Inactive";
  title: string;
  description: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}
export type TDataForTabs = ICategory[] | IProduct[] | IPayment[] | [];

export interface ITabsProps {
  type: TabsKey;
  tab1: string;
  tab2: string;
  data: TDataForTabs; // TODO: Define the type of data in this array.
  // form: ReactElement<null, string>;
  children: React.ReactNode;
}
export interface IDialog {
  title: string;
  buttonName: string;
  isOpen: boolean;
  children?: React.ReactNode;
}

export interface OrderItem {
  _id: string;
  title: string;
  orderQty: number;
  size: string;
  color: string;
  price: number;
  thumbnail: string;
}

export interface TotalDetails {
  amount_discount: number;
  amount_shipping: number;
  amount_tax: number;
  amount_subtotal: number;
  amount_total: number;
}

export interface Address {
  city: string;
  country: string;
  line1: string;
  line2: string | null;
  postal_code: string;
  state: string;
}
export interface Buyer {
  _id: string;
  clerkId: string;
  email: string;
  userName: string | null;
  firstName: string;
  lastName: string;
  photo: string;
  favouriteItem: []; // You can replace 'any' with the actual type if it's known
  createdAt: Date; // Consider using Date type if you intend to parse this string into a Date object
  updatedAt: Date; // Consider using Date type if you intend to parse this string into a Date object
  __v: number;
}

export interface IOrder {
  user: {
    address: string;
  };
  _id: string;
  uniqueId: string;
  stripeId: string;
  orderItems: OrderItem[];
  status:
    | "pending"
    | "processing"
    | "out-for-delivery"
    | "delivered"
    | "completed";
  total_details: TotalDetails;
  buyer: Buyer;
  address: Address;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export type EditPaymentProps = {
  status?: "inactive" | "active";
  _id?: string;
  title?: string;
  description?: string;
};
// This is used for when we are editing

export type Tstatus =
  | "pending"
  | "processing"
  | "out-for-delivery"
  | "delivered"
  | "completed";
export const statusColor: Record<Tstatus, string> = {
  pending: "bg-red-500",
  processing: "bg-blue-700",
  "out-for-delivery": "bg-green-500",
  delivered: "bg-purple-500",
  completed: "bg-green-800",
};

export type Tableprops = {
  data:
    | ICategory[]
    | IProduct[]
    | IPayment[]
    | IOrder[]
    | IFrequentlyBoughtItem[];
  type: Key;
};
export type columnDef =
  | ColumnDef<ICategory>[]
  | ColumnDef<IProduct>[]
  | ColumnDef<IOrder>[]
  | ColumnDef<IPayment>[]
  | ColumnDef<IFrequentlyBoughtItem>[];

export interface IitemsByCat {
  _id: string;
  count: number;
}
export interface IOrdersalesByDate {
  _id: string;
  count: number;
}
export interface IStatusCount {
  _id: "active" | "inactive";
  count: number;
}
export interface IOrderStatusCount {
  _id: Tstatus;
  count: number;
}
export interface IFrequentlyBoughtItem {
  _id: string;
  price: number;
  title: string;
  thumbnail: string;
  count: number;
}
export interface ITotalSalesByDate {
  _id: string;
  title: string[];
  thumbnail: string[];
  totalSales: number;
}
