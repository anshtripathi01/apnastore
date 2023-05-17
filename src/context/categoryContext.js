import { createContext, useContext, useEffect, useReducer } from "react";
import { categoryReducer } from "../reducer/categoryReducer";
const categoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categoryState, categoryDispatcher] = useReducer(categoryReducer, {
    categories: [],
  });

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const { categories } = await res.json();
      categoryDispatcher({
        type: "CATEGORY_DATA",
        categoryPayload: { categories },
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <categoryContext.Provider value={{ categoryState }}>
      {children}
    </categoryContext.Provider>
  );
};

const useCategory = () => useContext(categoryContext);

export { CategoryProvider, useCategory };
