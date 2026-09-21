import { useState } from "react";
import { districtsByState, states } from "../../data/locationData";
import "./FilterBar.css";

const FilterBar = ({
  state = "Kerala",
  district = "All",
  onStateChange,
  onDistrictChange,
}) => {
  const districts = districtsByState[state] ?? [];

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    onStateChange(selectedState);
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
          onChange={(event) => onDistrictChange(event.target.value)}
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

      <button className="filter-main" type="button">
        <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>tune</span>
        Filter
      </button>
    </div>
  );
};

export default FilterBar;
