// icons
import { BiSolidCategoryAlt } from "react-icons/bi";

import { BsFillBox2Fill, BsPersonFill } from "react-icons/bs";
import { FaMoneyBillAlt, FaUserSecret } from "react-icons/fa";
import { LiaCreditCardSolid, LiaTruckSolid } from "react-icons/lia";
import { Link, useLocation } from "react-router-dom";

import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { toogleSideBar } from "@/redux/sidebar.slice";
const NavigationMenu = ({
  toggleOpen,
}: {
  toggleOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { isOpen } = useAppSelector((store) => store.sideBar);
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);
  const buttons = [
    {
      name: "Dashboard",
      icon: <BsFillBox2Fill size={15} />,
      link: "/dashboard",
      duration: 0.1,
    },
    {
      name: "Products",
      icon: <BsFillBox2Fill size={15} />,
      link: "/products",
      duration: 0.2,
    },

    {
      name: "Sales",
      icon: <FaMoneyBillAlt size={15} />,
      duration: 0.3,
      link: "/sales",
    },

    {
      name: "Catalogue",
      icon: <BiSolidCategoryAlt size={15} />,
      duration: 0.4,
      link: "/catalogue",
    },
    {
      name: "Payment",
      icon: <LiaCreditCardSolid size={15} />,
      duration: 0.5,
      link: "/payment",
    },
    {
      name: "Orders",
      icon: <LiaTruckSolid size={15} />,
      duration: 0.6,
      link: "/orders",
    },
    {
      name: "Admin",
      icon: <FaUserSecret size={15} />,
      duration: 0.7,
      link: "/admin",
    },
    {
      name: "Profile",
      icon: <BsPersonFill size={15} />,
      duration: 0.8,
      link: "/profile",
    },
  ];
  const detectSize = () => {
    setScreenSize(window.innerWidth);
  };
  useEffect(() => {
    if (screenSize < 766) {
      dispatch(toogleSideBar(true));
    }

    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [screenSize, dispatch]);

  return (
    <ul className="flex flex-col  flex-1 gap-4 h-full justify-start  overflow-hidden w-full  mt-10   ">
      {buttons.map((item) => (
        <Link
          to={`${item.link}`}
          key={item.link}
          onClick={() => toggleOpen && toggleOpen(false)}
        >
          <motion.li
            initial={{ x: -200 }}
            animate={{ x: 0, transition: { duration: item.duration } }}
            // transition={{ ease: "backIn", duration: item.duration }}
            whileHover={{
              scale: 1.05,
            }}
            className={`flex gap-2   overflow-hidden  transition-all   p-1 `}
          >
            <span
              className={`mt-1  p-3 text-white rounded-full ${
                pathname === item.link ? "bg-[#6376e2]  " : "bg-[#3a0ca3]"
              }`}
            >
              {item.icon}
            </span>
            <motion.span
              initial={{ x: isOpen ? 0 : 100 }}
              animate={{ x: isOpen ? 0 : 100 }}
              transition={{ duration: item.duration, ease: "easeInOut" }}
              className={` text-black p-2  px-4 text-pretty text-md w-full  rounded-lg shadow-md  font-embed dark:text-white ${
                pathname === item.link
                  ? "bg-[#6376e2] text-white "
                  : "bg-[#3a0ca3] text-primary-foreground "
              }`}
            >
              {item.name}
            </motion.span>
          </motion.li>
        </Link>
      ))}
    </ul>
  );
};

export default NavigationMenu;
