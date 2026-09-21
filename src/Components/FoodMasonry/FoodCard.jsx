import { Link } from "react-router-dom";

import "./FoodMasonry.css";

const FoodCard = ({ food, size = "standard" }) => {
  return (
    <article className={`food-card food-card-${size}`}>
      <Link to={`/food/${food.id}`} className="food-card-link">
        <div className="food-media">
          <img
            src={food.media}
            alt={food.title}
            className="food-image"
            loading="lazy"
          />
        </div>

        <div className="food-card-content">
          <div className="food-card-header">
            <div className="food-card-texts">
              <span className="food-shop-name">{food.shopName || "Food Spot"}</span>
              <span className="food-dish-name">{food.title}</span>
            </div>

            <span className="food-rating">★ {food.rating || "4.8"}</span>
          </div>

          <div className="food-meta-row">
            <span>♥ {food.likes}</span>
            <span>💬 {food.comments}</span>
          </div>

          <div className="food-card-footer">
            <div className="food-card-location">{food.location}</div>

            <Link to={`/food/${food.id}`} className="food-view-btn">
              View
            </Link>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default FoodCard;