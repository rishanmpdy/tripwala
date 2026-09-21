import ResortCard from "../ResortCard/ResortCard";

import "./ResortGrid.css";

const ResortGrid = ({ resorts }) => {
  return (
    <section className="resort-grid">

      {resorts.map((resort) => (
        <ResortCard
          key={resort.id}
          resort={resort}
        />
      ))}

    </section>
  );
};

export default ResortGrid;