import { useMemo, useState } from "react";
import Header from "../../Components/Header/Header";
import Hero from "../../Components/Hero/Hero";
import FilterBar from "../../Components/FilterBar/FilterBar";
import DestinationCard from "../../Components/DestinationCard/DestinationCard";
import ResortCard from "../../Components/ResortCard/ResortCard";

import destinations from "./destinationData";
import resorts from "../../data/resorts";
import { categories } from "../../data/categoryData";

import "./Home.css";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("places");
  const [showResorts, setShowResorts] = useState(false);

  const visibleDestinations = useMemo(
    () =>
      destinations.filter(
        (destination) => destination.category === activeCategory,
      ),
    [activeCategory],
  );

  const visibleResorts = useMemo(
    () =>
      resorts.filter(
        (resort) => resort.category === activeCategory,
      ),
    [activeCategory],
  );

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setShowResorts(categoryId === "resort");
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
      <FilterBar />

      {/* Destination/Resort Grid */}
      <section className="destination-grid">
        {showResorts ? (
          visibleResorts.map((resort) => (
            <ResortCard key={resort.id} resort={resort} />
          ))
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
