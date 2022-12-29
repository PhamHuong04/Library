import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-hook";
import { selectCurrentUser } from "../../store/user/user";

const StoreBannerComponent: React.FC = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <section className="section-pagetop bg">
      <div className="container">
        {currentUser?.roles === "admin" && (
          <Link to={`/add`}>
            <button
              className="btn btn-success"
              style={{ marginBottom: "20px" }}
            >
              Add new book
            </button>
          </Link>
        )}
        <h2 className="title-page text-success">Our Store</h2>
      </div>
    </section>
  );
};

export default StoreBannerComponent;
