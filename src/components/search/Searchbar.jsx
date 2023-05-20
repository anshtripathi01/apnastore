import React from "react";
import { useProducts } from "../../context/productsContext";
import { useNavigate } from "react-router";
import "./searchbar.css";

export const Searchbar = () => {
  const { productsDispatcher } = useProducts();
  const navigate = useNavigate();
  return (
    <input
      type="text"
      onChange={(e) => {
        productsDispatcher({
          type: "SEARCH",
          productsPayload: e.target.value,
        });
        navigate("/products");
      }}
      className="searchbar"
      placeholder="Search a product..."
    />
  );
};
