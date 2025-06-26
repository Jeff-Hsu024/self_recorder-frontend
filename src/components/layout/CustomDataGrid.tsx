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
  onPageChange: (event: { selected: number }) => void;
}

function CustomDataGrid({ data, columns, pageCount, onPageChange }: CustomDataGridProps) {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
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
      <div className="flex justify-center mt-4">
        <Pagination pageCount={pageCount} onPageChange={onPageChange} />
      </div>
    </div>
  );
}

export default CustomDataGrid;
