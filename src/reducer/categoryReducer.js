export const categoryReducer = (categoryState, { type, categoryPayload }) => {
  switch (type) {
    case "CATEGORY_DATA":
      return categoryPayload;
    default:
      return categoryState;
  }
};
