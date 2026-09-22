import TaxiCard from "./TaxiCard";

import "./TaxiGrid.css";

const TaxiGrid = ({ taxis = [] }) => {

  if (!taxis.length) {
    return (
      <div className="taxi-empty">
        No taxis found
      </div>
    );
  }


  return (
    <section className="taxi-grid">

      {taxis.map((taxi) => (

        <TaxiCard
          key={taxi.id}
          taxi={taxi}
        />

      ))}

    </section>
  );
};

export default TaxiGrid;