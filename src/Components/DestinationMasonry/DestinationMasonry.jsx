import { useEffect, useState } from "react";

import DestinationCard from "../DestinationCard/DestinationCard";

import "./DestinationMasonry.css";

const getColumnCount = () => {
  if (window.innerWidth <= 600) return 2;
  if (window.innerWidth <= 900) return 3;
  if (window.innerWidth <= 1200) return 4;
  return 5;
};

const getEstimatedHeight = (size) => {
  const heights = {
    compact: 1,
    standard: 1.15,
    portrait: 1.3,
    tall: 1.45,
  };

  return heights[size] || 1.15;
};

const DestinationMasonry = ({ destinations = [] }) => {
  const [columnCount, setColumnCount] = useState(getColumnCount);

  useEffect(() => {
    const handleResize = () => setColumnCount(getColumnCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = Array.from({ length: columnCount }, () => []);
  const columnHeights = Array(columnCount).fill(0);
  const columnCounts = Array(columnCount).fill(0);

  const sortedDestinations = [...destinations];

  sortedDestinations.forEach((destination) => {
    const size = destination.cardSize || "standard";
    const estimatedHeight = getEstimatedHeight(size);

    let bestColumn = 0;

    for (let index = 1; index < columnCount; index++) {
      const isShorter = columnHeights[index] < columnHeights[bestColumn];
      const isSameHeightButLessFilled =
        columnHeights[index] === columnHeights[bestColumn] &&
        columnCounts[index] < columnCounts[bestColumn];

      if (isShorter || isSameHeightButLessFilled) {
        bestColumn = index;
      }
    }

    columns[bestColumn].push({ destination, size });
    columnCounts[bestColumn] += 1;
    columnHeights[bestColumn] += estimatedHeight + 0.08;
  });

  return (
    <section className="destination-masonry">
      {columns.map((column, columnIndex) => (
        <div className="destination-masonry-column" key={columnIndex}>
          {column.map(({ destination, size }) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              size={size}
            />
          ))}
        </div>
      ))}
    </section>
  );
};

export default DestinationMasonry;
