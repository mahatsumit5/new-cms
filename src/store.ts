import { configureStore } from "@reduxjs/toolkit"; //this is for storing data in redux/toolkit
// these will store data in webstorage
import userReducer from "./redux/user.slice";
import catagoryReducer from "./redux/catagory.slice";
// import systemReducer from "./systemSlice";
import paymentReducer from "./redux/payment.slice";
// import displayTableReducer from "./redux/displaySlice";
import productReducer from "./redux/product.slice";
// import orderReducer from "./redux/orderSlice";
import dialogReducer from "./redux/dialog.slice";
export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    catagoryInfo: catagoryReducer,
    // system: systemReducer,
    payments: paymentReducer,
    // displayTableData: displayTableReducer,
    productsData: productReducer,
    // orderData: orderReducer,
    dialog: dialogReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
