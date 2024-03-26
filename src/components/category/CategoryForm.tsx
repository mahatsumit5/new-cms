import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { ICategory, IParentCategory } from "@/types";
import { z } from "zod";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  postCatalogueAction,
  updateCatagoryAction,
} from "@/Action/catelogueAction";
import { Button } from "@/components/ui/button";
import { Switch } from "../ui/switch";
import UploadPicture from "@/hooks/UploadPicture";

// form schema
const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "title must be at least 3 characters.",
    })
    .max(20, {
      message: "Title is too long.",
    }),

  parentCategory: z.string({
    required_error: "Please select a category",
  }),
  status: z.boolean().default(false),
  image: z.string().url(),
});
const CategoryForm = ({ category }: { category?: ICategory }) => {
  const dispatch = useAppDispatch();
  const { parentCategory } = useAppSelector((store) => store.catagoryInfo);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: category?.title || "",
      parentCategory: category?.parentCategory || "",
      status: category?.status === "active" ? true : false,
      image: category?.image || "",
    },
  });
  const { image, UploadComponent } = UploadPicture(form);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const object = {
      image: values.image,
      parentCategory: values.parentCategory,
      status: values.status ? "active" : "inactive",
      title: values.title,
    };
    if (category?._id) {
      const _id = category?._id as string;
      dispatch(updateCatagoryAction({ ...object, _id }));
    } else {
      dispatch(postCatalogueAction(object));
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`gap-5 grid grid-cols-1 w-full  rounded-lg p-3  mt-5 bg-form ${
          category?._id ? "w-full" : "md:w-1/2"
        } `}
      >
        {/* status         */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg  p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Status</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="bg-secondary"
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  placeholder="Name of your  catalogue"
                  className=""
                  {...field}
                />
              </FormControl>

              <FormMessage />
              <FormDescription>
                Enter the name for your catalogue
              </FormDescription>
            </FormItem>
          )}
        />
        {/* parent Category */}

        <FormField
          control={form.control}
          name="parentCategory"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between bg-secondary",
                        !field.value && "text-muted-foreground "
                      )}
                    >
                      {field.value
                        ? parentCategory.find(
                            (item) => item._id === field.value
                          )?.title
                        : "Select Category"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-2">
                  <Command>
                    <CommandInput
                      placeholder="Search category..."
                      className="h-9"
                    />
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {parentCategory.map((item: IParentCategory) => (
                        <CommandItem
                          value={item._id}
                          key={item._id}
                          onSelect={() => {
                            form.setValue("parentCategory", item._id);
                          }}
                        >
                          {item.title}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              item._id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select a parent category for this category
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Image */}
        <div className="grid w-full  items-center gap-1.5">
          <UploadComponent url={category?.image || image} />
        </div>

        <Button type="submit" className="">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
