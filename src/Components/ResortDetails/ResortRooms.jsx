import React from "react";
import RoomGalleryViewer from "./RoomGalleryViewer";

const ResortRooms = ({
  rooms = [],
  selectedRooms = [],
  onSelectRoom = () => {},
  resortGallery = [],
}) => {
  const [viewerData, setViewerData] = React.useState(null);

  if (!rooms || !Array.isArray(rooms) || !rooms.length) {
    return null;
  }

  const getRoomImages = (room) => {
    if (Array.isArray(room.gallery) && room.gallery.length) {
      return room.gallery;
    }
    if (room.image) {
      const others = (resortGallery || []).filter(
        (img) => img !== room.image
      );
      return [room.image, ...others];
    }
    return resortGallery || [];
  };

  const openGallery = (room) => {
    const images = getRoomImages(room);
    setViewerData({
      roomName: room.name,
      roomType: room.type,
      images,
      activeIndex: 0,
    });
  };

  return (
    <section
      className="rooms-section-wrapper"
      id="rooms-section"
    >
      <div className="rd-section-header">
        <div className="rd-section-icon-badge">
          <span className="material-symbols-outlined">
            meeting_room
          </span>
        </div>
        <div>
          <h2 className="rd-section-title">
            Room Category
          </h2>
          <p className="rd-section-subtitle">
            Choose the perfect category for your holiday
          </p>
        </div>
      </div>

      <div className="rooms-grid">
        {rooms.map((room) => {
          const selected = selectedRooms.includes(room.name);
          const roomImages = getRoomImages(room);

          const displayImage = room.image || (resortGallery && resortGallery[0]) || "";

          return (
            <article
              key={room.id}
              className={`room-card ${selected ? "selected" : ""}`}
            >
              {/* Accessible Image Button */}
              {displayImage && (
                <button
                  type="button"
                  className="room-card-image-wrap"
                  onClick={() => openGallery({ ...room, image: displayImage })}
                  aria-label={`View photos of ${room.name}`}
                  title="Click to view all photos"
                >
                  <img
                    src={displayImage}
                    alt={room.name}
                    className="room-card-image"
                    loading="lazy"
                  />
                  <span className="room-image-overlay-badge">
                    <span className="material-symbols-outlined">
                      photo_library
                    </span>
                    {roomImages.length > 0 ? roomImages.length : 1} Photos
                  </span>
                </button>
              )}

              {/* Details */}
              <div className="room-card-details">
                <div className="room-title-row">
                  <h3 className="room-title">
                    {room.name}
                  </h3>
                  {room.type && (
                    <span className="room-type-tag">
                      {room.type}
                    </span>
                  )}
                </div>

                <div className="room-specs">
                  {room.size && (
                    <span className="room-spec-item">
                      <span className="material-symbols-outlined">
                        square_foot
                      </span>
                      {room.size}
                    </span>
                  )}
                  {room.bed && (
                    <span className="room-spec-item">
                      <span className="material-symbols-outlined">
                        bed
                      </span>
                      {room.bed}
                    </span>
                  )}
                  {room.capacity && (
                    <span className="room-spec-item">
                      <span className="material-symbols-outlined">
                        groups
                      </span>
                      {room.capacity}
                    </span>
                  )}
                </div>

                {room.features && room.features.length > 0 && (
                  <div className="room-features-pills">
                    {room.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="room-feature-pill"
                      >
                        {feature}
                      </span>
                    ))}
                    {room.features.length > 3 && (
                      <span className="room-feature-pill room-feature-more">
                        +{room.features.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Price & Selection */}
              <div className="room-card-pricing">
                <div>
                  {room.originalPrice && (
                    <span className="room-original-price">
                      ₹{room.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <div className="room-price-val">
                    ₹{room.price?.toLocaleString()}
                    <span> / night</span>
                  </div>
                </div>

                <button
                  type="button"
                  className={`room-select-btn ${selected ? "selected" : ""}`}
                  onClick={() => onSelectRoom(room)}
                >
                  {selected ? "✓ Selected" : "Select Room"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {viewerData && (
        <RoomGalleryViewer
          viewerData={viewerData}
          setViewerData={setViewerData}
          onClose={() => setViewerData(null)}
        />
      )}
    </section>
  );
};

export default ResortRooms;
