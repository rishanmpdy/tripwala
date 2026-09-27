import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import foodSpotsData from "../../../data/admin/Places/foodSpots";

import "./FoodSpots.css";

const FoodSpots = () => {
  const [foodSpots, setFoodSpots] =
    useState(foodSpotsData);

  const [search, setSearch] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const filteredFoodSpots = useMemo(() => {
    const searchValue =
      search.toLowerCase().trim();

    return foodSpots.filter((food) => {
      const matchesSearch =
        !searchValue ||
        food.name
          .toLowerCase()
          .includes(searchValue) ||
        food.location
          ?.toLowerCase()
          .includes(searchValue) ||
        food.cuisine
          ?.toLowerCase()
          .includes(searchValue);

      const matchesCategory =
        categoryFilter === "All" ||
        food.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" ||
        food.status === statusFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    foodSpots,
    search,
    categoryFilter,
    statusFilter,
  ]);

  const toggleStatus = (id) => {
    setFoodSpots((current) =>
      current.map((food) =>
        food.id === id
          ? {
              ...food,
              status:
                food.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : food
      )
    );
  };

  const deleteFoodSpot = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this food spot?"
    );

    if (!confirmed) return;

    setFoodSpots((current) =>
      current.filter(
        (food) => food.id !== id
      )
    );
  };

  return (
    <div className="food-admin-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="food-page-header">

        <div>
          <h1>Food Spots</h1>

          <p>
            Manage restaurants, cafes, street
            food and other food destinations.
          </p>
        </div>

        <Link
          to="/admin/food-spots/new"
          className="food-primary-button"
        >
          <span>+</span>
          Add Food Spot
        </Link>

      </div>


      {/* =========================
          TOOLBAR
      ========================= */}

      <div className="food-toolbar">

        <div className="food-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search food spots..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
        >

          <option value="All">
            All Categories
          </option>

          <option value="Restaurant">
            Restaurant
          </option>

          <option value="Cafe">
            Cafe
          </option>

          <option value="Bakery">
            Bakery
          </option>

          <option value="Street Food">
            Street Food
          </option>

          <option value="Fast Food">
            Fast Food
          </option>

          <option value="Traditional Food">
            Traditional Food
          </option>

          <option value="Juice / Drinks">
            Juice / Drinks
          </option>

          <option value="Dessert">
            Dessert
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


        <span className="food-count">
          {filteredFoodSpots.length} Spots
        </span>

      </div>


      {/* =========================
          LISTING
      ========================= */}

      <div className="food-table-card">

        <table className="food-table">

          <thead>

            <tr>

              <th>Food Spot</th>

              <th>Category</th>

              <th>Location</th>

              <th>Price</th>

              <th>Status</th>

              <th className="food-actions-head">
                Actions
              </th>

            </tr>

          </thead>


          <tbody>

            {filteredFoodSpots.length > 0 ? (

              filteredFoodSpots.map((food) => (

                <tr key={food.id}>

                  {/* FOOD */}

                  <td>

                    <div className="food-item">

                      <div className="food-image">

                        {food.image && (
                          <img
                            src={food.image}
                            alt={food.name}
                          />
                        )}

                      </div>


                      <div className="food-item-info">

                        <strong>
                          {food.name}
                        </strong>

                        <p>
                          {food.speciality}
                        </p>

                      </div>

                    </div>

                  </td>


                  {/* CATEGORY */}

                  <td>

                    <span className="food-category">
                      {food.category}
                    </span>

                  </td>


                  {/* LOCATION */}

                  <td>

                    <span className="food-location">
                      {food.area},{" "}
                      {food.district}
                    </span>

                  </td>


                  {/* PRICE */}

                  <td>

                    <span className="food-price">
                      {food.priceRange}
                    </span>

                  </td>


                  {/* STATUS */}

                  <td>

                    <button
                      type="button"
                      className={`food-status ${
                        food.status === "Active"
                          ? "active"
                          : "inactive"
                      }`}
                      onClick={() =>
                        toggleStatus(food.id)
                      }
                    >

                      <span />

                      {food.status}

                    </button>

                  </td>


                  {/* ACTIONS */}

                  <td>

                    <div className="food-row-actions">

                      <Link
                        to={`/admin/food-spots/${food.id}`}
                      >
                        View
                      </Link>

                      <Link
                        to={`/admin/food-spots/${food.id}/edit`}
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          deleteFoodSpot(food.id)
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
                  colSpan="6"
                  className="food-empty"
                >

                  <strong>
                    No food spots found
                  </strong>

                  <span>
                    Try another search or add
                    a new food spot.
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

export default FoodSpots;
