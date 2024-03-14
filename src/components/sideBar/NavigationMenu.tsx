// icons
import { BiSolidCategoryAlt } from "react-icons/bi";

import { BsFillBox2Fill, BsPersonFill } from "react-icons/bs";
import { FaMoneyBillAlt, FaUserSecret } from "react-icons/fa";
import { LiaCreditCardSolid, LiaTruckSolid } from "react-icons/lia";
import { Link, useLocation } from "react-router-dom";

import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
const NavigationMenu = ({
  toggleOpen,
}: {
  toggleOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const { pathname } = useLocation();
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
    // {
    //   name: "Customers",
    //   icon: <FaUsers size={15} />,
    //   link: "/customers",
    // },
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
  return (
    <ul className="flex flex-col  flex-1 gap-4 h-full justify-start  overflow-hidden w-full  mt-6   ">
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
            className={`flex gap-5   overflow-hidden  transition-all   p-1 `}
          >
            <span
              className={`mt-1  p-3 text-white rounded-full ${
                pathname === item.link ? "bg-purple-800  " : "bg-purple-600"
              }`}
            >
              {item.icon}
            </span>
            <span
              className={`font-bold text-black p-2  px-4 text-pretty text-md bg- w-full  rounded-lg border  dark:text-white ${
                pathname === item.link
                  ? "bg-purple-800 text-white "
                  : "border-purple-600 dark:border-white"
              }`}
            >
              {item.name}
            </span>
          </motion.li>
        </Link>
      ))}
    </ul>
  );
};

export default NavigationMenu;
