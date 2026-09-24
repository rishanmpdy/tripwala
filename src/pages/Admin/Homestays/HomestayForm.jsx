import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import homestays from "../../../data/admin/Places/homestays";

import "./Homestays.css";

const HomestayForm = () => {

  const { id } = useParams();

  const navigate = useNavigate();


  const existingHome = id
    ? homestays.find(
        (item) =>
          String(item.id) ===
          String(id)
      )
    : null;


  const [form, setForm] = useState(
    existingHome || {

      name: "",

      type: "",

      shortDescription: "",

      description: "",

      priceRange: "₹₹",

      image: "",

      gallery: [],

      address: "",

      area: "",

      district: "",

      latitude: "",

      longitude: "",

      mapsUrl: "",

      bedrooms: "",

      beds: "",

      guests: "",

      checkIn: "02:00 PM",

      checkOut: "11:00 AM",

      minimumStay: 1,

      phone: "",

      whatsapp: "",

      website: "",

      instagram: "",

      facilities: [],

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


  const toggleFacility = (
    facility
  ) => {

    setForm((current) => {

      const exists =
        current.facilities.includes(
          facility
        );

      return {
        ...current,

        facilities: exists
          ? current.facilities.filter(
              (item) =>
                item !== facility
            )
          : [
              ...current.facilities,
              facility,
            ],
      };

    });

  };


  const handleSubmit = (e) => {

    e.preventDefault();


    if (!form.name.trim()) {
      alert(
        "Homestay name is required."
      );
      return;
    }


    if (!form.type) {
      alert(
        "Please select property type."
      );
      return;
    }


    if (!form.address.trim()) {
      alert(
        "Address is required."
      );
      return;
    }


    console.log(
      existingHome
        ? "UPDATE HOMESTAY"
        : "CREATE HOMESTAY",
      form
    );


    /*
      Later:

      POST /api/homestays

      PUT /api/homestays/:id
    */


    navigate("/admin/homestays");

  };


  const facilities = [
    "Wi-Fi",
    "Parking",
    "Kitchen",
    "AC",
    "Breakfast",
    "Pet Friendly",
    "Bonfire",
    "Mountain View",
    "Garden",
    "TV",
    "Hot Water",
    "Washing Machine",
  ];


  return (
    <div className="homestay-form-page">

      <div className="homestay-form-header">

        <div>

          <Link
            to="/admin/homestays"
            className="homestay-back-link"
          >
            ← Homestays
          </Link>

          <h1>
            {existingHome
              ? "Edit Homestay"
              : "Add Homestay"}
          </h1>

          <p>
            {existingHome
              ? "Update homestay information."
              : "Add a new homestay property."}
          </p>

        </div>


        <div className="homestay-form-actions">

          <Link
            to="/admin/homestays"
            className="homestay-secondary-button"
          >
            Cancel
          </Link>

          <button
            type="submit"
            form="homestay-form"
            className="homestay-primary-button"
          >
            {existingHome
              ? "Update Homestay"
              : "Create Homestay"}
          </button>

        </div>

      </div>


      <form
        id="homestay-form"
        className="homestay-form-card"
        onSubmit={handleSubmit}
      >

        {/* BASIC */}

        <section className="homestay-form-section">

          <div className="homestay-section-title">

            <div>

              <h2>
                Basic Information
              </h2>

              <p>
                Main property information
              </p>

            </div>

            <span>
              Required
            </span>

          </div>


          <div className="homestay-form-grid">

            <div className="homestay-field full">

              <label>
                Homestay Name *
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Example: Green Valley Homestay"
              />

            </div>


            <div className="homestay-field">

              <label>
                Property Type *
              </label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
              >

                <option value="">
                  Select Type
                </option>

                <option value="Private Homestay">
                  Private Homestay
                </option>

                <option value="Entire Home">
                  Entire Home
                </option>

                <option value="Villa">
                  Villa
                </option>

                <option value="Farm Stay">
                  Farm Stay
                </option>

              </select>

            </div>


            <div className="homestay-field">

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


            <div className="homestay-field full">

              <label>
                Short Description
              </label>

              <input
                name="shortDescription"
                value={
                  form.shortDescription
                }
                onChange={handleChange}
                placeholder="Short description for listing"
              />

            </div>


            <div className="homestay-field full">

              <label>
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="6"
                placeholder="Detailed property description..."
              />

            </div>

          </div>

        </section>


        {/* LOCATION */}

        <section className="homestay-form-section">

          <div className="homestay-section-title">

            <div>

              <h2>
                Location
              </h2>

              <p>
                Property location
              </p>

            </div>

          </div>


          <div className="homestay-form-grid">

            <div className="homestay-field full">

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


            <div className="homestay-field">

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


            <div className="homestay-field">

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


            <div className="homestay-field">

              <label>
                Latitude
              </label>

              <input
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
              />

            </div>


            <div className="homestay-field">

              <label>
                Longitude
              </label>

              <input
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
              />

            </div>


            <div className="homestay-field full">

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


        {/* STAY */}

        <section className="homestay-form-section">

          <div className="homestay-section-title">

            <div>

              <h2>
                Stay Information
              </h2>

              <p>
                Accommodation capacity
              </p>

            </div>

          </div>


          <div className="homestay-form-grid">

            <div className="homestay-field">

              <label>
                Bedrooms
              </label>

              <input
                type="number"
                min="0"
                name="bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
              />

            </div>


            <div className="homestay-field">

              <label>
                Beds
              </label>

              <input
                type="number"
                min="0"
                name="beds"
                value={form.beds}
                onChange={handleChange}
              />

            </div>


            <div className="homestay-field">

              <label>
                Maximum Guests
              </label>

              <input
                type="number"
                min="0"
                name="guests"
                value={form.guests}
                onChange={handleChange}
              />

            </div>


            <div className="homestay-field">

              <label>
                Minimum Stay
              </label>

              <input
                type="number"
                min="1"
                name="minimumStay"
                value={
                  form.minimumStay
                }
                onChange={handleChange}
              />

            </div>


            <div className="homestay-field">

              <label>
                Check-in
              </label>

              <input
                name="checkIn"
                value={form.checkIn}
                onChange={handleChange}
              />

            </div>


            <div className="homestay-field">

              <label>
                Check-out
              </label>

              <input
                name="checkOut"
                value={form.checkOut}
                onChange={handleChange}
              />

            </div>

          </div>

        </section>


        {/* MEDIA */}

        <section className="homestay-form-section">

          <div className="homestay-section-title">

            <div>

              <h2>
                Media
              </h2>

              <p>
                Property images
              </p>

            </div>

          </div>


          <div className="homestay-form-grid">

            <div className="homestay-field full">

              <label>
                Cover Image *
              </label>

              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="/images/homestays/home.jpg"
              />

            </div>


            <div className="homestay-field full">

              <label>
                Gallery Images
              </label>

              <textarea
                rows="5"
                value={form.gallery.join(
                  "\n"
                )}
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
                placeholder="One image URL per line"
              />

            </div>

          </div>

        </section>


        {/* FACILITIES */}

        <section className="homestay-form-section">

          <div className="homestay-section-title">

            <div>

              <h2>
                Facilities
              </h2>

              <p>
                Available property facilities
              </p>

            </div>

          </div>


          <div className="homestay-facility-grid">

            {facilities.map(
              (facility) => (

                <label
                  key={facility}
                >

                  <input
                    type="checkbox"
                    checked={form.facilities.includes(
                      facility
                    )}
                    onChange={() =>
                      toggleFacility(
                        facility
                      )
                    }
                  />

                  {facility}

                </label>

              )
            )}

          </div>

        </section>


        {/* CONTACT */}

        <section className="homestay-form-section">

          <div className="homestay-section-title">

            <div>

              <h2>
                Contact
              </h2>

              <p>
                Contact information
              </p>

            </div>

          </div>


          <div className="homestay-form-grid">

            <div className="homestay-field">

              <label>
                Phone
              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />

            </div>


            <div className="homestay-field">

              <label>
                WhatsApp
              </label>

              <input
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
              />

            </div>


            <div className="homestay-field">

              <label>
                Website
              </label>

              <input
                name="website"
                value={form.website}
                onChange={handleChange}
              />

            </div>


            <div className="homestay-field">

              <label>
                Instagram
              </label>

              <input
                name="instagram"
                value={form.instagram}
                onChange={handleChange}
              />

            </div>

          </div>

        </section>


        {/* PUBLISHING */}

        <section className="homestay-form-section">

          <div className="homestay-section-title">

            <div>

              <h2>
                Publishing
              </h2>

              <p>
                Control website visibility
              </p>

            </div>

          </div>


          <div className="homestay-publish-grid">

            <div className="homestay-field">

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


            <label className="homestay-checkbox">

              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />

              Featured Homestay

            </label>


            <label className="homestay-checkbox">

              <input
                type="checkbox"
                name="showOnHomepage"
                checked={
                  form.showOnHomepage
                }
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

export default HomestayForm;
