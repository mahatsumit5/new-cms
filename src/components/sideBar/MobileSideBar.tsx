import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavigationMenu from "./NavigationMenu";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

import { IoMdClose } from "react-icons/io";

const MobileSideBar = ({
  children,
  open,
  toggleOpen,
}: {
  children: React.ReactNode;
  open: boolean;
  toggleOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Sheet open={open}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent
        className="w-[250px]  bg-slate-100/20 dark:bg-slate-500/20 backdrop-blur-md rounded-lg"
        side={"left"}
      >
        <SheetClose
          onClick={() => {
            toggleOpen(false);
          }}
        >
          <IoMdClose size={25} />
        </SheetClose>

        <SheetHeader className="fixed top-5 right-4 ">
          <Link to={"/dashboard"}>
            <img
              src="/logo-light.png"
              className="rounded-full h-10 dark:hidden w-10"
            />
            <img
              src="/logo-dark.png"
              className="rounded-full h-10 hidden dark:block"
            />
          </Link>
        </SheetHeader>
        <NavigationMenu toggleOpen={toggleOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
