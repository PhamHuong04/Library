import React from "react";
import { Link } from "react-router-dom";
import { IBook } from "../../lib/utils/interface";
import "./product-cart.css";

interface Props {
  product: IBook;
}

const ProductCardHome: React.FC<Props> = ({ product }) => {
  
  return (
    <div className="col-md-3">
      <div className="card card-product-grid">
        {product.image != null && (
          <Link to={`/products/${product.bookcode}`} className="img-wrap">
            <img src={product.image.path} alt="" />
          </Link>
        )}

        <figcaption className="info-wrap">
          <Link to={`/products/${product.bookcode}`} className="title" style={{fontSize: "20px"}}>
            {product.title}
          </Link>

          <Link to={`/products/${product.bookcode}`} className="author">
            <small>{product.author}</small>
          </Link>
          <div className="price mt-1">${product.price}</div>
        </figcaption>
      </div>
    </div>
  );
};

export default ProductCardHome;
