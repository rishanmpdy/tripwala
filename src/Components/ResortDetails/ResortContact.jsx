import React from "react";
import { contactNumberStore } from "../../data/stores";

const ResortContact = ({
  resort,
  booking = {},
  onChangeBooking = () => {},
  onToggleRoom,
  _onSubmitBooking = () => {},
  onShowToast = () => {}
}) => {
  // Dropdown state for Room Category multi-select
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Safe normalized room list
  const availableRooms = React.useMemo(() => {
    if (!resort) return [];
    if (Array.isArray(resort.rooms) && resort.rooms.length > 0) {
      return resort.rooms;
    }
    if (typeof resort.roomTypes === "string" && resort.roomTypes.trim()) {
      return resort.roomTypes.split(",").map((name, idx) => ({
        id: `room-${idx + 1}`,
        name: name.trim(),
        price: resort.pricePerNight || 5000,
        type: "Standard"
      })).filter((r) => r.name);
    }
    return [];
  }, [resort]);

  // Selected room names (supports array or legacy single string)
  const selectedRoomNames = React.useMemo(() => {
    if (Array.isArray(booking.roomTypes)) {
      return booking.roomTypes;
    }
    if (booking.roomType) {
      return booking.roomType.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return availableRooms[0]?.name ? [availableRooms[0].name] : [];
  }, [booking.roomTypes, booking.roomType, availableRooms]);

  // Selected room objects
  const selectedRoomsList = React.useMemo(() => {
    if (!availableRooms || availableRooms.length === 0) return [];
    return availableRooms.filter((r) => selectedRoomNames.includes(r.name));
  }, [availableRooms, selectedRoomNames]);

  const triggerSummaryText = React.useMemo(() => {
    if (selectedRoomsList.length === 0) return "Select room categories (optional)...";
    if (selectedRoomsList.length === 1) {
      return `${selectedRoomsList[0].name} (₹${selectedRoomsList[0].price?.toLocaleString()}/nt)`;
    }
    return `${selectedRoomsList.length} categories: ${selectedRoomsList.map((r) => r.name).join(", ")}`;
  }, [selectedRoomsList]);

  if (!resort) return null;

  let dynamicDefault = "+91 94471 88990";
  try {
    const defaultContact = contactNumberStore.get()?.find((c) => c.isDefaultResorts && c.status === "Active");
    if (defaultContact?.whatsapp) dynamicDefault = defaultContact.whatsapp;
  } catch {}

  const enquiryTargetPhone =
    resort.whatsapp ||
    resort.agentPhone ||
    resort.contact?.whatsapp ||
    dynamicDefault;

  // Clean phone number: strictly numeric for WhatsApp wa.me API
  let cleanPhone = enquiryTargetPhone.replace(/[^0-9]/g, "");
  // Prepend 91 if it is a standard 10-digit Indian phone number
  if (cleanPhone.length === 10) {
    cleanPhone = `91${cleanPhone}`;
  }

  // Night calculation without calling impure Date.now() during render
  const today = new Date().toISOString().split("T")[0];
  const checkInDate = new Date(booking.checkIn || today);
  const checkOutDate = new Date(booking.checkOut || today);
  const diffTime = checkOutDate - checkInDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const nights = diffDays > 0 ? diffDays : 1;

  // Combined nightly rate for all selected rooms (or resort starting rate if none selected)
  const baseRate = selectedRoomsList.length > 0
    ? selectedRoomsList.reduce((sum, r) => sum + (r.price || 0), 0)
    : resort.pricePerNight || 6500;

  const subtotal = baseRate * nights;
  const total = subtotal;

  const handleToggleRoom = (roomName) => {
    if (onToggleRoom) {
      onToggleRoom(roomName);
      return;
    }

    let next;
    if (selectedRoomNames.includes(roomName)) {
      next = selectedRoomNames.filter((r) => r !== roomName);
      onShowToast(`Removed "${roomName}" from selection.`);
    } else {
      next = [...selectedRoomNames, roomName];
      onShowToast(`Added "${roomName}" to selection!`);
    }

    onChangeBooking("roomTypes", next);
    onChangeBooking("roomType", next.join(", "));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!booking.name?.trim()) {
      onShowToast("Please enter your name for the booking enquiry.");
      return;
    }
    const phoneDigits = (booking.phone || "").replace(/[^0-9]/g, "");
    if (!phoneDigits) {
      onShowToast("Please provide your 10-digit phone number.");
      return;
    }
    if (phoneDigits.length < 10) {
      onShowToast("Please enter a valid 10-digit phone number.");
      return;
    }

    const roomsDetailText = selectedRoomsList.length > 0
      ? selectedRoomsList.map((r) => `${r.name} (₹${r.price.toLocaleString()}/night)`).join(", ")
      : "Standard / Open to recommendation";

    /*
      NOTE: Strictly text-based direct WhatsApp message sent directly to the resort's contact number.
      Customer details are NOT saved in the admin side, store, or database.
    */
    const messageLines = [
      `*New Stay Enquiry - ${resort.name}*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `📅 *Check-In:* ${booking.checkIn}`,
      `📅 *Check-Out:* ${booking.checkOut} (${nights} night${nights > 1 ? "s" : ""})`,
      `👥 *Guests:* ${booking.adults || 2} Adult${(booking.adults || 2) > 1 ? "s" : ""}${booking.children > 0 ? `, ${booking.children} Child${booking.children > 1 ? "ren" : ""}` : ""}`,
      `🏡 *Room Category:* ${roomsDetailText}`,
      `👤 *Guest Name:* ${booking.name.trim()}`,
      `📞 *Guest Contact:* ${booking.phone.trim()}`,
      `💰 *Estimated Tariff:* ₹${total.toLocaleString()}`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `Hello! I would like to inquire about room availability for the above dates. Please let me know how to proceed with the booking.`
    ];

    const message = encodeURIComponent(messageLines.join("\n"));
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    onShowToast(`Opening WhatsApp to send enquiry to ${resort.name}...`);
  };

  return (
    <aside className="resort-contact-widget">
      {/* Booking Form Card */}
      <div className="contact-booking-box" id="booking-widget">
        <div className="booking-box-header">
          <div className="booking-rate">
            ₹{baseRate.toLocaleString()}
            <span> / night{selectedRoomsList.length > 1 ? ` (${selectedRoomsList.length} rooms)` : ""}</span>
          </div>

          <div className="booking-guarantee-pill">
            <span className="material-symbols-outlined" style={{ fontSize: "15px", color: "var(--rd-primary)" }}>
              verified
            </span>
            <span>Best Rate Guaranteed</span>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="rd-booking-form">
          <div className="form-date-row">
            <div className="form-group">
              <label>Check-In</label>
              <input
                type="date"
                className="form-input"
                min={today}
                value={booking.checkIn || ""}
                onChange={(e) => {
                  onChangeBooking("checkIn", e.target.value);
                  if (booking.checkOut && new Date(e.target.value) >= new Date(booking.checkOut)) {
                    const nextDate = new Date(e.target.value);
                    nextDate.setDate(nextDate.getDate() + 1);
                    onChangeBooking("checkOut", nextDate.toISOString().split("T")[0]);
                  }
                }}
                required
              />
            </div>

            <div className="form-group">
              <label>Check-Out</label>
              <input
                type="date"
                className="form-input"
                min={booking.checkIn || today}
                value={booking.checkOut || ""}
                onChange={(e) => onChangeBooking("checkOut", e.target.value)}
                required
              />
            </div>
          </div>

          {availableRooms && availableRooms.length > 0 && (
            <div className="form-group room-category-group" ref={dropdownRef}>
              <div className="room-category-label-row">
                <label>Room Category</label>
                <span className="room-multiselect-hint">
                  {selectedRoomNames.length > 0
                    ? `${selectedRoomNames.length} selected • Multi-select`
                    : "Optional • Multi-select"}
                </span>
              </div>

              {/* Dropdown Trigger */}
              <div
                className={`room-dropdown-trigger ${isDropdownOpen ? "open" : ""}`}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                role="button"
                tabIndex={0}
                aria-expanded={isDropdownOpen}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsDropdownOpen((prev) => !prev);
                  }
                }}
              >
                <div className="room-dropdown-selected-text" title={triggerSummaryText}>
                  <span className="material-symbols-outlined trigger-icon">
                    meeting_room
                  </span>
                  <span className="trigger-text-content">{triggerSummaryText}</span>
                </div>

                <div className="room-dropdown-trigger-right">
                  <span className="room-dropdown-count-badge">
                    {selectedRoomNames.length}
                  </span>
                  <span className="material-symbols-outlined dropdown-chevron">
                    {isDropdownOpen ? "expand_less" : "expand_more"}
                  </span>
                </div>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="room-dropdown-menu">
                  <div className="room-dropdown-header">
                    <span>Select one or more categories:</span>
                    <span className="dropdown-total-preview">
                      {selectedRoomsList.length > 0
                        ? `₹${baseRate.toLocaleString()}/night`
                        : "Optional"}
                    </span>
                  </div>

                  <div className="room-multiselect-list">
                    {availableRooms.map((room) => {
                      const isChecked = selectedRoomNames.includes(room.name);
                      return (
                        <div
                          key={room.id}
                          className={`room-checkbox-card ${isChecked ? "active" : ""}`}
                          onClick={() => handleToggleRoom(room.name)}
                          role="checkbox"
                          aria-checked={isChecked}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleToggleRoom(room.name);
                            }
                          }}
                        >
                          <div className="room-check-col">
                            <span className={`custom-checkbox-box ${isChecked ? "checked" : ""}`}>
                              {isChecked && (
                                <span className="material-symbols-outlined" style={{ fontSize: "15px" }}>
                                  check
                                </span>
                              )}
                            </span>
                          </div>

                          <div className="room-meta-col">
                            <div className="room-meta-title-row">
                              <span className="room-meta-name">{room.name}</span>
                              {room.type && (
                                <span className="room-meta-badge">{room.type}</span>
                              )}
                            </div>
                          </div>

                          <div className="room-price-col">
                            <span className="room-price-number">₹{room.price.toLocaleString()}</span>
                            <span className="room-price-unit">/nt</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="room-dropdown-footer">
                    <button
                      type="button"
                      className="room-dropdown-done-btn"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Done ({selectedRoomNames.length} selected)
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="form-date-row">
            <div className="form-group">
              <label>Adults</label>
              <select
                className="form-select"
                value={booking.adults || 2}
                onChange={(e) => onChangeBooking("adults", Number(e.target.value))}
              >
                <option value={1}>1 Adult</option>
                <option value={2}>2 Adults</option>
                <option value={3}>3 Adults</option>
                <option value={4}>4 Adults</option>
                <option value={6}>6+ Group</option>
              </select>
            </div>

            <div className="form-group">
              <label>Children</label>
              <select
                className="form-select"
                value={booking.children || 0}
                onChange={(e) => onChangeBooking("children", Number(e.target.value))}
              >
                <option value={0}>0 Children</option>
                <option value={1}>1 Child</option>
                <option value={2}>2 Children</option>
                <option value={3}>3+ Children</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              className="form-input"
              value={booking.name || ""}
              onChange={(e) => onChangeBooking("name", e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="10-digit mobile number"
              className="form-input"
              value={booking.phone || ""}
              onChange={(e) => {
                const numericOnly = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
                onChangeBooking("phone", numericOnly);
              }}
              required
            />
          </div>

          {/* Pricing breakdown */}
          <div className="booking-calc-breakdown">
            <div className="calc-row">
              <div>
                <span>
                  ₹{baseRate.toLocaleString()} × {nights} night{nights > 1 ? "s" : ""}
                </span>
                {selectedRoomsList.length > 1 && (
                  <div className="calc-sub-detail">
                    {selectedRoomsList.map((r) => r.name).join(" + ")}
                  </div>
                )}
              </div>
              <span style={{ fontWeight: 600 }}>₹{total.toLocaleString()}</span>
            </div>
            <div className="calc-row calc-total">
              <span>Estimated Total</span>
              <span style={{ color: "var(--rd-primary)" }}>₹{total.toLocaleString()}</span>
            </div>
          </div>

          <button type="submit" className="whatsapp-book-btn">
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
              chat
            </span>
            WhatsApp Enquiry
          </button>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "11px", color: "#64748b", marginTop: "6px" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "15px", color: "#25d366" }}>
              verified
            </span>
            <span>Direct WhatsApp Enquiry • Prompt Assistance & Best Rates</span>
          </div>
        </form>
      </div>
    </aside>
  );
};

export default ResortContact;

