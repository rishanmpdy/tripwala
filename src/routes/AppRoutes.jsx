import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import PlaceDetails from "../pages/PlaceDetails/PlaceDetails";
import FoodSpots from "../pages/FoodSpots/FoodSpots";
import Taxi from "../pages/Taxi/Taxi";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminLayout from "../pages/Admin/AdminLayout";
import RequireAdmin from "../auth/RequireAdmin";
import Places from "../pages/Admin/Places/Places";
import PlaceForm from "../pages/Admin/Places/PlaceForm";
import HiddenSpots from "../pages/Admin/HiddenSpots/HiddenSpots";
import HiddenSpotForm from "../pages/Admin/HiddenSpots/HiddenSpotForm";
import HiddenSpotView from "../pages/Admin/HiddenSpots/HiddenSpotView";
import MustWatch from "../pages/Admin/MustWatch/MustWatch";
import MustWatchForm from "../pages/Admin/MustWatch/MustWatchForm";
import MustWatchView from "../pages/Admin/MustWatch/MustWatchView";
import AdminFoodSpots from "../pages/Admin/FoodSpots/FoodSpots";
import FoodSpotForm from "../pages/Admin/FoodSpots/FoodSpotForm";
import FoodSpotView from "../pages/Admin/FoodSpots/FoodSpotView";
import Homestays from "../pages/Admin/Homestays/Homestays";
import HomestayForm from "../pages/Admin/Homestays/HomestayForm";
import HomestayView from "../pages/Admin/Homestays/HomestayView";
import Resorts from "../pages/Admin/Resorts/Resorts";
import ResortForm from "../pages/Admin/Resorts/ResortForm";
import ResortView from "../pages/Admin/Resorts/ResortView";
import AdminTaxi from "../pages/Admin/Taxi/Taxi";
import TaxiForm from "../pages/Admin/Taxi/TaxiForm";
import TaxiView from "../pages/Admin/Taxi/TaxiView";

const AdminSectionPlaceholder = () => <section className="admin-section-placeholder"><span>Coming soon</span><h2>This area is ready for your implementation.</h2><p>Replace this temporary view with the page code when it is ready.</p></section>;

const AppRoutes = () => <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/place/:id" element={<PlaceDetails />} />
  <Route path="/food" element={<FoodSpots />} />
  <Route path="/taxi" element={<Taxi />} />
  <Route path="/taxi/:id" element={<PlaceDetails />} />
  <Route path="/admin/login" element={<AdminLogin />} />
  <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
    <Route index element={<AdminDashboard />} />
    <Route path="places" element={<Places />} />
    <Route path="places/new" element={<PlaceForm />} />
    <Route path="places/:id/edit" element={<PlaceForm />} />
    <Route path="hidden-spots" element={<HiddenSpots />} />
    <Route path="hidden-spots/new" element={<HiddenSpotForm />} />
    <Route path="hidden-spots/:id" element={<HiddenSpotView />} />
    <Route path="hidden-spots/:id/edit" element={<HiddenSpotForm />} />
    <Route path="must-watch" element={<MustWatch />} />
    <Route path="must-watch/new" element={<MustWatchForm />} />
    <Route path="must-watch/:id" element={<MustWatchView />} />
    <Route path="must-watch/:id/edit" element={<MustWatchForm />} />
    <Route path="food-spots" element={<AdminFoodSpots />} />
    <Route path="food-spots/new" element={<FoodSpotForm />} />
    <Route path="food-spots/:id" element={<FoodSpotView />} />
    <Route path="food-spots/:id/edit" element={<FoodSpotForm />} />
    <Route path="home-stays" element={<Homestays />} />
    <Route path="homestays" element={<Homestays />} />
    <Route path="homestays/new" element={<HomestayForm />} />
    <Route path="homestays/:id" element={<HomestayView />} />
    <Route path="homestays/:id/edit" element={<HomestayForm />} />
    <Route path="resorts" element={<Resorts />} />
    <Route path="resorts/new" element={<ResortForm />} />
    <Route path="resorts/:id" element={<ResortView />} />
    <Route path="resorts/:id/edit" element={<ResortForm />} />
    <Route path="taxi" element={<AdminTaxi />} />
    <Route path="taxi/add" element={<TaxiForm />} />
    <Route path="taxi/view/:id" element={<TaxiView />} />
    <Route path="taxi/edit/:id" element={<TaxiForm />} />
    <Route path="*" element={<AdminSectionPlaceholder />} />
  </Route>
</Routes>;

export default AppRoutes;
