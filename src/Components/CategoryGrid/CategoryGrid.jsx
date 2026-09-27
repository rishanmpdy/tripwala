import { useNavigate } from "react-router-dom";
import { placeStore, resortStore, foodStore, homestayStore, taxiStore } from "../../data/stores";

import p1 from "../../assets/images/places/1.webp";
import r1 from "../../assets/images/resort_img/resort1.jpg";
import f1 from "../../assets/images/foodSpot/food1.jpg";
import fallback from "../../assets/images/place-1.jpg";

import "./CategoryGrid.css";

const CATEGORY_META = [
  { id: "places",    label: "Places",    icon: "landscape",   fallbackImg: p1 },
  { id: "resort",    label: "Resort",    icon: "hotel",       fallbackImg: r1 },
  { id: "food-spot", label: "Food Spot", icon: "restaurant",  fallbackImg: f1 },
  { id: "homestay",  label: "Home Stay", icon: "cottage",     fallbackImg: r1 },
  { id: "taxi",      label: "Taxi",      icon: "local_taxi",  fallbackImg: p1 },
];

const getStoreForCategory = (id) => {
  if (id === "places") return placeStore.get();
  if (id === "resort") return resortStore.get();
  if (id === "food-spot") return foodStore.get();
  if (id === "homestay") return homestayStore.get();
  if (id === "taxi") return taxiStore.get();
  return [];
};

const getImagesForCategory = (id, fallbackImg) => {
  const items = getStoreForCategory(id).filter(item => item.status === "Active");
  const images = items.map(item => item.image || item.thumbnail || item.gallery?.[0]).filter(Boolean);
  while (images.length < 4) {
    images.push(images.length > 0 ? images[0] : (fallbackImg || fallback));
  }
  return images.slice(0, 4);
};

const CategoryGrid = ({ categories }) => {
  const navigate = useNavigate();

  const items = categories?.length
    ? categories.map((cat) => {
        const meta = CATEGORY_META.find((m) => m.id === cat.id) || CATEGORY_META[0];
        const photos = getImagesForCategory(cat.id, meta.fallbackImg);
        return { ...meta, ...cat, photos };
      })
    : CATEGORY_META.map(meta => ({ ...meta, photos: getImagesForCategory(meta.id, meta.fallbackImg) }));

  return (
    <section className="category-grid-section">
      <h2 className="category-grid-title">Explore Categories</h2>
      <div className="category-grid">
        {items.map((cat) => (
          <button
            key={cat.id}
            className="category-grid-card"
            onClick={() => navigate(`/listings?category=${cat.id}`)}
          >
            <div className="category-collage">
              {(cat.photos || []).slice(0, 4).map((src, i) => (
                <div key={i} className="category-collage-cell">
                  <img src={src} alt="" className="category-collage-img" loading="lazy" />
                </div>
              ))}
              <div className="category-collage-overlay" />
            </div>
            <div className="category-grid-label">
              <span className="material-symbols-outlined category-grid-icon">{cat.icon}</span>
              <span className="category-grid-name">{cat.label}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
