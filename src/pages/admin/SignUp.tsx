import { postNewAdmin } from "@/axios/userAxios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const userFormSchema = z.object({
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
  phone: z.string().min(10).max(10, {
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
export default function SignUpForm() {
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      address: "",
      email: "",
      fName: "",
      lName: "",
      password: "",
      phone: "",
    },
  });
  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    const { status, message } = await postNewAdmin(values);
    toast[status](message);
    if (status === "success") {
      form.reset();
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" bg-form p-4 rounded-lg grid md:grid-cols-2 md:w-1/2 w-full gap-5 "
      >
        <FormField
          control={form.control}
          name="fName"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-0.5">
                <FormLabel>First Name</FormLabel>
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your firstName"
                  className=" shadow-sm "
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
            <FormItem>
              <div className="space-y-0.5">
                <FormLabel>Last Name</FormLabel>
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your last Name"
                  type="text"
                  className=" shadow-sm "
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-0.5">
                <FormLabel>Email</FormLabel>
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder="johnsmith@example.com"
                  type="email"
                  className=" shadow-sm "
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-0.5">
                <FormLabel>Phone Number</FormLabel>
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder="0454123456"
                  type="text"
                  className=" shadow-sm "
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-0.5">
                <FormLabel>Address (optional)</FormLabel>
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Sydney, NSW, 2000"
                  type="text"
                  className=" shadow-sm "
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-0.5">
                <FormLabel>Password </FormLabel>
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Sydney, NSW, 2000"
                  type="text"
                  className=" shadow-sm "
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="hover:text-black" type="submit">
          Create
        </Button>
      </form>
    </Form>
  );
}
