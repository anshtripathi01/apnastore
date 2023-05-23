import { useAuth } from "../../../context/authContext";
import "./profile.css";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { UserDetails } from "../../../components/user/UserDetails";
export const Profile = () => {
  const { dispatch } = useAuth();

  const logoutHandal = () => {
    toast.success("Logout successfully");
    setTimeout(() => {
      window.localStorage.clear();
      dispatch({ type: "LOGOUT" });
    }, 2000);
  };

  return (
    <div className="profile_details">
      <ToastContainer />
      <div className="profile_nav">
        <NavLink to="/profile">User details</NavLink>
        <NavLink to="/profile/address">Address</NavLink>
        <NavLink to="/profile/orders">Order History</NavLink>
      </div>

      <UserDetails />
      <div className="auth_btn_container">
      <button className="btn" type="button" onClick={logoutHandal}>
        Logout
      </button>
      </div>
    </div>
  );
};
