import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { homestayStore } from "../../../data/stores";

import "./Homestays.css";

const Homestays = () => {

  const [homestays, setHomestaysState] = useState(homestayStore.get());
  const setHomestays = (updateFn) => {
    setHomestaysState((prev) => {
       const next = typeof updateFn === "function" ? updateFn(prev) : updateFn;
       homestayStore.save(next);
       return next;
    });
  };
  useEffect(() => {
    const handleUpdate = () => setHomestaysState(homestayStore.get());
    window.addEventListener("tripwala-homestays-updated", handleUpdate);
    return () => window.removeEventListener("tripwala-homestays-updated", handleUpdate);
  }, []);

  const [search, setSearch] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");


  const filteredHomestays =
    useMemo(() => {

      const value =
        search.toLowerCase().trim();

      return homestays.filter(
        (home) => {

          const matchesSearch =
            !value ||
            home.name
              .toLowerCase()
              .includes(value) ||
            home.area
              ?.toLowerCase()
              .includes(value) ||
            home.district
              ?.toLowerCase()
              .includes(value);

          const matchesType =
            typeFilter === "All" ||
            home.type === typeFilter;

          const matchesStatus =
            statusFilter === "All" ||
            home.status === statusFilter;

          return (
            matchesSearch &&
            matchesType &&
            matchesStatus
          );
        }
      );

    }, [
      homestays,
      search,
      typeFilter,
      statusFilter,
    ]);


  const toggleStatus = (id) => {

    setHomestays((current) =>
      current.map((home) =>
        home.id === id
          ? {
              ...home,
              status:
                home.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : home
      )
    );

  };


  const deleteHomestay = (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this homestay?"
      );

    if (!confirmed) return;

    setHomestays((current) =>
      current.filter(
        (home) =>
          home.id !== id
      )
    );

  };


  return (
    <div className="homestay-admin-page">

      <div className="homestay-page-header">

        <div>

          <h1>
            Homestays
          </h1>

          <p>
            Manage homestays and private
            accommodation.
          </p>

        </div>


        <Link
          to="/admin/homestays/new"
          className="homestay-primary-button"
        >
          <span>+</span>
          Add Homestay
        </Link>

      </div>


      <div className="homestay-toolbar">

        <div className="homestay-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search homestays..."
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

          <option value="Private Homestay">
            Private Homestay
          </option>

          <option value="Entire Home">
            Entire Home
          </option>

          <option value="Villa">
            Villa
          </option>

          <option value="Farm Stay">
            Farm Stay
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


        <span className="homestay-count">
          {filteredHomestays.length}
          {" "}Homestays
        </span>

      </div>


      <div className="homestay-table-card">

        <table className="homestay-table">

          <thead>

            <tr>

              <th>Homestay</th>

              <th>Type</th>

              <th>Location</th>

              <th>Guests</th>

              <th>Price</th>

              <th>Status</th>

              <th className="homestay-actions-head">
                Actions
              </th>

            </tr>

          </thead>


          <tbody>

            {filteredHomestays.length > 0 ? (

              filteredHomestays.map(
                (home) => (

                  <tr key={home.id}>

                    <td>

                      <div className="homestay-item">

                        <div className="homestay-image">

                          {home.image && (
                            <img
                              src={home.image}
                              alt={home.name}
                            />
                          )}

                        </div>


                        <div className="homestay-item-info">

                          <strong>
                            {home.name}
                          </strong>

                          <p>
                            {home.bedrooms}
                            {" "}Bedrooms
                          </p>

                        </div>

                      </div>

                    </td>


                    <td>

                      <span className="homestay-type">
                        {home.type}
                      </span>

                    </td>


                    <td>

                      <span className="homestay-location">
                        {home.area},{" "}
                        {home.district}
                      </span>

                    </td>


                    <td>

                      <span className="homestay-guests">
                        {home.guests}
                      </span>

                    </td>


                    <td>

                      <span className="homestay-price">
                        {home.priceRange}
                      </span>

                    </td>


                    <td>

                      <button
                        type="button"
                        className={`homestay-status ${
                          home.status ===
                          "Active"
                            ? "active"
                            : "inactive"
                        }`}
                        onClick={() =>
                          toggleStatus(
                            home.id
                          )
                        }
                      >

                        <span />

                        {home.status}

                      </button>

                    </td>


                    <td>

                      <div className="homestay-row-actions">

                        <Link
                          to={`/admin/homestays/${home.id}`}
                        >
                          View
                        </Link>

                        <Link
                          to={`/admin/homestays/${home.id}/edit`}
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            deleteHomestay(
                              home.id
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
                  className="homestay-empty"
                >

                  <strong>
                    No homestays found
                  </strong>

                  <span>
                    Try another search or add
                    a new homestay.
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

export default Homestays;



