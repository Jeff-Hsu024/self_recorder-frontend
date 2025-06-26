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
    <fieldset className="border p-4 rounded-lg">
      <legend className="text-lg font-semilight flex items-center">
        <IconRender iconName="MdFilterList" className="size-5 mr-2" />
        Filter
      </legend>
      <div className="flex flex-row space-x-4 w-full">
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />
        <div className="form-control w-full">
          <label className="label" htmlFor="keyword">
            <span className="label-text flex items-center">
              <IconRender iconName="MdSearch" className="size-5 mr-2" />
              Keyword:
            </span>
          </label>
          <input
            type="text"
            id="keyword"
            className="input input-bordered w-full"
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="type keyword"
          />
        </div>
      </div>
    </fieldset>
  );
};

export default FilterForm;
