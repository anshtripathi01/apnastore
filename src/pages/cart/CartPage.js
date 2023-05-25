import React from "react";
import "./cart-page.css";
import { useCart } from "../../context/cartContext";
import { CartCard } from "./cart-card/CartCard";
import { calculateCartValue } from "../../utils/cartUtility";

export const CartPage = () => {
  const {
    state: { carts },
  } = useCart();
  

  

  const {totalCartPrice,originalValue} = calculateCartValue(carts)
  const totalDiscount =  originalValue - totalCartPrice;

  return (
    <div className="cart_main">
      {carts.length ? (
        <h3>My Cart ({carts?.length})</h3>
      ) : (
        <h3>Cart is Empty</h3>
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
              />
            )
          )}
        </div>

        {!!carts.length && (
          <div className="price-details-container">
            <h3>Price Details</h3>
            <hr />

            <ul>
              <p>Item QTY: ({carts?.length})</p>
              <p>₹{originalValue}</p>
            </ul>

            <ul>
              <p>Discount:</p> <p>-₹{totalDiscount}</p>
            </ul>
            <ul>
              <p>Delivery Charges</p> <p>FREE</p>
            </ul>
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
