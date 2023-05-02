import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/style";

import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./Dropdown";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";

import { RxCross1 } from "react-icons/rx";
import { filterProducts } from "../../redux/actions";
import DropdownFilter from "../product/DropdownFilter";

const Header = ({ activeHeading, isProductPage }) => {
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(" -- Select --");
  const [filter, setFilter] = useState([]);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const { productDetails, filterType } = useSelector((state) => state.product);

  const [sliderValue, setSliderValue] = useState([20, 37]);

  const handleSlider = (event, newValue, activeThumb) => {
    const minDistance = 10;
    if (!Array.isArray(newValue)) {
      return;
    }

    // setFilter("price");
    if (activeThumb === 0) {
      setSliderValue([
        Math.min(newValue[0], sliderValue[1] - minDistance),
        sliderValue[1],
      ]);
    } else {
      setSliderValue([
        sliderValue[0],
        Math.max(newValue[1], sliderValue[0] + minDistance),
      ]);
    }

    dispatch(filterProducts("price", sliderValue, productDetails));
  };

  useEffect(() => {
    console.log(filter);
    filter.length !== 0 &&
      dispatch(filterProducts("others", filter, productDetails));
    filter.length === 0 &&
      dispatch(filterProducts("reset", null, productDetails));
  }, [filter, dispatch]);

  const sliderValueText = () => {
    return sliderValue;
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative">
            {isProductPage ? (
              <div className="flex items-center justify-between">
                <Box sx={{ width: 300 }}>
                  <Slider
                    getAriaLabel={() => "Minimum distance"}
                    value={sliderValue}
                    min={0}
                    max={3000}
                    step={10}
                    gap={20}
                    onChange={handleSlider}
                    // valueLabelDisplay="auto"
                    getAriaValueText={sliderValueText}
                    valueLabelDisplay="on"
                    disableSwap
                  />
                </Box>
                <DropdownFilter handleFilter={setFilter} />
              </div>
            ) : (
              <input
                type="text"
                placeholder="Search Product..."
                className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.flexNormal} justify-between`}
        >
          {/* categories */}
          <div
            onClick={() => setDropDown(!dropDown)}
            style={{ display: !isProductPage && "none" }}
          >
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                {selectedItem}
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown && isProductPage ? (
                <>
                  <DropDown
                    handleSelectedItem={setSelectedItem}
                    setDropDown={setDropDown}
                  />
                </>
              ) : null}
            </div>
          </div>
          {/* navitems */}
          <div className={`${styles.flexNormal}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.flexNormal}`}>
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  0
                </span>
              </div>
            </div>

            <div className={`${styles.flexNormal}`}>
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />

                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  0
                </span>
              </div>
            </div>

            <div className={`${styles.flexNormal}`}>
              <div className="relative cursor-pointer mr-[15px]">
                <Link to="/">
                  <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <div className="relative mr-[20px]">
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                1
              </span>
            </div>
          </div>
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div className="relative mr-[15px]">
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      0
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                {isProductPage ? (
                  <>
                    <DropDown
                      handleSelectedItem={setSelectedItem}
                      setDropDown={setDropDown}
                    />

                  </>
                ) : null}
              </div>

              <Navbar active={activeHeading} />

              <br />
              <br />
              <br />

           
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
