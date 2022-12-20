import React, { useEffect, useState } from "react";
import StoreBannerComponent from "../../components/banner/store-banner";
import FilterComponent from "../../components/filter/filter";
import ProductCardComponent from "../../components/product-card/product-card";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { getAllProduct, selectProducts } from "../../store/product";
import { getProfilUser, selectCurrentUser } from "../../store/user/user";

interface Props {
  children: JSX.Element;
}

const StorePage: React.FC<Props> = ({ children }) => {
  const products = useAppSelector(selectProducts);
  // const productCount = useAppSelector(selectProductCount);
  // const goToPreviousPage = useAppSelector(selectPrevPageProduct);
  // const goToNextPage = useAppSelector(selectNextPageProduct);
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const currentUser = useAppSelector(selectCurrentUser);

  const limit = 10;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProfilUser());
  }, [dispatch]);

  const changeToPage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getAllProduct({ limit, offset: currentPage * limit }));
  }, [dispatch, currentPage]);

  // useEffect(() => {
  //   let results = 0;
  //   // if (productCount % limit === 0) {
  //   //   results = Number(productCount / limit);
  //   // } else {
  //   //   results = Number(productCount / limit) + 1;
  //   // }
  //   setPages(results);
  // }, [productCount]);

  return (
    <>
      <StoreBannerComponent></StoreBannerComponent>
      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <FilterComponent />
            <main className="col-md-9">
              <header className="border-bottom mb-4 pb-3">
                {/* <div className="form-inline">
                  <span className="mr-md-auto">{productCount} Items found</span>
                </div> */}
              </header>
              <div className="row">
                {products.map((product) => (
                  <ProductCardComponent key={product.bookcode} {...product} />
                ))}
              </div>
              {pages > 1 && (
                <nav className="mt-4" aria-label="Page navigation sample">
                  <ul className="pagination">
                    {/* <li
                      className={`page-item ${!goToPreviousPage && "disabled"}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => changeToPage(currentPage - 1)}
                      >
                        Previous
                      </button>
                    </li> */}
                    {Array.from({ length: pages }, (_, item) => item + 1).map(
                      (page) => (
                        <li
                          key={page}
                          className={`page-item ${
                            currentPage + 1 === page && "active"
                          }`}
                        >
                          <button
                            onClick={() => changeToPage(page - 1)}
                            className="page-link"
                          >
                            {page}
                          </button>
                        </li>
                      )
                    )}
                    {/* <li className={`page-item ${!goToNextPage && "disabled"}`}>
                      <button
                        onClick={() => changeToPage(currentPage + 1)}
                        className="page-link"
                      >
                        Next
                      </button>
                    </li> */}
                  </ul>
                </nav>
              )}
            </main>
          </div>
        </div>
      </section>
      {children}
    </>
  );
};

export default StorePage;
