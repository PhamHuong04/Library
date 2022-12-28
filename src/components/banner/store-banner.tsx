import React from "react";

const StoreBannerComponent: React.FC = () => {
  return (
    <section className="section-pagetop bg">
      <div className="container">
        <button className="btn btn-success" style={{marginBottom: "20px"}}>Add new book</button>
        <h2 className="title-page text-success">Our Store</h2>
        
      </div>
    </section>
  );
};

export default StoreBannerComponent;
