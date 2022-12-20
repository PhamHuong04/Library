import React from "react";
import { Link } from "react-router-dom";
import { IBook } from "../../utils/interfaces";

const ProductCardComponent: React.FC<IBook> = (product) => {
  return (
    <div className="col-md-4">
      <figure className="card card-product-grid">
        <div className="img-wrap">
          <Link to={`/products/${product.bookcode}`} className="title">
            <img src={product?.image?.path} alt="" />
          </Link>
        </div>
        <figcaption className="info-wrap">
          <div className="fix-height">
            <Link to={`/products/${product.bookcode}`} className="title">
              {product.title}
            </Link>

            <Link to={`/products/${product.bookcode}`} className="author">
              {product.author}
            </Link>

            <div className="price-wrap mt-2">
              <span className="price">${product.price}</span>
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default ProductCardComponent;
