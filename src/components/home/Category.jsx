import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/style";
import CategoryCard from "./CategoryCard";

const Category = () => {
  const { categories } = useSelector((state) => state.product);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}></div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {categories &&
            categories.map((i, index) => <CategoryCard data={i} key={i.id} />)}
        </div>
      </div>
    </div>
  );
};

export default Category;
