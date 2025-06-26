import React from 'react';
import DateRangeFilter from '../../components/Shared/DateRangeFilter';

const DietRecords: React.FC = () => {
  const handleFilterChange = (startDate: Date, endDate: Date, keyword: string) => {
    console.log('Diet Records - Start Date:', startDate);
    console.log('Diet Records - End Date:', endDate);
    console.log('Diet Records - Keyword:', keyword);
  };

  return (
    <div>
      <DateRangeFilter onFilterChange={handleFilterChange} />
      <div className="flex justify-end">
        {/* Add/Edit/Delete Icons */}
        <button className="btn btn-primary">Add Diet Record</button>
      </div>

      {/* Tabbed Content */}
      <div className="tabs">
        <a className="tab tab-bordered">Charts</a>
        <a className="tab tab-bordered tab-active">Records Table</a>
      </div>
      <div>Diet Records Table Content</div>
    </div>
  );
};

export default DietRecords;
