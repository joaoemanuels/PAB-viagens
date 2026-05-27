import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import AuthLayout from "../components/layout/AuthLayout";
import AdminLayout from "../components/layout/AdminLayout";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Trips from "../pages/Trips";
import Tracking from "../pages/Tracking";
import Profile from "../pages/Profile";

import Admin from "../pages/Admin";

import NotFound from "../pages/NotFound";
import Booking from "../pages/Booking";
import Reserves from "../pages/Reserves";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<AuthLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/trips/:tripId" element={<Trips />} />

        <Route path="/tracking" element={<Tracking />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/reserves" element={<Reserves />} />
      </Route>

      <Route path="/trips/:tripId/booking" element={<Booking />} />

      <Route
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route path="/admin" element={<Admin />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
