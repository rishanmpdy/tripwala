import { useState } from "react";
import "./Hero.css";

const Hero = ({ categories, activeCategory, onCategoryChange, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <section className="hero">

      {/* Background */}
      <div className="hero-overlay"></div>

      {/* Search */}
      <div className="hero-content">

        <form className="search-box" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Hi, Where is next destination ?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button type="submit" className="search-button" aria-label="Search destination">
            <span className="material-symbols-outlined">search</span>
          </button>
        </form>

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
