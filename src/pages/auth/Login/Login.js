import { useLocation, useNavigate } from "react-router";
import "./login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../context/authContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const Login = () => {
  const { dispatch, credentials, isPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (
      location.pathname === "/login" &&
      JSON.parse(localStorage.getItem("loginDetails"))?.token
    ) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: credentials?.email,
          password: credentials?.password,
        }),
      });
      const { foundUser, encodedToken } = await res.json();

      if (!encodedToken) {
        return toast.error("Invalid Credentials, Try Again", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      dispatch({
        type: "AUTHENTICATE",
        payload: { user: foundUser, token: encodedToken },
      });

      localStorage.setItem(
        "loginDetails",
        JSON.stringify({ user: foundUser, token: encodedToken })
      );

      toast.success("Login successfully...");
      setTimeout(() => {
        navigate(location.state?.from?.pathname || "/");
      }, 2000);
    } catch (error) {
      console.log("internal error");
    }
  };

  return (
    <div>
      <ToastContainer />
      <form className="form-container" onSubmit={submitForm}>
        <h2>Login</h2>
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
        <div className="auth_btn_container">
          <button type="submit" className="btn">
            Login
          </button>
        </div>

        <p>
          Don't have account?{" "}
          <Link to="/signup" className="auth-btn">
            SignUp
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};
