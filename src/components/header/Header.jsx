import { NavLink } from "react-router-dom";
import { HiOutlineShoppingCart, HiOutlineHeart } from "react-icons/hi";
import "./header.css";
import { Searchbar } from "../search/Searchbar";
import "../search/searchbar.css";
import { useAuth } from "../../context/authContext";
import { AiOutlineUser } from "react-icons/ai";
export const Header = () => {
  const {token} = useAuth()
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
              <HiOutlineHeart size={25} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className="nav-link">
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
