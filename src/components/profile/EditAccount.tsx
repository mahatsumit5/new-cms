import { updateUserAction } from "@/Action/userAction";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const userFormSchema = z.object({
  _id: z.string().readonly(),
  fName: z
    .string()
    .min(3, {
      message: "Name should be at least 3 characters long.",
    })
    .max(20, {
      message: "Name can not be more than  20 characters.",
    }),
  lName: z
    .string()
    .min(3, {
      message: "Name should be at least 3 characters long.",
    })
    .max(20, {
      message: "Name can not be more than  20 characters.",
    }),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 characters",
    })
    .max(12, {
      message: "Number cannot be more than 10 characters",
    }),
  email: z
    .string()
    .min(3)
    .max(50)
    .email({
      message: "",
    })
    .endsWith(".com"),
  password: z
    .string()
    .min(8, {
      message: "Password must contain minimum of 8 characters",
    })
    .max(50),
  address: z.string().optional(),
});
export default function EditAccount({ File }: { File?: File }) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.userInfo);
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      _id: user._id,
      address: user.address || "",
      email: user.email || "",
      fName: user.fName || "",
      lName: user.lName || "",
      password: "",
      phone: user.phone || "",
    },
  });

  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    const formDt = new FormData();
    if (File) {
      formDt.append("profile", File as Blob);
    }
    formDt.append("_id", values["_id"]);
    formDt.append("fName", values["fName"]);
    formDt.append("lName", values["lName"]);
    formDt.append("address", values["address"] || "");
    formDt.append("email", values["email"]);
    formDt.append("password", values["password"]);
    formDt.append("phone", values["phone"]);
    dispatch(updateUserAction(formDt));
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" bg-white/50 p-4 rounded-lg grid  md:w-[800px] gap-5"
      >
        <div className="flex justify-between">
          <span className="text-md font-semibold">Status</span>
          <span
            className={`${
              user.status === "active" ? "bg-green-600" : "bg-red-500"
            } text-white rounded-full p-2 px-4 shadow-xl`}
          >
            {user.status}
          </span>
        </div>
        <FormField
          control={form.control}
          name="fName"
          render={({ field }) => (
            <FormItem className="flex justify-between">
              <div className="space-y-0.5 w-full">
                <FormLabel>First Name</FormLabel>
                <FormMessage className="dark:text-red-600" />
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your firstName"
                  className="bg-primary-foreground shadow-sm dark:bg-[#36728bbd]"
                  type="text"
                />
              </FormControl>
              <FormDescription></FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lName"
          render={({ field }) => (
            <FormItem className="flex justify-between">
              <div className="space-y-0.5 w-full">
                <FormLabel>Last Name</FormLabel>
                <FormMessage className="dark:text-red-600" />
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your last Name"
                  type="text"
                  className="bg-primary-foreground shadow-sm dark:bg-[#36728bbd]"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex justify-between">
              <div className="space-y-0.5 w-full">
                <FormLabel>Email</FormLabel>
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder="johnsmith@example.com"
                  type="email"
                  className="bg-primary-foreground shadow-sm dark:bg-[#36728bbd]"
                  disabled
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex justify-between">
              <div className="space-y-0.5 w-full">
                <FormLabel>Phone Number</FormLabel>
                <FormMessage className="dark:text-red-600" />
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder="0454123456"
                  type="text"
                  className="bg-primary-foreground shadow-sm dark:bg-[#36728bbd]"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="flex justify-between">
              <div className="space-y-0.5 w-full">
                <FormLabel>Address </FormLabel>
                <FormMessage className="dark:text-red-600" />
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Sydney, NSW, 2000"
                  type="text"
                  className="bg-primary-foreground shadow-sm dark:bg-[#36728bbd]"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex justify-between">
              <div className="space-y-0.5 w-full">
                <FormLabel>Password </FormLabel>
                <FormMessage className="dark:text-red-600" />
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder="****************"
                  type="password"
                  className="bg-primary-foreground shadow-sm dark:bg-[#36728bbd]"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="hover:text-black" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
}
