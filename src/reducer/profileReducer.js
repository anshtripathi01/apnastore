export const profileReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_ADDRESS":
      return { ...state, address: [...state.address, payload] };
    case "EDIT_ADDRESS":
      return { ...state, address: [...state.address] };
    case "DELETE_ADDRESS":
      return { ...state, address: payload };

    case "ADD_ORDERS":
      return { ...state, orders: [...state.orders, payload] };

    default:
      return state;
  }
};
