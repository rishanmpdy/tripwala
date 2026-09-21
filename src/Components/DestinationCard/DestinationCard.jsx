import { useNavigate } from "react-router-dom";
import "./DestinationCard.css";

const DestinationCard = ({
  id,
  image,
  location,
  likes = "1.2k",
  comments = "325",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/place/${id}`);
  };

  return (
    <div
      onClick={handleClick}
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
    </div>
  );
};

export default DestinationCard;