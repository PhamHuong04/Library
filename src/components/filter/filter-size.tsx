import React, { FocusEvent, MouseEvent, useState } from "react";

interface Props {}

const FilterSize: React.FC<Props> = () => {
  const sizes = ["XS", "SM", "LG", "XXL"];
  const [toggle, setToggle] = useState<boolean>(true);

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
          data-target="#collapse_4"
          aria-expanded="true"
          className=""
          onClick={(e) => handleToggle(e)}
          onBlur={(e) => closeToggle(e)}
        >
          <i className="icon-control fa fa-chevron-down"></i>
          <h6 className="title">Sizes </h6>
        </a>
      </header>
      {toggle && (
        <div className="filter-content collapse show" id="collapse_4">
          <div className="card-body">
            {sizes.map((size) => (
              <label key={size} className="checkbox-btn">
                <input type="checkbox" />
                <span className="btn btn-light">{size}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default FilterSize;
