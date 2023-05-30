import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { categoryReducer } from "../reducer/categoryReducer";
const categoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categoryState, categoryDispatcher] = useReducer(categoryReducer, {
    categories: [],
  });
const [isLoading, setIsLoading] = useState(false)
  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/categories");
      const { categories } = await res.json();
      categoryDispatcher({
        type: "CATEGORY_DATA",
        categoryPayload: { categories },
      });
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <categoryContext.Provider value={{ categoryState, isLoading }}>
      {children}
    </categoryContext.Provider>
  );
};

const useCategory = () => useContext(categoryContext);

export { CategoryProvider, useCategory };
