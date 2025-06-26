import React, { useState } from 'react';
import { format, subMonths } from 'date-fns';

interface DateRangeFilterProps {
  onFilterChange: (startDate: Date, endDate: Date, keyword: string) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onFilterChange }) => {
  const today = new Date();
  const defaultStartDate = subMonths(today, 2);

  const [startDate, setStartDate] = useState<Date>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date>(today);
  const [keyword, setKeyword] = useState<string>('');

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(new Date(e.target.value));
    onFilterChange(new Date(e.target.value), endDate, keyword);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(new Date(e.target.value));
    onFilterChange(startDate, new Date(e.target.value), keyword);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    onFilterChange(startDate, endDate, e.target.value);
  };

  return (
    <fieldset className="w-full border p-4 rounded-md">
      <div className="flex items-center space-x-4">
        <div>
          <label htmlFor="startDate" className="label">
            <span className="label-text">Start Date</span>
          </label>
          <input
            type="date"
            id="startDate"
            className="input input-bordered w-full max-w-xs"
            value={format(startDate, 'yyyy-MM-dd')}
            onChange={handleStartDateChange}
          />
        </div>
        <div>
          <label htmlFor="endDate" className="label">
            <span className="label-text">End Date</span>
          </label>
          <input
            type="date"
            id="endDate"
            className="input input-bordered w-full max-w-xs"
            value={format(endDate, 'yyyy-MM-dd')}
            onChange={handleEndDateChange}
          />
        </div>
        <div>
          <label htmlFor="keyword" className="label">
            <span className="label-text">Keyword</span>
          </label>
          <input
            type="text"
            id="keyword"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={keyword}
            onChange={handleKeywordChange}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default DateRangeFilter;
