import React from "react";
import { useAuth } from "../../../context/authContext";
import "./profile.css";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useLocation } from "react-router-dom";
import { UserDetails } from "../../../components/user/UserDetails";
import { Address } from "../../../components/address/Address";
import { OrdersSummary } from "../../../components/Orders/OrdersHistory";
export const Profile = () => {
  const location = useLocation();
  const { dispatch } = useAuth();

  const logoutHandal = () => {
    toast.success("Logout successfully");
    setTimeout(() => {
      window.localStorage.clear();
      dispatch({ type: "LOGOUT" });
    }, 2000);
  };

  const activeTab = ({ isActive }) => ({
    fontWeight: isActive && "bold",
    borderBottom: isActive && "5px solid var(--primary-color)",
  });

  return (
    <div className="profile_details">
      <ToastContainer />
      <div className="profile_nav">
        <NavLink style={activeTab} to="/profile/details">
          User details
        </NavLink>
        <NavLink style={activeTab} to="/profile/address">
          Address
        </NavLink>
        <NavLink style={activeTab} to="/profile/orders">
          Order History
        </NavLink>
      </div>

      {location.pathname === "/profile/details" && <UserDetails />}
      {location.pathname === "/profile/address" && <Address />}
      {location.pathname === "/profile/orders" && <OrdersSummary />}
      <div className="auth_btn_container">
        {location.pathname === "/profile/details" && (
          <button className="btn" type="button" onClick={logoutHandal}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};
