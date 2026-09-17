import { useMemo, useState } from "react";
import Header from "../../Components/Header/Header";
import Hero from "../../Components/Hero/Hero";
import FilterBar from "../../Components/FilterBar/FilterBar";
import DestinationCard from "../../Components/DestinationCard/DestinationCard";

import destinations from "./destinationData";
import { categories } from "../../data/categoryData";

import "./Home.css";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("places");
  const visibleDestinations = useMemo(
    () => destinations.filter((destination) => destination.category === activeCategory),
    [activeCategory],
  );

  return (
    <main className="home-page">

      {/* Header */}
      <Header />

      {/* Hero */}
      <Hero
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Filters */}
      <FilterBar />

      {/* Destination Grid */}
      <section className="destination-grid">

        {visibleDestinations.map((destination) => (

          <DestinationCard
            key={destination.id}
            image={destination.image}
            location={destination.location}
            likes={destination.likes}
            comments={destination.comments}
          />

        ))}

      </section>

    </main>
  );
};

export default Home;
