import React, { useState } from 'react';
import DateRangePicker from './DateRangePicker';
import IconRender from '../utility/IconRender';

interface FilterFormProps {
  onFilterChange: (startDate: Date, endDate: Date, keyword: string) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ onFilterChange }) => {
  const today = new Date();
  const twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, today.getDate());

  const [startDate, setStartDate] = useState<Date>(twoMonthsAgo);
  const [endDate, setEndDate] = useState<Date>(today);
  const [keyword, setKeyword] = useState<string>('');

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
    onFilterChange(date, endDate, keyword);
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
    onFilterChange(startDate, date, keyword);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    onFilterChange(startDate, endDate, e.target.value);
  };

  return (
    <div className="sm:border sm:p-4 sm:rounded-lg">
      {/* On small screens, this will be a collapse component */}
      <div className="collapse collapse-arrow border rounded-lg sm:hidden">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-semilight flex items-center">
          <IconRender iconName="MdFilterList" className="size-5 mr-2" />
          Filter
        </div>
        <div className="collapse-content">
          <div className="flex flex-col space-y-4 w-full">
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
            />
            <div className="form-control w-full">
              <label className="label" htmlFor="keyword-mobile">
                <span className="label-text flex items-center">
                  <IconRender iconName="MdSearch" className="size-5 mr-2" />
                  Keyword:
                </span>
              </label>
              <input
                type="text"
                id="keyword-mobile"
                className="input input-bordered w-full"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="type keyword"
              />
            </div>
          </div>
        </div>
      </div>

      {/* On medium screens and up, this will be the regular form */}
      <div className="hidden sm:flex sm:flex-col sm:space-y-4">
        <legend className="text-lg font-semilight flex items-center mb-4">
          <IconRender iconName="MdFilterList" className="size-5 mr-2" />
          Filter
        </legend>
        <div className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 w-full">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
          />
          <div className="form-control w-full">
            <label className="label" htmlFor="keyword-desktop">
              <span className="label-text flex items-center">
                <IconRender iconName="MdSearch" className="size-5 mr-2" />
                Keyword:
              </span>
            </label>
            <input
              type="text"
              id="keyword-desktop"
              className="input input-bordered w-full"
              value={keyword}
              onChange={handleKeywordChange}
              placeholder="type keyword"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
