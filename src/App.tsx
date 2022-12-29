import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import FooterComponent from "./components/footer/footer";
import { FormBook } from "./components/FormBook/FormBook";
import { useAppDispatch } from "./lib/hooks/redux-hook";
import { initialCartItems } from "./lib/store/cart";
import CartPage from "./pages/cart/cart";
import HomePage from "./pages/home/home";
import MainLayout from "./pages/layout/layout";
import ProductDetailPage from "./pages/product/product-detail";
import RegisterPage from "./pages/register/register";
import SignInPage from "./pages/signin/signin";
import StorePage from "./pages/store/store";
import "bootstrap/dist/css/bootstrap.min.css";

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
        <Route path="/add" element={<FormBook />}></Route>
        <Route path="/update/:id" element={<FormBook />}></Route>
        <Route path="/add" element={<FormBook />}></Route>
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
