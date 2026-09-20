import { Link } from "react-router-dom";
import "./DestinationCard.css";

const DestinationCard = ({
  id,
  image,
  location,
  likes = "1.2k",
  comments = "325",
}) => {
  return (
    <Link
      to={`/place/${id}`}
      className="destination-card-link"
    >
      <div className="destination-card">

        <img
          src={image}
          alt={location}
          className="destination-image"
        />

        <div className="card-gradient"></div>

        <div className="card-info">

          <span className="location">
            {location}
          </span>

          <div className="card-stats">

            <span>
              ❤️ {likes}
            </span>

            <span>
              ◯ {comments}
            </span>

          </div>

        </div>

      </div>
    </Link>
  );
};

export default DestinationCard;