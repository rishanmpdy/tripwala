import "./ResortHero.css";

const categories = [
  "Hidden Spot",
  "Must Watch",
  "Food Spot",
  "Forest",
  "Resort",
  "Parks",
  "Kayaking",
];

const ResortHero = () => {
  return (
    <section className="resort-hero">

      <div className="resort-hero-overlay" />

      <div className="resort-hero-content">

        <div className="resort-search">

          <input
            type="text"
            placeholder="Hi, Where is next destination ?"
          />

          <button>
            <span className="material-symbols-outlined">search</span>
          </button>

        </div>


        <div className="resort-category-nav">

          {categories.map((category) => (

            <button
              key={category}
              className={
                category === "Resort"
                  ? "active"
                  : ""
              }
            >
              {category}
            </button>

          ))}

        </div>

      </div>

    </section>
  );
};

export default ResortHero;