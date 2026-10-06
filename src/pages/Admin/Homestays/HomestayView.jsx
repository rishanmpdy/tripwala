import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { homestayStore } from "../../../data/stores";
import "./Homestays.css";

const HomestayView = () => {
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const home = homestayStore.get().find(
    (item) => String(item.id) === String(id)
  );

  if (!home) {
    return (
      <div className="homestay-not-found">
        <h2>Homestay not found</h2>
        <p>The homestay you are looking for does not exist or has been removed.</p>
        <Link to="/admin/homestays">Back to Homestays</Link>
      </div>
    );
  }

  const galleryImages = (
    Array.isArray(home.gallery) && home.gallery.length
      ? home.gallery
      : Array.isArray(home.images) && home.images.length
      ? home.images
      : home.image
      ? [home.image]
      : []
  )
    .map((img) => (typeof img === "object" && img !== null ? img.url : img))
    .filter(Boolean);

  const coverImage = home.image || galleryImages[0] || "";
  const facilities = Array.isArray(home.facilities) ? home.facilities : [];

  return (
    <div className="homestay-form-page">
      {/* HEADER */}
      <div className="homestay-form-header">
        <div>
          <Link to="/admin/homestays" className="homestay-back-link">
            ← Homestays
          </Link>
          <h1>{home.name}</h1>
          <p>{home.address || home.area || "Homestay & Vacation Rental"}</p>
        </div>

        <Link
          to={`/admin/homestays/${home.id}/edit`}
          className="homestay-primary-button"
        >
          Edit Homestay
        </Link>
      </div>

      {/* VIEW CARD */}
      <div className="homestay-view-card">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="homestay-view-image">
            {coverImage ? (
              <img src={coverImage} alt={home.name} />
            ) : (
              <div style={{ height: "280px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5", color: "#888" }}>
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
                      alt={`${home.name} ${idx + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="homestay-view-content">
          <div className="homestay-view-top">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
              <span className="homestay-type">{home.type || "Homestay"}</span>
              {home.featured && (
                <span style={{ padding: "3px 8px", background: "#e0f2fe", color: "#0369a1", borderRadius: "4px", fontSize: "11px", fontWeight: "600" }}>
                  ★ Featured
                </span>
              )}
              {home.showOnHomepage && (
                <span style={{ padding: "3px 8px", background: "#f3e8ff", color: "#7e22ce", borderRadius: "4px", fontSize: "11px", fontWeight: "600" }}>
                  Home Highlight
                </span>
              )}
            </div>

            <span
              className={`homestay-status ${
                home.status === "Active" ? "active" : "inactive"
              }`}
            >
              <span />
              {home.status}
            </span>
          </div>

          <h2>{home.name}</h2>

          {home.shortDescription && (
            <p style={{ fontStyle: "italic", color: "#555", margin: "4px 0 12px", fontSize: "13px" }}>
              &quot;{home.shortDescription}&quot;
            </p>
          )}

          <p className="homestay-view-description">
            {home.description || "No description provided."}
          </p>

          <div className="homestay-view-details">
            <div>
              <small>Bedrooms</small>
              <strong>{home.bedrooms || "—"}</strong>
            </div>

            <div>
              <small>Beds</small>
              <strong>{home.beds || "—"}</strong>
            </div>

            <div>
              <small>Max Guests</small>
              <strong>{home.guests || "—"}</strong>
            </div>

            <div>
              <small>Price Range</small>
              <strong>{home.priceRange || "—"}</strong>
            </div>

            <div>
              <small>Check-In / Out</small>
              <strong>{home.checkIn || "02:00 PM"} – {home.checkOut || "11:00 AM"}</strong>
            </div>

            <div>
              <small>Minimum Stay</small>
              <strong>{home.minimumStay ? `${home.minimumStay} Night(s)` : "1 Night"}</strong>
            </div>

            <div>
              <small>Location</small>
              <strong>
                {home.area || home.district
                  ? `${home.area || ""}${home.area && home.district ? ", " : ""}${home.district || ""}`
                  : home.address || "—"}
              </strong>
            </div>

            <div>
              <small>Host Direct Phone (Private Admin)</small>
              <strong>{home.hostPhone || home.phone || "—"}</strong>
            </div>

            <div>
              <small>Enquiry Routing Channel</small>
              <strong style={{ color: "#7c3aed" }}>
                {home.enquiryContactName || (home.enquiryTargetType === "host" ? "Direct Host Number" : "Assigned Redirect Desk")}
              </strong>
            </div>

            <div>
              <small>Enquiry WhatsApp Recipient</small>
              <strong style={{ color: "#16a34a" }}>
                {home.whatsapp ? (
                  <a
                    href={`https://wa.me/${home.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#16a34a", textDecoration: "none" }}
                  >
                    💬 {home.whatsapp} ↗
                  </a>
                ) : (
                  "—"
                )}
              </strong>
            </div>

            <div>
              <small>Website</small>
              <strong>
                {home.website ? (
                  <a href={home.website} target="_blank" rel="noreferrer" style={{ color: "#0284c7" }}>
                    Visit Website ↗
                  </a>
                ) : (
                  "—"
                )}
              </strong>
            </div>

            <div>
              <small>Instagram</small>
              <strong>{home.instagram || "—"}</strong>
            </div>

            <div>
              <small>Coordinates</small>
              <strong>
                {home.latitude && home.longitude ? `${home.latitude}, ${home.longitude}` : "—"}
              </strong>
            </div>
          </div>

          {facilities.length > 0 && (
            <div style={{ marginTop: "16px" }}>
              <div style={{ fontSize: "11px", fontWeight: "600", textTransform: "uppercase", color: "#777", marginBottom: "8px" }}>
                Facilities & Amenities
              </div>
              <div className="homestay-view-facilities">
                {facilities.map((facility) => (
                  <span key={facility}>{facility}</span>
                ))}
              </div>
            </div>
          )}

          {(home.mapsUrl || (home.latitude && home.longitude)) && (
            <div style={{ marginTop: "20px" }}>
              <a
                href={
                  home.mapsUrl ||
                  `https://maps.google.com/?q=${home.latitude},${home.longitude}`
                }
                target="_blank"
                rel="noreferrer"
                className="homestay-map-button"
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

export default HomestayView;
