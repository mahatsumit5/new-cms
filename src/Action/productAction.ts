import { postProduct } from "@/axios/productAxios";

import { toast } from "sonner";

export const postProductAction = (obj: FormData) => async () => {
  const pendingResp = postProduct(obj);
  const { status, message, imageToDelete } = await pendingResp;
  toast(message);
  // dispatch(getproductAction());
  if (status === "success" && imageToDelete?.length) {
    if (imageToDelete?.length) {
      // imagesToDelete.forEach((element: string) => {
      //   deleteImageFromServer({ fileName: element });
      // });
    }
    return true;
  }
};
// export const getproductAction = () => async (dispatch: AppDispatch) => {
//   const { status, message, result } = await getProducts();
//   if (status === "success") {
//     // dispatch(setProducts(result));
//     return true;
//   } else return false;
// };
// export const deleteProductAction = (_id) => async (dispatch) => {
//   const pendingResp = deleteProduct(_id);
//   toast.promise(pendingResp, { pending: "Please wait" });

//   const { status, message } = await pendingResp;
//   dispatch(getproductAction());
// };
// export const updateProductAction = (obj) => async (dispatch) => {
//   const pendingResp = updateProduct(obj);
//   toast.promise(pendingResp, { pending: "Please wait" });

//   const { status, message, imagesToDelete } = await pendingResp;
//   dispatch(getproductAction());
//   if (status === "success") {
//     if (imagesToDelete?.length) {
//       imagesToDelete.forEach((element) => {
//         deleteImageFromServer({ fileName: element });
//       });
//     }
//     return true;
//   }
//   return false;
// };
