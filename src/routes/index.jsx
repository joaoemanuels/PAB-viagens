import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import ScrollToTop from "../components/common/ScrollToTop";
import AuthLayout from "../components/layout/AuthLayout";
import AdminLayout from "../components/layout/AdminLayout";

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
const Travels = lazy(() => import("../pages/passenger/Travels"));

const Admin = lazy(() => import("../pages/admin/Admin"));
const ProfileAdmin = lazy(() => import("../pages/admin/ProfileAdmin"));

function AppRoutes() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
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
    </Suspense>
  );
}

export default AppRoutes;
