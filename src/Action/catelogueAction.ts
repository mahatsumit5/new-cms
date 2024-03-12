import { deleteImageFromServer } from "@/axios/axiosProcessor";
import {
  getCategories,
  postCategory,
  updateCatagory,
} from "@/axios/categoryAxios";
import { getParentCategory } from "@/axios/parentCat.axios";
import { setCatagory, setParentCategory } from "@/redux/catagory.slice";
import { AppDispatch } from "@/store";
import { ICategory, IParentCategory } from "@/types";
import { toast } from "sonner";

export const postCatalogueAction =
  (obj: FormData) => async (dispatch: AppDispatch) => {
    const pendingResp = postCategory(obj);

    const { status, message, imagesToDelete } = await pendingResp;
    toast(message);

    if (status === "success" && imagesToDelete) {
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
// export const deleteCatagoryAction = (_id) => async (dispatch) => {
//   const { status, message } = await deleteCatagory(_id);
//   dispatch(getCataloguesAction());
// };
export const updateCatagoryAction =
  (stat: FormData) => async (dispatch: AppDispatch) => {
    const { status, imagesToDelete, message } = await updateCatagory(stat);
    toast(message);
    status === "success" && dispatch(getCataloguesAction());
    if (status === "success" && imagesToDelete) {
      deleteImageFromServer({ fileName: imagesToDelete as string });
    }
  };
