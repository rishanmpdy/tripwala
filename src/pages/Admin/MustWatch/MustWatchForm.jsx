import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import mustWatch from "../../../data/mustWatch";

import "./MustWatch.css";

const MustWatchForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const existingVideo = id
    ? mustWatch.find(
        (item) =>
          String(item.id) === String(id)
      )
    : null;

  const [form, setForm] = useState(
    existingVideo || {
      title: "",
      shortDescription: "",
      description: "",
      videoSource: "YouTube",
      videoUrl: "",
      thumbnail: "",
      relatedPlaceId: "",
      relatedHiddenSpotId: "",
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

    if (!form.title.trim()) {
      alert("Video title is required.");
      return;
    }

    if (!form.videoUrl.trim()) {
      alert("Video URL is required.");
      return;
    }

    console.log(
      existingVideo
        ? "UPDATE MUST WATCH"
        : "CREATE MUST WATCH",
      form
    );

    navigate("/admin/must-watch");
  };

  return (
    <div className="content-form-page">

      {/* HEADER */}

      <div className="content-form-header">

        <div>

          <Link
            to="/admin/must-watch"
            className="back-link"
          >
            ← Must Watch
          </Link>

          <h1>
            {existingVideo
              ? "Edit Must Watch"
              : "Add Must Watch"}
          </h1>

          <p>
            {existingVideo
              ? "Update video information."
              : "Add a new travel video."}
          </p>

        </div>

        <div className="form-header-actions">

          <Link
            to="/admin/must-watch"
            className="secondary-button"
          >
            Cancel
          </Link>

          <button
            type="submit"
            form="must-watch-form"
            className="primary-button"
          >
            {existingVideo
              ? "Update Video"
              : "Create Video"}
          </button>

        </div>

      </div>

      {/* FORM */}

      <form
        id="must-watch-form"
        className="content-form-card"
        onSubmit={handleSubmit}
      >

        {/* BASIC */}

        <div className="form-section">

          <div className="form-section-title">

            <h2>
              Basic Information
            </h2>

            <span>
              Required information
            </span>

          </div>

          <div className="form-grid">

            <div className="form-field full">

              <label>
                Video Title *
              </label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Example: Discover Wayanad"
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
                placeholder="Video description..."
              />

            </div>

          </div>

        </div>

        {/* VIDEO */}

        <div className="form-section">

          <div className="form-section-title">

            <h2>
              Video
            </h2>

            <span>
              Video source and thumbnail
            </span>

          </div>

          <div className="form-grid">

            <div className="form-field">

              <label>
                Video Source
              </label>

              <select
                name="videoSource"
                value={form.videoSource}
                onChange={handleChange}
              >

                <option value="YouTube">
                  YouTube
                </option>

                <option value="Instagram">
                  Instagram
                </option>

                <option value="Uploaded Video">
                  Uploaded Video
                </option>

                <option value="External Video">
                  External Video
                </option>

              </select>

            </div>

            <div className="form-field">

              <label>
                Video URL *
              </label>

              <input
                name="videoUrl"
                value={form.videoUrl}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
              />

            </div>

            <div className="form-field full">

              <label>
                Thumbnail
              </label>

              <input
                name="thumbnail"
                value={form.thumbnail}
                onChange={handleChange}
                placeholder="/images/must-watch/video.jpg"
              />

              <small>
                Image upload can be connected later.
              </small>

            </div>

          </div>

        </div>

        {/* RELATED CONTENT */}

        <div className="form-section">

          <div className="form-section-title">

            <h2>
              Related Content
            </h2>

            <span>
              Optional
            </span>

          </div>

          <div className="form-grid">

            <div className="form-field">

              <label>
                Related Place
              </label>

              <select
                name="relatedPlaceId"
                value={form.relatedPlaceId}
                onChange={handleChange}
              >

                <option value="">
                  Select Place
                </option>

                <option value="1">
                  Soochipara Waterfalls
                </option>

                <option value="2">
                  Edakkal Caves
                </option>

              </select>

            </div>

            <div className="form-field">

              <label>
                Related Hidden Spot
              </label>

              <select
                name="relatedHiddenSpotId"
                value={form.relatedHiddenSpotId}
                onChange={handleChange}
              >

                <option value="">
                  Select Hidden Spot
                </option>

                <option value="1">
                  Meenmutty View Point
                </option>

                <option value="2">
                  Secret Forest Trail
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* PUBLISHING */}

        <div className="form-section">

          <div className="form-section-title">

            <h2>
              Publishing
            </h2>

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
                id="video-featured"
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />

              <label htmlFor="video-featured">
                Featured
              </label>

            </div>

            <div className="form-checkbox">

              <input
                id="video-home"
                type="checkbox"
                name="showOnHomepage"
                checked={form.showOnHomepage}
                onChange={handleChange}
              />

              <label htmlFor="video-home">
                Show on Homepage
              </label>

            </div>

          </div>

        </div>

      </form>

    </div>
  );
};

export default MustWatchForm;

