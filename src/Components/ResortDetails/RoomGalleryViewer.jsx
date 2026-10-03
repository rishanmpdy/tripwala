import React from "react";

const RoomGalleryViewer = ({
  viewerData,
  setViewerData,
  onClose,
}) => {
  if (!viewerData) return null;

  const {
    roomName,
    roomType,
    images = [],
    activeIndex = 0,
  } = viewerData;

  const previous = (e) => {
    e?.stopPropagation();
    setViewerData((prev) => ({
      ...prev,
      activeIndex:
        prev.activeIndex === 0
          ? prev.images.length - 1
          : prev.activeIndex - 1,
    }));
  };

  const next = (e) => {
    e?.stopPropagation();
    setViewerData((prev) => ({
      ...prev,
      activeIndex:
        prev.activeIndex === prev.images.length - 1
          ? 0
          : prev.activeIndex + 1,
    }));
  };

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowLeft") {
        previous(event);
      }
      if (event.key === "ArrowRight") {
        next(event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      className="rd-lightbox"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="rd-lightbox-header"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="rd-lightbox-counter">
          {activeIndex + 1}
          {" / "}
          {images.length}
          {" • "}
          {roomName}
          {roomType && ` • ${roomType}`}
        </span>

        <button
          type="button"
          className="rd-lightbox-close"
          onClick={onClose}
          aria-label="Close photo viewer"
        >
          <span className="material-symbols-outlined">
            close
          </span>
        </button>
      </div>

      <div
        className="rd-lightbox-body"
        onClick={(e) => e.stopPropagation()}
      >
        {images.length > 1 && (
          <button
            type="button"
            className="rd-lightbox-nav"
            onClick={previous}
            aria-label="Previous photo"
          >
            <span className="material-symbols-outlined">
              chevron_left
            </span>
          </button>
        )}

        <div className="rd-lightbox-img-wrapper">
          <img
            src={images[activeIndex]}
            alt={`${roomName} ${activeIndex + 1}`}
          />
        </div>

        {images.length > 1 && (
          <button
            type="button"
            className="rd-lightbox-nav"
            onClick={next}
            aria-label="Next photo"
          >
            <span className="material-symbols-outlined">
              chevron_right
            </span>
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div
          className="rd-lightbox-thumbs"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((image, index) => (
            <button
              type="button"
              key={index}
              className={`rd-thumb ${index === activeIndex ? "active" : ""}`}
              onClick={() =>
                setViewerData((prev) => ({
                  ...prev,
                  activeIndex: index,
                }))
              }
              aria-label={`View photo ${index + 1}`}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomGalleryViewer;
