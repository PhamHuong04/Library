import React from "react";
import Banner2Png from "../../assets/images/banners/2.jpg";
interface Props {}

const BannerComponent: React.FC<Props> = () => {
  return (
    <section className="section-intro padding-y-sm">
      <div className="container">
        <div className="intro-banner-wrap">
          <img src={Banner2Png} className="img-fluid rounded" alt="" />
        </div>
      </div>
    </section>
  );
};

export default BannerComponent;
