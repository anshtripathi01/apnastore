import { NavLink } from "react-router-dom";
import { HiOutlineShoppingCart, HiOutlineHeart } from "react-icons/hi";
import "./header.css";
import { Searchbar } from "../search/Searchbar";
import "../search/searchbar.css";
import { useAuth } from "../../context/authContext";
import {  AiOutlineUser } from "react-icons/ai";
import { useCart } from "../../context/cartContext";
import { useWish } from "../../context/wishlistContext";
export const Header = () => {
  const {token} = useAuth()
  const {state:{carts}} = useCart()
  const {wishlist} = useWish()
  return (
    <header>
      <nav>
        <NavLink to="/">
          <div>
            <h2 className="logo">ApnaStore</h2>
          </div>
        </NavLink>
        <div className="desktop_search">
          <Searchbar />
        </div>
        <ul className="nav-menu">
          <li>
            <NavLink to="/products" className="nav-link">
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to={token ? "/profile" : "/login"} className="nav-link secondary-btn">
              {token? <AiOutlineUser  /> : "Login"}
            </NavLink>
          </li>
          <li>
            <NavLink to="/wishlist" className="nav-link">
            {!!wishlist?.length && <div className="badge wish_badge">{wishlist?.length} </div>}
              <HiOutlineHeart size={25} />
            </NavLink>
          </li>
          <li>
          
            <NavLink to="/cart" className="nav-link">
            {!!carts?.length && <div className="badge">{carts?.length} </div>}
              <HiOutlineShoppingCart size={25} />
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="mobile_search">
        <Searchbar />
      </div>
    </header>
  );
};
