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
      <SheetContent className="w-[350px] overflow-scroll" side={"left"}>
        <SheetHeader className="flex flex-col justify-between gap-10">
          <span className="border-2  h-[80px] grid items-center">logo</span>
          <NavigationMenu />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
