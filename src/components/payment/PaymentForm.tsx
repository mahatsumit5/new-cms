import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import {
  postPaymentOptions,
  updatePaymentAction,
} from "@/Action/paymentAction";
import { useAppDispatch } from "@/hooks";
import { EditPaymentProps } from "@/types";

const formSchema = z.object({
  status: z.boolean().default(false),
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters long",
    })
    .max(40, {
      message: "Limit reached",
    }),
  description: z
    .string()
    .min(4, {
      message: "Title must be at least 3 characters long",
    })
    .max(100, {
      message: "Limit reached",
    }),
});

export function PaymentForm({
  _id,
  description,
  status,
  title,
}: EditPaymentProps) {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: status === "active" ? true : false || false,
      title: title || "",
      description: description || "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { status, description, title } = values;

    if (!_id) {
      dispatch(
        postPaymentOptions({
          status: status ? "active" : "inactive",
          description,
          title,
        })
      );
    } else {
      dispatch(
        updatePaymentAction({
          _id,
          status: status ? "active" : "inactive",
          description,
          title,
        })
      );
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-4 md:w-1/2  rounded-lg shadow-2xl bg-form mt-5"
      >
        {/* status         */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-secondary md:col-span-3 ">
              <div className="space-y-0.5">
                <FormLabel>Status</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  defaultChecked={false}
                  className=""
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter payment method title"
                  {...field}
                  maxLength={41}
                  className="bg-secondary"
                />
              </FormControl>
              <FormDescription>
                Supported method 'au_besc_debit', 'card' ,'cash',
                'zip','afterpay_clearpay,'paypal'
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter payment method title"
                  {...field}
                  rows={8}
                  className="bg-secondary"
                />
              </FormControl>
              <FormDescription>
                Provide description for your payment method, it will be shown to
                the customers.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
