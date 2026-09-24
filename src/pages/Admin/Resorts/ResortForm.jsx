import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import resorts from "../../../data/admin/Places/resorts";

import "./Resorts.css";

const ResortForm = () => {

  const { id } = useParams();

  const navigate = useNavigate();


  const existingResort = id
    ? resorts.find(
        (item) =>
          String(item.id) ===
          String(id)
      )
    : null;


  const [form, setForm] = useState(
    existingResort || {

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

      rooms: "",

      roomTypes: "",

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
        "Resort name is required."
      );
      return;
    }


    if (!form.type) {
      alert(
        "Please select resort type."
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
      existingResort
        ? "UPDATE RESORT"
        : "CREATE RESORT",
      form
    );


    /*
      TanStack Query API:

      POST /api/resorts

      PUT /api/resorts/:id
    */


    navigate("/admin/resorts");

  };


  const facilities = [
    "Swimming Pool",
    "Restaurant",
    "Parking",
    "Wi-Fi",
    "AC",
    "Room Service",
    "Campfire",
    "Spa",
    "Gym",
    "Pet Friendly",
    "Mountain View",
    "Garden",
  ];


  return (
    <div className="resort-form-page">

      {/* HEADER */}

      <div className="resort-form-header">

        <div>

          <Link
            to="/admin/resorts"
            className="resort-back-link"
          >
            ← Resorts
          </Link>

          <h1>
            {existingResort
              ? "Edit Resort"
              : "Add Resort"}
          </h1>

          <p>
            {existingResort
              ? "Update resort information."
              : "Add a new resort property."}
          </p>

        </div>


        <div className="resort-form-actions">

          <Link
            to="/admin/resorts"
            className="resort-secondary-button"
          >
            Cancel
          </Link>

          <button
            type="submit"
            form="resort-form"
            className="resort-primary-button"
          >
            {existingResort
              ? "Update Resort"
              : "Create Resort"}
          </button>

        </div>

      </div>


      <form
        id="resort-form"
        className="resort-form-card"
        onSubmit={handleSubmit}
      >

        {/* BASIC */}

        <section className="resort-form-section">

          <div className="resort-section-title">

            <div>

              <h2>
                Basic Information
              </h2>

              <p>
                Main resort information
              </p>

            </div>

            <span>
              Required
            </span>

          </div>


          <div className="resort-form-grid">

            <div className="resort-field full">

              <label>
                Resort Name *
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Example: Mountain Mist Resort"
              />

            </div>


            <div className="resort-field">

              <label>
                Resort Type *
              </label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
              >

                <option value="">
                  Select Type
                </option>

                <option value="Luxury Resort">
                  Luxury Resort
                </option>

                <option value="Nature Resort">
                  Nature Resort
                </option>

                <option value="Beach Resort">
                  Beach Resort
                </option>

                <option value="Family Resort">
                  Family Resort
                </option>

                <option value="Boutique Resort">
                  Boutique Resort
                </option>

              </select>

            </div>


            <div className="resort-field">

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


            <div className="resort-field full">

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


            <div className="resort-field full">

              <label>
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="6"
                placeholder="Detailed resort description..."
              />

            </div>

          </div>

        </section>


        {/* LOCATION */}

        <section className="resort-form-section">

          <div className="resort-section-title">

            <div>

              <h2>
                Location
              </h2>

              <p>
                Resort location details
              </p>

            </div>

          </div>


          <div className="resort-form-grid">

            <div className="resort-field full">

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


            <div className="resort-field">

              <label>
                Area
              </label>

              <input
                name="area"
                value={form.area}
                onChange={handleChange}
                placeholder="Vythiri"
              />

            </div>


            <div className="resort-field">

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


            <div className="resort-field">

              <label>
                Latitude
              </label>

              <input
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                placeholder="11.5520"
              />

            </div>


            <div className="resort-field">

              <label>
                Longitude
              </label>

              <input
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                placeholder="76.0390"
              />

            </div>


            <div className="resort-field full">

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

        <section className="resort-form-section">

          <div className="resort-section-title">

            <div>

              <h2>
                Stay Information
              </h2>

              <p>
                Room and guest information
              </p>

            </div>

          </div>


          <div className="resort-form-grid">

            <div className="resort-field">

              <label>
                Number of Rooms
              </label>

              <input
                type="number"
                min="0"
                name="rooms"
                value={form.rooms}
                onChange={handleChange}
                placeholder="18"
              />

            </div>


            <div className="resort-field">

              <label>
                Maximum Guests
              </label>

              <input
                type="number"
                min="0"
                name="guests"
                value={form.guests}
                onChange={handleChange}
                placeholder="50"
              />

            </div>


            <div className="resort-field full">

              <label>
                Room Types
              </label>

              <input
                name="roomTypes"
                value={form.roomTypes}
                onChange={handleChange}
                placeholder="Deluxe, Suite, Family"
              />

            </div>


            <div className="resort-field">

              <label>
                Check-in
              </label>

              <input
                name="checkIn"
                value={form.checkIn}
                onChange={handleChange}
              />

            </div>


            <div className="resort-field">

              <label>
                Check-out
              </label>

              <input
                name="checkOut"
                value={form.checkOut}
                onChange={handleChange}
              />

            </div>


            <div className="resort-field">

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

          </div>

        </section>


        {/* MEDIA */}

        <section className="resort-form-section">

          <div className="resort-section-title">

            <div>

              <h2>
                Media
              </h2>

              <p>
                Resort images and gallery
              </p>

            </div>

          </div>


          <div className="resort-form-grid">

            <div className="resort-field full">

              <label>
                Cover Image *
              </label>

              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="/images/resorts/resort.jpg"
              />

            </div>


            <div className="resort-field full">

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

        <section className="resort-form-section">

          <div className="resort-section-title">

            <div>

              <h2>
                Facilities
              </h2>

              <p>
                Select available resort
                facilities
              </p>

            </div>

          </div>


          <div className="resort-facility-grid">

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

        <section className="resort-form-section">

          <div className="resort-section-title">

            <div>

              <h2>
                Contact
              </h2>

              <p>
                Contact and social information
              </p>

            </div>

          </div>


          <div className="resort-form-grid">

            <div className="resort-field">

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


            <div className="resort-field">

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


            <div className="resort-field">

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


            <div className="resort-field">

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


        {/* PUBLISHING */}

        <section className="resort-form-section">

          <div className="resort-section-title">

            <div>

              <h2>
                Publishing
              </h2>

              <p>
                Control website visibility
              </p>

            </div>

          </div>


          <div className="resort-publish-grid">

            <div className="resort-field">

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


            <label className="resort-checkbox">

              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />

              Featured Resort

            </label>


            <label className="resort-checkbox">

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

export default ResortForm;
