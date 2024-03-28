import { deleteImage, getAllImages } from "@/axios/aws.axios";
import { setImages } from "@/redux/images.slice";
import { AppDispatch } from "@/store";
import { AwsImageType } from "@/types";

export const getAwsImagesAction =
  (limit: number) => async (dispatch: AppDispatch) => {
    const { status, images } = await getAllImages(limit);

    if (status === "success" && images?.Contents.length) {
      dispatch(setImages(images.Contents as AwsImageType[]));
    }
  };
export const deleteAwsImageAction =
  (key: string, limit: number) => async (dispatch: AppDispatch) => {
    const { status } = await deleteImage(key);

    if (status === "success") {
      dispatch(getAwsImagesAction(limit));
    }
  };
