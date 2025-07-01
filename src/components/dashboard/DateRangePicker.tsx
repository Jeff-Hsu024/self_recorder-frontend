import React from 'react';
import IconRender from '../utility/IconRender';

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
  const handleDateChange = (handler: (date: Date) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    
    const regex = /^\d{4}-\d{2}-\d{2}$/
    if (!regex.test(dateValue)) {
      return;
    }

    const date = new Date(`${dateValue}`);

    if (!isNaN(date.getTime())) {
      handler(date);
    }
  };

  return (
    <>
      <div className="form-control w-full">
        <label className="label" htmlFor="startDate">
          <span className="label-text flex items-center">
            <IconRender iconName="MdCalendarMonth" className="size-5 mr-2" />
            Begin Date:
          </span>
        </label>
        <input
          type="date"
          id="startDate"
          className="input input-bordered w-full"
          value={startDate.toISOString().split('T')[0]}
          onChange={handleDateChange(onStartDateChange)}
          required
        />
      </div>
      <div className="form-control w-full">
        <label className="label" htmlFor="endDate">
          <span className="label-text flex items-center">
            <IconRender iconName="MdCalendarMonth" className="size-5 mr-2" />
            End Date:
          </span>
        </label>
        <input
          type="date"
          id="endDate"
          className="input input-bordered w-full"
          value={endDate.toISOString().split('T')[0]}
          onChange={handleDateChange(onEndDateChange)}
          required
        />
      </div>
    </>
  );
};

export default DateRangePicker;
