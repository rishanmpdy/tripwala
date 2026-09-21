import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import PlaceDetails from "../pages/PlaceDetails/PlaceDetails";
import FoodSpots from "../pages/FoodSpots/FoodSpots";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/place/:id" element={<PlaceDetails />} />

      <Route path="/food" element={<FoodSpots />} />
    </Routes>
  );
};

export default AppRoutes;
