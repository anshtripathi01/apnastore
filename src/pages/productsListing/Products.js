import { useProducts } from "../../context/productsContext";
import { ProductCard } from "../../components/productCard/productCard";
import "./products.css";
import { useState } from "react";
import { AiFillFilter } from "react-icons/ai";
import { FilterProduct } from "../../components/filters/FilterProduct";
import { Loader } from "../../components/loader/Loader";
import { useCart } from "../../context/cartContext";
import { ToastContainer } from "react-toastify";

export const Products = () => {
  const { filterProducts, isLoading } = useProducts();
  const [mobile, setMobile] = useState(false);
  const {addToCart,state:{carts}, click} = useCart()
  return (
    <div className="App">
    <ToastContainer />
      <section>
        <FilterProduct props={{ mobile, setMobile }} />
        <div className="main">
          <div className="main_header">
            <h2>All products</h2>
            <button onClick={() => setMobile(!mobile)} className="header_btn">
              <AiFillFilter color="red" size={30} />
            </button>
          </div>
          {(isLoading && <Loader /> )|| (!filterProducts.length && <h4>No Products found !!!</h4>)}
          {filterProducts?.map(
            ({
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
            }) => (
              <div className="card" key={_id}>
                <ProductCard
                  product={{
                    _id,
                    title,
                    descriptions,
                    price,
                    image,
                    originalPrice,
                    rating,
                    reviews,
                    trending,
                  }}
                />
                <div className="btn-container">
                  {inStock ? (
                    <button className="btn" onClick={()=>addToCart({
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
            })} disabled={click}>{carts?.find((product)=>product._id === _id)?"Go To Cart":"Add To Cart"}</button>
                  ) : (
                    <button className="btn disabled-btn" disabled={!inStock}>
                      Out of Stock
                    </button>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};
