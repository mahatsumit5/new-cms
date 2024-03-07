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
      <SheetContent className="w-[250px] " side={"left"}>
        <SheetHeader className="flex flex-col">
          <h1 className="text-left text-3xl font-bold">CFW</h1>
          <NavigationMenu />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
