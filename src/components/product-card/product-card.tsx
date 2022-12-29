import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { selectCurrentUser } from "../../store/user/user";
import { IBook } from "../../utils/interfaces";
import axiosInstance from "../../service/config";
import { getAllProduct } from "../../store/product";

const ProductCardComponent: React.FC<IBook> = (product) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);
  const currentUser = useAppSelector(selectCurrentUser);

  const deleteBook = async (id: number) => {
    try {
      const res = await axiosInstance.delete(`book/${id}`);
      return res.data;
    } catch (err) {
      throw new Error("Delete Book failed");
    }
  };
  const onDeleteBook = (book: IBook) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete Book: '${book.title}'?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("Xoá thành công!");
        deleteBook(book.bookcode);
      }
    });
      console.log(React.version);

  };
  return (
    <div className="col-md-4">
      <figure className="card card-product-grid">
        <div className="img-wrap">
          <Link to={`/products/${product.bookcode}`} className="title">
            <img src={product?.image?.path} alt="" />
          </Link>
        </div>
        <figcaption className="info-wrap">
          <div className="fix-height">
            <Link to={`/products/${product.bookcode}`} className="title">
              {product.title}
            </Link>

            <Link to={`/products/${product.bookcode}`} className="author">
              {product.author}
            </Link>

            <div className="price-wrap mt-2">
              <span className="price">${product.price}</span>
            </div>
          </div>

          {currentUser?.roles === "admin" && (
            <div className="admin">
              <div className="d-flex justify-content-between">
                <Link to={`/update/${product.bookcode}`}>
                  <button type="button" className="btn btn-success">
                    <span className="text">Edit</span>
                    <i className="far fa-edit"></i>
                  </button>
                </Link>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => onDeleteBook(product)}
                >
                  <span className="text">Delete</span>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          )}
        </figcaption>
      </figure>
    </div>
  );
};

export default ProductCardComponent;
