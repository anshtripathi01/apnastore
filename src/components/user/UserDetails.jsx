import React from "react";
import "./user-details.css";
export const UserDetails = () => {
  const { user } = JSON.parse(window.localStorage.getItem("loginDetails"));
  return (
    <div className="user_details">
      <h2>Details</h2>
      <p>
        <strong>Full Name :</strong> {user?.firstName} {user?.lastName}
      </p>
      <p>
        <strong>Email: </strong>
        {user.email}
      </p>
    </div>
  );
};
