import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { useState } from "react";
import { useAppDispatch } from "@/hooks";
import { updateOrderAction } from "@/Action/orderAction";

export function EditOrder({ _id, status }: { _id: string; status: string }) {
  const dispatch = useAppDispatch();
  const [selectedOption, setSelectedOption] = useState<string>(status);
  function onSubmit() {
    dispatch(updateOrderAction({ _id, status: selectedOption }));
  }
  return (
    <div className="grid gap-4">
      <Select
        onValueChange={(e) => {
          setSelectedOption(e);
        }}
        defaultValue={status}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="pending">pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="out-for-delivery">Out for delivery</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={onSubmit}> Submit</Button>
    </div>
  );
}
