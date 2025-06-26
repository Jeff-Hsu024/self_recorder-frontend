import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  pageCount: number;
  onPageChange: (event: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="下一頁 >"
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< 上一頁"
      renderOnZeroPageCount={null}
      containerClassName="join"
      pageClassName="join-item btn"
      activeClassName="btn-active"
      previousLinkClassName="join-item btn"
      nextLinkClassName="join-item btn"
      disabledClassName="btn-disabled"
    />
  );
};

export default Pagination;
