import { useState } from "react";

import Header from "../../Components/Header/Header";
import FoodMasonry from "../../Components/FoodMasonry/FoodMasonry";

import foodSpots from "../../data/foodSpots";

import "./FoodSpots.css";

const FoodSpots = () => {

  const [search, setSearch] = useState("");

  const filteredFoods = foodSpots.filter((food) =>
    `${food.title} ${food.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="food-page">

      <Header />


      {/* =================================
          FOOD HERO
      ================================= */}

      <section className="food-hero">

        <div className="food-hero-overlay" />

        <div className="food-hero-content">

          <h1>
            Discover Food Spots
          </h1>

          <p>
            Explore the best food experiences around you
          </p>


          <div className="food-search">

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search food spots..."
            />

            <span>
              🔍
            </span>

          </div>

        </div>

      </section>


      {/* =================================
          CATEGORY / FILTER
      ================================= */}

      <div className="food-filter-row">

        <button className="food-filter-active">
          Food Spot
        </button>

        <button>
          Kerala
        </button>

        <button>
          Wayanad
        </button>

        <button className="food-filter-button">
          Filter
        </button>

      </div>


      {/* =================================
          MASONRY
      ================================= */}

      <FoodMasonry
        foods={filteredFoods}
      />

    </main>
  );
};

export default FoodSpots;