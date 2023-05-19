import { NavLink } from "react-router-dom";
import { HiOutlineShoppingCart, HiOutlineHeart } from "react-icons/hi";
import "./header.css";
import { Searchbar } from "../search/Searchbar";
import "../search/searchbar.css";
export const Header = () => {
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
            <NavLink to="/login" className="nav-link secondary-btn">
              Login
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
