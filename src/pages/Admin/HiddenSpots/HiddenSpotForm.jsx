import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import hiddenSpots from "../../../data/hiddenSpots";

import "./HiddenSpots.css";

const HiddenSpotForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const existingSpot = id
    ? hiddenSpots.find(
        (item) =>
          String(item.id) === String(id)
      )
    : null;

  const [form, setForm] = useState(
    existingSpot || {
      name: "",
      category: "",
      location: "",
      shortDescription: "",
      description: "",
      image: "",
      bestTime: "",
      visitDuration: "",
      entryFee: "",
      status: "Active",
      featured: false,
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
      alert("Hidden spot name is required.");
      return;
    }

    if (!form.category) {
      alert("Please select a category.");
      return;
    }

    if (!form.location.trim()) {
      alert("Location is required.");
      return;
    }

    console.log(
      existingSpot
        ? "UPDATE HIDDEN SPOT"
        : "CREATE HIDDEN SPOT",
      form
    );

    navigate("/admin/hidden-spots");
  };

  return (
    <div className="content-form-page">

      {/* HEADER */}

      <div className="content-form-header">

        <div>

          <Link
            to="/admin/hidden-spots"
            className="back-link"
          >
            ← Hidden Spots
          </Link>

          <h1>
            {existingSpot
              ? "Edit Hidden Spot"
              : "Add Hidden Spot"}
          </h1>

          <p>
            {existingSpot
              ? "Update hidden spot information."
              : "Add a new hidden destination."}
          </p>

        </div>

        <div className="form-header-actions">

          <Link
            to="/admin/hidden-spots"
            className="secondary-button"
          >
            Cancel
          </Link>

          <button
            type="submit"
            form="hidden-spot-form"
            className="primary-button"
          >
            {existingSpot
              ? "Update Spot"
              : "Create Spot"}
          </button>

        </div>

      </div>

      {/* FORM */}

      <form
        id="hidden-spot-form"
        className="content-form-card"
        onSubmit={handleSubmit}
      >

        {/* BASIC */}

        <div className="form-section">

          <div className="form-section-title">
            <h2>Basic Information</h2>

            <span>
              Required information
            </span>
          </div>

          <div className="form-grid">

            <div className="form-field full">

              <label>
                Hidden Spot Name *
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Example: Meenmutty View Point"
              />

            </div>

            <div className="form-field">

              <label>
                Category *
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">
                  Select category
                </option>

                <option value="Nature">
                  Nature
                </option>

                <option value="Viewpoint">
                  Viewpoint
                </option>

                <option value="Waterfall">
                  Waterfall
                </option>

                <option value="Adventure">
                  Adventure
                </option>

                <option value="Historical">
                  Historical
                </option>

              </select>

            </div>

            <div className="form-field">

              <label>
                Location *
              </label>

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Wayanad, Kerala"
              />

            </div>

            <div className="form-field full">

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

            <div className="form-field full">

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

        </div>

        {/* MEDIA */}

        <div className="form-section">

          <div className="form-section-title">

            <h2>Media</h2>

            <span>
              Cover image
            </span>

          </div>

          <div className="form-grid">

            <div className="form-field full">

              <label>
                Cover Image
              </label>

              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="/images/hidden-spots/image.jpg"
              />

              <small>
                Image upload can be connected
                later with your backend.
              </small>

            </div>

          </div>

        </div>

        {/* VISITOR */}

        <div className="form-section">

          <div className="form-section-title">

            <h2>Visitor Information</h2>

            <span>
              Optional
            </span>

          </div>

          <div className="form-grid">

            <div className="form-field">

              <label>
                Best Time to Visit
              </label>

              <input
                name="bestTime"
                value={form.bestTime}
                onChange={handleChange}
                placeholder="October - February"
              />

            </div>

            <div className="form-field">

              <label>
                Visit Duration
              </label>

              <input
                name="visitDuration"
                value={form.visitDuration}
                onChange={handleChange}
                placeholder="1 - 2 Hours"
              />

            </div>

            <div className="form-field">

              <label>
                Entry Fee
              </label>

              <input
                name="entryFee"
                value={form.entryFee}
                onChange={handleChange}
                placeholder="Free / ₹50"
              />

            </div>

          </div>

        </div>

        {/* PUBLISHING */}

        <div className="form-section">

          <div className="form-section-title">

            <h2>Publishing</h2>

            <span>
              Visibility
            </span>

          </div>

          <div className="form-grid">

            <div className="form-field">

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

            <div className="form-checkbox">

              <input
                id="featured"
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />

              <label htmlFor="featured">
                Featured Hidden Spot
              </label>

            </div>

          </div>

        </div>

      </form>

    </div>
  );
};

export default HiddenSpotForm;

