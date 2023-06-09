import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { HomePage, ProductDetailsPage, ProductPage } from "./pages";
import { fetchCategories } from "./redux/actions";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatching an action to fetch categories details from the API
    dispatch(fetchCategories());
  }, []);

  return (
    <BrowserRouter basename="/React_Ecommerce">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/products/category/:id" element={<ProductPage />} />
        <Route exact path="/product/:id" element={<ProductDetailsPage />} />
        <Route>404 Not Found!</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
