import React from "react";

const PlaceHighlights = ({ place }) => {
  const highlights = [
    place.bestTime && {
      icon: "calendar_month",
      title: "Best Time",
      value: place.bestTime,
    },
    place.entryFee && {
      icon: "payments",
      title: "Entry Fee",
      value: place.entryFee,
    },
    place.openingTime && {
      icon: "schedule",
      title: "Opening Hours",
      value: place.openingTime,
    },
    place.duration && {
      icon: "timer",
      title: "Recommended Time",
      value: place.duration,
    },
    place.type && {
      icon: "landscape",
      title: "Type",
      value: place.type,
    },
    place.difficulty && {
      icon: "hiking",
      title: "Difficulty",
      value: place.difficulty,
    },
  ].filter(Boolean);

  if (!highlights.length) {
    return null;
  }

  return (
    <section className="place-section">
      <div className="place-section-heading">
        <div className="place-section-icon">
          <span className="material-symbols-outlined">
            stars
          </span>
        </div>
        <div>
          <h2>Place Information</h2>
          <p>Useful information before your visit</p>
        </div>
      </div>

      <div className="place-info-grid">
        {highlights.map((item, index) => (
          <div
            className="place-info-card"
            key={`${item.title}-${index}`}
          >
            <div className="place-info-icon">
              <span className="material-symbols-outlined">
                {item.icon}
              </span>
            </div>
            <div>
              <span>{item.title}</span>
              <strong>{item.value}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlaceHighlights;
