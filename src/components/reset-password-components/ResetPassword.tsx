import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { motion } from "framer-motion";
import { FormKeys } from "@/types";
import { changePassword } from "@/axios/userAxios";
import { showToast } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
const ResetPassword = ({
  email = "mahstsumit5@gmail.com",
  setFormToShow,
}: {
  setFormToShow: Dispatch<SetStateAction<FormKeys>>;
  email: string;
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("temporaryToken");

  useEffect(() => {
    if (!token || !email) {
      setFormToShow("otp");
      return;
    }
  }, [email, token, setFormToShow]);

  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password.confirmPassword !== password.password) {
      return setError("Passwords do not match");
    } else {
      setError("");
      const pending = changePassword({
        password: password.confirmPassword,
        email: email,
      });
      showToast(pending);
      const { status } = await pending;
      if (status === "success") {
        sessionStorage.clear();
        navigate("/");
      }
      // todo chnage your password here
    }
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const { value, name } = e.currentTarget;
    setPassword({ ...password, [name]: value });
  }
  return (
    <motion.div className="flex  items-center  justify-center h-screen    w-full mx-auto">
      <form
        className="bg-slate-200 rounded-md p-8 text-black flex  flex-col gap-4 w-full md:w-[400px]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl">Change your Password</h1>
        <Label>New Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="create new password"
          className="border-none bg-slate-300 placeholder:text-slate-400"
          onChange={handleChange}
        />
        <Label>Confirm Password</Label>

        <Input
          className="border-none bg-slate-300 placeholder:text-slate-400"
          type="password"
          name="confirmPassword"
          placeholder="confirm new password"
          onChange={handleChange}
        />
        <h1 className="text-red-500 text-sm">{error}</h1>
        <Button
          type="submit"
          variant={"default"}
          disabled={!password.password || !password.confirmPassword}
        >
          Save
        </Button>
      </form>
    </motion.div>
  );
};

export default ResetPassword;
