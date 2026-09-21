import "./Hero.css";

const Hero = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <section className="hero">

      {/* Background */}
      <div className="hero-overlay"></div>

      {/* Search */}
      <div className="hero-content">

        <div className="search-box">
          <input
            type="text"
            placeholder="Hi, Where is next destination ?"
          />

          <button className="search-button">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>

        <div className="hero-categories">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={activeCategory === category.id ? "active" : ""}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

      </div>

    </section>
  );
};

export default Hero;
