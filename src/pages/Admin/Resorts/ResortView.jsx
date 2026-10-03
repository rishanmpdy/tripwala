import { Link, useParams } from "react-router-dom";

import { resortStore } from "../../../data/stores";

import "./Resorts.css";

const ResortView = () => {

  const { id } = useParams();

  const resort = resortStore.get().find(
    (item) =>
      String(item.id) ===
      String(id)
  );


  if (!resort) {

    return (
      <div className="resort-not-found">

        <h2>
          Resort not found
        </h2>

        <Link to="/admin/resorts">
          Back to Resorts
        </Link>

      </div>
    );

  }


  return (
    <div className="resort-form-page">

      <div className="resort-form-header">

        <div>

          <Link
            to="/admin/resorts"
            className="resort-back-link"
          >
            ← Resorts
          </Link>

          <h1>
            {resort.name}
          </h1>

          <p>
            {resort.address}
          </p>

        </div>


        <Link
          to={`/admin/resorts/${resort.id}/edit`}
          className="resort-primary-button"
        >
          Edit Resort
        </Link>

      </div>


      <div className="resort-view-card">

        <div className="resort-view-image">

          <img
            src={resort.image}
            alt={resort.name}
          />

        </div>


        <div className="resort-view-content">

          <div className="resort-view-top">

            <span className="resort-type">
              {resort.type}
            </span>

            <span
              className={`resort-status ${
                resort.status ===
                "Active"
                  ? "active"
                  : "inactive"
              }`}
            >

              <span />

              {resort.status}

            </span>

          </div>


          <h2>
            {resort.name}
          </h2>


          <p className="resort-view-description">
            {resort.description}
          </p>


          <div className="resort-view-details">
            <div>
              <small>Rooms</small>
              <strong>{resort.rooms || "—"}</strong>
            </div>

            <div>
              <small>Guests</small>
              <strong>{resort.guests || "—"}</strong>
            </div>

            <div>
              <small>Price</small>
              <strong>{resort.priceRange || "—"}</strong>
            </div>

            <div>
              <small>Location</small>
              <strong>{resort.area || resort.district ? `${resort.area || ""}${resort.area && resort.district ? ", " : ""}${resort.district || ""}` : resort.location || "—"}</strong>
            </div>

            <div>
              <small>Resort Phone (Private Admin)</small>
              <strong>{resort.resortPhone || resort.phone || resort.contact?.phone || "—"}</strong>
            </div>

            <div>
              <small>Enquiry Routing Mode</small>
              <strong style={{ color: "#0284c7" }}>
                {resort.enquiryTargetType === "resort" ? "Direct Resort" : resort.enquiryTargetType === "custom" ? "Custom Number" : "Agent Number"}
              </strong>
            </div>

            <div>
              <small>Enquiry WhatsApp Recipient</small>
              <strong style={{ color: "#16a34a" }}>{resort.whatsapp || resort.agentPhone || "—"}</strong>
            </div>
          </div>


          <div className="resort-view-facilities">

            {resort.facilities.map(
              (facility) => (

                <span
                  key={facility}
                >
                  {facility}
                </span>

              )
            )}

          </div>


          {resort.mapsUrl && (

            <a
              href={resort.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="resort-map-button"
            >
              Open Google Maps →
            </a>

          )}

        </div>

      </div>

    </div>
  );
};

export default ResortView;

