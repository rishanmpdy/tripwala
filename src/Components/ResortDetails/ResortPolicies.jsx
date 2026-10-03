import React from "react";

const ResortPolicies = ({ policies = {} }) => {
  const items = [
    {
      icon: "login",
      label: "Check-In Time",
      value: policies?.checkIn || "02:00 PM",
    },
    {
      icon: "logout",
      label: "Check-Out Time",
      value: policies?.checkOut || "11:00 AM",
    },
    {
      icon: "published_with_changes",
      label: "Cancellation",
      value:
        policies?.cancellation ||
        "Free cancellation up to 48 hours prior to arrival.",
    },
    {
      icon: "pets",
      label: "Pet Policy",
      value:
        policies?.pets ||
        "Pets allowed upon advance reservation.",
    },
  ];

  return (
    <section
      className="policies-section"
      id="policies-section"
    >
      <div className="rd-section-header">
        <div className="rd-section-icon-badge">
          <span className="material-symbols-outlined">
            policy
          </span>
        </div>
        <div>
          <h2 className="rd-section-title">
            Resort Policies & Rules
          </h2>
          <p className="rd-section-subtitle">
            Important information regarding your stay
          </p>
        </div>
      </div>

      <div className="policies-grid">
        {items.map((item) => (
          <div
            className="policy-box"
            key={item.label}
          >
            <span className="policy-label">
              <span className="material-symbols-outlined">
                {item.icon}
              </span>
              {item.label}
            </span>
            <p className="policy-value">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResortPolicies;
