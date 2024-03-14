import NavigationMenu from "./NavigationMenu";
import { Button } from "../ui/button";
import { PiHamburgerBold } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { toogleSideBar } from "@/redux/sidebar.slice";
const SideBar = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((store) => store.sideBar);
  return (
    <div
      className={` ${
        isOpen ? "w-[230px]" : " w-[80px] "
      } px-4 min-h-screen  fixed left-0 hidden md:block   transition-all  side-bar  border-r-2 border-r-purple-300 py-5`}
    >
      <div className="flex flex-col  h-full  transition-all  ">
        <div className="w-full  flex justify-between ">
          {!isOpen ? (
            <Button
              onClick={() => {
                dispatch(toogleSideBar(true));
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
                dispatch(toogleSideBar(false));
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
          {isOpen && (
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
