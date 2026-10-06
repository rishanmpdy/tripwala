import React, { useMemo, useState } from "react";
import fallbackFood from "../../assets/images/foodSpot/food1.jpg";

const FoodMenu = ({ food }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const menuItems = useMemo(() => {
    return food.menu || [];
  }, [food.menu]);

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return menuItems;
    if (activeFilter === "veg") return menuItems.filter((i) => i.type?.toLowerCase() === "veg");
    if (activeFilter === "non-veg") return menuItems.filter((i) => i.type?.toLowerCase() === "non-veg");
    if (activeFilter === "special") return menuItems.filter((i) => i.isSpecial);
    return menuItems;
  }, [menuItems, activeFilter]);

  if (!menuItems.length) {
    return null;
  }

  const vegCount = menuItems.filter((i) => i.type?.toLowerCase() === "veg").length;
  const nonVegCount = menuItems.filter((i) => i.type?.toLowerCase() === "non-veg").length;
  const specialCount = menuItems.filter((i) => i.isSpecial).length;

  return (
    <section className="food-section food-menu-section" id="food-menu-showcase">
      {/* Section Header */}
      <div className="food-section-heading">
        <div className="food-section-icon menu-icon-wrap">
          <span className="material-symbols-outlined">menu_book</span>
        </div>

        <div>
          <h2>Dishes & Menus Showcase</h2>
          <p>Handpicked specialties and signature flavors at {food.name}</p>
        </div>
      </div>

      {/* Interactive Filter Pills */}
      <div className="food-menu-filters">
        <button
          type="button"
          className={`food-menu-filter-pill ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => setActiveFilter("all")}
        >
          All Dishes ({menuItems.length})
        </button>

        {vegCount > 0 && (
          <button
            type="button"
            className={`food-menu-filter-pill ${activeFilter === "veg" ? "active" : ""}`}
            onClick={() => setActiveFilter("veg")}
          >
            <span className="diet-dot veg-dot" />
            Pure Veg ({vegCount})
          </button>
        )}

        {nonVegCount > 0 && (
          <button
            type="button"
            className={`food-menu-filter-pill ${activeFilter === "non-veg" ? "active" : ""}`}
            onClick={() => setActiveFilter("non-veg")}
          >
            <span className="diet-dot non-veg-dot" />
            Non-Veg ({nonVegCount})
          </button>
        )}

        {specialCount > 0 && (
          <button
            type="button"
            className={`food-menu-filter-pill ${activeFilter === "special" ? "active" : ""}`}
            onClick={() => setActiveFilter("special")}
          >
            ⭐ Chef's Specials ({specialCount})
          </button>
        )}
      </div>

      {/* Dishes Showcase Grid */}
      <div className="food-dishes-grid">
        {filteredItems.map((dish, index) => {
          const isVeg = dish.type?.toLowerCase() === "veg";
          const dishImg = dish.image || fallbackFood;

          return (
            <article className="food-dish-card" key={`${dish.name}-${index}`}>
              <div className="food-dish-media">
                <img
                  src={dishImg}
                  alt={dish.name}
                  className="food-dish-img"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackFood;
                  }}
                />
                {dish.isSpecial && (
                  <span className="food-dish-special-badge">Special</span>
                )}
              </div>

              <div className="food-dish-details">
                <div className="food-dish-header-row">
                  <div className="food-dish-title-group">
                    <span
                      className={`diet-badge-box ${isVeg ? "veg-box" : "non-veg-box"}`}
                      title={isVeg ? "Vegetarian" : "Non-Vegetarian"}
                    >
                      <span className="diet-badge-circle" />
                    </span>
                    <h3 className="food-dish-name">{dish.name}</h3>
                  </div>

                  {dish.price && (
                    <span className="food-dish-price">₹{dish.price}</span>
                  )}
                </div>

                {dish.description && (
                  <p className="food-dish-desc">{dish.description}</p>
                )}

                <div className="food-dish-meta-row">
                  {dish.category && (
                    <span className="food-dish-category-chip">{dish.category}</span>
                  )}
                  {dish.type && (
                    <span className={`food-dish-type-chip ${isVeg ? "veg" : "non-veg"}`}>
                      {dish.type}
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default FoodMenu;
