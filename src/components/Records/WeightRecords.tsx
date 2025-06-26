import React from 'react';
import DateRangeFilter from '../../components/Shared/DateRangeFilter';

const WeightRecords: React.FC = () => {
  const handleFilterChange = (startDate: Date, endDate: Date, keyword: string) => {
    console.log('Weight Records - Start Date:', startDate);
    console.log('Weight Records - End Date:', endDate);
    console.log('Weight Records - Keyword:', keyword);
  };

  return (
    <div>
      <DateRangeFilter onFilterChange={handleFilterChange} />
      <div className="flex justify-end">
        {/* Add/Edit/Delete Icons */}
        <button className="btn btn-primary">Add Weight Record</button>
      </div>

      {/* Tabbed Content */}
      <div className="tabs">
        <a className="tab tab-bordered">Charts</a>
        <a className="tab tab-bordered tab-active">Records Table</a>
      </div>
      <div>Weight Records Table Content</div>
    </div>
  );
};

export default WeightRecords;
