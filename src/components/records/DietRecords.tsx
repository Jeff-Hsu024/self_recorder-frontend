import React, { useState, useEffect } from 'react';
import { getDietRecords, UserFoodLog } from '../../services/DietService';
import { setChartData } from '../../services/ChartService';
import { getFilterFormSettings } from '../../services/FilterFormService';
import Pagination from '../dashboard/Pagination';
import Charts from '../dashboard/Charts';

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

    <div className="tabs tabs-lift">
      <label className="tab">
        <input type="radio" name="my_tabs_4" defaultChecked />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 me-2"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" /></svg>
        Charts
      </label>
      <div className="tab-content bg-base-100 border-base-300 p-6">
        <Charts />
      </div>

      <label className="tab">
        <input type="radio" name="my_tabs_4" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 me-2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" /></svg>
        Records
      </label>
      <div className="tab-content bg-base-100 border-base-300 p-6">
        <div className="w-full">
          <div className="overflow-x-auto">
            <table className="table w-full">
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
      </div>

      <label className="tab">
        <input type="radio" name="my_tabs_4" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 me-2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
        Love
      </label>
      <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 3</div>
    </div>
  );
}

export default DietRecords;
