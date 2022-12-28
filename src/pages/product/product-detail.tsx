import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { getProduct, selectProductDetail } from "../../store/product";
import UserPng from "../../assets/images/avatars/avatar1.jpg";
import "./product.style.css";
import { addItemToCart } from "../../store/cart";
interface Props {}

const ProductDetailPage: React.FC<Props> = () => {
  const params = useParams();

  const dispatch = useAppDispatch();

  const product = useAppSelector(selectProductDetail);
  const addToCart = () => {
    product && dispatch(addItemToCart({ product }));
  };

  useEffect(() => {
    if (params.id) {
      dispatch(getProduct(params.id));
    }
  }, [dispatch, params]);

  return (
    <section className="section-content padding-y bg">
      <div className="container">
        <div className="card">
          <div className="row no-gutters">
            <aside className="col-md-6">
              <article className="gallery-wrap">
                <div className="img-big-wrap">
                  <a href="#!">
                    <img src={product?.image?.path} alt="" />
                  </a>
                </div>
              </article>
            </aside>
            <main className="col-md-6 border-left">
              <article className="content-body">
                <h2 className="title">{product?.title}</h2>
                <div className="mb-3">
                  <var className="price h4">${product?.price}</var>
                </div>
                <p>{product?.description}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={addToCart}
                      type="button"
                      className="btn  btn-primary"
                    >
                      <span className="text">Add to cart</span>
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                    <Link to={`/cart`} className={"btn btn-success"}>
                      <span className="text">View Cart</span>
                      <i className="fas fa-eye"></i>
                    </Link>
                  </div>
              </article>
            </main>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <header className="section-heading">
            <h3>Customer Reviews </h3>
          </header>
          <article className="box mb-3">
            <div className="icontext w-100">
              <img
                src={UserPng}
                alt=""
                className="img-xs icon rounded-circle"
              />
              <div className="text">
                <span className="date text-muted float-md-right">
                  24.04.2020{" "}
                </span>
                <h6 className="mb-1">Mike John </h6>
              </div>
            </div>
            <div className="mt-3">
              <p>
                {" "}
                Dummy comment Lorem ipsum dolor sit amet, consectetur
                adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip{" "}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
