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
      className="sticky top-0  p-9 z-10  backdrop-blur-xl  w-full border-b-2"
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
            className="bg-[#91c7de] w-28 md:w-64 px-2 placeholder:text-[#0c2735fb] rounded-sm dark:bg-[#447c9e] text-[#263d49] dark:text-white dark:placeholder:text-white h-10 hidden md:block focus:outline-purple-800"
            placeholder="Search..."
          />
          <Button size={"icon"} variant={"link"} className="relative">
            <MdCircleNotifications
              size={29}
              className="text-[#61a5c2] dark:text-white "
            />
            <Badge
              variant={"destructive"}
              className="absolute -top-2  -right-2 rounded-full animate-accordion-up "
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
