import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { resortStore } from "../../../data/stores";
import "./Resorts.css";

const ResortView = () => {
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const resort = resortStore.get().find(
    (item) => String(item.id) === String(id)
  );

  if (!resort) {
    return (
      <div className="resort-not-found">
        <h2>Resort not found</h2>
        <p>The resort you are looking for does not exist or has been removed.</p>
        <Link to="/admin/resorts">Back to Resorts</Link>
      </div>
    );
  }

  const galleryImages = (
    Array.isArray(resort.gallery) && resort.gallery.length
      ? resort.gallery
      : Array.isArray(resort.images) && resort.images.length
      ? resort.images
      : resort.image
      ? [resort.image]
      : []
  )
    .map((img) => (typeof img === "object" && img !== null ? img.url : img))
    .filter(Boolean);

  const coverImage = resort.image || galleryImages[0] || "";
  const facilities = Array.isArray(resort.facilities) ? resort.facilities : [];

  return (
    <div className="resort-form-page">
      <div className="resort-form-header">
        <div>
          <Link to="/admin/resorts" className="resort-back-link">
            ← Resorts
          </Link>
          <h1>{resort.name}</h1>
          <p>{resort.address || resort.location || "Resort & Stay"}</p>
        </div>

        <Link
          to={`/admin/resorts/${resort.id}/edit`}
          className="resort-primary-button"
        >
          Edit Resort
        </Link>
      </div>

      <div className="resort-view-card">
        <div className="resort-view-media-col" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="resort-view-image">
            {coverImage ? (
              <img src={coverImage} alt={resort.name} />
            ) : (
              <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0", color: "#888" }}>
                No Image Available
              </div>
            )}
          </div>

          {galleryImages.length > 1 && (
            <div className="resort-gallery-preview" style={{ padding: "0 4px" }}>
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
                      alt={`${resort.name} ${idx + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="resort-view-content">
          <div className="resort-view-top">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
              <span className="resort-type">{resort.type || "Resort"}</span>
              {resort.badge && (
                <span style={{ padding: "3px 8px", background: "#fef3c7", color: "#92400e", borderRadius: "4px", fontSize: "11px", fontWeight: "600" }}>
                  {resort.badge}
                </span>
              )}
              {resort.featured && (
                <span style={{ padding: "3px 8px", background: "#e0f2fe", color: "#0369a1", borderRadius: "4px", fontSize: "11px", fontWeight: "600" }}>
                  ★ Featured
                </span>
              )}
              {resort.showOnHomepage && (
                <span style={{ padding: "3px 8px", background: "#f3e8ff", color: "#7e22ce", borderRadius: "4px", fontSize: "11px", fontWeight: "600" }}>
                  Home Showcase
                </span>
              )}
            </div>

            <span
              className={`resort-status ${
                resort.status === "Active" ? "active" : "inactive"
              }`}
            >
              <span />
              {resort.status}
            </span>
          </div>

          <h2>{resort.name}</h2>

          {resort.shortDescription && (
            <p style={{ fontStyle: "italic", color: "#555", margin: "4px 0 12px", fontSize: "13px" }}>
              &quot;{resort.shortDescription}&quot;
            </p>
          )}

          <p className="resort-view-description">
            {resort.description || "No description provided."}
          </p>

          <div className="resort-view-details">
            <div>
              <small>Rooms</small>
              <strong>{resort.rooms || "—"}</strong>
            </div>

            <div>
              <small>Room Types</small>
              <strong>{resort.roomTypes || "Standard / Deluxe"}</strong>
            </div>

            <div>
              <small>Guests Capacity</small>
              <strong>{resort.guests || "—"}</strong>
            </div>

            <div>
              <small>Price Range</small>
              <strong>{resort.priceRange || "—"}</strong>
            </div>

            <div>
              <small>Check-In / Out</small>
              <strong>{resort.checkIn || "02:00 PM"} – {resort.checkOut || "11:00 AM"}</strong>
            </div>

            <div>
              <small>Minimum Stay</small>
              <strong>{resort.minimumStay ? `${resort.minimumStay} Night(s)` : "1 Night"}</strong>
            </div>

            <div>
              <small>Location</small>
              <strong>
                {resort.area || resort.district
                  ? `${resort.area || ""}${resort.area && resort.district ? ", " : ""}${resort.district || ""}`
                  : resort.location || "—"}
              </strong>
            </div>

            <div>
              <small>Resort Direct Phone</small>
              <strong>{resort.resortPhone || resort.phone || resort.contact?.phone || "—"}</strong>
            </div>

            <div>
              <small>Enquiry Routing Channel</small>
              <strong style={{ color: "#0284c7" }}>
                {resort.enquiryContactName ||
                  (resort.enquiryTargetType === "resort"
                    ? "Direct Resort"
                    : resort.enquiryTargetType === "custom"
                    ? "Custom Number"
                    : "Agent Number")}
              </strong>
            </div>

            <div>
              <small>Enquiry WhatsApp Recipient</small>
              <strong style={{ color: "#16a34a" }}>
                {resort.whatsapp ? (
                  <a
                    href={`https://wa.me/${resort.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#16a34a", textDecoration: "none" }}
                  >
                    💬 {resort.whatsapp} ↗
                  </a>
                ) : (
                  "—"
                )}
              </strong>
            </div>

            <div>
              <small>Email</small>
              <strong>{resort.email || resort.contact?.email || "—"}</strong>
            </div>

            <div>
              <small>Website</small>
              <strong>
                {resort.website ? (
                  <a href={resort.website} target="_blank" rel="noreferrer" style={{ color: "#0284c7" }}>
                    Visit Website ↗
                  </a>
                ) : (
                  "—"
                )}
              </strong>
            </div>
          </div>

          {facilities.length > 0 && (
            <div style={{ marginTop: "18px" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: "#666", marginBottom: "8px" }}>
                Facilities & Amenities
              </div>
              <div className="resort-view-facilities">
                {facilities.map((facility) => (
                  <span key={facility}>{facility}</span>
                ))}
              </div>
            </div>
          )}

          {(resort.mapsUrl || (resort.latitude && resort.longitude)) && (
            <div style={{ marginTop: "20px" }}>
              <a
                href={
                  resort.mapsUrl ||
                  `https://maps.google.com/?q=${resort.latitude},${resort.longitude}`
                }
                target="_blank"
                rel="noreferrer"
                className="resort-map-button"
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

export default ResortView;
