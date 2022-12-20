import React, { FocusEvent, MouseEvent, useState } from "react";

interface Props {}

const FilterPrice: React.FC<Props> = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  const minValues = [0, 50, 100, 150, 200, 500, 1000];
  const maxValues = [50, 100, 150, 200, 500, 1000, 2000];

  const handleToggle = (e: MouseEvent) => {
    e.preventDefault();
    setToggle(!toggle);
  };

  const closeToggle = (e: FocusEvent) => {
    e.preventDefault();
    setToggle(false);
  };

  return (
    <article className="filter-group">
      <header className="card-header">
        <a
          href="#!"
          data-toggle="collapse"
          data-target="#collapse_3"
          aria-expanded="true"
          className=""
          onClick={(e) => handleToggle(e)}
          onBlur={(e) => closeToggle(e)}
        >
          <i className="icon-control fa fa-chevron-down"></i>
          <h6 className="title">Price range </h6>
        </a>
      </header>
      {toggle && (
        <div className="filter-content collapse show" id="collapse_3">
          <div className="card-body">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Min</label>
                <select className="mr-2 form-control">
                  {minValues.map((value) => (
                    <option key={value} value={value}>
                      ${value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group text-right col-md-6">
                <label>Max</label>
                <select className="mr-2 form-control">
                  {maxValues.map((value, index) => (
                    <option key={value} value={value}>
                      ${value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button className="btn btn-block btn-primary">Apply</button>
          </div>
        </div>
      )}
    </article>
  );
};

export default FilterPrice;
