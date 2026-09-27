import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../Components/Header/Header";
import FilterBar from "../../Components/FilterBar/FilterBar";
import DestinationMasonry from "../../Components/DestinationMasonry/DestinationMasonry";
import ResortMasonry from "../../Components/Resort/ResortMasonry";
import FoodMasonry from "../../Components/FoodMasonry/FoodMasonry";
import HomestayMasonry from "../../Components/HomestayMasonry/HomestayMasonry";
import TaxiGrid from "../../Components/Taxi/TaxiGrid";

import { getPublicDestinations, getPublicResorts, getPublicFoodSpots, getPublicHomestays, getPublicTaxis } from "../../data/publicListings";




import { getCategories } from "../../data/categoryStore";

import "./Listings.css";

const chipMatch = (itemVal, selected) => {
  if (!selected || selected.length === 0) return true;
  const v = (itemVal || "").toLowerCase();
  return selected.some((s) => v.includes(s.toLowerCase()));
};

const chipMatchArray = (itemArr, selected) => {
  if (!selected || selected.length === 0) return true;
  return selected.some((s) =>
    (itemArr || []).some((f) => f.toLowerCase().includes(s.toLowerCase()))
  );
};

const sortItems = (items, sortBy) => {
  if (!sortBy) return items;
  const arr = [...items];
  switch (sortBy) {
    case "Newest":          return arr.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    case "Most Liked":      return arr.sort((a, b) => Number(b.likes || 0) - Number(a.likes || 0));
    case "Top Rated":       return arr.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    case "A-Z":             return arr.sort((a, b) => (a.name || a.spotName || "").localeCompare(b.name || b.spotName || ""));
    case "Price: Low-High": return arr.sort((a, b) => Number(a.pricePerKm || a.pricePerDay || 0) - Number(b.pricePerKm || b.pricePerDay || 0));
    case "Price: High-Low": return arr.sort((a, b) => Number(b.pricePerKm || b.pricePerDay || 0) - Number(a.pricePerKm || a.pricePerDay || 0));
    case "Most Reviews":    return arr.sort((a, b) => Number(b.reviews || 0) - Number(a.reviews || 0));
    default:                return arr;
  }
};

const Listings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "places";

  const [categories, setCategories] = useState(getCategories);
  const [placesData, setPlacesData] = useState(getPublicDestinations());
  const [resortsData, setResortsData] = useState(getPublicResorts());
  const [foodData, setFoodData] = useState(getPublicFoodSpots());
  const [homestaysData, setHomestaysData] = useState(getPublicHomestays());
  const [taxisData, setTaxisData] = useState(getPublicTaxis());
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);
  const [selectedState, setSelectedState] = useState("Kerala");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [activeFilters, setActiveFilters] = useState({});
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const refresh = () => setCategories(getCategories());
    const refreshData = () => {
      setPlacesData(getPublicDestinations());
      setResortsData(getPublicResorts());
      setFoodData(getPublicFoodSpots());
      setHomestaysData(getPublicHomestays());
      setTaxisData(getPublicTaxis());
    };
    window.addEventListener("tripwala-categories-updated", refresh);
    window.addEventListener("tripwala-places-updated", refreshData);
    window.addEventListener("tripwala-resorts-updated", refreshData);
    window.addEventListener("tripwala-food-updated", refreshData);
    window.addEventListener("tripwala-homestays-updated", refreshData);
    window.addEventListener("tripwala-taxis-updated", refreshData);
    const handleStorage = () => { refresh(); refreshData(); }; window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("tripwala-categories-updated", refresh);
      window.removeEventListener("tripwala-places-updated", refreshData);
      window.removeEventListener("tripwala-resorts-updated", refreshData);
      window.removeEventListener("tripwala-food-updated", refreshData);
      window.removeEventListener("tripwala-homestays-updated", refreshData);
      window.removeEventListener("tripwala-taxis-updated", refreshData);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    if (categoryFromUrl !== activeCategory) setActiveCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  useEffect(() => {
    setActiveFilters({});
    setSortBy("");
    setSelectedDistrict("All");
  }, [activeCategory]);

  const handleCategoryChange = (categoryId) => {
    setSearchParams({ category: categoryId });
    setActiveCategory(categoryId);
  };

  const handleStateChange = (nextState) => {
    setSelectedState(nextState);
    setSelectedDistrict("All");
  };

  const handleFilterChange = (key, values) => {
    setActiveFilters((prev) => ({ ...prev, [key]: values }));
  };

  const locationMatch = (item) => {
    const loc = (item.location || item.address || "").toLowerCase();
    const dist = (item.district || "").toLowerCase();
    const stateOk =
      selectedState === "Kerala" ||
      loc.includes(selectedState.toLowerCase()) ||
      (item.state || "").toLowerCase().includes(selectedState.toLowerCase());
    const distOk =
      selectedDistrict === "All" ||
      loc.includes(selectedDistrict.toLowerCase()) ||
      dist.includes(selectedDistrict.toLowerCase());
    return stateOk && distOk;
  };

  const filteredPlaces = useMemo(() => {
    const f = activeFilters;
    let items = placesData.filter((d) => locationMatch(d));
    if (f.type?.length)    items = items.filter((d) => chipMatch(d.category, f.type));
    if (f.bestFor?.length) items = items.filter((d) => chipMatchArray(d.bestFor || d.tags, f.bestFor));
    return sortItems(items, sortBy);
  }, [activeFilters, selectedState, selectedDistrict, sortBy, placesData, resortsData, foodData, homestaysData, taxisData]);

  const filteredResorts = useMemo(() => {
    const f = activeFilters;
    let items = resortsData.filter((r) => locationMatch(r));
    if (f.type?.length)      items = items.filter((r) => chipMatch(r.type, f.type));
    if (f.amenities?.length) items = items.filter((r) => chipMatchArray(r.amenities || r.features, f.amenities));
    if (f.bestFor?.length)   items = items.filter((r) => chipMatchArray(r.bestFor || r.tags, f.bestFor));
    return sortItems(items, sortBy);
  }, [activeFilters, selectedState, selectedDistrict, sortBy, placesData, resortsData, foodData, homestaysData, taxisData]);

  const filteredFood = useMemo(() => {
    const f = activeFilters;
    let items = foodData.filter((fs) => locationMatch(fs));
    if (f.cuisine?.length)  items = items.filter((fs) => chipMatch(fs.cuisine || fs.category, f.cuisine));
    if (f.features?.length) items = items.filter((fs) => chipMatchArray(fs.features || fs.tags, f.features));
    if (f.mealTime?.length) items = items.filter((fs) => chipMatchArray(fs.mealTime || fs.timing, f.mealTime));
    return sortItems(items, sortBy);
  }, [activeFilters, selectedState, selectedDistrict, sortBy, placesData, resortsData, foodData, homestaysData, taxisData]);

  const filteredHomestays = useMemo(() => {
    const f = activeFilters;
    let items = homestaysData.filter((h) => locationMatch(h));
    if (f.type?.length)      items = items.filter((h) => chipMatch(h.type, f.type));
    if (f.amenities?.length) items = items.filter((h) => chipMatchArray(h.amenities || h.features, f.amenities));
    if (f.bestFor?.length)   items = items.filter((h) => chipMatchArray(h.bestFor || h.tags, f.bestFor));
    return sortItems(items, sortBy);
  }, [activeFilters, selectedState, selectedDistrict, sortBy, placesData, resortsData, foodData, homestaysData, taxisData]);

  const filteredTaxis = useMemo(() => {
    const f = activeFilters;
    let items = taxisData.filter((t) => locationMatch(t));
    if (f.vehicleType?.length) items = items.filter((t) => chipMatch(t.vehicleType, f.vehicleType));
    if (f.features?.length)    items = items.filter((t) => chipMatchArray(t.features, f.features));
    return sortItems(items, sortBy);
  }, [activeFilters, selectedState, selectedDistrict, sortBy, placesData, resortsData, foodData, homestaysData, taxisData]);

  const isResortCategory   = activeCategory === "resort";
  const isFoodCategory     = activeCategory === "food-spot";
  const isHomestayCategory = activeCategory === "homestay";
  const isTaxiCategory     = activeCategory === "taxi";
  const isPlacesCategory   = activeCategory === "places";

  const currentData = isPlacesCategory ? filteredPlaces
    : isResortCategory   ? filteredResorts
    : isFoodCategory     ? filteredFood
    : isHomestayCategory ? filteredHomestays
    : isTaxiCategory     ? filteredTaxis
    : [];

  const isEmpty = currentData.length === 0;

  const gridClass = (isPlacesCategory || isResortCategory || isFoodCategory || isHomestayCategory)
    ? "home-masonry"
    : isTaxiCategory
    ? "home-taxi"
    : "destination-grid";

  return (
    <main className="listings-page">
      <Header
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="listings-filter-bar">
        <FilterBar
          category={activeCategory}
          state={selectedState}
          district={selectedDistrict}
          onStateChange={handleStateChange}
          onDistrictChange={setSelectedDistrict}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      {isEmpty ? (
        <div className="listings-empty">
          <span className="material-symbols-outlined listings-empty-icon">search_off</span>
          <p>No results match your filters.</p>
          <button
            className="listings-empty-reset"
            onClick={() => { setActiveFilters({}); setSortBy(""); setSelectedDistrict("All"); }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <section className={"listings-grid-section " + gridClass}>
          {isResortCategory   ? <ResortMasonry resorts={filteredResorts} />       :
           isFoodCategory     ? <FoodMasonry foods={filteredFood} />              :
           isHomestayCategory ? <HomestayMasonry homestays={filteredHomestays} /> :
           isTaxiCategory     ? <TaxiGrid taxis={filteredTaxis} />                :
                                <DestinationMasonry destinations={filteredPlaces} />}
        </section>
      )}
    </main>
  );
};

export default Listings;




