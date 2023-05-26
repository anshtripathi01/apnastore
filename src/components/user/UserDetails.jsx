import React from "react";
import "./user-details.css";
import { useAuth } from "../../context/authContext";
export const UserDetails = () => {
  const  {user}  = useAuth()
  return (
    <div className="user_details">
      <h2>Details</h2>
      <p>
        <strong>Full Name :</strong> {user?.firstName} {user?.lastName}
      </p>
      <p>
        <strong>Email: </strong>
        {user?.email}
      </p>
    </div>
  );
};
