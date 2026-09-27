import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { placeStore } from "../../data/stores";

import "./PlaceDetails.css";

const PlaceDetails = () => {

  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [places, setPlaces] = useState(getPlaces);

  useEffect(() => {
    const refreshPlaces = () => setPlaces(placeStore.get());
    window.addEventListener("tripwala-places-updated", refreshPlaces);
    window.addEventListener("storage", refreshPlaces);
    return () => { window.removeEventListener("tripwala-places-updated", refreshPlaces); window.removeEventListener("storage", refreshPlaces); };
  }, []);

  const place = places.find(
    (item) => item.id === id
  );
  const images = place?.images ?? [];

  const closeViewer = () => setSelectedImageIndex(null);
  const showPreviousImage = () => setSelectedImageIndex((index) =>
    index === 0 ? images.length - 1 : index - 1,
  );
  const showNextImage = () => setSelectedImageIndex((index) =>
    index === images.length - 1 ? 0 : index + 1,
  );

  useEffect(() => {
    if (selectedImageIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedImageIndex(null);
      if (event.key === "ArrowLeft") {
        setSelectedImageIndex((index) =>
          index === 0 ? images.length - 1 : index - 1,
        );
      }
      if (event.key === "ArrowRight") {
        setSelectedImageIndex((index) =>
          index === images.length - 1 ? 0 : index + 1,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("image-viewer-open");

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("image-viewer-open");
    };
  }, [selectedImageIndex, images.length]);

  if (!place) {
    return (
      <div className="not-found">
        <h2>Place not found</h2>

        <Link to="/">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="place-details-page">

      {/* Header */}
      <header className="details-header">

        <div className="details-logo">
          <div className="logo-circle">
            👓
          </div>

          <span>traveltri</span>
        </div>

      </header>


      {/* Top Banner */}
      <section className="place-banner">

        <Link
          to="/"
          className="back-button"
        >
          ↩
        </Link>

      </section>


      {/* Place Information */}
      <section className="place-information">

        <div className="place-heading">

          <div>

            <h1>
              {place.name}
            </h1>

            <p className="place-location">
              {place.location}
            </p>

          </div>

          <button
            className="direction-button"
            onClick={() => {
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`,
                "_blank"
              );
            }}
          >
            Get Direction
            <span>⌖</span>
          </button>

        </div>


        {/* Description */}
        <p className="place-description">
          {place.description}
        </p>


        {/* Facilities */}
        <div className="place-features">

          <div className="feature">

            <div className="feature-icon">
              🚶
            </div>

            <span>
              Walking
            </span>

            <strong>
              {place.walkingDistance}
            </strong>

          </div>


          <div className="feature">

            <div className="feature-icon">
              🍴
            </div>

            <span>
              Food Spot
            </span>

            <strong>
              {place.foodSpotDistance}
            </strong>

          </div>

        </div>

      </section>


      <section className="place-gallery" aria-label={`${place.name} photo gallery`}>

        {place.images.map((image, index) => (

          <button
            key={`${image}-${index}`}
            type="button"
            className={`gallery-item gallery-item-${index + 1}`}
            onClick={() => setSelectedImageIndex(index)}
            aria-label={`View ${place.name} image ${index + 1}`}
          >

            <img
              src={image}
              alt={`${place.name} ${index + 1}`}
              loading={index < 4 ? "eager" : "lazy"}
              decoding="async"
            />

          </button>

        ))}

      </section>

      {selectedImageIndex !== null && (
        <div className="image-viewer" role="dialog" aria-modal="true" aria-label={`${place.name} image viewer`}>
          <button className="viewer-backdrop" type="button" onClick={closeViewer} aria-label="Close image viewer" />
          <div className="viewer-content">
            <button className="viewer-close" type="button" onClick={closeViewer} aria-label="Close image viewer">×</button>
            <button className="viewer-control viewer-previous" type="button" onClick={showPreviousImage} aria-label="Previous image">‹</button>
            <img src={place.images[selectedImageIndex]} alt={`${place.name} ${selectedImageIndex + 1}`} />
            <button className="viewer-control viewer-next" type="button" onClick={showNextImage} aria-label="Next image">›</button>
            <span className="viewer-count">{selectedImageIndex + 1} / {place.images.length}</span>
          </div>
        </div>
      )}


    </main>
  );
};

export default PlaceDetails;

