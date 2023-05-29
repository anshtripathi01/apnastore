import React, { useEffect } from "react";
import "./success.css";
import { useNavigate } from "react-router";
export const Success = ({ orders: { order, userAddress, totalCartPrice } }) => {
    const navigate = useNavigate()
    useEffect(() => {
    if(!order){
        navigate("/products")
        return
      }
       // eslint-disable-next-line
    },[])
  const { name, area, city, pin, state, country, mobile } = userAddress;
 
  return (
    <div className="success_container">
      <div className="anima_container">
        <iframe
          className="anime"
          src="https://embed.lottiefiles.com/animation/59945"
          title="anima"
        ></iframe>

        <h3 className="success_typo">Order successfully placed</h3>
      </div>
      <div>
        <p> Order Id : {order[0]._id} </p>
        Total Amount : ₹ {totalCartPrice}
        {
          <div>
            <p>
              <strong>{name}</strong>
            </p>

            <p>
              {area}, {city}
            </p>
            <p>
              {state}, {country}, {pin}
            </p>

            <p>
              <strong>Contact : </strong>
              {mobile}
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
                  ({Math.round(((originalPrice - price) / originalPrice) * 100)}
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
    </div>
  );
};
