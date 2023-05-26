import { Navigate, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../../context/authContext";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./signup.css";

export const SignUp = () => {
  const { dispatch, credentials, isPassword } = useAuth();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      if (credentials.password !== credentials.confirmPassword) {
        setIsError(true);
        return;
      }
      setIsError(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      const { createdUser, encodedToken } = await res.json();
      if (!encodedToken) {
        toast.error("Email Already Exist!");
        return;
      }
      dispatch({
        type: "AUTHENTICATE",
        payload: { user: createdUser, token: encodedToken },
      });
      toast.success("User created Successfully");
      window.localStorage.setItem(
        "loginDetails",
        JSON.stringify({  token: encodedToken, user: createdUser })
      );
      setTimeout(()=>{
        navigate("/products");
      },2000)
      
    } catch (error) {
      console.log("error while signup");
    }
  };
  return (
    <div>
      {JSON.parse(localStorage.getItem("loginDetails")) && <Navigate to="/" />}
      <ToastContainer />
      <form
        className="form-container signup_form_container"
        onSubmit={submitForm}
      >
        <h2>SignUp</h2>
        <div className="input_container">
          <label htmlFor="first_name">First Name:</label>
          <input
            className="form_input"
            onChange={(e) =>
              dispatch({ type: "FIRST_NAME", payload: e.target.value })
            }
            type="text"
            placeholder="First Name"
            required
          />
        </div>
        <div className="input_container">
          <label htmlFor="last_name">Last Name:</label>
          <input
            className="form_input"
            onChange={(e) =>
              dispatch({ type: "LAST_NAME", payload: e.target.value })
            }
            type="text"
            placeholder="Last Name"
            required
          />
        </div>

        <div className="input_container">
          <label htmlFor="email">Email:</label>
          <input
            className="form_input"
            onChange={(e) =>
              dispatch({ type: "UPDATE_EMAIL", payload: e.target.value })
            }
            type="email"
            placeholder="Type your email"
            required
          />
        </div>

        <div className="input_container">
          <label htmlFor="password">Password:</label>
          <input
            className="form_input"
            onChange={(e) =>
              dispatch({ type: "PASSWORD", payload: e.target.value })
            }
            type={isPassword ? "text" : "password"}
            placeholder="Enter your password"
            required
          />
          <button
            className="password_icon"
            onClick={() => dispatch({ type: "SHOW_PASSWORD" })}
            type="button"
          >
            {!isPassword ? (
              <AiOutlineEye size={20} />
            ) : (
              <AiOutlineEyeInvisible size={20} />
            )}
          </button>
        </div>

        <div className="input_container">
          <label htmlFor="password">Confirm Password:</label>
          <input
            className="form_input"
            onChange={(e) =>
              dispatch({ type: "CONFIRM_PASSWORD", payload: e.target.value })
            }
            type={isPassword ? "text" : "password"}
            placeholder="Confirm password"
            required
            
          />
          {isError && <p className="signup_error">Passwords do not match</p>}
        </div>

        <div className="auth_btn_container">
          <button type="submit" className="btn">
            Create Account
          </button>
        </div>
        <p>
          Already have an account? {""}
          <Link to="/login" className="auth-btn">
            Signin
          </Link>
        </p>
      </form>
    </div>
  );
};
