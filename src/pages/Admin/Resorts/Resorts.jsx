import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { resortStore } from "../../../data/stores";
import "./Resorts.css";

const Resorts = () => {
  const [resorts, setResortsState] = useState(resortStore.get());
  const setResorts = (updateFn) => {
    setResortsState((prev) => {
       const next = typeof updateFn === "function" ? updateFn(prev) : updateFn;
       resortStore.save(next);
       return next;
    });
  };
  useEffect(() => {
    const handleUpdate = () => setResortsState(resortStore.get());
    window.addEventListener("tripwala-resorts-updated", handleUpdate);
    return () => window.removeEventListener("tripwala-resorts-updated", handleUpdate);
  }, []);

  const [search, setSearch] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");


  const filteredResorts = useMemo(() => {
    const value =
      search.toLowerCase().trim();

    return resorts.filter((resort) => {

      const matchesSearch =
        !value ||
        resort.name
          .toLowerCase()
          .includes(value) ||
        resort.area
          ?.toLowerCase()
          .includes(value) ||
        resort.district
          ?.toLowerCase()
          .includes(value);

      const matchesType =
        typeFilter === "All" ||
        resort.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" ||
        resort.status === statusFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      );
    });

  }, [
    resorts,
    search,
    typeFilter,
    statusFilter,
  ]);


  const toggleStatus = (id) => {

    setResorts((current) =>
      current.map((resort) =>
        resort.id === id
          ? {
              ...resort,
              status:
                resort.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : resort
      )
    );

  };


  const deleteResort = (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this resort?"
      );

    if (!confirmed) return;

    setResorts((current) =>
      current.filter(
        (resort) =>
          resort.id !== id
      )
    );

  };


  return (
    <div className="resort-admin-page">

      {/* HEADER */}

      <div className="resort-page-header">

        <div>

          <h1>
            Resorts
          </h1>

          <p>
            Manage resorts and resort
            properties.
          </p>

        </div>


        <Link
          to="/admin/resorts/new"
          className="resort-primary-button"
        >
          <span>+</span>
          Add Resort
        </Link>

      </div>


      {/* FILTERS */}

      <div className="resort-toolbar">

        <div className="resort-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search resorts..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value)
          }
        >

          <option value="All">
            All Types
          </option>

          <option value="Luxury Resort">
            Luxury Resort
          </option>

          <option value="Nature Resort">
            Nature Resort
          </option>

          <option value="Beach Resort">
            Beach Resort
          </option>

          <option value="Family Resort">
            Family Resort
          </option>

          <option value="Boutique Resort">
            Boutique Resort
          </option>

        </select>


        <select
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


        <span className="resort-count">
          {filteredResorts.length} Resorts
        </span>

      </div>


      {/* TABLE */}

      <div className="resort-table-card">

        <table className="resort-table">

          <thead>

            <tr>

              <th>Resort</th>

              <th>Type</th>

              <th>Location</th>

              <th>Rooms</th>

              <th>Price</th>

              <th>Status</th>

              <th className="resort-actions-head">
                Actions
              </th>

            </tr>

          </thead>


          <tbody>

            {filteredResorts.length > 0 ? (

              filteredResorts.map(
                (resort) => (

                  <tr key={resort.id}>

                    <td>

                      <div className="resort-item">

                        <div className="resort-table-image resort-image">

                          {resort.image && (
                            <img
                              src={resort.image}
                              alt={resort.name}
                              className="resort-table-thumb"
                            />
                          )}

                        </div>


                        <div className="resort-item-info">

                          <strong>
                            {resort.name}
                          </strong>

                          <p>
                            {resort.roomTypes}
                          </p>

                        </div>

                      </div>

                    </td>


                    <td>

                      <span className="resort-type">
                        {resort.type}
                      </span>

                    </td>


                    <td>

                      <span className="resort-location">
                        {resort.area},{" "}
                        {resort.district}
                      </span>

                    </td>


                    <td>

                      <span className="resort-rooms">
                        {resort.rooms}
                      </span>

                    </td>


                    <td>

                      <span className="resort-price">
                        {resort.priceRange}
                      </span>

                    </td>


                    <td>

                      <button
                        type="button"
                        className={`resort-status ${
                          resort.status ===
                          "Active"
                            ? "active"
                            : "inactive"
                        }`}
                        onClick={() =>
                          toggleStatus(
                            resort.id
                          )
                        }
                      >

                        <span />

                        {resort.status}

                      </button>

                    </td>


                    <td>

                      <div className="resort-row-actions">

                        <Link
                          to={`/admin/resorts/${resort.id}`}
                        >
                          View
                        </Link>

                        <Link
                          to={`/admin/resorts/${resort.id}/edit`}
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            deleteResort(
                              resort.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan="7"
                  className="resort-empty"
                >

                  <strong>
                    No resorts found
                  </strong>

                  <span>
                    Try another search or
                    add a new resort.
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

export default Resorts;



