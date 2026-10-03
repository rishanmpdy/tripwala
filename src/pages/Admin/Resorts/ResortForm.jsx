import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { resortStore } from "../../../data/stores";

import "./Resorts.css";

const ResortForm = () => {

  const { id } = useParams();

  const navigate = useNavigate();


  const existingResort = id
    ? resortStore.get().find(
        (item) =>
          String(item.id) ===
          String(id)
      )
    : null;


  const [form, setForm] = useState(() => {
    if (existingResort) {
      return {
        ...existingResort,
        enquiryTargetType: existingResort.enquiryTargetType || "agent",
        agentPhone: existingResort.agentPhone || "+91 94471 88990",
        resortPhone: existingResort.resortPhone || existingResort.phone || existingResort.contact?.phone || "",
        customPhone: existingResort.customPhone || "",
        phone: existingResort.resortPhone || existingResort.phone || existingResort.contact?.phone || "",
        whatsapp: existingResort.whatsapp || existingResort.contact?.whatsapp || "+91 94471 88990",
        email: existingResort.email || existingResort.contact?.email || "",
        website: existingResort.website || existingResort.contact?.website || "",
        instagram: existingResort.instagram || existingResort.contact?.instagram || "",
      };
    }
    return {
      name: "",
      type: "",
      shortDescription: "",
      description: "",
      priceRange: "₹₹",
      image: "",
      gallery: [],
      address: "",
      area: "",
      district: "",
      latitude: "",
      longitude: "",
      mapsUrl: "",
      rooms: "",
      roomTypes: "",
      guests: "",
      checkIn: "02:00 PM",
      checkOut: "11:00 AM",
      minimumStay: 1,
      enquiryTargetType: "agent",
      agentPhone: "+91 94471 88990",
      resortPhone: "",
      customPhone: "",
      phone: "",
      whatsapp: "+91 94471 88990",
      email: "",
      website: "",
      instagram: "",
      facilities: [],
      status: "Active",
      featured: false,
      showOnHomepage: false,
    };
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleFacility = (facility) => {
    setForm((current) => {
      const exists = current.facilities.includes(facility);
      return {
        ...current,
        facilities: exists
          ? current.facilities.filter((item) => item !== facility)
          : [...current.facilities, facility],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Resort name is required.");
      return;
    }

    if (!form.type) {
      alert("Please select resort type.");
      return;
    }

    if (!form.address.trim()) {
      alert("Address is required.");
      return;
    }

    const currentResorts = resortStore.get() || [];
    const resortId = existingResort?.id || Date.now();
    
    // Determine effective WhatsApp recipient based on admin routing choice
    const activeWhatsapp =
      form.enquiryTargetType === "agent"
        ? (form.agentPhone?.trim() || "+91 94471 88990")
        : form.enquiryTargetType === "resort"
        ? (form.resortPhone?.trim() || form.phone?.trim() || "")
        : (form.customPhone?.trim() || form.agentPhone?.trim() || "");

    const privateResortPhone = form.resortPhone?.trim() || form.phone?.trim() || "";

    const resortDataToSave = {
      ...existingResort,
      ...form,
      id: resortId,
      name: form.name.trim(),
      enquiryTargetType: form.enquiryTargetType || "agent",
      agentPhone: form.agentPhone?.trim() || "+91 94471 88990",
      resortPhone: privateResortPhone,
      customPhone: form.customPhone?.trim() || "",
      phone: privateResortPhone,
      whatsapp: activeWhatsapp,
      email: form.email?.trim() || "",
      website: form.website?.trim() || "",
      instagram: form.instagram?.trim() || "",
      contact: {
        phone: privateResortPhone,
        whatsapp: activeWhatsapp,
        email: form.email?.trim() || "",
        website: form.website?.trim() || "",
        address: form.address?.trim() || ""
      }
    };

    if (existingResort) {
      const updatedList = currentResorts.map((r) =>
        String(r.id) === String(id) ? resortDataToSave : r
      );
      resortStore.save(updatedList);
    } else {
      resortStore.save([...currentResorts, resortDataToSave]);
    }

    navigate("/admin/resorts");
  };


  const facilities = [
    "Swimming Pool",
    "Restaurant",
    "Parking",
    "Wi-Fi",
    "AC",
    "Room Service",
    "Campfire",
    "Spa",
    "Gym",
    "Pet Friendly",
    "Mountain View",
    "Garden",
  ];


  return (
    <div className="resort-form-page">

      {/* HEADER */}

      <div className="resort-form-header">

        <div>

          <Link
            to="/admin/resorts"
            className="resort-back-link"
          >
            ← Resorts
          </Link>

          <h1>
            {existingResort
              ? "Edit Resort"
              : "Add Resort"}
          </h1>

          <p>
            {existingResort
              ? "Update resort information."
              : "Add a new resort property."}
          </p>

        </div>


        <div className="resort-form-actions">

          <Link
            to="/admin/resorts"
            className="resort-secondary-button"
          >
            Cancel
          </Link>

          <button
            type="submit"
            form="resort-form"
            className="resort-primary-button"
          >
            {existingResort
              ? "Update Resort"
              : "Create Resort"}
          </button>

        </div>

      </div>


      <form
        id="resort-form"
        className="resort-form-card"
        onSubmit={handleSubmit}
      >

        {/* BASIC */}

        <section className="resort-form-section">

          <div className="resort-section-title">

            <div>

              <h2>
                Basic Information
              </h2>

              <p>
                Main resort information
              </p>

            </div>

            <span>
              Required
            </span>

          </div>


          <div className="resort-form-grid">

            <div className="resort-field full">

              <label>
                Resort Name *
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Example: Mountain Mist Resort"
              />

            </div>


            <div className="resort-field">

              <label>
                Resort Type *
              </label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
              >

                <option value="">
                  Select Type
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

            </div>


            <div className="resort-field">

              <label>
                Price Range
              </label>

              <select
                name="priceRange"
                value={form.priceRange}
                onChange={handleChange}
              >

                <option value="₹">
                  ₹ — Budget
                </option>

                <option value="₹₹">
                  ₹₹ — Moderate
                </option>

                <option value="₹₹₹">
                  ₹₹₹ — Premium
                </option>

                <option value="₹₹₹₹">
                  ₹₹₹₹ — Luxury
                </option>

              </select>

            </div>


            <div className="resort-field full">

              <label>
                Short Description
              </label>

              <input
                name="shortDescription"
                value={
                  form.shortDescription
                }
                onChange={handleChange}
                placeholder="Short description for listing"
              />

            </div>


            <div className="resort-field full">

              <label>
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="6"
                placeholder="Detailed resort description..."
              />

            </div>

          </div>

        </section>


        {/* LOCATION */}

        <section className="resort-form-section">

          <div className="resort-section-title">

            <div>

              <h2>
                Location
              </h2>

              <p>
                Resort location details
              </p>

            </div>

          </div>


          <div className="resort-form-grid">

            <div className="resort-field full">

              <label>
                Address *
              </label>

              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Full address"
              />

            </div>


            <div className="resort-field">

              <label>
                Area
              </label>

              <input
                name="area"
                value={form.area}
                onChange={handleChange}
                placeholder="Vythiri"
              />

            </div>


            <div className="resort-field">

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


            <div className="resort-field">

              <label>
                Latitude
              </label>

              <input
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                placeholder="11.5520"
              />

            </div>


            <div className="resort-field">

              <label>
                Longitude
              </label>

              <input
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                placeholder="76.0390"
              />

            </div>


            <div className="resort-field full">

              <label>
                Google Maps URL
              </label>

              <input
                name="mapsUrl"
                value={form.mapsUrl}
                onChange={handleChange}
                placeholder="https://maps.google.com/..."
              />

            </div>

          </div>

        </section>


        {/* STAY */}

        <section className="resort-form-section">

          <div className="resort-section-title">

            <div>

              <h2>
                Stay Information
              </h2>

              <p>
                Room and guest information
              </p>

            </div>

          </div>


          <div className="resort-form-grid">

            <div className="resort-field">

              <label>
                Number of Rooms
              </label>

              <input
                type="number"
                min="0"
                name="rooms"
                value={form.rooms}
                onChange={handleChange}
                placeholder="18"
              />

            </div>


            <div className="resort-field">

              <label>
                Maximum Guests
              </label>

              <input
                type="number"
                min="0"
                name="guests"
                value={form.guests}
                onChange={handleChange}
                placeholder="50"
              />

            </div>


            <div className="resort-field full">

              <label>
                Room Types
              </label>

              <input
                name="roomTypes"
                value={form.roomTypes}
                onChange={handleChange}
                placeholder="Deluxe, Suite, Family"
              />

            </div>


            <div className="resort-field">

              <label>
                Check-in
              </label>

              <input
                name="checkIn"
                value={form.checkIn}
                onChange={handleChange}
              />

            </div>


            <div className="resort-field">

              <label>
                Check-out
              </label>

              <input
                name="checkOut"
                value={form.checkOut}
                onChange={handleChange}
              />

            </div>


            <div className="resort-field">

              <label>
                Minimum Stay
              </label>

              <input
                type="number"
                min="1"
                name="minimumStay"
                value={
                  form.minimumStay
                }
                onChange={handleChange}
              />

            </div>

          </div>

        </section>


        {/* MEDIA */}

        <section className="resort-form-section">

          <div className="resort-section-title">

            <div>

              <h2>
                Media
              </h2>

              <p>
                Resort images and gallery
              </p>

            </div>

          </div>


          <div className="resort-form-grid">

            <div className="resort-field full">

              <label>
                Cover Image *
              </label>

              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="/images/resorts/resort.jpg"
              />

            </div>


            <div className="resort-field full">

              <label>
                Gallery Images
              </label>

              <textarea
                rows="5"
                value={form.gallery.join(
                  "\n"
                )}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,

                    gallery:
                      e.target.value
                        .split("\n")
                        .map((item) =>
                          item.trim()
                        )
                        .filter(Boolean),
                  }))
                }
                placeholder="One image URL per line"
              />

            </div>

          </div>

        </section>


        {/* FACILITIES */}

        <section className="resort-form-section">

          <div className="resort-section-title">

            <div>

              <h2>
                Facilities
              </h2>

              <p>
                Select available resort
                facilities
              </p>

            </div>

          </div>


          <div className="resort-facility-grid">

            {facilities.map(
              (facility) => (

                <label
                  key={facility}
                >

                  <input
                    type="checkbox"
                    checked={form.facilities.includes(
                      facility
                    )}
                    onChange={() =>
                      toggleFacility(
                        facility
                      )
                    }
                  />

                  {facility}

                </label>

              )
            )}

          </div>

        </section>


        {/* CONTACT */}

        {/* ENQUIRY ROUTING & RESORT CONTACT */}
        <section className="resort-form-section">
          <div className="resort-section-title">
            <div>
              <h2>Enquiry Routing & Resort Contact Settings</h2>
              <p>
                Configure where customer website WhatsApp enquiries are routed. Resort direct contact numbers are strictly kept private for admin only.
              </p>
            </div>
            <span style={{ background: "#e0f2fe", color: "#0369a1", border: "1px solid #bae6fd", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" }}>
              Enquiry Routing
            </span>
          </div>

          <div className="resort-form-grid">
            {/* 1. Routing Selector */}
            <div className="resort-field full" style={{ background: "#f8fafc", padding: "14px", borderRadius: "8px", border: "1.5px solid #e2e8f0" }}>
              <label style={{ fontSize: "12px", fontWeight: "700", color: "#0f172a", marginBottom: "8px", display: "block" }}>
                🎯 Send Customer WhatsApp Enquiries To:
              </label>
              <select
                name="enquiryTargetType"
                value={form.enquiryTargetType || "agent"}
                onChange={handleChange}
                style={{ fontSize: "13px", fontWeight: "600", padding: "8px 12px", width: "100%", borderRadius: "6px", border: "1px solid #cbd5e1" }}
              >
                <option value="agent">
                  My Agent / Admin Number (Customer enquiry comes to me first, then I connect with resort)
                </option>
                <option value="resort">
                  Direct Resort Number (Route directly to resort when agent is busy / direct booking)
                </option>
                <option value="custom">
                  Custom WhatsApp Number (Enter specific recipient number)
                </option>
              </select>
              <small style={{ color: "#64748b", fontSize: "11.5px", marginTop: "6px", display: "block" }}>
                {form.enquiryTargetType === "agent" && (
                  <span>✅ Customer details (Name, Phone number, dates, room category) will be sent to <strong>your WhatsApp number</strong>. The resort contact number stays completely hidden from the public.</span>
                )}
                {form.enquiryTargetType === "resort" && (
                  <span>⚡ Enquiries will be routed directly to the resort's WhatsApp number without exposing it on the public page.</span>
                )}
                {form.enquiryTargetType === "custom" && (
                  <span>⚙️ Enquiries will be routed to the custom WhatsApp number you enter below.</span>
                )}
              </small>
            </div>

            {/* Agent / Admin Number */}
            <div className="resort-field">
              <label>Agent / Admin WhatsApp Number *</label>
              <input
                name="agentPhone"
                value={form.agentPhone}
                onChange={handleChange}
                placeholder="+91 94471 88990"
              />
              <small style={{ color: "#059669", fontSize: "11px", marginTop: "3px", fontWeight: 600 }}>
                Your number to receive guest booking details
              </small>
            </div>

            {/* Resort Phone (Private) */}
            <div className="resort-field">
              <label>
                Resort Direct Contact Number *{" "}
                <span style={{ color: "#dc2626", fontSize: "10.5px", fontWeight: 600 }}>(Admin Only - Hidden from Public)</span>
              </label>
              <input
                name="resortPhone"
                value={form.resortPhone}
                onChange={handleChange}
                placeholder="+91 98470 12345"
              />
              <small style={{ color: "#64748b", fontSize: "11px", marginTop: "3px" }}>
                Resort management number for admin calling only
              </small>
            </div>

            {/* Custom Number if selected */}
            {form.enquiryTargetType === "custom" && (
              <div className="resort-field full">
                <label>Custom WhatsApp Number *</label>
                <input
                  name="customPhone"
                  value={form.customPhone || ""}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </div>
            )}

            {/* Active Routing Summary Badge */}
            <div className="resort-field full">
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "10px 14px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="material-symbols-outlined" style={{ color: "#16a34a", fontSize: "18px" }}>
                  check_circle
                </span>
                <span style={{ fontSize: "12px", color: "#166534" }}>
                  Currently Active Recipient: <strong>
                    {form.enquiryTargetType === "agent"
                      ? (form.agentPhone || "+91 94471 88990")
                      : form.enquiryTargetType === "resort"
                      ? (form.resortPhone || "Resort Phone")
                      : (form.customPhone || "Custom Phone")}
                  </strong> (Customer clicks "WhatsApp Enquiry" ➔ text sent directly here)
                </span>
              </div>
            </div>

            <div className="resort-field">
              <label>Official Email</label>
              <input
                type="email"
                name="email"
                value={form.email || ""}
                onChange={handleChange}
                placeholder="stay@resortname.com"
              />
            </div>

            <div className="resort-field">
              <label>Website URL</label>
              <input
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="https://www.resortname.com"
              />
            </div>

            <div className="resort-field full">
              <label>Instagram Handle</label>
              <input
                name="instagram"
                value={form.instagram}
                onChange={handleChange}
                placeholder="@resortname"
              />
            </div>
          </div>
        </section>


        {/* PUBLISHING */}

        <section className="resort-form-section">

          <div className="resort-section-title">

            <div>

              <h2>
                Publishing
              </h2>

              <p>
                Control website visibility
              </p>

            </div>

          </div>


          <div className="resort-publish-grid">

            <div className="resort-field">

              <label>
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

              </select>

            </div>


            <label className="resort-checkbox">

              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />

              Featured Resort

            </label>


            <label className="resort-checkbox">

              <input
                type="checkbox"
                name="showOnHomepage"
                checked={
                  form.showOnHomepage
                }
                onChange={handleChange}
              />

              Show on Homepage

            </label>

          </div>

        </section>

      </form>

    </div>
  );
};

export default ResortForm;

