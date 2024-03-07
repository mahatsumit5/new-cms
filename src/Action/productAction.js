import { toast } from "react-toastify";
import {
  deleteImageFromServer,
  deleteProduct,
  getProducts,
  postProduct,
  updateProduct,
} from "../axiosHelper/productAxios";
import { setProducts } from "../redux/productSlice";

export const postProductAction = (obj) => async (dispatch) => {
  const pendingResp = postProduct(obj);
  toast.promise(pendingResp, { pending: "Please wait" });
  const { status, message, imagesToDelete } = await pendingResp;
  toast[status](message);
  dispatch(getproductAction());
  if (status === "success") {
    if (imagesToDelete?.length) {
      imagesToDelete.forEach((element) => {
        deleteImageFromServer({ fileName: element });
      });
    }
    return true;
  }
};
export const getproductAction = () => async (dispatch) => {
  const { status, message, result } = await getProducts();
  if (status === "success") {
    dispatch(setProducts(result));
    return true;
  } else return false;
};
export const deleteProductAction = (_id) => async (dispatch) => {
  const pendingResp = deleteProduct(_id);
  toast.promise(pendingResp, { pending: "Please wait" });

  const { status, message } = await pendingResp;
  dispatch(getproductAction());
};
export const updateProductAction = (obj) => async (dispatch) => {
  const pendingResp = updateProduct(obj);
  toast.promise(pendingResp, { pending: "Please wait" });

  const { status, message, imagesToDelete } = await pendingResp;
  dispatch(getproductAction());
  if (status === "success") {
    if (imagesToDelete?.length) {
      imagesToDelete.forEach((element) => {
        deleteImageFromServer({ fileName: element });
      });
    }
    return true;
  }
  return false;
};
