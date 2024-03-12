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
      <DialogContent className="sm:max-w-[425px] h-auto bg-slate-200 dark:bg-slate-600">
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
        <div className="grid gap-4 py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
