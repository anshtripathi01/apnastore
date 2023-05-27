import React from "react";
import {
  AiFillEye,
  AiFillHeart,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineHeart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { useCart } from "../../../context/cartContext";
import "./cart-card.css";
import { removeFromCart, updateQuantity } from "../../../utils/cartUtility";
import { removeFromWishlist } from "../../../utils/wishlistUtlity";
import { useWish } from "../../../context/wishlistContext";
export const CartCard = ({
  product: {
    _id,
    title,
    image,
    price,
    originalPrice,
    trending,
    qty,
    rating,
    reviews,
  },
}) => {
  const { token } = useAuth();
  const { dispatch, click, setClick } = useCart();
  const { wishlist, wishDispatcher, addToWishlist } = useWish();

  return (
    <div className="cart_card" key={_id}>
      <div className="cart_card_header">
        {trending && (
          <div className="trending_label">
            <h5>Trending</h5>
          </div>
        )}
        {wishlist?.find((product) => product._id === _id) ? (
          <button
            onClick={() => removeFromWishlist(_id, token, wishDispatcher)}
          >
            <AiFillHeart className="heart_icon" color="red" size={30} />{" "}
          </button>
        ) : (
          <button
            onClick={() =>
              addToWishlist({
                _id,
                title,
                price,
                image,
                originalPrice,
                rating,
                reviews,
                trending,
              })
            }
          >
            <AiOutlineHeart className="heart_icon" color="black" size={30} />{" "}
          </button>
        )}
        <Link to={`/products/${_id}`}>
          <img src={image} alt="Card-img" className="cart_img" />
        </Link>

        <Link to={`/products/${_id}`}>
          <AiFillEye className="view_btn" size={30} />
        </Link>
      </div>
      {/* card body */}
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
            ({Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF)
          </p>
        </div>

        {/* cart quantity handel */}
        <div className="quantity_container">
          <button
            className="qty_btn"
            onClick={() =>
              updateQuantity(token, dispatch, _id, setClick, "decrement")
            }
            disabled={(qty === 1 || click) && true}
          >
            <AiFillMinusCircle />
          </button>
          <p className="qty">{qty}</p>
          <button
            className="qty_btn"
            onClick={() =>
              updateQuantity(token, dispatch, _id, setClick, "increment")
            }
          >
            <AiFillPlusCircle />
          </button>
        </div>

        {/* button footer */}
        <div className="btn-container">
          <button
            onClick={() => removeFromCart(_id, token, dispatch, setClick)}
            className="cart_btn"
            disabled={click}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
