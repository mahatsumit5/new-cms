import { ResetPasswordProps } from "@/types";
import { Button } from "../ui/button";

const ResetPassword = ({
  email,
  handleOnResetPassword,
  setFormToShow,
}: ResetPasswordProps) => {
  return (
    <div>
      {email}

      <Button
        onClick={() => {
          setFormToShow("otp");
        }}
      ></Button>
      <Button
        onClick={() => {
          handleOnResetPassword({
            email: "",
            otp: "",
            password: "",
          });
        }}
      ></Button>
    </div>
  );
};

export default ResetPassword;
