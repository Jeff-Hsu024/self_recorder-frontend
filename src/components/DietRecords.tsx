import React, { useState, useEffect } from 'react';
import { getDietRecords, UserFoodLog } from '../services/DietService';
import { setChartData } from '../services/ChartService';
import FilterForm from './FilterForm';

function DietRecords() {
  const [dietRecords, setDietRecords] = useState<UserFoodLog[]>([]);
  const [filterStartDate, setFilterStartDate] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth() - 2, new Date().getDate()));
  const [filterEndDate, setFilterEndDate] = useState<Date>(new Date());
  const [filterKeyword, setFilterKeyword] = useState<string>('');

  useEffect(() => {
    getDietRecords(filterStartDate, filterEndDate, filterKeyword).subscribe((data) => {
      setDietRecords(data);

      const labels = data.map((record) => record.foodName);
      const calories = data.map((record) => record.calories);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Calories',
            data: calories,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      setChartData(chartData);
    });
  }, [filterStartDate, filterEndDate, filterKeyword]);

  const handleFilterChange = (startDate: Date, endDate: Date, keyword: string) => {
    setFilterStartDate(startDate);
    setFilterEndDate(endDate);
    setFilterKeyword(keyword);
  };

  return (
    <div>
      <FilterForm onFilterChange={handleFilterChange} />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Food Name</th>
              <th>Calories</th>
              <th>Description</th>
              <th>Eat Time</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {dietRecords.map((record) => (
              <tr key={record.userFoodLogId}>
                <td>{record.foodName}</td>
                <td>{record.calories}</td>
                <td>{record.description}</td>
                <td>{record.eatTime.toLocaleString()}</td>
                <td>{record.foodCategory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DietRecords;
