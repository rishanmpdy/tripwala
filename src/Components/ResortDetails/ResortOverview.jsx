import React from "react";
import ResortHighlights from "./ResortHighlights";
import ResortRooms from "./ResortRooms";
import ResortPolicies from "./ResortPolicies";

const ResortOverview = ({
  resort,
  selectedRooms = [],
  onSelectRoom = () => {},
}) => {
  if (!resort) return null;

  return (
    <div className="resort-overview-card">
      {/* =========================
          ABOUT / NARRATIVE
      ========================= */}
      <section
        className="rd-section"
        id="overview-section"
      >
        <div className="rd-section-header">
          <div className="rd-section-icon-badge">
            <span className="material-symbols-outlined">
              notes
            </span>
          </div>
          <div>
            <h2 className="rd-section-title">
              About {resort.name}
            </h2>
            <p className="rd-section-subtitle">
              Experience the harmony of nature and curated luxury
            </p>
          </div>
        </div>

        <div className="overview-text">
          {resort.overview || resort.description}
        </div>
      </section>

      {/* =========================
          KEY HIGHLIGHTS
      ========================= */}
      <ResortHighlights
        highlights={resort.highlights}
      />

      {/* =========================
          ROOM CATEGORIES
      ========================= */}
      <ResortRooms
        rooms={resort.rooms}
        selectedRooms={selectedRooms}
        onSelectRoom={onSelectRoom}
        resortGallery={resort.gallery}
      />

      {/* =========================
          POLICIES
      ========================= */}
      <ResortPolicies
        policies={resort.policies}
      />
    </div>
  );
};

export default ResortOverview;
