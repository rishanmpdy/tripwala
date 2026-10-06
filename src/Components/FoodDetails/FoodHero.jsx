import React from "react";
import { Link } from "react-router-dom";

const FoodHero = ({ food }) => {
  const image =
    food.images?.[0] ||
    food.image;

  return (
    <section className="food-hero">
      <div className="food-hero-image">
        <img
          src={image}
          alt={food.name}
        />

        <Link
          to="/listings?category=food-spot"
          className="food-back-button"
          aria-label="Back to food spots"
        >
          ←
        </Link>

        {food.images?.length > 0 && (
          <span className="food-photo-count">
            <span className="material-symbols-outlined">
              photo_library
            </span>
            {food.images.length}
          </span>
        )}
      </div>
    </section>
  );
};

export default FoodHero;
