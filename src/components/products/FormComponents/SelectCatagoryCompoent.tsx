// ui
import { CatagoryDialog } from "@/components/category/AddCategoryDialog";
import AddCategoryForm from "@/components/category/AddCategoryForm";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppSelector } from "@/hooks";

import { cn } from "@/lib/utils";
import { ICategory, TypeForm } from "@/types";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

const SelectCatagoryComponent = ({ form }: { form: TypeForm }) => {
  const { catalogue } = useAppSelector((store) => store.catagoryInfo);

  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem className="">
          <FormLabel>Category</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between bg-secondary h-12",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? catalogue.find((item) => item._id === field.value)?.title
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
                  {catalogue.map((item: ICategory) => (
                    <CommandItem
                      value={item._id}
                      key={item._id}
                      onSelect={() => {
                        form.setValue("category", item._id);
                      }}
                    >
                      {item.title}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          item._id === field.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CatagoryDialog
                  buttonName="Add new catagory"
                  title="Create new catalogue"
                >
                  <AddCategoryForm />
                </CatagoryDialog>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>
            Select a parent category associated with this product
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectCatagoryComponent;
