import { combineReducers } from "redux";
import { productReducer } from "./productReducer";

// Using combined reducer to be able to use multiple reducers
const reducers = combineReducers({
  product: productReducer
});

export default reducers;
