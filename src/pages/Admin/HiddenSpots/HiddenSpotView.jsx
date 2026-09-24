import { Link, useParams } from "react-router-dom";

import hiddenSpots from "../../../data/hiddenSpots";

import "./HiddenSpots.css";

const HiddenSpotView = () => {
  const { id } = useParams();

  const spot = hiddenSpots.find(
    (item) => String(item.id) === String(id)
  );

  if (!spot) {
    return (
      <div className="admin-not-found">
        <h2>Hidden spot not found</h2>

        <Link to="/admin/hidden-spots">
          Back to Hidden Spots
        </Link>
      </div>
    );
  }

  return (
    <div className="content-form-page">

      <div className="content-form-header">

        <div>

          <Link
            to="/admin/hidden-spots"
            className="back-link"
          >
            ← Hidden Spots
          </Link>

          <h1>{spot.name}</h1>

          <p>{spot.location}</p>

        </div>

        <Link
          to={`/admin/hidden-spots/${spot.id}/edit`}
          className="primary-button"
        >
          Edit Spot
        </Link>

      </div>

      <div className="view-card">

        <div className="view-image">

          {spot.image && (
            <img
              src={spot.image}
              alt={spot.name}
            />
          )}

        </div>

        <div className="view-content">

          <div className="view-top">

            <span className="category-badge">
              {spot.category}
            </span>

            <span
              className={`status-badge ${
                spot.status === "Active"
                  ? "status-active"
                  : "status-inactive"
              }`}
            >
              <span />
              {spot.status}
            </span>

          </div>

          <h2>{spot.name}</h2>

          <p className="view-description">
            {spot.description}
          </p>

          <div className="view-details">

            <div>
              <small>Best Time</small>
              <strong>
                {spot.bestTime || "-"}
              </strong>
            </div>

            <div>
              <small>Duration</small>
              <strong>
                {spot.visitDuration || "-"}
              </strong>
            </div>

            <div>
              <small>Entry Fee</small>
              <strong>
                {spot.entryFee || "-"}
              </strong>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default HiddenSpotView;

