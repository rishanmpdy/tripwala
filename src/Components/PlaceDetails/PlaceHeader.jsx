import React from "react";

const PlaceHeader = ({ place }) => {
  return (
    <section className="place-header">
      <div className="place-header-main">
        {place.category && (
          <span className="place-category">
            {place.category}
          </span>
        )}

        <h1>{place.name}</h1>

        <div className="place-location-line">
          <span className="material-symbols-outlined">
            location_on
          </span>
          <span>{place.location}</span>
        </div>
      </div>

      <div className="place-header-meta">
        {place.rating && (
          <div className="place-rating">
            <span className="material-symbols-outlined">
              star
            </span>
            <strong>{place.rating}</strong>
            {place.reviews && <span>({place.reviews} reviews)</span>}
          </div>
        )}
      </div>
    </section>
  );
};

export default PlaceHeader;
