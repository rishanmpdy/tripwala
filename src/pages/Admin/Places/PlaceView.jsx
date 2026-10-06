import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { placeStore } from "../../../data/stores";
import "./PlaceView.css";

const PlaceView = () => {
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const place = placeStore.get().find(
    (item) => String(item.id) === String(id)
  );

  if (!place) {
    return (
      <div className="place-not-found">
        <h2>Place not found</h2>
        <p>The place you are looking for does not exist or has been removed.</p>
        <Link to="/admin/places" className="place-back-btn">
          Back to Places
        </Link>
      </div>
    );
  }

  const galleryImages = (
    Array.isArray(place.images) && place.images.length
      ? place.images
      : Array.isArray(place.gallery) && place.gallery.length
      ? place.gallery
      : place.image
      ? [place.image]
      : []
  ).map((img) => (typeof img === "object" && img !== null ? img.url : img)).filter(Boolean);

  const coverImage = place.image || galleryImages[0] || "";

  return (
    <div className="place-view-page">
      {/* HEADER */}
      <div className="place-view-header">
        <div>
          <Link to="/admin/places" className="place-back-link">
            ← Places
          </Link>
          <h1>{place.name}</h1>
          <p>{place.location || place.address || "Tourist Destination"}</p>
        </div>

        <div className="place-view-header-actions">
          <Link to={`/admin/places/${place.id}/edit`} className="place-edit-button">
            Edit Place
          </Link>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="place-view-card">
        <div className="place-view-media-col">
          <div className="place-view-cover">
            {coverImage ? (
              <img src={coverImage} alt={place.name} />
            ) : (
              <div className="place-no-img">No Image Available</div>
            )}
            {place.status && (
              <span className={`place-status-pill ${place.status === "Active" ? "active" : "inactive"}`}>
                <span />
                {place.status}
              </span>
            )}
          </div>

          {galleryImages.length > 1 && (
            <div className="place-view-gallery-strip">
              <h4>Gallery ({galleryImages.length} photos)</h4>
              <div className="place-view-thumbnails">
                {galleryImages.map((img, idx) => (
                  <button
                    key={`${img}-${idx}`}
                    type="button"
                    className={`thumb-btn ${selectedImageIndex === idx ? "active" : ""}`}
                    onClick={() => setSelectedImageIndex(idx)}
                    title={`View photo ${idx + 1}`}
                  >
                    <img src={img} alt={`${place.name} ${idx + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="place-view-content">
          <div className="place-view-top-meta">
            <span className="place-cat-badge">{place.category || place.type || "Attraction"}</span>
            {place.difficulty && (
              <span className="place-diff-badge">Difficulty: {place.difficulty}</span>
            )}
            {place.featured && <span className="place-featured-badge">★ Featured</span>}
            {place.showOnHomepage && <span className="place-home-badge">Home Highlight</span>}
          </div>

          <h2>{place.name}</h2>

          {place.overview && (
            <div className="place-view-overview">
              <strong>Overview</strong>
              <p>{place.overview}</p>
            </div>
          )}

          <div className="place-view-description">
            <strong>Description</strong>
            <p>{place.description || "No detailed description provided."}</p>
          </div>

          <div className="place-view-specs-grid">
            <div>
              <small>Location</small>
              <strong>{place.location || "—"}</strong>
            </div>

            <div>
              <small>District / State</small>
              <strong>{place.district || "Wayanad"}{place.state ? `, ${place.state}` : ""}</strong>
            </div>

            <div>
              <small>Best Time to Visit</small>
              <strong>{place.bestTime || "Throughout the year"}</strong>
            </div>

            <div>
              <small>Entry Fee</small>
              <strong>{place.entryFee || "Free Entry"}</strong>
            </div>

            <div>
              <small>Visiting Hours</small>
              <strong>{place.openingTime || "Open Daily"}</strong>
            </div>

            <div>
              <small>Visit Duration</small>
              <strong>{place.duration || "1–2 Hours"}</strong>
            </div>

            <div>
              <small>Walking from Parking</small>
              <strong>{place.walkingDistance || "—"}</strong>
            </div>

            <div>
              <small>Nearby Food Spot</small>
              <strong>{place.foodSpotDistance || "—"}</strong>
            </div>

            <div>
              <small>Rating & Reviews</small>
              <strong className="place-view-rating">
                ★ {place.rating || "4.8"} <span className="reviews-cnt">({place.reviews || 0} reviews)</span>
              </strong>
            </div>

            <div>
              <small>Coordinates</small>
              <strong>
                {place.latitude && place.longitude ? `${place.latitude}, ${place.longitude}` : "—"}
              </strong>
            </div>
          </div>

          {(place.mapsUrl || place.mapUrl || (place.latitude && place.longitude)) && (
            <div className="place-view-map-action">
              <a
                href={
                  place.mapsUrl ||
                  place.mapUrl ||
                  `https://maps.google.com/?q=${place.latitude},${place.longitude}`
                }
                target="_blank"
                rel="noreferrer"
                className="place-map-button"
              >
                Open in Google Maps ↗
              </a>
            </div>
          )}
        </div>
      </div>

      {/* FULLSCREEN IMAGE MODAL */}
      {selectedImageIndex !== null && (
        <div className="place-lightbox" onClick={() => setSelectedImageIndex(null)}>
          <div className="place-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="place-lightbox-close"
              onClick={() => setSelectedImageIndex(null)}
            >
              ×
            </button>
            <img src={galleryImages[selectedImageIndex]} alt="Enlarged view" />
            <div className="place-lightbox-footer">
              <span>{selectedImageIndex + 1} of {galleryImages.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceView;
