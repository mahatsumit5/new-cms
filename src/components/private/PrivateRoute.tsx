import SideBar from "../sideBar/SideBar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { CustomBreadCrumb } from "../breadCrumbs/BreadCumbSeperator";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/hooks";
import { useState } from "react";
export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [open, toggleOpen] = useState(false);

  const { user } = useAppSelector((store) => store.userInfo);
  const location = useLocation();
  return user?._id ? (
    <div className=" flex xl:w-7xl overflow-x-hidden">
      <SideBar open={open} toggleOpen={toggleOpen} />
      <main
        className={`flex flex-col w-full   gap-5 ${
          open ? "md:ml-[230px]" : "md:ml-[80px]"
        } transition-all`}
      >
        <Header />
        <CustomBreadCrumb />
        <div className="  h-auto  p-5 ">{children}</div>
        <Footer />
      </main>
    </div>
  ) : (
    <Navigate to="/" state={{ from: { location } }} />
  );
};
