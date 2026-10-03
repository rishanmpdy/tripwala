import { useMemo, useState } from "react";
import ResortMasonry from "../../Components/Resort/ResortMasonry";
import resorts from "../../data/resortData";
import "./Resorts.css";

/* Unique badge types & locations from data */
const allBadges = [
  "All",
  ...Array.from(new Set(resorts.map((r) => r.badge).filter(Boolean))),
];

const allLocations = [
  "All",
  ...Array.from(new Set(resorts.map((r) => r.location.split(",")[1]?.trim() || r.location.trim()))),
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "popular", label: "Most popular" },
];

const Resorts = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [badge, setBadge] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  /* Filter + Sort */
  const filteredResorts = useMemo(() => {
    const query = search.trim().toLowerCase();

    let result = resorts.filter((resort) => {
      const matchesSearch =
        !query ||
        resort.name.toLowerCase().includes(query) ||
        resort.location.toLowerCase().includes(query) ||
        resort.description.toLowerCase().includes(query);

      const matchesLocation =
        location === "All" ||
        resort.location.toLowerCase().includes(location.toLowerCase());

      const matchesBadge =
        badge === "All" ||
        resort.badge === badge;

      return matchesSearch && matchesLocation && matchesBadge;
    });

    if (sortBy === "newest") {
      result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      result = [...result].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === "popular") {
      result = [...result].sort((a, b) => {
        const parseNum = (val) => parseFloat(String(val).replace("k", "")) * (String(val).includes("k") ? 1000 : 1);
        return parseNum(b.likes) - parseNum(a.likes);
      });
    }

    return result;
  }, [search, location, badge, sortBy]);

  return (
    <main className="resorts-page">
      {/* Header */}
      <header className="resorts-header">
        <div className="resorts-logo">
          <div className="resorts-logo-circle">
            <span className="material-symbols-outlined" style={{ fontSize: "15px", color: "#fff" }}>travel_explore</span>
          </div>
          <span>traveltri</span>
        </div>
      </header>

      {/* Hero */}
      <section className="resorts-hero">
        <div className="resorts-hero-overlay" />
        <div className="resorts-hero-content">
          <h1>Discover Resorts</h1>
          <p>Find beautiful places to stay around your destination</p>

          <div className="resorts-search">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search resorts..."
            />
            <span className="material-symbols-outlined">search</span>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="resorts-filter">
        {/* Location pills */}
        <div className="resorts-filter-left">
          {allLocations.map((loc) => (
            <button
              key={loc}
              className={location === loc ? "active" : ""}
              onClick={() => setLocation(loc)}
            >
              {loc}
            </button>
          ))}
        </div>

        {/* Badge type filter */}
        <div className="resorts-filter-badges">
          {allBadges.map((b) => (
            <button
              key={b}
              className={`badge-pill ${badge === b ? "active" : ""} ${b !== "All" ? `badge-pill-${b.toLowerCase().replace(/\s+/g, "-")}` : ""}`}
              onClick={() => setBadge(b)}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="resorts-filter-sort">
          <span className="material-symbols-outlined sort-icon">sort</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count Bar */}
      <div className="resorts-results-bar">
        <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "#888" }}>hotel</span>
        <span>{filteredResorts.length} resort{filteredResorts.length !== 1 ? "s" : ""} found</span>

        {(search || location !== "All" || badge !== "All") && (
          <button
            className="clear-filters-btn"
            onClick={() => { setSearch(""); setLocation("All"); setBadge("All"); setSortBy("newest"); }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>close</span>
            Clear filters
          </button>
        )}
      </div>

      {/* Listing */}
      <section className="resort-listing">
        {filteredResorts.length > 0 ? (
          <ResortMasonry resorts={filteredResorts} />
        ) : (
          <div className="resorts-empty">
            <span className="material-symbols-outlined resorts-empty-icon">search_off</span>
            <p>No resorts found</p>
            <span>Try adjusting your filters</span>
          </div>
        )}
      </section>
    </main>
  );
};

export default Resorts;
