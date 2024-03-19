import React, { FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { autoLogin, loginUserAction } from "@/Action/userAction";
import { ILoginform } from "@/types";
import { RootState } from "@/store";
const initialState = {
  password: (localStorage.getItem("password") as string) || "",
  email: (localStorage.getItem("email") as string) || "",
};

const SignInForm = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const pathTo = location?.state?.from?.location?.pathname || "/dashboard";
  const { user } = useAppSelector((state: RootState) => state.userInfo);

  const [form, setForm] = useState<ILoginform>(initialState);
  const inputs = [
    {
      label: "Email",
      name: "email",
      required: true,
      placeholder: "smith_john@yahoo.com",
      type: "email",
      value: form.email,
      id: "name",
    },
    {
      label: "Password",
      name: "password",
      required: true,
      placeholder: "************",
      type: "password",
      minLength: 8,
      value: form.password,
      id: "password",
      className: "relative",
    },
  ];

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const islogedIn = await dispatch(loginUserAction(form));
    islogedIn && navigate("/dashboard");
  };

  useEffect(() => {
    user?._id && navigate(pathTo);
    dispatch(autoLogin());
  }, [user, dispatch, navigate, pathTo]);
  return (
    <div className=" p-5 md:p-11    rounded-lg  flex flex-col gap-4 w-full min-h-screen justify-center   text-gray-400 md:text-gray-700 md:bg-white">
      <p>email:test@gmail.com</p>
      <p>password:test@12345</p>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Classic Fashion Wears{" "}
      </h1>
      <h2 className="scroll-m-20  pb-2 text-xl font-semibold tracking-tight first:mt-0">
        Welcome back! Please sign in to your account.{" "}
      </h2>
      <p className="text-xl text-muted-foreground">
        Enter to get access to data and information
      </p>

      <form onSubmit={handleOnSubmit} className="grid gap-3">
        <span className="flex flex-col gap-3">
          {inputs.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <label
                  htmlFor={item.label}
                  className="text-sm font-medium leading-none"
                >
                  {item.label}
                </label>
                <input
                  key={index}
                  {...item}
                  className="p-3 rounded-sm bg-slate-200/70 text-black placeholder:text-gray-600 "
                  onChange={handleOnChange}
                />
              </React.Fragment>
            );
          })}
        </span>
        <div className="flex justify-between">
          <span className="flex justify-start gap-2">
            <input type="checkbox" id="checkbox" className="" />
            <label
              htmlFor="checkbox"
              className="text-sm font-medium leading-none mt-1"
            >
              Remember me
            </label>
          </span>
          <span>
            <Link
              to={"/reset-password"}
              className="text-blue-500 hover:underline"
            >
              {" "}
              Forgot your password?
            </Link>
          </span>
        </div>
        <div className="grid">
          <button className="bg-blue-700 text-white p-2 rounded-lg">
            Log in
          </button>
        </div>
      </form>
      <div className="flex justify-between gap-2 ">
        <span className="border-b w-full"></span>
        <span className="text-gray-600 w-full ">Or,Login with</span>
        <span className="border-b w-full"></span>
      </div>
      <div className="grid">
        <button className="text-sm bg-white p-3 rounded-md flex justify-center  gap-2 border-2">
          <FcGoogle size={25} /> Sign up with google
        </button>
      </div>
      <div className="flex gap-3 justify-center  w-full">
        Don't have an account?
        <Link to={"/sign-up"} className="text-blue-500 underline">
          Register here
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;
