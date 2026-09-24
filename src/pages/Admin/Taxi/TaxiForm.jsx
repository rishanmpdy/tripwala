import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import taxiData from "../../../data/admin/Places/taxiData";

import "./TaxiForm.css";

const TaxiForm = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = Boolean(id);

  const existingTaxi = taxiData.find(
    (taxi) => taxi.id === Number(id)
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

      const exists =
        current.features.includes(feature);

      return {
        ...current,

        features: exists
          ? current.features.filter(
              (item) => item !== feature
            )
          : [...current.features, feature],
      };

    });
  };


  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(
      isEdit
        ? "Update Taxi:"
        : "Create Taxi:",
      form
    );

    navigate("/admin/taxi");
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


            <div className="form-field">

              <label>
                Main Image URL
              </label>

              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="/images/taxi/taxi-1.jpg"
              />

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
                  checked={form.features.includes(
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
