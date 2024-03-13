import SideBar from "../sideBar/SideBar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { CustomBreadCrumb } from "../breadCrumbs/BreadCumbSeperator";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/hooks";
export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((store) => store.userInfo);
  const location = useLocation();
  return user?._id ? (
    <div className=" flex xl:w-7xl overflow-x-hidden">
      <SideBar />
      <main className="flex flex-col w-full md:ml-[80px]  gap-5">
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
