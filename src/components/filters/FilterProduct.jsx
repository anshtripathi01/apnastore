import React from "react";
import { useProducts } from "../../context/productsContext";
import { AiFillCloseCircle } from "react-icons/ai";

export const FilterProduct = ({ props: { mobile, setMobile } }) => {
  const {
    productsState: { sortByCategory, sortBy, rating, sliderRange },
    productsDispatcher,
  } = useProducts();
  return (
    <aside className={`aside ${mobile && `mobile_aside`}`}>
      <div className="filter_header">
        <h2>Filters</h2>
        <button
          onClick={() => productsDispatcher({ type: "CLEAR_ALL_FILTERS" })}
        >
          Clear
        </button>
        <button onClick={() => setMobile(!mobile)} className="close_btn">
          <AiFillCloseCircle size={25} />
        </button>
      </div>
      {/*  Sort By Price */}

      <div className="filters_container">
        <h5>Price</h5>
        <div className="product_slider_label">
          <p>0</p> <p>1007</p> <p>2014</p>
        </div>

        <input
          className="slider"
          onChange={(e) =>
            productsDispatcher({
              type: "RANGE",
              productsPayload: e.target.value,
            })
          }
          min={0}
          max={2014}
          step={1}
          value={sliderRange}
          type="range"
        />
        <h5>Sort By Price </h5>
        <input
          onChange={(e) =>
            productsDispatcher({
              type: "SORT_BY_PRICE",
              productsPayload: "High To Low",
            })
          }
          type="radio"
          name="sortByPrice"
          checked={sortBy && sortBy === "High To Low"}
        />
        <label className="filter_label" htmlFor="SortByPrice">
          High To Low
        </label>
        <br />
        <input
          onChange={(e) =>
            productsDispatcher({
              type: "SORT_BY_PRICE",
              productsPayload: "Low To High",
            })
          }
          type="radio"
          name="sortByPrice"
          checked={sortBy && sortBy === "Low To High"}
        />
        <label className="filter_label" htmlFor="SortByPrice">
          Low To High
        </label>
      </div>
      {/*  Sort By Category */}

      <div className="filters_container">
        <h5>Sort By Category </h5>
        <input
          onChange={() =>
            productsDispatcher({
              type: "SORT_BY_CATEGORY",
              productsPayload: "men",
            })
          }
          type="checkbox"
          name="sortByCategory"
          checked={sortByCategory && sortByCategory.includes("men")}
        />
        <label className="filter_label" htmlFor="sortByCategory">
          MEN
        </label>
        <br />
        <input
          onChange={() =>
            productsDispatcher({
              type: "SORT_BY_CATEGORY",
              productsPayload: "women",
            })
          }
          type="checkbox"
          name="sortByCategory"
          checked={sortByCategory && sortByCategory.includes("women")}
        />
        <label className="filter_label" htmlFor="sortByCategory">
          WOMEN
        </label>
        <br />
        <input
          onChange={() =>
            productsDispatcher({
              type: "SORT_BY_CATEGORY",
              productsPayload: "kids",
            })
          }
          type="checkbox"
          name="sortByCategory"
          checked={sortByCategory && sortByCategory.includes("kids")}
        />
        <label className="filter_label" htmlFor="sortByCategory">
          KIDS
        </label>
      </div>

      {/*  Sort By Rating */}
      <div className="filters_container">
        <h5>Sort By Rating </h5>
        <input
          onChange={() =>
            productsDispatcher({ type: "SORT_BY_RATING", productsPayload: 1 })
          }
          type="radio"
          name="rating"
          checked={rating && rating === 1}
        />
        <label className="filter_label" htmlFor="sortByRating">
          1 star & above
        </label>
        <br />
        <input
          onChange={() =>
            productsDispatcher({ type: "SORT_BY_RATING", productsPayload: 2 })
          }
          type="radio"
          name="rating"
          checked={rating && rating === 2}
        />
        <label className="filter_label" htmlFor="sortByRating">
          2 star & above
        </label>
        <br />
        <input
          onChange={() =>
            productsDispatcher({ type: "SORT_BY_RATING", productsPayload: 3 })
          }
          type="radio"
          name="rating"
          checked={rating && rating === 3}
        />
        <label className="filter_label" htmlFor="sortByRating">
          3 star & above
        </label>
        <br />
        <input
          onChange={() =>
            productsDispatcher({ type: "SORT_BY_RATING", productsPayload: 4 })
          }
          type="radio"
          name="rating"
          checked={rating && rating === 4}
        />
        <label className="filter_label" htmlFor="sortByRating">
          4 star & above
        </label>
      </div>
    </aside>
  );
};
