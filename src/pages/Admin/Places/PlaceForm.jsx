import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { placeStore } from "../../../data/stores";
import "./PlaceForm.css";

const blank = {
  name: "",
  category: "Nature",
  location: "",
  district: "Wayanad",
  state: "Kerala",
  description: "",
  overview: "",
  bestTime: "",
  entryFee: "",
  openingTime: "",
  duration: "",
  difficulty: "Easy",
  walkingDistance: "",
  foodSpotDistance: "",
  latitude: "",
  longitude: "",
  mapsUrl: "",
  rating: "4.8",
  reviews: "0",
  image: "",
  images: [],
  status: "Active",
  featured: false,
  showOnHomepage: false,
};

const PlaceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const editingPlace = id
    ? placeStore.get().find((place) => String(place.id) === String(id))
    : null;

  const [form, setForm] = useState(() => {
    if (editingPlace) {
      const existingImages = Array.isArray(editingPlace.images)
        ? editingPlace.images
        : Array.isArray(editingPlace.gallery)
        ? editingPlace.gallery
        : [];
      return {
        ...blank,
        ...editingPlace,
        category: editingPlace.category || editingPlace.type || "Nature",
        image: editingPlace.image || existingImages[0] || "",
        images: existingImages,
        status: editingPlace.status || "Active",
        featured: Boolean(editingPlace.featured),
        showOnHomepage: Boolean(editingPlace.showOnHomepage),
      };
    }
    return blank;
  });

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
          images: [
            ...(Array.isArray(prev.images) ? prev.images : []),
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
      images: [
        ...(Array.isArray(prev.images) ? prev.images : []),
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
      images: (Array.isArray(prev.images) ? prev.images : []).filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const handleChange = ({ target: { name, value, type, checked } }) =>
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const clean = (value) => String(value ?? "").trim();
    if (!clean(form.name) || !form.category || !clean(form.location)) {
      return alert("Place name, category, and location are required.");
    }

    const galleryUrls = (Array.isArray(form.images) ? form.images : [])
      .map((item) => (typeof item === "object" && item !== null ? item.url : item))
      .filter(Boolean);
    const gallery = galleryUrls.length ? galleryUrls : (form.image ? [form.image] : []);
    const mapsUrl = clean(form.mapsUrl) || (form.latitude && form.longitude ? `https://maps.google.com/?q=${form.latitude},${form.longitude}` : "");

    const place = {
      ...editingPlace,
      ...form,
      id: editingPlace?.id || `place-${Date.now()}`,
      name: clean(form.name),
      location: clean(form.location),
      district: clean(form.district),
      state: clean(form.state),
      description: clean(form.description),
      overview: clean(form.overview),
      bestTime: clean(form.bestTime),
      entryFee: clean(form.entryFee),
      openingTime: clean(form.openingTime),
      duration: clean(form.duration),
      difficulty: form.difficulty,
      walkingDistance: clean(form.walkingDistance),
      foodSpotDistance: clean(form.foodSpotDistance),
      latitude: clean(form.latitude),
      longitude: clean(form.longitude),
      mapsUrl,
      mapUrl: mapsUrl,
      rating: form.rating ? String(form.rating) : "4.8",
      reviews: form.reviews ? Number(form.reviews) || form.reviews : 0,
      type: form.category,
      image: form.image,
      images: gallery,
      gallery,
      status: form.status,
      featured: Boolean(form.featured),
      showOnHomepage: Boolean(form.showOnHomepage),
    };

    const places = placeStore.get();
    const saved = placeStore.save(
      editingPlace
        ? places.map((item) => (String(item.id) === String(id) ? place : item))
        : [...places, place]
    );
    if (saved) navigate("/admin/places");
  };

  return (
    <div className="place-form-page">
      <div className="place-form-header">
        <div>
          <Link to="/admin/places" className="place-back">
            ← Places
          </Link>
          <h2>{editingPlace ? "Edit Place" : "Add Place"}</h2>
          <p>
            {editingPlace
              ? "Update place details, visit guides, and visitor information."
              : "Add a new tourist place to Tripwala with complete operational details."}
          </p>
        </div>
        <div className="place-form-actions">
          <Link to="/admin/places" className="place-cancel-btn">
            Cancel
          </Link>
          <button type="submit" form="place-form" className="place-save-btn">
            {editingPlace ? "Update Place" : "Create Place"}
          </button>
        </div>
      </div>

      <form id="place-form" className="place-form" onSubmit={handleSubmit}>
        {/* BASIC INFORMATION */}
        <div className="place-form-card">
          <div className="place-form-card-header">
            <h3>Basic Information</h3>
            <span>Core place information</span>
          </div>

          <div className="place-form-grid">
            <div className="place-field full">
              <label>
                Place Name <span>*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Chembra Peak"
                required
              />
            </div>

            <div className="place-field">
              <label>
                Category <span>*</span>
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {[
                  "Nature",
                  "Waterfall",
                  "Historical",
                  "Mountain Trek",
                  "Viewpoint",
                  "Adventure",
                  "Plantation",
                  "Lake & Dam",
                  "Wildlife Sanctuary",
                  "Must Visit",
                  "Hidden Spot",
                ].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="place-field">
              <label>
                Location / Area <span>*</span>
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Meppadi, Wayanad"
                required
              />
            </div>

            <div className="place-field">
              <label>District</label>
              <input
                name="district"
                value={form.district}
                onChange={handleChange}
                placeholder="e.g. Wayanad"
              />
            </div>

            <div className="place-field">
              <label>State</label>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="e.g. Kerala"
              />
            </div>
          </div>
        </div>

        {/* VISITOR & OPERATIONAL DETAILS */}
        <div className="place-form-card">
          <div className="place-form-card-header">
            <h3>Visitor & Operational Guide</h3>
            <span>Timings, fees, and travel details</span>
          </div>

          <div className="place-form-grid">
            <div className="place-field">
              <label>Best Time to Visit</label>
              <input
                name="bestTime"
                value={form.bestTime}
                onChange={handleChange}
                placeholder="e.g. September – March, Post Monsoon"
              />
            </div>

            <div className="place-field">
              <label>Entry Fee / Passes</label>
              <input
                name="entryFee"
                value={form.entryFee}
                onChange={handleChange}
                placeholder="e.g. ₹50 per person / Free entry"
              />
            </div>

            <div className="place-field">
              <label>Visiting Hours / Opening Time</label>
              <input
                name="openingTime"
                value={form.openingTime}
                onChange={handleChange}
                placeholder="e.g. 08:00 AM – 05:00 PM"
              />
            </div>

            <div className="place-field">
              <label>Recommended Duration</label>
              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="e.g. 2–3 Hours, Half Day"
              />
            </div>

            <div className="place-field">
              <label>Trek / Activity Difficulty</label>
              <select
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
              >
                <option value="Easy">Easy (Family friendly)</option>
                <option value="Easy to Moderate">Easy to Moderate</option>
                <option value="Moderate">Moderate (Mild climb)</option>
                <option value="Challenging">Challenging / Steep Trek</option>
                <option value="Difficult">Difficult</option>
              </select>
            </div>

            <div className="place-field">
              <label>Walking Distance (from parking)</label>
              <input
                name="walkingDistance"
                value={form.walkingDistance}
                onChange={handleChange}
                placeholder="e.g. 500m, 1.5 km"
              />
            </div>

            <div className="place-field">
              <label>Nearby Food Spot Distance</label>
              <input
                name="foodSpotDistance"
                value={form.foodSpotDistance}
                onChange={handleChange}
                placeholder="e.g. 200m, 1.2 km"
              />
            </div>

            <div className="place-field">
              <label>Rating (1-5)</label>
              <input
                name="rating"
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={form.rating}
                onChange={handleChange}
                placeholder="4.8"
              />
            </div>

            <div className="place-field">
              <label>Total Reviews</label>
              <input
                name="reviews"
                type="number"
                value={form.reviews}
                onChange={handleChange}
                placeholder="245"
              />
            </div>
          </div>
        </div>

        {/* MAP & GEOLOCATION */}
        <div className="place-form-card">
          <div className="place-form-card-header">
            <h3>Location & Geolocation Coordinates</h3>
            <span>Used for directions and map views</span>
          </div>

          <div className="place-form-grid">
            <div className="place-field">
              <label>Latitude</label>
              <input
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                placeholder="e.g. 11.4530"
              />
            </div>

            <div className="place-field">
              <label>Longitude</label>
              <input
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                placeholder="e.g. 76.0860"
              />
            </div>

            <div className="place-field full">
              <label>Google Maps URL</label>
              <input
                name="mapsUrl"
                value={form.mapsUrl}
                onChange={handleChange}
                placeholder="https://maps.google.com/?q=..."
              />
            </div>
          </div>
        </div>

        {/* DESCRIPTIONS */}
        <div className="place-form-card">
          <div className="place-form-card-header">
            <h3>Descriptions & Overview</h3>
            <span>Story and highlights for visitors</span>
          </div>

          <div className="place-form-grid">
            <div className="place-field full">
              <label>Short Overview / Highlight</label>
              <textarea
                name="overview"
                value={form.overview}
                onChange={handleChange}
                rows="3"
                placeholder="Brief highlight of the destination experience..."
              />
            </div>

            <div className="place-field full">
              <label>Full Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="6"
                placeholder="Detailed description, historical importance, scenic beauty..."
              />
            </div>
          </div>
        </div>

        {/* MEDIA */}
        <div className="place-form-card">
          <div className="place-form-card-header">
            <h3>Media & Photos</h3>
            <span>Cover photo and gallery collection</span>
          </div>

          <div className="place-form-grid">
            <div className="place-field full">
              <label>Cover Image</label>
              <div className="admin-media-upload-bar">
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="/images/place.jpg or choose file"
                  style={{ flex: 1 }}
                />
                <input
                  type="file"
                  accept="image/*"
                  id="place-cover-upload"
                  style={{ display: "none" }}
                  onChange={handleCoverUpload}
                />
                <label htmlFor="place-cover-upload" className="admin-choose-file-btn">
                  Choose File
                </label>
              </div>

              {form.image && (
                <div className="admin-cover-preview">
                  <div className="admin-cover-preview-thumb">
                    <img src={form.image} alt="Cover Preview" />
                  </div>
                  <div className="admin-cover-preview-info">
                    <span className="admin-cover-preview-name">
                      {form.image.startsWith("data:")
                        ? "Uploaded Cover Image"
                        : (form.image.split("/").pop().split("?")[0] || form.image)}
                    </span>
                    <span className="admin-cover-preview-sub">Cover image selected</span>
                  </div>
                  <button
                    type="button"
                    className="admin-gallery-remove-btn"
                    onClick={() => setForm((prev) => ({ ...prev, image: "" }))}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <div className="place-field full">
              <label>
                Gallery Images ({Array.isArray(form.images) ? form.images.length : 0})
              </label>

              <div className="admin-media-upload-bar">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  id="place-gallery-upload"
                  style={{ display: "none" }}
                  onChange={handleGalleryUpload}
                />
                <label htmlFor="place-gallery-upload" className="admin-choose-file-btn">
                  Choose Files
                </label>

                <div className="admin-url-adder">
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
                    className="admin-add-url-btn"
                    onClick={handleAddGalleryUrl}
                  >
                    Add URL
                  </button>
                </div>
              </div>

              {/* Gallery Listing */}
              <div className="admin-gallery-container">
                {(!Array.isArray(form.images) || form.images.length === 0) ? (
                  <div className="admin-gallery-empty">
                    No gallery images added yet. Click &quot;Choose Files&quot; above to select images.
                  </div>
                ) : (
                  <div className="admin-gallery-list">
                    {form.images.map((item, index) => {
                      const parsed = parseGalleryItem(item, index);
                      return (
                        <div key={parsed.id || index} className="admin-gallery-item">
                          <div className="admin-gallery-thumb">
                            <img src={parsed.url} alt={parsed.name} />
                          </div>
                          <div className="admin-gallery-info">
                            <span className="admin-gallery-name" title={parsed.name}>
                              {parsed.name}
                            </span>
                            <span className="admin-gallery-badge">
                              {parsed.url.startsWith("data:") ? "Uploaded File" : "Image URL"}
                            </span>
                          </div>
                          <button
                            type="button"
                            className="admin-gallery-remove-btn"
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
        </div>

        {/* STATUS & VISIBILITY */}
        <div className="place-form-card">
          <div className="place-form-card-header">
            <h3>Publishing & Status</h3>
            <span>Visibility controls</span>
          </div>

          <div className="place-form-grid">
            <div className="place-field">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="place-field" style={{ justifyContent: "center" }}>
              <div style={{ display: "flex", gap: "20px", marginTop: "18px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "500" }}>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={Boolean(form.featured)}
                    onChange={handleChange}
                  />
                  Featured Place
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "500" }}>
                  <input
                    type="checkbox"
                    name="showOnHomepage"
                    checked={Boolean(form.showOnHomepage)}
                    onChange={handleChange}
                  />
                  Show on Homepage
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceForm;
