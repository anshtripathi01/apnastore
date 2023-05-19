import { createContext, useContext, useEffect, useReducer } from "react";
import { productsReducer } from "../reducer/productsReducer";
import {
  filterByCategory,
  filterByRating,
  sortProducts,
} from "../utils/productsUtilityFunction";

const productsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productsState, productsDispatcher] = useReducer(productsReducer, {
    products: [],
    filters: [],
    sliderRange: 2014,
    sortBy: null,
    rating: 0,
    sortByCategory: [],
    searchValue: "",
  });
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const { products } = await res.json();
    productsDispatcher({
      type: "PRODUCTS_DATA",
      productsPayload: { products },
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(productsState.sliderRange);

  const sortedProducts = sortProducts(productsState);
  const productsFilter = filterByRating(sortedProducts, productsState);
  const filterProducts = filterByCategory(productsFilter, productsState)
    .filter(({ price }) => price <= productsState.sliderRange)
    .filter(
      ({ title, descriptions }) =>
        title
          ?.toLowerCase()
          .includes(productsState.searchValue.toLowerCase()) ||
        descriptions
          ?.toLowerCase()
          .includes(productsState.searchValue.toLowerCase())
    );
  return (
    <productsContext.Provider
      value={{ productsState, productsDispatcher, filterProducts }}
    >
      {children}
    </productsContext.Provider>
  );
};

export const useProducts = () => useContext(productsContext);
