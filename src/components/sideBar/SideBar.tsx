import NavigationMenu from "./NavigationMenu";
import { Button } from "../ui/button";
import { PiHamburgerBold } from "react-icons/pi";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { toogleSideBar } from "@/redux/sidebar.slice";
const SideBar = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((store) => store.sideBar);
  return (
    <div className={` ${isOpen ? "w-[230px]" : " w-[80px] "} side-bar `}>
      <div className="flex flex-col  h-full  transition-all  ">
        <div className="w-full  flex justify-between ">
          {!isOpen ? (
            <Button
              onClick={() => {
                dispatch(toogleSideBar(true));
              }}
              className=""
              variant={"ghost"}
              size={"icon"}
            >
              <PiHamburgerBold
                size={35}
                className="text-white dark:text-white  transition-all"
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
              <MdKeyboardDoubleArrowLeft
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
