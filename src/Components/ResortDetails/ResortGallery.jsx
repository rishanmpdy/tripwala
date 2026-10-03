import React, { useState, useEffect, useCallback } from "react";

const ResortGallery = ({
  gallery = [],
  name = "Resort Gallery"
}) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const images = gallery.length > 0 ? gallery : [];

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = useCallback(() => {
    setLightboxIndex((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setLightboxIndex((curr) => (curr === images.length - 1 ? 0 : curr + 1));
  }, [images.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleCloseLightbox();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, handlePrev, handleNext]);

  if (images.length === 0) return null;

  return (
    <div className="resort-gallery-wrapper">
      <div className="resort-gallery-grid">
        {/* Main large image */}
        <div
          className="gallery-cell gallery-cell-main"
          onClick={() => handleOpenLightbox(0)}
        >
          <img
            src={images[0]}
            alt={`${name} preview 1`}
            loading="eager"
          />
          <div className="gallery-cell-overlay" />
        </div>

        {/* Next 3 smaller images */}
        {images.slice(1, 4).map((img, idx) => (
          <div
            key={idx + 1}
            className="gallery-cell"
            onClick={() => handleOpenLightbox(idx + 1)}
          >
            <img
              src={img}
              alt={`${name} preview ${idx + 2}`}
              loading="lazy"
            />
            <div className="gallery-cell-overlay" />
          </div>
        ))}

        {/* 5th image with "more photos" overlay if additional photos exist */}
        {images[4] && (
          <div
            className="gallery-cell gallery-cell-more"
            onClick={() => handleOpenLightbox(4)}
          >
            <img
              src={images[4]}
              alt={`${name} preview 5`}
              loading="lazy"
            />
            {images.length > 5 && (
              <div className="gallery-more-overlay">
                <span className="more-count">+{images.length - 5}</span>
                <span className="more-text">More Photos</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating button to view all */}
      <button
        type="button"
        className="gallery-floating-btn"
        onClick={() => handleOpenLightbox(0)}
      >
        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
          photo_library
        </span>
        Show All {images.length} Photos
      </button>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="rd-lightbox" role="dialog" aria-modal="true">
          <div className="rd-lightbox-header">
            <span className="rd-lightbox-counter">
              {lightboxIndex + 1} / {images.length} • {name}
            </span>
            <button
              type="button"
              className="rd-lightbox-close"
              onClick={handleCloseLightbox}
              aria-label="Close photo preview"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="rd-lightbox-body">
            <button
              type="button"
              className="rd-lightbox-nav"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            <div className="rd-lightbox-img-wrapper">
              <img
                src={images[lightboxIndex]}
                alt={`${name} full view ${lightboxIndex + 1}`}
              />
            </div>

            <button
              type="button"
              className="rd-lightbox-nav"
              onClick={handleNext}
              aria-label="Next image"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          <div className="rd-lightbox-thumbs">
            {images.map((thumb, idx) => (
              <div
                key={idx}
                className={`rd-thumb ${idx === lightboxIndex ? "active" : ""}`}
                onClick={() => setLightboxIndex(idx)}
              >
                <img src={thumb} alt={`Thumbnail ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResortGallery;
