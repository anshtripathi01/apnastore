import React from "react";
import "./home.css";
import image from "./images/home_image.png";
import { useNavigate } from "react-router";
import { Footer } from "../../components/footer/Footer";
import { useCategory } from "../../context/categoryContext";
import { useProducts } from "../../context/productsContext";
export const Home = () => {
  const {
    categoryState: { categories },
  } = useCategory();
  const navigate = useNavigate();
  const { productsDispatcher } = useProducts();
  return (
    <>
      <div className="home_container">
        <div onClick={() => navigate("/products")} className="image_container">
          <img src={image} className="home_img" alt="home_img" />
        </div>
        <h2 className="category_text">Top Categories</h2>
        <div className="category-container">
          {categories?.map(({ _id, categoryName, image }) => (
            <div
              key={_id}
              className="card"
              onClick={() => {
                productsDispatcher({
                  type: "SORT_BY_HOME_CATEGORY",
                  productsPayload: categoryName,
                });
                navigate("/products");
              }}
            >
              <img
                src={image}
                className="category_image"
                alt="category_image"
              />
              <h2 className="card_heading">{categoryName}</h2>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};
