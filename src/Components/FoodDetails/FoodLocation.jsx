import React from "react";

const FoodLocation = ({ food }) => {
  return (
    <div className="food-sidebar-card">
      <div className="food-sidebar-heading">
        <span className="material-symbols-outlined">
          location_on
        </span>
        <h3>
          Location
        </h3>
      </div>

      <p className="food-sidebar-location">
        {food.location}
      </p>

      {food.address && (
        <p className="food-address">
          {food.address}
        </p>
      )}

      {food.openingHours && (
        <div className="food-sidebar-hours">
          <span>
            Opening Hours
          </span>
          <strong>
            {food.openingHours}
          </strong>
        </div>
      )}

      {food.phone && (
        <a
          href={`tel:${food.phone}`}
          className="food-call-button"
        >
          <span className="material-symbols-outlined">
            call
          </span>
          Call Food Spot
        </a>
      )}

      {food.mapUrl && (
        <a
          href={food.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="food-direction-button"
        >
          <span className="material-symbols-outlined">
            directions
          </span>
          Get Directions
        </a>
      )}
    </div>
  );
};

export default FoodLocation;
