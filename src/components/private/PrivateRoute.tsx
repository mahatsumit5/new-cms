import SideBar from "../sideBar/SideBar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { CustomBreadCrumb } from "../breadCrumbs/BreadCumbSeperator";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect } from "react";
import {
  getCataloguesAction,
  getParentCategoryAction,
} from "@/Action/catelogueAction";
import { getproductAction } from "@/Action/productAction";
import { getPaymentsAction } from "@/Action/paymentAction";
import { getOrderAction } from "@/Action/orderAction";
import { getChartDataAction } from "@/Action/chart.action";
export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((store) => store.userInfo);
  const { isOpen } = useAppSelector((store) => store.sideBar);
  const location = useLocation();
  //
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      return;
    }
    dispatch(getCataloguesAction());
    dispatch(getParentCategoryAction());
    dispatch(getproductAction());
    dispatch(getPaymentsAction());
    dispatch(getOrderAction());
    dispatch(getChartDataAction());
  }, [dispatch, user]);

  return user?._id ? (
    <div className=" flex flex-row w-full  ">
      <SideBar />
      <main
        className={`flex flex-col   gap-5  transition-all w-screen ${
          isOpen ? "md:ml-[235px]" : "md:ml-[82px]"
        }`}
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
