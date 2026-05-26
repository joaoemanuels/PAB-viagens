import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Admin from "../pages/Admin";

import PrivateRoute from "./PrivateRoute";
import AuthLayout from "../components/layout/AuthLayout";
import AdminLayout from "../components/layout/AdminLayout";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
