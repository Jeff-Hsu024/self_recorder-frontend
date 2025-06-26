import React from 'react';
import Pagination from '../dashboard/Pagination';

interface Column {
  header: React.ReactNode; // Allow ReactNode for custom headers (e.g., with sort icons)
  accessor: string; // Key to access data from the item object
  render?: (item: any) => React.ReactNode; // Optional custom render function for complex data
}

interface CustomDataGridProps {
  data: any[];
  columns: Column[];
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
  currentPage: number;
}

function CustomDataGrid({ data, columns, pageCount, onPageChange, currentPage }: CustomDataGridProps) {
  return (
    <div className="w-full">
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
            {data.map((item, index) => (
              <tr key={index}> {/* Using index as key, consider a unique ID if available */}
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

      {/* Mobile and smaller screens: Card view */}
      <div className="lg:hidden grid grid-cols-1 gap-4">
        {data.map((item, index) => (
          <div key={index} className="card bg-base-100 shadow-xl p-4">
            {columns.map((column) => (
              <div key={column.accessor} className="mb-2">
                <div className="font-bold">{column.header}</div>
                <div>{column.render ? column.render(item) : item[column.accessor]}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Pagination is only shown on larger screens */}
      <div className="hidden lg:flex justify-center mt-4">
        <Pagination pageCount={pageCount} onPageChange={onPageChange} currentPage={currentPage} />
      </div>
    </div>
  );
}

export default CustomDataGrid;
