import "./DestinationCard.css";

const DestinationCard = ({
  image,
  location,
  likes = "1.2k",
  comments = "325",
}) => {
  return (
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

          <span className="like">
            ❤️ {likes}
          </span>

          <span className="comments">
            ◯ {comments}
          </span>

        </div>

      </div>

    </div>
  );
};

export default DestinationCard;