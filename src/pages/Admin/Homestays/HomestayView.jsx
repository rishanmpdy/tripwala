import { Link, useParams } from "react-router-dom";

import { homestayStore } from "../../../data/stores";

import "./Homestays.css";

const HomestayView = () => {

  const { id } = useParams();

  const home = homestayStore.get().find(
    (item) =>
      String(item.id) ===
      String(id)
  );


  if (!home) {

    return (
      <div className="homestay-not-found">

        <h2>
          Homestay not found
        </h2>

        <Link to="/admin/homestays">
          Back to Homestays
        </Link>

      </div>
    );

  }


  return (
    <div className="homestay-form-page">

      <div className="homestay-form-header">

        <div>

          <Link
            to="/admin/homestays"
            className="homestay-back-link"
          >
            ← Homestays
          </Link>

          <h1>
            {home.name}
          </h1>

          <p>
            {home.address}
          </p>

        </div>


        <Link
          to={`/admin/homestays/${home.id}/edit`}
          className="homestay-primary-button"
        >
          Edit Homestay
        </Link>

      </div>


      <div className="homestay-view-card">

        <div className="homestay-view-image">

          <img
            src={home.image}
            alt={home.name}
          />

        </div>


        <div className="homestay-view-content">

          <div className="homestay-view-top">

            <span className="homestay-type">
              {home.type}
            </span>

            <span
              className={`homestay-status ${
                home.status ===
                "Active"
                  ? "active"
                  : "inactive"
              }`}
            >

              <span />

              {home.status}

            </span>

          </div>


          <h2>
            {home.name}
          </h2>


          <p className="homestay-view-description">
            {home.description}
          </p>


          <div className="homestay-view-details">

            <div>

              <small>
                Bedrooms
              </small>

              <strong>
                {home.bedrooms}
              </strong>

            </div>


            <div>

              <small>
                Beds
              </small>

              <strong>
                {home.beds}
              </strong>

            </div>


            <div>

              <small>
                Guests
              </small>

              <strong>
                {home.guests}
              </strong>

            </div>


            <div>

              <small>
                Location
              </small>

              <strong>
                {home.area},{" "}
                {home.district}
              </strong>

            </div>

          </div>


          <div className="homestay-view-facilities">

            {home.facilities.map(
              (facility) => (

                <span
                  key={facility}
                >
                  {facility}
                </span>

              )
            )}

          </div>


          {home.mapsUrl && (

            <a
              href={home.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="homestay-map-button"
            >
              Open Google Maps →
            </a>

          )}

        </div>

      </div>

    </div>
  );
};

export default HomestayView;

