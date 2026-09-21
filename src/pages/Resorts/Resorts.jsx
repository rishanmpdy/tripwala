import { useMemo, useState } from "react";

import ResortMasonry from "../../Components/Resort/ResortMasonry";

import resorts from "../../data/resorts";

import "./Resorts.css";


const Resorts = () => {

  const [search, setSearch] =
    useState("");

  const [location, setLocation] =
    useState("All");


  /* =========================
     FILTER
  ========================= */

  const filteredResorts =
    useMemo(() => {

      const query =
        search
          .trim()
          .toLowerCase();


      return resorts.filter(
        (resort) => {

          const matchesSearch =
            !query ||
            resort.name
              .toLowerCase()
              .includes(query) ||
            resort.location
              .toLowerCase()
              .includes(query) ||
            resort.description
              .toLowerCase()
              .includes(query);


          const matchesLocation =
            location === "All" ||
            resort.location
              .toLowerCase()
              .includes(
                location.toLowerCase()
              );


          return (
            matchesSearch &&
            matchesLocation
          );

        }
      );

    }, [
      search,
      location,
    ]);


  return (
    <main className="resorts-page">


      {/* =================================
          HEADER
      ================================= */}

      <header className="resorts-header">

        <div className="resorts-logo">

          <div className="resorts-logo-circle">
            ◉
          </div>

          <span>
            traveltri
          </span>

        </div>

      </header>


      {/* =================================
          HERO
      ================================= */}

      <section className="resorts-hero">

        <div className="resorts-hero-overlay" />

        <div className="resorts-hero-content">

          <h1>
            Discover Resorts
          </h1>

          <p>
            Find beautiful places to stay
            around your destination
          </p>


          <div className="resorts-search">

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search resorts..."
            />

            <span>
              ⌕
            </span>

          </div>

        </div>

      </section>


      {/* =================================
          FILTER BAR
      ================================= */}

      <div className="resorts-filter">

        <div className="resorts-filter-left">

          <button
            className={
              location === "All"
                ? "active"
                : ""
            }
            onClick={() =>
              setLocation("All")
            }
          >
            All
          </button>


          <button
            className={
              location === "Kerala"
                ? "active"
                : ""
            }
            onClick={() =>
              setLocation("Kerala")
            }
          >
            Kerala
          </button>


          <button
            className={
              location === "Wayanad"
                ? "active"
                : ""
            }
            onClick={() =>
              setLocation("Wayanad")
            }
          >
            Wayanad
          </button>

        </div>


        <button className="filter-button">
          Filter
        </button>

      </div>


      {/* =================================
          LISTING
      ================================= */}

      <section className="resort-listing">

        <ResortMasonry
          resorts={
            filteredResorts
          }
        />

      </section>


    </main>
  );
};


export default Resorts;