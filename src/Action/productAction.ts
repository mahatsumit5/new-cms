import { deleteImageFromServer } from "@/axios/axiosProcessor";
import {
  deleteProduct,
  getProducts,
  postProduct,
  updateProduct,
} from "@/axios/productAxios";
import { closeDialog } from "@/redux/dialog.slice";
import { setProducts } from "@/redux/product.slice";
import { AppDispatch } from "@/store";
import { IProduct } from "@/types";

import { getChartDataAction } from "./chart.action";
import { showToast } from "@/lib/utils";

export const postProductAction =
  (obj: FormData) => async (dispatch: AppDispatch) => {
    const pendingResp = postProduct(obj);
    showToast(pendingResp);

    const { status, imagesToDelete } = await pendingResp;
    status === "success" && dispatch(getproductAction());

    if (status === "success" && imagesToDelete?.length) {
      dispatch(getChartDataAction());

      if (imagesToDelete?.length && typeof imagesToDelete !== "string") {
        imagesToDelete.forEach((element: string) => {
          deleteImageFromServer({ fileName: element });
        });
      }
      return true;
    }
    return false;
  };
export const getproductAction = () => async (dispatch: AppDispatch) => {
  const { status, result } = await getProducts();

  if (status === "success") {
    dispatch(setProducts(result as IProduct[]));
  }
};
export const deleteProductAction =
  (_id: string) => async (dispatch: AppDispatch) => {
    const pendingResp = deleteProduct(_id);
    showToast(pendingResp);

    const { status } = await pendingResp;

    if (status === "success") {
      dispatch(getChartDataAction());

      dispatch(getproductAction());
      dispatch(closeDialog());
    }
  };
export const updateProductAction =
  (obj: FormData) => async (dispatch: AppDispatch) => {
    const pendingResp = updateProduct(obj);
    showToast(pendingResp);

    const { status, imagesToDelete } = await pendingResp;

    if (status === "success") {
      dispatch(getChartDataAction());

      dispatch(getproductAction());
      dispatch(closeDialog());
    }

    if (status === "success" && typeof imagesToDelete !== "string") {
      if (imagesToDelete?.length) {
        imagesToDelete.forEach((element: string) => {
          deleteImageFromServer({ fileName: element });
        });
      }
    }
  };
