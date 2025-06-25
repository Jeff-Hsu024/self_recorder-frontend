import React, { useState, useEffect } from 'react';
import { getDietRecords, UserFoodLog } from '../services/DietService';
import { setChartData } from '../services/ChartService';

function DietRecords() {
  const [dietRecords, setDietRecords] = useState<UserFoodLog[]>([]);

  useEffect(() => {
    getDietRecords().subscribe((data) => {
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
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Calories</th>
            <th>Description</th>
            <th>Eat Time</th>
          </tr>
        </thead>
        <tbody>
          {dietRecords.map((record) => (
            <tr key={record.userFoodLogId}>
              <td>{record.foodName}</td>
              <td>{record.calories}</td>
              <td>{record.description}</td>
              <td>{record.eatTime.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DietRecords;
