import React from 'react';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

interface TableFooterProps {
  currentPage: number;
  totalPageCount: number;
  handlePageChange: (newPage: number) => void;
  itemsPerPage: number;
  indexOfFirstItem: number;
  indexOfLastItem: number;
  totalCount: number;
  handleItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TableFooter: React.FC<TableFooterProps> = ({
  currentPage,
  totalPageCount,
  handlePageChange,
  itemsPerPage,
  indexOfFirstItem,
  indexOfLastItem,
  totalCount,
  handleItemsPerPageChange,
}) => {
  return (
    <div className="table-footer">
      <div className="per-page">
        <label>Items per page:</label>
        <select className='item-page' value={itemsPerPage} onChange={handleItemsPerPageChange}>
          {[5, 10, 15, 20].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <p>
          {`${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, totalCount)} of ${totalCount} items`}
        </p>
      </div>
      <div className="pagination-select">
        <select
          value={currentPage}
          onChange={(e) => handlePageChange(Number(e.target.value))}
        >
          {Array.from({ length: totalPageCount }, (_, index) => (
            <option key={index} value={index}>
              {index + 1}
            </option>
          ))}
        </select>
        <label>of {totalPageCount} pages</label>
        <div className='pages-btn'>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <MdOutlineArrowBackIos />
        </button>
        <button
          className="pagination-button "
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPageCount - 1}
        >
          <MdOutlineArrowForwardIos />
        </button>
        </div>
      </div>
    </div>
  );
};

export default TableFooter;
