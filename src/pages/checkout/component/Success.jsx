import React, { useEffect } from "react";
import "./success.css";
import { useNavigate } from "react-router";
import { FcApproval } from "react-icons/fc";

export const Success = ({
  orders: { order, userAddress, totalCartPrice, date },
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const redirectToProducts = () => {
      if (!order) {
        navigate("/products");
        return;
      }
    };

    redirectToProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="success_container">
      {order && (
        <>
          <div className="sucess_typo_container">
            <FcApproval size={40} />

            <h3 className="success_typo">Order successfully placed</h3>
          </div>
          <div>
            <p className="order_id"> Order Id : {order && order[0]?._id} </p>

            {
              <div className="order_address">
                <p>
                  <strong>Order Date: </strong> {date}
                </p>
                <small>We will deliver your order in 4 days</small>
                <p> Total Amount : ₹ {totalCartPrice} </p>
                <p>
                  <strong>{userAddress?.name}</strong>
                </p>

                <p>
                  {userAddress?.area}, {userAddress?.city}
                </p>
                <p>
                  {userAddress?.state}, {userAddress?.country},{" "}
                  {userAddress?.pin}
                </p>

                <p>
                  <strong>Phone Number: </strong>
                  {userAddress?.mobile}
                </p>
              </div>
            }
          </div>
          <div className="user_orders">
            {order?.map(({ _id, title, price, image, qty, originalPrice }) => (
              <div className="order_card" key={_id}>
                <div className="order_card_header">
                  <img className="order_img" src={image} alt="order_img" />
                </div>

                <div className="cart_card_body">
                  <div>
                    <h2 className="card_title">{title}</h2>
                  </div>

                  <div className="card_price">
                    <p>
                      <strong>₹{price}</strong>
                      <span className="discount_price">₹{originalPrice}</span>
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
                    <strong>Quantity:</strong> <p className="qty"> {qty}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn" onClick={() => navigate("/profile/orders")}>
            Orders
          </button>
        </>
      )}
    </div>
  );
};
