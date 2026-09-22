import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="site-header">
      <Link className="logo" to="/">
        <div className="logo-icon">
          <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>travel_explore</span>
        </div>

        <span>traveltri</span>
      </Link>
      <Link className="admin-link" to="/admin/login">Admin login</Link>
    </header>
  );
};

export default Header;
