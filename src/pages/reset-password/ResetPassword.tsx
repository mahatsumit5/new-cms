import { changePassword, reqOTP } from "@/axios/userAxios";
import RequestOtp from "@/components/reset-password-components/RequestOtp";
import ResetPassword from "@/components/reset-password-components/ResetPassword";
import VerifyOTP from "@/components/reset-password-components/VerifyOTP";
import { HandleResetPasswordProps } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
type FormKeys = "reset" | "otp" | "verify";
const Page = () => {
  const [formToShow, setFormToShow] = useState<FormKeys>("otp");
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const handleOnOTPRequest = async (email: string) => {
    setEmail(email);
    setFormToShow("verify");
    await reqOTP(email);
  };
  const handleOnResetPassword = async (obj: HandleResetPasswordProps) => {
    const pending = changePassword(obj);
    const { status } = await pending;
    if (status === "success") navigate("/");
  };
  const forms: Record<FormKeys, JSX.Element> = {
    otp: <RequestOtp handleOnOTPRequest={handleOnOTPRequest} />,
    reset: (
      <ResetPassword
        email={email}
        handleOnResetPassword={handleOnResetPassword}
        setFormToShow={setFormToShow}
      />
    ),
    verify: <VerifyOTP email={email} />,
  };
  return (
    <div>
      {" "}
      <main className="main p-5">{forms[formToShow]}</main>
    </div>
  );
};

export default Page;
