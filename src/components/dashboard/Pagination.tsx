import React from 'react';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange, currentPage }) => {
  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Number of page buttons to display

    let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(pageCount - 1, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`join-item btn ${currentPage === i ? 'btn-active' : ''}`}
          onClick={() => handlePageClick(i)}
        >
          {i + 1}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="join">
      <button
        className="join-item btn"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 0}
      >
        «
      </button>
      {renderPageNumbers()}
      <button
        className="join-item btn"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === pageCount - 1}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
