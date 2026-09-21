import { useEffect, useState } from "react";

import FoodCard from "./FoodCard";

import "./FoodMasonry.css";

const getColumnCount = () => {
  if (window.innerWidth <= 600) return 2;
  if (window.innerWidth <= 900) return 3;
  if (window.innerWidth <= 1200) return 4;
  return 5;
};

const getEstimatedHeight = (size) => {
  const heights = {
    compact: 1,
    standard: 1.25,
    portrait: 1.5,
    tall: 1.75,
  };

  return heights[size] || 1.25;
};

const FoodMasonry = ({ foods = [] }) => {
  const [columnCount, setColumnCount] = useState(getColumnCount);

  useEffect(() => {
    const handleResize = () => setColumnCount(getColumnCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = Array.from({ length: columnCount }, () => []);
  const columnHeights = Array(columnCount).fill(0);
  const columnCounts = Array(columnCount).fill(0);

  const sortedFoods = [...foods].sort((a, b) => (b.id || 0) - (a.id || 0));

  sortedFoods.forEach((food) => {
    const size = food.cardSize || "standard";
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

    columns[bestColumn].push({ food, size });
    columnCounts[bestColumn] += 1;
    columnHeights[bestColumn] += estimatedHeight + 0.08;
  });

  return (
    <section className="food-masonry">
      {columns.map((column, columnIndex) => (
        <div className="food-masonry-column" key={columnIndex}>
          {column.map(({ food, size }) => (
            <FoodCard key={food.id} food={food} size={size} />
          ))}
        </div>
      ))}
    </section>
  );
};

export default FoodMasonry;