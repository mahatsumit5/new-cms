import { configureStore } from "@reduxjs/toolkit"; //this is for storing data in redux/toolkit
// these will store data in webstorage
import userReducer from "./redux/user.slice";
import catagoryReducer from "./redux/catagory.slice";
import imagesReducer from "./redux/images.slice";
import paymentReducer from "./redux/payment.slice";
// import displayTableReducer from "./redux/displaySlice";
import productReducer from "./redux/product.slice";
import orderReducer from "./redux/order.slice";
import dialogReducer from "./redux/dialog.slice";
import chartDataReducer from "./redux/chart.data";
import sideBarReducer from "./redux/sidebar.slice";

export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    catagoryInfo: catagoryReducer,
    awsImages: imagesReducer,
    payments: paymentReducer,
    // displayTableData: displayTableReducer,
    productsData: productReducer,
    orderData: orderReducer,
    dialog: dialogReducer,
    chartData: chartDataReducer,
    sideBar: sideBarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
