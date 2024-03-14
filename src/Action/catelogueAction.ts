import { deleteImageFromServer } from "@/axios/axiosProcessor";
import {
  deleteCatagory,
  getCategories,
  postCategory,
  updateCatagory,
} from "@/axios/categoryAxios";
import { getParentCategory } from "@/axios/parentCat.axios";
import { setCatagory, setParentCategory } from "@/redux/catagory.slice";
import { closeDialog } from "@/redux/dialog.slice";
import { AppDispatch } from "@/store";
import { ICategory, IParentCategory } from "@/types";
import { getChartDataAction } from "./chart.action";
import { showToast } from "@/lib/utils";

export const postCatalogueAction =
  (obj: FormData) => async (dispatch: AppDispatch) => {
    const pendingResp = postCategory(obj);
    showToast(pendingResp);

    const { status, imagesToDelete } = await pendingResp;

    if (status === "success" && imagesToDelete) {
      dispatch(getChartDataAction());

      dispatch(getCataloguesAction());
      deleteImageFromServer({ fileName: imagesToDelete as string });
    }
  };
export const getCataloguesAction = () => async (dispatch: AppDispatch) => {
  const { status, result } = await getCategories();

  if (status === "success" && result?.length) {
    dispatch(setCatagory(result as ICategory[]));
    return true;
  } else return false;
};
export const getParentCategoryAction = () => async (dispatch: AppDispatch) => {
  const { status, result } = await getParentCategory();
  if (status === "success" && result?.length) {
    dispatch(setParentCategory(result as IParentCategory[]));
  }
};
export const deleteCatagoryAction =
  (_id: string) => async (dispatch: AppDispatch) => {
    const pendingResp = deleteCatagory({ _id });
    showToast(pendingResp);

    const { status } = await pendingResp;
    dispatch(closeDialog());
    dispatch(getChartDataAction());
    if (status === "success") {
      dispatch(getCataloguesAction());
    }
  };
export const updateCatagoryAction =
  (stat: FormData) => async (dispatch: AppDispatch) => {
    const pendingResp = updateCatagory(stat);

    showToast(pendingResp);

    const { status, imagesToDelete } = await pendingResp;
    if (status === "success") {
      dispatch(getCataloguesAction());
      dispatch(getChartDataAction());
      dispatch(closeDialog());
    }
    if (status === "success" && imagesToDelete) {
      deleteImageFromServer({ fileName: imagesToDelete as string });
    }
  };
