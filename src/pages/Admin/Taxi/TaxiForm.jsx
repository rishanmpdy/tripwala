import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { taxiStore } from "../../../data/stores";

import "./TaxiForm.css";

const TaxiForm = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = Boolean(id);

  const existingTaxi = taxiStore.get().find(
    (taxi) => String(taxi.id) === String(id)
  );


  const [form, setForm] = useState(
    existingTaxi || {
      name: "",
      driverName: "",
      phone: "",
      whatsapp: "",

      vehicleType: "SUV",
      vehicleName: "",
      vehicleNumber: "",

      location: "",
      district: "",
      state: "Kerala",

      image: "",

      pricePerKm: "",
      pricePerDay: "",

      rating: "",
      reviews: "",

      features: [],

      description: "",

      status: "Active",
    }
  );


  const featureList = [
    "AC",
    "Driver",
    "Airport Pickup",
    "Outstation",
    "Local Trips",
    "Tour Package",
    "24×7 Service",
  ];


  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };


  const handleFeatureChange = (feature) => {

    setForm((current) => {

      const features = Array.isArray(current.features) ? current.features : [];
      const exists =
        features.includes(feature);

      return {
        ...current,

        features: exists
          ? features.filter(
              (item) => item !== feature
            )
          : [...features, feature],
      };

    });
  };


  const handleCoverUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setForm((prev) => ({
        ...prev,
        image: event.target.result,
      }));
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = String(form.name ?? "").trim();
    const vehicleName = String(form.vehicleName ?? "").trim();
    if (!name || !vehicleName) {
      return alert("Taxi name and vehicle name are required.");
    }

    const currentTaxis = taxiStore.get();
    const taxiId = existingTaxi?.id ? existingTaxi.id : Date.now();

    const taxiDataToSave = {
      ...existingTaxi,
      ...form,
      id: taxiId,
      name,
      vehicleName,
    };

    const saved = taxiStore.save(
      existingTaxi
        ? currentTaxis.map((t) => (String(t.id) === String(id) ? taxiDataToSave : t))
        : [...currentTaxis, taxiDataToSave]
    );
    if (saved) navigate("/admin/taxi");
  };


  return (
    <div className="taxi-form-page">

      {/* HEADER */}

      <div className="taxi-form-header">

        <div>

          <Link
            to="/admin/taxi"
            className="taxi-back"
          >
            ← Back to Taxi
          </Link>

          <h1>
            {isEdit
              ? "Edit Taxi"
              : "Add Taxi"}
          </h1>

          <p>
            {isEdit
              ? "Update taxi service information."
              : "Add a new taxi service to Tripwala."}
          </p>

        </div>

      </div>


      <form
        className="taxi-form"
        onSubmit={handleSubmit}
      >

        {/* BASIC INFORMATION */}

        <section className="form-section">

          <div className="form-section-title">

            <h2>
              Basic Information
            </h2>

            <p>
              Main information displayed to users.
            </p>

          </div>


          <div className="form-grid">

            <div className="form-field full">

              <label>
                Taxi / Service Name *
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Example: Wayanad Taxi Service"
                required
              />

            </div>


            <div className="form-field">

              <label>
                Driver Name *
              </label>

              <input
                name="driverName"
                value={form.driverName}
                onChange={handleChange}
                placeholder="Driver name"
                required
              />

            </div>


            <div className="form-field">

              <label>
                Phone *
              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                required
              />

            </div>


            <div className="form-field">

              <label>
                WhatsApp
              </label>

              <input
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
              />

            </div>

          </div>

        </section>


        {/* VEHICLE */}

        <section className="form-section">

          <div className="form-section-title">

            <h2>
              Vehicle Information
            </h2>

            <p>
              Vehicle details shown on the taxi listing.
            </p>

          </div>


          <div className="form-grid">

            <div className="form-field">

              <label>
                Vehicle Type *
              </label>

              <select
                name="vehicleType"
                value={form.vehicleType}
                onChange={handleChange}
              >

                <option>SUV</option>
                <option>Sedan</option>
                <option>Hatchback</option>
                <option>Premium</option>
                <option>Van</option>
                <option>Tempo Traveller</option>

              </select>

            </div>


            <div className="form-field">

              <label>
                Vehicle Name *
              </label>

              <input
                name="vehicleName"
                value={form.vehicleName}
                onChange={handleChange}
                placeholder="Toyota Innova Crysta"
                required
              />

            </div>


            <div className="form-field">

              <label>
                Vehicle Number
              </label>

              <input
                name="vehicleNumber"
                value={form.vehicleNumber}
                onChange={handleChange}
                placeholder="KL 12 AB 1234"
              />

            </div>


            <div className="form-field full">

              <label>
                Vehicle Image
              </label>

              <div className="admin-media-upload-bar">
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="/images/taxi/taxi-1.jpg or choose file"
                  style={{ flex: 1 }}
                />
                <input
                  type="file"
                  accept="image/*"
                  id="taxi-cover-upload"
                  style={{ display: "none" }}
                  onChange={handleCoverUpload}
                />
                <label htmlFor="taxi-cover-upload" className="admin-choose-file-btn">
                  Choose File
                </label>
              </div>

              {form.image && (
                <div className="admin-cover-preview">
                  <div className="admin-cover-preview-thumb">
                    <img src={form.image} alt="Vehicle Preview" />
                  </div>
                  <div className="admin-cover-preview-info">
                    <span className="admin-cover-preview-name">
                      {form.image.startsWith("data:")
                        ? "Uploaded Vehicle Image"
                        : (form.image.split("/").pop().split("?")[0] || form.image)}
                    </span>
                    <span className="admin-cover-preview-sub">Vehicle photo selected</span>
                  </div>
                  <button
                    type="button"
                    className="admin-gallery-remove-btn"
                    onClick={() => setForm((prev) => ({ ...prev, image: "" }))}
                  >
                    Remove
                  </button>
                </div>
              )}

            </div>

          </div>

        </section>


        {/* LOCATION */}

        <section className="form-section">

          <div className="form-section-title">

            <h2>
              Location
            </h2>

            <p>
              Where this taxi service operates.
            </p>

          </div>


          <div className="form-grid">

            <div className="form-field full">

              <label>
                Location *
              </label>

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Kalpetta, Wayanad"
                required
              />

            </div>


            <div className="form-field">

              <label>
                District
              </label>

              <input
                name="district"
                value={form.district}
                onChange={handleChange}
                placeholder="Wayanad"
              />

            </div>


            <div className="form-field">

              <label>
                State
              </label>

              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="Kerala"
              />

            </div>

          </div>

        </section>


        {/* PRICING */}

        <section className="form-section">

          <div className="form-section-title">

            <h2>
              Pricing
            </h2>

            <p>
              Basic pricing information.
            </p>

          </div>


          <div className="form-grid">

            <div className="form-field">

              <label>
                Price Per KM
              </label>

              <input
                type="number"
                name="pricePerKm"
                value={form.pricePerKm}
                onChange={handleChange}
                placeholder="18"
                min="0"
              />

            </div>


            <div className="form-field">

              <label>
                Price Per Day
              </label>

              <input
                type="number"
                name="pricePerDay"
                value={form.pricePerDay}
                onChange={handleChange}
                placeholder="2500"
                min="0"
              />

            </div>

          </div>

        </section>


        {/* FEATURES */}

        <section className="form-section">

          <div className="form-section-title">

            <h2>
              Features
            </h2>

            <p>
              Select facilities available with this taxi.
            </p>

          </div>


          <div className="feature-checkboxes">

            {featureList.map((feature) => (

              <label
                key={feature}
                className="feature-checkbox"
              >

                <input
                  type="checkbox"
                  checked={(form.features || []).includes(
                    feature
                  )}
                  onChange={() =>
                    handleFeatureChange(feature)
                  }
                />

                <span>
                  {feature}
                </span>

              </label>

            ))}

          </div>

        </section>


        {/* DESCRIPTION */}

        <section className="form-section">

          <div className="form-section-title">

            <h2>
              Description
            </h2>

          </div>


          <div className="form-field">

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write a short description about this taxi service..."
              rows="5"
            />

          </div>

        </section>


        {/* STATUS */}

        <section className="form-section">

          <div className="form-section-title">

            <h2>
              Status
            </h2>

          </div>


          <div className="status-options">

            <label>

              <input
                type="radio"
                name="status"
                value="Active"
                checked={
                  form.status === "Active"
                }
                onChange={handleChange}
              />

              Active

            </label>


            <label>

              <input
                type="radio"
                name="status"
                value="Inactive"
                checked={
                  form.status === "Inactive"
                }
                onChange={handleChange}
              />

              Inactive

            </label>

          </div>

        </section>


        {/* ACTIONS */}

        <div className="taxi-form-actions">

          <Link
            to="/admin/taxi"
            className="cancel-button"
          >
            Cancel
          </Link>


          <button
            type="submit"
            className="save-button"
          >
            {isEdit
              ? "Update Taxi"
              : "Save Taxi"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default TaxiForm;

