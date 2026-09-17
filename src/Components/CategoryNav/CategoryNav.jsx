import "./CategoryNav.css";

const categories = [
  "Places",
  "Hidden Spot",
  "Resort",
  "Must Watch",
  "Food Spot",
  "HomeStay",
  "Taxi",
];

const CategoryNav = ({ activeCategory, onChange }) => {
  return (
    <div className="category-nav">

      {categories.map((category) => (
        <button
          key={category}
          className={
            activeCategory === category
              ? "category-btn active"
              : "category-btn"
          }
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}

    </div>
  );
};

export default CategoryNav;