export const sortProducts = ({ products, sortBy }) =>
  sortBy
    ? sortBy === "High To Low"
      ? [...products].sort((a, b) => b.price - a.price)
      : sortBy === "Low To High"
      ? [...products].sort((a, b) => a.price - b.price)
      : products
    : products;

export const filterByRating = (sortedProducts, { rating }) =>
  rating
    ? sortedProducts.filter((product) => product.rating > rating)
    : sortedProducts;

export const filterByCategory = (productsFilter, { sortByCategory }) =>
  sortByCategory.length !== 0
    ? productsFilter.filter(({ categoryName }) =>
        sortByCategory.includes(categoryName)
      )
    : productsFilter;
