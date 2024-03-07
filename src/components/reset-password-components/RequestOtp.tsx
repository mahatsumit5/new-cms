import { RequestOtpProps } from "@/types";
import { useRef } from "react";

const RequestOtp = ({ handleOnOTPRequest }: RequestOtpProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleOnClick = () => {
    if (inputRef.current?.value) {
      handleOnOTPRequest(inputRef.current.value);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="shadow-lg bg-white p-4 py-8 flex flex-col rounded-md gap-3 ">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          OTP verification
        </h3>
        <p className="text-sm text-muted-foreground">
          Enter your email address to get your OTP(one-time-password)
        </p>
        <input
          type="text"
          className="bg-slate-400 p-4 rounded-lg text-white placeholder:text-white"
          placeholder="Email Address"
          required
          ref={inputRef}
        />
        <button
          className="bg-blue-600 p-3 rounded-full text-white"
          onClick={handleOnClick}
        >
          Request
        </button>
        <button className="border-2 border-blue-600 p-3 rounded-full text-black">
          Canel
        </button>
      </div>
    </div>
  );
};

export default RequestOtp;
