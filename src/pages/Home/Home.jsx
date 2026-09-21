import { useMemo, useState } from "react";
import Header from "../../Components/Header/Header";
import Hero from "../../Components/Hero/Hero";
import FilterBar from "../../Components/FilterBar/FilterBar";
import DestinationCard from "../../Components/DestinationCard/DestinationCard";
import ResortMasonry from "../../Components/Resort/ResortMasonry";
import FoodMasonry from "../../Components/FoodMasonry/FoodMasonry";

import destinations from "./destinationData";
import resorts from "../../data/resorts";
import foodSpots from "../../data/foodSpots";
import { categories } from "../../data/categoryData";

import "./Home.css";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("places");
  const [selectedState, setSelectedState] = useState("Kerala");
  const [selectedDistrict, setSelectedDistrict] = useState("All");

  const isResortCategory = activeCategory === "resort";
  const isFoodCategory = activeCategory === "food-spot";

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
      <FilterBar
        state={selectedState}
        district={selectedDistrict}
        onStateChange={handleStateChange}
        onDistrictChange={setSelectedDistrict}
      />

      {/* Destination/Resort/Food Grid */}
      <section
        className={
          isResortCategory || isFoodCategory ? "home-masonry" : "destination-grid"
        }
      >
        {isResortCategory ? (
          <ResortMasonry resorts={filteredResorts} />
        ) : isFoodCategory ? (
          <FoodMasonry foods={foodSpots} />
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
