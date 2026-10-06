import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  placeStore,
  resortStore,
  homestayStore,
  foodStore,
  taxiStore,
  contactNumberStore,
  reviewStore,
  userStore,
} from "../../data/stores";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Load live counts and data from all stores
  const [places, setPlaces] = useState(() => placeStore.get());
  const [resorts, setResorts] = useState(() => resortStore.get());
  const [homestays, setHomestays] = useState(() => homestayStore.get());
  const [foodSpots, setFoodSpots] = useState(() => foodStore.get());
  const [taxis, setTaxis] = useState(() => taxiStore.get());
  const [contacts, setContacts] = useState(() => contactNumberStore.get());
  const [reviews, setReviews] = useState(() => reviewStore.get());
  const [users, setUsers] = useState(() => userStore.get());

  const [recentFilter, setRecentFilter] = useState("all");

  const refreshAll = () => {
    setPlaces(placeStore.get());
    setResorts(resortStore.get());
    setHomestays(homestayStore.get());
    setFoodSpots(foodStore.get());
    setTaxis(taxiStore.get());
    setContacts(contactNumberStore.get());
    setReviews(reviewStore.get());
    setUsers(userStore.get());
  };

  useEffect(() => {
    window.addEventListener("tripwala-store-updated", refreshAll);
    window.addEventListener("tripwala-places-updated", refreshAll);
    window.addEventListener("tripwala-resorts-updated", refreshAll);
    window.addEventListener("tripwala-homestays-updated", refreshAll);
    window.addEventListener("tripwala-food-updated", refreshAll);
    window.addEventListener("tripwala-taxis-updated", refreshAll);
    window.addEventListener("tripwala-reviews-updated", refreshAll);
    window.addEventListener("tripwala-admin-users-updated", refreshAll);
    return () => {
      window.removeEventListener("tripwala-store-updated", refreshAll);
      window.removeEventListener("tripwala-places-updated", refreshAll);
      window.removeEventListener("tripwala-resorts-updated", refreshAll);
      window.removeEventListener("tripwala-homestays-updated", refreshAll);
      window.removeEventListener("tripwala-food-updated", refreshAll);
      window.removeEventListener("tripwala-taxis-updated", refreshAll);
      window.removeEventListener("tripwala-reviews-updated", refreshAll);
      window.removeEventListener("tripwala-admin-users-updated", refreshAll);
    };
  }, []);

  const unreadReviewsCount = reviews.filter((r) => r.status === "Unread").length;

  // Build unified recent items list
  const recentList = [
    ...resorts.map((r) => ({
      id: r.id,
      name: r.name,
      category: "resort",
      categoryLabel: "Resort",
      location: r.location || "Wayanad",
      extra: r.price ? `₹${r.price}/night` : `★ ${r.rating || 4.8}`,
      image: Array.isArray(r.images) && r.images.length > 0 ? r.images[0] : r.image,
      viewUrl: `/admin/resorts/${r.id}`,
      editUrl: `/admin/resorts/${r.id}/edit`,
    })),
    ...homestays.map((h) => ({
      id: h.id,
      name: h.name,
      category: "homestay",
      categoryLabel: "Home Stay",
      location: h.location || "Wayanad",
      extra: h.price ? `₹${h.price}/night` : `★ ${h.rating || 4.7}`,
      image: Array.isArray(h.images) && h.images.length > 0 ? h.images[0] : h.image,
      viewUrl: `/admin/homestays/${h.id}`,
      editUrl: `/admin/homestays/${h.id}/edit`,
    })),
    ...places.map((p) => ({
      id: p.id,
      name: p.name,
      category: "place",
      categoryLabel: "Place",
      location: p.location || "Wayanad",
      extra: p.category || "Sightseeing",
      image: Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : p.image,
      viewUrl: `/admin/places/${p.id}`,
      editUrl: `/admin/places/${p.id}/edit`,
    })),
    ...foodSpots.map((f) => ({
      id: f.id,
      name: f.name,
      category: "food",
      categoryLabel: "Food Spot",
      location: f.location || "Wayanad",
      extra: f.cuisine || f.category || "Cuisine",
      image: Array.isArray(f.images) && f.images.length > 0 ? f.images[0] : f.image,
      viewUrl: `/admin/food-spots/${f.id}`,
      editUrl: `/admin/food-spots/${f.id}/edit`,
    })),
    ...taxis.map((t) => ({
      id: t.id,
      name: t.name || t.vehicleName,
      category: "taxi",
      categoryLabel: "Taxi",
      location: t.location || "Wayanad",
      extra: t.vehicleNumber || (t.pricePerKm ? `₹${t.pricePerKm}/km` : "Cab"),
      image: t.image,
      viewUrl: `/admin/taxi/${t.id}`,
      editUrl: `/admin/taxi/${t.id}/edit`,
    })),
  ];

  const filteredRecent = recentList.filter((item) => {
    if (recentFilter === "all") return true;
    return item.category === recentFilter;
  });

  return (
    <div className="admin-dashboard">
      {/* 1. Header & Quick Actions */}
      <div className="dash-header-row">
        <div className="dash-header-text">
          <h1>Dashboard Overview</h1>
          <p>Real-time overview of all categories, properties, desks, and management operations.</p>
        </div>
        <div className="dash-header-actions">
          <Link to="/admin/resorts/new" className="dash-quick-btn primary">
            + Add Resort
          </Link>
          <Link to="/admin/homestays/new" className="dash-quick-btn">
            + Add Home Stay
          </Link>
          <Link to="/admin/places/new" className="dash-quick-btn">
            + Add Place
          </Link>
          <Link to="/admin/food-spots/new" className="dash-quick-btn">
            + Add Food Spot
          </Link>
          <Link to="/admin/taxi/new" className="dash-quick-btn">
            + Add Taxi
          </Link>
          <Link to="/admin/users" className="dash-quick-btn">
            + Add User
          </Link>
        </div>
      </div>

      {/* 2. All 8 Categories Grid */}
      <section>
        <div className="dash-section-title">
          <h2>All Categories & Content Areas</h2>
          <span>Direct management & quick creation for each category</span>
        </div>

        <div className="categories-grid">
          {/* 1. Places */}
          <div className="cat-card">
            <div>
              <div className="cat-card-top">
                <div className="cat-icon-wrap places">📍</div>
                <div className="cat-count">
                  {places.length}
                  <div><span className="cat-badge">Destinations</span></div>
                </div>
              </div>
              <div className="cat-card-body">
                <h3>Places & Sights</h3>
                <p>Waterfalls, peaks, scenic viewpoints, and heritage attractions across Wayanad.</p>
              </div>
            </div>
            <div className="cat-card-actions">
              <Link to="/admin/places" className="cat-action-btn">
                Manage
              </Link>
              <Link to="/admin/places/new" className="cat-action-btn primary">
                + Add
              </Link>
            </div>
          </div>

          {/* 2. Resorts */}
          <div className="cat-card">
            <div>
              <div className="cat-card-top">
                <div className="cat-icon-wrap resorts">🏨</div>
                <div className="cat-count">
                  {resorts.length}
                  <div><span className="cat-badge">Resorts</span></div>
                </div>
              </div>
              <div className="cat-card-body">
                <h3>Resorts</h3>
                <p>Luxury retreats, lake view villas, pool cottages, and forest eco-resorts.</p>
              </div>
            </div>
            <div className="cat-card-actions">
              <Link to="/admin/resorts" className="cat-action-btn">
                Manage
              </Link>
              <Link to="/admin/resorts/new" className="cat-action-btn primary">
                + Add
              </Link>
            </div>
          </div>

          {/* 3. Homestays */}
          <div className="cat-card">
            <div>
              <div className="cat-card-top">
                <div className="cat-icon-wrap homestays">🏡</div>
                <div className="cat-count">
                  {homestays.length}
                  <div><span className="cat-badge">Homestays</span></div>
                </div>
              </div>
              <div className="cat-card-body">
                <h3>Home Stays</h3>
                <p>Estate cottages, authentic host family stays, and budget plantation rooms.</p>
              </div>
            </div>
            <div className="cat-card-actions">
              <Link to="/admin/homestays" className="cat-action-btn">
                Manage
              </Link>
              <Link to="/admin/homestays/new" className="cat-action-btn primary">
                + Add
              </Link>
            </div>
          </div>

          {/* 4. Food Spots */}
          <div className="cat-card">
            <div>
              <div className="cat-card-top">
                <div className="cat-icon-wrap food">🍽️</div>
                <div className="cat-count">
                  {foodSpots.length}
                  <div><span className="cat-badge">Eateries</span></div>
                </div>
              </div>
              <div className="cat-card-body">
                <h3>Food Spots</h3>
                <p>Traditional Malabar kitchens, highway cafes, bakeries, and fine dining.</p>
              </div>
            </div>
            <div className="cat-card-actions">
              <Link to="/admin/food-spots" className="cat-action-btn">
                Manage
              </Link>
              <Link to="/admin/food-spots/new" className="cat-action-btn primary">
                + Add
              </Link>
            </div>
          </div>

          {/* 5. Taxi Fleet */}
          <div className="cat-card">
            <div>
              <div className="cat-card-top">
                <div className="cat-icon-wrap taxi">🚕</div>
                <div className="cat-count">
                  {taxis.length}
                  <div><span className="cat-badge">Cabs & Fleet</span></div>
                </div>
              </div>
              <div className="cat-card-body">
                <h3>Taxi & Drivers</h3>
                <p>Sedans, Innovas, tempo travellers, and verified local tour drivers.</p>
              </div>
            </div>
            <div className="cat-card-actions">
              <Link to="/admin/taxi" className="cat-action-btn">
                Manage
              </Link>
              <Link to="/admin/taxi/new" className="cat-action-btn primary">
                + Add
              </Link>
            </div>
          </div>

          {/* 6. Customer Reviews */}
          <div className="cat-card">
            <div>
              <div className="cat-card-top">
                <div className="cat-icon-wrap reviews">⭐</div>
                <div className="cat-count">
                  {reviews.length}
                  <div>
                    {unreadReviewsCount > 0 ? (
                      <span className="cat-badge alert">{unreadReviewsCount} Unread</span>
                    ) : (
                      <span className="cat-badge">All Read</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="cat-card-body">
                <h3>Customer Reviews</h3>
                <p>Guest feedback, 5-star ratings, reviews moderation, and moderation actions.</p>
              </div>
            </div>
            <div className="cat-card-actions">
              <Link to="/admin/reviews" className="cat-action-btn primary" style={{ width: "100%" }}>
                Moderate Reviews ({unreadReviewsCount} new)
              </Link>
            </div>
          </div>

          {/* 7. Contact Routing Desks */}
          <div className="cat-card">
            <div>
              <div className="cat-card-top">
                <div className="cat-icon-wrap settings">📞</div>
                <div className="cat-count">
                  {contacts.length}
                  <div><span className="cat-badge">Active Desks</span></div>
                </div>
              </div>
              <div className="cat-card-body">
                <h3>Contact Routing</h3>
                <p>WhatsApp enquiry desk numbers, agent lines, and resort routing settings.</p>
              </div>
            </div>
            <div className="cat-card-actions">
              <Link to="/admin/settings" className="cat-action-btn primary" style={{ width: "100%" }}>
                Configure Desks & Numbers
              </Link>
            </div>
          </div>

          {/* 8. Team & Users */}
          <div className="cat-card">
            <div>
              <div className="cat-card-top">
                <div className="cat-icon-wrap users">👥</div>
                <div className="cat-count">
                  {users.length}
                  <div><span className="cat-badge">Admin Accounts</span></div>
                </div>
              </div>
              <div className="cat-card-body">
                <h3>Team & Users</h3>
                <p>Superadmin, Admin, and User staff logins, passwords, and access control.</p>
              </div>
            </div>
            <div className="cat-card-actions">
              <Link to="/admin/users" className="cat-action-btn primary" style={{ width: "100%" }}>
                Manage Users & Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Split Section: Recent Items Table + Review/Routing Quick Info */}
      <div className="dash-columns">
        {/* Left Column: Recent Listings with Enabled Operations */}
        <div className="dash-box">
          <div className="dash-box-header">
            <h3>Recent Content Listings</h3>
            <div className="dash-filter-tabs">
              <button
                className={`dash-tab-btn ${recentFilter === "all" ? "active" : ""}`}
                onClick={() => setRecentFilter("all")}
              >
                All ({recentList.length})
              </button>
              <button
                className={`dash-tab-btn ${recentFilter === "resort" ? "active" : ""}`}
                onClick={() => setRecentFilter("resort")}
              >
                Resorts ({resorts.length})
              </button>
              <button
                className={`dash-tab-btn ${recentFilter === "homestay" ? "active" : ""}`}
                onClick={() => setRecentFilter("homestay")}
              >
                Homestays ({homestays.length})
              </button>
              <button
                className={`dash-tab-btn ${recentFilter === "place" ? "active" : ""}`}
                onClick={() => setRecentFilter("place")}
              >
                Places ({places.length})
              </button>
              <button
                className={`dash-tab-btn ${recentFilter === "food" ? "active" : ""}`}
                onClick={() => setRecentFilter("food")}
              >
                Food ({foodSpots.length})
              </button>
              <button
                className={`dash-tab-btn ${recentFilter === "taxi" ? "active" : ""}`}
                onClick={() => setRecentFilter("taxi")}
              >
                Taxi ({taxis.length})
              </button>
            </div>
          </div>

          <div className="admin-table-wrapper" style={{ boxShadow: "none", border: "1px solid #f1f5f9" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Item / Property</th>
                  <th style={{ width: "110px" }}>Category</th>
                  <th>Location</th>
                  <th>Highlight</th>
                  <th style={{ width: "140px", textAlign: "right" }}>Operations</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecent.slice(0, 7).map((item) => (
                  <tr key={`${item.category}-${item.id}`}>
                    <td>
                      <div className="dash-item-cell">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt=""
                            className="dash-item-thumb"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="dash-item-thumb" style={{ display: "grid", placeItems: "center" }}>
                            📷
                          </div>
                        )}
                        <div className="dash-item-info">
                          <span className="dash-item-title">{item.name}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`category-tag ${item.category}`}>
                        {item.categoryLabel}
                      </span>
                    </td>
                    <td style={{ color: "#475569", fontSize: "13px" }}>
                      {item.location}
                    </td>
                    <td style={{ color: "#0284c7", fontWeight: "600", fontSize: "13px" }}>
                      {item.extra}
                    </td>
                    <td>
                      <div className="admin-actions-cell" style={{ justifyContent: "flex-end", gap: "6px" }}>
                        <button
                          className="admin-action-btn view"
                          onClick={() => navigate(item.viewUrl)}
                          title="View Details"
                        >
                          View
                        </button>
                        <button
                          className="admin-action-btn edit"
                          onClick={() => navigate(item.editUrl)}
                          title="Edit Item"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Customer Feedback & Active Routing */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Reviews Box */}
          <div className="dash-box">
            <div className="dash-box-header">
              <h3>
                <span>⭐ Recent Reviews</span>
              </h3>
              <Link to="/admin/reviews" style={{ fontSize: "12px", color: "#0284c7", fontWeight: "700", textDecoration: "none" }}>
                View All →
              </Link>
            </div>

            <div className="dash-side-list">
              {reviews.slice(0, 3).map((rev) => (
                <div className="review-preview-card" key={rev.id}>
                  <div className="review-preview-top">
                    <span className="review-author-name">{rev.author}</span>
                    <span className="review-stars">{"★".repeat(rev.rating || 5)}</span>
                  </div>
                  <span className="review-property-label">
                    {rev.propertyName || "Property Review"}
                  </span>
                  <p className="review-snippet">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Active Contact Desks Box */}
          <div className="dash-box">
            <div className="dash-box-header">
              <h3>
                <span>📞 WhatsApp Enquiry Routing</span>
              </h3>
              <Link to="/admin/settings" style={{ fontSize: "12px", color: "#0284c7", fontWeight: "700", textDecoration: "none" }}>
                Settings →
              </Link>
            </div>

            <div className="dash-side-list">
              {contacts.slice(0, 3).map((desk) => {
                const totalAssigned = (desk.assignedResorts?.length || 0) + (desk.assignedHomestays?.length || 0);
                return (
                  <div className="desk-routing-item" key={desk.id}>
                    <div className="desk-info">
                      <strong>{desk.name}</strong>
                      <small>{desk.phone || desk.whatsapp}</small>
                    </div>
                    <span className="desk-badge">
                      {totalAssigned > 0 ? `${totalAssigned} Stays Routed` : "General"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}