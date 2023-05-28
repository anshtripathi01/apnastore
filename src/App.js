import { Route, Routes } from "react-router";
import "./App.css";
import { Home } from "./pages/home/Home";
import Mockman from "mockman-js";
import { Header } from "./components/header/Header";
import { Products } from "./pages/productsListing/Products";
import { SingleProductPage } from "./pages/singleProductPage/SingleProductPage";
import { Login } from "./pages/auth/Login/Login";
import { Profile } from "./pages/auth/profile/Profile";
import { RequiresAuth } from "./pages/auth/Private/RequiresAuth";
import { SignUp } from "./pages/auth/Signup/Signup";
import { CartPage } from "./pages/cart/CartPage";
import { Wishlist } from "./pages/wishlist/Wishlist";

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
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mock" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
