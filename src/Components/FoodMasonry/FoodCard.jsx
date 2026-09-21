import { useRef } from "react";
import { Link } from "react-router-dom";

import "./FoodMasonry.css";

const FoodCard = ({ food }) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = 0;

    videoRef.current
      .play()
      .catch(() => {});
  };

  const handleMouseLeave = () => {
    if (!videoRef.current) return;

    videoRef.current.pause();

    videoRef.current.currentTime = 0;
  };

  return (
    <article className="food-card">

      <Link
        to={`/food/${food.id}`}
        className="food-card-link"
      >

        <div
          className="food-media"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >

          {/* IMAGE */}

          {food.type === "image" && (
            <img
              src={food.media}
              alt={food.title}
              className="food-image"
              loading="lazy"
            />
          )}


          {/* VIDEO */}

          {food.type === "video" && (
            <video
              ref={videoRef}
              className="food-video"
              src={food.media}
              poster={food.poster}
              muted
              loop
              playsInline
              preload="metadata"
            />
          )}


          {/* Gradient */}

          <div className="food-gradient" />


          {/* Video indicator */}

          {food.type === "video" && (
            <div className="video-indicator">
              ▶
            </div>
          )}


          {/* Category */}

          <span className="food-category">
            {food.category}
          </span>


          {/* Information */}

          <div className="food-overlay-info">

            <div className="food-title">
              {food.title}
            </div>

            <div className="food-location">
              {food.location}
            </div>

          </div>


          {/* Stats */}

          <div className="food-stats">

            <span>
              <span className="food-heart">♥</span>
              {food.likes}
            </span>

            <span>
              <span className="food-comment-icon">
                ◯
              </span>
              {food.comments}
            </span>

          </div>

        </div>

      </Link>

    </article>
  );
};

export default FoodCard;