import React, { useState, useEffect } from 'react';
import { getDietRecords, UserFoodLog } from '../../services/DietService';
import { setChartData } from '../../services/ChartService';
import { getFilterFormSettings } from '../../services/FilterFormService';
import Pagination from '../dashboard/Pagination';

function DietRecords() {
  const [dietRecords, setDietRecords] = useState<UserFoodLog[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    getFilterFormSettings().subscribe((filterSettings) => {
      getDietRecords(filterSettings.startDate, filterSettings.endDate, filterSettings.keyword).subscribe((data) => {
        const endOffset = itemOffset + itemsPerPage;
        setDietRecords(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));

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
    });
  }, [itemOffset]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % dietRecords.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
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
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
    </div>
  );
}

export default DietRecords;
