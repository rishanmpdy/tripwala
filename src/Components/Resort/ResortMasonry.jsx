import { useEffect, useState } from "react";

import ResortCard from "../ResortCard/ResortCard";

import { getResortCardSize } from "../../utils/getResortCardSize";

import "./ResortMasonry.css";


const getColumnCount = () => {

  if (window.innerWidth <= 600) {
    return 2;
  }

  if (window.innerWidth <= 900) {
    return 3;
  }

  if (window.innerWidth <= 1200) {
    return 4;
  }

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


const ResortMasonry = ({
  resorts = [],
}) => {

  const [
    columnCount,
    setColumnCount
  ] = useState(getColumnCount);


  /* =========================
     RESPONSIVE COLUMNS
  ========================= */

  useEffect(() => {

    const handleResize = () => {
      setColumnCount(
        getColumnCount()
      );
    };


    window.addEventListener(
      "resize",
      handleResize
    );


    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };

  }, []);


  /* =========================
     CREATE COLUMNS
  ========================= */

  const columns = Array.from(
    {
      length: columnCount,
    },
    () => []
  );


  const columnHeights =
    Array(columnCount).fill(0);


  const columnCounts =
    Array(columnCount).fill(0);


  /* =========================
     SORT LATEST FIRST
  ========================= */

  const sortedResorts = [
    ...resorts,
  ].sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  );


  /* =========================
     DISTRIBUTE
  ========================= */

  sortedResorts.forEach(
    (resort) => {

      const size =
        resort.cardSize ||
        getResortCardSize(
          resort.imageWidth,
          resort.imageHeight
        );


      const estimatedHeight =
        getEstimatedHeight(size);


      let bestColumn = 0;


      for (
        let index = 1;
        index < columnCount;
        index++
      ) {

        const isShorter =
          columnHeights[index] < columnHeights[bestColumn];


        const isSameHeightButLessFilled =
          columnHeights[index] === columnHeights[bestColumn] &&
          columnCounts[index] < columnCounts[bestColumn];


        if (isShorter || isSameHeightButLessFilled) {
          bestColumn = index;
        }
      }


      columns[bestColumn].push({
        resort,
        size,
      });


      columnCounts[bestColumn] += 1;


      columnHeights[
        bestColumn
      ] += estimatedHeight + 0.08;

    }
  );


  return (
    <section
      className="resort-masonry"
    >

      {columns.map(
        (
          column,
          columnIndex
        ) => (

          <div
            className="resort-masonry-column"
            key={columnIndex}
          >

            {column.map(
              ({
                resort,
                size,
              }) => (

                <ResortCard
                  key={resort.id}
                  resort={resort}
                  size={size}
                />

              )
            )}

          </div>

        )
      )}

    </section>
  );
};


export default ResortMasonry;