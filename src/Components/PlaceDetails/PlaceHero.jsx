import React from "react";
import { Link } from "react-router-dom";

const PlaceHero = ({ place }) => {
  const rawImage = place.images?.[0] || place.image;
  const image = typeof rawImage === "object" && rawImage !== null ? rawImage.url : rawImage;

  return (
    <section className="place-hero">
      <div className="place-hero-image">
        <img src={image} alt={place.name} />

        <Link
          to="/listings?category=places"
          className="place-back-button"
          aria-label="Back to places"
        >
          ←
        </Link>

        {place.images?.length > 0 && (
          <span className="place-photo-count">
            <span className="material-symbols-outlined">
              photo_library
            </span>
            {place.images.length} Photos
          </span>
        )}
      </div>
    </section>
  );
};

export default PlaceHero;
