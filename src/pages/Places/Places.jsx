import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DestinationMasonry from "../../Components/DestinationMasonry/DestinationMasonry";
import { places as defaultPlaces } from "../../data/places";
import { placeStore } from "../../data/stores";
import "./Places.css";

const Places = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const allPlaces = useMemo(() => {
    try {
      const stored = placeStore.get();
      if (Array.isArray(stored) && stored.length > 0) {
        // Merge with rich default places
        const merged = [...defaultPlaces];
        stored.forEach((item) => {
          const exists = merged.some((p) => String(p.id) === String(item.id));
          if (!exists) {
            merged.push({
              ...item,
              images: item.images || (item.image ? [item.image] : []),
              rating: item.rating || 4.5,
              reviews: item.reviews || 120,
            });
          }
        });
        return merged;
      }
    } catch {
      // fallback
    }
    return defaultPlaces;
  }, []);

  const categories = useMemo(() => {
    const set = new Set(allPlaces.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [allPlaces]);

  const filteredPlaces = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allPlaces.filter((place) => {
      const matchesSearch =
        !q ||
        place.name?.toLowerCase().includes(q) ||
        place.location?.toLowerCase().includes(q) ||
        place.description?.toLowerCase().includes(q);

      const matchesCat =
        selectedCategory === "All" || place.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [allPlaces, search, selectedCategory]);

  return (
    <main className="places-page">
      {/* Header */}
      <header className="places-header">
        <Link to="/" className="places-logo">
          <div className="places-logo-circle">
            <span className="material-symbols-outlined" style={{ fontSize: "15px", color: "#fff" }}>
              travel_explore
            </span>
          </div>
          <span>traveltri</span>
        </Link>
      </header>

      {/* Hero */}
      <section className="places-hero">
        <div className="places-hero-content">
          <h1>Discover Wayanad Places</h1>
          <p>Explore stunning viewpoints, cascading waterfalls, and historical trails</p>

          <div className="places-search">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destinations, waterfalls, peaks..."
            />
            <span className="material-symbols-outlined">search</span>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="places-filter-bar">
        <div className="places-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`places-cat-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="places-count-tag">
          {filteredPlaces.length} destination{filteredPlaces.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Grid */}
      <section className="places-grid-section">
        {filteredPlaces.length > 0 ? (
          <DestinationMasonry destinations={filteredPlaces} />
        ) : (
          <div className="places-empty">
            <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#cbd5e1" }}>
              search_off
            </span>
            <p>No places found</p>
            <span>Try searching with a different term</span>
          </div>
        )}
      </section>
    </main>
  );
};

export default Places;
