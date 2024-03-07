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
