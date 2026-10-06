import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { foodStore } from "../../../data/stores";
import "./FoodSpots.css";

const FoodSpotView = () => {
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const food = foodStore.get().find(
    (item) => String(item.id) === String(id)
  );

  if (!food) {
    return (
      <div className="food-not-found">
        <h2>Food spot not found</h2>
        <p>The food spot you are looking for does not exist or has been removed.</p>
        <Link to="/admin/food-spots">Back to Food Spots</Link>
      </div>
    );
  }

  const galleryImages = (
    Array.isArray(food.gallery) && food.gallery.length
      ? food.gallery
      : Array.isArray(food.images) && food.images.length
      ? food.images
      : food.image
      ? [food.image]
      : []
  )
    .map((img) => (typeof img === "object" && img !== null ? img.url : img))
    .filter(Boolean);

  const coverImage = food.image || galleryImages[0] || "";

  return (
    <div className="food-form-page">
      {/* HEADER */}
      <div className="food-form-header">
        <div>
          <Link to="/admin/food-spots" className="food-back-link">
            ← Food Spots
          </Link>
          <h1>{food.name}</h1>
          <p>{food.address || food.area || "Restaurant & Dining"}</p>
        </div>

        <Link
          to={`/admin/food-spots/${food.id}/edit`}
          className="food-primary-button"
        >
          Edit Food Spot
        </Link>
      </div>

      {/* VIEW CARD */}
      <div className="food-view-card">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="food-view-image">
            {coverImage ? (
              <img src={coverImage} alt={food.name} />
            ) : (
              <div style={{ height: "260px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5", color: "#888" }}>
                No Image Available
              </div>
            )}
          </div>

          {galleryImages.length > 1 && (
            <div style={{ padding: "0 4px" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: "#555", marginBottom: "8px" }}>
                Gallery ({galleryImages.length} images)
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                {galleryImages.map((img, idx) => (
                  <button
                    key={`${img}-${idx}`}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    style={{
                      border: selectedImageIndex === idx ? "2px solid #111" : "1px solid #ddd",
                      borderRadius: "6px",
                      overflow: "hidden",
                      height: "64px",
                      padding: 0,
                      cursor: "pointer",
                      background: "#eee",
                    }}
                  >
                    <img
                      src={img}
                      alt={`${food.name} ${idx + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="food-view-content">
          <div className="food-view-top">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
              <span className="food-category">{food.category || "Restaurant"}</span>
              {food.featured && (
                <span style={{ padding: "3px 8px", background: "#e0f2fe", color: "#0369a1", borderRadius: "4px", fontSize: "11px", fontWeight: "600" }}>
                  ★ Featured
                </span>
              )}
              {food.showOnHomepage && (
                <span style={{ padding: "3px 8px", background: "#f3e8ff", color: "#7e22ce", borderRadius: "4px", fontSize: "11px", fontWeight: "600" }}>
                  Home Highlight
                </span>
              )}
            </div>

            <span
              className={`food-status ${
                food.status === "Active" ? "active" : "inactive"
              }`}
            >
              <span />
              {food.status}
            </span>
          </div>

          <h2>{food.name}</h2>

          {food.shortDescription && (
            <p style={{ fontStyle: "italic", color: "#555", margin: "4px 0 12px", fontSize: "13px" }}>
              &quot;{food.shortDescription}&quot;
            </p>
          )}

          <p className="food-view-description">
            {food.description || "No detailed description provided."}
          </p>

          <div className="food-view-details">
            <div>
              <small>Cuisine</small>
              <strong>{food.cuisine || "—"}</strong>
            </div>

            <div>
              <small>Speciality</small>
              <strong>{food.speciality || "—"}</strong>
            </div>

            <div>
              <small>Price Range</small>
              <strong>{food.priceRange || "—"}</strong>
            </div>

            <div>
              <small>Location / Area</small>
              <strong>
                {food.area || food.district
                  ? `${food.area || ""}${food.area && food.district ? ", " : ""}${food.district || ""}`
                  : food.address || "—"}
              </strong>
            </div>

            <div>
              <small>Phone</small>
              <strong>{food.phone || "—"}</strong>
            </div>

            <div>
              <small>WhatsApp</small>
              <strong style={{ color: "#16a34a" }}>{food.whatsapp || "—"}</strong>
            </div>

            <div>
              <small>Website</small>
              <strong>
                {food.website ? (
                  <a href={food.website} target="_blank" rel="noreferrer" style={{ color: "#0284c7" }}>
                    Visit Website ↗
                  </a>
                ) : (
                  "—"
                )}
              </strong>
            </div>

            <div>
              <small>Instagram</small>
              <strong>{food.instagram || "—"}</strong>
            </div>

            <div>
              <small>Rating & Reviews</small>
              <strong style={{ color: "#b45309" }}>
                ★ {food.rating || "4.6"} <span style={{ fontSize: "11px", fontWeight: "400", color: "#777" }}>({food.reviews || 0})</span>
              </strong>
            </div>

            <div>
              <small>Coordinates</small>
              <strong>
                {food.latitude && food.longitude ? `${food.latitude}, ${food.longitude}` : "—"}
              </strong>
            </div>
          </div>

          {/* SERVICES & DIETARY */}
          <div style={{ marginTop: "14px" }}>
            <div style={{ fontSize: "11px", fontWeight: "600", textTransform: "uppercase", color: "#777", marginBottom: "8px" }}>
              Dining & Service Options
            </div>
            <div className="food-view-services">
              {food.vegetarian && <span style={{ background: "#dcfce7", color: "#15803d" }}>✓ Vegetarian</span>}
              {food.nonVegetarian && <span style={{ background: "#fee2e2", color: "#b91c1c" }}>✓ Non-Vegetarian</span>}
              {food.delivery && <span style={{ background: "#e0f2fe", color: "#0369a1" }}>✓ Delivery Available</span>}
              {food.takeaway && <span style={{ background: "#fef3c7", color: "#92400e" }}>✓ Takeaway / Takeout</span>}
              {!food.vegetarian && !food.nonVegetarian && !food.delivery && !food.takeaway && (
                <span style={{ background: "#f3f4f6", color: "#6b7280" }}>Standard Dine-in</span>
              )}
            </div>
          </div>

          {(food.mapsUrl || (food.latitude && food.longitude)) && (
            <div style={{ marginTop: "20px" }}>
              <a
                href={
                  food.mapsUrl ||
                  `https://maps.google.com/?q=${food.latitude},${food.longitude}`
                }
                target="_blank"
                rel="noreferrer"
                className="food-map-button"
              >
                Open Google Maps →
              </a>
            </div>
          )}
        </div>
      </div>

      {/* LIGHTBOX */}
      {selectedImageIndex !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setSelectedImageIndex(null)}
        >
          <div
            style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImageIndex(null)}
              style={{
                position: "absolute",
                top: "-40px",
                right: 0,
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "32px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
            <img
              src={galleryImages[selectedImageIndex]}
              alt="Enlarged gallery view"
              style={{ maxWidth: "100%", maxHeight: "85vh", borderRadius: "8px", display: "block" }}
            />
            <div style={{ textAlign: "center", color: "#ccc", fontSize: "12px", marginTop: "8px" }}>
              {selectedImageIndex + 1} of {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodSpotView;
