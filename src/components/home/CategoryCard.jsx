import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/style";
import { IMAGE_BASE_URL } from "../../api/constants";

const CategoryCard = ({ data }) => {
  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/products/category/${data.id}`}>
          <img
            src={`${IMAGE_BASE_URL}/${data.categoryImages[0]}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <h5 className={`${styles.shop_name}`}>
          {" "}
          <b>{data.categoryName}</b>
        </h5>
        <h5 className={`${styles.productDiscountPrice}`}>{data.description}</h5>
        <br />
        <h4 className="pb-3 font-[500]">
          Category status : {data.status.toLowerCase()}
        </h4>
      </div>
    </>
  );
};

export default CategoryCard;
