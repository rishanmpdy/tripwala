import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import FoodGallery from "../../Components/FoodDetails/FoodGallery";
import FoodHeader from "../../Components/FoodDetails/FoodHeader";
import FoodOverview from "../../Components/FoodDetails/FoodOverview";
import FoodHighlights from "../../Components/FoodDetails/FoodHighlights";
import FoodMenu from "../../Components/FoodDetails/FoodMenu";
import FoodLocation from "../../Components/FoodDetails/FoodLocation";

import { foodSpots, getFoodSpotById } from "../../data/foodData";

import "../../Components/FoodDetails/FoodDetails.css";

const FoodDetails = () => {
  const { id } = useParams();

  const food = useMemo(() => {
    const directMatch = foodSpots.find(
      (item) => String(item.id) === String(id) || String(item.id) === String(id).replace("food-", "")
    );
    if (directMatch) return directMatch;

    return getFoodSpotById(id);
  }, [id]);

  if (!food) {
    return (
      <main className="food-details-page">
        <div className="food-not-found">
          <h1>Food Spot Not Found</h1>
          <p>
            The food spot you're looking for is not available.
          </p>
          <Link to="/listings?category=food-spot">
            ← Back to Food Spots
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="food-details-page">
      {/* 1. Top Masonry 4+ Photo Showcase (with Floating Back Button) */}
      <FoodGallery food={food} />

      {/* 2. Food Header with title, location, category, rating & price */}
      <FoodHeader food={food} />

      {/* 3. Details Content & Location Sidebar */}
      <div className="food-details-layout">
        <div className="food-details-main">
          <FoodMenu food={food} />
        </div>

        <aside className="food-details-sidebar">
          <FoodLocation food={food} />
          <FoodOverview food={food} />
          <FoodHighlights food={food} />
        </aside>
      </div>
    </main>
  );
};

export default FoodDetails;
