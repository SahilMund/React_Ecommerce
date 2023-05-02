import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { Footer, Header, Loader, ProductCard } from "../components";
import { fetchProductsByCategory } from "../redux/actions";
import styles from "../styles/style";

const ProductPage = () => {
  const { id } = useParams();

  const {
    productDetails,
    filteredDetails,
    filterType,
    isLoading,
    isFiltering,
    pageDetails: { totalItems, itemsPerPage },
  } = useSelector((state) => state.product);

  const products = filterType && filterType !== "reset" ? filteredDetails : productDetails;

  const [isFirstPage, setIsFirstPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const [pageLimit, setPageLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalItems / itemsPerPage) || 5
  );

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    // console.log(`User requested page number ${event} and ${even}`);
    console.log(event);

    const newPage = event.selected + 1;
    setCurrentPage(newPage);
    setIsFirstPage(newPage === 1);
    setIsLastPage(newPage === totalPages);
  };

  useEffect(() => {
    id && dispatch(fetchProductsByCategory(id, currentPage , pageLimit));
  }, [id, dispatch, currentPage]);



  return (
    <div>
      <Header activeHeading={3} isProductPage={true} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {
          isLoading || isFiltering ? <Loader/> :
          products &&
            products.map((i, index) => (
              <ProductCard data={i} key={index} />
            ))}
        </div>
        { filterType !== "reset" && (!isLoading && !isFiltering) && products && products.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </h1>
        ) : (
          <ReactPaginate
            previousLabel={"< Prev"}
            nextLabel={"Next >"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"react-pagination-container"}
            activeClassName={"active"}
            renderOnZeroPageCount={null}
            previousClassName={isFirstPage ? "disabled" : ""}
            nextClassName={isLastPage ? "disabled" : ""}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
