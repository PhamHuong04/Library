import React from "react";
import { IBook } from "../../lib/utils/interface";
import ProductCardComponent from "../product-card/product-card";
import ProductCardHome from "../product-card/product-card-home";

interface Props {
  products: IBook[];
  home?: boolean;
  children: JSX.Element;
}

const ProductListComponent: React.FC<Props> = ({
  products,
  home = false,
  children,
}) => {
  return (
    <section className="section-name padding-y-sm">
      <div className="container">
        {children}
        <div className="row">
          {products.map((product) =>
            home ? (
              <ProductCardHome key={product.bookcode} product={product} />
            ) : (
              <ProductCardComponent key={product.bookcode} {...product} />
            )
          )}
          {}
        </div>
      </div>
    </section>
  );
};

export default ProductListComponent;
