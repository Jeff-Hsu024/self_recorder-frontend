import React, { useState, useEffect } from 'react';
import Pagination from '../dashboard/Pagination';
import IconRender from '../utility/IconRender';
import useMediaQuery from '../../hooks/useMediaQuery';

interface Column {
  header: React.ReactNode; // Allow ReactNode for custom headers (e.g., with sort icons)
  accessor: string; // Key to access data from the item object
  render?: (item: any) => React.ReactNode; // Optional custom render function for complex data
}

interface CustomDataGridProps {
  data: any[];
  columns: Column[];
  itemsPerPage: number;
}

function CustomDataGrid({ data, columns, itemsPerPage }: CustomDataGridProps) {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const [currentPage, setCurrentPage] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Reset to the first page whenever the data or itemsPerPage changes
    setCurrentPage(0);
  }, [data, itemsPerPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const pageCount = Math.ceil(data.length / itemsPerPage);
  const paginatedData = isMobile
    ? data
    : data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  // Separate columns for card view layout
  const mainColumn = columns.length > 0 ? columns[0] : null;
  const actionColumn = columns.find(c => c.header === 'Actions');
  const otherColumns = columns.filter(
    c => c.accessor !== mainColumn?.accessor && c.accessor !== actionColumn?.accessor
  );

  return (
    <div className="w-full relative">
      {/* Desktop and larger screens: Table view */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.accessor}>{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} className="hover">
                {columns.map((column) => (
                  <td key={column.accessor}>
                    {column.render ? column.render(item) : item[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile and smaller screens: Enhanced Card view */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {paginatedData.map((item, index) => (
          <div key={index} className="card bg-base-100 shadow-xl">
            <div className="card-body p-4">
              {actionColumn && (
                <div className="card-actions justify-end absolute top-2 right-2">
                  {actionColumn.render ? actionColumn.render(item) : item[actionColumn.accessor]}
                </div>
              )}
              {mainColumn && (
                <h2 className="card-title text-lg">
                  {mainColumn.render ? mainColumn.render(item) : item[mainColumn.accessor]}
                </h2>
              )}
              <div className="space-y-1 mt-2">
                {otherColumns.map((column) => (
                  <div key={column.accessor} className="text-sm truncate">
                    <span className="font-semibold">{column.header}: </span>
                    <span>{column.render ? column.render(item) : item[column.accessor]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination for desktop screens */}
      <div className="hidden lg:flex justify-center mt-4">
        <Pagination pageCount={pageCount} onPageChange={setCurrentPage} currentPage={currentPage} />
      </div>

      {/* Scroll to top button for mobile */}
      {showScrollTop && (
        <div className="lg:hidden fixed bottom-5 right-5 z-50">
          <button
            onClick={scrollToTop}
            className="btn btn-outline btn-circle"
            aria-label="Scroll to top"
          >
            <IconRender iconName="MdArrowUpward" className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomDataGrid;
