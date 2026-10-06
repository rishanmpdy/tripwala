import { useNavigate } from "react-router-dom";
import { placeStore, resortStore, foodStore, homestayStore, taxiStore } from "../../data/stores";

import p1 from "../../assets/images/places/1.webp";
import r1 from "../../assets/images/resort_img/resort1.jpg";
import f1 from "../../assets/images/foodSpot/food1.jpg";
import fallback from "../../assets/images/place-1.jpg";

import "./CategoryGrid.css";

const CATEGORY_META = [
  { id: "places",    label: "Places",     icon: "landscape",   fallbackImg: p1, color: "#10b981" },
  { id: "resort",    label: "Resorts",    icon: "hotel",       fallbackImg: r1, color: "#0284c7" },
  { id: "food-spot", label: "Food Spots", icon: "restaurant",  fallbackImg: f1, color: "#f59e0b" },
  { id: "homestay",  label: "Homestays",  icon: "cottage",     fallbackImg: r1, color: "#8b5cf6" },
  { id: "taxi",      label: "Taxi & Cabs",icon: "local_taxi",  fallbackImg: fallback, color: "#eab308" },
];

const getCountForCategory = (id) => {
  try {
    if (id === "places") return placeStore.get().filter(i => i.status === "Active").length;
    if (id === "resort") return resortStore.get().filter(i => i.status === "Active").length;
    if (id === "food-spot") return foodStore.get().filter(i => i.status === "Active").length;
    if (id === "homestay") return homestayStore.get().filter(i => i.status === "Active").length;
    if (id === "taxi") return taxiStore.get().filter(i => i.status === "Active").length;
  } catch {
    return 0;
  }
  return 0;
};

const getFeaturedImageForCategory = (id, fallbackImg) => {
  try {
    let items = [];
    if (id === "places") items = placeStore.get();
    else if (id === "resort") items = resortStore.get();
    else if (id === "food-spot") items = foodStore.get();
    else if (id === "homestay") items = homestayStore.get();
    else if (id === "taxi") items = taxiStore.get();

    const activeItem = items.find(i => i.status === "Active" && (i.image || i.thumbnail || i.gallery?.[0]));
    return activeItem?.image || activeItem?.thumbnail || activeItem?.gallery?.[0] || fallbackImg || fallback;
  } catch {
    return fallbackImg || fallback;
  }
};

const CategoryGrid = ({ categories, onSelectCategory }) => {
  const navigate = useNavigate();

  const items = (categories?.length ? categories : CATEGORY_META).map((cat) => {
    const meta = CATEGORY_META.find((m) => m.id === cat.id) || CATEGORY_META[0];
    const image = getFeaturedImageForCategory(cat.id, meta.fallbackImg);
    const count = getCountForCategory(cat.id);
    return { ...meta, ...cat, image, count };
  });

  const handleClick = (categoryId) => {
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    } else {
      navigate(`/listings?category=${categoryId}`);
    }
  };

  return (
    <section className="category-section center-align">
      <div className="section-header-center">
        <span className="section-badge-center">
          <span className="material-symbols-outlined">category</span>
          Categories
        </span>
        <h2 className="section-title-center">Explore by Category</h2>
      </div>

      <div className="category-boxes-container">
        {items.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className="category-box-tile"
            onClick={() => handleClick(cat.id)}
            aria-label={`Explore ${cat.label}`}
          >
            <div className="category-box-bg">
              <img
                src={cat.image}
                alt={cat.label}
                className="category-box-img"
                loading="lazy"
              />
              <div className="category-box-overlay" />
            </div>

            <div className="category-box-content">
              <div className="category-box-icon" style={{ "--cat-accent": cat.color }}>
                <span className="material-symbols-outlined">{cat.icon}</span>
              </div>
              <span className="category-box-name">{cat.label}</span>
              <span className="category-box-count">{cat.count} listings</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
