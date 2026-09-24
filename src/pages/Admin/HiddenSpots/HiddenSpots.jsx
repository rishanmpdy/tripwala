import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import hiddenSpotsData from "../../../data/hiddenSpots";

import "./HiddenSpots.css";

const HiddenSpots = () => {
  const [spots, setSpots] = useState(hiddenSpotsData);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const filteredSpots = useMemo(() => {
    const searchValue = search
      .toLowerCase()
      .trim();

    return spots.filter((spot) => {
      const matchesSearch =
        !searchValue ||
        spot.name
          .toLowerCase()
          .includes(searchValue) ||
        spot.location
          .toLowerCase()
          .includes(searchValue) ||
        spot.category
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        spot.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [spots, search, statusFilter]);

  const toggleStatus = (id) => {
    setSpots((current) =>
      current.map((spot) =>
        spot.id === id
          ? {
              ...spot,
              status:
                spot.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : spot
      )
    );
  };

  const deleteSpot = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this hidden spot?"
    );

    if (!confirmed) return;

    setSpots((current) =>
      current.filter((spot) => spot.id !== id)
    );
  };

  return (
    <div className="content-page hidden-spots-page">

      {/* HEADER */}

      <div className="content-page-header">

        <div>
          <h1>Hidden Spots</h1>

          <p>
            Manage lesser-known destinations and
            hidden travel spots.
          </p>
        </div>

        <Link
          to="/admin/hidden-spots/new"
          className="primary-button"
        >
          <span>+</span>
          Add Hidden Spot
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
            placeholder="Search hidden spots..."
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
          {filteredSpots.length} Spots
        </div>

      </div>

      {/* TABLE */}

      <div className="content-table-card">

        <table className="content-table">

          <thead>
            <tr>

              <th>Hidden Spot</th>

              <th>Category</th>

              <th>Location</th>

              <th>Status</th>

              <th className="actions-column">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {filteredSpots.length > 0 ? (

              filteredSpots.map((spot) => (

                <tr key={spot.id}>

                  {/* SPOT */}

                  <td>

                    <div className="content-item">

                      <div className="content-image">

                        {spot.image ? (
                          <img
                            src={spot.image}
                            alt={spot.name}
                          />
                        ) : (
                          <span>
                            IMG
                          </span>
                        )}

                      </div>

                      <div className="content-item-info">

                        <strong>
                          {spot.name}
                        </strong>

                        <p>
                          {spot.shortDescription}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* CATEGORY */}

                  <td>

                    <span className="category-badge">
                      {spot.category}
                    </span>

                  </td>

                  {/* LOCATION */}

                  <td>

                    <span className="location-text">
                      {spot.location}
                    </span>

                  </td>

                  {/* STATUS */}

                  <td>

                    <button
                      type="button"
                      className={`status-badge ${
                        spot.status === "Active"
                          ? "status-active"
                          : "status-inactive"
                      }`}
                      onClick={() =>
                        toggleStatus(spot.id)
                      }
                    >
                      <span />

                      {spot.status}
                    </button>

                  </td>

                  {/* ACTIONS */}

                  <td>

                    <div className="row-actions">

                      <Link
                        to={`/admin/hidden-spots/${spot.id}`}
                        className="row-action"
                      >
                        View
                      </Link>

                      <Link
                        to={`/admin/hidden-spots/${spot.id}/edit`}
                        className="row-action"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        className="row-action delete-action"
                        onClick={() =>
                          deleteSpot(spot.id)
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
                    No hidden spots found
                  </strong>

                  <span>
                    Try another search or add
                    a new hidden spot.
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

export default HiddenSpots;

