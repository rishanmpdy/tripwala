import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import PlaceDetails from "../pages/PlaceDetails/PlaceDetails";
import FoodSpots from "../pages/FoodSpots/FoodSpots";
import Taxi from "../pages/Taxi/Taxi";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import RequireAdmin from "../auth/RequireAdmin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/place/:id" element={<PlaceDetails />} />

      <Route path="/food" element={<FoodSpots />} />

      <Route path="/taxi" element={<Taxi />} />

      <Route path="/taxi/:id" element={<PlaceDetails />} />

      
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
    </Routes>
  );
};

export default AppRoutes;
