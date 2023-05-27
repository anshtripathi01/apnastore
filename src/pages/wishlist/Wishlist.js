import React from "react";
import "./wishlist.css";
import { ToastContainer, toast } from "react-toastify";
import { useWish } from "../../context/wishlistContext";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEye, AiFillStar } from "react-icons/ai";
import { moveToCart, removeFromWishlist } from "../../utils/wishlistUtlity";
import { useAuth } from "../../context/authContext";
import { useCart } from "../../context/cartContext";
import { updateQuantity } from "../../utils/cartUtility";

export const Wishlist = () => {
  const { wishlist, wishDispatcher, click, setClick } = useWish();
  const {
    dispatch,
    state: { carts },
  } = useCart();
  const { token } = useAuth();

  const handleMoveToCart = (product) => {
    carts?.find(({ _id }) => _id === product._id)
      ? updateQuantity(token, dispatch, product?._id, setClick, "increment") &&
        toast.success("product added in cart", { autoClose: 500 })
      : moveToCart(product, token, dispatch, setClick);
    setTimeout(
      () => removeFromWishlist(product._id, token, dispatch, setClick),
      1000
    );
  };
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
                    handleMoveToCart({
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
                    })
                  }
                  className="wish_btn btn"
                  disabled={click}
                >
                  Move to Cart
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
