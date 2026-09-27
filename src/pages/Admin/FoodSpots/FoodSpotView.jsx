import { Link, useParams } from "react-router-dom";

import { foodStore } from "../../../data/stores";

import "./FoodSpots.css";

const FoodSpotView = () => {
  const { id } = useParams();

  const food = foodStore.get().find(
    (item) =>
      String(item.id) === String(id)
  );

  if (!food) {
    return (
      <div className="food-not-found">

        <h2>
          Food spot not found
        </h2>

        <Link to="/admin/food-spots">
          Back to Food Spots
        </Link>

      </div>
    );
  }


  return (
    <div className="food-form-page">

      {/* HEADER */}

      <div className="food-form-header">

        <div>

          <Link
            to="/admin/food-spots"
            className="food-back-link"
          >
            ← Food Spots
          </Link>

          <h1>
            {food.name}
          </h1>

          <p>
            {food.address}
          </p>

        </div>


        <Link
          to={`/admin/food-spots/${food.id}/edit`}
          className="food-primary-button"
        >
          Edit Food Spot
        </Link>

      </div>


      {/* VIEW */}

      <div className="food-view-card">

        <div className="food-view-image">

          {food.image && (
            <img
              src={food.image}
              alt={food.name}
            />
          )}

        </div>


        <div className="food-view-content">

          <div className="food-view-top">

            <span className="food-category">
              {food.category}
            </span>

            <span
              className={`food-status ${
                food.status === "Active"
                  ? "active"
                  : "inactive"
              }`}
            >

              <span />

              {food.status}

            </span>

          </div>


          <h2>
            {food.name}
          </h2>


          <p className="food-view-description">
            {food.description}
          </p>


          <div className="food-view-details">

            <div>
              <small>
                Cuisine
              </small>

              <strong>
                {food.cuisine || "-"}
              </strong>
            </div>


            <div>
              <small>
                Speciality
              </small>

              <strong>
                {food.speciality || "-"}
              </strong>
            </div>


            <div>
              <small>
                Price
              </small>

              <strong>
                {food.priceRange}
              </strong>
            </div>


            <div>
              <small>
                Location
              </small>

              <strong>
                {food.area},{" "}
                {food.district}
              </strong>
            </div>

          </div>


          <div className="food-view-services">

            {food.vegetarian && (
              <span>
                Vegetarian
              </span>
            )}

            {food.nonVegetarian && (
              <span>
                Non-Vegetarian
              </span>
            )}

            {food.delivery && (
              <span>
                Delivery
              </span>
            )}

            {food.takeaway && (
              <span>
                Takeaway
              </span>
            )}

          </div>


          {food.mapsUrl && (
            <a
              href={food.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="food-map-button"
            >
              Open Google Maps →
            </a>
          )}

        </div>

      </div>

    </div>
  );
};

export default FoodSpotView;

