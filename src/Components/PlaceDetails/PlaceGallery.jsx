import React, { useEffect, useState } from "react";

const PlaceGallery = ({ place }) => {
  const images = place.images?.length
    ? place.images
    : place.image
    ? [place.image]
    : [];

  const [activeIndex, setActiveIndex] = useState(null);

  const closeViewer = () => {
    setActiveIndex(null);
  };

  const previousImage = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const nextImage = () => {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeViewer();
      }
      if (event.key === "ArrowLeft") {
        previousImage();
      }
      if (event.key === "ArrowRight") {
        nextImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = oldOverflow;
    };
  }, [activeIndex, images.length]);

  if (!images.length) {
    return null;
  }

  return (
    <section className="place-section">
      <div className="place-section-heading">
        <div>
          <h2>Gallery</h2>
          <p>Explore {place.name}</p>
        </div>
        <span className="gallery-count">{images.length} photos</span>
      </div>

      <div className="place-gallery">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            className="place-gallery-item"
            onClick={() => setActiveIndex(index)}
            aria-label={`View photo ${index + 1}`}
          >
            <img
              src={image}
              alt={`${place.name} ${index + 1}`}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeIndex !== null && (
        <div className="place-lightbox" onClick={closeViewer} role="dialog" aria-modal="true">
          <button
            type="button"
            className="place-lightbox-close"
            onClick={closeViewer}
            aria-label="Close photo viewer"
          >
            ×
          </button>

          {images.length > 1 && (
            <button
              type="button"
              className="place-lightbox-arrow left"
              onClick={(event) => {
                event.stopPropagation();
                previousImage();
              }}
              aria-label="Previous photo"
            >
              ‹
            </button>
          )}

          <img
            src={images[activeIndex]}
            alt={`${place.name} ${activeIndex + 1}`}
            onClick={(event) => event.stopPropagation()}
          />

          {images.length > 1 && (
            <button
              type="button"
              className="place-lightbox-arrow right"
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
              aria-label="Next photo"
            >
              ›
            </button>
          )}

          <span className="place-lightbox-counter">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </section>
  );
};

export default PlaceGallery;
