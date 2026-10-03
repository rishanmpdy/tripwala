import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import PlaceHero from "../../Components/PlaceDetails/PlaceHero";
import PlaceHeader from "../../Components/PlaceDetails/PlaceHeader";
import PlaceOverview from "../../Components/PlaceDetails/PlaceOverview";
import PlaceHighlights from "../../Components/PlaceDetails/PlaceHighlights";
import PlaceGallery from "../../Components/PlaceDetails/PlaceGallery";
import PlaceLocation from "../../Components/PlaceDetails/PlaceLocation";

import { places } from "../../data/places";
import { placeStore } from "../../data/stores";

import "../../Components/PlaceDetails/PlaceDetails.css";

const PlaceDetails = () => {
  const { id } = useParams();

  const place = useMemo(() => {
    // 1. Try rich places dataset
    const rich = places.find(
      (item) =>
        String(item.id) === String(id) ||
        String(item.id) === String(id).replace("place-", "")
    );

    // 2. Try admin local storage / placeStore
    try {
      const stored = placeStore?.get?.();
      if (Array.isArray(stored)) {
        const match = stored.find(
          (item) =>
            String(item.id) === String(id) ||
            String(item.id) === String(id).replace("place-", "")
        );
        if (match) {
          return { ...(rich || {}), ...match };
        }
      }
    } catch {
      // fallback
    }

    return rich;
  }, [id]);

  if (!place) {
    return (
      <main className="place-details-page">
        <div className="place-not-found">
          <h1>Place not found</h1>
          <p>The place you're looking for is not available.</p>
          <Link to="/listings?category=places">
            ← Back to Places
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="place-details-page">
      {/* HERO */}
      <PlaceHero place={place} />

      {/* HEADER */}
      <PlaceHeader place={place} />

      {/* CONTENT */}
      <div className="place-details-layout">
        <div className="place-details-main">
          <PlaceOverview place={place} />
          <PlaceHighlights place={place} />
          <PlaceGallery place={place} />
        </div>

        <aside className="place-details-sidebar">
          <PlaceLocation place={place} />
        </aside>
      </div>
    </main>
  );
};

export default PlaceDetails;
