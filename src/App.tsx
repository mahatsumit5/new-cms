import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/signin-singup/SignIn";
import Dashboard from "./pages/dashboard/Dashboard";
import Page from "./pages/reset-password/ResetPassword";
import { PrivateRoute } from "./components/private/PrivateRoute";
import ProductPage from "./pages/products/ProductPage";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useEffect } from "react";
import {
  getCataloguesAction,
  getParentCategoryAction,
} from "./Action/catelogueAction";
import CataloguePage from "./pages/catalogue/Catalogue";
import { getproductAction } from "./Action/productAction";
function App() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.userInfo);

  useEffect(() => {
    dispatch(getCataloguesAction());
    dispatch(getParentCategoryAction());
    dispatch(getproductAction());
  }, [dispatch, user]);
  return (
    <div className="  mx-auto  ">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/reset-password" element={<Page />} />
        {/* private Pages */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/catalogue"
          element={
            <PrivateRoute>
              <CataloguePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
