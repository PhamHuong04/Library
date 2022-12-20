import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import FooterComponent from "./components/footer/footer";
import { useAppDispatch } from "./hooks/redux-hook";
import MainLayout from "./pages/layout/layout";
import { initialCartItems } from "./store/cart";
import "bootstrap/dist/css/bootstrap.min.css";

const CartPage = React.lazy(() => import("./pages/cart/cart"));
const HomePage = React.lazy(() => import("./pages/home/home"));
const StorePage = React.lazy(() => import("./pages/store/store"));
const ProductDetailPage = React.lazy(
  () => import("./pages/product/product-detail")
);
const RegisterPage = React.lazy(() => import("./pages/register/register"));
const SignInPage = React.lazy(() => import("./pages/signin/signin"));

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initialCartItems());
  }, [dispatch]);
  return (
    <React.Suspense>
      <MainLayout></MainLayout>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage>
              <FooterComponent />
            </HomePage>
          }
        ></Route>
        <Route
          path="/shop"
          element={
            <StorePage>
              <FooterComponent />
            </StorePage>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <RegisterPage>
              <FooterComponent />
            </RegisterPage>
          }
        ></Route>
        <Route
          path="/signin"
          element={
            <SignInPage>
              <FooterComponent />
            </SignInPage>
          }
        ></Route>
        <Route path="/cart" element={<CartPage></CartPage>}></Route>
        <Route
          path="/products/:id"
          element={<ProductDetailPage></ProductDetailPage>}
        ></Route>
      </Routes>
    </React.Suspense>
  );
}

export default App;
