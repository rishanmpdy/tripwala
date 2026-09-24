import { Link } from "react-router-dom";
import fallbackListingImage from "../../assets/images/place-1.jpg";
import "./DestinationCard.css";

const DestinationCard = ({
  id,
  image,
  location,
  spotName,
  likes = "1.2k",
  comments = "325",
  destination,
  size = "standard",
}) => {
  const dest = destination || { id, image, location, spotName, likes, comments };
  const cardId = dest.id;
  const cardImage = dest.image;
  const cardLocation = dest.location;
  const cardSpotName = dest.spotName || dest.name || location;
  const cardDescription = dest.description || "Explore this beautiful place";
  const cardRating = dest.rating || "4.8";
  const cardLikes = dest.likes || likes;
  const cardComments = dest.comments || comments;

  return (
    <article className={`destination-card destination-card-${size}`}>
      <Link to={`/place/${cardId}`} className="destination-card-link">
        <div className="destination-media">
          <img
            src={cardImage}
            alt={cardSpotName}
            className="destination-image"
            loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackListingImage; }}
          />
        </div>

        <div className="destination-card-content">
          <div className="destination-card-header">
            <div className="destination-card-texts">
              <span className="destination-spot-name">{cardSpotName}</span>
              <span className="destination-description">{cardDescription}</span>
            </div>
            <span className="destination-rating" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: "12px" }}>star</span>
              {cardRating}
            </span>
          </div>

          <div className="destination-meta-row">
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: "14px", color: "#ff4d4d" }}>favorite</span>
              {cardLikes}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: "14px", color: "#888" }}>chat_bubble</span>
              {cardComments}
            </span>
          </div>

          <div className="destination-footer">
            <div className="destination-location" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: "12px" }}>location_on</span>
              {cardLocation}
            </div>
            <Link to={`/place/${cardId}`} className="destination-view-btn">
              View
            </Link>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default DestinationCard;
