import "./Header.css";

const Header = () => {
  return (
    <header className="site-header">
      <div className="logo">
        <div className="logo-icon">
          <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>travel_explore</span>
        </div>

        <span>traveltri</span>
      </div>
    </header>
  );
};

export default Header;