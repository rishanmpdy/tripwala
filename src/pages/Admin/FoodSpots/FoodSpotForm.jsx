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
    ? foodStore.get().find(
        (item) =>
          String(item.id) === String(id)
      )
    : null;


  const [form, setForm] = useState(
    existingFood
      ? {
          ...existingFood,
          rating: existingFood.rating || "4.6",
          reviews: existingFood.reviews || "45",
          gallery: Array.isArray(existingFood.gallery) ? existingFood.gallery : [],
        }
      : {
          name: "",
          category: "",
          shortDescription: "",
          description: "",

          cuisine: "",
          speciality: "",
          priceRange: "₹",
          rating: "4.6",
          reviews: "45",

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

  const [galleryUrlInput, setGalleryUrlInput] = useState("");

  const parseGalleryItem = (item, index) => {
    if (typeof item === "object" && item !== null) {
      return {
        id: item.id || `gallery-${index}`,
        url: item.url || "",
        name:
          item.name ||
          (item.url ? item.url.split("/").pop().split("?")[0] : `Image ${index + 1}`),
      };
    }
    const url = String(item || "");
    const name = url.startsWith("data:")
      ? `Uploaded-Image-${index + 1}.png`
      : url.split("/").pop().split("?")[0] || `Image ${index + 1}`;
    return {
      id: `gallery-${index}`,
      url,
      name,
    };
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setForm((prev) => ({
        ...prev,
        image: event.target.result,
      }));
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach((file, i) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newItem = {
          id: `upload-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
          url: event.target.result,
          name: file.name,
        };
        setForm((prev) => ({
          ...prev,
          gallery: [
            ...(Array.isArray(prev.gallery) ? prev.gallery : []),
            newItem,
          ],
        }));
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const handleAddGalleryUrl = () => {
    if (!galleryUrlInput.trim()) return;
    const url = galleryUrlInput.trim();
    const name = url.split("/").pop().split("?")[0] || "Online Image";
    setForm((prev) => ({
      ...prev,
      gallery: [
        ...(Array.isArray(prev.gallery) ? prev.gallery : []),
        {
          id: `url-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          url,
          name,
        },
      ],
    }));
    setGalleryUrlInput("");
  };

  const handleRemoveGalleryImage = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      gallery: (Array.isArray(prev.gallery) ? prev.gallery : []).filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

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

    const name = String(form.name ?? "").trim();

    if (!name) {
      alert("Food spot name is required.");
      return;
    }

    if (!form.category) {
      alert("Please select a category.");
      return;
    }

    if (!String(form.address ?? "").trim()) {
      alert("Address is required.");
      return;
    }


    const currentSpots = foodStore.get();
    const foodId = existingFood?.id ? existingFood.id : Date.now();

    const galleryUrls = (Array.isArray(form.gallery) ? form.gallery : [])
      .map((item) => (typeof item === "object" && item !== null ? item.url : item))
      .filter(Boolean);

    const foodDataToSave = {
      ...existingFood,
      ...form,
      id: foodId,
      name,
      gallery: galleryUrls,
    };

    const saved = foodStore.save(
      existingFood
        ? currentSpots.map((item) => (String(item.id) === String(id) ? foodDataToSave : item))
        : [...currentSpots, foodDataToSave]
    );
    if (saved) navigate("/admin/food-spots");
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


            <div className="food-field">

              <label>
                Rating (1-5)
              </label>

              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                placeholder="4.6"
              />

            </div>


            <div className="food-field">

              <label>
                Total Reviews
              </label>

              <input
                type="number"
                name="reviews"
                value={form.reviews}
                onChange={handleChange}
                placeholder="45"
              />

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

              <div className="food-media-upload-bar">
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="/images/food-spots/restaurant.jpg or choose file"
                  style={{ flex: 1 }}
                />
                <input
                  type="file"
                  accept="image/*"
                  id="food-cover-upload"
                  style={{ display: "none" }}
                  onChange={handleCoverUpload}
                />
                <label htmlFor="food-cover-upload" className="food-choose-file-btn">
                  Choose File
                </label>
              </div>

              {form.image && (
                <div className="food-cover-preview">
                  <div className="food-cover-preview-thumb">
                    <img src={form.image} alt="Cover Preview" />
                  </div>
                  <div className="food-cover-preview-info">
                    <span className="food-cover-preview-name">
                      {form.image.startsWith("data:")
                        ? "Uploaded Cover Image"
                        : (form.image.split("/").pop().split("?")[0] || form.image)}
                    </span>
                    <span className="food-cover-preview-sub">Cover image selected</span>
                  </div>
                  <button
                    type="button"
                    className="food-gallery-remove-btn"
                    onClick={() => setForm((prev) => ({ ...prev, image: "" }))}
                  >
                    Remove
                  </button>
                </div>
              )}

              <small>
                Later this can be replaced with your image upload API.
              </small>

            </div>


            <div className="food-field full">

              <label>
                Gallery Images ({Array.isArray(form.gallery) ? form.gallery.length : 0})
              </label>

              <div className="food-media-upload-bar">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  id="food-gallery-upload"
                  style={{ display: "none" }}
                  onChange={handleGalleryUpload}
                />
                <label htmlFor="food-gallery-upload" className="food-choose-file-btn">
                  Choose Files
                </label>

                <div className="food-url-adder">
                  <input
                    value={galleryUrlInput}
                    onChange={(e) => setGalleryUrlInput(e.target.value)}
                    placeholder="Or enter image URL..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddGalleryUrl();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="food-add-url-btn"
                    onClick={handleAddGalleryUrl}
                  >
                    Add URL
                  </button>
                </div>
              </div>

              {/* Gallery Listing */}
              <div className="food-gallery-container">
                {(!Array.isArray(form.gallery) || form.gallery.length === 0) ? (
                  <div className="food-gallery-empty">
                    No gallery images added yet. Click &quot;Choose Files&quot; above to select images.
                  </div>
                ) : (
                  <div className="food-gallery-list">
                    {form.gallery.map((item, index) => {
                      const parsed = parseGalleryItem(item, index);
                      return (
                        <div key={parsed.id || index} className="food-gallery-item">
                          <div className="food-gallery-thumb">
                            <img src={parsed.url} alt={parsed.name} />
                          </div>
                          <div className="food-gallery-info">
                            <span className="food-gallery-name" title={parsed.name}>
                              {parsed.name}
                            </span>
                            <span className="food-gallery-badge">
                              {parsed.url.startsWith("data:") ? "Uploaded File" : "Image URL"}
                            </span>
                          </div>
                          <button
                            type="button"
                            className="food-gallery-remove-btn"
                            onClick={() => handleRemoveGalleryImage(index)}
                            title="Remove image"
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

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


