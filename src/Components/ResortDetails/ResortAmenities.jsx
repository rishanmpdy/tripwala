import React from "react";

// Default icon mapping for string-based amenity arrays
const AMENITY_ICON_MAP = {
  pool: "pool",
  swimming: "pool",
  wifi: "wifi",
  internet: "wifi",
  parking: "local_parking",
  breakfast: "bakery_dining",
  restaurant: "restaurant",
  food: "restaurant",
  dining: "restaurant",
  ac: "ac_unit",
  "air conditioning": "ac_unit",
  spa: "spa",
  massage: "spa",
  gym: "fitness_center",
  fitness: "fitness_center",
  balcony: "balcony",
  mountain: "landscape",
  view: "landscape",
  lake: "water",
  river: "water",
  campfire: "local_fire_department",
  bonfire: "local_fire_department",
  tv: "tv",
  bar: "local_bar",
  service: "room_service",
  play: "toys",
  kids: "toys",
  pet: "pets",
  garden: "yard"
};

const getAmenityIcon = (name = "") => {
  const lower = name.toLowerCase();
  for (const [key, icon] of Object.entries(AMENITY_ICON_MAP)) {
    if (lower.includes(key)) return icon;
  }
  return "check_circle";
};

const ResortAmenities = ({
  amenities = [],
  resortName = "Resort"
}) => {
  // Normalize amenities whether it is categorized or a flat array
  const isCategorized =
    Array.isArray(amenities) &&
    amenities.length > 0 &&
    typeof amenities[0] === "object" &&
    amenities[0].category;

  return (
    <div className="resort-amenities-card" id="amenities-section">
      <div className="rd-section-header">
        <div className="rd-section-icon-badge">
          <span className="material-symbols-outlined">hotel_class</span>
        </div>
        <div>
          <h2 className="rd-section-title">Amenities & Facilities</h2>
          <p className="rd-section-subtitle">
            Everything provided for a comfortable stay at {resortName}
          </p>
        </div>
      </div>

      <div className="amenities-categories">
        {isCategorized ? (
          amenities.map((cat, idx) => (
            <div key={idx} className="amenity-category-block">
              <h3 className="amenity-category-title">{cat.category}</h3>
              <div className="amenities-grid">
                {cat.items.map((item, iIdx) => (
                  <div key={iIdx} className="amenity-pill">
                    <span className="material-symbols-outlined">
                      {item.icon || getAmenityIcon(item.name)}
                    </span>
                    <span className="amenity-name">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="amenities-grid">
            {Array.isArray(amenities) &&
              amenities.map((item, idx) => {
                const name = typeof item === "string" ? item : item.name || "Amenity";
                const icon = typeof item === "object" && item.icon ? item.icon : getAmenityIcon(name);

                return (
                  <div key={idx} className="amenity-pill">
                    <span className="material-symbols-outlined">{icon}</span>
                    <span className="amenity-name">{name}</span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResortAmenities;
