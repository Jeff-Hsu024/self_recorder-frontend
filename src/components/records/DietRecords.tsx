import React, { useState, useEffect, useMemo } from 'react';
import { getDietRecords, UserFoodLog } from '../../services/DietService';
import { setChartData } from '../../services/ChartService';
import { getFilterFormSettings } from '../../services/FilterFormService';
import CustomDataGrid from '../layout/CustomDataGrid';
import CustomDataGridService from '../../services/CustomDataGridService';
import Charts from '../dashboard/Charts';

const dietDataGridService = new CustomDataGridService<UserFoodLog>();

function DietRecords() {
  const [dataGridState, setDataGridState] = useState(dietDataGridService['dataSubject'].getValue());

  const dietColumns = useMemo(() => [
    { header: 'Food Name', accessor: 'foodName' },
    { header: 'Calories', accessor: 'calories' },
    { header: 'Description', accessor: 'description' },
    { header: 'Eat Time', accessor: 'eatTime', render: (item: UserFoodLog) => item.eatTime.toLocaleString() },
    { header: 'Category', accessor: 'foodCategory' },
  ], []);

  useEffect(() => {
    const subscription = dietDataGridService.getDataGridState().subscribe(setDataGridState);
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    getFilterFormSettings().subscribe((filterSettings) => {
      getDietRecords(filterSettings.startDate, filterSettings.endDate, filterSettings.keyword).subscribe((data) => {
        dietDataGridService.setData(data, dataGridState.itemOffset);

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
  }, [dataGridState.itemOffset, dataGridState.itemsPerPage, dataGridState.sortColumn, dataGridState.sortDirection]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * dataGridState.itemsPerPage);
    dietDataGridService.setItemOffset(newOffset);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    if (!isNaN(newItemsPerPage) && newItemsPerPage > 0) {
      dietDataGridService.setItemsPerPage(newItemsPerPage);
    }
  };

  const handleSort = (column: keyof UserFoodLog) => {
    dietDataGridService.setSort(column);
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
        <div className="mb-4">
          <label htmlFor="itemsPerPage" className="label">
            <span className="label-text">每頁顯示筆數:</span>
          </label>
          <input
            type="number"
            id="itemsPerPage"
            className="input input-bordered w-20"
            value={dataGridState.itemsPerPage}
            onChange={handleItemsPerPageChange}
            min="1"
          />
        </div>
        <CustomDataGrid
          data={dataGridState.displayData}
          columns={dietColumns.map(col => ({
            ...col,
            header: (
              <div className="flex items-center cursor-pointer" onClick={() => handleSort(col.accessor as keyof UserFoodLog)}>
                {col.header}
                {dataGridState.sortColumn === col.accessor && (
                  <span>{dataGridState.sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                )}
              </div>
            ),
          }))}
          pageCount={dataGridState.pageCount}
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  );
}

export default DietRecords;
