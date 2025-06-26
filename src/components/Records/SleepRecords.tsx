import React from 'react';
import DateRangeFilter from '../../components/Shared/DateRangeFilter';

const SleepRecords: React.FC = () => {
  const handleFilterChange = (startDate: Date, endDate: Date, keyword: string) => {
    console.log('Sleep Records - Start Date:', startDate);
    console.log('Sleep Records - End Date:', endDate);
    console.log('Sleep Records - Keyword:', keyword);
  };

  return (
    <div>
      <DateRangeFilter onFilterChange={handleFilterChange} />
      <div className="flex justify-end">
        {/* Add/Edit/Delete Icons */}
        <button className="btn btn-primary">Add Sleep Record</button>
      </div>

      {/* Tabbed Content */}
      <div className="tabs">
        <a className="tab tab-bordered">Charts</a>
        <a className="tab tab-bordered tab-active">Records Table</a>
      </div>
      <div>Sleep Records Table Content</div>
    </div>
  );
};

export default SleepRecords;
