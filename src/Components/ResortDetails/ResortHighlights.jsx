import React from "react";

const ResortHighlights = ({ highlights = [] }) => {
  if (!highlights || !highlights.length) {
    return null;
  }

  return (
    <section className="rd-section">
      <h3 className="highlights-title">
        <span className="material-symbols-outlined">
          stars
        </span>
        Key Stay Highlights
      </h3>

      <div className="highlights-grid">
        {highlights.map((item, index) => (
          <article
            className="highlight-item-card"
            key={`${item.title}-${index}`}
          >
            <div className="highlight-icon">
              <span className="material-symbols-outlined">
                {item.icon || "check_circle"}
              </span>
            </div>

            <div className="highlight-info">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ResortHighlights;
