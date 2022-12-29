import React, { MouseEvent } from "react";
import { useAppDispatch } from "../../../lib/hooks/redux-hook";
import { addItemToCart, clearItemToCart, removeItemToCart } from "../../../lib/store/cart";
import { IBook } from "../../../lib/utils/interface";


interface Props {
  product: IBook;
  quantity: number;
}

const CartItem: React.FC<Props> = ({ product, quantity }) => {
  const dispatch = useAppDispatch();

  const addToCart = () => {
    dispatch(addItemToCart({ product }));
  };

  const removeToCart = () => {
    dispatch(removeItemToCart({ product }));
  };

  const clearItemCart = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(clearItemToCart({ product }));
  };

  return (
    <tr>
      <td>
        <figure className="itemside align-items-center">
          <div className="aside card img-wrap col-md-4">
            {product.image != null && <img src={product.image.path} alt="" />}
          </div>
          <figcaption className="info">
            <a href="#!" className="text-dark" style={{fontSize: "20px", fontWeight: "bold"}}>
              {product.title}
            </a>
          </figcaption>
        </figure>
      </td>
      <td>
        <div className="col">
          <div className="input-group input-spinner">
            <div className="input-group-prepend">
              <button
                onClick={removeToCart}
                className="btn btn-light"
                type="button"
                id="button-minus"
              >
                <i className="fa fa-minus"></i>
              </button>
              <input
                type="text"
                className="form-control"
                style={{padding: "10px", width: "30px"}}
                value={quantity}
                readOnly
              />
              <div className="input-group-append">
                <button
                  onClick={addToCart}
                  className="btn btn-light"
                  type="button"
                  id="button-plus"
                >
                  <i className="fa fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="price-wrap">
          <var className="price">${product.price * quantity}</var>
        </div>
      </td>
      <td className="text-right">
        <a
          onClick={(e) => clearItemCart(e)}
          href="#!"
          className="btn btn-danger"
        >
          Remove
        </a>
      </td>
    </tr>
  );
};

export default CartItem;
