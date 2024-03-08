import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { TypeForm } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
export default function SelectColorComponenet({ form }: { form: TypeForm }) {
  const [tempColor, setCurrentColor] = useState<string>("#000000");

  function handleAdd() {
    const previousColor = form.getValues().color;

    if (previousColor) {
      if (previousColor.includes(tempColor)) {
        console.log("this color  is already added");
        toast("This color already exist.Please select a new color.");
        return;
        // stop code execution to stop adding same colors
      }
      form.setValue("color", [...previousColor, tempColor]);
    } else {
      form.setValue("color", [tempColor]);
    }
  }
  function handleRemove(color: string) {
    console.log(color);
    const currentColor = form.getValues().color;
    console.log(currentColor);
    const newColors = currentColor.filter((c) => c !== color);
    form.setValue("color", newColors);
  }
  return (
    <FormField
      control={form.control}
      name="color"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Select Color</FormLabel>

          <FormControl>
            <Input
              type="color"
              {...field}
              onChange={(e) => {
                setCurrentColor(e.target.value);
              }}
              value={tempColor}
            />
          </FormControl>
          <span
            className="px-2 bg-black text-white rounded-md w-1/5 text-center py-1"
            onClick={handleAdd}
          >
            Add
          </span>

          <FormDescription className="flex gap-3 flex-wrap">
            {form.getValues("color")?.map((item, index) => (
              <div
                key={index}
                className={` p-4  rounded-full border-2 `}
                style={{ backgroundColor: item }}
                onClick={() => {
                  handleRemove(item);
                }}
              />
            ))}{" "}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
