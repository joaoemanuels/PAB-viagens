import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import AuthLayout from "../components/layout/AuthLayout";
import AdminLayout from "../components/layout/AdminLayout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import SelectRole from "../pages/SelectRole";

import Home from "../pages/Home";
import Trips from "../pages/Trips";
import Tracking from "../pages/Tracking";
import Booking from "../pages/Booking";

import Reserves from "../pages/Reserves";
import ProfileUser from "../pages/ProfileUser";
import PayMethod from "../pages/PayMethod";

import Admin from "../pages/Admin";
import Travels from "../pages/Travels";
import ProfileAdmin from "../pages/ProfileAdmin";

import NotFound from "../pages/NotFound";

import ScrollToTop from "../components/common/ScrollToTop";

function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<SelectRole />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<AuthLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/trips/:tripId" element={<Trips />} />
          <Route path="/tracking" element={<Tracking />} />
        </Route>

        <Route path="/trips/:tripId/booking" element={<Booking />} />

        <Route
          element={
            <PrivateRoute>
              <AuthLayout />
            </PrivateRoute>
          }
        >
          <Route path="/reserves" element={<Reserves />} />
          <Route path="/profileUser" element={<ProfileUser />} />
          <Route path="/payMethod" element={<PayMethod />} />
        </Route>

        <Route
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="/admin" element={<Admin />} />
          <Route path="/travels" element={<Travels />} />
          <Route path="/profileAdmin" element={<ProfileAdmin />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
