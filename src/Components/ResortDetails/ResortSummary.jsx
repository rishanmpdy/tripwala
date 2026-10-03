import React from "react";

const ResortSummary = ({ resort }) => {
  if (!resort) return null;

  return (
    <div className="resort-summary-card">
      <div className="resort-summary-features-grid">
        <div className="summary-feat-item">
          <div className="summary-feat-icon">
            <span className="material-symbols-outlined">loyalty</span>
          </div>
          <div className="summary-feat-text">
            <strong>Best Price Guaranteed</strong>
            <span>Direct rate with zero booking fees</span>
          </div>
        </div>

        <div className="summary-feat-item">
          <div className="summary-feat-icon">
            <span className="material-symbols-outlined">verified</span>
          </div>
          <div className="summary-feat-text">
            <strong>100% Verified Property</strong>
            <span>Authentic listings & photo match</span>
          </div>
        </div>

        <div className="summary-feat-item">
          <div className="summary-feat-icon">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <div className="summary-feat-text">
            <strong>Transparent Pricing</strong>
            <span>Clear tariff with taxes specified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResortSummary;
