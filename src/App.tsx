import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/signin-singup/SignIn";
import Dashboard from "./pages/dashboard/Dashboard";
function App() {
  return (
    <div className=" min-h-screen   mx-auto  ">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
