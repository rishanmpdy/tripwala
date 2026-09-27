import { Link, useParams } from "react-router-dom";

import { taxiStore } from "../../../data/stores";

import "./TaxiView.css";

const TaxiView = () => {

  const { id } = useParams();

  const taxi = taxiStore.get().find(
    (item) => item.id === Number(id)
  );


  if (!taxi) {

    return (
      <div className="taxi-view-empty">

        <h2>
          Taxi not found
        </h2>

        <Link to="/admin/taxi">
          Back to Taxi
        </Link>

      </div>
    );

  }


  return (
    <div className="taxi-view-page">

      {/* HEADER */}

      <div className="taxi-view-header">

        <div>

          <Link
            to="/admin/taxi"
            className="taxi-back"
          >
            ← Back to Taxi
          </Link>

          <h1>
            {taxi.name}
          </h1>

          <p>
            Taxi service details
          </p>

        </div>


        <Link
          to={`/admin/taxi/edit/${taxi.id}`}
          className="taxi-edit-button"
        >
          Edit Taxi
        </Link>

      </div>


      {/* MAIN */}

      <div className="taxi-view-grid">

        {/* IMAGE */}

        <div className="taxi-view-image">

          <img
            src={taxi.image}
            alt={taxi.name}
          />

        </div>


        {/* INFO */}

        <div className="taxi-view-card">

          <div className="view-card-header">

            <h2>
              Service Information
            </h2>

            <span
              className={`taxi-status ${
                taxi.status === "Active"
                  ? "active"
                  : "inactive"
              }`}
            >
              {taxi.status}
            </span>

          </div>


          <div className="view-info-grid">

            <div>
              <small>
                Driver
              </small>

              <strong>
                {taxi.driverName}
              </strong>
            </div>


            <div>
              <small>
                Phone
              </small>

              <strong>
                {taxi.phone}
              </strong>
            </div>


            <div>
              <small>
                Vehicle
              </small>

              <strong>
                {taxi.vehicleName}
              </strong>
            </div>


            <div>
              <small>
                Vehicle Number
              </small>

              <strong>
                {taxi.vehicleNumber}
              </strong>
            </div>


            <div>
              <small>
                Vehicle Type
              </small>

              <strong>
                {taxi.vehicleType}
              </strong>
            </div>


            <div>
              <small>
                Location
              </small>

              <strong>
                {taxi.location}
              </strong>
            </div>


            <div>
              <small>
                Price / KM
              </small>

              <strong>
                ₹{taxi.pricePerKm}
              </strong>
            </div>


            <div>
              <small>
                Price / Day
              </small>

              <strong>
                ₹{taxi.pricePerDay}
              </strong>
            </div>


            <div>
              <small>
                Rating
              </small>

              <strong>
                ★ {taxi.rating}
              </strong>
            </div>


            <div>
              <small>
                Reviews
              </small>

              <strong>
                {taxi.reviews}
              </strong>
            </div>

          </div>

        </div>

      </div>


      {/* DESCRIPTION */}

      <div className="taxi-view-section">

        <h2>
          Description
        </h2>

        <p>
          {taxi.description}
        </p>

      </div>


      {/* FEATURES */}

      <div className="taxi-view-section">

        <h2>
          Features
        </h2>


        <div className="view-features">

          {taxi.features.map(
            (feature) => (

              <span key={feature}>
                {feature}
              </span>

            )
          )}

        </div>

      </div>

    </div>
  );
};

export default TaxiView;

