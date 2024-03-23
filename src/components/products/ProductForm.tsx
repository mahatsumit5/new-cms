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
import { postProductAction, updateProductAction } from "@/Action/productAction";
import SelectColorComponenet from "./FormComponents/SelectColorComponent";
import { IProduct } from "@/types";
import { toast } from "sonner";

interface Props {
  product?: IProduct; // Making product prop optional
}
const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "title must be at least 3 characters.",
    })
    .max(100, {
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
    .max(1000, {
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
  color: z.array(
    z.string({
      required_error: "Color is required",
    })
  ),
});
const ProductForm: React.FC<Props> = (props?: Props) => {
  const product = props?.product;
  const dispatch = useAppDispatch();
  const [img, setImg] = useState<FileList>();
  const [images, setImages] = useState({
    thumbnail: product?.thumbnail || "",
    images: product?.images || [],
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: product?.title || "",
      sku: product?.sku || "",
      qty: product?.qty + "" || "",
      price: product?.price + "" || "",
      // salesStartDate: new Date(product?.salesStartDate || ""),
      // salesEndDate: new Date(product?.salesEndDate || ""),
      category: product?.category._id || "",
      description: product?.description || "",
      status: Boolean(product?.status === "active" ? true : false),
      size: product?.size || [],
      color: product?.color || [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
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
    values.color.forEach((color) => {
      formDt.append("color", color);
    });

    // update productclg
    if (product?._id) {
      formDt.append("_id", product._id);
      formDt.delete("sku");
      formDt.append("thumbnail", images.thumbnail);
      // formDt.append("thumbnail", images.thumbnail);
      images.images.forEach((img) => {
        formDt.append("images", img);
      });
      dispatch(updateProductAction(formDt));
      return;
    } else {
      // post
      const isPosted = await dispatch(postProductAction(formDt));
      isPosted && form.reset();
    }
  }

  // 3. handle Image Delete on client side

  function handleDelete(img: string) {
    if (img === images.thumbnail) {
      toast.warning("Cannot delete thumbnail image", { duration: 2500 });
      return;
      // to do use modal to alert
    }
    const filteredImages = images?.images.filter((i) => i !== img);
    setImages({ images: filteredImages, thumbnail: images.thumbnail });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="  gap-5 grid grid-cols-1 md:grid-cols-3  w-full mt-4"
      >
        {/* status         */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm  md:col-span-3 bg-secondary">
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
                  <Input {...item} {...field} className="" />
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
                    className=""
                    min={1}
                    max={999}
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
            <FormItem className="flex flex-col col-span-1/2">
              <FormLabel>Sales Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal bg-secondary h-12",
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
                        "w-full pl-3 text-left font-normal bg-secondary h-12",
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
        {/* color */}
        <SelectColorComponenet form={form} />
        {/* description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Give a breif description about your product"
                  className="resize-none  bg-secondary text-[16px]"
                  {...field}
                  rows={8}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem className="md:col-span-3">
          <FormLabel htmlFor="picture">Picture</FormLabel>
          <FormControl>
            <Input
              id="picture"
              type="file"
              name="profile"
              multiple
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files?.length) {
                  console.log(e.target.files);

                  setImg(e.target.files);
                }
              }}
              className="bg-slate-100 bg-secondary"
              accept=".jpg,.avif,.png,.jpeg"
            />
          </FormControl>
          <div>
            {product?.thumbnail ? (
              <div className="flex flex-col gap-3">
                <FormLabel>Thumbnail Preview</FormLabel>
                <div>
                  <img
                    src={images.thumbnail}
                    width={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>

                <FormLabel>Images</FormLabel>

                <div className="flex gap-5 my-8 overflow-x-auto">
                  {images.images.map((img) => (
                    <div>
                      <div className="relative">
                        <img
                          key={img}
                          src={img}
                          alt="Product Image"
                          height={250}
                          width={250}
                          className={`rounded-lg shadow-sm  hover:cursor-pointer `}
                        />
                        <div className="absolute h-full top-0 bg-white/5 hover:backdrop-blur-sm w-full transition-all grid items-center justify-center opacity-0 hover:opacity-100">
                          <span
                            className="bg-white p-5 rounded-full hover:cursor-pointer"
                            onClick={() => {
                              setImages({
                                images: images.images,
                                thumbnail: img,
                              });
                            }}
                          >
                            Set as Thumbnail
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col mt-4 gap-2">
                        <span
                          className="bg-red-800 p-2 text-white rounded-lg flex justify-center"
                          onClick={() => {
                            handleDelete(img);
                          }}
                        >
                          Delete
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                {" "}
                Select images for your product <br />
                <span className="text-muted-foreground text-sm ">
                  Accepted file type .jpg,.png,.avif,.jpeg
                </span>
              </div>
            )}
          </div>
        </FormItem>
        <Button type="submit" className="bg-primary " variant={"default"}>
          {product?._id ? "Save Changes" : "Create "}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
