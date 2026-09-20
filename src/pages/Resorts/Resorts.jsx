import Header from "../../Components/Header/Header";
import ResortHero from "../../Components/ResortHero/ResortHero";
import ResortGrid from "../../Components/ResortGrid/ResortGrid";

import resorts from "../../data/resorts";

import "./Resorts.css";

const Resorts = () => {
  return (
    <main className="resorts-page">

      <Header/>

      <ResortHero/>

      {/* Filters */}

      <div className="resort-filter-bar">

        <div className="resort-filter-left">

          <button>
            Kerala
          </button>

          <button>
            Wayanad
          </button>

        </div>


        <button className="filter-button">
          Filter
        </button>

      </div>


      {/* Resorts */}

      <ResortGrid
        resorts={resorts}
      />

    </main>
  );
};

export default Resorts;