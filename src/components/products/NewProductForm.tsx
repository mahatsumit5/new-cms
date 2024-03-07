import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ui
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
import { ProductFormInputFields, numberFields } from "@/constants/ProductForm";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Textarea } from "../ui/textarea";
import SelectCatagoryComponent from "./FormComponents/SelectCatagoryCompoent";
import { Switch } from "../ui/switch";

import { useState } from "react";
import SelectSizeComponent from "./FormComponents/SelectSizeComponents";

import { useAppDispatch } from "@/hooks";
import { postProductAction } from "@/Action/productAction";

const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "title must be at least 3 characters.",
    })
    .max(20, {
      message: "Title is too long.",
    }),
  qty: z.string().min(1).max(3, {
    message: "maximum  quantity is 999.",
  }),
  price: z.string().min(1, {
    message: "mimium price  is 10.",
  }),
  salesPrice: z
    .string()
    .min(0)
    .max(4, {
      message: "maximum  quantity is 999.",
    })
    .optional(),
  sku: z
    .string()
    .min(5, {
      message: "Sku must be at least 5 characters.",
    })
    .max(20, {
      message: "Sku must below 21",
    }),
  salesStartDate: z.date().default(new Date()).optional(),
  salesEndDate: z.date().default(new Date()).optional(),

  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(160, {
      message: "Description must not be longer than 30 characters.",
    }),
  category: z.string({
    required_error: "Please select a category",
  }),
  status: z.boolean().default(false),
  size: z.array(
    z.string({
      required_error: "Size is required",
    })
  ),
});
const NewProductForm = () => {
  const dispatch = useAppDispatch();
  const [img, setImg] = useState<FileList>();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    //set all data in form Data
    const formDt = new FormData();
    if (img?.length) {
      [...img].forEach((image) => {
        formDt.append("images", image as Blob);
      });
    }

    formDt.append("title", values.title);
    formDt.append("category", values.category);
    formDt.append("description", values.description);
    formDt.append("price", values.price);
    formDt.append("qty", values.qty);
    formDt.append("salesEndDate", values.salesEndDate?.toISOString() || "");
    formDt.append("salesStartDate", values.salesStartDate?.toISOString() || "");
    formDt.append("salesPrice", values.salesPrice || "");
    formDt.append("status", values.status ? "active" : "inactive");
    formDt.append("sku", values.sku);
    values.size.forEach((size) => {
      formDt.append("size", size);
    });
    console.log(values);
    const isPosted = await dispatch(postProductAction(formDt));
    console.log(isPosted);
  }
  return (
    <div className=" w-full md:w-10/12 mx-auto p-5 bg-white/50 dark:bg-slate-950/25 rounded-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="  gap-5 grid grid-cols-1 md:grid-cols-3  "
        >
          {/* status         */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white/50 md:col-span-3 ">
                <div className="space-y-0.5">
                  <FormLabel>Status</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* title and */}
          {ProductFormInputFields.map((item) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name as "title" | "sku"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{item.label}</FormLabel>
                  <FormControl>
                    <Input
                      {...item}
                      {...field}
                      className="bg-white/50 placeholder:text-black"
                    />
                    {/* <Textarea placeholder="Type your message here." /> */}
                  </FormControl>
                  <FormMessage />
                  <FormDescription>{item.description}</FormDescription>
                </FormItem>
              )}
            />
          ))}{" "}
          {/* number and prices */}
          {numberFields.map((item) => (
            <FormField
              key={item.label}
              control={form.control}
              name={item.name as "qty" | "price" | "salesPrice"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{item.label}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      className="bg-white/65 placeholder:text-grey"
                      min={1}
                      max={999}
                      defaultValue={1}
                      placeholder={item.placeholder}
                    />
                    {/* <Textarea placeholder="Type your message here." /> */}
                  </FormControl>
                  <FormDescription>{item.description}</FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <SelectSizeComponent form={form} />
          {/* category */}
          <SelectCatagoryComponent form={form} />
          {/* calendar */}
          <FormField
            control={form.control}
            name="salesStartDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Sales Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Select your sales start Date</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* calendar */}
          <FormField
            control={form.control}
            name="salesEndDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Sales End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Select your sales start Date</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormItem className="md:col-span-2">
            <FormLabel htmlFor="picture">Picture</FormLabel>
            <FormControl>
              <Input
                id="picture"
                type="file"
                name="profile"
                multiple
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files?.length) {
                    setImg(e.target.files);
                  }
                }}
                className="bg-white"
              />
            </FormControl>
            <FormDescription>Select Images for you products</FormDescription>
          </FormItem>
          {/* color */}
          <SelectSizeComponent form={form} />
          {/* description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-3">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Give a breif description about your product"
                    className="resize-none bg-white/75 dark:bg-black"
                    {...field}
                    rows={8}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="" disabled={!img?.length}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewProductForm;
