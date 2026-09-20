import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import PlaceDetails from "../pages/PlaceDetails/PlaceDetails";

const AppRoutes = () => {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/place/:id"
        element={<PlaceDetails />}
      />

    </Routes>
  );
};

export default AppRoutes;