import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavigationMenu from "./NavigationMenu";
const MobileSideBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="w-[370px] overflow-x-hidden" side={"left"}>
        <SheetHeader className="flex flex-col justify-between gap-10">
          <span className="  h-[80px] grid items-center  text-center rounded-md font-bold text-purple-800 text-3xl ">
            Classic Fashion Wears
          </span>
          <NavigationMenu />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
