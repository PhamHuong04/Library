import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-hook";
import { selectCurrentUser } from "../../store/user/user";
import { IBook } from "../../utils/interfaces";


const ProductCardComponent: React.FC<IBook> = (product) => {
  const currentUser = useAppSelector(selectCurrentUser);
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

          {currentUser?.roles === "admin" && (
            <div className="admin">
              <div className="d-flex justify-content-between">
                <button type="button" className="btn  btn-success">
                  <span className="text">Edit</span>
                  <i className="far fa-edit"></i>
                </button>
                <Link to={`/cart`} className={"btn btn-danger"}>
                  <span className="text">Delete</span>
                  <i className="fas fa-trash"></i>
                </Link>
              </div>
            </div>
          )}
        </figcaption>
      </figure>
    </div>
  );
};

export default ProductCardComponent;
