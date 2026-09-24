import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import mustWatchData from "../../../data/mustWatch";

import "./MustWatch.css";

const MustWatch = () => {
  const [videos, setVideos] =
    useState(mustWatchData);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const filteredVideos = useMemo(() => {
    const value = search
      .toLowerCase()
      .trim();

    return videos.filter((video) => {

      const matchesSearch =
        !value ||
        video.title
          .toLowerCase()
          .includes(value) ||
        video.videoSource
          .toLowerCase()
          .includes(value);

      const matchesStatus =
        statusFilter === "All" ||
        video.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [videos, search, statusFilter]);

  const toggleStatus = (id) => {
    setVideos((current) =>
      current.map((video) =>
        video.id === id
          ? {
              ...video,
              status:
                video.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : video
      )
    );
  };

  const deleteVideo = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (!confirmed) return;

    setVideos((current) =>
      current.filter(
        (video) => video.id !== id
      )
    );
  };

  return (
    <div className="content-page must-watch-page">

      {/* HEADER */}

      <div className="content-page-header">

        <div>

          <h1>Must Watch</h1>

          <p>
            Manage featured travel videos and
            visual content.
          </p>

        </div>

        <Link
          to="/admin/must-watch/new"
          className="primary-button"
        >
          <span>+</span>
          Add Must Watch
        </Link>

      </div>

      {/* TOOLBAR */}

      <div className="content-toolbar">

        <div className="content-search">

          <span className="search-icon">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search videos..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <select
          className="content-filter"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >

          <option value="All">
            All Status
          </option>

          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>

        </select>

        <div className="content-count">
          {filteredVideos.length} Videos
        </div>

      </div>

      {/* TABLE */}

      <div className="content-table-card">

        <table className="content-table">

          <thead>

            <tr>

              <th>Video</th>

              <th>Source</th>

              <th>Related Content</th>

              <th>Status</th>

              <th className="actions-column">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredVideos.length > 0 ? (

              filteredVideos.map((video) => (

                <tr key={video.id}>

                  {/* VIDEO */}

                  <td>

                    <div className="content-item">

                      <div className="video-thumbnail">

                        {video.thumbnail && (
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                          />
                        )}

                        <span className="play-icon">
                          ▶
                        </span>

                      </div>

                      <div className="content-item-info">

                        <strong>
                          {video.title}
                        </strong>

                        <p>
                          {video.shortDescription}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* SOURCE */}

                  <td>

                    <span className="category-badge">
                      {video.videoSource}
                    </span>

                  </td>

                  {/* RELATED */}

                  <td>

                    <span className="location-text">
                      {video.relatedPlaceId ||
                      video.relatedHiddenSpotId
                        ? "Linked"
                        : "None"}
                    </span>

                  </td>

                  {/* STATUS */}

                  <td>

                    <button
                      type="button"
                      className={`status-badge ${
                        video.status === "Active"
                          ? "status-active"
                          : "status-inactive"
                      }`}
                      onClick={() =>
                        toggleStatus(video.id)
                      }
                    >

                      <span />

                      {video.status}

                    </button>

                  </td>

                  {/* ACTIONS */}

                  <td>

                    <div className="row-actions">

                      <Link
                        to={`/admin/must-watch/${video.id}`}
                        className="row-action"
                      >
                        View
                      </Link>

                      <Link
                        to={`/admin/must-watch/${video.id}/edit`}
                        className="row-action"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        className="row-action delete-action"
                        onClick={() =>
                          deleteVideo(video.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="empty-state"
                >

                  <strong>
                    No videos found
                  </strong>

                  <span>
                    Try another search or add
                    a new Must Watch item.
                  </span>

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default MustWatch;

