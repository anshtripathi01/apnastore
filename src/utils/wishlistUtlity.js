import { toast } from "react-toastify";

export const fetchWish = async (token, dispatch) => {
  try {
    const res = await fetch("/api/user/wishlist", {
      method: "GET",
      headers: {
        authorization: token,
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const { wishlist } = await res.json();
    dispatch({ type: "SET_WISHLIST", payload: wishlist });
  } catch (error) {
    console.log("set cart error");
  }
};

export const removeFromWishlist = async (
  productId,
  token,
  dispatch,
  setClick
) => {
  try {
    setClick(true);
    setTimeout(() => setClick(false), 400);
    const res = await fetch(`/api/user/wishlist/${productId}`, {
      method: "DELETE",
      headers: {
        authorization: token,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const { wishlist } = await res.json();
    toast.warn("product deleted from wishlist", { autoClose: 500 });
    dispatch({ type: "SET_WISHLIST", payload: wishlist });
  } catch (error) {
    console.log("remove wishlist error", error);
  }
};
