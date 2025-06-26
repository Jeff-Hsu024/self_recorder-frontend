import React, { useState } from 'react';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <>
      <div className="form-control w-full">
        <label className="label" htmlFor="startDate">
          <span className="label-text">開始日期:</span>
        </label>
        <input
          type="date"
          id="startDate"
          className="input input-bordered w-full"
          value={startDate.toISOString().split('T')[0]}
          onChange={(e) => onStartDateChange(new Date(e.target.value))}
          required
        />
      </div>
      <div className="form-control w-full">
        <label className="label" htmlFor="endDate">
          <span className="label-text">結束日期:</span>
        </label>
        <input
          type="date"
          id="endDate"
          className="input input-bordered w-full"
          value={endDate.toISOString().split('T')[0]}
          onChange={(e) => onEndDateChange(new Date(e.target.value))}
          required
        />
      </div>
    </>
  );
};

export default DateRangePicker;
