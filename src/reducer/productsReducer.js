export const productsReducer = (productsState, { type, productsPayload }) => {
  switch (type) {
    case "PRODUCTS_DATA":
      return { ...productsState, products: productsPayload["products"] };
    case "SEARCH":
      return { ...productsState, searchValue: productsPayload };

    case "SORT_BY_PRICE":
      return {
        ...productsState,
        sortBy: productsPayload,
      };
    case "RANGE":
      return { ...productsState, sliderRange: productsPayload };
    case "SORT_BY_RATING":
      return { ...productsState, rating: productsPayload };
    case "SORT_BY_CATEGORY":
      return {
        ...productsState,
        sortByCategory: productsState.sortByCategory.includes(productsPayload)
          ? productsState.sortByCategory.filter(
              (item) => item !== productsPayload
            )
          : [...productsState.sortByCategory, productsPayload],
      };
    case "SORT_BY_HOME_CATEGORY":
      return {
        ...productsState,
        sortByCategory: [productsPayload],
      };
    case "CLEAR_ALL_FILTERS":
      return {
        ...productsState,
        sortBy: "",
        rating: 0,
        sortByCategory: [],
        sliderRange: 2014,
      };
    default:
      return productsState;
  }
};
