import React, { useState } from "react";
// import { Carousel } from "react-bootstrap";
import Banner1Png from "../../assets/images/banners/2.jpg";
import Banner2Png from "../../assets/images/banners/2.jpg";
import Banner3Png from "../../assets/images/banners/3.jpg";
interface Props {}

const BannerComponent: React.FC<Props> = () => {
  return (
    <section className="section-intro padding-y-sm">
      <div className="container">
        <div className="intro-banner-wrap">
          <img src={Banner2Png} className="img-fluid rounded" alt="" />
        </div>
      </div>
      {/* <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={Banner1Png}
              className="d-block w-100 img-fluid rounded"
              alt=""
            />
          </div>
          <div className="carousel-item">
            <img
              src={Banner2Png}
              className="d-block w-100 img-fluid rounded"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={Banner3Png}
              className="d-block w-100 img-fluid rounded"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-target="#carouselExampleFade"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-target="#carouselExampleFade"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </button>
      </div> */}
    </section>
  );
};

export default BannerComponent;

// const BannerComponent: React.FC<Props> = () => {
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex: any, e: any) => {
//     setIndex(selectedIndex);
//   };

//   return (
//     <Carousel activeIndex={index} onSelect={handleSelect}>
//       <Carousel.Item>
//         <img className="d-block w-100" src={Banner1Png} alt="First slide" />
//         <Carousel.Caption>
//           <h3>First slide label</h3>
//           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img className="d-block w-100" src={Banner2Png} alt="Second slide" />

//         <Carousel.Caption>
//           <h3>Second slide label</h3>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img className="d-block w-100" src={Banner3Png} alt="Third slide" />

//         <Carousel.Caption>
//           <h3>Third slide label</h3>
//           <p>
//             Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//           </p>
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>
//   );
// };

// export default BannerComponent;