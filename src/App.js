import { Route, Routes } from "react-router";
import "./App.css";
import { Home } from "./pages/home/Home";
import { Header } from "./components/header/Header";
import { Products } from "./pages/productsListing/Products";
import { SingleProductPage } from "./pages/singleProductPage/SingleProductPage";
import { Login } from "./pages/auth/Login/Login";
import { Profile } from "./pages/auth/profile/Profile";
import { RequiresAuth } from "./pages/auth/Private/RequiresAuth";
import { SignUp } from "./pages/auth/Signup/Signup";
import { CartPage } from "./pages/cart/CartPage";
import { Wishlist } from "./pages/wishlist/Wishlist";
import { Checkout } from "./pages/checkout/Checkout";
import { NotFoundPage } from "./components/not-found/NotFoundPage";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<SingleProductPage />} />
        <Route
          path="/cart"
          element={
            <RequiresAuth>
              <CartPage />
            </RequiresAuth>
          }
        />
        <Route
          path="/wishlist"
          element={
            <RequiresAuth>
              <Wishlist />
            </RequiresAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route>
          <Route
            path="/profile/details"
            index={true}
            element={
              <RequiresAuth>
                <Profile />
              </RequiresAuth>
            }
          />
          <Route
            path="/profile/address"
            element={
              <RequiresAuth>
                <Profile />
              </RequiresAuth>
            }
          />
          <Route
            path="/profile/orders"
            element={
              <RequiresAuth>
                <Profile />
              </RequiresAuth>
            }
          />
        </Route>
        <Route path="/signup" element={<SignUp />} />

        <Route path="/checkout">
          <Route
            path="/checkout"
            index={true}
            element={
              <RequiresAuth>
                <Checkout />
              </RequiresAuth>
            }
          />
          <Route
            path="/checkout/order_summary"
            element={
              <RequiresAuth>
                <Checkout />
              </RequiresAuth>
            }
          />
        </Route>
        <Route path="*" element = {<NotFoundPage /> } />
      </Routes>
    </div>
  );
}

export default App;
