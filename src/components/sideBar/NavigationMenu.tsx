// icons
import { FaUsers } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BsFillBox2Fill, BsPersonFill } from "react-icons/bs";
import { FaMoneyBillAlt, FaUserSecret } from "react-icons/fa";
import { LiaCreditCardSolid, LiaTruckSolid } from "react-icons/lia";
import { Link, useLocation } from "react-router-dom";
const NavigationMenu = () => {
  const { pathname } = useLocation();
  const buttons = [
    {
      name: "Dashboard",
      icon: <BsFillBox2Fill size={15} />,
      link: "/dashboard",
    },
    {
      name: "Products",
      icon: <BsFillBox2Fill size={15} />,
      link: "/products",
    },
    {
      name: "Customers",
      icon: <FaUsers size={15} />,
      link: "/customers",
    },
    {
      name: "Sales",
      icon: <FaMoneyBillAlt size={15} />,
      link: "/sales",
    },

    {
      name: "Catalogue",
      icon: <BiSolidCategoryAlt size={15} />,
      link: "/catalogue",
    },
    {
      name: "Payment",
      icon: <LiaCreditCardSolid size={15} />,
      link: "/payment",
    },
    {
      name: "Orders",
      icon: <LiaTruckSolid size={15} />,
      link: "/orders",
    },
    {
      name: "Admin",
      icon: <FaUserSecret size={15} />,
      link: "/admin",
    },
    {
      name: "Profile",
      icon: <BsPersonFill size={15} />,
      link: "/profile",
    },
  ];
  return (
    <ul className="flex flex-col  flex-1 gap-6 h-full justify-between ">
      {buttons.map((item) => (
        <Link to={`${item.link}`} key={item.link}>
          <li
            className={`flex gap-5  p-3 rounded-md  dark:bg-slate-700 overflow-hidden hover:scale-110 transition-all hover:shadow-lg  ${
              pathname === item.link
                ? "bg-slate-400 dark:bg-slate-500/85 shadow-2xl rounded-md text-white"
                : "bg-slate-700/80 dark:bg-slate-500/15"
            }`}
          >
            <span className="mt-1 text-white">{item.icon}</span>
            <span className="font-bold text-white text-pretty text-md">
              {item.name}
            </span>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default NavigationMenu;
