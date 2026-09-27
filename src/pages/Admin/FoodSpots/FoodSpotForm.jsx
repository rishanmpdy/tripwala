import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { foodStore } from "../../../data/stores";

import "./FoodSpots.css";

const FoodSpotForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const existingFood = id
    ? foodSpots.find(
        (item) =>
          String(item.id) === String(id)
      )
    : null;


  const [form, setForm] = useState(
    existingFood || {
      name: "",
      category: "",
      shortDescription: "",
      description: "",

      cuisine: "",
      speciality: "",
      priceRange: "₹",

      image: "",
      gallery: [],

      address: "",
      area: "",
      district: "",

      latitude: "",
      longitude: "",
      mapsUrl: "",

      phone: "",
      whatsapp: "",
      website: "",
      instagram: "",

      vegetarian: false,
      nonVegetarian: false,
      delivery: false,
      takeaway: false,

      status: "Active",
      featured: false,
      showOnHomepage: false,
    }
  );


  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((current) => ({
      ...current,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Food spot name is required.");
      return;
    }

    if (!form.category) {
      alert("Please select a category.");
      return;
    }

    if (!form.address.trim()) {
      alert("Address is required.");
      return;
    }


    console.log(
      existingFood
        ? "UPDATE FOOD SPOT"
        : "CREATE FOOD SPOT",
      form
    );


    /*
      Later replace this with:

      TanStack Query mutation
      POST /api/food-spots

      or

      PUT /api/food-spots/:id
    */


    navigate("/admin/food-spots");
  };


  return (
    <div className="food-form-page">

      {/* HEADER */}

      <div className="food-form-header">

        <div>

          <Link
            to="/admin/food-spots"
            className="food-back-link"
          >
            ← Food Spots
          </Link>

          <h1>
            {existingFood
              ? "Edit Food Spot"
              : "Add Food Spot"}
          </h1>

          <p>
            {existingFood
              ? "Update food spot information."
              : "Add a new food destination."}
          </p>

        </div>


        <div className="food-form-actions">

          <Link
            to="/admin/food-spots"
            className="food-secondary-button"
          >
            Cancel
          </Link>

          <button
            type="submit"
            form="food-form"
            className="food-primary-button"
          >
            {existingFood
              ? "Update Food Spot"
              : "Create Food Spot"}
          </button>

        </div>

      </div>


      {/* FORM */}

      <form
        id="food-form"
        className="food-form-card"
        onSubmit={handleSubmit}
      >


        {/* =========================
            BASIC INFORMATION
        ========================= */}

        <section className="food-form-section">

          <div className="food-section-title">

            <div>
              <h2>
                Basic Information
              </h2>

              <p>
                Main food spot information
              </p>
            </div>

            <span>
              Required
            </span>

          </div>


          <div className="food-form-grid">


            <div className="food-field full">

              <label>
                Food Spot Name *
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Example: 1980's A Nostalgic Restaurant"
              />

            </div>


            <div className="food-field">

              <label>
                Category *
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >

                <option value="">
                  Select Category
                </option>

                <option value="Restaurant">
                  Restaurant
                </option>

                <option value="Cafe">
                  Cafe
                </option>

                <option value="Bakery">
                  Bakery
                </option>

                <option value="Street Food">
                  Street Food
                </option>

                <option value="Fast Food">
                  Fast Food
                </option>

                <option value="Traditional Food">
                  Traditional Food
                </option>

                <option value="Juice / Drinks">
                  Juice / Drinks
                </option>

                <option value="Dessert">
                  Dessert
                </option>

              </select>

            </div>


            <div className="food-field">

              <label>
                Cuisine
              </label>

              <input
                name="cuisine"
                value={form.cuisine}
                onChange={handleChange}
                placeholder="Kerala / Indian / Arabic..."
              />

            </div>


            <div className="food-field">

              <label>
                Speciality
              </label>

              <input
                name="speciality"
                value={form.speciality}
                onChange={handleChange}
                placeholder="Signature dish"
              />

            </div>


            <div className="food-field">

              <label>
                Price Range
              </label>

              <select
                name="priceRange"
                value={form.priceRange}
                onChange={handleChange}
              >

                <option value="₹">
                  ₹ — Budget
                </option>

                <option value="₹₹">
                  ₹₹ — Moderate
                </option>

                <option value="₹₹₹">
                  ₹₹₹ — Premium
                </option>

                <option value="₹₹₹₹">
                  ₹₹₹₹ — Luxury
                </option>

              </select>

            </div>


            <div className="food-field full">

              <label>
                Short Description
              </label>

              <input
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                placeholder="Short description for listing"
              />

            </div>


            <div className="food-field full">

              <label>
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="6"
                placeholder="Detailed description..."
              />

            </div>

          </div>

        </section>


        {/* =========================
            LOCATION
        ========================= */}

        <section className="food-form-section">

          <div className="food-section-title">

            <div>

              <h2>
                Location
              </h2>

              <p>
                Where the food spot is located
              </p>

            </div>

          </div>


          <div className="food-form-grid">


            <div className="food-field full">

              <label>
                Address *
              </label>

              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Full address"
              />

            </div>


            <div className="food-field">

              <label>
                Area
              </label>

              <input
                name="area"
                value={form.area}
                onChange={handleChange}
                placeholder="Meppadi"
              />

            </div>


            <div className="food-field">

              <label>
                District
              </label>

              <input
                name="district"
                value={form.district}
                onChange={handleChange}
                placeholder="Wayanad"
              />

            </div>


            <div className="food-field">

              <label>
                Latitude
              </label>

              <input
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                placeholder="11.6100"
              />

            </div>


            <div className="food-field">

              <label>
                Longitude
              </label>

              <input
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                placeholder="76.0800"
              />

            </div>


            <div className="food-field full">

              <label>
                Google Maps URL
              </label>

              <input
                name="mapsUrl"
                value={form.mapsUrl}
                onChange={handleChange}
                placeholder="https://maps.google.com/..."
              />

            </div>

          </div>

        </section>


        {/* =========================
            MEDIA
        ========================= */}

        <section className="food-form-section">

          <div className="food-section-title">

            <div>

              <h2>
                Media
              </h2>

              <p>
                Images displayed on the website
              </p>

            </div>

          </div>


          <div className="food-form-grid">


            <div className="food-field full">

              <label>
                Cover Image *
              </label>

              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="/images/food-spots/restaurant.jpg"
              />

              <small>
                Later this can be replaced with
                your image upload API.
              </small>

            </div>


            <div className="food-field full">

              <label>
                Gallery Images
              </label>

              <textarea
                rows="4"
                placeholder="One image URL per line"
                value={form.gallery.join("\n")}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    gallery:
                      e.target.value
                        .split("\n")
                        .map((item) =>
                          item.trim()
                        )
                        .filter(Boolean),
                  }))
                }
              />

            </div>

          </div>

        </section>


        {/* =========================
            CONTACT
        ========================= */}

        <section className="food-form-section">

          <div className="food-section-title">

            <div>

              <h2>
                Contact
              </h2>

              <p>
                Contact and social information
              </p>

            </div>

          </div>


          <div className="food-form-grid">


            <div className="food-field">

              <label>
                Phone
              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91..."
              />

            </div>


            <div className="food-field">

              <label>
                WhatsApp
              </label>

              <input
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="+91..."
              />

            </div>


            <div className="food-field">

              <label>
                Website
              </label>

              <input
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="https://..."
              />

            </div>


            <div className="food-field">

              <label>
                Instagram
              </label>

              <input
                name="instagram"
                value={form.instagram}
                onChange={handleChange}
                placeholder="@username"
              />

            </div>

          </div>

        </section>


        {/* =========================
            SERVICES
        ========================= */}

        <section className="food-form-section">

          <div className="food-section-title">

            <div>

              <h2>
                Services
              </h2>

              <p>
                Available food services
              </p>

            </div>

          </div>


          <div className="food-check-grid">

            <label>

              <input
                type="checkbox"
                name="vegetarian"
                checked={form.vegetarian}
                onChange={handleChange}
              />

              Vegetarian Available

            </label>


            <label>

              <input
                type="checkbox"
                name="nonVegetarian"
                checked={form.nonVegetarian}
                onChange={handleChange}
              />

              Non-Vegetarian Available

            </label>


            <label>

              <input
                type="checkbox"
                name="delivery"
                checked={form.delivery}
                onChange={handleChange}
              />

              Delivery Available

            </label>


            <label>

              <input
                type="checkbox"
                name="takeaway"
                checked={form.takeaway}
                onChange={handleChange}
              />

              Takeaway Available

            </label>

          </div>

        </section>


        {/* =========================
            PUBLISHING
        ========================= */}

        <section className="food-form-section">

          <div className="food-section-title">

            <div>

              <h2>
                Publishing
              </h2>

              <p>
                Website visibility
              </p>

            </div>

          </div>


          <div className="food-form-grid">


            <div className="food-field">

              <label>
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

              </select>

            </div>


            <label className="food-checkbox">

              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />

              Featured Food Spot

            </label>


            <label className="food-checkbox">

              <input
                type="checkbox"
                name="showOnHomepage"
                checked={form.showOnHomepage}
                onChange={handleChange}
              />

              Show on Homepage

            </label>

          </div>

        </section>

      </form>

    </div>
  );
};

export default FoodSpotForm;


