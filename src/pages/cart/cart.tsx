import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-selector";
import { selectCartItems, selectTotalMoney } from "../../store/cart";
import CartItem from "./components/cart-item";

const CartPage: React.FC = () => {
  const cartItems = useAppSelector(selectCartItems);
  const totalMoney = useAppSelector(selectTotalMoney);
  return (
    <section className="section-content padding-y bg">
      <div className="container">
        {cartItems.length ? (
          <div className="row">
            <aside className="col-lg-9">
              <div className="card">
                <table className="table table-borderless table-shopping-cart">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Product</th>
                      <th scope="col" style={{ width: 120 }}>
                        Quantity
                      </th>
                      <th scope="col" style={{ width: 120 }}>
                        Price
                      </th>
                      <th
                        scope="col"
                        className="text-right"
                        style={{ width: 200 }}
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((cartItem) => (
                      <CartItem
                        key={cartItem.product.bookcode}
                        product={cartItem.product}
                        quantity={cartItem.quantity}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </aside>
            <aside className="col-lg-3">
              <div className="card">
                <div className="card-body">
                  <dl className="dlist-align">
                    <dt>Total price:</dt>
                    <dd className="text-right">${totalMoney.toFixed(2)}</dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>Tax:</dt>
                    <dd className="text-right">
                      {" "}
                      ${(totalMoney * 0.1).toFixed(2)}
                    </dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>Total:</dt>
                    <dd className="text-right text-dark b">
                      <strong>${(totalMoney * 1.1).toFixed(2)}</strong>
                    </dd>
                  </dl>
                  <hr />
                  <p className="text-center mb-3">
                    <img src="./images/misc/payments.png" height={26} alt="" />
                  </p>
                  <a
                    href="./place-order.html"
                    className="btn btn-success btn-block"
                  >
                    Checkout
                  </a>
                  <Link to="/shop" className="btn btn-light btn-block">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <>
            <h2 className="text-center">Your Shopping Cart is Empty</h2>
            <br />
            <div className="text-center">
              <Link to="/shop" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CartPage;
