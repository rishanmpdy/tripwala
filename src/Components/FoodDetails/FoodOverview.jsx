import React from "react";

const FoodOverview = ({ food }) => {
  return (
    <section className="food-section">
      <div className="food-section-heading">
        <div className="food-section-icon">
          <span className="material-symbols-outlined">
            restaurant
          </span>
        </div>

        <div>
          <h2>
            About this food spot
          </h2>

          <p>
            Discover the taste and experience
          </p>
        </div>
      </div>

      <p className="food-description">
        {food.description ||
          food.overview ||
          "Discover delicious local food and a memorable dining experience at this food spot."}
      </p>
    </section>
  );
};

export default FoodOverview;
