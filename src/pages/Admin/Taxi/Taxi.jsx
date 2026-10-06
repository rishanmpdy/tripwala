import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import { taxiStore } from "../../../data/stores";

import "./Taxi.css";

const Taxi = () => {
  const [taxis, setTaxisState] = useState(taxiStore.get() || []);

  const setTaxis = (updateFn) => {
    setTaxisState((prev) => {
      const next = typeof updateFn === "function" ? updateFn(prev) : updateFn;
      taxiStore.save(next);
      return next;
    });
  };

  useEffect(() => {
    const handleUpdate = () => setTaxisState(taxiStore.get() || []);
    window.addEventListener("tripwala-taxis-updated", handleUpdate);
    return () =>
      window.removeEventListener("tripwala-taxis-updated", handleUpdate);
  }, []);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTaxis = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return taxis.filter((taxi) => {
      const matchesSearch =
        !searchText ||
        taxi.name?.toLowerCase().includes(searchText) ||
        taxi.driverName?.toLowerCase().includes(searchText) ||
        taxi.location?.toLowerCase().includes(searchText) ||
        taxi.vehicleName?.toLowerCase().includes(searchText) ||
        taxi.vehicleNumber?.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || taxi.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [taxis, search, statusFilter]);

  const toggleStatus = (id) => {
    setTaxis((prev) =>
      prev.map((taxi) =>
        String(taxi.id) === String(id)
          ? {
              ...taxi,
              status: taxi.status === "Active" ? "Inactive" : "Active",
            }
          : taxi
      )
    );
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this taxi service?"
    );

    if (!confirmDelete) return;

    setTaxis((prev) => prev.filter((taxi) => String(taxi.id) !== String(id)));
  };

  return (
    <div className="admin-taxi-page">
      {/* PAGE HEADER */}
      <div className="taxi-page-header">
        <div>
          <h1>Taxi</h1>
          <p>Manage taxi services, vehicles, pricing and operators.</p>
        </div>

        <Link to="/admin/taxi/add" className="taxi-add-button">
          <span>+</span>
          Add Taxi
        </Link>
      </div>

      {/* FILTER BAR */}
      <div className="taxi-toolbar">
        <div className="taxi-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search taxi, driver, vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="taxi-status-filter"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <span className="taxi-count">{filteredTaxis.length} Taxis</span>
      </div>

      {/* TABLE */}
      <div className="taxi-table-wrapper">
        <table className="taxi-table">
          <thead>
            <tr>
              <th>Taxi</th>
              <th>Driver</th>
              <th>Vehicle</th>
              <th>Location</th>
              <th>Pricing</th>
              <th>Rating</th>
              <th>Status</th>
              <th className="action-heading">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTaxis.length > 0 ? (
              filteredTaxis.map((taxi) => (
                <tr key={taxi.id}>
                  {/* TAXI */}
                  <td>
                    <div className="taxi-info">
                      <div className="taxi-table-image">
                        {taxi.image ? (
                          <img
                            src={taxi.image}
                            alt={taxi.name}
                            className="taxi-table-thumb"
                          />
                        ) : (
                          <span className="taxi-table-no-img">No Image</span>
                        )}
                      </div>

                      <div className="taxi-item-info">
                        <strong>{taxi.name}</strong>
                        <span>#{taxi.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* DRIVER */}
                  <td>
                    <div className="driver-info">
                      <strong>{taxi.driverName || "-"}</strong>
                      <span>{taxi.phone || "-"}</span>
                    </div>
                  </td>

                  {/* VEHICLE */}
                  <td>
                    <div className="vehicle-info">
                      <strong>{taxi.vehicleName || "-"}</strong>
                      <span>{taxi.vehicleNumber || taxi.vehicleType || "-"}</span>
                    </div>
                  </td>

                  {/* LOCATION */}
                  <td>{taxi.location || "-"}</td>

                  {/* PRICE */}
                  <td>
                    <div className="price-info">
                      {taxi.pricePerKm ? (
                        <strong>₹{taxi.pricePerKm}/km</strong>
                      ) : null}
                      {taxi.pricePerDay ? (
                        <span>₹{taxi.pricePerDay}/day</span>
                      ) : null}
                      {!taxi.pricePerKm && !taxi.pricePerDay && (
                        <span>-</span>
                      )}
                    </div>
                  </td>

                  {/* RATING */}
                  <td>
                    <div className="rating-info">
                      <span>★</span>
                      {taxi.rating || "4.8"}
                      <small>({taxi.reviews || 0})</small>
                    </div>
                  </td>

                  {/* STATUS */}
                  <td>
                    <button
                      type="button"
                      className={`taxi-status ${
                        taxi.status === "Active" ? "active" : "inactive"
                      }`}
                      onClick={() => toggleStatus(taxi.id)}
                      title="Click to toggle status"
                    >
                      <span />
                      {taxi.status}
                    </button>
                  </td>

                  {/* ACTIONS */}
                  <td>
                    <div className="taxi-actions">
                      <Link
                        to={`/admin/taxi/view/${taxi.id}`}
                        className="taxi-action-button"
                      >
                        View
                      </Link>

                      <Link
                        to={`/admin/taxi/edit/${taxi.id}`}
                        className="taxi-action-button"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(taxi.id)}
                        className="taxi-action-button delete-action"
                        title="Delete taxi"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">
                  <div className="taxi-empty">
                    <div>⌕</div>
                    <h3>No taxis found</h3>
                    <p>Try changing your search or filter.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Taxi;
