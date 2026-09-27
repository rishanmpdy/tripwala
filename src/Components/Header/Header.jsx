import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <header className="site-header">
      <Link className="logo" to="/">
        <div className="logo-icon">
          <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>travel_explore</span>
        </div>
        <span>traveltri</span>
      </Link>
      
      {categories && categories.length > 0 && (
        <div className="header-categories">
          {categories.map((cat) => (
             <button 
               key={cat.id}
               className={`category-btn ${activeCategory === cat.id ? "active" : ""}`}
               onClick={() => onCategoryChange && onCategoryChange(cat.id)}
             >
               {cat.label}
             </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
