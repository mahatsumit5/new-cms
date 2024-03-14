import { useAppSelector } from "@/hooks";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import MobileSideBar from "../sideBar/MobileSideBar";
import { ProfileDropDown } from "./ProfileDropDown";
import hamburger from "/Hamburger.svg";
import { MdCircleNotifications } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
const Header = () => {
  const { user } = useAppSelector((store) => store.userInfo);
  const [open, toggleOpen] = useState(false);

  return (
    <motion.div
      className="sticky top-0  p-5 z-10  backdrop-blur-xl  w-full border-b-2"
      initial={{ y: "-30vh" }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: 0.4 }}
    >
      <div className="flex justify-between ">
        <div className="flex gap-5 justify-start  w-full">
          <div className="block md:hidden ">
            <MobileSideBar open={open} toggleOpen={toggleOpen}>
              <div
                className="bg-white p-3 rounded-full h-10 w-10"
                onClick={() => toggleOpen(!open)}
              >
                <img alt="burger menu" src={hamburger} className=" h-4 w-4 " />
              </div>
            </MobileSideBar>
          </div>
          <div className="">
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
          </div>
        </div>

        <div className="flex gap-5 w-full  justify-end  ">
          <input
            type="text"
            className="bg-purple-400 w-28 md:w-64 px-2 placeholder:text-white rounded-sm dark:bg-white/10 text-white dark:text-white dark:placeholder:text-white h-10 hidden md:block focus:outline-purple-800"
            placeholder="Search..."
          />
          <Button size={"icon"} variant={"link"} className="relative">
            <MdCircleNotifications
              size={29}
              className="text-purple-800 dark:text-white "
            />
            <Badge
              variant={"destructive"}
              className="absolute -top-2  -right-2 rounded-full animate-pulse "
            >
              2
            </Badge>
          </Button>
          <ThemeToggle />{" "}
          <ProfileDropDown
            _id={user._id}
            children={
              <Avatar>
                <AvatarImage src={"https://github.com/shadcn.png"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            }
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
