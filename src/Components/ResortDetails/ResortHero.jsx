import React from "react";

const ResortHero = ({
  resort,
  isLiked = false,
  onToggleLike = () => {},
  onShare = () => {},
  onBookNowClick = () => {},
  onViewRoomsClick = () => {}
}) => {
  if (!resort) return null;

  const getBadgeConfig = (badge) => {
    const b = (badge || "Eco Choice").toLowerCase();
    if (b.includes("eco")) {
      return { className: "badge-eco-choice", icon: "verified", label: badge || "Eco Choice" };
    }
    if (b.includes("popular") || b.includes("trend")) {
      return { className: "badge-popular-choice", icon: "local_fire_department", label: badge || "Popular" };
    }
    if (b.includes("luxury") || b.includes("premium")) {
      return { className: "badge-luxury-choice", icon: "diamond", label: badge || "Luxury" };
    }
    if (b.includes("budget")) {
      return { className: "badge-budget-choice", icon: "savings", label: badge || "Budget Friendly" };
    }
    return { className: "badge-eco-choice", icon: "verified", label: badge || "Eco Choice" };
  };

  const getTypeConfig = (type) => {
    const t = (type || "Eco Resort").toLowerCase();
    if (t.includes("eco")) {
      return { className: "type-badge-eco", icon: "eco", label: type || "Eco Resort" };
    }
    if (t.includes("luxury")) {
      return { className: "type-badge-luxury", icon: "crown", label: type || "Luxury Resort" };
    }
    if (t.includes("nature") || t.includes("hill") || t.includes("mountain")) {
      return { className: "type-badge-nature", icon: "forest", label: type || "Nature Resort" };
    }
    if (t.includes("villa") || t.includes("cottage")) {
      return { className: "type-badge-villa", icon: "villa", label: type || "Private Villa" };
    }
    return { className: "type-badge-eco", icon: "eco", label: type || "Eco Resort" };
  };

  const badgeConfig = getBadgeConfig(resort.badge);
  const typeConfig = getTypeConfig(resort.type);

  return (
    <section className="resort-hero-details-section">
      {/* 1. Main Heading & Right-aligned Social Actions (Likes/Save/Share) */}
      <div className="resort-heading-top-row">
        <div className="resort-title-group">
          <h1 className="resort-title">{resort.name}</h1>
          {resort.tagline && (
            <p className="resort-tagline">{resort.tagline}</p>
          )}
        </div>

        {/* Top-Right: Social actions (likes, save, share) */}
        <div className="resort-social-actions-right">
          {resort.likes && (
            <span className="meta-info-item meta-likes-item">
              <span className="material-symbols-outlined">thumb_up</span>
              <span>{resort.likes} likes</span>
            </span>
          )}

          <button
            type="button"
            className={`rd-action-btn ${isLiked ? "active" : ""}`}
            onClick={onToggleLike}
            title="Save to favorites"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
              favorite
            </span>
            <span>{isLiked ? "Saved" : "Save"}</span>
          </button>

          <button
            type="button"
            className="rd-action-btn"
            onClick={onShare}
            title="Share resort link"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
              share
            </span>
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* 2. Badges line with distinct unique colors */}
      <div className="resort-hero-badges-row">
        {/* Verified Badge */}
        <span className={`resort-badge ${badgeConfig.className}`}>
          <span className="material-symbols-outlined badge-icon">
            {badgeConfig.icon}
          </span>
          {badgeConfig.label}
        </span>

        {/* Resort Category Type Badge */}
        <span className={`resort-badge ${typeConfig.className}`}>
          <span className="material-symbols-outlined badge-icon">
            {typeConfig.icon}
          </span>
          {typeConfig.label}
        </span>

        {/* Rating Pill */}
        <div className="resort-rating-pill">
          <span className="material-symbols-outlined star">star</span>
          <strong className="rating-score">{resort.rating || 4.9}</strong>
          <span className="reviews-count">
            ({resort.reviewsCount || 348}+ reviews)
          </span>
        </div>
      </div>

      {/* 3. Action Buttons & Price Card Row (Buttons on left, Price box opposite side on right) */}
      <div className="resort-actions-price-row">
        <div className="resort-badges-bottom-cta">
          <button
            type="button"
            className="rd-cta-btn-outline"
            onClick={onViewRoomsClick}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "17px" }}>
              bed
            </span>
            Choose Room
          </button>

          <button
            type="button"
            className="rd-cta-btn"
            onClick={onBookNowClick}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "17px" }}>
              calendar_month
            </span>
            Enquire Now
          </button>
        </div>

        {resort.pricePerNight && (
          <div className="resort-price-card">
            <span className="price-card-label">Starting from</span>
            <div className="price-card-val">
              {resort.originalPrice && (
                <span className="price-card-old">
                  ₹{resort.originalPrice.toLocaleString()}
                </span>
              )}
              ₹{resort.pricePerNight.toLocaleString()}
              <span className="price-card-unit"> / night</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResortHero;
