export const profileReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_ADDRESS":
      return { ...state, address: [...state.address, payload] };
    case "EDIT_ADDRESS":
      return { ...state, address: [...state.address] };
    case "DELETE_ADDRESS":
      return { ...state, address: payload };

    default:
      return state;
  }
};
