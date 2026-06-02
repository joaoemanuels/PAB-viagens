import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import ScrollToTop from "../components/common/ScrollToTop";
import AuthLayout from "../components/layout/AuthLayout";
import AdminLayout from "../components/layout/AdminLayout";
import { Loading } from "../components/common/Loading";

const SelectRole = lazy(() => import("../pages/shared/SelectRole"));
const Login = lazy(() => import("../pages/shared/Login"));
const Register = lazy(() => import("../pages/shared/Register"));
const NotFound = lazy(() => import("../pages/shared/NotFound"));

const Home = lazy(() => import("../pages/passenger/Home"));
const Trips = lazy(() => import("../pages/passenger/Trips"));
const Tracking = lazy(() => import("../pages/passenger/Tracking"));
const Booking = lazy(() => import("../pages/passenger/Booking"));
const Reserves = lazy(() => import("../pages/passenger/Reserves"));
const ProfileUser = lazy(() => import("../pages/passenger/ProfileUser"));
const PayMethod = lazy(() => import("../pages/passenger/PayMethod"));

const Admin = lazy(() => import("../pages/admin/Admin"));
const Travels = lazy(() => import("../pages/admin/Travels"));
const ProfileAdmin = lazy(() => import("../pages/admin/ProfileAdmin"));

function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<SelectRole />} />
        <Route path="/login/:role" element={<Login />} />
        <Route path="/register/:role" element={<Register />} />

        <Route element={<AuthLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/trips/:tripId" element={<Trips />} />
          <Route path="/tracking/:tripId" element={<Tracking />} />
        </Route>

        <Route
          element={
            <PrivateRoute>
              <AuthLayout />
            </PrivateRoute>
          }
        >
          <Route path="/trips/:tripId/booking" element={<Booking />} />
          <Route path="/reserves" element={<Reserves />} />
          <Route path="/profileUser" element={<ProfileUser />} />
          <Route path="/payMethod" element={<PayMethod />} />
        </Route>

        <Route
          element={
            <PrivateRoute allowedRole="admin">
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
    </Suspense>
  );
}

export default AppRoutes;
