export const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_CART":
      return { ...state, carts: payload };

    case "CLEAR_CART":
      return { ...state, carts: [] };
    default:
      return state;
  }
};
