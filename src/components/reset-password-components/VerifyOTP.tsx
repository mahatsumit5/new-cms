import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { verifyOTP } from "@/axios/userAxios";
import { showToast } from "@/lib/utils";
import { FormKeys } from "@/types";

const VerifyOTP = ({
  email,
  setFormToShow,
  handleOnOTPRequest,
}: {
  email: string;
  setFormToShow: Dispatch<SetStateAction<FormKeys>>;
  handleOnOTPRequest: (email: string) => Promise<void>;
}) => {
  const [otp, setOtp] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setOtp(otp + e.target.value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const pending = verifyOTP({ email, otp });
    showToast(pending);
    const { status, token } = await pending;

    if (status === "success") {
      sessionStorage.setItem("accessJWT", token?.accessJWT || ("" as string));
      setFormToShow("reset");
    }
  }

  return (
    <motion.div
      className="min-h-[90vh]  flex justify-start items-center flex-col gap-6  bg-gradient-to-br from-black  to-purple-950"
      initial={{ x: "-200vw" }}
      animate={{ x: 0 }}
      transition={{ ease: "easeOut" }}
    >
      <h3 className=" text-white scroll-m-20 text-5xl font-semibold tracking-tight mt-40">
        OTP verification
      </h3>
      <p className="text-lg font-bold text-white">We sent you a code</p>
      <p className="text-sm text-muted-foreground text-gray-200">
        Please enter your code below for verification
      </p>
      <p className="font-bold text-blue-600 ">{email}</p>
      <div className="flex gap-2 mt-5">
        {Array(6)
          .fill(" ")
          .map((item, index) => (
            <input
              key={index}
              type="text"
              className="w-11 h-11 bg-gradient-to-br from-blue-600 to-black text-white p-3 text-2xl"
              required
              maxLength={1}
              placeholder={item}
              onChange={handleChange}
            />
          ))}
      </div>
      <p className="text-sm text-muted-foreground text-gray-200">
        Did not receive code yet?
      </p>
      <button
        className="text-blue-300 underline"
        onClick={() => {
          handleOnOTPRequest(email);
        }}
      >
        Try again
      </button>
      <button
        className="bg-blue-600 p-3 rounded-full text-white w-full sm:w-[400px]"
        onClick={handleSubmit}
      >
        Verify Code
      </button>
    </motion.div>
  );
};

export default VerifyOTP;
