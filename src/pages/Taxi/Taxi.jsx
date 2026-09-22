import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import TaxiGrid from "../../Components/Taxi/TaxiGrid";

import taxis from "../../data/taxis";

import "./Taxi.css";


const Taxi = () => {

  const [search, setSearch] =
    useState("");


  const filteredTaxis =
    useMemo(() => {

      const query =
        search
          .trim()
          .toLowerCase();


      if (!query) {
        return taxis;
      }


      return taxis.filter(
        (taxi) =>
          taxi.name
            .toLowerCase()
            .includes(query) ||

          taxi.location
            .toLowerCase()
            .includes(query) ||

          taxi.vehicleType
            .toLowerCase()
            .includes(query) ||

          taxi.features?.some(
            (feature) =>
              feature
                .toLowerCase()
                .includes(query)
          )
      );

    }, [search]);


  return (
    <main className="taxi-page">


      {/* =================================
          HEADER
      ================================= */}

      <header className="taxi-header">

        <Link className="taxi-logo" to="/">

          <div className="taxi-logo-circle">
            ◉
          </div>

          <span>
            traveltri
          </span>

        </Link>
        <Link className="taxi-admin-link" to="/admin/login">Admin login</Link>

      </header>


      {/* =================================
          HERO
      ================================= */}

      <section className="taxi-hero">

        <div className="taxi-hero-content">

          <h1>
            Find Your Taxi
          </h1>

          <p>
            Comfortable rides for
            your next journey
          </p>


          <div className="taxi-search">

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search taxi, location..."
            />

            <span>
              ⌕
            </span>

          </div>

        </div>

      </section>


      {/* =================================
          FILTER
      ================================= */}

      <div className="taxi-filter">

        <button className="taxi-filter-active">
          Taxi
        </button>

        <button>
          4 Seater
        </button>

        <button>
          7 Seater
        </button>

        <button>
          12 Seater
        </button>

        <button>
          AC
        </button>

        <button className="taxi-filter-button">
          Filter
        </button>

      </div>


      {/* =================================
          LISTING
      ================================= */}

      <section className="taxi-listing">

        <TaxiGrid
          taxis={filteredTaxis}
        />

      </section>

    </main>
  );
};


export default Taxi;
