import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BannerComponent from "../../components/banner/banner";
import ProductListComponent from "../../components/product-list/product-list";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { getAllProduct, selectProducts } from "../../store/product";

interface Props {
  children: JSX.Element;
}

const HomePage: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  
  useEffect(() => {
    dispatch(getAllProduct({ limit: 10, offset: null }));
  }, [dispatch]);  

  return (
    <>
      <section className="section-name padding-y-sm">
        <div className="container">
          <BannerComponent></BannerComponent>
          <ProductListComponent home={true} products={products}>
            <header className="section-heading">
              <Link
                to={"/shop"}
                className="btn btn-outline-primary float-right"
              >
                See all
              </Link>
              <h3 className="section-title">Popular products</h3>
            </header>
          </ProductListComponent>
        </div>
      </section>
      {children}
    </>
  );
};

export default HomePage;
