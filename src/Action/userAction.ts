import { getAdmin, getNewAccessJWT, loginUser } from "@/axios/userAxios";
import { showToast } from "@/lib/utils";
import { setUser } from "@/redux/user.slice";
import { AppDispatch } from "@/store";
import { ILoginform } from "@/types";

export const loginUserAction =
  (userData: ILoginform) => async (dispatch: AppDispatch) => {
    const pendingResp = loginUser(userData);
    showToast(pendingResp);

    const { status, token } = await pendingResp;

    if (status === "success" && token?.accessJWT) {
      sessionStorage.setItem("accessJWT", token.accessJWT); ///active for 5mins
      localStorage.setItem("refreshJWT", token.refreshJWT); //active for 30days
      dispatch(getAdminProfileAction());
      return true;
    }
  };
export const getAdminProfileAction = () => async (dispatch: AppDispatch) => {
  //call the api to get user info
  const { status, user } = await getAdmin();
  //mount the state with the user data
  if (status === "success" && user?._id) {
    dispatch(setUser(user));
  }
};
export const autoLogin = () => async (dispatch: AppDispatch) => {
  // check if accessJWT exist
  const accessJWT = sessionStorage.getItem("accessJWT");
  if (accessJWT) {
    return dispatch(getAdminProfileAction());
  }
  const refreshJWT = localStorage.getItem("refreshJWT");
  if (refreshJWT) {
    // request new session token form the server
    const { accessJWT } = await getNewAccessJWT();
    if (accessJWT) {
      sessionStorage.setItem("accessJWT", accessJWT);
    }
    dispatch(getAdminProfileAction());
  }
};
