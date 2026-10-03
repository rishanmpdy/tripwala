import React from "react";

const PlaceOverview = ({ place }) => {
  return (
    <section className="place-section">
      <div className="place-section-heading">
        <div className="place-section-icon">
          <span className="material-symbols-outlined">
            info
          </span>
        </div>
        <div>
          <h2>About this place</h2>
          <p>Discover what makes this place special</p>
        </div>
      </div>

      <p className="place-description">
        {place.description ||
          place.overview ||
          "Explore this beautiful destination and discover its unique attractions, scenery and experiences."}
      </p>
    </section>
  );
};

export default PlaceOverview;
