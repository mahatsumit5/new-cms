import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import { PrivateRoute } from "./components/private/PrivateRoute";
import ProductPage from "./pages/products/ProductPage";

import CataloguePage from "./pages/catalogue/Catalogue";
import Payment from "./pages/payment/Payment";
import Orders from "./pages/orders/Orders";
import { CustomDialog } from "./components/dialog/CustomDialog";
import Profile from "./pages/profile/page";
import Sales from "./pages/sales/Sales";
import Admin from "./pages/admin/Admin";
import AwsImages from "./pages/images/AwsImages";
function App() {
  return (
    <div className="  mx-auto font-">
      <Routes>
        {/* private Pages */}
        <Route
          path="/"
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
        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders/test"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <PrivateRoute>
              <Sales />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="/images"
          element={
            <PrivateRoute>
              <AwsImages />
            </PrivateRoute>
          }
        />
      </Routes>

      <CustomDialog />
    </div>
  );
}

export default App;
