import React from "react";

const FoodHighlights = ({ food }) => {
  const highlights = [
    food.cuisine && {
      icon: "restaurant_menu",
      title: "Cuisine",
      value: food.cuisine,
    },
    food.foodType && {
      icon: "lunch_dining",
      title: "Food Type",
      value: food.foodType,
    },
    food.priceRange && {
      icon: "payments",
      title: "Price Range",
      value: food.priceRange,
    },
    food.openingHours && {
      icon: "schedule",
      title: "Opening Hours",
      value: food.openingHours,
    },
    food.bestFor && {
      icon: "favorite",
      title: "Best For",
      value: food.bestFor,
    },
    food.serviceType && {
      icon: "room_service",
      title: "Service",
      value: food.serviceType,
    },
  ].filter(Boolean);

  if (!highlights.length) {
    return null;
  }

  return (
    <section className="food-section">
      <div className="food-section-heading">
        <div className="food-section-icon">
          <span className="material-symbols-outlined">
            info
          </span>
        </div>

        <div>
          <h2>
            Food Spot Information
          </h2>

          <p>
            Everything you need to know
          </p>
        </div>
      </div>

      <div className="food-info-grid">
        {highlights.map((item, index) => (
          <div
            className="food-info-card"
            key={`${item.title}-${index}`}
          >
            <div className="food-info-icon">
              <span className="material-symbols-outlined">
                {item.icon}
              </span>
            </div>

            <div>
              <span>
                {item.title}
              </span>

              <strong>
                {item.value}
              </strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FoodHighlights;
