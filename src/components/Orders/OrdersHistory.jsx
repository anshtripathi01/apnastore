import React from "react";
import { useProfile } from "../../context/profileContext";
import "./order.css";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
export const OrdersSummary = () => {
  const { orders } = useProfile();
  return (
    <div>
      <div>
        {!orders.length ? (
          <h3>Currently there is no Order</h3>
        ) : (
          orders
            ?.map(({ order, date, totalCartPrice, userAddress }, index) => (
              <div key={index} className="order_container">
                <p className="order_id">Order Id : {uuid()}</p>
                {order.map(
                  ({ _id, title, price, image, qty, originalPrice }) => (
                    <div className="order_card" key={_id}>
                      <div className="order_card_header">
                        <Link to={`/products/${_id}`}>
                          <img className="order_img" src={image} alt="" />
                        </Link>
                      </div>

                      <div className="cart_card_body">
                        <div>
                          <h2 className="card_title">{title}</h2>
                        </div>

                        <div className="card_price">
                          <p>
                            <strong>₹{price}</strong>
                            <span className="discount_price">
                              ₹{originalPrice}
                            </span>
                          </p>

                          <p>
                            (
                            {Math.round(
                              ((originalPrice - price) / originalPrice) * 100
                            )}
                            % OFF)
                          </p>
                        </div>

                        <div className="quantity_container">
                          <strong>Quantity:</strong>{" "}
                          <p className="qty"> {qty}</p>
                        </div>
                      </div>
                    </div>
                  )
                )}

                <div className="order_address">
                  <p>
                    <strong>Total Amount: </strong>₹{totalCartPrice}
                  </p>
                  <p>
                    <strong>Address: {userAddress.name},</strong>
                  </p>
                  <p>
                    {userAddress.area},{userAddress.city}
                  </p>
                  <p>
                    {userAddress.state} ,{userAddress.pin},{" "}
                    {userAddress.country}
                  </p>
                  <p>
                    <strong>Phone Number : </strong>
                    {userAddress.mobile}
                  </p>
                  <p>
                    <strong>Order Date: </strong>
                    {date}
                  </p>
                </div>
              </div>
            ))
            ?.reverse()
        )}
      </div>
    </div>
  );
};
