import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { CategoryProvider } from "./context/categoryContext";
import { ProductsProvider } from "./context/productsContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CategoryProvider>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </CategoryProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
