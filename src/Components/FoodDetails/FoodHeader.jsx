import React from "react";

const FoodHeader = ({ food }) => {
  return (
    <section className="food-header">
      <div className="food-header-main">
        {food.category && (
          <span className="food-category">
            {food.category}
          </span>
        )}

        <h1>
          {food.name}
        </h1>

        <div className="food-location-line">
          <span className="material-symbols-outlined">
            location_on
          </span>
          <span>
            {food.location}
          </span>
        </div>
      </div>

      <div className="food-header-meta">
        {food.rating && (
          <div className="food-rating">
            <span className="material-symbols-outlined">
              star
            </span>
            <strong>
              {food.rating}
            </strong>
            {food.reviews && (
              <span>
                ({food.reviews})
              </span>
            )}
          </div>
        )}

        {food.priceRange && (
          <span className="food-price-range">
            {food.priceRange}
          </span>
        )}
      </div>
    </section>
  );
};

export default FoodHeader;
