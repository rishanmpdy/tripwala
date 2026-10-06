import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FoodGallery = ({ food }) => {
  const images =
    food.images?.length
      ? food.images
      : food.image
        ? [food.image]
        : [];

  const [activeIndex, setActiveIndex] = useState(null);

  const closeViewer = () => setActiveIndex(null);

  const previousImage = () => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const nextImage = () => {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
      if (event.key === "ArrowRight") setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
    };

    document.addEventListener("keydown", handleKeyDown);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = oldOverflow;
    };
  }, [activeIndex, images.length]);

  if (!images.length) return null;

  // Display up to 5 photos in the top masonry grid
  const displayImages = images.slice(0, 5);
  const hasMore = images.length > 5;
  const moreCount = images.length - 4;

  return (
    <section className="food-top-gallery-wrapper">
      {/* Floating Back Button */}
      <Link
        to="/listings?category=food-spot"
        className="food-top-back-btn"
        aria-label="Back to food spots"
      >
        ←
      </Link>

      {/* Masonry 4+ Photo Collage Showcase */}
      <div className={`food-top-gallery-masonry count-${Math.min(images.length, 5)}`}>
        {displayImages.map((image, index) => {
          const isHero = index === 0;
          const showMoreOverlay = hasMore && index === 4;

          return (
            <button
              type="button"
              key={`${image}-${index}`}
              className={`food-top-gallery-item ${isHero ? "hero-tile" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`View photo ${index + 1} of ${food.name}`}
            >
              <img
                src={image}
                alt={`${food.name} photo ${index + 1}`}
                className="food-top-gallery-img"
                loading="lazy"
              />

              {showMoreOverlay && (
                <div className="food-gallery-more-overlay">
                  <span className="material-symbols-outlined">photo_library</span>
                  <span className="food-gallery-more-text">+{moreCount} Photos</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Floating photo count button */}
      <button
        type="button"
        className="food-top-photo-count-btn"
        onClick={() => setActiveIndex(0)}
      >
        <span className="material-symbols-outlined">photo_library</span>
        <span>View all {images.length} photos</span>
      </button>

      {/* Interactive Lightbox Viewer */}
      {activeIndex !== null && (
        <div className="food-lightbox" onClick={closeViewer}>
          <button
            type="button"
            className="food-lightbox-close"
            onClick={closeViewer}
            aria-label="Close photo viewer"
          >
            ×
          </button>

          <button
            type="button"
            className="food-lightbox-arrow left"
            onClick={(event) => {
              event.stopPropagation();
              previousImage();
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>

          <img
            src={images[activeIndex]}
            alt={food.name}
            onClick={(event) => event.stopPropagation()}
          />

          <button
            type="button"
            className="food-lightbox-arrow right"
            onClick={(event) => {
              event.stopPropagation();
              nextImage();
            }}
            aria-label="Next photo"
          >
            ›
          </button>

          <span className="food-lightbox-counter">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </section>
  );
};

export default FoodGallery;
