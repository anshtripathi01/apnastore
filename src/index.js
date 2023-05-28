import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { CategoryProvider } from "./context/categoryContext";
import { ProductsProvider } from "./context/productsContext";
import { AuthProvider } from "./context/authContext";
import { CartProvider } from "./context/cartContext";
import { WishlistProvider } from "./context/wishlistContext";
import { ProfileProvider } from "./context/profileContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CategoryProvider>
        <ProductsProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <ProfileProvider>
                  <App />
                </ProfileProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ProductsProvider>
      </CategoryProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
