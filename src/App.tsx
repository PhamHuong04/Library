import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { FormBook } from "./components/FormBook/FormBook";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import { Home } from "./components/MainPage/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/add" element={<FormBook />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/update/:id" element={<FormBook />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
