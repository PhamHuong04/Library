import React from "react";
import { Outlet } from "react-router-dom";
import HeaderComponent from "../../components/header/header";


const MainLayout: React.FC = () => {
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <Outlet></Outlet>
    </>
  );
};

export default MainLayout;
