import { useEffect, useState } from "react";

import ResortCard from "../ResortCard/ResortCard";

import { getResortCardSize } from "../../utils/getResortCardSize";

import "../Resort/ResortMasonry.css";


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


const HomestayMasonry = ({ homestays = [] }) => {

  const [columnCount, setColumnCount] = useState(getColumnCount);

  useEffect(() => {
    const handleResize = () => setColumnCount(getColumnCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = Array.from({ length: columnCount }, () => []);
  const columnHeights = Array(columnCount).fill(0);
  const columnCounts = Array(columnCount).fill(0);

  const sortedHomestays = [...homestays].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  sortedHomestays.forEach((homestay) => {
    const size =
      homestay.cardSize ||
      getResortCardSize(homestay.imageWidth, homestay.imageHeight);

    const estimatedHeight = getEstimatedHeight(size);

    let bestColumn = 0;
    for (let i = 1; i < columnCount; i++) {
      const isShorter = columnHeights[i] < columnHeights[bestColumn];
      const isSameButLess =
        columnHeights[i] === columnHeights[bestColumn] &&
        columnCounts[i] < columnCounts[bestColumn];
      if (isShorter || isSameButLess) bestColumn = i;
    }

    columns[bestColumn].push({ homestay, size });
    columnCounts[bestColumn] += 1;
    columnHeights[bestColumn] += estimatedHeight + 0.08;
  });

  return (
    <section className="resort-masonry">
      {columns.map((column, colIndex) => (
        <div className="resort-masonry-column" key={colIndex}>
          {column.map(({ homestay, size }) => (
            <ResortCard key={homestay.id} resort={homestay} size={size} />
          ))}
        </div>
      ))}
    </section>
  );
};

export default HomestayMasonry;

