import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/style";
import { useDispatch } from 'react-redux';
import { sortProducts } from "../../redux/actions/product";

const DropDown = ({  handleSelectedItem, setDropDown }) => {
  const options = [
    { value: "by-date", name: "by Date" },
    { value: "price-asc", name: "Price (asc)" },
    { value: "price-desc", name: "Price (desc)" },
    { value: "name-asc", name: "Alphabetically(a - z)" },
    { value: "name-desc", name: "Alphabetically(z - a)" },
  ];
  const dispatch = useDispatch();

  const submitHandle = (i) => {
    console.log(i);
    dispatch(sortProducts(i.value));
    handleSelectedItem(i.name);
    setDropDown(false);
  };
  return (
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {options &&
        options.map((i, index) => (
          <div
            key={index}
            className={`${styles.flexNormal}`}
            onClick={() => submitHandle(i)}
          >
            
            <h3 className="m-3 cursor-pointer select-none">{i.name}</h3>

            
          </div>
        ))}
    </div>
  );
};

export default DropDown;
