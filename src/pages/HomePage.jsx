import React from "react";
import { Product, Footer, Header, Loader } from "../components";
import { useSelector } from "react-redux";

const HomePage = () => {
  const {  isLoading } = useSelector((state) => state.product);

  
  return (
    <div>
      <Header activeHeading={1} />
      {isLoading ? <Loader /> : <Product />}
      <Footer />
    </div>
  );
};

export default HomePage;
