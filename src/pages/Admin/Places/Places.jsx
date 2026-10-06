import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { placeStore } from "../../../data/stores";
import "./Places.css";

const categoryOf = (place) => place.category || place.type || "Uncategorised";
const statusOf = (place) => place.status || "Active";

const Places = () => {
  const [places, setPlaces] = useState(() => placeStore.get());

  useEffect(() => {
    const handleUpdate = () => setPlaces(placeStore.get());
    window.addEventListener("tripwala-places-updated", handleUpdate);
    return () => window.removeEventListener("tripwala-places-updated", handleUpdate);
  }, []);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredPlaces = useMemo(() => {
    const value = search.toLowerCase().trim();
    return places.filter((place) => {
      const matchesSearch =
        !value ||
        [place.name, categoryOf(place), place.location, place.district]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(value));
      const matchesStatus =
        statusFilter === "All" || statusOf(place) === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [places, search, statusFilter]);

  const updatePlaces = (next) => {
    setPlaces(next);
    placeStore.save(next);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this place?")) {
      updatePlaces(places.filter((place) => String(place.id) !== String(id)));
    }
  };

  const handleToggleStatus = (id) => {
    updatePlaces(
      places.map((place) =>
        String(place.id) === String(id)
          ? {
              ...place,
              status: statusOf(place) === "Active" ? "Inactive" : "Active",
            }
          : place
      )
    );
  };

  return (
    <div className="places-admin">
      <div className="places-page-header">
        <div>
          <h2>Places</h2>
          <p>Manage tourist places, guide details, and coordinates in Tripwala.</p>
        </div>
        <Link to="/admin/places/new" className="places-add-btn">
          <span>+</span>Add Place
        </Link>
      </div>

      <div className="places-toolbar">
        <div className="places-search">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Search place, category, or location..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              height: "40px",
              padding: "0 10px",
              border: "1px solid #e5e5e5",
              borderRadius: "8px",
              background: "#fff",
              fontSize: "12px",
              color: "#333",
            }}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="places-count">{filteredPlaces.length} Places</div>
        </div>
      </div>

      <div className="places-table-wrapper">
        <table className="places-table">
          <thead>
            <tr>
              <th>Place</th>
              <th>Category</th>
              <th>Location</th>
              <th>Entry & Timings</th>
              <th>Status</th>
              <th className="places-action-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlaces.length ? (
              filteredPlaces.map((place) => {
                const cover = place.image || place.images?.[0] || place.gallery?.[0];
                return (
                  <tr key={place.id}>
                    <td>
                      <div className="place-table-info">
                        <div className="place-table-image">
                          {cover ? (
                            <img src={typeof cover === "object" ? cover.url : cover} alt={place.name} />
                          ) : (
                            <span>IMG</span>
                          )}
                        </div>
                        <div>
                          <strong>{place.name}</strong>
                          <p>{place.overview || place.description}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="place-category">{categoryOf(place)}</span>
                    </td>
                    <td>
                      <span className="place-location">{place.location}</span>
                    </td>
                    <td>
                      <div style={{ fontSize: "11px", display: "flex", flexDirection: "column", gap: "2px" }}>
                        <span style={{ fontWeight: "600", color: "#333" }}>{place.entryFee || "Free Entry"}</span>
                        <span style={{ color: "#777" }}>{place.openingTime || place.duration || "Open"}</span>
                      </div>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={`place-status ${statusOf(place).toLowerCase()}`}
                        onClick={() => handleToggleStatus(place.id)}
                        title="Click to toggle status"
                      >
                        <span />
                        {statusOf(place)}
                      </button>
                    </td>
                    <td>
                      <div className="place-actions">
                        <Link to={`/admin/places/${place.id}`} className="place-action view">
                          View
                        </Link>
                        <Link to={`/admin/places/${place.id}/edit`} className="place-action edit">
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="place-action delete"
                          onClick={() => handleDelete(place.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="places-empty">
                  <strong>No places found</strong>
                  <span>Try another search or add a new place.</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Places;
