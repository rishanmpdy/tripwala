import { useState } from "react";
import { districtsByState, states } from "../../data/locationData";
import "./FilterBar.css";

const FilterBar = () => {
  const [state, setState] = useState("Kerala");
  const [district, setDistrict] = useState("Wayanad");
  const districts = districtsByState[state] ?? [];

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setState(selectedState);
    setDistrict(districtsByState[selectedState]?.[0] ?? "");
  };

  return (
    <div className="filter-bar">
      <div className="filter-left">
        <select
          className="filter-select"
          value={state}
          onChange={handleStateChange}
          aria-label="Select state"
        >
          {states.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          className="filter-select"
          value={district}
          onChange={(event) => setDistrict(event.target.value)}
          aria-label="Select district"
          disabled={districts.length === 0}
        >
          {districts.length ? (
            districts.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))
          ) : (
            <option value="">No districts available</option>
          )}
        </select>
      </div>

      <button className="filter-main">Filter</button>
    </div>
  );
};

export default FilterBar;
