import { Route } from "react-router-dom";
import Places from "./Places/Places";
import PlaceForm from "./Places/PlaceForm";

// Render this inside the /admin parent route in AppRoutes.
const AdminLayoutRoutes = () => (
  <>
    <Route path="places" element={<Places />} />
    <Route path="places/new" element={<PlaceForm />} />
    <Route path="places/:id/edit" element={<PlaceForm />} />
  </>
);

export default AdminLayoutRoutes;
