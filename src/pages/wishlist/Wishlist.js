import React from "react";
import "./wishlist.css";
import { ToastContainer } from "react-toastify";
import { useWish } from "../../context/wishlistContext";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEye, AiFillStar } from "react-icons/ai";
import { removeFromWishlist } from "../../utils/wishlistUtlity";
import { useAuth } from "../../context/authContext";
import { useCart } from "../../context/cartContext";

export const Wishlist = () => {
  const { wishlist, wishDispatcher, click, setClick } = useWish();
  const {
    addToCart,
    state: { carts },
  } = useCart();
  const { token } = useAuth();

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
            descriptions,
            inStock,
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
                <button
                  onClick={() =>
                    removeFromWishlist(_id, token, wishDispatcher, setClick)
                  }
                  disabled={click}
                >
                  <AiFillDelete className="heart_icon" color="red" size={30} />{" "}
                </button>
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
                    (
                    {Math.round(
                      ((originalPrice - price) / originalPrice) * 100
                    )}
                    % OFF)
                  </p>
                </div>
              </div>

              <div className="wish_btn_container">
                <button
                  onClick={() =>
                    addToCart({
                      _id,
                      title,
                      descriptions,
                      price,
                      image,
                      originalPrice,
                      rating,
                      reviews,
                      inStock,
                      trending,
                    })
                  }
                  className="wish_btn btn"
                  disabled={click}
                >
                  {carts?.find((product) => product._id === _id)
                    ? "Go To Cart"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
