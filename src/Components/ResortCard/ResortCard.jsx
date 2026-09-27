import { Link } from "react-router-dom";
import fallbackListingImage from "../../assets/images/place-1.jpg";

import "./ResortCard.css";

const ResortCard = ({
  resort,
  size = "standard",
}) => {
  return (
    <article
      className={`resort-card resort-card-${size}`}
    >

      {/* =========================
          IMAGE
      ========================= */}

      <Link
        to={`/resort/${resort.id}`}
        className="resort-image-link"
      >

        <div className="resort-image-wrapper">

          <img
            src={resort.image}
            alt={resort.name}
            className="rc-image-frame"
            loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackListingImage; }}
          />

          <div className="resort-image-overlay">
            {resort.badge && (
              <span className={`resort-badge badge-${resort.badge.toLowerCase().replace(/\s+/g, '-')}`}>
                {resort.badge}
              </span>
            )}

            <div className="resort-stats">
              <span className="resort-stat">
                <span className="material-symbols-outlined heart-icon" style={{ fontVariationSettings: "'FILL' 1", fontSize: "14px", color: "#ff4d4d" }}>favorite</span>
                {resort.likes}
              </span>
              <span className="resort-stat">
                <span className="material-symbols-outlined comment-icon" style={{ fontVariationSettings: "'FILL' 1", fontSize: "14px", color: "#fff" }}>chat_bubble</span>
                {resort.comments}
              </span>
            </div>
          </div>
        </div>

      </Link>


      {/* =========================
          CONTENT
      ========================= */}

      <div className="resort-content">
        <div className="resort-text">
          <h3 className="resort-name">
            {resort.name}
          </h3>
          <p className="resort-description">
            {resort.description}
          </p>
          <p className="resort-location" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: "12px" }}>location_on</span>
            {resort.location}
          </p>
        </div>

        <Link
          to={`/resort/${resort.id}`}
          className="resort-details-button"
        >
          Details
        </Link>

      </div>

    </article>
  );
};

export default ResortCard;
