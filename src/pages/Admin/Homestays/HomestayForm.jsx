import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { homestayStore, contactNumberStore } from "../../../data/stores";

import "./Homestays.css";

const getNextHomeId = (existingId) => existingId || `homestay-${Date.now()}`;

const HomestayForm = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const configuredContacts = (contactNumberStore.get() || []).filter(
    (c) => c.status === "Active" && (c.category === "Homestays" || c.category === "All")
  );
  const defaultHomestayContact =
    configuredContacts.find((c) => c.isDefaultHomestays) || configuredContacts[0];

  const existingHome = id
    ? homestayStore.get().find(
        (item) =>
          String(item.id) ===
          String(id)
      )
    : null;


  const [form, setForm] = useState(
    existingHome
      ? {
          ...existingHome,
          enquiryTargetType:
            existingHome.enquiryTargetType ||
            (existingHome.enquiryContactId ? existingHome.enquiryContactId : (defaultHomestayContact ? defaultHomestayContact.id : "host")),
          enquiryContactId:
            existingHome.enquiryContactId || (defaultHomestayContact ? defaultHomestayContact.id : ""),
          customPhone: existingHome.customPhone || "",
          hostPhone: existingHome.hostPhone || existingHome.phone || "",
          phone: existingHome.hostPhone || existingHome.phone || "",
          whatsapp: existingHome.whatsapp || defaultHomestayContact?.whatsapp || "+91 94471 88990",
          facilities: Array.isArray(existingHome.facilities) ? existingHome.facilities : [],
          gallery: Array.isArray(existingHome.gallery) ? existingHome.gallery : [],
        }
      : {
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
          bedrooms: "",
          beds: "",
          guests: "",
          checkIn: "02:00 PM",
          checkOut: "11:00 AM",
          minimumStay: 1,
          enquiryTargetType: defaultHomestayContact ? defaultHomestayContact.id : "host",
          enquiryContactId: defaultHomestayContact ? defaultHomestayContact.id : "",
          customPhone: "",
          hostPhone: "",
          phone: "",
          whatsapp: defaultHomestayContact ? defaultHomestayContact.whatsapp : "+91 94471 88990",
          website: "",
          instagram: "",
          facilities: [],
          status: "Active",
          featured: false,
          showOnHomepage: false,
        }
  );

  const [galleryUrlInput, setGalleryUrlInput] = useState("");

  const parseGalleryItem = (item, index) => {
    if (typeof item === "object" && item !== null) {
      return {
        id: item.id || `gallery-${index}`,
        url: item.url || "",
        name:
          item.name ||
          (item.url ? item.url.split("/").pop().split("?")[0] : `Image ${index + 1}`),
      };
    }
    const url = String(item || "");
    const name = url.startsWith("data:")
      ? `Uploaded-Image-${index + 1}.png`
      : url.split("/").pop().split("?")[0] || `Image ${index + 1}`;
    return {
      id: `gallery-${index}`,
      url,
      name,
    };
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

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach((file, i) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newItem = {
          id: `upload-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
          url: event.target.result,
          name: file.name,
        };
        setForm((prev) => ({
          ...prev,
          gallery: [
            ...(Array.isArray(prev.gallery) ? prev.gallery : []),
            newItem,
          ],
        }));
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const handleAddGalleryUrl = () => {
    if (!galleryUrlInput.trim()) return;
    const url = galleryUrlInput.trim();
    const name = url.split("/").pop().split("?")[0] || "Online Image";
    setForm((prev) => ({
      ...prev,
      gallery: [
        ...(Array.isArray(prev.gallery) ? prev.gallery : []),
        {
          id: `url-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          url,
          name,
        },
      ],
    }));
    setGalleryUrlInput("");
  };

  const handleRemoveGalleryImage = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      gallery: (Array.isArray(prev.gallery) ? prev.gallery : []).filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };



  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((current) => ({
      ...current,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

  };


  const toggleFacility = (
    facility
  ) => {

    setForm((current) => {

      const exists =
        (current.facilities || []).includes(
          facility
        );

      return {
        ...current,

        facilities: exists
          ? current.facilities.filter(
              (item) =>
                item !== facility
            )
          : [
              ...current.facilities,
              facility,
            ],
      };

    });

  };


  const handleSubmit = (e) => {

    e.preventDefault();


    const clean = (value) => String(value ?? "").trim();

    if (!clean(form.name)) {
      alert(
        "Homestay name is required."
      );
      return;
    }


    if (!form.type) {
      alert(
        "Please select property type."
      );
      return;
    }


    if (!clean(form.address)) {
      alert(
        "Address is required."
      );
      return;
    }


    const currentHomes = homestayStore.get();
    const homeId = getNextHomeId(existingHome?.id);

    const matchedContact = configuredContacts.find(
      (c) => c.id === form.enquiryTargetType || c.id === form.enquiryContactId
    );

    let activeWhatsapp = "";
    let enquiryContactName = "";

    if (matchedContact) {
      activeWhatsapp = matchedContact.whatsapp;
      enquiryContactName = matchedContact.name;
    } else if (form.enquiryTargetType === "host") {
      activeWhatsapp = clean(form.hostPhone) || clean(form.phone);
      enquiryContactName = "Direct Host Number";
    } else if (form.enquiryTargetType === "custom") {
      activeWhatsapp = clean(form.customPhone);
      enquiryContactName = "Custom WhatsApp Number";
    } else {
      activeWhatsapp = defaultHomestayContact?.whatsapp || clean(form.phone) || "+91 94471 88990";
      enquiryContactName = defaultHomestayContact?.name || "Agent Number";
    }

    const hostPrivatePhone = clean(form.hostPhone) || clean(form.phone);

    const galleryUrls = (Array.isArray(form.gallery) ? form.gallery : [])
      .map((item) => (typeof item === "object" && item !== null ? item.url : item))
      .filter(Boolean);

    const homeDataToSave = {
      ...existingHome,
      ...form,
      id: homeId,
      name: clean(form.name),
      gallery: galleryUrls,
      enquiryTargetType: form.enquiryTargetType,
      enquiryContactId: matchedContact ? matchedContact.id : form.enquiryTargetType,
      enquiryContactName: enquiryContactName,
      hostPhone: hostPrivatePhone,
      phone: hostPrivatePhone,
      whatsapp: activeWhatsapp,
    };

    const saved = homestayStore.save(
      existingHome
        ? currentHomes.map((item) => (String(item.id) === String(id) ? homeDataToSave : item))
        : [...currentHomes, homeDataToSave]
    );
    if (saved) navigate("/admin/homestays");

  };


  const facilities = [
    "Wi-Fi",
    "Parking",
    "Kitchen",
    "AC",
    "Breakfast",
    "Pet Friendly",
    "Bonfire",
    "Mountain View",
    "Garden",
    "TV",
    "Hot Water",
    "Washing Machine",
  ];


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
            {existingHome
              ? "Edit Homestay"
              : "Add Homestay"}
          </h1>

          <p>
            {existingHome
              ? "Update homestay information."
              : "Add a new homestay property."}
          </p>

        </div>


        <div className="homestay-form-actions">

          <Link
            to="/admin/homestays"
            className="homestay-secondary-button"
          >
            Cancel
          </Link>

          <button
            type="submit"
            form="homestay-form"
            className="homestay-primary-button"
          >
            {existingHome
              ? "Update Homestay"
              : "Create Homestay"}
          </button>

        </div>

      </div>


      <form
        id="homestay-form"
        className="homestay-form-card"
        onSubmit={handleSubmit}
      >

        {/* BASIC */}

        <section className="homestay-form-section">

          <div className="homestay-section-title">

            <div>

              <h2>
                Basic Information
              </h2>

              <p>
                Main property information
              </p>

            </div>

            <span>
              Required
            </span>

          </div>


          <div className="homestay-form-grid">

            <div className="homestay-field full">

              <label>
                Homestay Name *
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Example: Green Valley Homestay"
              />

            </div>


            <div className="homestay-field">

              <label>
                Property Type *
              </label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
              >

                <option value="">
                  Select Type
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

            </div>


            <div className="homestay-field">

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


            <div className="homestay-field full">

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


            <div className="homestay-field full">

              <label>
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="6"
                placeholder="Detailed property description..."
              />

            </div>

          </div>

        </section>


        {/* LOCATION */}

        <section className="homestay-form-section">

          <div className="homestay-section-title">

            <div>

              <h2>
                Location
              </h2>

              <p>
                Property location
              </p>

            </div>

          </div>


          <div className="homestay-form-grid">

            <div className="homestay-field full">

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


            <div className="homestay-field">

              <label>
                Area
              </label>

              <input
                name="area"
                value={form.area}
                onChange={handleChange}
                placeholder="Meppadi"
              />

            </div>


            <div className="homestay-field">

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


            <div className="homestay-field">

              <label>
                Latitude
              </label>

              <input
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
              />

            </div>


            <div className="homestay-field">

              <label>
                Longitude
              </label>

              <input
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
              />

            </div>


            <div className="homestay-field full">

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

        <section className="homestay-form-section">

          <div className="homestay-section-title">

            <div>

              <h2>
                Stay Information
              </h2>

              <p>
                Accommodation capacity
              </p>

            </div>

          </div>


          <div className="homestay-form-grid">

            <div className="homestay-field">

              <label>
                Bedrooms
              </label>

              <input
                type="number"
                min="0"
                name="bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
              />

            </div>


            <div className="homestay-field">

              <label>
                Beds
              </label>

              <input
                type="number"
                min="0"
                name="beds"
                value={form.beds}
                onChange={handleChange}
              />

            </div>


            <div className="homestay-field">

              <label>
                Maximum Guests
              </label>

              <input
                type="number"
                min="0"
                name="guests"
                value={form.guests}
                onChange={handleChange}
              />

            </div>


            <div className="homestay-field">

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


            <div className="homestay-field">

              <label>
                Check-in
              </label>

              <input
                name="checkIn"
                value={form.checkIn}
                onChange={handleChange}
              />

            </div>


            <div className="homestay-field">

              <label>
                Check-out
              </label>

              <input
                name="checkOut"
                value={form.checkOut}
                onChange={handleChange}
              />

            </div>

          </div>

        </section>


        {/* MEDIA */}

        <section className="homestay-form-section">

          <div className="homestay-section-title">

            <div>

              <h2>
                Media
              </h2>

              <p>
                Property images
              </p>

            </div>

          </div>


          <div className="homestay-form-grid">

            <div className="homestay-field full">

              <label>
                Cover Image *
              </label>

              <div className="admin-media-upload-bar">
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="/images/homestays/home.jpg or choose file"
                  style={{ flex: 1 }}
                />
                <input
                  type="file"
                  accept="image/*"
                  id="homestay-cover-upload"
                  style={{ display: "none" }}
                  onChange={handleCoverUpload}
                />
                <label htmlFor="homestay-cover-upload" className="admin-choose-file-btn">
                  Choose File
                </label>
              </div>

              {form.image && (
                <div className="admin-cover-preview">
                  <div className="admin-cover-preview-thumb">
                    <img src={form.image} alt="Cover Preview" />
                  </div>
                  <div className="admin-cover-preview-info">
                    <span className="admin-cover-preview-name">
                      {form.image.startsWith("data:")
                        ? "Uploaded Cover Image"
                        : (form.image.split("/").pop().split("?")[0] || form.image)}
                    </span>
                    <span className="admin-cover-preview-sub">Cover image selected</span>
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


            <div className="homestay-field full">

              <label>
                Gallery Images ({Array.isArray(form.gallery) ? form.gallery.length : 0})
              </label>

              <div className="admin-media-upload-bar">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  id="homestay-gallery-upload"
                  style={{ display: "none" }}
                  onChange={handleGalleryUpload}
                />
                <label htmlFor="homestay-gallery-upload" className="admin-choose-file-btn">
                  Choose Files
                </label>

                <div className="admin-url-adder">
                  <input
                    value={galleryUrlInput}
                    onChange={(e) => setGalleryUrlInput(e.target.value)}
                    placeholder="Or enter image URL..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddGalleryUrl();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="admin-add-url-btn"
                    onClick={handleAddGalleryUrl}
                  >
                    Add URL
                  </button>
                </div>
              </div>

              {/* Gallery Listing */}
              <div className="admin-gallery-container">
                {(!Array.isArray(form.gallery) || form.gallery.length === 0) ? (
                  <div className="admin-gallery-empty">
                    No gallery images added yet. Click &quot;Choose Files&quot; above to select images.
                  </div>
                ) : (
                  <div className="admin-gallery-list">
                    {form.gallery.map((item, index) => {
                      const parsed = parseGalleryItem(item, index);
                      return (
                        <div key={parsed.id || index} className="admin-gallery-item">
                          <div className="admin-gallery-thumb">
                            <img src={parsed.url} alt={parsed.name} />
                          </div>
                          <div className="admin-gallery-info">
                            <span className="admin-gallery-name" title={parsed.name}>
                              {parsed.name}
                            </span>
                            <span className="admin-gallery-badge">
                              {parsed.url.startsWith("data:") ? "Uploaded File" : "Image URL"}
                            </span>
                          </div>
                          <button
                            type="button"
                            className="admin-gallery-remove-btn"
                            onClick={() => handleRemoveGalleryImage(index)}
                            title="Remove image"
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>

          </div>

        </section>


        {/* FACILITIES */}

        <section className="homestay-form-section">

          <div className="homestay-section-title">

            <div>

              <h2>
                Facilities
              </h2>

              <p>
                Available property facilities
              </p>

            </div>

          </div>


          <div className="homestay-facility-grid">

            {facilities.map(
              (facility) => (

                <label
                  key={facility}
                >

                  <input
                    type="checkbox"
                    checked={(form.facilities || []).includes(
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

        {/* CONTACT & ENQUIRY */}
        <section className="homestay-form-section">
          <div className="homestay-section-title">
            <div>
              <h2>Contact & Enquiry</h2>
            </div>
          </div>

          <div className="homestay-form-grid">
            <div className="homestay-field">
              <label>WhatsApp Enquiry Routing</label>
              <select
                name="enquiryTargetType"
                value={form.enquiryTargetType}
                onChange={(e) => {
                  const val = e.target.value;
                  const match = configuredContacts.find((c) => c.id === val);
                  setForm((prev) => ({
                    ...prev,
                    enquiryTargetType: val,
                    enquiryContactId: match ? match.id : "",
                    whatsapp: match
                      ? match.whatsapp
                      : val === "host"
                      ? prev.hostPhone
                      : prev.whatsapp,
                  }));
                }}
              >
                <optgroup label="Saved Enquiry Desks">
                  {configuredContacts.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.whatsapp})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Direct / Custom">
                  <option value="host">Direct Host Phone</option>
                  <option value="custom">Custom Number</option>
                </optgroup>
              </select>
            </div>

            <div className="homestay-field">
              <label>Host Direct Phone</label>
              <input
                name="hostPhone"
                value={form.hostPhone || form.phone || ""}
                onChange={handleChange}
                placeholder="+91 98470 12345"
              />
            </div>

            {form.enquiryTargetType === "custom" && (
              <div className="homestay-field">
                <label>Custom WhatsApp Number</label>
                <input
                  name="customPhone"
                  value={form.customPhone || ""}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </div>
            )}

            <div className="homestay-field">
              <label>Website</label>
              <input
                name="website"
                value={form.website || ""}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            <div className="homestay-field">
              <label>Instagram Handle</label>
              <input
                name="instagram"
                value={form.instagram || ""}
                onChange={handleChange}
                placeholder="@homestayname"
              />
            </div>
          </div>
        </section>


        {/* PUBLISHING */}

        <section className="homestay-form-section">

          <div className="homestay-section-title">

            <div>

              <h2>
                Publishing
              </h2>

              <p>
                Control website visibility
              </p>

            </div>

          </div>


          <div className="homestay-publish-grid">

            <div className="homestay-field">

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


            <label className="homestay-checkbox">

              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />

              Featured Homestay

            </label>


            <label className="homestay-checkbox">

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

export default HomestayForm;


