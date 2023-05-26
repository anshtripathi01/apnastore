import React from "react";
import "./wishlist.css";
import { ToastContainer } from "react-toastify";
import { useWish } from "../../context/wishlistContext";
import { Link } from "react-router-dom";
import {
  AiFillEye,
  AiFillHeart,
  AiFillStar,
  AiOutlineHeart,
} from "react-icons/ai";
import { removeFromWishlist } from "../../utils/wishlistUtlity";
import { useAuth } from "../../context/authContext";


export const Wishlist = () => {
  const { wishlist, addToWishlist, wishDispatcher } = useWish();
  const {token} = useAuth()
  return (
    <div className="wishlist_container">
      <ToastContainer />
      {wishlist?.length ? (
        <h3>My Wishlist ({wishlist?.length})</h3>
      ) : (
        <h3>Your wishlist is empty</h3>
      )}

      <div className="wishlist_products_container">
        {wishlist?.map(
          ({
            _id,
            title,
            image,
            price,
            originalPrice,
            trending,
            rating,
            reviews,
            qty,
          }) => (
            <div className="wishlist_card" key={_id}>
              <div className="card_header">
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
                  <button onClick={() =>
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
                    } >
                    <AiOutlineHeart
                      className="heart_icon"
                      color="black"
                      size={30}
                    />{" "}
                  </button>
                )}
                <Link to={`/products/${_id}`}>
                  <img src={image} alt="Card-img" className="card_img" />
                </Link>
                <p className="rating">
                  <AiFillStar color="orange" size="18" />
                  {rating}|{reviews}
                </p>

                <Link to={`/products/${_id}`}>
                  <AiFillEye className="view_btn" size={30} />
                </Link>
              </div>
              <div className="card_body">
                <h2 className="card_title">{title}</h2>

                <div className="card_price">
                  <p>
                    <strong>₹{price}</strong>
                    <span className="discount_price">₹{originalPrice}</span>
                  </p>

                  <p>
                    {Math.round(
                      ((originalPrice - price) / originalPrice) * 100
                    )}
                    % OFF
                  </p>
                </div>
              </div>

              <div className="btn-container">
                <button className="btn">Move To Cart</button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
