import axios from "axios";
import { ProductActionTypes } from "./../action-types";
import {
  FETCH_CATEGORIES,
  FETCH_PRODUCTS,
  SERVER_BASE_URL,
} from "../../api/constants";

// To add a product to the cart
export const fetchProductsByCategory =
  (categoryId, page = 1, limit = 10) =>
  async (dispatch) => {
    dispatch({
      type: ProductActionTypes.REQUEST_LOADING,
    });
    try {
      const response = await axios.get(
        // `${SERVER_BASE_URL}/${FETCH_PRODUCTS_BY_CATEGORY}/${id}`
        `${SERVER_BASE_URL}/products/category/${categoryId}?limit=${limit}&page=${page}`
      );

      // console.log(response,` ${SERVER_BASE_URL}/${FETCH_PRODUCTS_BY_CATEGORY}/${id}`);
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_BY_CATEGORY,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ProductActionTypes.REQUEST_FAILURE,
        payload: error,
      });
    }
  };
export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: ProductActionTypes.REQUEST_LOADING,
    });
    const { data } = await axios.get(`${SERVER_BASE_URL}/${FETCH_CATEGORIES}`);

    dispatch({
      type: ProductActionTypes.FETCH_CATEGORIES,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ProductActionTypes.REQUEST_FAILURE,
      payload: error,
    });
  }
};
export const fetchProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ProductActionTypes.REQUEST_LOADING,
    });
    const { data } = await axios.get(
      `${SERVER_BASE_URL}/${FETCH_PRODUCTS}/${id}`
    );

    console.log(data, `${SERVER_BASE_URL}/${FETCH_PRODUCTS}/${id}`);

    dispatch({
      type: ProductActionTypes.FETCH_PRODUCT_DETAILS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ProductActionTypes.REQUEST_FAILURE,
      payload: error,
    });
  }
};

export const sortProducts = (value) => async (dispatch, getState) => {
  try {
    const products = getState().product.productDetails;
    let data;
    switch (value) {
      case "by-date":
        data = [...products].sort((a, b) => {
          a = a.date;
          b = b.date;
          return a.localeCompare(b);
        });
        break;

      case "price-asc":
        data = [...products].sort(
          (a, b) => a.variants[0]?.price - b.variants[0]?.price
        );
        break;
      case "price-desc":
        data = [...products].sort(
          (a, b) => b.variants[0]?.price - a.variants[0]?.price
        );
        break;
      case "name-asc":
        data = [...products].sort((a, b) => {
          a = a.productName;
          b = b.productName;
          return a.localeCompare(b);
        });
        break;
      case "name-desc":
        data = [...products].sort((a, b) => {
          a = a.productName;
          b = b.productName;
          return b.localeCompare(a);
        });
        break;

      default:
        data = [];
        break;
    }

    console.log("data", data);
    dispatch({
      type: ProductActionTypes.SORT_PRODUCTS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ProductActionTypes.REQUEST_FAILURE,
      payload: error,
    });
  }
};
export const filterProducts =
  (type, value, products) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ProductActionTypes.REQUEST_FILTERING_STARTED,
        payload : products
      });

      console.log(products);

      let data;
      switch (type) {
        case "price":
          const [min, max] = value;
          data = [...products].filter((product) => {
            if (min && max) {
              return (
                product.variants[0]?.price >= min &&
                product.variants[0]?.price <= max
              );
            } else if (min) {
              return product.variants[0]?.price >= min;
            } else if (max) {
              return product.variants[0]?.price <= max;
            } else {
              return true;
            }
          });

          break;

        case "others":
          console.log(value, products);
          data = [...products].filter((product) =>
            value.every((filter) => product[filter])
          );
          break;

        case "reset":
          data = [];
          break;

        default:
          data = [];
          break;
      }

      console.log("filter data", data, type);
      dispatch({
        type: ProductActionTypes.FILTER_PRODUCTS,
        payload: { data, type },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ProductActionTypes.REQUEST_FAILURE,
        payload: error,
      });
    }
  };
