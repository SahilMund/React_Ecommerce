import { ProductActionTypes } from "../action-types";

const initialState = {
  productDetails: [],
  filteredDetails: [],

  categories: [],
  productInfo: {},

  pageDetails: {},
  totalPage: null,
  filterType: "reset",

  error_msg: null,
  isLoading: false,
  isFiltering: false,
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ProductActionTypes.FETCH_PRODUCTS_BY_CATEGORY:
      // implementing pagination
      const { totalItems, itemsPerPage } = payload.meta;
      const totPage = Math.ceil(totalItems / itemsPerPage);

      return {
        ...state,
        productDetails: payload.items,
        pageDetails: payload.meta,
        totalPage: totPage,
        isLoading: false,
      };
    case ProductActionTypes.FETCH_CATEGORIES:
      // fetching all categories
      return { ...state, categories: payload, isLoading: false };
    case ProductActionTypes.FETCH_PRODUCT_DETAILS:
      // fetching product details related to a particular category
      return { ...state, productData: payload, isLoading: false };
    case ProductActionTypes.SORT_PRODUCTS:
      // to sort the products according to some criteria
      return { ...state, productDetails: payload, isLoading: false };
    case ProductActionTypes.FILTER_PRODUCTS:
      // to filter the products according to some criteria

      return {
        ...state,
        filteredDetails: payload.data,
        filterType: payload.type,
        isFiltering: false,
      };

    case ProductActionTypes.REQUEST_LOADING:
      // to  handle loader state for other operations
      return {
        ...state,
        isLoading: true,
        productDetails: [],
        productInfo: {},
        filterType: null,
      };
    case ProductActionTypes.REQUEST_FILTERING_STARTED:
      // to handle loader state for filter operation

      return {
        ...state,
        productDetails: payload || [],
        productInfo: {},
        filterType: null,
        isFiltering: true,
      };

    case ProductActionTypes.REQUEST_FAILURE:
      // to  handle error state for other operations

      return { ...state, isLoading: false, error_msg: payload };

    default:
      return state;
  }
};
