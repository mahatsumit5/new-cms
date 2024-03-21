// ui

import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
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
import { sizes } from "@/constants/siz";

import { cn } from "@/lib/utils";
import { TypeForm } from "@/types";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

const SelectSizeComponent = ({ form }: { form: TypeForm }) => {
  function handleSelect(item: { id: number; value: string }) {
    const selectedItems = form.getValues().size;
    if (selectedItems?.includes(item.value)) {
      const filteredItems = selectedItems.filter((i) => i !== item.value);
      form.setValue("size", filteredItems);
      return;
    }
    const previousState = form.getValues().size;
    if (previousState) {
      form.setValue("size", [...previousState, item.value]);
    } else {
      form.setValue("size", [item.value]);
    }
  }
  return (
    <FormField
      control={form.control}
      name="size"
      render={({ field }) => (
        <FormItem className="">
          <FormLabel>Select Size</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
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
                    ? field.value.length + " size selected"
                    : "Select size"}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-2">
              <Command>
                <CommandGroup>
                  {sizes.map((item, index) => (
                    <CommandItem
                      value={item.value}
                      key={index}
                      onSelect={() => {
                        handleSelect(item);
                      }}
                    >
                      {item.value}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          form.getValues().size?.includes(item.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
                <Button
                  onClick={() => {
                    form.resetField("size");
                  }}
                >
                  Reset
                </Button>
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

export default SelectSizeComponent;
