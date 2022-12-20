import React, { useState } from "react";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-selector";
import { selectTotalItem } from "../../store/cart/cart";
import LogoPng from "../../assets/images/lg.png";
import { selectProductSearch, updateFilter } from "../../store/product";
import { useAppDispatch } from "../../hooks/redux-hook";
import { selectCurrentUser, signOut } from "../../store/user/user";

interface Props {}

const HeaderComponent: React.FC<Props> = () => {
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const keyword = useAppSelector(selectProductSearch);
  const currentUser = useAppSelector(selectCurrentUser);
  
  const totalItem = useAppSelector(selectTotalItem);
  const navigate = useNavigate();

  const onChangeKeyword = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    dispatch(updateFilter(value));
  };

  const signOutFn = () => {
    localStorage.removeItem("accessToken");
    dispatch(signOut());
  };

  const handleDropdownClick = () => {
    setToggleDropdown(!toggleDropdown);
  };

  const closeDropdown = () => {
    setToggleDropdown(false);
  };

  // const searchProduct = () => {
  //   navigate({
  //     pathname: "/shop",
  //     search: createSearchParams({ keyword }).toString(),
  //   });
  // };

  return (
    <header className="section-header">
      <nav className="navbar p-md-0 navbar-expand-sm navbar-light border-bottom">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTop4"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarTop4"
          >
            <ul className="navbar-nav">
              <li>
                <a href="#!" className="nav-link">
                  <i className="fa fa-envelope"></i> Email
                </a>
              </li>
              <li>
                <a href="#!" className="nav-link">
                  <i className="fa fa-phone"></i> Call us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className="header-main border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 col-md-3 col-6">
              <Link to="/" className="brand-wrap">
                <img alt="logo" className="logo" src={LogoPng} />
              </Link>
            </div>
            <div className="col-lg col-sm col-md col-6 flex-grow-0">
              <div className="category-wrap dropdown d-inline-block float-right">
                <button
                  type="button"
                  className="btn btn-primary dropdown-toggle"
                  data-toggle="dropdown"
                  onBlur={closeDropdown}
                  onClick={handleDropdownClick}
                >
                  <i className="fa fa-bars"></i> All category
                </button>
                <div
                  style={{ display: toggleDropdown ? "block" : "none" }}
                  className="dropdown-menu"
                >
                  <a className="dropdown-item" href="#!">
                    History
                  </a>
                  <a className="dropdown-item" href="#!">
                    Selfhelp
                  </a>
                  <a className="dropdown-item" href="#!">
                    Comic
                  </a>
                </div>
              </div>
            </div>
            <Link to="/shop" className="btn btn-outline-primary">
              Store
            </Link>
            <div className="col-lg  col-md-6 col-sm-12 col">
              <form action="#" className="search">
                <div className="input-group w-100">
                  <input
                    type="text"
                    className="form-control"
                    style={{ width: "60%" }}
                    placeholder="Search"
                    defaultValue={keyword}
                    onChange={(e) => onChangeKeyword(e)}
                  />
                  <div className="input-group-append">
                    <Link
                      to={`/shop?keyword=${keyword}`}
                      className="btn btn-primary"
                    >
                      <i className="fa fa-search"></i>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-3 col-sm-6 col-8 order-2 order-lg-3">
              <div className="d-flex justify-content-end mb-3 mb-lg-0">
                <div className="widget-header">
                  <small className="title text-info">
                    Welcome {currentUser?.username || "gues"}!
                  </small>
                  {!currentUser ? (
                    <div>
                      <Link to="/signin">Sign in</Link>
                      <span className="dark-transp"> | </span>
                      <Link to="/register"> Register</Link>
                    </div>
                  ) : (
                    <div>
                      <button onClick={signOutFn} className="btn">
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
                <Link to="/cart" className="widget-header pl-3 ml-3">
                  <div className="icon icon-sm rounded-circle border">
                    <i className="fa fa-shopping-cart"></i>
                  </div>
                  <span className="badge badge-pill badge-danger notify">
                    {totalItem}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default HeaderComponent;
