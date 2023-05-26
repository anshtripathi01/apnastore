import React, { useEffect, useState } from "react";
import "./single-product.css";
import { Loader } from "../../components/loader/Loader";
import { useParams } from "react-router";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { useCart } from "../../context/cartContext";
import { ToastContainer } from "react-toastify";
import { useWish } from "../../context/wishlistContext";

export const SingleProductPage = () => {
    const { productId } = useParams();
    const {addToCart,state:{carts}} = useCart()
    const {addToWishlist, wishlist} = useWish()
    const [product, setProduct] = useState()
  useEffect(() => {
    const fetchProducts = async () => {
        try {
          const res = await fetch(`/api/products/${productId}`);
          const { product } = await res.json();
            setProduct(product)
        } catch (error) {
          console.log("error");
        }
      };
      
        fetchProducts();
      }, [productId]);
    
  return (
    <div className="detail_main">
    <ToastContainer />
      {!product ? <Loader /> :
      <div className="single-product-container">
       <div className="single_page_img_box">
       <button onClick={()=>addToWishlist(product)}>{wishlist?.find(({_id})=> _id === product._id)?<AiFillHeart className="heart_icon"  color="red" size={30} />: <AiOutlineHeart className="heart_icon" color="black" size={30} />}</button>
       <img
          className="singlepage-img"
          src={product?.image}
          alt={product?.title}
        />
        <p className="rating">
          <AiFillStar color="orange" size="18" />
          {product.rating}|{product.reviews}
        </p>
       </div>
        
        <div className="product-info">

          <div className="typo_container">
            <h2 className="product_title">{product?.title}</h2>
            <p className="product_desc">{product?.descriptions}</p>
          </div>
          <p><strong>Availbilty : </strong>{product?.inStock?"in Stock" : "out of stock"}</p>
          <div className="price-info">
          <p>
            <strong>₹{product?.price}</strong>
            <span
             className="discount_price detail_discount_price"
            >
              ₹{product?.originalPrice}
            </span>
          </p>
           
            <p>60% OFF</p>
          </div>
          <div className="btn-container">
            {product?.inStock ? (
              <button className="btn" onClick={()=>addToCart(product)}>{carts?.find(({_id})=>_id === product._id)?"Go To Cart":"Add To Cart"}</button>
            ) : (
              <button className="btn disabled-btn">Out Of Stock</button>
            )}
          </div>
        </div>
      </div>
      }
    </div>
  );
};
