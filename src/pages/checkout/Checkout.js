import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartContext";
import { useProfile } from "../../context/profileContext";
import { calculateCartValue } from "../../utils/cartUtility";
import "./checkout.css";
import { Success } from "./component/Success";
import { ToastContainer, toast } from "react-toastify";
import { AiFillPlusCircle } from "react-icons/ai";
import { useAuth } from "../../context/authContext";

export const Checkout = () => {
  const { token } = useAuth();
  const { address, profileDispatcher } = useProfile();
  const navigate = useNavigate();
  const {
    state: { carts },
    dispatch,
  } = useCart();
  const [currentOrder, setCurrentOrder] = useState();
  const [userAddress, setUserAddress] = useState();
  const chooseAddress = (userAddress) => {
    setUserAddress(userAddress);
  };

  const location = useLocation();
  const { totalCartPrice, originalValue } = calculateCartValue(carts) ?? "";

  const totalDiscount = originalValue - totalCartPrice;

  // date format
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  useEffect(() => {
    if (!carts.length) {
      navigate("/products");
      return;
    }
    // eslint-disable-next-line
  }, []);

  const orderPlaced = async () => {
    if (!userAddress) {
      toast.error("select an address");
      return;
    }
    navigate("/checkout/order_summary");

    setCurrentOrder({
      order: carts,
      userAddress,
      totalCartPrice,
      date: new Date(Date.now()).toLocaleDateString("en-US", options),
    });
    profileDispatcher({
      type: "ADD_ORDERS",
      payload: {
        order: carts,
        userAddress,
        totalCartPrice,
        date: new Date(Date.now()).toLocaleDateString("en-US", options),
      },
    });

    carts?.map(async ({ _id }) => {
      try {
        const res = await fetch(`/api/user/cart/${_id}`, {
          method: "DELETE",
          headers: {
            authorization: token,
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const { cart } = await res.json();
        dispatch({ type: "SET_CART", payload: cart });
      } catch (error) {
        console.log("remove cart error", error);
      }
    });
  };
  return (
    <div className="checkout_container">
      <ToastContainer />
      {location.pathname === "/checkout/order_summary" && (
        <Success orders={{ ...currentOrder }} />
      )}
      <div>
        <h2>Choose Address</h2>
        {address.map(
          ({ id, name, area, pin, city, state, country, mobile }) => (
            <form key={id} className="checkout_address">
              <input
                type="radio"
                onChange={(e) =>
                  chooseAddress({
                    id,
                    name,
                    area,
                    pin,
                    city,
                    state,
                    country,
                    mobile,
                  })
                }
                name="address"
                required
              />

              <div>
                <p>
                  {name}, {area}, {city},
                </p>
                <p>
                  {state}, {pin}
                </p>
                <p>{country}</p>
              </div>
            </form>
          )
        )}
        <Link to="/profile/address" state={{ from: location }}>
          <button className="address_btn">
            <AiFillPlusCircle size={30} />
          </button>
        </Link>
      </div>

      <div>
        {!!carts?.length && (
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
              <button
                type="submit"
                onClick={() => {
                  orderPlaced();
                }}
                className="checkout-btn"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
