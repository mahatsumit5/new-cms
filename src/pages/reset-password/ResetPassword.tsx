import { reqOTP } from "@/axios/userAxios";
import RequestOtp from "@/components/reset-password-components/RequestOtp";
import ResetPassword from "@/components/reset-password-components/ResetPassword";
import VerifyOTP from "@/components/reset-password-components/VerifyOTP";
import { showToast } from "@/lib/utils";
import { FormKeys } from "@/types";
import { useState } from "react";

const Page = () => {
  const [formToShow, setFormToShow] = useState<FormKeys>("reset");
  const [email, setEmail] = useState<string>("");

  const handleOnOTPRequest = async (email: string) => {
    setEmail(email);
    const loading = reqOTP(email);
    showToast(loading);
    const { status } = await loading;
    if (status === "success") {
      setFormToShow("verify");
    }
  };

  const forms: Record<FormKeys, JSX.Element> = {
    otp: <RequestOtp handleOnOTPRequest={handleOnOTPRequest} />,
    reset: <ResetPassword email={email} setFormToShow={setFormToShow} />,
    verify: (
      <VerifyOTP
        email={email}
        setFormToShow={setFormToShow}
        handleOnOTPRequest={handleOnOTPRequest}
      />
    ),
  };
  return (
    <div>
      <main className="main ">{forms[formToShow]}</main>
    </div>
  );
};

export default Page;
