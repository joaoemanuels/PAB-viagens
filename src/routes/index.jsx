import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import ScrollToTop from "../components/common/ScrollToTop";
import SelectRole from "../pages/shared/SelectRole";
import Login from "../pages/shared/Login";
import Register from "../pages/shared/Register";
import AuthLayout from "../components/layout/AuthLayout";
import Home from "../pages/passenger/Home";
import Trips from "../pages/passenger/Trips";
import Tracking from "../pages/passenger/Tracking";
import Booking from "../pages/passenger/Booking";
import Reserves from "../pages/passenger/Reserves";
import ProfileUser from "../pages/passenger/ProfileUser";
import PayMethod from "../pages/passenger/PayMethod";
import AdminLayout from "../components/layout/AdminLayout";
import Admin from "../pages/admin/Admin";
import Travels from "../pages/passenger/Travels";
import ProfileAdmin from "../pages/admin/ProfileAdmin";
import NotFound from "../pages/shared/NotFound";

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
          <Route path="/travelsAdmin" element={<Travels />} />
          <Route path="/profileAdmin" element={<ProfileAdmin />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
