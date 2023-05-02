import { ProductActionTypes } from "../action-types";

const initialState = {
  productDetails: [],
  filteredDetails: [],

  categories: [],
  productInfo: {},

  pageDetails: {},
  totalPage: null,
  filterType: 'reset',

  error_msg: null,
  isLoading: false,
  isFiltering: false,
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ProductActionTypes.FETCH_PRODUCTS_BY_CATEGORY:
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
      return { ...state, categories: payload, isLoading: false };
    case ProductActionTypes.FETCH_PRODUCT_DETAILS:
      return { ...state, productData: payload, isLoading: false };
    case ProductActionTypes.SORT_PRODUCTS:
      return { ...state, productDetails: payload, isLoading: false };
    case ProductActionTypes.FILTER_PRODUCTS:
      // const data =
      //   payload.data && payload.data.length !== 0
      //     ? {
      //         ...state,
      //         filteredDetails: payload.data,
      //         filterType: payload.type,
      //         isLoading: false,
      //       }
      //     : { ...state, isLoading: false };
      return {
        ...state,
        filteredDetails: payload.data,
        filterType: payload.type,
        isFiltering: false,
      };

    case ProductActionTypes.REQUEST_LOADING:
      return {
        ...state,
        isLoading: true,
        productDetails:  [],
        productInfo: {},
        filterType: null,
      };
    case ProductActionTypes.REQUEST_FILTERING_STARTED:
      return {
        ...state,
        productDetails: payload || [],
        productInfo: {},
        filterType: null,
        isFiltering: true,
      };

    case ProductActionTypes.REQUEST_FAILURE:
      return { ...state, isLoading: false, error_msg: payload };

    default:
      return state;
  }
};
