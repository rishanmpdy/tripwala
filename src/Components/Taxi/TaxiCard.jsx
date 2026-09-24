import { Link } from "react-router-dom";
import fallbackTaxiImage from "../../assets/images/place-1.jpg";
import "./TaxiCard.css";

const TaxiCard = ({ taxi }) => {
  return (
    <article className="taxi-card">

      {/* IMAGE */}
      <Link to={`/taxi/${taxi.id}`} className="taxi-image-link">
        <div className="taxi-image-wrapper">
          <img
            src={taxi.image}
            alt={taxi.name}
            className="taxi-image"
            loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackTaxiImage; }}
          />
          {/* Price badge on image */}
          <div className="taxi-price-badge">{taxi.price}</div>
        </div>
      </Link>

      {/* INFO */}
      <div className="taxi-info">

        {/* Name + vehicle type */}
        <div>
          <h3 className="taxi-name">{taxi.name}</h3>
          <p className="taxi-vehicle-type">
            <span className="material-symbols-outlined" style={{ fontSize: "12px", verticalAlign: "middle" }}>directions_car</span>
            {" "}{taxi.vehicleType}
          </p>
        </div>

        {/* Features */}
        {taxi.features?.length > 0 && (
          <div className="taxi-features">
            {taxi.features.map((f) => (
              <span key={f} className="taxi-feature-tag">{f}</span>
            ))}
          </div>
        )}

        {/* Location */}
        <p className="taxi-location">
          <span className="material-symbols-outlined" style={{ fontSize: "12px", verticalAlign: "middle" }}>location_on</span>
          {" "}{taxi.location}
        </p>

        {/* Bottom: Rating + Call */}
        <div className="taxi-bottom">
          <div className="taxi-rating">
            <span className="material-symbols-outlined rating-star" style={{ fontVariationSettings: "'FILL' 1", fontSize: "14px" }}>star</span>
            <strong>{taxi.rating}</strong>
            <span className="rating-reviews">({taxi.reviews} reviews)</span>
          </div>

          <a
            href={`tel:${taxi.phone}`}
            className="taxi-call-button"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>call</span>
            {taxi.service}
          </a>
        </div>

      </div>

    </article>
  );
};

export default TaxiCard;
