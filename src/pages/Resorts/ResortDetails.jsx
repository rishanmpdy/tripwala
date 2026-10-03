import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";

// Data
import { resortData, getResortById } from "../../data/resortData";
import { resortStore } from "../../data/stores";

// Sub-components
import ResortHero from "../../Components/ResortDetails/ResortHero";
import ResortGallery from "../../Components/ResortDetails/ResortGallery";
import ResortSummary from "../../Components/ResortDetails/ResortSummary";
import ResortOverview from "../../Components/ResortDetails/ResortOverview";
import ResortAmenities from "../../Components/ResortDetails/ResortAmenities";
import ResortContact from "../../Components/ResortDetails/ResortContact";

// Styling
import "../../Components/ResortDetails/ResortDetails.css";

const getTomorrowDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

const getFutureDate = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};

const ResortDetails = () => {
  const { id } = useParams();

  // Find resort from local store or preloaded resortData
  const resort = useMemo(() => {
    // 1. Try finding in custom user data / admin store
    try {
      const stored = resortStore?.get?.();
      if (Array.isArray(stored)) {
        const match = stored.find(
          (r) => String(r.id) === String(id) || String(r.id) === String(id).replace("resort-", "")
        );
        if (match) {
          // Merge with resortData for richer attributes if available
          const rich = resortData.find((rd) => String(rd.id) === String(match.id));
          return { ...(rich || {}), ...match };
        }
      }
    } catch {
      // fallback
    }

    // 2. Lookup in rich dataset
    return getResortById(id);
  }, [id]);

  // Favorite / Like state
  const [isLiked, setIsLiked] = useState(() => {
    try {
      const saved = localStorage.getItem(`fav-resort-${id}`);
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const handleToggleLike = () => {
    const nextVal = !isLiked;
    setIsLiked(nextVal);
    try {
      localStorage.setItem(`fav-resort-${id}`, JSON.stringify(nextVal));
    } catch {
      // ignore
    }
    showToast(nextVal ? "Added to your saved stays!" : "Removed from saved stays.");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard!");
    } else {
      showToast("Sharing link: " + window.location.href);
    }
  };

  // Booking Form State
  const initialRoom = resort?.rooms?.[0]?.name || "Deluxe Villa";
  const [booking, setBooking] = useState({
    checkIn: getTomorrowDate(),
    checkOut: getFutureDate(3),
    adults: 2,
    children: 0,
    roomTypes: [initialRoom],
    roomType: initialRoom,
    name: "",
    phone: ""
  });

  const handleBookingChange = (field, value) => {
    setBooking((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleToggleRoom = (roomName) => {
    setBooking((prev) => {
      const current = Array.isArray(prev.roomTypes)
        ? prev.roomTypes
        : prev.roomType ? [prev.roomType] : [];
      let next;
      if (current.includes(roomName)) {
        next = current.filter((r) => r !== roomName);
        showToast(`Removed "${roomName}" from selection.`);
      } else {
        next = [...current, roomName];
        showToast(`Added "${roomName}" to selection!`);
      }
      return {
        ...prev,
        roomTypes: next,
        roomType: next.join(", ")
      };
    });
  };

  const handleSelectRoom = (room) => {
    handleToggleRoom(room.name);
    const widget = document.getElementById("booking-widget");
    if (widget) {
      widget.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const scrollToRooms = () => {
    const section = document.getElementById("rooms-section");
    if (section) {
      const topbarOffset = 80;
      const rect = section.getBoundingClientRect();
      const targetY = window.pageYOffset + rect.top - topbarOffset;
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: "smooth"
      });
    }
  };

  const scrollToBooking = () => {
    const widget = document.getElementById("booking-widget");
    if (widget) {
      const topbarOffset = 80;
      const rect = widget.getBoundingClientRect();
      const targetY = window.pageYOffset + rect.top - topbarOffset;
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: "smooth"
      });
    }
  };

  if (!resort) {
    return (
      <div className="resort-details-page">
        <div className="rd-container" style={{ textAlign: "center", padding: "80px 20px" }}>
          <span className="material-symbols-outlined" style={{ fontSize: "64px", color: "var(--rd-muted)" }}>
            travel_explore
          </span>
          <h2 style={{ fontSize: "28px", margin: "16px 0 8px" }}>Resort Not Found</h2>
          <p style={{ color: "var(--rd-muted)", marginBottom: "24px" }}>
            The resort you requested could not be located or may have been unlisted.
          </p>
          <Link to="/listings?category=resorts" className="rd-cta-btn">
            Explore All Resorts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="resort-details-page">
      {/* Top Navigation Header */}
      <header className="rd-topbar">
        <div className="rd-topbar-inner">
          <Link to="/" className="rd-logo-brand" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "#111", fontWeight: "800", fontSize: "20px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "15px", color: "#fff" }}>
                travel_explore
              </span>
            </div>
            <span>traveltri</span>
          </Link>

          <Link to="/listings?category=resorts" className="rd-back-btn">
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
              arrow_back
            </span>
            <span>All Resorts</span>
          </Link>
        </div>
      </header>

      {/* Main Page Container */}
      <main className="rd-container">
        {/* 1. Photo Gallery (At Top) */}
        <ResortGallery
          gallery={resort.gallery || [resort.image]}
          name={resort.name}
        />

        {/* 2. Resort Details (Below Gallery) */}
        <ResortHero
          resort={resort}
          isLiked={isLiked}
          onToggleLike={handleToggleLike}
          onShare={handleShare}
          onBookNowClick={scrollToBooking}
          onViewRoomsClick={scrollToRooms}
        />

        {/* 3. Two-Column Content Grid (Form aligned at top) */}
        <div className="rd-content-grid">
          {/* Left Column: Summary, Narrative, Rooms, Amenities */}
          <div className="rd-main-column">
            {/* Quick Highlights Summary */}
            <ResortSummary resort={resort} />

            <ResortOverview
              resort={resort}
              selectedRooms={Array.isArray(booking.roomTypes) ? booking.roomTypes : [booking.roomType]}
              onSelectRoom={handleSelectRoom}
            />

            <ResortAmenities
              amenities={resort.amenities || resort.facilities}
              resortName={resort.name}
            />
          </div>

          {/* Right Column: Sticky Booking Widget & Contacts */}
          <div className="rd-sidebar-column">
            <ResortContact
              resort={resort}
              booking={booking}
              onChangeBooking={handleBookingChange}
              onToggleRoom={handleToggleRoom}
              onShowToast={showToast}
            />
          </div>
        </div>
      </main>

      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="rd-toast" role="status">
          <span className="material-symbols-outlined" style={{ color: "#38bdf8", fontSize: "18px" }}>
            info
          </span>
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default ResortDetails;
