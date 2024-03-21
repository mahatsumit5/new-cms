import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { closeDialog } from "@/redux/dialog.slice";
import { DialogClose } from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";
export function CustomDialog() {
  const { children, isOpen, title } = useAppSelector((store) => store.dialog);
  const dispatch = useAppDispatch();
  return (
    <Dialog open={isOpen}>
      <DialogContent
        className={`max-h-[80vh] ${
          title === "Edit Product" ? "max-w-7xl" : "max-w-lg"
        } bg-form overflow-y-auto backdrop-blur-md`}
      >
        <DialogClose>
          <Button
            className="absolute top-2 right-2 z-10 rounded-full bg-primary"
            onClick={() => {
              dispatch(closeDialog());
            }}
            size={"icon"}
          >
            <IoMdClose size={20} />
          </Button>
        </DialogClose>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className=" ">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
