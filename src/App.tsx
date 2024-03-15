import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/signin-singup/SignIn";
import Dashboard from "./pages/dashboard/Dashboard";
import Page from "./pages/reset-password/ResetPassword";
import { PrivateRoute } from "./components/private/PrivateRoute";
import ProductPage from "./pages/products/ProductPage";

import CataloguePage from "./pages/catalogue/Catalogue";
import Payment from "./pages/payment/Payment";
import Orders from "./pages/orders/Orders";
import { CustomDialog } from "./components/dialog/CustomDialog";
import Profile from "./pages/profile/page";
import Sales from "./pages/sales/Sales";
import Admin from "./pages/admin/Admin";
function App() {
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
      </Routes>

      <CustomDialog />
    </div>
  );
}

export default App;
