import React from "react";

const FooterComponent: React.FC = () => {
  return (
    <footer className="section-footer border-top padding-y">
      <div className="container">
        <p className="float-md-right">
          &copy; Copyright by PhamHuong {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
