import { Link, useParams } from "react-router-dom";

import mustWatch from "../../../data/mustWatch";

import "./MustWatch.css";

const MustWatchView = () => {
  const { id } = useParams();

  const video = mustWatch.find(
    (item) => String(item.id) === String(id)
  );

  if (!video) {
    return (
      <div className="admin-not-found">

        <h2>
          Video not found
        </h2>

        <Link to="/admin/must-watch">
          Back to Must Watch
        </Link>

      </div>
    );
  }

  return (
    <div className="content-form-page">

      <div className="content-form-header">

        <div>

          <Link
            to="/admin/must-watch"
            className="back-link"
          >
            ← Must Watch
          </Link>

          <h1>
            {video.title}
          </h1>

          <p>
            {video.videoSource}
          </p>

        </div>

        <Link
          to={`/admin/must-watch/${video.id}/edit`}
          className="primary-button"
        >
          Edit Video
        </Link>

      </div>

      <div className="view-card">

        <div className="video-view-thumbnail">

          {video.thumbnail && (
            <img
              src={video.thumbnail}
              alt={video.title}
            />
          )}

          <a
            href={video.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="large-play-button"
          >
            ▶
          </a>

        </div>

        <div className="view-content">

          <div className="view-top">

            <span className="category-badge">
              {video.videoSource}
            </span>

            <span
              className={`status-badge ${
                video.status === "Active"
                  ? "status-active"
                  : "status-inactive"
              }`}
            >

              <span />

              {video.status}

            </span>

          </div>

          <h2>
            {video.title}
          </h2>

          <p className="view-description">
            {video.description}
          </p>

          <div className="view-details">

            <div>

              <small>
                Featured
              </small>

              <strong>
                {video.featured
                  ? "Yes"
                  : "No"}
              </strong>

            </div>

            <div>

              <small>
                Homepage
              </small>

              <strong>
                {video.showOnHomepage
                  ? "Yes"
                  : "No"}
              </strong>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MustWatchView;

