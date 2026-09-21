import { Link } from "react-router-dom";

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
            className="resort-image"
            loading="lazy"
          />

        </div>

      </Link>


      {/* =========================
          META
      ========================= */}

      <div className="resort-meta">

        <span className="resort-badge">
          {resort.badge}
        </span>


        <div className="resort-stats">

          <span className="resort-stat">
            <span className="heart-icon">
              ♥
            </span>

            {resort.likes}
          </span>


          <span className="resort-stat">

            <span className="comment-icon" />

            {resort.comments}

          </span>

        </div>

      </div>


      {/* =========================
          CONTENT
      ========================= */}

      <div className="resort-content">

        <div className="resort-text">

          <p className="resort-description">
            {resort.description}
          </p>

          <p className="resort-location">
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