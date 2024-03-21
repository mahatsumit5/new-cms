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
import { Label } from "../ui/label";
import { useState } from "react";
import { updateCatagoryAction } from "@/Action/catelogueAction";
import { Button } from "@/components/ui/button";
import { Switch } from "../ui/switch";

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
  status: z.boolean(),
});
const EditCatagoryForm = ({ category }: { category: ICategory }) => {
  const dispatch = useAppDispatch();
  const [img, setImg] = useState<string | Blob>(category.image);
  const { parentCategory } = useAppSelector((store) => store.catagoryInfo);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: category.title,
      parentCategory: category.parentCategory,
      status: category.status === "active" ? true : false,
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const formDt = new FormData();
    if (typeof img !== "string") {
      formDt.append("image", img as Blob);
    }
    const status = values.status ? "active" : "inactive";
    formDt.append("status", status);
    formDt.append("title", values.title);
    formDt.append("_id", category._id);
    formDt.append("parentCategory", values.parentCategory);
    dispatch(updateCatagoryAction(formDt));
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="  gap-5 grid grid-cols-1   bg-form p-2 py-4"
      >
        {/* status         */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-secondary">
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
                  className=" bg-secondary"
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
                <PopoverTrigger asChild className="">
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between bg-secondary",
                        !field.value && "text-muted-foreground"
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
                <PopoverContent className="w-[320px] p-0">
                  <Command className="bg-secondary">
                    <CommandInput
                      placeholder="Search category..."
                      className="h-12 text-[16px] bg-primary"
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
        {/* image */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input
            id="picture"
            type="file"
            name="profile"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files?.length) {
                setImg(e.target.files[0]);
              }
            }}
          />
        </div>
        <Button type="submit" className="" variant={"default"}>
          Update
        </Button>
      </form>
    </Form>
  );
};

export default EditCatagoryForm;
