import { useState, useEffect, useMemo } from "react";
import { reviewStore } from "../../../data/stores";
import "./Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState(() => reviewStore.get() || []);
  const [activeTab, setActiveTab] = useState("all"); // "all" | "unread" | "read" | "blocked"
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedReview, setSelectedReview] = useState(null); // For modal view

  useEffect(() => {
    const handleUpdate = () => setReviews(reviewStore.get() || []);
    window.addEventListener("tripwala-reviews-updated", handleUpdate);
    return () => window.removeEventListener("tripwala-reviews-updated", handleUpdate);
  }, []);

  const saveReviews = (next) => {
    setReviews(next);
    reviewStore.save(next);
  };

  // Counts for tabs
  const counts = useMemo(() => {
    return {
      all: reviews.length,
      unread: reviews.filter((r) => r.status === "Unread").length,
      read: reviews.filter((r) => r.status === "Read").length,
      blocked: reviews.filter((r) => r.status === "Blocked").length,
    };
  }, [reviews]);

  // Filtered reviews based on activeTab, categoryFilter, and search
  const filteredReviews = useMemo(() => {
    const q = search.toLowerCase().trim();
    return reviews.filter((r) => {
      // Tab filter
      if (activeTab === "unread" && r.status !== "Unread") return false;
      if (activeTab === "read" && r.status !== "Read") return false;
      if (activeTab === "blocked" && r.status !== "Blocked") return false;

      // Category filter
      if (categoryFilter !== "All" && r.propertyCategory !== categoryFilter) {
        return false;
      }

      // Search query
      if (q) {
        const matchesAuthor = r.author?.toLowerCase().includes(q);
        const matchesProperty = r.propertyName?.toLowerCase().includes(q);
        const matchesComment = r.comment?.toLowerCase().includes(q);
        const matchesEmail = r.email?.toLowerCase().includes(q);
        if (!matchesAuthor && !matchesProperty && !matchesComment && !matchesEmail) {
          return false;
        }
      }

      return true;
    });
  }, [reviews, activeTab, categoryFilter, search]);

  // Operations
  const handleMarkStatus = (id, newStatus) => {
    const updated = reviews.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
    saveReviews(updated);
    if (selectedReview?.id === id) {
      setSelectedReview((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleToggleBlock = (id) => {
    const target = reviews.find((r) => r.id === id);
    if (!target) return;
    const newStatus = target.status === "Blocked" ? "Read" : "Blocked";
    handleMarkStatus(id, newStatus);
  };

  const handleDelete = (id) => {
    const target = reviews.find((r) => r.id === id);
    if (!target) return;
    if (!window.confirm(`Delete review from "${target.author}"?`)) return;

    const updated = reviews.filter((r) => r.id !== id);
    saveReviews(updated);
    if (selectedReview?.id === id) {
      setSelectedReview(null);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const count = Math.round(Number(rating) || 5);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`review-star ${i <= count ? "filled" : "empty"}`}
        >
          ★
        </span>
      );
    }
    return <span className="review-stars-wrap">{stars}</span>;
  };

  return (
    <div className="admin-reviews-page">
      {/* PAGE HEADER */}
      <div className="reviews-page-header">
        <div className="reviews-header-left">
          <h1>Reviews</h1>
          <span className="reviews-total-badge">{reviews.length} Total</span>
        </div>

        <div className="reviews-header-controls">
          <div className="reviews-search-box">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              placeholder="Search reviewer, property, or comment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="reviews-category-select"
          >
            <option value="All">All Categories</option>
            <option value="Resort">Resorts</option>
            <option value="Homestay">Homestays</option>
            <option value="Place">Places</option>
            <option value="Food Spot">Food Spots</option>
          </select>
        </div>
      </div>

      {/* STATUS TABS */}
      <div className="reviews-tabs-bar">
        <button
          type="button"
          className={`reviews-tab-item ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All Reviews
          <span className="tab-count">{counts.all}</span>
        </button>

        <button
          type="button"
          className={`reviews-tab-item ${activeTab === "unread" ? "active" : ""}`}
          onClick={() => setActiveTab("unread")}
        >
          Unread
          <span className={`tab-count ${counts.unread > 0 ? "highlight-unread" : ""}`}>
            {counts.unread}
          </span>
        </button>

        <button
          type="button"
          className={`reviews-tab-item ${activeTab === "read" ? "active" : ""}`}
          onClick={() => setActiveTab("read")}
        >
          Read
          <span className="tab-count">{counts.read}</span>
        </button>

        <button
          type="button"
          className={`reviews-tab-item ${activeTab === "blocked" ? "active" : ""}`}
          onClick={() => setActiveTab("blocked")}
        >
          Blocked
          <span className={`tab-count ${counts.blocked > 0 ? "highlight-blocked" : ""}`}>
            {counts.blocked}
          </span>
        </button>
      </div>

      {/* REVIEWS TABLE */}
      <div className="reviews-table-wrapper">
        <table className="reviews-table">
          <thead>
            <tr>
              <th style={{ width: "210px" }}>Reviewer</th>
              <th style={{ width: "200px" }}>Property</th>
              <th style={{ width: "135px" }}>Rating</th>
              <th style={{ minWidth: "260px" }}>Review Comment</th>
              <th style={{ width: "115px" }}>Date</th>
              <th style={{ width: "110px" }}>Status</th>
              <th className="reviews-actions-head" style={{ width: "240px", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.length > 0 ? (
              filteredReviews.map((rev) => (
                <tr
                  key={rev.id}
                  className={`review-table-row ${rev.status === "Unread" ? "row-unread" : ""} ${
                    rev.status === "Blocked" ? "row-blocked" : ""
                  }`}
                >
                  {/* REVIEWER */}
                  <td>
                    <div className="reviewer-info-cell">
                      <div className="reviewer-avatar">
                        {rev.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div className="reviewer-text">
                        <strong className="reviewer-name">{rev.author}</strong>
                        {rev.email && (
                          <span className="reviewer-email">{rev.email}</span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* PROPERTY */}
                  <td>
                    <div className="property-cell">
                      <strong className="property-name">{rev.propertyName}</strong>
                      <span className={`property-cat-tag ${rev.propertyCategory?.toLowerCase().replace(" ", "-")}`}>
                        {rev.propertyCategory}
                      </span>
                    </div>
                  </td>

                  {/* RATING */}
                  <td>
                    <div className="rating-cell">
                      {renderStars(rev.rating)}
                      <span className="rating-number">{rev.rating}.0</span>
                    </div>
                  </td>

                  {/* COMMENT */}
                  <td className="review-comment-td">
                    <p
                      className="review-comment-text"
                      title={rev.comment}
                      onClick={() => setSelectedReview(rev)}
                    >
                      {rev.comment}
                    </p>
                  </td>

                  {/* DATE */}
                  <td>
                    <span className="review-date-text">{rev.date}</span>
                  </td>

                  {/* STATUS */}
                  <td>
                    <span className={`review-status-pill ${rev.status.toLowerCase()}`}>
                      <span className="status-dot" />
                      {rev.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td>
                    <div className="review-actions-cell">
                      {rev.status === "Unread" ? (
                        <button
                          type="button"
                          className="btn-review-action read"
                          onClick={() => handleMarkStatus(rev.id, "Read")}
                          title="Mark as Read"
                        >
                          Mark Read
                        </button>
                      ) : rev.status === "Read" ? (
                        <button
                          type="button"
                          className="btn-review-action unread"
                          onClick={() => handleMarkStatus(rev.id, "Unread")}
                          title="Mark as Unread"
                        >
                          Mark Unread
                        </button>
                      ) : null}

                      <button
                        type="button"
                        className={`btn-review-action ${
                          rev.status === "Blocked" ? "unblock" : "block"
                        }`}
                        onClick={() => handleToggleBlock(rev.id)}
                        title={rev.status === "Blocked" ? "Unblock review" : "Block review"}
                      >
                        {rev.status === "Blocked" ? "Unblock" : "Block"}
                      </button>

                      <button
                        type="button"
                        className="btn-review-action delete"
                        onClick={() => handleDelete(rev.id)}
                        title="Delete review"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="reviews-empty-state">
                  No {activeTab !== "all" ? activeTab : ""} reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* REVIEW DETAILS MODAL */}
      {selectedReview && (
        <div className="reviews-modal-backdrop" onClick={() => setSelectedReview(null)}>
          <div className="reviews-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="reviews-modal-header">
              <div>
                <h2>Review Details</h2>
                <span className={`review-status-pill ${selectedReview.status.toLowerCase()}`}>
                  {selectedReview.status}
                </span>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedReview(null)}
              >
                ×
              </button>
            </div>

            <div className="reviews-modal-body">
              <div className="modal-reviewer-card">
                <div className="reviewer-avatar lg">
                  {selectedReview.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <h3>{selectedReview.author}</h3>
                  <p>{selectedReview.email || "No email provided"}</p>
                </div>
              </div>

              <div className="modal-property-card">
                <div>
                  <span className="modal-label">Property:</span>
                  <strong>{selectedReview.propertyName}</strong>
                </div>
                <div>
                  <span className="modal-label">Category:</span>
                  <span className="property-cat-tag">
                    {selectedReview.propertyCategory}
                  </span>
                </div>
                <div>
                  <span className="modal-label">Rating:</span>
                  <div className="rating-cell">
                    {renderStars(selectedReview.rating)}
                    <strong>{selectedReview.rating}.0 / 5.0</strong>
                  </div>
                </div>
                <div>
                  <span className="modal-label">Date:</span>
                  <span>{selectedReview.date}</span>
                </div>
              </div>

              <div className="modal-comment-card">
                <span className="modal-label">Full Review Message:</span>
                <p className="modal-comment-body">{selectedReview.comment}</p>
              </div>
            </div>

            <div className="reviews-modal-footer">
              {selectedReview.status === "Unread" ? (
                <button
                  type="button"
                  className="btn-modal-action read"
                  onClick={() => handleMarkStatus(selectedReview.id, "Read")}
                >
                  Mark as Read
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-modal-action unread"
                  onClick={() => handleMarkStatus(selectedReview.id, "Unread")}
                >
                  Mark as Unread
                </button>
              )}

              <button
                type="button"
                className={`btn-modal-action ${
                  selectedReview.status === "Blocked" ? "unblock" : "block"
                }`}
                onClick={() => handleToggleBlock(selectedReview.id)}
              >
                {selectedReview.status === "Blocked" ? "Unblock Review" : "Block Review"}
              </button>

              <button
                type="button"
                className="btn-modal-action delete"
                onClick={() => handleDelete(selectedReview.id)}
              >
                Delete Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
