import React, { useEffect } from "react";
import StoreBannerComponent from "../../components/banner/store-banner";
import FilterComponent from "../../components/filter/filter";
import ProductCardComponent from "../../components/product-card/product-card";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { getAllProduct, selectProducts } from "../../store/product";
import { getProfilUser } from "../../store/user/user";

interface Props {
  children: JSX.Element;
}

const StorePage: React.FC<Props> = ({ children }) => {
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProfilUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);
  return (
    <>
      <StoreBannerComponent></StoreBannerComponent>
      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <FilterComponent />
            <main className="col-md-9">
              <div className="row">
                {products.map((product) => (
                  <ProductCardComponent key={product.bookcode} {...product} />
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>
      {children}
    </>
  );
};

export default StorePage;
