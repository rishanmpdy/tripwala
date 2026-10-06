import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Hero from "../../Components/Hero/Hero";
import DestinationMasonry from "../../Components/DestinationMasonry/DestinationMasonry";
import ResortMasonry from "../../Components/Resort/ResortMasonry";
import FoodMasonry from "../../Components/FoodMasonry/FoodMasonry";
import HomestayMasonry from "../../Components/HomestayMasonry/HomestayMasonry";
import { getCategories } from "../../data/categoryStore";
import {
  getPublicDestinations,
  getPublicResorts,
  getPublicFoodSpots,
  getPublicHomestays,
} from "../../data/publicListings";
import "./Home.css";

const SHOWCASE_TABS = [
  { id: "places", label: "Places", icon: "landscape" },
  { id: "resort", label: "Resorts", icon: "hotel" },
  { id: "food", label: "Food Spots", icon: "restaurant" },
  { id: "homestay", label: "Homestays", icon: "cottage" },
];

const Home = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(() => getCategories()[0]?.id || "places");
  const [showcaseTab, setShowcaseTab] = useState("places");
  const [isAutoSwitching, setIsAutoSwitching] = useState(true);

  const [categories, setCategories] = useState(getCategories);
  const [destinations, setDestinations] = useState(getPublicDestinations);
  const [resorts, setResorts] = useState(getPublicResorts);
  const [foodSpots, setFoodSpots] = useState(getPublicFoodSpots);
  const [homestays, setHomestays] = useState(getPublicHomestays);

  useEffect(() => {
    const refreshCategories = () => setCategories(getCategories());
    const refreshPlaces = () => setDestinations(getPublicDestinations());
    const refreshResorts = () => setResorts(getPublicResorts());
    const refreshFood = () => setFoodSpots(getPublicFoodSpots());
    const refreshHomestays = () => setHomestays(getPublicHomestays());

    window.addEventListener("tripwala-categories-updated", refreshCategories);
    window.addEventListener("tripwala-places-updated", refreshPlaces);
    window.addEventListener("tripwala-resorts-updated", refreshResorts);
    window.addEventListener("tripwala-food-updated", refreshFood);
    window.addEventListener("tripwala-homestays-updated", refreshHomestays);

    const handleStorage = () => {
      refreshCategories();
      refreshPlaces();
      refreshResorts();
      refreshFood();
      refreshHomestays();
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("tripwala-categories-updated", refreshCategories);
      window.removeEventListener("tripwala-places-updated", refreshPlaces);
      window.removeEventListener("tripwala-resorts-updated", refreshResorts);
      window.removeEventListener("tripwala-food-updated", refreshFood);
      window.removeEventListener("tripwala-homestays-updated", refreshHomestays);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Auto-switch tabs periodically across all categories; stops permanently when any tab is clicked
  useEffect(() => {
    if (!isAutoSwitching) return;

    const interval = setInterval(() => {
      setShowcaseTab((current) => {
        const tabKeys = SHOWCASE_TABS.map((t) => t.id);
        const nextIndex = (tabKeys.indexOf(current) + 1) % tabKeys.length;
        return tabKeys[nextIndex];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoSwitching]);

  const handleTabClick = (tabId) => {
    setIsAutoSwitching(false); // Stop auto-switching permanently on user interaction
    setShowcaseTab(tabId);
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    navigate(`/listings?category=${categoryId}`);
  };

  const handleSearch = (term) => {
    if (!term) return;
    navigate(`/listings?category=places&search=${encodeURIComponent(term)}`);
  };

  // Top recommended places
  const recommendedPlaces = useMemo(() => {
    return [...destinations].sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0)).slice(0, 10);
  }, [destinations]);

  // Curated stays
  const curatedResorts = useMemo(() => {
    return [...resorts].sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0)).slice(0, 10);
  }, [resorts]);

  // Popular food spots
  const curatedFood = useMemo(() => {
    return [...foodSpots].sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0)).slice(0, 10);
  }, [foodSpots]);

  // Curated homestays
  const curatedHomestays = useMemo(() => {
    return [...homestays].slice(0, 10);
  }, [homestays]);

  const getTabCount = (tabId) => {
    if (tabId === "places") return destinations.length;
    if (tabId === "resort") return resorts.length;
    if (tabId === "food") return foodSpots.length;
    if (tabId === "homestay") return homestays.length;
    return 0;
  };

  return (
    <main className="home-page">
      <Header />

      {/* Hero with search and categories */}
      <Hero
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        onSearch={handleSearch}
      />

      {/* Minimal Listing Showcase: Center Aligned, Small Box Tiles with Auto-Switching */}
      <section className="home-section center-align" id="showcase-section">
        <div className="section-header-center">
          <h2 className="section-title-center">Discover Highlights</h2>
        </div>

        {/* Center-Aligned Filter Tabs with Auto-Switching */}
        <div className="showcase-tabs-center">
          {SHOWCASE_TABS.map((tab) => {
            const isActive = showcaseTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={`showcase-tab-btn ${isActive ? "active" : ""} ${isActive && isAutoSwitching ? "auto-active" : ""}`}
                onClick={() => handleTabClick(tab.id)}
                aria-label={`View ${tab.label}`}
              >
                <span className="material-symbols-outlined">{tab.icon}</span>
                {tab.label}
                <span className="showcase-tab-count">{getTabCount(tab.id)}</span>
                {isActive && isAutoSwitching && (
                  <span className="showcase-pulse-dot" title="Auto-switching (click to stop)" />
                )}
              </button>
            );
          })}
        </div>

        {/* Smooth Small-Tile Masonry Grid */}
        <div className="home-showcase-content">
          <div key={showcaseTab} className="showcase-tab-pane">
            {showcaseTab === "places" && (
              <DestinationMasonry destinations={recommendedPlaces} />
            )}
            {showcaseTab === "resort" && (
              <ResortMasonry resorts={curatedResorts} />
            )}
            {showcaseTab === "food" && (
              <FoodMasonry foods={curatedFood} />
            )}
            {showcaseTab === "homestay" && (
              <HomestayMasonry homestays={curatedHomestays} />
            )}
          </div>
        </div>

        {/* Centered View All Link */}
        <div className="showcase-footer-center">
          <Link
            to={`/listings?category=${showcaseTab === "food" ? "food-spot" : showcaseTab}`}
            className="showcase-view-all-btn"
          >
            Explore All in Listings →
          </Link>
        </div>
      </section>

      {/* Overall Travel Needs: Center Aligned, Small Box Cards */}
      <section className="home-section center-align" id="travel-needs">
        <div className="section-header-center">
          <h2 className="section-title-center">Trip Essentials</h2>
        </div>

        <div className="home-needs-center-grid">
          <Link to="/taxi" className="home-need-box">
            <div className="home-need-box-icon taxi">
              <span className="material-symbols-outlined">local_taxi</span>
            </div>
            <h3 className="home-need-box-title">Taxi & Cabs</h3>
            <span className="home-need-box-tag">Local & Outstation</span>
          </Link>

          <Link to="/listings?category=homestay" className="home-need-box">
            <div className="home-need-box-icon homestay">
              <span className="material-symbols-outlined">cottage</span>
            </div>
            <h3 className="home-need-box-title">Homestays</h3>
            <span className="home-need-box-tag">Tea Estate Hosts</span>
          </Link>

          <Link to="/listings?category=food-spot" className="home-need-box">
            <div className="home-need-box-icon food">
              <span className="material-symbols-outlined">restaurant</span>
            </div>
            <h3 className="home-need-box-title">Food & Cafes</h3>
            <span className="home-need-box-tag">Kerala Flavors</span>
          </Link>

          <Link to="/listings?category=resort" className="home-need-box">
            <div className="home-need-box-icon chat">
              <span className="material-symbols-outlined">chat</span>
            </div>
            <h3 className="home-need-box-title">WhatsApp Booking</h3>
            <span className="home-need-box-tag">Direct Host Connect</span>
          </Link>
        </div>
      </section>

      {/* Minimal Trust Guarantee Strip: Center Aligned */}
      <div className="home-trust-strip-center">
        <div className="home-trust-pill">
          <span className="material-symbols-outlined">verified</span>
          <span>100% Verified Listings</span>
        </div>
        <div className="home-trust-pill">
          <span className="material-symbols-outlined">chat</span>
          <span>Direct WhatsApp Connect</span>
        </div>
        <div className="home-trust-pill">
          <span className="material-symbols-outlined">directions_car</span>
          <span>Local Driver Network</span>
        </div>
      </div>
    </main>
  );
};

export default Home;