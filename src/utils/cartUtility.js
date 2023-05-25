import { toast } from "react-toastify";

export const fetchCart = async (token, dispatch) => {
  try {
    const res = await fetch("/api/user/cart", {
      method: "GET",
      headers: {
        authorization: token,
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const { cart } = await res.json();
    dispatch({ type: "SET_CART", payload: cart });
  } catch (error) {
    console.log("set cart error");
  }
};

export const removeFromCart = async (productId, token, dispatch, setClick) => {
  try {
    setClick(true);
    setTimeout(() => setClick(false), 400);
    const res = await fetch(`/api/user/cart/${productId}`, {
      method: "DELETE",
      headers: {
        authorization: token,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const { cart } = await res.json();
    toast.warn("product deleted from cart", { autoClose: 500 });
    dispatch({ type: "SET_CART", payload: cart });
  } catch (error) {
    console.log("remove cart error", error);
  }
};

export const calculateCartValue = (carts) =>
  carts?.reduce(
    (total, { price, originalPrice, qty }) => ({
      ...total,
      totalCartPrice: (total.totalCartPrice + price) * qty,
      originalValue: total.originalValue + originalPrice * qty,
    }),
    { totalCartPrice: 0, originalValue: 0 }
  );
