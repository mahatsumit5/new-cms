import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { logoutUser, updatePassword } from "@/axios/userAxios";
import { showToast } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { logOut } from "@/redux/user.slice";
import { useNavigate } from "react-router-dom";
import { ViewPassword } from "../passwordVisibility/PasswordVisibility";
import { usePasswordVisibility } from "@/hooks/passwordVisibilit.hook";
const formSchema = z.object({
  oldPassword: z.string().min(8, {
    message: "Must be at least 8 characters",
  }),
  newPassword: z.string().min(8, {
    message: "Minimum  length of password is 8",
  }),
});

function ChangePassword() {
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const type = showPassword ? "text" : "password";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((store) => store.userInfo);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const pending = updatePassword(values);
    showToast(pending);

    const { status } = await pending;
    if (status === "success") {
      logoutUser(user._id);
      dispatch(logOut());
      localStorage.removeItem("refreshJWT");
      sessionStorage.removeItem("accessJWT");
      navigate("/", { replace: true });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-primary-foreground p-5 rounded-lg flex flex-col gap-4"
      >
        <p className="font-bold text-xl">Password</p>
        <p>Change your password here. After saving, you'll be logged out.</p>
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem className="flex flex-col  gap-3 relative">
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  type={type}
                  placeholder="Enter old password"
                  {...field}
                  maxLength={41}
                  className="  shadow-sm bg-primary text-white placeholder:text-white focus:ring-0 dark:text-black dark:placeholder:text-black"
                />
              </FormControl>{" "}
              <ViewPassword
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
              />{" "}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="flex flex-col  gap-2  relative">
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type={type}
                  placeholder="Enter new password"
                  {...field}
                  maxLength={41}
                  className="  shadow-sm bg-primary text-white placeholder:text-white focus:ring-0 dark:text-black dark:placeholder:text-black"
                />
              </FormControl>{" "}
              <ViewPassword
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-36 hover:bg-slate-500">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default ChangePassword;
