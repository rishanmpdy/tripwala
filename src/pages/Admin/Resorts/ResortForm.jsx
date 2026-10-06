import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { resortStore, contactNumberStore } from "../../../data/stores";
import { resortData } from "../../../data/resortData";

import "./Resorts.css";

const getNextResortId = (existingId) => existingId || Date.now();

const ResortForm = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const configuredContacts = (contactNumberStore.get() || []).filter(
    (c) => c.status === "Active" && (c.category === "Resorts" || c.category === "All")
  );
  const defaultResortContact =
    configuredContacts.find((c) => c.isDefaultResorts) || configuredContacts[0];

  const existingResort = id
    ? resortStore.get().find(
        (item) =>
          String(item.id) ===
          String(id)
      )
    : null;

  const richResort = id
    ? resortData.find(
        (item) =>
          String(item.id) === String(id) ||
          String(item.id) === String(id).replace("resort-", "")
      )
    : null;

  const defaultSampleRooms = [
    {
      id: "room-sample-1",
      name: "Lakefront Deluxe Villa",
      type: "Private Villa",
      price: 6500,
      originalPrice: 8500,
      size: "480 sq.ft",
      bed: "1 King Bed",
      capacity: "2 Adults + 1 Child",
      features: ["Waterfront Balcony", "King Size Bed", "Rain Shower", "Free Breakfast"],
      image: existingResort?.image || richResort?.image || "",
      gallery: []
    }
  ];

  const rawRooms = Array.isArray(existingResort?.rooms) && existingResort.rooms.length > 0
    ? existingResort.rooms
    : Array.isArray(richResort?.rooms) && richResort.rooms.length > 0
    ? richResort.rooms
    : defaultSampleRooms;

  const loadedRooms = rawRooms.map((room) => ({
    ...room,
    gallery: Array.isArray(room.gallery) && room.gallery.length > 0
      ? room.gallery
      : room.image ? [room.image] : []
  }));

  const [form, setForm] = useState(() => {
    if (existingResort) {
      return {
        ...existingResort,
        roomsList: loadedRooms,
        facilities: Array.isArray(existingResort.facilities) ? existingResort.facilities : [],
        gallery: Array.isArray(existingResort.gallery) ? existingResort.gallery : [],
        enquiryTargetType:
          existingResort.enquiryTargetType ||
          (existingResort.enquiryContactId ? existingResort.enquiryContactId : (defaultResortContact ? defaultResortContact.id : "agent")),
        enquiryContactId:
          existingResort.enquiryContactId || (defaultResortContact ? defaultResortContact.id : ""),
        agentPhone: existingResort.agentPhone || defaultResortContact?.whatsapp || "+91 94471 88990",
        resortPhone: existingResort.resortPhone || existingResort.phone || existingResort.contact?.phone || "",
        customPhone: existingResort.customPhone || "",
        phone: existingResort.resortPhone || existingResort.phone || existingResort.contact?.phone || "",
        whatsapp: existingResort.whatsapp || defaultResortContact?.whatsapp || "+91 94471 88990",
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
      rooms: "12",
      roomsList: defaultSampleRooms,
      roomTypes: "Lakefront Deluxe Villa",
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
    const { name, value, type, checked } = e.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleFacility = (facility) => {
    setForm((current) => {
      const curFacilities = Array.isArray(current.facilities) ? current.facilities : [];
      const exists = curFacilities.includes(facility);
      return {
        ...current,
        facilities: exists
          ? curFacilities.filter((item) => item !== facility)
          : [...curFacilities, facility],
      };
    });
  };

  /* =========================================================================
     ROOM CATEGORY OPERATIONS
     ========================================================================= */
  const handleAddRoom = () => {
    const newRoomIndex = (form.roomsList?.length || 0) + 1;
    const newRoom = {
      id: `room-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: `Category ${newRoomIndex} - Deluxe Room`,
      type: "Deluxe Room",
      price: 5500,
      originalPrice: 7000,
      size: "420 sq.ft",
      bed: "1 King Bed",
      capacity: "2 Adults + 1 Child",
      features: ["Balcony View", "Free Breakfast", "Air Conditioning"],
      image: form.image || "",
      gallery: []
    };
    setForm((prev) => ({
      ...prev,
      roomsList: [...(prev.roomsList || []), newRoom]
    }));
  };

  const handleUpdateRoom = (index, field, value) => {
    setForm((prev) => {
      const updated = [...(prev.roomsList || [])];
      updated[index] = {
        ...updated[index],
        [field]: value
      };
      return {
        ...prev,
        roomsList: updated
      };
    });
  };

  const handleRemoveRoom = (index) => {
    if ((form.roomsList || []).length <= 1) {
      alert("At least one room category is required for customer booking.");
      return;
    }
    const roomNameToRemove = form.roomsList[index]?.name || "this room";
    if (window.confirm(`Are you sure you want to remove "${roomNameToRemove}"?`)) {
      setForm((prev) => ({
        ...prev,
        roomsList: prev.roomsList.filter((_, i) => i !== index)
      }));
    }
  };

  const handleDuplicateRoom = (index) => {
    const sourceRoom = form.roomsList[index];
    if (!sourceRoom) return;
    const duplicatedRoom = {
      ...sourceRoom,
      id: `room-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: `${sourceRoom.name} (Copy)`
    };
    const updated = [...(form.roomsList || [])];
    updated.splice(index + 1, 0, duplicatedRoom);
    setForm((prev) => ({
      ...prev,
      roomsList: updated
    }));
  };

  const handleMoveRoom = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= (form.roomsList || []).length) return;
    const updated = [...(form.roomsList || [])];
    const [movedRoom] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, movedRoom);
    setForm((prev) => ({
      ...prev,
      roomsList: updated
    }));
  };

  const handleRoomAddFeature = (roomIndex, text) => {
    if (!text || !text.trim()) return;
    const featureToAdd = text.trim();
    setForm((prev) => {
      const updated = [...(prev.roomsList || [])];
      const currentFeatures = Array.isArray(updated[roomIndex]?.features)
        ? updated[roomIndex].features
        : [];
      if (!currentFeatures.includes(featureToAdd)) {
        updated[roomIndex] = {
          ...updated[roomIndex],
          features: [...currentFeatures, featureToAdd]
        };
      }
      return { ...prev, roomsList: updated };
    });
  };

  const handleRoomRemoveFeature = (roomIndex, featureIndex) => {
    setForm((prev) => {
      const updated = [...(prev.roomsList || [])];
      const currentFeatures = Array.isArray(updated[roomIndex]?.features)
        ? updated[roomIndex].features
        : [];
      updated[roomIndex] = {
        ...updated[roomIndex],
        features: currentFeatures.filter((_, i) => i !== featureIndex)
      };
      return { ...prev, roomsList: updated };
    });
  };

  const handleRoomFilesUpload = (roomIndex, fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setForm((prev) => {
          const updated = [...(prev.roomsList || [])];
          const currentRoom = updated[roomIndex];
          const currentGallery = Array.isArray(currentRoom.gallery)
            ? currentRoom.gallery
            : (currentRoom.image ? [currentRoom.image] : []);
          const newGallery = [...currentGallery, e.target.result];
          updated[roomIndex] = {
            ...currentRoom,
            gallery: newGallery,
            image: currentRoom.image || newGallery[0]
          };
          return { ...prev, roomsList: updated };
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRoomAddLink = (roomIndex, url) => {
    if (!url || !url.trim()) return;
    const cleanUrl = url.trim();
    setForm((prev) => {
      const updated = [...(prev.roomsList || [])];
      const currentRoom = updated[roomIndex];
      const currentGallery = Array.isArray(currentRoom.gallery)
        ? currentRoom.gallery
        : (currentRoom.image ? [currentRoom.image] : []);
      const newGallery = [...currentGallery, cleanUrl];
      updated[roomIndex] = {
        ...currentRoom,
        gallery: newGallery,
        image: currentRoom.image || newGallery[0]
      };
      return { ...prev, roomsList: updated };
    });
  };

  const handleRoomRemovePhoto = (roomIndex, photoIndex) => {
    setForm((prev) => {
      const updated = [...(prev.roomsList || [])];
      const currentRoom = updated[roomIndex];
      const currentGallery = Array.isArray(currentRoom.gallery) ? currentRoom.gallery : [];
      const photoToRemove = currentGallery[photoIndex];
      const newGallery = currentGallery.filter((_, i) => i !== photoIndex);
      const newCover = currentRoom.image === photoToRemove ? (newGallery[0] || "") : currentRoom.image;
      updated[roomIndex] = {
        ...currentRoom,
        gallery: newGallery,
        image: newCover
      };
      return { ...prev, roomsList: updated };
    });
  };

  const handleRoomSetCoverPhoto = (roomIndex, photoUrl) => {
    setForm((prev) => {
      const updated = [...(prev.roomsList || [])];
      updated[roomIndex] = {
        ...updated[roomIndex],
        image: photoUrl
      };
      return { ...prev, roomsList: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const clean = (value) => String(value ?? "").trim();

    if (!clean(form.name)) {
      alert("Resort name is required.");
      return;
    }

    if (!form.type) {
      alert("Please select resort type.");
      return;
    }

    if (!clean(form.address)) {
      alert("Address is required.");
      return;
    }

    const currentResorts = resortStore.get();
    const resortId = getNextResortId(existingResort?.id);
    
    // Determine effective WhatsApp recipient based on admin routing choice
    const matchedContact = configuredContacts.find(
      (c) => c.id === form.enquiryTargetType || c.id === form.enquiryContactId
    );

    let activeWhatsapp = "";
    let enquiryContactName = "";

    if (matchedContact) {
      activeWhatsapp = matchedContact.whatsapp;
      enquiryContactName = matchedContact.name;
    } else if (form.enquiryTargetType === "resort") {
      activeWhatsapp = clean(form.resortPhone) || clean(form.phone);
      enquiryContactName = "Direct Resort Number";
    } else if (form.enquiryTargetType === "custom") {
      activeWhatsapp = clean(form.customPhone);
      enquiryContactName = "Custom WhatsApp Number";
    } else {
      activeWhatsapp = defaultResortContact?.whatsapp || clean(form.agentPhone) || "+91 94471 88990";
      enquiryContactName = defaultResortContact?.name || "Agent Number";
    }

    const privateResortPhone = clean(form.resortPhone) || clean(form.phone);
    const email = clean(form.email);
    const website = clean(form.website);

    const galleryUrls = (Array.isArray(form.gallery) ? form.gallery : [])
      .map((item) => (typeof item === "object" && item !== null ? item.url : item))
      .filter(Boolean);

    const effectiveRooms = form.roomsList || [];
    const startingRate = effectiveRooms.length > 0
      ? Math.min(...effectiveRooms.map((r) => Number(r.price) || 999999))
      : Number(form.pricePerNight) || 6500;

    const resortDataToSave = {
      ...richResort,
      ...existingResort,
      ...form,
      id: resortId,
      name: clean(form.name),
      gallery: galleryUrls,
      rooms: effectiveRooms,
      roomTypes: effectiveRooms.map((r) => r.name).join(", "),
      pricePerNight: startingRate === 999999 ? 6500 : startingRate,
      enquiryTargetType: form.enquiryTargetType,
      enquiryContactId: matchedContact ? matchedContact.id : form.enquiryTargetType,
      enquiryContactName: enquiryContactName,
      agentPhone: matchedContact ? matchedContact.whatsapp : (clean(form.agentPhone) || "+91 94471 88990"),
      resortPhone: privateResortPhone,
      customPhone: clean(form.customPhone),
      phone: privateResortPhone,
      whatsapp: activeWhatsapp,
      email,
      website,
      instagram: clean(form.instagram),
      contact: {
        phone: privateResortPhone,
        whatsapp: activeWhatsapp,
        email,
        website,
        address: clean(form.address)
      }
    };

    const saved = resortStore.save(
      existingResort
        ? currentResorts.map((r) => (String(r.id) === String(id) ? resortDataToSave : r))
        : [...currentResorts, resortDataToSave]
    );
    if (saved) navigate("/admin/resorts");
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


        {/* ROOM CATEGORIES & RATES */}
        <section className="resort-form-section">
          <div className="resort-section-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h2>Room Categories & Rates</h2>
            </div>
            <button
              type="button"
              className="btn-add-room-category"
              onClick={handleAddRoom}
            >
              + Add Room
            </button>
          </div>

          <div className="room-category-manager">
            <div className="room-category-list">
              {(form.roomsList || []).map((room, index) => {
                const roomFeatures = Array.isArray(room.features) ? room.features : [];
                return (
                  <div className="room-category-card" key={room.id || index}>
                    {/* Header */}
                    <div className="room-cat-header">
                      <div className="room-cat-header-left">
                        <span className="room-cat-num">{index + 1}</span>
                        <strong className="room-cat-title">{room.name || `Room ${index + 1}`}</strong>
                        {room.type && <span className="room-cat-type-badge">{room.type}</span>}
                        {room.price && (
                          <span className="room-cat-rate-badge">
                            ₹{Number(room.price).toLocaleString()} / night
                          </span>
                        )}
                      </div>

                      <div className="room-cat-header-actions">
                        <button
                          type="button"
                          className="room-btn-action"
                          onClick={() => handleMoveRoom(index, -1)}
                          disabled={index === 0}
                          title="Move Up"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          className="room-btn-action"
                          onClick={() => handleMoveRoom(index, 1)}
                          disabled={index === (form.roomsList || []).length - 1}
                          title="Move Down"
                        >
                          ▼
                        </button>
                        <button
                          type="button"
                          className="room-btn-action"
                          onClick={() => handleDuplicateRoom(index)}
                          title="Clone"
                        >
                          ⧉ Clone
                        </button>
                        <button
                          type="button"
                          className="room-btn-action delete"
                          onClick={() => handleRemoveRoom(index)}
                          title="Delete"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* Body Fields */}
                    <div className="room-cat-body">
                      {/* Row 1: Name, Type, Pricing */}
                      <div className="room-cat-grid-4">
                        <div className="room-field-item">
                          <label>Room Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Lakefront Deluxe Villa"
                            value={room.name || ""}
                            onChange={(e) => handleUpdateRoom(index, "name", e.target.value)}
                          />
                        </div>

                        <div className="room-field-item">
                          <label>Type</label>
                          <input
                            type="text"
                            placeholder="e.g. Villa, Suite, Cottage"
                            value={room.type || ""}
                            onChange={(e) => handleUpdateRoom(index, "type", e.target.value)}
                          />
                        </div>

                        <div className="room-field-item">
                          <label>Rate (₹)</label>
                          <input
                            type="number"
                            min="0"
                            placeholder="6500"
                            value={room.price ?? ""}
                            onChange={(e) => handleUpdateRoom(index, "price", Number(e.target.value))}
                          />
                        </div>

                        <div className="room-field-item">
                          <label>Original Price (₹)</label>
                          <input
                            type="number"
                            min="0"
                            placeholder="8500"
                            value={room.originalPrice ?? ""}
                            onChange={(e) => handleUpdateRoom(index, "originalPrice", Number(e.target.value))}
                          />
                        </div>
                      </div>

                      {/* Row 2: Specs (Size, Bed, Capacity) */}
                      <div className="room-cat-grid-3">
                        <div className="room-field-item">
                          <label>Size</label>
                          <input
                            type="text"
                            placeholder="e.g. 480 sq.ft"
                            value={room.size || ""}
                            onChange={(e) => handleUpdateRoom(index, "size", e.target.value)}
                          />
                        </div>

                        <div className="room-field-item">
                          <label>Bed</label>
                          <input
                            type="text"
                            placeholder="e.g. 1 King Bed"
                            value={room.bed || ""}
                            onChange={(e) => handleUpdateRoom(index, "bed", e.target.value)}
                          />
                        </div>

                        <div className="room-field-item">
                          <label>Capacity</label>
                          <input
                            type="text"
                            placeholder="e.g. 2 Adults, 1 Child"
                            value={room.capacity || ""}
                            onChange={(e) => handleUpdateRoom(index, "capacity", e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Room Photos (Multiple with Files & Link) */}
                      {(() => {
                        const roomGallery = Array.isArray(room.gallery) && room.gallery.length > 0
                          ? room.gallery
                          : room.image ? [room.image] : [];
                        return (
                          <div className="room-photos-box">
                            <div className="room-photos-header">
                              <label>
                                Room Photos ({roomGallery.length})
                              </label>

                              <div className="room-photos-inputs">
                                {/* Choose Files */}
                                <label className="btn-room-file-upload">
                                  📁 Choose Files
                                  <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    style={{ display: "none" }}
                                    onChange={(e) => {
                                      if (e.target.files) {
                                        handleRoomFilesUpload(index, e.target.files);
                                        e.target.value = "";
                                      }
                                    }}
                                  />
                                </label>

                                {/* Add Link / URL */}
                                <div className="room-url-input-wrap">
                                  <input
                                    type="text"
                                    placeholder="Paste photo link..."
                                    id={`room-photo-url-${index}`}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleRoomAddLink(index, e.target.value);
                                        e.target.value = "";
                                      }
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const el = document.getElementById(`room-photo-url-${index}`);
                                      if (el && el.value.trim()) {
                                        handleRoomAddLink(index, el.value);
                                        el.value = "";
                                      }
                                    }}
                                  >
                                    + Add Link
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Photos Grid */}
                            {roomGallery.length > 0 ? (
                              <div className="room-photos-grid">
                                {roomGallery.map((imgUrl, pIdx) => {
                                  const isCover = (room.image === imgUrl) || (!room.image && pIdx === 0);
                                  return (
                                    <div className={`room-photo-item ${isCover ? "is-cover" : ""}`} key={pIdx}>
                                      <img
                                        src={imgUrl}
                                        alt=""
                                        onError={(e) => { e.target.style.display = "none"; }}
                                      />
                                      {isCover && <span className="room-cover-badge">Cover</span>}
                                      <div className="room-photo-actions">
                                        <button
                                          type="button"
                                          className="room-photo-del-btn"
                                          onClick={() => handleRoomRemovePhoto(index, pIdx)}
                                          title="Remove photo"
                                        >
                                          ×
                                        </button>
                                        {!isCover && (
                                          <button
                                            type="button"
                                            className="room-photo-set-cover-btn"
                                            onClick={() => handleRoomSetCoverPhoto(index, imgUrl)}
                                            title="Set as cover photo"
                                          >
                                            Set Cover
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="room-photos-empty">
                                No photos added yet. Click <strong>Choose Files</strong> or enter a link to add room photos.
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      {/* Features */}
                      <div className="room-features-box">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <label style={{ fontSize: "12px", fontWeight: "700", color: "#334155" }}>
                            Features
                          </label>
                        </div>

                        {/* Feature Chips */}
                        {roomFeatures.length > 0 && (
                          <div className="room-features-chips-wrap">
                            {roomFeatures.map((feat, fIdx) => (
                              <span className="room-feature-chip" key={fIdx}>
                                {feat}
                                <button
                                  type="button"
                                  onClick={() => handleRoomRemoveFeature(index, fIdx)}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Quick Suggestions & Input */}
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                          <div className="room-quick-suggestions">
                            {[
                              "Balcony",
                              "Free Breakfast",
                              "Jacuzzi",
                              "Pool View",
                              "King Bed",
                              "AC",
                              "Wi-Fi"
                            ].map((suggest) => (
                              <span
                                key={suggest}
                                className="room-quick-tag"
                                onClick={() => handleRoomAddFeature(index, suggest)}
                              >
                                + {suggest}
                              </span>
                            ))}
                          </div>

                          <div className="room-feature-input-row" style={{ flex: "1 1 200px" }}>
                            <input
                              type="text"
                              placeholder="Add feature and press Enter..."
                              id={`custom-feature-input-${index}`}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleRoomAddFeature(index, e.target.value);
                                  e.target.value = "";
                                }
                              }}
                            />
                            <button
                              type="button"
                              className="room-btn-action"
                              onClick={() => {
                                const el = document.getElementById(`custom-feature-input-${index}`);
                                if (el && el.value.trim()) {
                                  handleRoomAddFeature(index, el.value);
                                  el.value = "";
                                }
                              }}
                            >
                              + Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* General Stay Settings */}
          <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #e2e8f0" }}>
            <div className="resort-form-grid">
              <div className="resort-field">
                <label>Total Rooms</label>
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
                <label>Max Guests</label>
                <input
                  type="number"
                  min="0"
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  placeholder="50"
                />
              </div>

              <div className="resort-field">
                <label>Check-in</label>
                <input
                  name="checkIn"
                  value={form.checkIn}
                  onChange={handleChange}
                  placeholder="02:00 PM"
                />
              </div>

              <div className="resort-field">
                <label>Check-out</label>
                <input
                  name="checkOut"
                  value={form.checkOut}
                  onChange={handleChange}
                  placeholder="11:00 AM"
                />
              </div>

              <div className="resort-field">
                <label>Minimum Stay (Nights)</label>
                <input
                  type="number"
                  min="1"
                  name="minimumStay"
                  value={form.minimumStay}
                  onChange={handleChange}
                />
              </div>
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

              <div className="admin-media-upload-bar">
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="/images/resorts/resort.jpg or choose file"
                  style={{ flex: 1 }}
                />
                <input
                  type="file"
                  accept="image/*"
                  id="resort-cover-upload"
                  style={{ display: "none" }}
                  onChange={handleCoverUpload}
                />
                <label htmlFor="resort-cover-upload" className="admin-choose-file-btn">
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


            <div className="resort-field full">

              <label>
                Gallery Images ({Array.isArray(form.gallery) ? form.gallery.length : 0})
              </label>

              <div className="admin-media-upload-bar">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  id="resort-gallery-upload"
                  style={{ display: "none" }}
                  onChange={handleGalleryUpload}
                />
                <label htmlFor="resort-gallery-upload" className="admin-choose-file-btn">
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
                    checked={Boolean((form.facilities || []).includes(facility))}
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
              <h2>Contact & Enquiry</h2>
            </div>
          </div>

          <div className="resort-form-grid">
            <div className="resort-field">
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
                      : val === "resort"
                      ? prev.resortPhone
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
                  <option value="resort">Direct Resort Phone</option>
                  <option value="custom">Custom Number</option>
                </optgroup>
              </select>
            </div>

            <div className="resort-field">
              <label>Resort Direct Phone</label>
              <input
                name="resortPhone"
                value={form.resortPhone}
                onChange={handleChange}
                placeholder="+91 98470 12345"
              />
            </div>

            {form.enquiryTargetType === "custom" && (
              <div className="resort-field">
                <label>Custom WhatsApp Number</label>
                <input
                  name="customPhone"
                  value={form.customPhone || ""}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </div>
            )}

            <div className="resort-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email || ""}
                onChange={handleChange}
                placeholder="stay@resortname.com"
              />
            </div>

            <div className="resort-field">
              <label>Website</label>
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

