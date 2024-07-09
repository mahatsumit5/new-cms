import SideBar from "../sideBar/SideBar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { CustomBreadCrumb } from "../breadCrumbs/BreadCumbSeperator";
import { useLocation, useSearchParams } from "react-router-dom";
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
import { getAwsImagesAction } from "@/Action/images.action";
import { getAdminProfileAction } from "@/Action/userAction";
export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useAppSelector((store) => store.sideBar);
  const location = useLocation();
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAdminProfileAction());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCataloguesAction());
    dispatch(getParentCategoryAction());
    dispatch(getproductAction());
    dispatch(getPaymentsAction());
    dispatch(getOrderAction());
    dispatch(getChartDataAction());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname !== "/images") return;
    const limit = Number(params.get("limit"));
    dispatch(getAwsImagesAction(limit));
  }, [location, params, dispatch]);
  const responsive = isOpen ? "md:pl-[230px]" : "md:pl-[80px]";

  return (
    <>
      <div className=" flex flex-row w-full  ">
        <SideBar />
        <main
          className={`flex flex-col   gap-5  transition-all w-screen mx-auto ${responsive}`}
        >
          <Header />
          <CustomBreadCrumb />
          <div className="  h-auto p-2 md:px-4 ">{children}</div>
          <Footer />
        </main>
      </div>
    </>
  );
};
