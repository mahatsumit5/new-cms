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

export function CustomDialog() {
  const { children, isOpen, title } = useAppSelector((store) => store.dialog);
  const dispatch = useAppDispatch();
  return (
    <Dialog open={isOpen}>
      <DialogContent
        className={`max-h-[80vh] ${
          title === "Edit Product" ? "max-w-6xl" : "max-w-lg"
        } bg-slate-200 dark:bg-slate-600 overflow-y-auto`}
      >
        <DialogClose>
          <Button
            className="rounded-full absolute top-2 right-2 z-10 p-4"
            onClick={() => {
              dispatch(closeDialog());
            }}
          >
            x
          </Button>
        </DialogClose>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid ">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
