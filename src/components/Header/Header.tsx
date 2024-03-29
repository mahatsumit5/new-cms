import { useAppSelector } from "@/hooks";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import MobileSideBar from "../sideBar/MobileSideBar";
import { ProfileDropDown } from "./ProfileDropDown";
import hamburger from "/Hamburger.svg";
import { MdCircleNotifications } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
const Header = () => {
  const { orderStatuscount } = useAppSelector((store) => store.chartData);
  const [hidden, setHidden] = useState<boolean>(false);
  const { user } = useAppSelector((store) => store.userInfo);
  const [open, toggleOpen] = useState(false);
  const pendingOrder =
    orderStatuscount.filter((item) => item._id === "pending")[0]?.count || 0;
  useEffect(() => {
    pendingOrder && toast.info(`You have ${pendingOrder} orders pending.`, {});
  }, [pendingOrder]);

  useEffect(() => {
    let lastScroll: number = 0;
    function windowScroll() {
      // console.log(lastScroll, window.scrollY);
      if (lastScroll < window.scrollY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScroll = window.scrollY;
    }

    document.addEventListener("scroll", windowScroll);

    return () => document.removeEventListener("scroll", windowScroll);
  }, []);
  return (
    <motion.div
      className={` ${
        hidden
          ? "-top-30 animate-in duration-500"
          : "  animate-in duration-300 top-0"
      } header`}
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ ease: "easeOut", duration: 0.8 }}
      whileInView={{}}
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
            className="bg-white w-28 md:w-64 px-2 placeholder:text-[#0c2735fb] rounded-sm  h-10 hidden md:block focus:outline-purple-800"
            placeholder="Search..."
          />
          <Link to={"/orders"}>
            <Button size={"icon"} variant={"link"} className="relative">
              <MdCircleNotifications
                size={29}
                className="text-[#61a5c2] dark:text-white "
              />
              <Badge
                variant={"destructive"}
                className="absolute -top-2  -right-2 rounded-full animate-accordion-up "
              >
                {pendingOrder}
              </Badge>
            </Button>
          </Link>
          <ThemeToggle />{" "}
          <ProfileDropDown
            children={
              <Avatar>
                {user?.profile ? (
                  <AvatarImage src={user.profile} alt="profile" />
                ) : (
                  <AvatarImage
                    src={
                      "https://cfw-image-bucket.s3.ap-southeast-2.amazonaws.com/default.jpg"
                    }
                    alt="profile"
                  />
                )}
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
