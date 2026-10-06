import { Link, useParams } from "react-router-dom";
import { taxiStore } from "../../../data/stores";
import "./TaxiView.css";

const TaxiView = () => {
  const { id } = useParams();

  const taxi = taxiStore.get().find(
    (item) => String(item.id) === String(id)
  );

  if (!taxi) {
    return (
      <div className="taxi-view-empty">
        <h2>Taxi not found</h2>
        <p>The taxi service you are looking for does not exist or has been removed.</p>
        <Link to="/admin/taxi">Back to Taxi</Link>
      </div>
    );
  }

  const features = Array.isArray(taxi.features) ? taxi.features : [];

  return (
    <div className="taxi-view-page">
      {/* HEADER */}
      <div className="taxi-view-header">
        <div>
          <Link to="/admin/taxi" className="taxi-back">
            ← Back to Taxi
          </Link>
          <h1>{taxi.name}</h1>
          <p>{taxi.vehicleName} • {taxi.location || "Wayanad"}</p>
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
          {taxi.image ? (
            <img src={taxi.image} alt={taxi.name} />
          ) : (
            <div style={{ height: "320px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0", color: "#888" }}>
              No Vehicle Image
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="taxi-view-card">
          <div className="view-card-header">
            <h2>Service Information</h2>
            <span
              className={`taxi-status ${
                taxi.status === "Active" ? "active" : "inactive"
              }`}
            >
              <span />
              {taxi.status}
            </span>
          </div>

          <div className="view-info-grid">
            <div>
              <small>Driver Name</small>
              <strong>{taxi.driverName || "—"}</strong>
            </div>

            <div>
              <small>Phone Number</small>
              <strong>
                {taxi.phone ? (
                  <a href={`tel:${taxi.phone}`} style={{ color: "#111" }}>
                    {taxi.phone}
                  </a>
                ) : (
                  "—"
                )}
              </strong>
            </div>

            <div>
              <small>WhatsApp</small>
              <strong>
                {taxi.whatsapp ? (
                  <a
                    href={`https://wa.me/${taxi.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#16a34a" }}
                  >
                    {taxi.whatsapp} ↗
                  </a>
                ) : (
                  "—"
                )}
              </strong>
            </div>

            <div>
              <small>Vehicle Model</small>
              <strong>{taxi.vehicleName || "—"}</strong>
            </div>

            <div>
              <small>Vehicle Number</small>
              <strong>{taxi.vehicleNumber || "—"}</strong>
            </div>

            <div>
              <small>Vehicle Type</small>
              <strong>{taxi.vehicleType || "Sedan / SUV"}</strong>
            </div>

            <div>
              <small>Location / Base</small>
              <strong>
                {taxi.location || "—"}
                {taxi.district ? `, ${taxi.district}` : ""}
              </strong>
            </div>

            <div>
              <small>State</small>
              <strong>{taxi.state || "Kerala"}</strong>
            </div>

            <div>
              <small>Rate / Kilometer</small>
              <strong style={{ color: "#0284c7" }}>
                {taxi.pricePerKm ? `₹${taxi.pricePerKm}/km` : "—"}
              </strong>
            </div>

            <div>
              <small>Rate / Full Day</small>
              <strong style={{ color: "#0284c7" }}>
                {taxi.pricePerDay ? `₹${taxi.pricePerDay}/day` : "—"}
              </strong>
            </div>

            <div>
              <small>Rating</small>
              <strong style={{ color: "#b45309" }}>★ {taxi.rating || "4.8"}</strong>
            </div>

            <div>
              <small>Total Trips / Reviews</small>
              <strong>{taxi.reviews || "0"} reviews</strong>
            </div>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      {taxi.description && (
        <div className="taxi-view-section">
          <h2>About Service</h2>
          <p>{taxi.description}</p>
        </div>
      )}

      {/* FEATURES */}
      {features.length > 0 && (
        <div className="taxi-view-section">
          <h2>Features & Inclusions</h2>
          <div className="view-features">
            {features.map((feature) => (
              <span key={feature}>{feature}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxiView;
