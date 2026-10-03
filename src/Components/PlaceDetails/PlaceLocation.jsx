import React from "react";

const PlaceLocation = ({ place }) => {
  return (
    <div className="place-sidebar-card">
      <div className="place-sidebar-heading">
        <span className="material-symbols-outlined">
          location_on
        </span>
        <h3>Location</h3>
      </div>

      <p className="place-sidebar-location">
        {place.location}
      </p>

      {place.latitude && place.longitude && (
        <div className="place-map-placeholder">
          <span className="material-symbols-outlined">
            map
          </span>
          <span>
            {place.latitude}° N, {place.longitude}° E
          </span>
        </div>
      )}

      {place.mapUrl && (
        <a
          href={place.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="place-direction-button"
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

export default PlaceLocation;
