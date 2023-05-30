import React from "react";
import "./loader.css";
import loader from "./1495.gif";

export const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt="loader..." />
    </div>
  );
};
