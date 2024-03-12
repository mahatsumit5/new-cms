import { Button } from "../ui/button";
import { useAppDispatch } from "@/hooks";
import { deleteorderAction } from "@/Action/orderAction";

const DeleteOrder = ({ _id }: { _id: string }) => {
  const dispatch = useAppDispatch();
  function handleOnDelete() {
    dispatch(deleteorderAction(_id));
  }
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xl">Are you sure want to delete this order?</span>
      <p className="text-sm text-gray-500">This action cannot be undone.</p>
      <div className="flex w-full justify-end">
        <Button className="" variant={"destructive"} onClick={handleOnDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteOrder;
