import React from "react";
import "./cart-page.css";
import { useCart } from "../../context/cartContext";
import { CartCard } from "./cart-card/CartCard";
import { calculateCartValue } from "../../utils/cartUtility";
import { ToastContainer } from "react-toastify";

export const CartPage = () => {
  const {
    state: { carts },
  } = useCart();

  const { totalCartPrice } = calculateCartValue(carts) ?? "";

  return (
    <div className="cart_main">
      <ToastContainer />
      {carts?.length ? (
        <h3>My Cart ({carts?.length})</h3>
      ) : (
        <h3>Your cart is empty</h3>
      )}
      <div className="cart-container">
        <div className="products-container">
          {carts?.map(
            ({ _id, title, image, price, originalPrice, trending, qty }) => (
              <CartCard
                product={{
                  _id,
                  title,
                  image,
                  price,
                  originalPrice,
                  trending,
                  qty,
                }}
                key={_id}
              />
            )
          )}
        </div>

        {!!carts?.length && (
          <div className="price-details-container">
            <h3>Price Details</h3>
            {carts?.map(({ _id, title, qty, price }) => (
              <div key={_id}>
                <ul>
                  <p>
                    {title} ({qty})
                  </p>
                  <p>₹{price * qty}</p>
                </ul>
              </div>
            ))}

            <ul className="total_price">
              <p>
                <strong>Total Price:</strong>
              </p>
              <p>
                <strong>₹{totalCartPrice}</strong>
              </p>
            </ul>
            <div>
              <button className="checkout-btn">Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
