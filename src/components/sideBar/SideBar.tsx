import { Dispatch, SetStateAction } from "react";
import NavigationMenu from "./NavigationMenu";
import { Button } from "../ui/button";
import { PiHamburgerBold } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
const SideBar = ({
  open,
  toggleOpen,
}: {
  open: boolean;
  toggleOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={` ${
        open ? "w-[230px]" : "w-[80px] "
      } px-4  min-h-screen hidden md:block   transition-all fixed left-0 z-50 backdrop-blur-lg from-purple-800 via-white to-purple-300 dark:bg-purple-900/55 overflow-y-auto border-r-2 border-r-purple-300 py-5`}
    >
      <div className="flex flex-col  h-full  transition-all ">
        <div className="w-full  flex justify-between ">
          {!open ? (
            <Button
              onClick={() => {
                toggleOpen(!open);
              }}
              className=""
              variant={"link"}
              size={"icon"}
            >
              <PiHamburgerBold
                size={25}
                className="text-purple-700 dark:text-white hover:scale-125 transition-all"
              />
            </Button>
          ) : (
            <Button
              onClick={() => {
                toggleOpen(!open);
              }}
              className=""
              variant={"link"}
              size={"icon"}
            >
              <AiOutlineClose
                size={25}
                className="text-purple-800 dark:text-white hover:scale-125 transition-all"
              />
            </Button>
          )}
          {open && (
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
          )}
        </div>
        <NavigationMenu />
      </div>
    </div>
  );
};

export default SideBar;
