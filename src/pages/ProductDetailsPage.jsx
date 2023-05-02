import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Loader, ProductDetails } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { Footer, Header } from "../components";
import { fetchProductDetails } from "../redux/actions";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    id && dispatch(fetchProductDetails(id));
  }, [id]);

  const { productData, isLoading } = useSelector((state) => state.product);



  return (
    <div>
      <Header />
    {isLoading ? <Loader/> :   <ProductDetails data={productData} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
