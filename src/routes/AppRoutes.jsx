import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Listings from "../pages/Listings/Listings";
import PlaceDetails from "../pages/Places/PlaceDetails";
import PlacesPage from "../pages/Places/Places";
import ResortDetails from "../pages/Resorts/ResortDetails";
import FoodSpots from "../pages/FoodSpots/FoodSpots";
import FoodDetails from "../pages/Food/FoodDetails";
import Taxi from "../pages/Taxi/Taxi";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminLayout from "../pages/Admin/AdminLayout";
import RequireAdmin from "../auth/RequireAdmin";
import Places from "../pages/Admin/Places/Places";
import PlaceForm from "../pages/Admin/Places/PlaceForm";
import PlaceView from "../pages/Admin/Places/PlaceView";
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
import Settings from "../pages/Admin/Settings/Settings";
import Reviews from "../pages/Admin/Reviews/Reviews";
import Users from "../pages/Admin/Users/Users";

const AdminSectionPlaceholder = () => <section className="admin-section-placeholder"><span>Coming soon</span><h2>This area is ready for your implementation.</h2><p>Replace this temporary view with the page code when it is ready.</p></section>;

const AppRoutes = () => <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/listings" element={<Listings />} />
  <Route path="/places" element={<PlacesPage />} />
  <Route path="/place/:id" element={<PlaceDetails />} />
  <Route path="/places/:id" element={<PlaceDetails />} />
  <Route path="/resort/:id" element={<ResortDetails />} />
  <Route path="/resorts/:id" element={<ResortDetails />} />
  <Route path="/food" element={<FoodSpots />} />
  <Route path="/food/:id" element={<FoodDetails />} />
  <Route path="/food-spot/:id" element={<FoodDetails />} />
  <Route path="/taxi" element={<Taxi />} />
  <Route path="/taxi/:id" element={<PlaceDetails />} />
  <Route path="/admin/login" element={<AdminLogin />} />
  <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
    <Route index element={<AdminDashboard />} />
    <Route path="places" element={<Places />} />
    <Route path="places/new" element={<PlaceForm />} />
    <Route path="places/:id" element={<PlaceView />} />
    <Route path="places/view/:id" element={<PlaceView />} />
    <Route path="places/:id/edit" element={<PlaceForm />} />
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
    <Route path="taxi/new" element={<TaxiForm />} />
    <Route path="taxi/view/:id" element={<TaxiView />} />
    <Route path="taxi/:id" element={<TaxiView />} />
    <Route path="taxi/edit/:id" element={<TaxiForm />} />
    <Route path="taxi/:id/edit" element={<TaxiForm />} />
    <Route path="settings" element={<Settings />} />
    <Route path="reviews" element={<Reviews />} />
    <Route path="users" element={<Users />} />
    <Route path="*" element={<AdminSectionPlaceholder />} />
  </Route>
</Routes>;

export default AppRoutes;