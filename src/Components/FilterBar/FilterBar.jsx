import { useRef, useState } from "react";
import { districtsByState, states } from "../../data/locationData";
import "./FilterBar.css";

/* ─────────────────────────────────────────────────────────
   STRIP_FILTERS  → shown as chips directly in the bar
   DRAWER_FILTERS → shown only inside the Filters drawer
   clearAll iterates ALL_FILTERS (both combined per category)
───────────────────────────────────────────────────────── */
const STRIP_FILTERS = {
  places:      [],
  resort:      [],
  "food-spot": [],
  homestay:    [],
  taxi:        [],
};

const DRAWER_ONLY_FILTERS = {
  places: [
    { key: "type",    label: "Type",     icon: "landscape", options: ["Waterfall","Historical","Nature","Beach","Hill Station","Forest","Wildlife","Trekking"] },
    { key: "entry",   label: "Entry",    icon: "confirmation_number", options: ["Free Entry", "Paid Entry"] },
    { key: "bestFor", label: "Best For", icon: "people",    options: ["Family","Couple","Solo","Adventure","Photography"] },
  ],
  resort: [
    { key: "type",       label: "Type",      icon: "hotel",          options: ["Luxury Resort","Budget Resort","Eco Resort","Tree House","Villas","Cottages"] },
    { key: "priceRange", label: "Price",     icon: "currency_rupee", options: ["Under 2000", "2000-5000", "5000-10000", "10000+"] },
    { key: "amenities",  label: "Amenities", icon: "pool",           options: ["Pool","Spa","Restaurant","WiFi","Parking","AC","Pet Friendly"] },
    { key: "bestFor",    label: "Best For",  icon: "people",         options: ["Family","Couple","Honeymoon","Corporate","Group"] },
  ],
  "food-spot": [
    { key: "cuisine",    label: "Cuisine",  icon: "restaurant",         options: ["Kerala","North Indian","Chinese","Continental","Seafood","Street Food","Cafe","Bakery"] },
    { key: "priceRange", label: "Budget",   icon: "currency_rupee",     options: ["Budget", "Mid-range", "Fine Dining"] },
    { key: "features",   label: "Features", icon: "featured_play_list", options: ["Rooftop","Live Music","Veg Only","Outdoor Seating","Delivery","Takeaway"] },
    { key: "mealTime",   label: "Meal",     icon: "schedule",           options: ["Breakfast","Lunch","Dinner","All Day"] },
  ],
  homestay: [
    { key: "type",       label: "Type",      icon: "cottage",        options: ["Private Homestay","Shared Room","Entire Villa","Farm Stay","Tree House"] },
    { key: "priceRange", label: "Price",     icon: "currency_rupee", options: ["Under 1000", "1000-3000", "3000-6000", "6000+"] },
    { key: "amenities",  label: "Amenities", icon: "home",           options: ["AC","WiFi","Kitchen","Parking","Balcony","Garden","Bonfire"] },
    { key: "bestFor",    label: "Best For",  icon: "people",         options: ["Family","Couple","Group","Solo"] },
  ],
  taxi: [
    { key: "vehicleType", label: "Vehicle",  icon: "directions_car", options: ["SUV","Sedan","Minivan","Hatchback","Tempo Traveller","Bus"] },
    { key: "features",    label: "Features", icon: "checklist",      options: ["AC","Airport Pickup","Outstation","Driver","24x7","Luggage Space"] },
    { key: "pricePerDay", label: "Rate/Day", icon: "currency_rupee", options: ["Under 1500", "1500-3000", "3000-5000", "5000+"] },
  ],
};

const SORT_OPTIONS = {
  places:      ["Newest","Most Liked","Top Rated","A–Z"],
  resort:      ["Newest","Price: Low–High","Price: High–Low","Top Rated","Most Liked"],
  "food-spot": ["Newest","Top Rated","Most Liked","A–Z"],
  homestay:    ["Newest","Price: Low–High","Price: High–Low","Top Rated"],
  taxi:        ["Price: Low–High","Top Rated","Most Reviews"],
};

const FilterBar = ({
  category = "places",
  state = "Kerala",
  district = "All",
  onStateChange,
  onDistrictChange,
  activeFilters = {},
  onFilterChange,
  sortBy = "",
  onSortChange,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrollRef = useRef(null);

  const districts    = districtsByState[state] ?? [];
  const stripFilters  = STRIP_FILTERS[category]       || [];
  const drawerOnlyFilters = DRAWER_ONLY_FILTERS[category] || [];
  const allDrawerFilters  = [...stripFilters, ...drawerOnlyFilters]; // drawer shows everything
  const sortOptions  = SORT_OPTIONS[category]  || ["Newest"];

  const toggleChip = (key, value) => {
    const cur  = activeFilters[key] || [];
    const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
    onFilterChange(key, next);
  };

  const isActive = (key, value) => (activeFilters[key] || []).includes(value);

  const countActive = Object.values(activeFilters).reduce((acc, v) => acc + (v?.length || 0), 0)
    + (district !== "All" ? 1 : 0);

  const clearAll = () => {
    allDrawerFilters.forEach((f) => onFilterChange(f.key, []));
    onDistrictChange("All");
    if (onSortChange) onSortChange("");
  };

  return (
    <div className="fb-root">

      {/* ── TOP ROW ───────────────────────────────── */}
      <div className="fb-row">

        {/* Location */}
        <div className="fb-location">
          <span className="material-symbols-outlined fb-loc-icon">location_on</span>
          <select
            className="fb-select"
            value={state}
            onChange={(e) => onStateChange(e.target.value)}
          >
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <span className="fb-sep">›</span>
          <select
            className="fb-select"
            value={district}
            onChange={(e) => onDistrictChange(e.target.value)}
            disabled={districts.length === 0}
          >
            {districts.length
              ? districts.map((d) => <option key={d} value={d}>{d}</option>)
              : <option value="">–</option>}
          </select>
        </div>

        {/* Chip scroll — STRIP only */}
        <div className="fb-chips-wrap" ref={scrollRef}>
          <div className="fb-chips-row">
            {stripFilters.map((group, gi) => (
              <div key={group.key} className="fb-chip-group">
                {gi > 0 && <span className="fb-group-sep" />}
                <span className="fb-group-label">{group.label}</span>
                {group.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={"fb-chip" + (isActive(group.key, opt) ? " fb-chip--on" : "")}
                    onClick={() => toggleChip(group.key, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right controls */}
        <div className="fb-controls">
          {/* Sort */}
          <label className="fb-sort">
            <span className="material-symbols-outlined" style={{ fontSize: 15 }}>swap_vert</span>
            <select
              className="fb-select fb-sort-select"
              value={sortBy}
              onChange={(e) => onSortChange && onSortChange(e.target.value)}
            >
              <option value="">Sort</option>
              {sortOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>

          {/* Filter toggle */}
          <button
            type="button"
            className={"fb-filter-btn" + (drawerOpen ? " fb-filter-btn--open" : "")}
            onClick={() => setDrawerOpen((o) => !o)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>tune</span>
            Filters
            {countActive > 0 && <span className="fb-count">{countActive}</span>}
          </button>

          {/* Clear */}
          {countActive > 0 && (
            <button type="button" className="fb-clear-btn" onClick={clearAll} title="Clear all filters">
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>close</span>
            </button>
          )}
        </div>
      </div>

      {/* ── DRAWER ───────────────────────────────── */}
      {drawerOpen && (
        <div className="fb-drawer">
          <div className="fb-drawer-body">
            {allDrawerFilters.map((group) => (
              <div key={group.key} className="fb-drawer-group">
                <div className="fb-drawer-group-title">
                  <span className="material-symbols-outlined" style={{ fontSize: 15, fontVariationSettings: "'FILL' 1" }}>{group.icon}</span>
                  {group.label}
                </div>
                <div className="fb-drawer-chips">
                  {group.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={"fb-chip fb-chip--lg" + (isActive(group.key, opt) ? " fb-chip--on" : "")}
                      onClick={() => toggleChip(group.key, opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="fb-drawer-footer">
            <button type="button" className="fb-drawer-clear" onClick={clearAll}>Clear All</button>
            <button type="button" className="fb-drawer-apply" onClick={() => setDrawerOpen(false)}>
              {countActive > 0 ? `Show results (${countActive} active)` : "Apply"}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default FilterBar;
