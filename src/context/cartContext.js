import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { cartReducer } from "../reducer/cartReducer";
import { useAuth } from "./authContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { fetchCart } from "../utils/cartUtility";

const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, { carts: [] });
  const [click, setClick] = useState(false);

  useEffect(() => {
    fetchCart(token, dispatch);
  }, [token]);

  const addToCart = async (product) => {
    try {
      setClick(true);
      setTimeout(() => setClick(false), 400);
      if (!token) {
        navigate("/login");
        return;
      }

      if (state?.carts?.find(({ _id }) => _id === product._id)) {
        navigate("/cart");
        return;
      }
      const res = await fetch("/api/user/cart", {
        method: "POST",
        body: JSON.stringify({ product }),
        headers: {
          authorization: token,
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const { cart } = await res.json();
      dispatch({ type: "SET_CART", payload: cart });

      toast.success("product added in Cart", { autoClose: 500 });
    } catch (error) {
      console.log("error in adding product", error);
    }
  };

  return (
    <cartContext.Provider
      value={{ state, dispatch, addToCart, click, setClick }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => useContext(cartContext);
