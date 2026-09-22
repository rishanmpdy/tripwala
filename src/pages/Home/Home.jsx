import { useMemo, useState, useRef } from "react";
import Header from "../../Components/Header/Header";
import Hero from "../../Components/Hero/Hero";
import FilterBar from "../../Components/FilterBar/FilterBar";
import DestinationCard from "../../Components/DestinationCard/DestinationCard";
import DestinationMasonry from "../../Components/DestinationMasonry/DestinationMasonry";
import ResortMasonry from "../../Components/Resort/ResortMasonry";
import FoodMasonry from "../../Components/FoodMasonry/FoodMasonry";
import HomestayMasonry from "../../Components/HomestayMasonry/HomestayMasonry";
import TaxiGrid from "../../Components/Taxi/TaxiGrid";

import destinations from "./destinationData";
import resorts from "../../data/resorts";
import foodSpots from "../../data/foodSpots";
import homestays from "../../data/homestays";
import taxis from "../../data/taxis";
import { categories } from "../../data/categoryData";

import "./Home.css";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("places");
  const listingRef = useRef(null);
  const hasScrolledRef = useRef(false);
  const [selectedState, setSelectedState] = useState("Kerala");
  const [selectedDistrict, setSelectedDistrict] = useState("All");

  const isResortCategory   = activeCategory === "resort";
  const isFoodCategory     = activeCategory === "food-spot";
  const isHomestayCategory = activeCategory === "homestay";
  const isTaxiCategory     = activeCategory === "taxi";
  const isMasonryCategory  = ["places", "hidden-spot", "must-watch"].includes(activeCategory);

  const visibleDestinations = useMemo(
    () =>
      destinations.filter(
        (destination) => destination.category === activeCategory,
      ),
    [activeCategory],
  );

  const filteredResorts = useMemo(() => {
    return resorts.filter((resort) => {
      const locationText = resort.location.toLowerCase();

      const matchesState =
        selectedState === "Kerala" || locationText.includes(selectedState.toLowerCase());

      const matchesDistrict =
        selectedDistrict === "All" ||
        locationText.includes(selectedDistrict.toLowerCase());

      return matchesState && matchesDistrict;
    });
  }, [selectedState, selectedDistrict]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    
    if (!hasScrolledRef.current) {
      hasScrolledRef.current = true;
      setTimeout(() => {
        if (listingRef.current) {
          listingRef.current.scrollIntoView({ behavior: "smooth" });
          listingRef.current.focus({ preventScroll: true });
        }
      }, 100);
    }
  };

  const handleStateChange = (nextState) => {
    setSelectedState(nextState);
    setSelectedDistrict("All");
  };

  return (
    <main className="home-page">
      {/* Header */}
      <Header />

      {/* Hero */}
      <Hero
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Filters */}
      <div ref={listingRef} tabIndex={-1} style={{ scrollMarginTop: "20px", outline: "none" }}>
        <FilterBar
          state={selectedState}
          district={selectedDistrict}
          onStateChange={handleStateChange}
          onDistrictChange={setSelectedDistrict}
        />
      </div>

      {/* Destination/Resort/Food/Homestay/Taxi Grid */}
      <section
        className={
          isResortCategory || isFoodCategory || isHomestayCategory || isMasonryCategory
            ? "home-masonry"
            : isTaxiCategory
            ? "home-taxi"
            : "destination-grid"
        }
      >
        {isResortCategory ? (
          <ResortMasonry resorts={filteredResorts} />
        ) : isFoodCategory ? (
          <FoodMasonry foods={foodSpots} />
        ) : isHomestayCategory ? (
          <HomestayMasonry homestays={homestays} />
        ) : isTaxiCategory ? (
          <TaxiGrid taxis={taxis} />
        ) : isMasonryCategory ? (
          <DestinationMasonry destinations={visibleDestinations} />
        ) : (
          visibleDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              id={destination.id}
              image={destination.image}
              location={destination.location}
              likes={destination.likes}
              comments={destination.comments}
            />
          ))
        )}
      </section>
    </main>
  );
};

export default Home;
