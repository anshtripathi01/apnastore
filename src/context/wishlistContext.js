import { createContext, useContext, useEffect, useReducer } from "react";
import { wishlistReducer } from "../reducer/wishlistReducer";
import { useAuth } from "./authContext";
import { fetchWish } from "../utils/wishlistUtlity";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useCart } from "./cartContext";

const wishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const navigate = useNavigate();
  const { click, setClick } = useCart();
  const { token } = useAuth();
  const [state, wishDispatcher] = useReducer(wishlistReducer, { wishlist: [] });

  useEffect(() => {
    fetchWish(token, wishDispatcher);
  }, [token, state.wishlist]);

  const addToWishlist = async (product) => {
    try {
      setClick(true);
      setTimeout(() => setClick(false), 400);
      if (!token) {
        navigate("/login");
        return;
      }

      if (state?.wishlist?.find(({ _id }) => _id === product._id)) {
        navigate("/wishlist");
        return;
      }
      const res = await fetch("/api/user/wishlist", {
        method: "POST",
        body: JSON.stringify({ product }),
        headers: {
          authorization: token,
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const { wishlist } = await res.json();
      wishDispatcher({ type: "SET_WISHLIST", payload: wishlist });

      toast.success("product added in Wishlist", { autoClose: 500 });
    } catch (error) {
      console.log("error in adding product", error);
    }
  };
  return (
    <wishlistContext.Provider
      value={{ ...state, wishDispatcher, addToWishlist, click, setClick }}
    >
      {children}
    </wishlistContext.Provider>
  );
};

export const useWish = () => useContext(wishlistContext);
