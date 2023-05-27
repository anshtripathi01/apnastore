import { AiFillHeart, AiFillStar, AiFillEye, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./product-card.css";
import { useWish } from "../../context/wishlistContext";
import { removeFromWishlist } from "../../utils/wishlistUtlity";
import { useAuth } from "../../context/authContext";

export const ProductCard = ({
  product: {
    _id,
    title,
    price,
    image,
    originalPrice,
    rating,
    reviews,
    trending,
  },
}) => {
const {token} = useAuth();
  const {addToWishlist, wishlist, wishDispatcher} = useWish()
  return (
    <>
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

          <p>{Math.round(((originalPrice-price)/originalPrice)*100)}% OFF</p>
        </div>
      </div>
    </>
  );
};
