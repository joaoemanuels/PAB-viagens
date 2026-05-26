import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Container";
import Home from "../pages/Home";
import Admin from "../pages/Admin";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
