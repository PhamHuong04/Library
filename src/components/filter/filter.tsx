import React from "react";
// import FilterCategory from "./filter-category";
import FilterPrice from "./filter-price";

interface Props {}

const FilterComponent: React.FC<Props> = () => {
  return (
    <aside className="col-md-3">
      <div className="card">
        <FilterPrice />
      </div>
    </aside>
  );
};

export default FilterComponent;
